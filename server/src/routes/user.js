import express from "express"
import { PrismaClient } from "@prisma/client"
import { getAuthUser } from "../middleware/auth"
import { getVideoViews } from "./video"

const prisma = new PrismaClient()

function getUserRoutes() {
  const router = express.Router()

  router.get("/:userId", getAuthUser, getProfile)

  return router
}

async function getProfile(req, res, next) {
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.userId,
    },
  })

  if (!user) {
    return next({
      message: `No user found with id: ${req.params.userId}`,
      statusCode: 404,
    })
  }

  const subscribersCount = await prisma.subscription.count({
    where: {
      subscribedToId: {
        equals: user.id,
      },
    },
  })

  let isMe = false
  let isSubscribed = false

  if (req.user) {
    isMe = req.user.id === user.id
    isSubscribed = await prisma.subscription.findFirst({
      where: {
        AND: {
          subscriberId: {
            equals: req.user.id,
          },
          subscribedToId: {
            equals: user.id,
          },
        },
      },
    })
  }

  const subscribedTo = await prisma.subscription.findMany({
    where: {
      subscriberId: {
        equals: user.id,
      },
    },
  })

  const subscriptions = subscribedTo.map((sub) => sub.subscribedToId)

  const channels = await prisma.user.findMany({
    where: {
      id: {
        in: subscriptions,
      },
    },
  })

  for (const channel of channels) {
    const subscribersCount = await prisma.subscription.count({
      where: {
        subscribedToId: {
          equals: channel.id,
        },
      },
    })

    channel.subscribersCount = subscribersCount
  }

  const videos = await prisma.video.findMany({
    where: {
      userId: {
        equals: user.id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  user.subscribersCount = subscribersCount
  user.isSubscribed = Boolean(isSubscribed)
  user.isMe = isMe
  user.channels = channels
  user.videos = videos

  if (!videos.length) {
    return res.status(200).json({ user })
  }

  user.videos = await getVideoViews(videos)

  res.status(200).json({ user })
}

export { getUserRoutes }

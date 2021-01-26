import express from "express"
import { PrismaClient } from "@prisma/client"
import { protect } from "../middleware/auth"

const prisma = new PrismaClient()

function getVideoRoutes() {
  const router = express.Router()

  router.get("/", getRecommendedVideos)
  router.post("/", protect, addVideo)

  return router
}

async function getRecommendedVideos(req, res) {
  let videos = await prisma.video.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  if (!videos.length) {
    return res.status(200).json({ videos })
  }

  videos = await getVideoViews(videos)

  res.status(200).json({ videos })
}

async function addVideo(req, res) {
  const { title, description, url, thumbnail } = req.body

  const video = await prisma.video.create({
    data: {
      title,
      description,
      url,
      thumbnail,
      user: {
        connect: {
          id: req.user.id,
        },
      },
    },
  })

  res.status(200).json({ video })
}

export { getVideoRoutes }

import express from "express"
import { PrismaClient } from "@prisma/client"
import { protect, getAuthUser } from "../middleware/auth"

const prisma = new PrismaClient()

function getVideoRoutes() {
  const router = express.Router()

  router.get("/", getRecommendedVideos)
  router.post("/", protect, addVideo)
  router.get("/:videoId", getAuthUser, getVideo)
  router.get("/:videoId/like", protect, likeVideo)
  router.get("/:videoId/dislike", protect, dislikeVideo)

  return router
}

export async function getVideoViews(videos) {
  for (const video of videos) {
    const views = await prisma.view.count({
      where: {
        videoId: {
          equals: video.id,
        },
      },
    })
    video.views = views
  }

  return videos
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

async function getVideo(req, res, next) {
  const video = await prisma.video.findUnique({
    where: {
      id: req.params.videoId,
    },
    include: {
      user: true,
      comments: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  })

  if (!video) {
    return next({
      message: `No video found with id: ${req.params.videoId}`,
      statusCode: 404,
    })
  }

  let isLiked = false
  let isDisliked = false
  let isVideoMine = false

  if (req.user) {
    isVideoMine = req.user.id === video.userId

    isLiked = await prisma.videoLike.findFirst({
      where: {
        userId: {
          equals: req.user.id,
        },
        videoId: {
          equals: req.params.videoId,
        },
        like: {
          equals: 1,
        },
      },
    })

    isDisliked = await prisma.videoLike.findFirst({
      where: {
        userId: {
          equals: req.user.id,
        },
        videoId: {
          equals: req.params.videoId,
        },
        like: {
          equals: -1,
        },
      },
    })

    video.isLiked = Boolean(isLiked)
    video.isDisliked = Boolean(isDisliked)

    res.status(200).json({ video })
  }
}

async function likeVideo(req, res, next) {
  const video = await prisma.video.findUnique({
    where: {
      id: req.params.videoId,
    },
  })

  if (!video) {
    return next({
      message: `No video found with id: ${req.params.videoId}`,
      statusCode: 404,
    })
  }

  const isLiked = await prisma.videoLike.findFirst({
    where: {
      userId: {
        equals: req.user.id,
      },
      videoId: {
        equals: req.params.videoId,
      },
      like: {
        equals: 1,
      },
    },
  })

  const isDisliked = await prisma.videoLike.findFirst({
    where: {
      userId: {
        equals: req.user.id,
      },
      videoId: {
        equals: req.params.videoId,
      },
      like: {
        equals: -1,
      },
    },
  })

  if (isLiked) {
    await prisma.videoLike.delete({
      where: {
        id: isLiked.id,
      },
    })
  } else if (isDisliked) {
    await prisma.videoLike.update({
      where: {
        id: isDisliked.id,
      },
      data: {
        like: 1,
      },
    })
  } else {
    await prisma.videoLike.create({
      data: {
        user: {
          connect: {
            id: req.user.id,
          },
        },
        video: {
          connect: {
            id: req.params.videoId,
          },
        },
        like: 1,
      },
    })
  }

  res.status(200).json({})
}

async function dislikeVideo(req, res, next) {
  const video = await prisma.video.findUnique({
    where: {
      id: req.params.videoId,
    },
  })

  if (!video) {
    return next({
      message: `No video found with id: ${req.params.videoId}`,
      statusCode: 404,
    })
  }

  const isLiked = await prisma.videoLike.findFirst({
    where: {
      userId: {
        equals: req.user.id,
      },
      videoId: {
        equals: req.params.videoId,
      },
      like: {
        equals: 1,
      },
    },
  })

  const isDisliked = await prisma.videoLike.findFirst({
    where: {
      userId: {
        equals: req.user.id,
      },
      videoId: {
        equals: req.params.videoId,
      },
      like: {
        equals: -1,
      },
    },
  })

  if (isDisliked) {
    await prisma.videoLike.delete({
      where: {
        id: isDisliked.id,
      },
    })
  } else if (isLiked) {
    await prisma.videoLike.update({
      where: {
        id: isLiked.id,
      },
      data: {
        like: -1,
      },
    })
  } else {
    await prisma.videoLike.create({
      data: {
        user: {
          connect: {
            id: req.user.id,
          },
        },
        video: {
          connect: {
            id: req.params.videoId,
          },
        },
        like: -1,
      },
    })
  }

  res.status(200).json({})
}

export { getVideoRoutes }

import express from "express"
import { PrismaClient } from "@prisma/client"
import { protect } from "../middleware/auth"

const prisma = new PrismaClient()

function getUserRoutes() {
  const router = express.Router()

  router.get("/:userId", protect, getProfile)

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

  res.status(200).json({ user })
}

export { getUserRoutes }

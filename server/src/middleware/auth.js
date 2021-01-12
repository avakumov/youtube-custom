import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function protect(req, res, next) {
  console.log("COOKIES: ", req.cookies.token)
  if (!req.cookies.token) {
    return next({
      message: "You must be logged in to visit this route",
      statusCode: 401,
    })
  }

  try {
    const token = req.cookies.token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      include: {
        videos: true,
      },
    })

    req.user = user
    next()
  } catch (error) {
    return next({
      message: "You must be logged in to visit this route",
      statusCode: 401,
    })
  }
}
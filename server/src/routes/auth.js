import express from "express"
import jwt from "jsonwebtoken"
import { OAuth2Client } from "google-auth-library"

const client = new OAuth2Client(process.env.GOOGLE_CLIENt_ID)

function getAuthRoutes() {
  const router = express.Router()

  router.post("/google-login", googleLogin)
  router.get("/signout", signout)

  return router
}

async function googleLogin(req, res) {
  const { idToken } = req.body
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENt_ID,
  })

  const { name, picture, email } = ticket.getPayload()

  console.log("USER:", name, email)

  const tokenPayload = { id: user.id }
  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })

  res.cookie("token", token, { httpOnly: true })
  res.status(200).send(token)
}

function signout(req, res) {
  res.clearCookie("token")
  res.status(200).json({})
}

export { getAuthRoutes }

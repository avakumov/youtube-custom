import express from "express"
import path from "path"
import cors from "cors"
import dotenv from "dotenv"

import { getRoutes } from "./routes"

dotenv.config()

function startServer({ port = process.env.PORT } = {}) {
  const app = express()
  app.use(cors())
  app.use(express.json())
  // all API routes are prefixed with /api/v1
  app.use("/api/v1", getRoutes())
  app.listen(port, () => {
    console.info(`Listening on port ${port}`)
  })
}

export { startServer }

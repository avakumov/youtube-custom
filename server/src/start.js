import express from "express"
import path from "path"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"
import cookieParser from "cookie-parser"

import { getRoutes } from "./routes"

dotenv.config()

function startServer({ port = process.env.PORT } = {}) {
  const app = express()
  app.use(morgan("dev"))
  app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
  app.use(cookieParser())
  app.use(express.json())
  // all API routes are prefixed with /api/v1
  app.use("/api/v1", getRoutes())
  app.listen(port, () => {
    console.info(`Listening on port ${port}`)
  })
}

export { startServer }

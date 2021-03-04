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
  app.use(cors())
  app.use(cookieParser())
  app.use(express.json())
  // all API routes are prefixed with /api/v1
  app.use("/api/v1", getRoutes())

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "../client/build")))

    // Any request not caught by our API will be routed
    // to our built react app
    app.get("*", function (req, res) {
      res.sendFile(path.resolve(__dirname, "../client/build", "index.html"))
    })
  }

  app.listen(port, () => {
    console.info(`Listening on port ${port}`)
  })
}

export { startServer }

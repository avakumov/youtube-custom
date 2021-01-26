import express from "express"
import { getAuthRoutes } from "./auth"
import { getUserRoutes } from "./user"
import { getVideoRoutes } from "./video"

function getRoutes() {
  const router = express.Router()
  router.use("/auth", getAuthRoutes())
  router.use("/users", getUserRoutes())
  router.use("/videos", getVideoRoutes())

  return router
}
export { getRoutes }

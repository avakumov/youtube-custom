import express from "express"
import { getAuthRoutes } from "./auth"

function getRoutes() {
  const router = express.Router()
  router.use("/auth", getAuthRoutes())

  return router
}
export { getRoutes }

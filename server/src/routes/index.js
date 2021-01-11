import express from "express"
import { getAuthRoutes } from "./auth"
// import { getUserRoutes } from "./user"

function getRoutes() {
  const router = express.Router()
  router.use("/auth", getAuthRoutes())
  // router.use("/users", getUserRoutes());

  return router
}
export { getRoutes }

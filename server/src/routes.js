import express from "express";

function getRoutes() {
  const router = express.Router();
  router.get("/", (req, res) => {
    res.send("Hello");
  });

  return router;
}
export { getRoutes };

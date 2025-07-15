// routes/testRoutes.js
import express from "express";
const router = express.Router();

router.get("/ping", (req, res) => {
  res.json({ message: "Backend is alive!" });
});

export default router;

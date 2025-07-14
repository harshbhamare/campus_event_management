import express from "express";
import { homeRouter } from "../controllers/homeController.js";

const router = express.Router();

router.get("/", homeRouter)


export default router;
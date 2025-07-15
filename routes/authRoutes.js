import express from "express";
import { registerUser, sendOtp  } from "../controllers/authController.js";


const router = express.Router();

router.post("/auth/register", registerUser);
router.post("/auth/send-otp", sendOtp)

export default router;

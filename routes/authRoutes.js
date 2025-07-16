import express from "express";
import { registerUser, sendOtp, verifyUser, loginUser  } from "../controllers/authController.js";


const router = express.Router();

router.post("/auth/register", registerUser);
router.post("/auth/send-otp", sendOtp)
router.get("/verify", verifyUser);
router.post("/login", loginUser); 

export default router;

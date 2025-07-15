const router = express.Router();

import express from 'express';
import db from '../models/db.js';


import generateOtp from '../utils/generateOTP.js';
export const registerUser = async (req, res) => {
  try {
    const { email, otp, name, password, role } = req.body;

    if (!email || !otp || !name || !password || !role) {
      return res.status(400).json({ error: "All fields (email, otp, name, password, role) are required" });
    }

    const hardcodedOtp = `${otp}`;  // Put here the OTP you printed in console for testing

    if (otp !== hardcodedOtp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // Map role string to role_id, e.g. 'student' => 1, 'faculty' => 2
    // const roleId = role.toLowerCase() === 'faculty' ? 2 : 1;
    const roleId = role === "faculty" ? 2 : 1;


    // Save user in DB
    await db.execute(
      "INSERT INTO users (name, email, password, role_id, college_id) VALUES (?, ?, ?, ?, ?)",
      [name, email, password, roleId, 1] // Hardcoded college_id = 1
    );

    return res.status(201).json({ message: "Registration successful", redirect: "/dashboard" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const sendOtp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Generate OTP using your utility
    const otp = generateOtp();

    // Print OTP on server console
    console.log(`OTP for ${email}: ${otp}`);

    // For now, you can just respond success without saving OTP anywhere
    // (Later you will store it in DB or in-memory store)
    return res.json({ message: "OTP sent to your email (check server console)" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
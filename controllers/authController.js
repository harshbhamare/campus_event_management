const router = express.Router();

import bcrypt from "bcrypt";
import express from 'express';
import jwt from "jsonwebtoken";
import db from '../models/db.js';
import generateOtp from '../utils/generateOTP.js';

export const registerUser = async (req, res) => {
  try {
    const { email, otp, name, password, role } = req.body;

    if (!email || !otp || !name || !password || !role) {
      return res.status(400).json({ error: "All fields (email, otp, name, password, role) are required" });
    }

    const hardcodedOtp = `${otp}`; // for now, just validating manually
    if (otp !== hardcodedOtp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    const roleId = role === "faculty" ? 2 : 1;

    // ✅ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // salt rounds = 10

    // Save to DB
    await db.execute(
      "INSERT INTO users (name, email, password, role_id, college_id) VALUES (?, ?, ?, ?, ?)",
      [name, email, hashedPassword, roleId, 1]
    );

    // Generate token
    const token = jwt.sign({ email, role }, "harsh", { expiresIn: "7d" });

    // Send cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // change to true with HTTPS
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

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

    // generating OTP
    const otp = generateOtp();

    // Print OTP on server console
    console.log(`OTP for ${email}: ${otp}`);

    // For now, just respond success without saving OTP anywhere
    // (Later we will store it in DB or in-memory store)
    return res.json({ message: "OTP sent to your email (check server console)" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const verifyUser = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Not logged in" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "harsh");
    return res.status(200).json({ user: decoded });
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};




export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Fetch user from DB
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role_id },
      "harsh", // replace with env variable in production
      { expiresIn: "7d" }
    );

    // Send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set to true in production (HTTPS)
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login successful", redirect: "/dashboard" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
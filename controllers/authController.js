import db from "../models/db.js";
import sendEmail from "../utils/sendEmail.js";
import generateOTP from "../utils/generateOTP.js";


export const registerUser = async (req, res) => {
  const { name, email, password, role, department } = req.body;

  try {
    // Check if email exists
    const [existing] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate and store OTP
    const otp = generateOTP();
    const expires_at = Date.now() + 10 * 60 * 1000; // 10 min expiry

    await db.execute(
      "INSERT INTO otps (email, otp, expires_at) VALUES (?, ?, ?)",
      [email, otp, expires_at]
    );

    // Send OTP via email
    await sendEmail(email, otp);

    res.status(200).json({ message: "OTP sent to email. Please verify to complete registration." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, otp) => {
  const info = await transporter.sendMail({
    from: `"Campus Event System" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your OTP for Registration",
    html: `<p>Your OTP is <b>${otp}</b>. It is valid for 10 minutes.</p>`,
  });

  console.log("Email sent: ", info.messageId);
};

export default sendEmail;

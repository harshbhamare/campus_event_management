import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import testRoutes from "./routes/testRoutes.js";

const app = express();

// ✅ Apply CORS and JSON middleware first
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// ✅ Mount routes AFTER middleware
app.use("/", authRoutes);
app.use("/", homeRoutes);
app.use("/api/test", testRoutes); // ⬅️ Changed to /api/test for clarity

export default app;

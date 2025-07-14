import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import homeRoutes from "./routes/homeRoutes.js"

const app = express();

app.use(cors());
app.use(express.json()); // to parse JSON

// Routes
app.use("/api/auth", authRoutes);
app.use("/", homeRoutes)

export default app;

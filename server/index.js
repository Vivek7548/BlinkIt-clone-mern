import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import { connectDB } from "./config/connectDB.js";

dotenv.config();

// Create the Express application instance
const app = express();

// Middleware
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
  })
);

// Port
const PORT = process.env.PORT || 8080;
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the server!",
  });
});

// Start Server
// ... (previous code remains the same)

// Start Server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  });
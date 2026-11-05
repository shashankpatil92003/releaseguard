
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

// Security-related HTTP headers
app.use(helmet());

// Allow requests from our React frontend
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

// Parse incoming JSON request bodies
app.use(express.json({ limit: "100kb" }));

// Log incoming HTTP requests
app.use(morgan("dev"));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ReleaseGuard API is running",
    timestamp: new Date().toISOString(),
  });
});

export default app;

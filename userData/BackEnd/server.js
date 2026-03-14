import express, { Router } from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routers/userRouters.js";
import { DBConnection } from "./config/database.js";

dotenv.config();

const app = express();

app.use(cors())

app.use(express.json());

app.use("/user", userRouter);

DBConnection()

// Only run app.listen() if we are NOT on Vercel
if (!process.env.VERCEL) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Local server running at http://localhost:${port}`);
  });
}

// Export the app for Vercel's serverless environment
export default app;
import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import { pool, executeSQLFile } from "./utils/db";
import router from "./routes/auth";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Test MySQL connection
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL!");
    connection.release();
  } catch (error) {
    console.error("MySQL connection failed:", error);
  }
})();

// Create user table if it does not exist
executeSQLFile("../models/users.sql").catch(() =>
  console.log("error creating user table")
);

// Routes
app.use("/api/auth", router);

// Root endpoint
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the OfferUp Clone API");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;

import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mysql from "mysql2/promise";

// import authRoutes from './routes/auth';

// Load environment variables
dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL!");
    connection.release();
  } catch (error) {
    console.error("MySQL connection failed:", error);
  }
})();

// Routes
// app.use('/api/auth', authRoutes);

// Root endpoint
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the OfferUp Clone API");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

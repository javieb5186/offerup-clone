import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { query } from "../utils/db";
import { Users } from "../types/Users";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../utils/validators";

const router = express.Router();

// Create route for signup
router.post("/signup", async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;
  let invalid = false;

  !validateName(name) && (invalid = true);
  !validateEmail(email) && (invalid = true);
  !validatePassword(password) && (invalid = true);

  if (invalid) {
    res.status(400).json({
      message: "Invalid, please check your name, email, and password.",
    });
  } else {
    try {
      // Check if user exists
      const existingUser = await query<Users>(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

      if (existingUser.length > 0) {
        res.status(400).json({ message: "User already exists." });
      } else {
        // Hash password
        const hash = await bcrypt.hash(password, 10);

        // Execute query to database
        await query(
          "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
          [name, email, hash]
        );

        // Generate token
        const token = jwt.sign({ email }, String(process.env.JWT_SECRET), {
          expiresIn: 60 * 5,
        });

        res.status(201).json({ message: "User created successfully" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating user", error });
    }
  }
});

export default router;

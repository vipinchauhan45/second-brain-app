import express from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../models/User.js";
dotenv.config();

const userRouter = express.Router();

const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 6 characters long"),
});

userRouter.post("/signup", async (req, res) => {
  const parseResult = signupSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      msg: "Validation failed",
      errors: parseResult.error.errors.map((err) => err.message),
    });
  }

  const { username, email, password } = parseResult.data;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: "Username already exists" });
    }

    const hashPassword = await bcrypt.hash(password, Number(process.env.NUM));
    const user = await User.create({
      username,
      password: hashPassword,
      email,
    });
    const token = jwt.sign(
      { username: user.username, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      msg: "User created successfully",
      token: token,
    });
  } catch (e) {
    res.status(500).json({
      msg: "Server error",
      error: e.message,
    });
  }
});

userRouter.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userData = await User.findOne({ username });
    const passwordMatch = await bcrypt.compare(password, userData.password);

    if (!userData || !passwordMatch) {
      return res.status(400).json({
        msg: "invalid username and password",
      });
    }

    const token = jwt.sign(
      { username: userData.username, _id: userData._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      msg: "signin successfully",
      token: token,
    });
  } catch (e) {
    res.status(500).json({
      msg: "Server error",
      error: e.message,
    });
  }
});

export default userRouter;

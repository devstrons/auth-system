import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { MICRO_SECRET_TOKEN } from "../config.js";

import { Router } from "express";
const router = Router();

// User signup route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(422).json({ error: "Please fill all fields" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 12).catch(console.log);

    const user = user.create({
      name,
      email,
      phone,
      password: hashpassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
  }
});

// User signin route
router.post("/signin", async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    if ((!email || !phone) || !password) {
      return res.status(422).json({ error: "Please fill all fields" });
    }

    let userExists = await User.findOne({ email });
    if (!userExists)
      userExists = await User.findOne({ phone });
    const validPassword = await bcrypt.compare(password, userExists.password);

    if (!userExists || !validPassword) {
      return res.status(403).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        _id: userExists._id,
        email,
      },
      MICRO_SECRET_TOKEN,
      {
        expiresIn: "24h",
      }
    );

    return res.status(200).json({
      _id: userExists._id,
      message: "User logged in successfully",
      token,
      name: userExists.name,
    });
  } catch (err) {
    console.log(err);
  }
});

export default router;

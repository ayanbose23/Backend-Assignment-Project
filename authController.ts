import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({ username, password: hashedPassword });
  await user.save();

  res.status(201).send("User registered.");
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).send("Invalid username or password.");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).send("Invalid username or password.");

  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET!);
  res.send({ token });
};

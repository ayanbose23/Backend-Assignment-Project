import { Request, Response } from "express";
import { Assignment } from "../models/Assignment";

export const uploadAssignment = async (req: Request, res: Response) => {
  const { user } = req;
  if (!req.file) return res.status(400).send("No file uploaded.");

  const assignment = new Assignment({
    userId: user._id,
    filePath: req.file.path,
  });

  await assignment.save();
  res.status(201).send("Assignment uploaded.");
};

export const getAssignments = async (req: Request, res: Response) => {
  const assignments = await Assignment.find({ userId: req.user._id });
  res.send(assignments);
};

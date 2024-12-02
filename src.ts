import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import assignmentRoutes from "./routes/assignmentRoutes";

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI!, { useNewUrlParser: true, useUnifiedTopology: true });

app.use("/api/users", userRoutes);
app.use("/api/assignments", assignmentRoutes);

export default app;

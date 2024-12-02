import express from "express";
import multer from "multer";
import { uploadAssignment, getAssignments } from "../controllers/assignmentController";
import { authenticate } from "../middlewares/auth";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", authenticate, upload.single("assignment"), uploadAssignment);
router.get("/", authenticate, getAssignments);

export default router;

import express from "express";
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} from "../controllers/studentController.js";
import { protect } from "../middleware/authMiddleware.js"; // <-- ADD IMPORT
 
const router = express.Router();

// Public Routes (Anyone can view)
router.get('/student', getAllStudents);
router.get('/student/:id', getStudentById);

// Protected Routes (Require JWT)
router.post('/student', protect, createStudent);
router.patch('/student/:id', protect, updateStudent);
router.delete('/student/:id', protect, deleteStudent);
 
export default router;
import express from "express";

// Importing controller functions for handling student-related requests
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} from "../controllers/studentController.js";
 
const router = express.Router();

// Defining routes for student-related operations
router.get('/student', getAllStudents);
router.get('/student/:id', getStudentById);
router.post('/student', createStudent);
router.patch('/student/:id', updateStudent);
router.delete('/student/:id', deleteStudent);
 
export default router;
 
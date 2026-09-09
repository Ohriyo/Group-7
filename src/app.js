import express from "express";
import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "./controllers/studentController.js";

const app = express();
app.use(express.json());

app.get("/student", getStudents);
app.get("/student/:id", getStudentById);
app.post("/student", createStudent);
app.patch("/student/:id", updateStudent);
app.delete("/student/:id", deleteStudent);

export default app;

//URL for testing is on README.md file
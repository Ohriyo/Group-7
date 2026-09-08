import express from "express";
import students from "./models/studentModel.js";

const app = express();

app.use(express.json());

app.get('/student', (req, res) => {
  res.send(students);
});

app.get('/student/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));

  if (!student) return res.status(404).send('Student not found');

  res.send(student);
});

app.post('/student', (req, res) => {
  const newStudent = {
    id: students.length ? students[students.length - 1].id + 1 : 1,
    name: req.body.name,
    age: req.body.age,
  };

  students.push(newStudent);
  res.send(newStudent);
});

app.patch('/student/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));

  if (!student) return res.status(404).send({ message: "Student not found" });

  Object.assign(student, req.body);
  res.send(student);
});

app.delete('/student/:id', (req, res) => {
  const studentIndex = students.findIndex(s => s.id === parseInt(req.params.id));

  if (studentIndex === -1) return res.status(404).send({ message: "Student not found" });

  const deletedStudent = students.splice(studentIndex, 1);
  res.send(deletedStudent[0]);
});

export default app;
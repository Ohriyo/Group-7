import express from "express";

const student = []
const app = express();

app.get('/student', (req, res) => {
  res.send(student);
});

app.post('/student', (req, res) => {
  const { name, age } = req.body;
  const newStudent = { name, age };
  student.push(newStudent);
  res.send(newStudent);
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`)
});
import express from "express";

const students = [ 
  { id: 1,
    name: "Rio Pana",
    age: 21,
    course: "Computer Science"
  },
  { 
    id: 2,
    name: "Nesline Diaz",
    age: 21,
    course: "Computer Science",
  },
  {  
    id: 3,
    name: "Kate Ronda",
    age: 21,
    course: "Computer Science"
  },
  {  
    id: 4,
    name: "Karen Clair Probadora",
    age: 22,
    course: "Information Technology"
  },
]

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
  if (!student) return res.status(404).send({message: "Student not found"});
  Object.assign(student, req.body);
  res.send(student);
});

app.delete('/student/:id', (req, res) => {
  const studentIndex = students.findIndex(s => s.id === parseInt(req.params.id));
  if (studentIndex === -1) return res.status(404).send({message: "Student not found"});
  const deletedStudent = students.splice(studentIndex, 1);
  res.send(deletedStudent[0]);
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`)
});

//URL for testing is on README.md file
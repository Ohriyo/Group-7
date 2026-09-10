import express from "express";

const router = express.Router();

const students = [
  {
    id: 1,
    name: "Rio Pana",
    age: 21,
    course: "Computer Science"
  },
  {
    id: 2,
    name: "Nesline Diaz",
    age: 21,
    course: "Computer Science"
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
  }
];

// GET all students
router.get("/", (req, res) => {
  res.send(students);
});

// GET student by ID
router.get("/:id", (req, res) => {
  const student = students.find(
    s => s.id === parseInt(req.params.id)
  );

  if (!student) {
    return res.status(404).send("Student not found");
  }

  res.send(student);
});

// POST new student
router.post("/", (req, res) => {
  const newStudent = {
    id: students.length
      ? students[students.length - 1].id + 1
      : 1,
    name: req.body.name,
    age: req.body.age
  };

  students.push(newStudent);
  res.send(newStudent);
});

// PATCH student
router.patch("/:id", (req, res) => {
  const student = students.find(
    s => s.id === parseInt(req.params.id)
  );

  if (!student) {
    return res.status(404).send({
      message: "Student not found"
    });
  }

  Object.assign(student, req.body);
  res.send(student);
});

// DELETE student
router.delete("/:id", (req, res) => {
  const studentIndex = students.findIndex(
    s => s.id === parseInt(req.params.id)
  );

  if (studentIndex === -1) {
    return res.status(404).send({
      message: "Student not found"
    });
  }

  const deletedStudent = students.splice(studentIndex, 1);

  res.send(deletedStudent[0]);
});

export default router;
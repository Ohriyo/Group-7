import students from "../models/studentModel.js";


export const getAllStudents = (req, res) => {
  res.send(students);
};


export const getStudentById = (req, res) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).send("Student not found");
  res.send(student);
};

export const createStudent = (req, res) => {
  const newStudent = {
    id: students.length ? students[students.length - 1].id + 1 : 1,
    name: req.body.name,
    age: req.body.age,
    course: req.body.course,
  };

  students.push(newStudent);
  res.send(newStudent);
};

export const updateStudent = (req, res) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).send({ message: "Student not found" });

  Object.assign(student, req.body);
  res.send(student);
};

export const deleteStudent = (req, res) => {
  const studentIndex = students.findIndex((s) => s.id === parseInt(req.params.id));
  if (studentIndex === -1) return res.status(404).send({ message: "Student not found" });

  const deletedStudent = students.splice(studentIndex, 1);
  res.send(deletedStudent[0]);
};

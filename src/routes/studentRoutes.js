router.get("/", getStudents);

router.get("/:id", getStudentById);

router.post("/", createStudent);

router.patch("/:id", updateStudent);

router.delete("/:id", deleteStudent);


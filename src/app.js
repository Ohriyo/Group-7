import express from "express";
import studentRoutes from "./src/routes/student.routes.js";
 
const app = express();
app.use(express.json());
 
app.use(studentRoutes);
 
export default app;

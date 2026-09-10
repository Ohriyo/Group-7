import express from "express";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();

app.use(express.json());

app.use("/student", studentRoutes);

export default app;

// URL for testing is on README.md file
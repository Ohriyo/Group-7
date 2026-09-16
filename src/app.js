import express from "express";
import cors from "cors"; 
import studentRoutes from "./routes/studentRoutes.js"; 
import authRoutes from "./routes/authRoutes.js"; 

const app = express();
app.use(cors()); // Allow frontend to communicate with backend
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes); 
app.use(studentRoutes); 

export default app;
//package import
import express from "express";
import colors from "colors";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

//files import
import authRoutes from "./routes/auth.routes.js";
import connectToMongDB from "./db/connectToMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json()); // to parse the incoming request with JSON payloads

//middleware
app.use("/api/auth", authRoutes);

//routes
app.get("/", (req, res) => {
  res.send("Firing from Whisper Chat-App Backend");
});

app.listen(PORT, () => {
  connectToMongDB();
  console.log(`Server is listening on http://localhost:${PORT}`.cyan);
});

//package import
import express from "express";
import colors from "colors";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//files import/
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectToMongDB from "./db/connectToMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser()); // to parse the incoming cookies from req.cookies

//routes
app.get("/", (req, res) => {
  res.send("Firing from Whisper Chat-App Backend");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  connectToMongDB();
  console.log(`Server is listening on http://localhost:${PORT}`.cyan);
});

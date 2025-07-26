//server/index.js

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js"; // ✅ Add this

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes); // ✅ Add this

// MongoDB connection
mongoose.connect(
  'mongodb+srv://abhi:abhi2003@blogcluster.psmuhsk.mongodb.net/?retryWrites=true&w=majority&appName=blogCluster',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.error("MongoDB Error:", err);
});

app.get('/', (req, res) => {
  res.send('Blogging Platform API is running...');
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});





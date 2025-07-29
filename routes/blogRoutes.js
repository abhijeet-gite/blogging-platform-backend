//server/routes//blogRoutes.js

import express from "express";
import {
  createBlog,
  getUserBlogs,
  updateBlog,
  deleteBlog
} from "../controllers/blogController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Blog from "../models/Blog.js"; // ✅ IMPORT MISSING FIXED

const router = express.Router();

// ✅ Create Blog
router.post("/create", authMiddleware, createBlog);

// ✅ Get all blogs of the logged-in user
router.get("/my-blogs", authMiddleware, getUserBlogs);

// ✅ Get blogs by user ID (optional for public profile)
router.get("/user/:id", async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.params.id }).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
});

// ✅ Update Blog
router.put("/edit/:id", authMiddleware, updateBlog);

// ✅ Delete Blog
router.delete("/delete/:id", authMiddleware, deleteBlog);

export default router;




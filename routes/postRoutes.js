//server/routes//postRoutes.js

import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getUserPosts
} from "../controllers/postController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Create Post
router.post("/create", authMiddleware, createPost);

// ✅ Get All Posts
router.get("/", getAllPosts);

// ✅ Get User's Posts (Dashboard)
router.get("/user", authMiddleware, getUserPosts);  // ✅ User dashboard uses this

// ✅ Get Single Post
router.get("/:id", getPostById);

// ✅ Update Post
router.put("/:id", authMiddleware, updatePost);

// ✅ Delete Post
router.delete("/:id", authMiddleware, deletePost);

export default router;

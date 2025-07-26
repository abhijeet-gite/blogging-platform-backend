//server/routes//postRoutes.js

import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getUserPosts, // ✅ Added this
} from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Create Post
router.post("/create", authMiddleware, createPost);

// ✅ Get All Posts
router.get("/", getAllPosts);

// ✅ Get User's Posts (Dashboard)
router.get("/user/:userId", authMiddleware, getUserPosts); // ✅ Added this

// ✅ Get Single Post
router.get("/:id", getPostById);

// ✅ Update Post
router.put("/:id", authMiddleware, updatePost);

// ✅ Delete Post
router.delete("/:id", authMiddleware, deletePost);

export default router;



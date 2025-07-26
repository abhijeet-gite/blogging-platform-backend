//server/routes//blogRoutes.js

const express = require("express");
const {
  createBlog,
  getUserBlogs,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createBlog);
router.get("/my-blogs", authMiddleware, getUserBlogs);
router.put("/edit/:id", authMiddleware, updateBlog);
router.delete("/delete/:id", authMiddleware, deleteBlog);

module.exports = router;

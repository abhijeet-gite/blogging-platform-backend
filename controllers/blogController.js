//server//controllers//blogController.js

import Blog from "../models/Blog.js";

// ✅ Create Blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, image, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and Content are required" });
    }

    const newBlog = await Blog.create({
      title,
      content,
      image,
      tags,
      author: req.user.id
    });

    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: "Error creating blog" });
  }
};

// ✅ Get Blogs for Logged-in User
export const getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
};

// ✅ Update Blog
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { _id: req.params.id, author: req.user.id },
      req.body,
      { new: true }
    );
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error updating blog" });
  }
};

// ✅ Delete Blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({ _id: req.params.id, author: req.user.id });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog" });
  }
};


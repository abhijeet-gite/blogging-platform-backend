//server//controllers//blogController.js

const Blog = require("../models/Blog");

// Create blog
exports.createBlog = async (req, res) => {
  const { title, content, image, tags } = req.body;
  try {
    const blog = await Blog.create({
      title,
      content,
      image,
      tags,
      author: req.user
    });
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: "Error creating blog" });
  }
};

// Get all blogs by user
exports.getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
};

// Update blog
exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content, image, tags } = req.body;
  try {
    const blog = await Blog.findOneAndUpdate(
      { _id: id, author: req.user },
      { title, content, image, tags },
      { new: true }
    );
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: "Error updating blog" });
  }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findOneAndDelete({ _id: id, author: req.user });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting blog" });
  }
};

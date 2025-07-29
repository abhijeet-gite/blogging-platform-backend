//server//controllers//blogController.js

import Blog from "../models/Blog.js";

// ✅ Create Blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, image, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const blog = await Blog.create({
      title,
      content,
      image,
      tags,
      author: req.user.id, // ✅ Corrected
    });

    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    console.error("Create Blog Error:", error);
    res.status(500).json({ message: "Error creating blog" });
  }
};

// ✅ Get All Blogs for Logged-in User
export const getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Get User Blogs Error:", error);
    res.status(500).json({ message: "Error fetching blogs" });
  }
};

// ✅ Update Blog
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, image, tags } = req.body;

    const blog = await Blog.findOneAndUpdate(
      { _id: id, author: req.user.id }, // ✅ Security check
      { title, content, image, tags },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    console.error("Update Blog Error:", error);
    res.status(500).json({ message: "Error updating blog" });
  }
};

// ✅ Delete Blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findOneAndDelete({ _id: id, author: req.user.id });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Delete Blog Error:", error);
    res.status(500).json({ message: "Error deleting blog" });
  }
};


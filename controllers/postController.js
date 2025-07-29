//server//controllers//postController.js

import Post from "../models/Post.js";

// ✅ Create a new Post
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and Content are required" });
    }

    const newPost = await Post.create({
      title,
      content,
      author: req.user.id, // user ID from JWT
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Create Post Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username email").sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Get All Posts Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Get single post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "username email");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error("Get Post By ID Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Get all posts of logged-in user
export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Get User Posts Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Update post
export const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, author: req.user.id },
      { title, content },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found or unauthorized" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Update Post Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Delete post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.user.id,
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found or unauthorized" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Delete Post Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

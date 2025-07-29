//server/app.js


import express from 'express';
import cors from 'cors';
import postRoutes from './routes/postRoutes.js';
import blogRoutes from './routes/blogRoutes.js'; 
import authRoutes from './routes/authRoutes.js';

const app = express();

// middlewares
app.use(cors()); // CORS allow करा
app.use(express.json());

// routes
app.use('/api/posts', postRoutes);
app.use('/api/blogs', blogRoutes); 
app.use('/api/auth', authRoutes);

export default app;

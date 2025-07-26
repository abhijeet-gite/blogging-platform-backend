//server/app.js


import express from 'express';
import cors from 'cors';
import postRoutes from './routes/postRoutes.js';

const app = express();

// middlewares
app.use(cors()); // CORS allow करा
app.use(express.json());

// routes
app.use('/api/posts', postRoutes);

export default app;

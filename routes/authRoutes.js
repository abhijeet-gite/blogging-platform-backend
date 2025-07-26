//server/routes//authRoutes.js

import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser); // << हे नसेल तर 404 येईल

export default router;





// middleware/verifyToken.js

import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ✅ Check if token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({ message: "Token missing or malformed" });
    }

    const token = authHeader.split(" ")[1]; // Get the actual token after "Bearer"

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attaching decoded payload to request
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export default verifyToken;


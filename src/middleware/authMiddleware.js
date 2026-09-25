import jwt from "jsonwebtoken";
import dbCon from "../config/database.js";
import 'dotenv/config';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized, no token" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB and attach to request (excluding password)
    const result = await dbCon.query("SELECT id, name, email, created_at FROM users WHERE id = $1", [decoded.id]);
    
    if (!result.rows[0]) {
      return res.status(401).json({ success: false, message: "User no longer exists" });
    }

    req.user = result.rows[0];
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Not authorized, token failed" });
  }
};

export default protect;
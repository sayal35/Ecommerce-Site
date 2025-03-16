import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protected route middleware
export const requireSignIn = async (req, res, next) => {
  try {
    console.log("Authorization Header:", req.headers.authorization); // Debugging

    if (!req.headers.authorization) {
      return res
        .status(401)
        .json({ success: false, message: "No authorization header provided" });
    }

    const token = req.headers.authorization.split(" ")[1]; // Extract token (removing "Bearer ")
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in .env");
      return res
        .status(500)
        .json({ success: false, message: "Server error: Missing JWT secret" });
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Error:", error);

    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({
          success: false,
          message: "Session expired. Please log in again.",
        });
    } else if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({
          success: false,
          message: "Invalid token. Please log in again.",
        });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Authentication failed", error });
    }
  }
};

// Admin access middleware
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.role !== 1) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access. Admins only." });
    }

    next(); // Allow access if admin
  } catch (error) {
    console.error("Error in isAdmin middleware:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error in admin middleware",
        error: error.message,
      });
  }
};

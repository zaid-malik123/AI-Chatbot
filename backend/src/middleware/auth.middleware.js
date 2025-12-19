import jwt from "jsonwebtoken";
import User from "../models/user.model.js"

export const authUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.json({ message: "unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select("-password"); 
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.userId = user._id;
    next();
  } catch (error) {
    console.log(error);
  }
};


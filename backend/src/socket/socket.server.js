import { Server } from "socket.io";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import generateAiRes from "../services/ai.service.js";
import Message from "../models/message.model.js";
// import Chat from "../models/chat.model.js";

export const initSocketServer = (httpServer) => {
  const io = new Server(httpServer, {});

  // Socket Middleware
  io.use(async (socket, next) => {
    try {
      const { token } = cookie.parse(socket.handshake.headers?.cookie || "");

      if (!token) {
        return next(new Error("Unauthorized"));
      }

      const verify = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(verify.id).select("-password");

      if (!user) {
        return next(new Error("User not found"));
      }

      socket.user = user;
      next();
    } catch (error) {
      next(new Error("Authentication failed"));
    }
  });

  io.on("connection", (socket) => {
    socket.on("user-message", async (messagePayload) => {
      await Message.create({
        user: socket.user,
        message: messagePayload.message,
        chat: messagePayload.chat,
        role: "user",
      });
      const chat = (await Message.find({ chat: messagePayload.chat }).sort({createdAt: -1}).limit(10).lean()).reverse();
      const history = chat.map((item) => {
        return {
          role: item.role,
          parts: [{ text: item.message }],
        };
      });

      const res = await generateAiRes(history);
      await Message.create({
        user: socket.user,
        message: res,
        chat: messagePayload.chat,
        role: "model",
      });

      socket.emit("ai-response", {
        res,
        chatId: messagePayload.chat,
      });
    });
  });
};

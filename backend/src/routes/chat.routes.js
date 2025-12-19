import express from "express"
import { authUser } from "../middleware/auth.middleware.js"
import { createChat, createMessage } from "../controllers/chat.controllers.js"

const router = express.Router()

router.post("/new", authUser, createChat)

router.post("/new-message/:chatId", authUser, createMessage)



export default router
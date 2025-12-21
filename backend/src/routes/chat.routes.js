import express from "express"
import { authUser } from "../middleware/auth.middleware.js"
import { allUserChats,  createChat, getAllMsgInSingleChat,  } from "../controllers/chat.controllers.js"

const router = express.Router()

router.post("/new", authUser, createChat)

// router.post("/new-message/:chatId", authUser, createMessage)

router.get("/all-chat", authUser, allUserChats)

router.get("/get-msg/:chatId", authUser, getAllMsgInSingleChat )

// router.get("/chat-message/:chatId", authUser, chatMessage)

export default router
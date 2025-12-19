import express from "express"
import { currentUser, login, logout, signup } from "../controllers/user.controllers.js";
import { authUser } from "../middleware/auth.middleware.js";
const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.get("/logout", logout)
router.get("/currUser", authUser, currentUser)

export default router;

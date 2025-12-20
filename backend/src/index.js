import express from "express"
import cookieParser from "cookie-parser"
import userRoute from "./routes/user.routes.js"
import chatRoute from "./routes/chat.routes.js"
import cors from "cors"

const app = express();




app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173"
}))

app.use("/api/user", userRoute)
app.use("/api/chat", chatRoute)

export default app;
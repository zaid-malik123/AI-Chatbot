import express from "express"
import cookieParser from "cookie-parser"
import userRoute from "./routes/user.routes.js"

const app = express();




app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use("/api/user", userRoute)

export default app;
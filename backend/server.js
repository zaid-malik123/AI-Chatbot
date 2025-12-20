import { connectDb } from "./src/db/db.js";
import app from "./src/index.js"
import {config} from "dotenv"
import http from "http"
import { initSocketServer } from "./src/socket/socket.server.js";

config()

const server = http.createServer(app)
initSocketServer(server)

connectDb()
const port = process.env.PORT;
server.listen(port, () => {
    console.log(`server is running on this ${port}`)
})
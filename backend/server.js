import { connectDb } from "./src/db/db.js";
import app from "./src/index.js"
import {config} from "dotenv"
config()


connectDb()
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`server is running on this ${port}`)
})
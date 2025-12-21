import mongoose from "mongoose";

const userSchema = mongoose.Schema({
userName: {
    type: String,
    required: true,
    unique: true
},
email: {
    type: String,
    required: true,
    unique: true
},
password: {
    type: String,
    required: true,
},

chats : [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    }
]
},{timestamps:true})

const User = mongoose.model("User", userSchema)
export default User;

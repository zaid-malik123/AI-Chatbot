import mongoose from "mongoose"


const chatSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    chatName: {
        type: String,
        required: true
    },

    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    ]

}, {timestamps: true})

const Chat = mongoose.model("Chat", chatSchema)
export default Chat;

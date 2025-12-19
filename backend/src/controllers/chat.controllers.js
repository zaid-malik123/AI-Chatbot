import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";



export const createChat = async (req, res, next) => {
try {
    const {chatName} = req.body
    const userId = req.userId;
    
    
    const newChat = await Chat.create(
        {
            chatName,
            user: userId,
        }
    )

    return res.status(201).json(newChat)
} catch (error) {
    return res.status(500).json(error)
}
}

export const createMessage = async (req, res, next) => {
    try {
        const {message} = req.body;

        const {chatId} = req.params;
        if(!message){
            return res.status(400).json("message is required")
        }
        
        const chat = await Chat.findById(chatId);

        if(!chat){
            return res.status(400).json("chat is required")
        }
        
        const newMessage = await Message.create({
            message,
            chat: chatId
        })
        
        chat.messages.push(newMessage)

        await chat.save()

        return res.status(201).json({newMessage, chatId})
    } catch (error) {
       return res.status(500).json(error)
    }
}



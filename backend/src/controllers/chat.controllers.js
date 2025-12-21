import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";


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

// export const createMessage = async (req, res, next) => {
//     try {
//         const {message} = req.body;

//         const {chatId} = req.params;
//         if(!message){
//             return res.status(400).json("message is required")
//         }
        
//         const chat = await Chat.findById(chatId);

//         if(!chat){
//             return res.status(400).json("chat is required")
//         }
        
//         const newMessage = await Message.create({
//             message,
//             chat: chatId
//         })
        
//         chat.messages.push(newMessage)

//         await chat.save()

//         return res.status(201).json({newMessage, chatId})
//     } catch (error) {
//        return res.status(500).json(error)
//     }
// }

export const allUserChats = async (req, res, next) => {
    try {
        const userId = req.userId;

        const chats = await Chat.find({user: {$eq: userId}})

        if(chats.length == 0){
            return res.status(400).json({message: "Chats not found"})
        }
        
        return res.status(200).json(chats)
    } catch (error) {
       return res.status(500).json(error)
    }
}


export const getAllMsgInSingleChat = async (req, res, next) => {
    try {
       const {chatId} = req.params;
       
       if(!chatId) return;

       const message = await Message.find({chat: chatId})
      
       return res.status(200).json(message)

    } catch (error) {
       return res.status(500).json(error)
    }
}

// export const chatMessage = async (req, res) => {
//     try {
//         const { chatId } = req.params;

//         if (!chatId) {
//             return res.status(400).json({ message: "Chat ID is required" });
//         }

//         const chat = await Chat.findById(chatId)
//             .populate("messages")
//             .sort({ updatedAt: -1 });

//         if (!chat) {
//             return res.status(404).json({ message: "Chat not found" });
//         }

//         return res.status(200).json({
//             success: true,
//             chat
//         });

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Server error",
//             error: error.message
//         });
//     }
// };

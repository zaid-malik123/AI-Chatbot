import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({

   message: {
       type: String,
       required: true
   },

   chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat"
   }

},{timestamps: true})


const Message = mongoose.model("Message", messageSchema);

export default Message
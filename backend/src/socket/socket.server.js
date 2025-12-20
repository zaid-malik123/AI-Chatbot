import { Server } from "socket.io";


export const initSocketServer = (httpServer) => {
  const io = new Server(httpServer, {})


  io.on("connection", (socket) => {
    console.log(socket.id)
  })
}



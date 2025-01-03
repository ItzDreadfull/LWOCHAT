import { Server, Socket } from 'socket.io';
import http from 'http';
import express, { Application } from 'express';
import cors from 'cors';

const app: Application = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"]
    }
})


app.use(cors())



const userSocketMap: Record<string, string> = {};//{userId:socketId}

export const getReceiverSocketId = (receiverId: string) => {
    return userSocketMap[receiverId];
}



io.on("connection", (socket: Socket) => {
    console.log("A user connected", socket.id)

    const userId = socket.handshake.query.userId as string | undefined; // Ensure userId is typed
    if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
    }
    //io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // socket.on() is used to listen to the events. can be used both on client and server side
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        if (userId) { delete userSocketMap[userId] }
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});


export { app, io, server }
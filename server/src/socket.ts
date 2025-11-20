import { type Server, Socket } from "socket.io";
import { produceMessage } from "./helper.js";

interface CustomSocket extends Socket {
    room?: string;
}

export function setupSocket(io: Server) {
    io.use((socket: CustomSocket, next) => {
        const room = socket.handshake.auth.room;
        if (!room) {
            return next(new Error("Invalid room"));
        }
        socket.room = room;
        next()
    });

    io.on("connection", (socket:CustomSocket) => {

        //join the room
        socket.join(socket.room as string)

        socket.on("message", async (data) => {
            // socket.broadcast.emit("message", data);
            await produceMessage(process.env.KAFKA_TOPIC as string,data)
            socket.to(socket.room as string).emit("message",data)
        });

        socket.on("diconnected", () => {
            console.log("A user is disconnected", socket.id);
        });
    });
}

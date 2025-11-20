import { Socket } from "socket.io";
import { produceMessage } from "./helper.js";
export function setupSocket(io) {
    io.use((socket, next) => {
        const room = socket.handshake.auth.room;
        if (!room) {
            return next(new Error("Invalid room"));
        }
        socket.room = room;
        next();
    });
    io.on("connection", (socket) => {
        //join the room
        socket.join(socket.room);
        socket.on("message", async (data) => {
            // socket.broadcast.emit("message", data);
            await produceMessage(process.env.KAFKA_TOPIC, data);
            socket.to(socket.room).emit("message", data);
        });
        socket.on("diconnected", () => {
            console.log("A user is disconnected", socket.id);
        });
    });
}

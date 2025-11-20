import express from "express";
import type { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import AuthRouter from "./routes/index.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { setupSocket } from "./socket.js";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import redis from "./config/redis.config.js";
import { connectKafkaProducer } from "./config/kafka.config.js";
import { consumeMessages } from "./helper.js";
const app: Application = express();
const PORT = process.env.PORT || 7000;

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
    // adapter: createAdapter(redis),
});

setupSocket(io);
export { io };

// * Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
    return res.send("It's working 🙌");
});

app.use("/api/", AuthRouter);

connectKafkaProducer().catch((err) =>
    console.log(`The producer error is : ${err}`)
);
consumeMessages(process.env.KAFKA_TOPIC as string).catch((err) =>
    console.log(`The consumer error is : ${err}`)
);

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

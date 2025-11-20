import prisma from "./config/db.config.js";
import { consumer, producer } from "./config/kafka.config.js";
export const produceMessage = async (topic, message) => {
    await producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
    });
};
export const consumeMessages = async (topic) => {
    await consumer.connect();
    await consumer.subscribe({ topic: topic });
    await consumer.run({
        eachMessage: async ({ topic, message, partition }) => {
            if (!message.value) {
                console.log("Empty or null message received");
                return;
            }
            const data = JSON.parse(message.value.toString());
            await prisma.chats.create({
                data: data
            });
        },
    });
};

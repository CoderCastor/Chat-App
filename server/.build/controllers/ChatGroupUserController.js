import {} from "express";
import prisma from "../config/db.config.js";
class ChatGroupUserController {
    static async index(req, res) {
        try {
            const { group_id } = req.query;
            const users = await prisma.groupUsers.findMany({
                where: {
                    group_id: group_id,
                },
            });
            return res.json({
                message: "Data fetched successfully",
                data: users,
            });
        }
        catch (error) {
            return res.status(500).json({
                message: "Something went wrong. Please try again!",
            });
        }
    }
    static async store(req, res) {
        try {
            const body = req.body;
            const user = await prisma.groupUsers.create({
                data: body,
            });
            return res.json({
                message: "User added successfully",
                data: user
            });
        }
        catch (error) {
            return res.status(500).json({
                message: "Something went wrong. Please try again!",
            });
        }
    }
}
export default ChatGroupUserController;

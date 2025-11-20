import { type Request, type Response } from "express"
import prisma from "../config/db.config.js"

class ChatsControllers {
    static async index(req : Request , res : Response){
        const {groupId} = req.params
        //implement pagination
        const chats = await prisma.chats.findMany({
            where : {
                group_id : groupId
            }
        })

        return res.json({
            data : chats
        })
    }
}

export default ChatsControllers
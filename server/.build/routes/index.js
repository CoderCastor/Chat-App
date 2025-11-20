import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import authMiddleware from "../Middlewares/AuthMiddleware.js";
import ChatGroupController from "../controllers/ChatGroupController.js";
import ChatGroupUserController from "../controllers/ChatGroupUserController.js";
import ChatsControllers from "../controllers/ChatsControllers.js";
const router = Router();
//Auth Routes
router.post("/auth/login", AuthController.login);
//Chat Group Routes
router.get("/chat-group", authMiddleware, ChatGroupController.index);
router.get("/chat-group/:id", ChatGroupController.show);
router.post("/chat-group", authMiddleware, ChatGroupController.store);
router.put("/chat-group/:id", authMiddleware, ChatGroupController.update);
router.delete("/chat-group/:id", authMiddleware, ChatGroupController.destroy);
//Chat group users routes
router.get("/chat-group-users", ChatGroupUserController.index);
router.post("/chat-group-users", ChatGroupUserController.store);
//Chat Messages Routes
router.get("/chats/:groupId", ChatsControllers.index);
export default router;

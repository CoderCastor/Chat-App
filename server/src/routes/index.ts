import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import authMiddleware from "../Middlewares/AuthMiddleware.js";
import ChatGroupController from "../controllers/ChatGroupController.js";

const router = Router();

//Auth Routes
router.post("/auth/login", AuthController.login);

//Chat Group Routes
router.get("/chat-group", authMiddleware, ChatGroupController.index);
router.get("/chat-group/:id", authMiddleware, ChatGroupController.show);
router.post("/chat-group", authMiddleware, ChatGroupController.store);
router.put("/chat-group/:id", authMiddleware, ChatGroupController.update);
router.delete("/chat-group/:id", authMiddleware, ChatGroupController.destroy);

export default router;

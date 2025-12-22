import type { Request, Response } from "express";
import { processChat } from "../services/chat.service.js";

export const handleChat = async (req: Request, res: Response) => {
    try {
        const { message, conversationId } = req.body;

        if (!message || typeof message !== "string") {
            return res.status(400).json({ error: "Message is required" });
        }

        const result = await processChat({
            message,
            conversationId,
        });

        res.json(result);
    } catch (err) {
        console.error("Send message failed:", err);
        res.status(500).json({ error: "Failed to process message" });
    }
};

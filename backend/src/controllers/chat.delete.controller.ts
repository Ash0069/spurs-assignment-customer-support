import type { Request, Response } from "express";
import db from "../db/sqlite.js";

export const deleteChat = (req: Request, res: Response) => {
    const { conversationId } = req.params;

    if (!conversationId) {
        return res.status(400).json({ error: "conversationId required" });
    }

    const tx = db.transaction(() => {
        db.prepare(
            `DELETE FROM messages WHERE conversation_id = ?`
        ).run(conversationId);

        db.prepare(
            `DELETE FROM conversations WHERE id = ?`
        ).run(conversationId);
    });

    tx();

    res.json({ success: true });
};

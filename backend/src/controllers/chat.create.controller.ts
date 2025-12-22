import type { Request, Response } from "express";
import db from "../db/sqlite.js";
import { randomUUID } from "crypto";

export const createChat = (_req: Request, res: Response) => {
    const conversationId = randomUUID();

    db.prepare(
        `
    INSERT INTO conversations (id)
    VALUES (?)
  `
    ).run(conversationId);

    res.status(201).json({
        conversationId,
    });
};

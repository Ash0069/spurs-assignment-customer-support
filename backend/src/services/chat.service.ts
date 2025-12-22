import db from "../db/sqlite.js";
import { randomUUID } from "crypto";
import { generateReply } from "./llm.service.js";

interface ProcessChatInput {
  message: string;
  conversationId?: string;
}

export async function processChat({
  message,
  conversationId,
}: ProcessChatInput) {
  const convoId = conversationId ?? randomUUID();

  // Ensure conversation exists
  db.prepare(
    `INSERT OR IGNORE INTO conversations (id) VALUES (?)`
  ).run(convoId);

  const now = new Date().toISOString();

  // Save user message
  db.prepare(
    `
    INSERT INTO messages (conversation_id, role, content, created_at)
    VALUES (?, 'user', ?, ?)
    `
  ).run(convoId, message, now);

  // Fetch conversation history
  const history = db
    .prepare(
      `
      SELECT role, content
      FROM messages
      WHERE conversation_id = ?
      ORDER BY created_at ASC
      `
    )
    .all(convoId) as { role: "user" | "assistant"; content: string }[];

  // Call AI
  const aiReply = await generateReply(history, message);

  const aiTimestamp = new Date().toISOString();

  // Save AI message
  const result = db
    .prepare(
      `
      INSERT INTO messages (conversation_id, role, content, created_at)
      VALUES (?, 'assistant', ?, ?)
      `
    )
    .run(convoId, aiReply, aiTimestamp);

  return {
    conversationId: convoId,
    message: {
      id: result.lastInsertRowid,
      role: "ai",
      content: aiReply,
      timestamp: aiTimestamp,
    },
  };
}
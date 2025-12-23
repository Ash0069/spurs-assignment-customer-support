# 🚀 AI Customer Support Chat – Full Stack Application

A full-stack customer support chat simulation using **Next.js**, **Express.js**, **SQLite**, **Redis**, and **Mistral AI**. Users can chat with an AI assistant that responds like a support agent for an e-commerce store.

---

## ✨ Features

### Frontend (Next.js)
- Modern chat UI  
- Conversation list sidebar  
- Typing indicator  
- Optimistic message sending  
- Delete conversations  
- Responsive layout  

### Backend (Node.js + Express)
- REST API  
- Persistent storage using SQLite  
- Redis caching for messages + LLM replies  
- Input validation  
- Graceful error handling  

### AI Integration (Mistral)
- Uses `mistral-small-latest` (free tier)  
- System prompt for support-agent tone  
- Recent history included  
- LLM caching to reduce cost and latency  

---

## 🛠️ Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Backend Setup

```bash
cd backend
npm install

# Run in development mode
npm run dev

# Or build and start
npm run build
npm start
```

Backend runs at: `http://localhost:3001`

### 3. Database Setup (SQLite)

SQLite is file-based; no server required.

**Automatic Setup:** The file `database.sqlite` is auto-created on first run.

If you have migrations:
```bash
sqlite3 database.sqlite < migrations/schema.sql
```

**Tables:**
- `conversations`
- `messages`

### 4. Backend Environment Variables

Create `backend/.env`:

```env
PORT=3001

# Mistral AI
MISTRAL_API_KEY=your_mistral_api_key_here

# Redis (optional)
REDIS_URL=rediss://default:<PASSWORD>@<HOST>:<PORT>
```

**Get keys from:**
- Mistral → https://console.mistral.ai
- Upstash Redis (free) → https://upstash.com/redis

### 5. Frontend Setup (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Runs at: `http://localhost:3000`

**Frontend Environment Variables**

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## 🏗️ Architecture Overview

### Backend Structure
```
backend/
 ├── controllers/         # HTTP handlers
 ├── services/            # LLM, chat, caching, rate limiting
 ├── db/                  # SQLite connection
 ├── redis/               # Redis client
 ├── routes/              # API routes
 ├── types/               # Shared types
 └── server.ts            # App entry
```

### Flow

1. User sends message (POST `/api/chat`)
2. Backend stores message → loads history → calls LLM
3. Response stored in DB + cached in Redis
4. Frontend displays reply

---

## 🤖 LLM Notes

**Provider:** Mistral AI – Model: `mistral-small-latest`

**Prompt:**
```
You are a helpful support agent for a small e-commerce store. 
Answer clearly and concisely.
```

**Strategy:**
- Keep only last 10 messages
- Temperature: 0.4
- Max output tokens: 300
- Cache results in Redis for 30 minutes

**Fallback Message:**

If LLM fails:
```
⚠️ I'm having trouble responding right now. Please try again later.
```

---

## 🟥 Redis Integration

**Used for:**

| Cache | Purpose |
|-------|---------|
| `messages:{conversationId}` | Fast message retrieval |
| `llm:{userMessage}` | Cache AI replies |
| `rate-limit:{ip}` | (Optional) rate limiting |

Redis is disabled automatically if `REDIS_URL` is missing.

---

## 🧹 Chat Deletion

Deleting a chat removes:
- Conversation from SQLite
- All messages from SQLite
- Redis cached messages
- Frontend resets active chat

---

## 🚀 Deployment

### Frontend (Vercel)

Set environment variable:
```env
NEXT_PUBLIC_API_URL=https://your-backend-url
```

### Backend (Render / Railway / Fly.io)

Set:
- `PORT`
- `MISTRAL_API_KEY`
- `REDIS_URL`

**Build:**
```bash
npm run build
```

**Start:**
```bash
npm start
```

Ensure SQLite file persists.

---

## 🔍 API Testing

### Send message
```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{ "message": "Hello!" }'
```

### Get messages
```bash
curl http://localhost:3001/api/chat/123/messages
```

### Delete chat
```bash
curl -X DELETE http://localhost:3001/api/chat/123
```

---

## 🎉 Summary

This project includes:
- ✅ Full chat interface
- ✅ Persistent conversation history
- ✅ Mistral-powered AI responses
- ✅ Redis caching for speed & cost
- ✅ Safe backend architecture
- ✅ Deployment-ready setup
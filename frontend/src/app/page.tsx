'use client';

import { MessageSquare, Plus, Trash2, Bot, Sparkles, ShoppingBag, HelpCircle, Zap } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import ChatWindow from '@/components/ChatWindow';
import ChatInput from '@/components/ChatInput';

const SUGGESTED_PROMPTS = [
  {
    icon: ShoppingBag,
    label: 'Track my order',
    prompt: 'I want to track the status of my recent order.',
  },
  {
    icon: HelpCircle,
    label: 'Return policy',
    prompt: 'What is your return and refund policy?',
  },
  {
    icon: Zap,
    label: 'Shipping info',
    prompt: 'How long does shipping usually take?',
  },
];

export default function Home() {
  const {
    chats,
    activeChat,
    messages,
    isLoading,
    deleteChat,
    setActiveChat,
    createNewChat,
    sendMessage,
  } = useChat();

  const currentChat = activeChat
    ? chats.find((chat) => chat.id === activeChat)
    : null;

  const showWelcome = !currentChat && messages.length === 0;

  return (
    <div className="flex h-screen bg-[var(--bg-primary)]">
      {/* ─── Sidebar ─── */}
      <aside className="w-80 flex-shrink-0 glass flex flex-col border-r border-[var(--border-subtle)]" id="sidebar">
        {/* Brand + New Chat */}
        <div className="p-5 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-lg gradient-accent flex items-center justify-center glow-shadow">
              <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-[var(--text-primary)] tracking-tight">
                AI Support
              </h1>
              <p className="text-[10px] text-[var(--text-muted)] tracking-wide uppercase">
                Always online
              </p>
            </div>
          </div>

          <button
            onClick={createNewChat}
            id="new-chat-button"
            className="w-full px-4 py-2.5 gradient-accent text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            New Chat
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto py-2">
          {chats.map((chat) => {
            const isActive = activeChat === chat.id;

            return (
              <div
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                role="button"
                tabIndex={0}
                id={`chat-item-${chat.id}`}
                className={`group mx-2 mb-1 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                  isActive
                    ? 'bg-[var(--bg-surface)] border border-[var(--border-accent)] shadow-sm'
                    : 'hover:bg-[var(--bg-surface-hover)] border border-transparent'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5 ${
                      isActive
                        ? 'gradient-accent text-white shadow-sm shadow-purple-500/20'
                        : 'bg-[var(--bg-surface)] text-[var(--text-muted)] group-hover:text-[var(--text-accent)]'
                    } transition-colors duration-200`}
                  >
                    <MessageSquare size={15} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium truncate ${
                        isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'
                      }`}
                    >
                      {chat.title}
                    </p>

                    <p className="text-xs text-[var(--text-muted)] truncate mt-0.5">
                      {chat.lastMessage || 'No messages yet'}
                    </p>

                    <p className="text-[10px] text-[var(--text-muted)] mt-1">
                      {new Date(chat.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChat(chat.conversationId);
                    }}
                    id={`delete-chat-${chat.id}`}
                    className="flex-shrink-0 opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-[var(--text-muted)] hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
                    title="Delete chat"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}

          {chats.length === 0 && (
            <div className="px-6 py-10 text-center">
              <MessageSquare size={32} className="mx-auto text-[var(--text-muted)] opacity-40 mb-3" />
              <p className="text-sm text-[var(--text-muted)]">No conversations yet</p>
              <p className="text-xs text-[var(--text-muted)] mt-1 opacity-60">
                Start one by clicking &quot;New Chat&quot;
              </p>
            </div>
          )}
        </div>
      </aside>

      {/* ─── Main Chat Area ─── */}
      <main className="flex-1 flex flex-col min-w-0" id="main-chat-area">
        {/* Header */}
        {currentChat ? (
          <header className="bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)] px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                  {currentChat.title}
                </h2>
                <p className="text-[11px] text-[var(--text-muted)] font-mono">
                  {currentChat.conversationId.slice(0, 12)}…
                </p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] text-emerald-400 font-medium">Online</span>
              </div>
            </div>
          </header>
        ) : (
          <header className="bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)] px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center">
                <Bot size={16} className="text-[var(--text-muted)]" />
              </div>
              <p className="text-sm text-[var(--text-muted)]">
                Start a new conversation
              </p>
            </div>
          </header>
        )}

        {/* Messages or Welcome */}
        {showWelcome ? (
          <div className="flex-1 flex items-center justify-center bg-[var(--bg-primary)] px-6">
            <div className="text-center max-w-md animate-fade-in">
              {/* Hero Icon */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl gradient-accent flex items-center justify-center glow-shadow animate-pulse-glow">
                <Sparkles size={36} className="text-white" />
              </div>

              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2 tracking-tight">
                How can I help you?
              </h2>
              <p className="text-sm text-[var(--text-muted)] mb-8 leading-relaxed">
                I&apos;m your AI-powered support assistant. Ask me anything about orders, returns, shipping, and more.
              </p>

              {/* Suggested Prompts */}
              <div className="grid gap-3">
                {SUGGESTED_PROMPTS.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => sendMessage(item.prompt)}
                    id={`prompt-${item.label.toLowerCase().replace(/\s/g, '-')}`}
                    className="group w-full glass glass-hover rounded-xl px-5 py-4 flex items-center gap-4 text-left transition-all duration-200 hover:border-[var(--border-accent)] hover:shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-accent)] group-hover:gradient-accent group-hover:text-white transition-all duration-200">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">
                        {item.label}
                      </p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        {item.prompt}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <ChatWindow messages={messages} isLoading={isLoading} />
        )}

        {/* Input */}
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </main>
    </div>
  );
}
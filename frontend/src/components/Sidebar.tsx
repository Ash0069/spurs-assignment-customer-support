'use client';

import { MessageSquare, Plus, Trash2, Sparkles } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { Chat } from '@/types/chat';

interface SidebarProps {
  chats: Chat[];
  onNewChat: () => void;
  onDeleteChat: (conversationId: string) => void;
}

export default function Sidebar({ chats, onNewChat, onDeleteChat }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Derive active conversation ID from URL
  const activeId = pathname.startsWith('/conversations/')
    ? pathname.split('/conversations/')[1]
    : null;

  return (
    <aside className="w-80 flex-shrink-0 glass flex flex-col border-r border-[var(--border-subtle)]" id="sidebar">
      {/* Brand + New Chat */}
      <div className="p-5 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2.5 mb-5">
          <div
            className="w-9 h-9 rounded-lg gradient-accent flex items-center justify-center glow-shadow cursor-pointer"
            onClick={() => router.push('/')}
          >
            <Sparkles size={18} className="text-white" />
          </div>
          <div className="cursor-pointer" onClick={() => router.push('/')}>
            <h1 className="text-sm font-bold text-[var(--text-primary)] tracking-tight">
              AI Support
            </h1>
            <p className="text-[10px] text-[var(--text-muted)] tracking-wide uppercase">
              Always online
            </p>
          </div>
        </div>

        <button
          onClick={onNewChat}
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
          const isActive = activeId === chat.conversationId;

          return (
            <div
              key={chat.id}
              onClick={() => router.push(`/conversations/${chat.conversationId}`)}
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
                    onDeleteChat(chat.conversationId);
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
  );
}

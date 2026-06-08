import { Message } from '@/types/chat';
import { Bot, User } from 'lucide-react';

interface MessageBubbleProps {
    message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
    const isUser = message.role === 'user';

    return (
        <div
            className={`flex items-end gap-3 animate-fade-in ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
        >
            {/* Avatar */}
            <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${isUser
                        ? 'gradient-accent text-white shadow-lg shadow-purple-500/20'
                        : 'bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-accent)]'
                    }`}
            >
                {isUser ? <User size={16} /> : <Bot size={16} />}
            </div>

            {/* Bubble */}
            <div className="max-w-[70%] flex flex-col gap-1">
                <div
                    className={`px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${isUser
                            ? 'gradient-accent text-white rounded-2xl rounded-br-md shadow-lg shadow-purple-500/15'
                            : 'glass text-[var(--text-primary)] rounded-2xl rounded-bl-md'
                        }`}
                >
                    {message.content}
                </div>

                {/* Timestamp */}
                <span
                    className={`text-[10px] text-[var(--text-muted)] px-1 ${isUser ? 'text-right' : 'text-left'}`}
                >
                    {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </span>
            </div>
        </div>
    );
}
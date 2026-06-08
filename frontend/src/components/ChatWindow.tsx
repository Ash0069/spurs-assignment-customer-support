'use client';

import { useEffect, useRef } from 'react';
import { Message } from '@/types/chat';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

interface ChatWindowProps {
    messages: Message[];
    isLoading: boolean;
}

export default function ChatWindow({ messages, isLoading }: ChatWindowProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const lastMessageCountRef = useRef(0);

    useEffect(() => {
        // Only auto-scroll when messages are appended
        if (messages.length > lastMessageCountRef.current) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }

        lastMessageCountRef.current = messages.length;
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 bg-[var(--bg-primary)]">
            {messages.map((message, index) => (
                <MessageBubble
                    key={`${message.id}-${index}`}
                    message={message}
                />
            ))}

            {isLoading && <TypingIndicator />}

            <div ref={messagesEndRef} />
        </div>
    );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

export default function ChatInput({ onSend, disabled = false }: ChatInputProps) {
    const [input, setInput] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    useEffect(() => {
        const el = textareaRef.current;
        if (el) {
            el.style.height = 'auto';
            el.style.height = Math.min(el.scrollHeight, 150) + 'px';
        }
    }, [input]);

    const handleSend = () => {
        if (!input.trim() || disabled) return;
        onSend(input);
        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-4">
            <div className="max-w-4xl mx-auto flex items-end gap-3">
                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    rows={1}
                    className="flex-1 px-4 py-3 bg-[var(--bg-input)] text-[var(--text-primary)] placeholder-[var(--text-muted)] rounded-xl border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--accent-via)] focus:ring-1 focus:ring-[var(--accent-via)]/30 resize-none transition-all duration-200 text-sm leading-relaxed"
                    disabled={disabled}
                    id="chat-message-input"
                />
                <button
                    onClick={handleSend}
                    disabled={!input.trim() || disabled}
                    id="chat-send-button"
                    className="flex-shrink-0 w-11 h-11 rounded-xl gradient-accent text-white flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none transition-all duration-200"
                >
                    <Send size={18} />
                </button>
            </div>
        </div>
    );
}
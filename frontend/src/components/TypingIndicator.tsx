import { Bot } from 'lucide-react';

export default function TypingIndicator() {
    return (
        <div className="flex items-end gap-3 animate-fade-in">
            {/* Bot Avatar */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-accent)]">
                <Bot size={16} />
            </div>

            {/* Dots Container */}
            <div className="glass rounded-2xl rounded-bl-md px-5 py-4">
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[var(--text-accent)] animate-bounce-dot dot-delay-1" />
                    <span className="w-2 h-2 rounded-full bg-[var(--text-accent)] animate-bounce-dot dot-delay-2" />
                    <span className="w-2 h-2 rounded-full bg-[var(--text-accent)] animate-bounce-dot dot-delay-3" />
                </div>
            </div>
        </div>
    );
}
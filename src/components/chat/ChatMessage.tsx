'use client';

import { ChatMessage as ChatMessageType } from '@/lib/types';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
    message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
    const isUser = message.role === 'user';

    return (
        <div className={cn(
            'flex items-start gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300',
            isUser && 'flex-row-reverse'
        )}>
            {/* Avatar */}
            <div className={cn(
                'h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0',
                isUser ? 'bg-primary' : 'bg-primary/10'
            )}>
                {isUser ? (
                    <User className="h-5 w-5 text-white" />
                ) : (
                    <Bot className="h-5 w-5 text-primary" />
                )}
            </div>

            {/* Message Bubble */}
            <div className={cn(
                'rounded-2xl px-4 py-3 max-w-[80%] break-words',
                isUser
                    ? 'bg-primary text-white rounded-tr-sm'
                    : 'bg-secondary text-foreground rounded-tl-sm'
            )}>
                {/* Render message content with markdown-like formatting */}
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content.split('\n').map((line, i) => {
                        // Handle bold text **text**
                        if (line.includes('**')) {
                            const parts = line.split('**');
                            return (
                                <p key={i} className="mb-1 last:mb-0">
                                    {parts.map((part, j) =>
                                        j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                                    )}
                                </p>
                            );
                        }
                        // Handle bullet points
                        if (line.trim().startsWith('✨') || line.trim().startsWith('🎓') ||
                            line.trim().startsWith('📚') || line.trim().startsWith('💼')) {
                            return <p key={i} className="mb-1 last:mb-0 pl-1">{line}</p>;
                        }
                        // Regular text
                        return line ? <p key={i} className="mb-1 last:mb-0">{line}</p> : <br key={i} />;
                    })}
                </div>

                {/* Timestamp */}
                <p className={cn(
                    'text-xs mt-2 opacity-60',
                    isUser ? 'text-white/80' : 'text-muted-foreground'
                )}>
                    {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </p>
            </div>
        </div>
    );
}

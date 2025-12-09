'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Bot, X, Sparkles, WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@/hooks/use-chat';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { ChatInput } from '@/components/chat/ChatInput';

export function ChatWidget() {
    const { isOpen, toggleChat, messages, isLoading, clearChat, history, loadSession } = useChat();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showHistory, setShowHistory] = useState(false);
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        setIsOnline(navigator.onLine);
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    return (
        <>
            {/* Floating Chat Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                        className="fixed bottom-6 right-6 z-50"
                    >
                        <Button
                            onClick={toggleChat}
                            size="lg"
                            className="h-16 w-16 rounded-full shadow-2xl bg-gradient-to-br from-primary via-primary to-primary/80 hover:from-primary/90 hover:via-primary hover:to-primary/70 transition-all duration-300 group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative flex items-center justify-center">
                                <Bot className="h-7 w-7 text-white relative z-10" />
                                <Sparkles className="h-4 w-4 text-yellow-300 absolute -top-1 -right-1" />
                            </div>
                            {messages.length === 0 && (
                                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center">
                                    <Sparkles className="h-3 w-3 text-white" />
                                </span>
                            )}
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed bottom-6 right-6 z-50 w-[400px] max-h-[600px] flex flex-col shadow-2xl md:w-[400px] sm:w-[90vw] sm:right-4"
                    >
                        <Card className="flex flex-col h-full overflow-hidden border-2 relative">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary to-primary/80">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                            <Bot className="h-6 w-6 text-white" />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white flex items-center gap-1">
                                            CareerMitra
                                            <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
                                        </h3>
                                        <p className="text-xs text-white/80">AI Career Guide</p>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setShowHistory(!showHistory)}
                                        className="text-white hover:bg-white/20 h-8 w-8"
                                        title="Chat History"
                                    >
                                        <Bot className="h-5 w-5" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                            clearChat(); // Starts New Chat
                                            setShowHistory(false);
                                        }}
                                        className="text-white hover:bg-white/20 h-8 w-8"
                                        title="New Chat"
                                    >
                                        <Sparkles className="h-5 w-5" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={toggleChat}
                                        className="text-white hover:bg-white/20 h-8 w-8"
                                    >
                                        <X className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>

                            {/* Main Chat Area */}
                            {!showHistory ? (
                                <div
                                    ref={scrollRef}
                                    className="flex-1 overflow-y-auto p-4 space-y-4 bg-white"
                                    style={{ maxHeight: '400px', minHeight: '300px' }}
                                >
                                    {messages.map((message) => (
                                        <ChatMessage key={message.id} message={message} />
                                    ))}

                                    {isLoading && (
                                        <div className="flex items-start gap-2">
                                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <Bot className="h-5 w-5 text-primary" />
                                            </div>
                                            <div className="bg-secondary rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                                                <div className="flex gap-1">
                                                    <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                    <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                    <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {!isOnline && (
                                        <div className="flex justify-center my-4">
                                            <div className="flex items-center gap-2 bg-yellow-50 text-yellow-800 px-3 py-1.5 rounded-full text-xs font-medium border border-yellow-200">
                                                <WifiOff className="h-3 w-3" />
                                                You are currently offline
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                /* History View */
                                <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50" style={{ maxHeight: '400px', minHeight: '300px' }}>
                                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">Previous Conversations</h4>
                                    {history.length === 0 ? (
                                        <div className="text-center text-muted-foreground py-8 text-sm">
                                            No chat history yet.
                                        </div>
                                    ) : (
                                        history.map((session, idx) => {
                                            // Find first user message for title
                                            const firstUserMsg = session.messages.find(m => m.role === 'user')?.content || 'New Chat';
                                            const date = new Date(session.lastUpdated).toLocaleDateString();
                                            return (
                                                <Button
                                                    key={idx}
                                                    variant="outline"
                                                    className="w-full justify-start text-left h-auto py-3 px-4 bg-white"
                                                    onClick={() => {
                                                        loadSession(session);
                                                        setShowHistory(false);
                                                    }}
                                                >
                                                    <div className="truncate w-full">
                                                        <div className="font-medium truncate">{firstUserMsg}</div>
                                                        <div className="text-xs text-muted-foreground">{date} • {session.messages.length} messages</div>
                                                    </div>
                                                </Button>
                                            );
                                        })
                                    )}
                                </div>
                            )}

                            {/* Input Area (only show if not viewing history) */}
                            {!showHistory && (
                                <div className="border-t p-4 bg-muted/30">
                                    {isOnline ? (
                                        <ChatInput />
                                    ) : (
                                        <div className="text-center text-xs text-muted-foreground py-2 mb-2 bg-gray-50 rounded-lg">
                                            Chat is unavailable while offline
                                        </div>
                                    )}
                                </div>
                            )}
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

'use client';

import {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
    type ReactNode,
} from 'react';
import { ChatMessage, ChatSession, type ChatContext } from '@/lib/types';
import { useAuth } from './use-auth';
import { chatWithStudent } from '@/ai/flows/chat-with-student';

interface ChatContextType {
    messages: ChatMessage[];
    history: ChatSession[];
    isOpen: boolean;
    isLoading: boolean;
    sendMessage: (content: string) => Promise<void>;
    toggleChat: () => void;
    clearChat: () => void; // Starts new chat (archives current)
    deleteHistory: () => void;
    loadSession: (session: ChatSession) => void;
}

const ChatCtx = createContext<ChatContextType>({
    messages: [],
    history: [],
    isOpen: false,
    isLoading: false,
    sendMessage: async () => { },
    toggleChat: () => { },
    clearChat: () => { },
    deleteHistory: () => { },
    loadSession: () => { },
});

const STORAGE_KEY = 'careermitra_chat_session';
const HISTORY_KEY = 'careermitra_chat_history';
const MAX_MESSAGES = 50;

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [history, setHistory] = useState<ChatSession[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { userProfile, quizAnswers } = useAuth();

    // Load history and session on mount
    useEffect(() => {
        // Load active session
        const storedSession = localStorage.getItem(STORAGE_KEY);
        if (storedSession) {
            try {
                const session: ChatSession = JSON.parse(storedSession);
                // We don't auto-load into 'messages' here because "Open = New Chat" rule 
                // will handle archiving it if it exists when opened?
                // Actually, if we refresh page, we might want to keep state?
                // User said "whenever user opens chatbot".
                // Let's load it into state, but toggleChat logic will handle the "New" part.
                setMessages(session.messages);
            } catch (error) {
                console.error('Failed to load chat session:', error);
            }
        }

        // Load history
        const storedHistory = localStorage.getItem(HISTORY_KEY);
        if (storedHistory) {
            try {
                setHistory(JSON.parse(storedHistory));
            } catch (error) {
                console.error('Failed to load chat history:', error);
            }
        }
    }, []);

    // Persist messages to local storage
    useEffect(() => {
        if (messages.length > 0) {
            const session: ChatSession = {
                messages: messages.slice(-MAX_MESSAGES),
                lastUpdated: Date.now(),
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
        } else {
            // If messages are empty (cleared), remove from active storage
            localStorage.removeItem(STORAGE_KEY);
        }
    }, [messages]);

    // Persist history to local storage
    useEffect(() => {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    }, [history]);

    // Archive current session to history
    const archiveCurrentSession = useCallback(() => {
        if (messages.length === 0) return;

        // Don't archive if it's just a welcome message or empty
        const hasUserMessages = messages.some(m => m.role === 'user');
        if (!hasUserMessages) return;

        const session: ChatSession = {
            messages: messages,
            lastUpdated: Date.now(),
        };

        setHistory(prev => [session, ...prev].slice(0, 20)); // Keep last 20 sessions
        setMessages([]); // Clear active
        localStorage.removeItem(STORAGE_KEY);
    }, [messages]);

    // Build user context for AI
    const getUserContext = useCallback((): ChatContext => {
        const hasQuizAnswers = !!(quizAnswers && Object.keys(quizAnswers).length > 0);

        // Generate a brief quiz summary if available
        let quizSummary: string | undefined;
        if (hasQuizAnswers) {
            const answerCount = Object.keys(quizAnswers!).length;
            quizSummary = `Completed ${answerCount} question assessment. User has received personalized career recommendations.`;
        }

        return {
            name: userProfile?.name || 'there',
            userType: userProfile?.userType || 'student',
            classLevel: userProfile?.classLevel,
            quizCompleted: hasQuizAnswers,
            quizSummary,
        };
    }, [userProfile, quizAnswers]);

    const sendMessage = useCallback(
        async (content: string) => {
            if (!content.trim() || isLoading) return;

            const userMessage: ChatMessage = {
                id: `user-${Date.now()}`,
                role: 'user',
                content: content.trim(),
                timestamp: Date.now(),
            };

            setMessages((prev) => [...prev, userMessage]);
            setIsLoading(true);

            try {
                const messageHistory = [...messages, userMessage].map((msg) => ({
                    role: msg.role,
                    content: msg.content,
                    timestamp: msg.timestamp,
                }));

                const userContext = getUserContext();

                const response = await chatWithStudent({
                    messages: messageHistory,
                    userContext,
                });

                const assistantMessage: ChatMessage = {
                    id: `assistant-${Date.now()}`,
                    role: 'assistant',
                    content: response.response,
                    timestamp: Date.now(),
                };

                setMessages((prev) => [...prev, assistantMessage]);
            } catch (error) {
                console.error('Failed to get AI response:', error);
                const errorMessage: ChatMessage = {
                    id: `error-${Date.now()}`,
                    role: 'assistant',
                    content: "I'm sorry, I'm having trouble responding right now. Please try again in a moment!",
                    timestamp: Date.now(),
                };
                setMessages((prev) => [...prev, errorMessage]);
            } finally {
                setIsLoading(false);
            }
        },
        [messages, isLoading, getUserContext]
    );

    const toggleChat = useCallback(() => {
        // "whenever user opens chatbot it has to show new chat"
        // Logic: If opening (!isOpen -> true), archive current and start fresh.
        if (!isOpen) {
            // We are about to open it.
            // Archive previous session if it exists and has content
            if (messages.length > 0 && messages.some(m => m.role === 'user')) {
                const session: ChatSession = {
                    messages: messages,
                    lastUpdated: Date.now(),
                };
                setHistory(prev => [session, ...prev].slice(0, 20));
                setMessages([]); // Clear for new chat
            }
        }

        setIsOpen((prev) => !prev);
    }, [isOpen, messages]);

    // Effect to add welcome message if empty (happens after toggleChat clears it)
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const welcomeMessage: ChatMessage = {
                id: 'welcome',
                role: 'assistant',
                content: `Hi ${userProfile?.name || 'there'}! 👋 I'm **CareerMitra**, your AI career guide. I'm here to help you with:\n\n✨ Career stream suggestions\n🎓 College recommendations\n📚 Entrance exam guidance\n💼 Job market insights\n\nWhat would you like to know about your career journey?`,
                timestamp: Date.now(),
            };
            setMessages([welcomeMessage]);
        }
    }, [isOpen, messages.length, userProfile?.name]);

    const clearChat = useCallback(() => {
        // This is explicitly "Start New Chat" button action
        archiveCurrentSession();
    }, [archiveCurrentSession]);

    const deleteHistory = useCallback(() => {
        setHistory([]);
        localStorage.removeItem(HISTORY_KEY);
    }, []);

    const loadSession = useCallback((session: ChatSession) => {
        // Archive current before loading old one?
        archiveCurrentSession();
        setMessages(session.messages);
    }, [archiveCurrentSession]);

    const contextValue = {
        messages,
        history,
        isOpen,
        isLoading,
        sendMessage,
        toggleChat,
        clearChat,
        deleteHistory,
        loadSession,
    };

    return (
        <ChatCtx.Provider value={contextValue}>
            {children}
        </ChatCtx.Provider>
    );
};

export const useChat = () => useContext(ChatCtx);

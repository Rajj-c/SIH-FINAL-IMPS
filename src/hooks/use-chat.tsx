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
    isOpen: boolean;
    isLoading: boolean;
    sendMessage: (content: string) => Promise<void>;
    toggleChat: () => void;
    clearChat: () => void;
}

const ChatCtx = createContext<ChatContextType>({
    messages: [],
    isOpen: false,
    isLoading: false,
    sendMessage: async () => { },
    toggleChat: () => { },
    clearChat: () => { },
});

const STORAGE_KEY = 'careermitra_chat_session';
const MAX_MESSAGES = 50; // Limit stored messages

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { userProfile, quizAnswers } = useAuth();

    // Load chat history from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const session: ChatSession = JSON.parse(stored);
                // Only load if session is less than 24 hours old
                const dayInMs = 24 * 60 * 60 * 1000;
                if (Date.now() - session.lastUpdated < dayInMs) {
                    setMessages(session.messages);
                } else {
                    localStorage.removeItem(STORAGE_KEY);
                }
            } catch (error) {
                console.error('Failed to load chat session:', error);
                localStorage.removeItem(STORAGE_KEY);
            }
        }
    }, []);

    // Save chat history to localStorage whenever messages change
    useEffect(() => {
        if (messages.length > 0) {
            const session: ChatSession = {
                messages: messages.slice(-MAX_MESSAGES), // Keep only last 50 messages
                lastUpdated: Date.now(),
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
        }
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

            // Add user message immediately
            setMessages((prev) => [...prev, userMessage]);
            setIsLoading(true);

            try {
                // Prepare messages for AI
                const messageHistory = [...messages, userMessage].map((msg) => ({
                    role: msg.role,
                    content: msg.content,
                    timestamp: msg.timestamp,
                }));

                const userContext = getUserContext();

                // Call AI chat flow
                const response = await chatWithStudent({
                    messages: messageHistory,
                    userContext,
                });

                // Add AI response
                const assistantMessage: ChatMessage = {
                    id: `assistant-${Date.now()}`,
                    role: 'assistant',
                    content: response.response,
                    timestamp: Date.now(),
                };

                setMessages((prev) => [...prev, assistantMessage]);
            } catch (error) {
                console.error('Failed to get AI response:', error);

                // Add error message
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
        setIsOpen((prev) => !prev);

        // Add welcome message if this is first interaction
        if (!isOpen && messages.length === 0) {
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
        setMessages([]);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    const contextValue = {
        messages,
        isOpen,
        isLoading,
        sendMessage,
        toggleChat,
        clearChat,
    };

    return (
        <ChatCtx.Provider value={contextValue}>
            {children}
        </ChatCtx.Provider>
    );
};

export const useChat = () => useContext(ChatCtx);

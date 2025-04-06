"use client";

import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
// Import your context JSON directly
import contextData from '@/assets/legal-context.json';
import ReactMarkdown from 'react-markdown'; // Add this import
import Link from 'next/link';

// Custom component to render links as chips
const LinkChip = ({ href, children }) => {
    // Extract blog ID from the URL
    const blogId = href.split('/').pop();
    return (
        <Link
            href={href}
            className="inline-flex items-center px-3 py-1 m-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Blog #{blogId}
        </Link>
    );
};

// Custom renderer for markdown links
const MarkdownComponents = {
    a: ({ href, children }) => {
        if (href?.includes('localhost:3000/blogs/')) {
            return <LinkChip href={href}>{children}</LinkChip>;
        }
        return <a href={href} className="text-blue-600 hover:underline">{children}</a>;
    },
    p: ({ children }) => <p className="mb-4 text-gray-800">{children}</p>,
    h1: ({ children }) => <h1 className="text-2xl font-bold mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-xl font-bold mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-lg font-bold mb-2">{children}</h3>,
    ul: ({ children }) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
    li: ({ children }) => <li className="mb-1">{children}</li>,
};

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Initialize Gemini model with system prompt and context
    const initializeChat = async (userInput) => {
        try {
            const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
            if (!apiKey) {
                throw new Error("Gemini API key is missing");
            }

            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

            // Create chat history from existing messages
            let chatHistory = messages.map(msg => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }],
            }));

            // For the first interaction, include context with user's message
            if (messages.length === 0) {
                // When starting a new conversation, modify the user input to include context
                const enhancedUserInput = `
I need legal information based on this context:
${JSON.stringify(contextData, null, 2)}

Here's my question: ${userInput}

IMPORTANT: When answering my question:
1. ALWAYS include direct links to relevant blog posts in this exact format: http://localhost:3000/blogs/[id]
2. For each blog post you reference, include the lawyer ID who wrote it
3. Provide comprehensive legal information that directly addresses my query
4. Maintain a professional tone as a LexInsight legal assistant

Example of how to include blog links:
"Based on your question, I recommend reading Blog #123 (written by Lawyer ID: L456) which covers this topic in detail. You can find it here: http://localhost:3000/blogs/123"

Please ensure every response includes at least one direct blog link when relevant.`;

                // Start a fresh chat and send the enhanced message
                const chat = model.startChat({
                });
                return await chat.sendMessage(enhancedUserInput);
            } else {
                // For ongoing conversations, use existing history
                const chat = model.startChat({
                    history: chatHistory,
                });

                return await chat.sendMessage(userInput);
            }
        } catch (error) {
            console.error("Error with Gemini API:", error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Add user message
        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        const userInput = input;
        setInput('');
        setLoading(true);

        try {
            const result = await initializeChat(userInput);
            const responseText = result.response.text();

            setMessages(prev => [...prev, {
                role: 'model',
                content: responseText
            }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'model',
                content: "Sorry, I encountered an error processing your request."
            }]);
            console.error("Error sending message:", error);
        } finally {
            setLoading(false);
        }
    };

    // Header Component (simplified version matching your site)

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto px-4 py-6">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="border-b border-gray-200 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700">
                        <h1 className="text-2xl font-bold text-white">Chat with LexBot</h1>
                        <p className="text-blue-100">Your AI-powered legal assistant</p>
                    </div>

                    <div className="p-6">
                        <div className="bg-gray-50 rounded-xl p-4 mb-6 h-[60vh] overflow-y-auto">
                            {messages.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                    <div className="w-16 h-16 mb-4 text-blue-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-medium text-gray-700">Welcome to LexBot</h2>
                                    <p className="mt-2">Ask me any legal questions you have</p>
                                </div>
                            )}

                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`mb-6 ${message.role === 'user' ? 'ml-auto' : 'mr-auto'} max-w-[80%]`}
                                >
                                    <div className={`flex items-start ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${message.role === 'user' ? 'bg-blue-600 ml-2' : 'bg-gray-600 mr-2'
                                            }`}>
                                            {message.role === 'user' ? (
                                                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            ) : (
                                                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            )}
                                        </div>
                                        <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                                            <div className={`p-4 rounded-2xl ${message.role === 'user'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-white border border-gray-200'
                                                }`}>
                                                {message.role === 'user' ? (
                                                    <p>{message.content}</p>
                                                ) : (
                                                        <div className={`${message.role === 'user' ? 'text-white' : 'text-gray-800'}`}>
                                                            <ReactMarkdown components={MarkdownComponents}>
                                                                {message.content}
                                                            </ReactMarkdown>
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-xs mt-1 text-gray-500">
                                                {message.role === 'user' ? 'You' : 'LexBot'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {loading && (
                                <div className="mb-6 mr-auto max-w-[80%]">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-600 mr-2 flex items-center justify-center">
                                            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-white border border-gray-200">
                                            <div className="flex space-x-2">
                                                <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0s' }}></div>
                                                <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-xs mt-1 text-gray-500 ml-10">LexBot is typing...</span>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleSubmit} className="flex gap-3">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your legal question..."
                                disabled={loading}
                                className="flex-1 p-4 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                            <button
                                type="submit"
                                disabled={loading || !input.trim()}
                                className="px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <span>Send</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
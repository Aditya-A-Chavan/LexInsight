"use client";

import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
// Import your context JSON directly
import contextData from '@/assets/legal-context.json';
import ReactMarkdown from 'react-markdown'; // Add this import

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

When answering:
1. Refer to relevant blog posts that address my question when possible
2. Include the lawyer ID who wrote any blog you mention
3. Solve my legal query comprehensively
4. Add direct links to suggested blogs in the format: https://localhost:3000/blog/[id]

Please maintain a professional tone as a LexInsight legal assistant.`;

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
            console.error("Error sending message:");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Header Component (simplified version matching your site)

    return (
        <div className="bg-primary/5 min-h-screen">


            <main className="container mx-auto px-4 py-6">
                <div className="bg-background rounded-lg shadow-sm overflow-hidden mb-6">
                    <div className="border-b border-gray-100 px-6 py-4">
                        <h1 className="text-2xl font-bold">Chat with LexBot</h1>
                        <p className="text-text/70">Get quick answers to your legal questions</p>
                    </div>

                    <div className="p-6">
                        <div className="bg-primary/5 rounded-lg p-4 mb-6 h-[60vh] overflow-y-auto">
                            {messages.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-full opacity-70 text-center">
                                    <div className="w-16 h-16 mb-4 text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-medium">How can I help you today?</h2>
                                    <p className="mt-2 text-text/70">Ask me any legal questions you have</p>
                                </div>
                            )}

                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`mb-4 max-w-[80%] ${message.role === 'user'
                                        ? 'ml-auto'
                                        : 'mr-auto'
                                        }`}
                                >
                                    <div className={`p-3 rounded-lg ${message.role === 'user'
                                        ? 'bg-primary text-white rounded-br-sm'
                                        : 'bg-gray-100 dark:bg-gray-700 text-white rounded-bl-sm'
                                        }`}>
                                        {message.role === 'user' ? (
                                            message.content
                                        ) : (

                                            <ReactMarkdown>
                                                {message.content}
                                            </ReactMarkdown>

                                        )}
                                    </div>
                                    <div className={`text-xs mt-1 text-text/50 ${message.role === 'user' ? 'text-right' : ''}`}>
                                        {message.role === 'user' ? 'You' : 'LexBot'}
                                    </div>
                                </div>
                            ))}

                            {loading && (
                                <div className="mb-4 max-w-[80%] mr-auto">
                                    <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 rounded-bl-sm">
                                        <div className="flex space-x-2">
                                            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0s' }}></div>
                                            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                        </div>
                                    </div>
                                    <div className="text-xs mt-1 text-text/50">LexBot is typing...</div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleSubmit} className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your legal question..."
                                disabled={loading}
                                className="flex-1 p-3 border rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                            <button
                                type="submit"
                                disabled={loading || !input.trim()}
                                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            <footer className="bg-accent text-background py-6 mt-12">
                <div className="container mx-auto px-6 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} LexInsight. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}
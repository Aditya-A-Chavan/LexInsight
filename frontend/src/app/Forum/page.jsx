'use client';
import React, { useState } from "react";
import {
  MessageCircle,
  Share2,
  Search,
  Plus,
  TrendingUp,
  Star,
  Filter,
  Clock
} from "lucide-react";
import Image from 'next/image';

const Forum = () => {
  const [showToast, setShowToast] = useState(false);
  const [copiedLink, setCopiedLink] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for categories
  const categories = [
    "Criminal Law",
    "Civil Law",
    "Family Law",
    "Corporate Law",
    "Property Law",
    "Constitutional Law",
    "General Legal Advice"
  ];

  // Mock data for threads
  const [threads, setThreads] = useState([
    {
      id: 1,
      author: {
        name: "John Doe",
        role: "Lawyer",
        isVerified: true,
        profilePic: "/lawyer-profile.jpg"
      },
      category: "Criminal Law",
      question: "What are the legal implications of self-defense in a criminal case?",
      content: "I'm interested in understanding how self-defense laws work in criminal cases. What are the key factors that determine if self-defense is justified?",
      timestamp: "2 hours ago",
      likes: 24,
      replies: 8,
      isLiked: false,
      replies: [
        {
          id: 1,
          author: {
            name: "Sarah Wilson",
            role: "Criminal Defense Lawyer",
            isVerified: true,
            profilePic: "/lawyer-profile.jpg"
          },
          content: "Self-defense laws vary by jurisdiction, but generally require: 1) Imminent threat of harm 2) Reasonable belief of danger 3) Proportional response. Would you like me to elaborate on any of these points?",
          timestamp: "1 hour ago",
          likes: 12,
          isLiked: false,
          replies: [
            {
              id: 2,
              author: {
                name: "Mike Johnson",
                role: "User",
                profilePic: "/user-profile.jpg"
              },
              content: "What constitutes 'proportional response'?",
              timestamp: "45 minutes ago",
              likes: 5,
              isLiked: false
            }
          ]
        }
      ]
    },
    // Add more mock threads as needed
  ]);

  // Mock data for trending topics
  const trendingTopics = [
    { id: 1, title: "Property Rights", count: 156 },
    { id: 2, title: "Criminal Defense", count: 143 },
    { id: 3, title: "Family Law", count: 98 },
    { id: 4, title: "Corporate Law", count: 87 },
    { id: 5, title: "Constitutional Rights", count: 76 }
  ];

  // Mock data for popular lawyers
  const popularLawyers = [
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      role: "Criminal Defense",
      rating: 4.9,
      answers: 234,
      profilePic: "/lawyer-profile.jpg",
      isVerified: true
    },
    {
      id: 2,
      name: "Adv. Rajesh Kumar",
      role: "Property Law",
      rating: 4.8,
      answers: 189,
      profilePic: "/lawyer-profile.jpg",
      isVerified: true
    },
    {
      id: 3,
      name: "Dr. Priya Sharma",
      role: "Family Law",
      rating: 4.9,
      answers: 167,
      profilePic: "/lawyer-profile.jpg",
      isVerified: true
    }
  ];

  // Mock data for recent questions
  const recentQuestions = [
    {
      id: 1,
      title: "What are my rights as a tenant?",
      category: "Property Law",
      timestamp: "2 hours ago",
      replies: 8
    },
    {
      id: 2,
      title: "How to file for divorce?",
      category: "Family Law",
      timestamp: "3 hours ago",
      replies: 12
    },
    {
      id: 3,
      title: "Corporate compliance requirements",
      category: "Corporate Law",
      timestamp: "4 hours ago",
      replies: 5
    }
  ];

  const handleShareClick = () => {
    const link = window.location.href;
    setCopiedLink(link);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      setCopiedLink('');
    }, 3000);
  };

  const handleNewQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    const newThread = {
      id: threads.length + 1,
      author: {
        name: "Current User",
        role: "User",
        profilePic: "/user-profile.jpg"
      },
      category: selectedCategory || "General Legal Advice",
      question: newQuestion,
      content: newQuestion,
      timestamp: "Just now",
      likes: 0,
      replies: [],
      isLiked: false
    };

    setThreads([newThread, ...threads]);
    setNewQuestion('');
  };

  const handleLike = (threadId, replyId = null) => {
    setThreads(threads.map(thread => {
      if (thread.id === threadId) {
        if (replyId) {
          // Like a reply
          return {
            ...thread,
            replies: thread.replies.map(reply => {
              if (reply.id === replyId) {
                return {
                  ...reply,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                  isLiked: !reply.isLiked
                };
              }
              return reply;
            })
          };
        } else {
          // Like the main thread
          return {
            ...thread,
            likes: thread.isLiked ? thread.likes - 1 : thread.likes + 1,
            isLiked: !thread.isLiked
          };
        }
      }
      return thread;
    }));
  };

  const handleReply = (threadId, content) => {
    const newReply = {
      id: Date.now(),
      author: {
        name: "Current User",
        role: "User",
        profilePic: "/user-profile.jpg"
      },
      content,
      timestamp: "Just now",
      likes: 0,
      isLiked: false
    };

    setThreads(threads.map(thread => {
      if (thread.id === threadId) {
        return {
          ...thread,
          replies: [...thread.replies, newReply]
        };
      }
      return thread;
    }));
  };

  const filteredThreads = threads.filter(thread => {
    const matchesSearch = thread.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          thread.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || thread.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-gray-800 text-white text-sm px-4 py-3 rounded-lg shadow-lg z-50 max-w-xs">
          🔗 Link copied:
          <div className="mt-1 break-words text-blue-300 underline text-xs">{copiedLink}</div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Legal Forum</h1>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* New Question Form */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <form onSubmit={handleNewQuestion} className="space-y-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
                    Ask a Question
                  </label>
                  <textarea
                    id="question"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="What legal advice do you need?"
                    rows={3}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Post Question
                </button>
              </form>
            </div>

            {/* Threads List */}
            <div className="space-y-6">
              {filteredThreads.map((thread) => (
                <div key={thread.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6">
                    {/* Main Question */}
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <Image
                          src={thread.author.profilePic}
                          alt={thread.author.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        {thread.author.isVerified && (
                          <svg className="absolute bottom-0 right-0 text-green-500 w-4 h-4 bg-white rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h2 className="font-semibold text-gray-900">{thread.author.name}</h2>
                          {thread.author.role && (
                            <span className="text-sm text-gray-500">({thread.author.role})</span>
                          )}
                          <span className="text-sm text-gray-500">{thread.timestamp}</span>
                        </div>
                        <p className="mt-2 text-gray-900">{thread.content}</p>
                        <div className="mt-4 flex items-center space-x-4">
                          <button
                            onClick={() => handleLike(thread.id)}
                            className={`flex items-center space-x-1 text-sm ${
                              thread.isLiked ? 'text-green-600' : 'text-gray-500'
                            }`}
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                            </svg>
                            <span>{thread.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-sm text-gray-500">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                            </svg>
                            <span>{thread.replies.length}</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Replies */}
                    {thread.replies.length > 0 && (
                      <div className="mt-6 space-y-6 pl-12 border-l-2 border-gray-100">
                        {thread.replies.map((reply) => (
                          <div key={reply.id} className="flex items-start space-x-4">
                            <div className="relative">
                              <Image
                                src={reply.author.profilePic}
                                alt={reply.author.name}
                                width={32}
                                height={32}
                                className="rounded-full"
                              />
                              {reply.author.isVerified && (
                                <svg className="absolute bottom-0 right-0 text-green-500 w-3 h-3 bg-white rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h3 className="font-semibold text-gray-900">{reply.author.name}</h3>
                                {reply.author.role && (
                                  <span className="text-sm text-gray-500">({reply.author.role})</span>
                                )}
                                <span className="text-sm text-gray-500">{reply.timestamp}</span>
                              </div>
                              <p className="mt-2 text-gray-900">{reply.content}</p>
                              <div className="mt-4 flex items-center space-x-4">
                                <button
                                  onClick={() => handleLike(thread.id, reply.id)}
                                  className={`flex items-center space-x-1 text-sm ${
                                    reply.isLiked ? 'text-green-600' : 'text-gray-500'
                                  }`}
                                >
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                  </svg>
                                  <span>{reply.likes}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply Form */}
                    <div className="mt-6 pl-12">
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        const replyContent = e.target.reply.value;
                        if (replyContent.trim()) {
                          handleReply(thread.id, replyContent);
                          e.target.reset();
                        }
                      }} className="flex space-x-4">
                        <input
                          type="text"
                          name="reply"
                          placeholder="Write a reply..."
                          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Reply
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredThreads.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">No questions found</h3>
                <p className="mt-2 text-gray-600">Try adjusting your search or category to find what you're looking for.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Trending Topics */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <h2 className="text-lg font-semibold text-gray-900">Trending Topics</h2>
              </div>
              <div className="space-y-4">
                {trendingTopics.map((topic) => (
                  <div key={topic.id} className="flex items-center justify-between">
                    <span className="text-gray-700 hover:text-green-600 cursor-pointer">{topic.title}</span>
                    <span className="text-sm text-gray-500">{topic.count} questions</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Lawyers */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Star className="w-5 h-5 text-yellow-400" />
                <h2 className="text-lg font-semibold text-gray-900">Popular Lawyers</h2>
              </div>
              <div className="space-y-4">
                {popularLawyers.map((lawyer) => (
                  <div key={lawyer.id} className="flex items-start space-x-3">
                    <div className="relative">
                      <Image
                        src={lawyer.profilePic}
                        alt={lawyer.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      {lawyer.isVerified && (
                        <svg className="absolute bottom-0 right-0 text-green-500 w-3 h-3 bg-white rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{lawyer.name}</h3>
                      <p className="text-xs text-gray-500">{lawyer.role}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-yellow-400">★ {lawyer.rating}</span>
                        <span className="text-xs text-gray-500">{lawyer.answers} answers</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Questions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="w-5 h-5 text-gray-500" />
                <h2 className="text-lg font-semibold text-gray-900">Recent Questions</h2>
              </div>
              <div className="space-y-4">
                {recentQuestions.map((question) => (
                  <div key={question.id} className="space-y-1">
                    <h3 className="text-sm font-medium text-gray-900 hover:text-green-600 cursor-pointer">
                      {question.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{question.category}</span>
                      <span>•</span>
                      <span>{question.timestamp}</span>
                      <span>•</span>
                      <span>{question.replies} replies</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Filters */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Filter className="w-5 h-5 text-green-500" />
                <h2 className="text-lg font-semibold text-gray-900">Quick Filters</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedCategory === category
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;

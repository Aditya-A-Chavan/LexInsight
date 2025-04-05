'use client';
import React, { useState } from "react";
import {
  MessageCircle,
  Share2,
  Search,
  Plus
} from "lucide-react";

export default function ForamPage() {
  const [showToast, setShowToast] = useState(false);
  const [copiedLink, setCopiedLink] = useState('');

  const handleShareClick = () => {
    const link = window.location.href;
    setCopiedLink(link);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      setCopiedLink('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-gray-800 text-white text-sm px-4 py-3 rounded-lg shadow-lg z-50 max-w-xs">
          🔗 Link copied:
          <div className="mt-1 break-words text-blue-300 underline text-xs">{copiedLink}</div>
        </div>
      )}

      {/* Search + Ask Container */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Field */}
          <div className="flex w-full md:w-2/3 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="flex items-center px-3 text-gray-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full px-2 py-2 text-sm text-gray-700 outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2">
              Search
            </button>
          </div>

          {/* Ask Button */}
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 shadow-md">
            <Plus className="w-4 h-4" />
            Ask
          </button>
        </div>
      </div>

      {/* Forum Post Content */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6">
        {/* Post Meta */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
          <span>r/LawTechIndia</span>
          <span>•</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Discussion Thread: Bridging Users with Legal Services in a Regulated Market
        </h1>

        {/* Description */}
        <h2 className="text-lg text-gray-700 font-medium mb-4">
          In a landscape where Indian legal professionals face strict advertising limitations,
          how can a digital platform be innovatively designed to connect users with legal insights
          and services without compromising regulatory boundaries?
        </h2>

        {/* Content */}
        <div className="text-sm text-gray-600 leading-relaxed mb-4">
          <p>
            💡 Let’s brainstorm ideas that balance innovation with compliance.
            Suggestions may include content marketing, ethical use of AI like LexBot,
            explainer videos, user Q&A forums, and other indirect engagement methods.
          </p>

          <p className="mt-2">
            🔗 Links:
            <a href="#" className="ml-2 text-blue-600 hover:underline">Bar Council Rules</a>,
            <a href="#" className="ml-2 text-blue-600 hover:underline">Case Studies</a>,
            <a href="#" className="ml-2 text-blue-600 hover:underline">AI Ethics Guide</a>
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex items-center gap-6 text-gray-600 mt-4">


          <div className="flex items-center gap-1">
            <MessageCircle className="h-5 w-5" />
            <span>43 Comments</span>
          </div>

          <button
            onClick={handleShareClick}
            className="flex items-center gap-1 hover:text-gray-800"
          >
            <Share2 className="h-5 w-5" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useState } from "react";

const categories = [
  "Constitutional Law",
  "Criminal Law",
  "Family Law",
  "Property Law",
  "Corporate Law",
  "Tax Law",
  "Human Rights"
];

const popularTopics = [
  "RTI Applications",
  "Domestic Violence Laws",
  "Property Disputes",
  "Consumer Rights",
  "Succession Laws"
];

const blogs = [
  {
    id: "blog-001",
    title: "Understanding Fundamental Rights in India",
    summary:
      "A beginner-friendly guide to the fundamental rights provided under the Indian Constitution and their importance.",
    content: "Constitutional rights are the backbone of our democracy. This article explores how these rights protect citizens and their significance in everyday legal scenarios.",
    date: "May 15, 2023",
    lawyer: {
      name: "Adv. Priya Sharma",
      profile: "/images/lawyers/priya-sharma.jpg",
      credentials: "Constitutional Law Expert, 12+ years experience",
    },
    categories: ["Constitutional Law", "Human Rights"],
    likes: 128,
    comments: 36,
    link: "#",
  },
  {
    id: "blog-002",
    title: "How to File an FIR: Step-by-Step",
    summary:
      "Know your rights and learn the correct procedure to file a First Information Report in India.",
    content: "Filing an FIR correctly can make all the difference in your case. Here's what you need to know about the process, your rights, and common mistakes to avoid.",
    date: "June 3, 2023",
    lawyer: {
      name: "Adv. Rajiv Malhotra",
      profile: "/images/lawyers/rajiv-malhotra.jpg",
      credentials: "Criminal Law Specialist, Former Public Prosecutor",
    },
    categories: ["Criminal Law"],
    likes: 94,
    comments: 21,
    link: "#",
  },
  {
    id: "blog-003",
    title: "Legal Rights of Women in India",
    summary:
      "An overview of key legal protections and support systems available to women under Indian law.",
    content: "From workplace harassment laws to domestic violence protection, this article covers essential legal knowledge every woman should be aware of.",
    date: "April 22, 2023",
    lawyer: {
      name: "Adv. Meera Patel",
      profile: "/images/lawyers/meera-patel.jpg",
      credentials: "Women's Rights Advocate, Supreme Court",
    },
    categories: ["Family Law", "Human Rights"],
    likes: 215,
    comments: 48,
    link: "#",
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const filteredBlogs = blogs.filter(blog => {
    // Filter by category
    if (activeCategory !== "All" && !blog.categories?.includes(activeCategory)) {
      return false;
    }
    
    // Filter by search
    if (searchQuery && !blog.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !blog.summary.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !blog.lawyer.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    if (sortBy === "popular") {
      return b.likes - a.likes;
    } else {
      // Default: sort by recent
      return new Date(b.date) - new Date(a.date);
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white shadow-sm border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-800">LexInsight</h1>
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search blogs, topics, lawyers..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium">
            Write Article
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-24">
              <h3 className="font-bold text-gray-800 mb-3">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    className={`w-full text-left px-3 py-2 rounded-lg ${activeCategory === "All" ? "bg-green-50 text-green-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
                    onClick={() => setActiveCategory("All")}
                  >
                    All Topics
                  </button>
                </li>
                {categories.map(category => (
                  <li key={category}>
                    <button 
                      className={`w-full text-left px-3 py-2 rounded-lg ${activeCategory === category ? "bg-green-50 text-green-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="border-t border-gray-100 my-4 pt-4">
                <h3 className="font-bold text-gray-800 mb-3">Popular Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTopics.map(topic => (
                    <button 
                      key={topic} 
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Legal Insights</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select 
                  className="text-sm border-0 bg-transparent font-medium text-green-600 focus:outline-none cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recent">Most Recent</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              {sortedBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Lawyer Header - Twitter Style */}
                  <div className="flex items-center mb-3">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 mr-3">
                      <img 
                        src={blog.lawyer.profile} 
                        alt={blog.lawyer.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/48?text=Lawyer";
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{blog.lawyer.name}</h3>
                      <p className="text-sm text-gray-500">{blog.lawyer.credentials}</p>
                    </div>
                    <div className="ml-auto text-xs text-gray-400">{blog.date}</div>
                  </div>
                  
                  {/* Blog Content */}
                  <div className="mb-3">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {blog.title}
                    </h2>
                    <p className="text-gray-700">{blog.summary}</p>
                    
                    {/* Categories */}
                    <div className="mt-3 flex gap-2">
                      {blog.categories?.map(category => (
                        <span 
                          key={category} 
                          className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full"
                          onClick={() => setActiveCategory(category)}
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <a
                      href={blog.link}
                      className="text-green-600 font-medium hover:underline flex items-center"
                    >
                      Read Full Article
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                    
                    <div className="flex space-x-4">
                      <button className="text-gray-400 hover:text-green-500 flex items-center">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="text-sm">{blog.likes}</span>
                      </button>
                      <button className="text-gray-400 hover:text-green-500 flex items-center">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        <span className="text-sm">{blog.comments}</span>
                      </button>
                      <button className="text-gray-400 hover:text-green-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Sidebar */}
          <div className="hidden lg:block w-72 shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-24">
              <h3 className="font-bold text-gray-800 mb-4">Top Lawyers</h3>
              
              <div className="space-y-4">
                {blogs.map(blog => (
                  <div key={blog.lawyer.name} className="flex items-center">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 mr-3">
                      <img 
                        src={blog.lawyer.profile} 
                        alt={blog.lawyer.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/40?text=Lawyer";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{blog.lawyer.name}</h4>
                      <p className="text-xs text-gray-500 truncate">{blog.lawyer.credentials}</p>
                    </div>
                    <button className="ml-2 px-3 py-1 text-xs text-green-600 border border-green-600 rounded-full hover:bg-green-50">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-100 my-4 pt-4">
                <h3 className="font-bold text-gray-800 mb-3">Legal Updates</h3>
                <div className="space-y-3">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-gray-800 hover:text-green-600">Supreme Court upholds new consumer protection rules</a>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-gray-800 hover:text-green-600">New arbitration guidelines released by Law Ministry</a>
                    <p className="text-xs text-gray-500 mt-1">Yesterday</p>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-gray-800 hover:text-green-600">Bar Council announces updated exam pattern</a>
                    <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

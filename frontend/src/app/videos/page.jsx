"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// Video gallery data
const videoGallery = [
  {
    id: "video-001",
    title: "How to File an FIR in India: Step-by-Step Guide",
    description: "This comprehensive guide explains the complete process of filing a First Information Report (FIR) in India, your rights during the process, and what to expect after filing.",
    videoUrl: "https://firebasestorage.googleapis.com/v0/b/garuda-d278e.appspot.com/o/fir%20filing.mp4?alt=media&token=7e2e6fd5-7d5a-4847-b8a6-6571433a228c",
    thumbnail: "https://via.placeholder.com/640x360?text=FIR+Filing+Guide",
    date: "April 12, 2023",
    views: 4586,
    likes: 312,
    category: "Criminal Law",
    tags: ["FIR", "Police Procedure", "Legal Rights"],
    lawyer: {
      name: "Adv. Rajiv Malhotra",
      title: "Criminal Law Specialist",
      experience: "15+ years of experience",
      avatar: "/images/lawyers/rajiv-malhotra.jpg",
    }
  },
  {
    id: "video-002",
    title: "Understanding Fundamental Rights in India",
    description: "A detailed explanation of the six fundamental rights guaranteed by the Indian Constitution and how they protect citizens in everyday situations.",
    videoUrl: "https://firebasestorage.googleapis.com/v0/b/garuda-d278e.appspot.com/o/fir%20filing.mp4?alt=media&token=7e2e6fd5-7d5a-4847-b8a6-6571433a228c", // Using same video for demo
    thumbnail: "https://via.placeholder.com/640x360?text=Fundamental+Rights",
    date: "March 28, 2023",
    views: 3245,
    likes: 267,
    category: "Constitutional Law",
    tags: ["Constitution", "Fundamental Rights", "Legal Awareness"],
    lawyer: {
      name: "Adv. Priya Sharma",
      title: "Constitutional Law Expert",
      experience: "12+ years of experience",
      avatar: "/images/lawyers/priya-sharma.jpg",
    }
  },
  {
    id: "video-003",
    title: "Women's Legal Rights in the Workplace",
    description: "Learn about the legal protections against harassment, discrimination, and the provisions for maternity benefits for women in Indian workplaces.",
    videoUrl: "https://firebasestorage.googleapis.com/v0/b/garuda-d278e.appspot.com/o/fir%20filing.mp4?alt=media&token=7e2e6fd5-7d5a-4847-b8a6-6571433a228c", // Using same video for demo
    thumbnail: "https://via.placeholder.com/640x360?text=Women's+Rights",
    date: "May 5, 2023",
    views: 2876,
    likes: 210,
    category: "Labor Law",
    tags: ["Women's Rights", "Workplace", "Harassment"],
    lawyer: {
      name: "Adv. Meera Patel",
      title: "Women's Rights Advocate",
      experience: "10+ years of experience",
      avatar: "/images/lawyers/meera-patel.jpg",
    }
  },
  {
    id: "video-004",
    title: "Property Disputes and Resolution Methods",
    description: "This video covers common property disputes in India and the various legal remedies and resolution methods available to property owners.",
    videoUrl: "https://firebasestorage.googleapis.com/v0/b/garuda-d278e.appspot.com/o/fir%20filing.mp4?alt=media&token=7e2e6fd5-7d5a-4847-b8a6-6571433a228c", // Using same video for demo
    thumbnail: "https://via.placeholder.com/640x360?text=Property+Disputes",
    date: "April 17, 2023",
    views: 1958,
    likes: 178,
    category: "Property Law",
    tags: ["Property", "Legal Disputes", "Resolution"],
    lawyer: {
      name: "Adv. Vikram Singh",
      title: "Property Law Specialist",
      experience: "18+ years of experience",
      avatar: "/images/lawyers/vikram-singh.jpg",
    }
  }
];

// Available video categories
const categories = [
  "All Categories",
  "Constitutional Law",
  "Criminal Law",
  "Family Law",
  "Property Law",
  "Labor Law",
  "Corporate Law",
  "Tax Law"
];

export default function VideosPage() {
  const [videos, setVideos] = useState(videoGallery);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Set the first video as current on initial load
    if (videoGallery.length > 0) {
      setCurrentVideo(videoGallery[0]);
    }
    setLoading(false);
  }, []);

  // Filter videos based on category and search query
  useEffect(() => {
    let filteredVideos = [...videoGallery];
    
    // Filter by category
    if (activeCategory !== "All Categories") {
      filteredVideos = filteredVideos.filter(
        video => video.category === activeCategory
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredVideos = filteredVideos.filter(
        video => 
          video.title.toLowerCase().includes(query) ||
          video.description.toLowerCase().includes(query) ||
          video.lawyer.name.toLowerCase().includes(query) ||
          video.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setVideos(filteredVideos);
  }, [activeCategory, searchQuery]);

  // Handle video selection
  const handleVideoSelect = (video) => {
    setCurrentVideo(video);
    // Scroll to top on mobile
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white shadow-sm border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-green-700">LexInsight</Link>
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search legal videos..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Legal Video Library</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content - Video Player */}
          <div className="lg:w-2/3">
            {currentVideo && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Video Player */}
                <div className="aspect-w-16 aspect-h-9 bg-black">
                  <video 
                    src={currentVideo.videoUrl} 
                    controls 
                    className="w-full h-full object-contain"
                    poster={currentVideo.thumbnail}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                {/* Video Info */}
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">{currentVideo.title}</h1>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <span>{currentVideo.views.toLocaleString()} views</span>
                      <span>{currentVideo.date}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-gray-600 hover:text-green-600">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>{currentVideo.likes}</span>
                      </button>
                      <button className="flex items-center text-gray-600 hover:text-green-600">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Category & Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span 
                      className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full cursor-pointer"
                      onClick={() => setActiveCategory(currentVideo.category)}
                    >
                      {currentVideo.category}
                    </span>
                    {currentVideo.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-gray-700 mb-6">
                    {currentVideo.description}
                  </p>
                  
                  {/* Lawyer Card */}
                  <div className="border-t border-gray-100 pt-6">
                    <div className="flex items-start">
                      <div className="h-14 w-14 rounded-full overflow-hidden bg-gray-200 mr-4 flex-shrink-0">
                        <img 
                          src={currentVideo.lawyer.avatar} 
                          alt={currentVideo.lawyer.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/56?text=Lawyer";
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{currentVideo.lawyer.name}</h3>
                        <p className="text-sm text-gray-500">{currentVideo.lawyer.title} • {currentVideo.lawyer.experience}</p>
                      </div>
                      <button 
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center"
                        onClick={() => alert('Video chat feature coming soon!')}
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Video Chat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Video Grid (Mobile Only) */}
            <div className="mt-6 lg:hidden">
              <h2 className="text-xl font-bold text-gray-800 mb-4">More Videos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {videos.filter(v => v.id !== currentVideo?.id).map((video) => (
                  <div 
                    key={video.id} 
                    className="bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleVideoSelect(video)}
                  >
                    <div className="relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-green-600 bg-opacity-80 flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 line-clamp-2">{video.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{video.lawyer.name} • {video.views.toLocaleString()} views</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Sidebar - Video List and Categories */}
          <div className="lg:w-1/3">
            {/* Categories */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 hidden lg:block">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-3 py-1 rounded-full text-sm ${
                      activeCategory === category
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Video List (Desktop) */}
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24 hidden lg:block">
              <h3 className="text-lg font-bold text-gray-800 mb-4">All Videos</h3>
              
              <div className="space-y-4">
                {videos.map((video) => (
                  <div 
                    key={video.id} 
                    className={`flex cursor-pointer p-2 rounded-lg -mx-2 ${
                      currentVideo?.id === video.id 
                        ? "bg-green-50 border-l-4 border-green-600"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleVideoSelect(video)}
                  >
                    <div className="w-32 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-green-600 bg-opacity-80 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="ml-3 flex-1">
                      <h4 className="font-medium text-gray-800 text-sm line-clamp-2">
                        {video.title}
                      </h4>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <span>{video.lawyer.name}</span>
                        <span className="mx-1">•</span>
                        <span>{video.views.toLocaleString()} views</span>
                      </div>
                      <span className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded-full mt-1 inline-block">
                        {video.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {videos.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No videos found matching your criteria.</p>
                  <button 
                    className="mt-4 text-green-600 hover:underline"
                    onClick={() => {
                      setActiveCategory("All Categories");
                      setSearchQuery("");
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              )}
              
              {/* Book a Consultation */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Need Legal Help?</h3>
                <p className="text-gray-600 text-sm mb-4">Book a personal video consultation with our expert lawyers for personalized advice.</p>
                <button className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Video Chat Button - Fixed Position */}
      <div className="fixed bottom-8 right-8 z-20 lg:hidden">
        <button 
          className="bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg p-4 flex items-center justify-center"
          onClick={() => alert('Video chat feature coming soon!')}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

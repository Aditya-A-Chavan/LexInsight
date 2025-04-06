'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useBlogs } from '@/contexts/blogs.context';

export default function BlogPost() {
  const { id } = useParams();
  const { blogs, loading, error, getBlogById, getRelatedBlogs } = useBlogs();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!loading) {
      console.log('Current ID:', id); // Debug log
      console.log('Blogs in context:', blogs); // Debug log

      const currentBlog = getBlogById(id);
      console.log('Found blog:', currentBlog); // Debug log

      if (currentBlog) {
        setBlog(currentBlog);
        setRelatedBlogs(getRelatedBlogs(id, currentBlog.type));
        setNotFound(false);
      } else {
        console.log('Blog not found for ID:', id); // Debug log
        setNotFound(true);
      }
    }
  }, [id, blogs, loading, getBlogById, getRelatedBlogs]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p className="text-gray-600">{error}</p>
        <Link href="/blogs" className="mt-4 text-green-600 hover:underline">
          Back to blogs
        </Link>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold text-gray-800">Blog Not Found</h1>
        <p className="text-gray-600 mt-2">The blog you're looking for doesn't exist or has been removed.</p>
        <Link href="/blogs" className="mt-4 text-green-600 hover:underline">
          Back to blogs
        </Link>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white shadow-sm border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center">
          <Link href="/blogs" className="text-green-600 font-medium flex items-center mr-6">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to blogs
          </Link>
          <h1 className="text-xl font-bold text-gray-800 truncate flex-1">
            {blog.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Article Header */}
              <div className="p-6 border-b border-gray-100">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
                
                {/* Lawyer info */}
                <div className="flex items-center mb-5">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 mr-3">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(blog.name)}&background=random`}
                      alt={blog.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{blog.name}</h3>
                    <p className="text-sm text-gray-500">{blog.type}</p>
                  </div>
                  <div className="ml-auto text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </div>
                </div>
                
                {/* Categories */}
                <div className="flex gap-2 mb-6">
                  <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full">
                    {blog.type}
                  </span>
                </div>
                
                <p className="text-lg text-gray-700 italic border-l-4 border-green-500 pl-4 py-2 bg-green-50">
                  {blog.content.substring(0, 200)}...
                </p>
              </div>
              
              {/* Article Content */}
              <div className="p-6">
                <div className="prose prose-green max-w-none">
                  {blog.content.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4 leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </div>
              
              {/* Article Footer */}
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center text-gray-600 hover:text-green-600">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>Like</span>
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-green-600">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      <span>Comment</span>
                    </button>
                  </div>
                  <button className="text-gray-600 hover:text-green-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Author Bio */}
            <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
              <h2 className="text-lg font-bold mb-4 text-gray-800">About the Author</h2>
              <div className="flex items-start">
                <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200 mr-4 flex-shrink-0">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(blog.name)}&background=random`}
                    alt={blog.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{blog.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{blog.type}</p>
                  <p className="text-gray-700">{blog.bio || 'No bio available'}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                      Follow
                    </button>
                    <button 
                      className="px-4 py-2 border border-green-600 text-green-600 bg-white rounded-lg hover:bg-green-50 font-medium flex items-center"
                      onClick={() => alert('Video chat feature coming soon!')}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Video Chat Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Sidebar */}
          <div className="hidden lg:block w-80 shrink-0">
            {/* Related Articles */}
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              {/* Video Chat Button for Desktop */}
              <div className="mb-6">
                <button 
                  className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center justify-center"
                  onClick={() => alert('Video chat feature coming soon!')}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Video Chat with a Lawyer
                </button>
                <p className="text-xs text-gray-500 mt-2 text-center">Get expert legal advice from specialists in {blog.type || "law"}</p>
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-4">Related Articles</h3>
              <div className="space-y-4">
                {relatedBlogs.map((relatedBlog) => (
                  <Link href={`/blogs/${relatedBlog.id}`} key={relatedBlog.id}>
                    <div className="group cursor-pointer">
                      <h4 className="font-medium text-gray-800 group-hover:text-green-600">
                        {relatedBlog.title}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {relatedBlog.content.substring(0, 100)}...
                      </p>
                      <div className="flex items-center mt-2">
                        <div className="h-6 w-6 rounded-full overflow-hidden bg-gray-200 mr-2">
                          <img 
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(relatedBlog.name)}&background=random`}
                            alt={relatedBlog.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="text-xs text-gray-500">{relatedBlog.name}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="border-t border-gray-100 my-6 pt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <Link href={`/blogs?category=${blog.type}`}>
                    <span className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700">
                      {blog.type}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
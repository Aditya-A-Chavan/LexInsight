'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';

export default function BlogPost() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/blogs/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog post');
        }
        
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p className="text-gray-600">{error}</p>
        <Link href="/blogs" className="mt-4 text-blue-600 hover:underline">
          Back to blogs
        </Link>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Blog Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold mb-4">{blog?.title}</h1>
        
        {/* Author info */}
        <div className="flex items-center mb-6">
          <div className="h-10 w-10 rounded-full overflow-hidden mr-3 bg-gray-200">
            {blog?.author?.profileImage ? (
              <Image 
                src={blog.author.profileImage} 
                alt={blog.author.username}
                width={40}
                height={40}
                className="object-cover h-full w-full"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-blue-500 text-white">
                {blog?.author?.username?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <p className="font-medium">{blog?.author?.username}</p>
            <p className="text-sm text-gray-500">
              {blog?.createdAt && format(new Date(blog.createdAt), 'MMM dd, yyyy')}
            </p>
          </div>
        </div>

        {/* Blog Content */}
        <div className="prose max-w-none">
          {blog?.content?.split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4">{paragraph}</p>
          ))}
        </div>
        
        {/* Tags */}
        {blog?.tags && blog.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {blog.tags.map((tag, idx) => (
              <span 
                key={idx}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6">
        <Link href="/blogs" className="text-blue-600 hover:underline">
          ← Back to all blogs
        </Link>
      </div>
    </main>
  );
}
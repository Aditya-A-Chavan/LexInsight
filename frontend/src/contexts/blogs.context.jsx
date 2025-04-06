'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const BlogsContext = createContext();

export function BlogsProvider({ children }) {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/all-blogs`);
                console.log('Fetched blogs:', response.data);
                setBlogs(response.data);
            } catch (err) {
                console.error('Error fetching blogs:', err);
                setError('Failed to fetch blogs. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const getBlogById = (id) => {
        const blog = blogs.find(blog => blog.id == id);
        return blog;
    };

    const getRelatedBlogs = (currentBlogId, type, limit = 3) => {
        return blogs
            .filter(blog => blog.id !== currentBlogId && blog.type === type)
            .slice(0, limit);
    };

    const getCategories = () => {
        return ["All", ...new Set(blogs.map(blog => blog.type).filter(Boolean))];
    };

    const value = {
        blogs,
        loading,
        error,
        getBlogById,
        getRelatedBlogs,
        getCategories
    };

    return (
        <BlogsContext.Provider value={value}>
            {children}
        </BlogsContext.Provider>
    );
}

export function useBlogs() {
    const context = useContext(BlogsContext);
    if (context === undefined) {
        throw new Error('useBlogs must be used within a BlogsProvider');
    }
    return context;
} 
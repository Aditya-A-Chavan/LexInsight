'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { UserDataContext } from "@/contexts/userData.context";
import { useContext } from "react";

export default function Login() {
    const router = useRouter();
    const { setUserData } = useContext(UserDataContext);
    const [userType, setUserType] = useState(); // 'user' or 'lawyer'
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        console.log(formData);
        try {
            // Here you would integrate with your backend API
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/authenticate`, formData);

            if (!response.status === 200) {
                throw new Error('Login failed');
            }

            const data = await response.data;
            console.log(data);
            setUserData(data.data);
            // Handle successful login (e.g., store token, redirect)
            router.push('/');
        } catch (err) {
            console.log(err);
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">

                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Or{' '}
                    {!userType ? (
                        <Link
                            href={`/signup/`}
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            create a new account
                        </Link>
                    ) : userType === 'user' ? (
                        <button
                            onClick={() => setUserType('lawyer')}
                            className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
                        >
                            login as lawyer
                        </button>
                    ) : (
                        <button
                            onClick={() => setUserType('user')}
                                    className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
                        >
                                    login as user
                        </button>
                    )}
                </p>

            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {!userType ?
                        <div className="space-y-4">
                            <div
                                onClick={() => setUserType('user')}
                                className="w-full flex items-center justify-between px-4 py-6 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900">Regular User</h3>
                                        <p className="text-sm text-gray-500">Get legal advice and connect with lawyers</p>
                                    </div>
                                </div>
                                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>

                            <div
                                onClick={() => setUserType('lawyer')}
                                className="w-full flex items-center justify-between px-4 py-6 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900">Lawyer</h3>
                                        <p className="text-sm text-gray-500">Offer legal services and grow your practice</p>
                                    </div>
                                </div>
                                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        :
                        <>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="Email address"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                        <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                                    <div className="mt-1">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="text-red-500 text-sm text-center">{error}</div>
                                )}

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </form>


                        </>
                    }
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Don't have an account?
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link
                                href={`/signup/`}
                                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Create new account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

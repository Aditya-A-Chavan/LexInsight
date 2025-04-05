'use client';

import { useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Signup() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const fileInputRef = useRef(null);

    const [userType, setUserType] = useState(searchParams.get('type') || 'user');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        registrationNumber: '',
        certificateFile: null,
    });
    const [error, setError] = useState('');
    const [selectedFileName, setSelectedFileName] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setError('File size should be less than 5MB');
                return;
            }
            setFormData((prev) => ({
                ...prev,
                certificateFile: file,
            }));
            setSelectedFileName(file.name);
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (userType === 'lawyer') {
            if (!formData.registrationNumber) {
                setError('Registration number is required for lawyers');
                return;
            }
            if (!formData.certificateFile) {
                setError('Certificate file is required for lawyers');
                return;
            }
        }

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('email', formData.email);
            formDataToSend.append('password', formData.password);

            if (userType === 'lawyer') {
                formDataToSend.append('registrationNumber', formData.registrationNumber);
                formDataToSend.append('certificate', formData.certificateFile);
            }

            // Here you would integrate with your backend API
            const response = await fetch(`/api/auth/${userType}/signup`, {
                method: 'POST',
                body: formDataToSend,
            });

            if (!response.ok) {
                throw new Error('Signup failed');
            }

            const data = await response.json();
            // Handle successful signup
            router.push('/login');
        } catch (err) {
            setError('Signup failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                    <div className="mt-4 flex justify-center space-x-4">
                        <button
                            onClick={() => setUserType('user')}
                            className={`px-4 py-2 rounded-md ${userType === 'user'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700'
                                }`}
                        >
                            User
                        </button>
                        <button
                            onClick={() => setUserType('lawyer')}
                            className={`px-4 py-2 rounded-md ${userType === 'lawyer'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700'
                                }`}
                        >
                            Lawyer
                        </button>
                    </div>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="sr-only">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                            />
                        </div>

                        {userType === 'lawyer' && (
                            <>
                                <div>
                                    <label htmlFor="registrationNumber" className="sr-only">
                                        Registration Number
                                    </label>
                                    <input
                                        id="registrationNumber"
                                        name="registrationNumber"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                        placeholder="Registration Number"
                                        value={formData.registrationNumber}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        className="hidden"
                                        id="certificate"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm text-left"
                                    >
                                        {selectedFileName || 'Upload Certificate'}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center">{error}</div>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Sign up
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

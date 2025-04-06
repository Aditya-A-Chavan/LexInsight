'use client';

import Link from 'next/link';

export default function SignupChoice() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Choose your account type
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Select how you want to use LexInsight
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="space-y-4">
                        <Link
                            href="/signup/user"
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
                        </Link>

                        <Link
                            href="/signup/lawyer"
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
                        </Link>
                    </div>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Already have an account?
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link
                                href="/login"
                                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

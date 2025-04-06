'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
export default function UserSignup() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange"
    });

    const onSubmit = async (data) => {
        try {
            // Generate random username
            const randomUsername = `user_${Math.random().toString(36).substring(2, 8)}`;

            const signupData = {
                ...data,
                username: randomUsername,
                interests: Array.isArray(data.interests) ? data.interests : [],
                newzletter: data.newzletter || false
            };

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/registeruser`, signupData);

            if (!response.status === 200) {
                console.log(response);
                throw new Error('Signup failed');
            }

            router.push('/login');
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Or{' '}
                    <Link href="/signup/lawyer" className="font-medium text-blue-600 hover:text-blue-500">
                        sign up as a lawyer
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    type="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters"
                                        }
                                    })}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Areas of Interest
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    'Corporate', 'Criminal', 'Real Estate', 'Employment',
                                    'Intellectual Property', 'Tax', 'Technology',
                                    'Government Regulatory', 'Labour', 'Family',
                                    'Emigration', 'Litigation', 'Bank Corruption',
                                    'Environmental Law'
                                ].map((area) => (
                                    <div key={area} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={area.toLowerCase().replace(/\s+/g, '_')}
                                            value={area}
                                            {...register("interests")}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor={area.toLowerCase().replace(/\s+/g, '_')} className="ml-2 block text-sm text-gray-700">
                                            {area}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="newzletter"
                                type="checkbox"
                                {...register("newzletter")}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="newzletter" className="ml-2 block text-sm text-gray-700">
                                Subscribe to newzletter
                            </label>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>

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
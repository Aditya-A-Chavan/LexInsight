'use client';

import { useContext, useState, useEffect } from 'react';
import { UserDataContext } from '@/contexts/userData.context';
import EditProfileForm from '@/components/EditProfileForm';
import axios from 'axios';

export default function EditProfilePage() {
    const { userData } = useContext(UserDataContext);
    const [lawyer, setLawyer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [initialized, setInitialized] = useState(false);

    // Wait for UserDataContext to initialize
    useEffect(() => {
        if (userData !== null) {
            setInitialized(true);
        }
    }, [userData]);

    useEffect(() => {
        if (!initialized) return;

        const fetchLawyerData = async () => {
            try {
                if (!userData?.lawyer_id || userData?.role !== 'Lawyer') {
                    setError('Please log in as a lawyer to edit your profile');
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/lawyers/${userData.lawyer_id}`);
                if (response.data.status === 200) {
                    setLawyer(response.data.data.lawyer);
                } else {
                    throw new Error(response.data.message || 'Failed to fetch lawyer data');
                }
            } catch (err) {
                console.error('Error fetching lawyer data:', err);
                setError(err.message || 'Failed to fetch lawyer data');
            } finally {
                setLoading(false);
            }
        };

        fetchLawyerData();
    }, [userData, initialized]);

    if (!initialized) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    if (!lawyer) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-red-600">No profile data found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Profile</h1>
                <EditProfileForm lawyer={lawyer} />
            </div>
        </div>
    );
} 
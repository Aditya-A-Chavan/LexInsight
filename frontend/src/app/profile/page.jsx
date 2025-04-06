"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from 'axios';
import { UserDataContext } from '@/contexts/userData.context';
import { useContext } from 'react';
import {
    MapPin,
    Briefcase,
    Building,
    GraduationCap,
    Award,
    MessageSquare,
    UserPlus,
    Mail,
    Phone,
    Globe,
    Calendar,
    FileText,
    ThumbsUp,
    MessageCircle,
    Share2,
    MoreHorizontal,
    Search,
    ChevronDown,
    BookOpen
} from "lucide-react";

// Profile Header Component
const ProfileHeader = ({ lawyer }) => (
    <div className="relative mb-24 md:mb-16">
        {/* Cover Image */}
        <div className="h-48 md:h-64 bg-gradient-to-r from-primary/30 to-accent/30 w-full rounded-b-lg"></div>

        {/* Profile Picture */}
        <div className="absolute left-6 md:left-12 -bottom-16 border-4 border-background rounded-full">
            <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                {lawyer.profilePicture ? (
                    <Image
                        src={lawyer.profilePicture}
                        alt={lawyer.name}
                        width={128}
                        height={128}
                        className="rounded-full"
                    />
                ) : (
                        <FileText size={40} />
                )}
            </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute right-6 bottom-4 flex space-x-3">
            <Link href="/profile/edit" className="bg-primary hover:bg-primary-dark text-background px-4 py-1.5 rounded-md font-medium text-sm">
                Edit Profile
            </Link>
            <button className="bg-background hover:bg-gray-100 text-text px-3 py-1.5 rounded-md font-medium text-sm border border-gray-300">
                <MoreHorizontal size={18} />
            </button>
        </div>
    </div>
);

// User Info Component
const UserInfo = ({ lawyer }) => (
    <div className="px-6 md:px-12 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-text">{lawyer.name}</h1>
        <p className="text-lg text-text/80 mb-2">{lawyer.specialization}</p>

        <div className="flex flex-wrap items-center text-sm text-text/60 gap-y-1">
            <div className="flex items-center mr-4">
                <MapPin size={14} className="mr-1" />
                <span>{lawyer.address}</span>
            </div>
            <div className="flex items-center mr-4">
                <Mail size={14} className="mr-1" />
                <a href={`mailto:${lawyer.email}`} className="hover:text-primary">{lawyer.email}</a>
            </div>
            <div className="flex items-center mr-4">
                <Phone size={14} className="mr-1" />
                <span>{lawyer.phone}</span>
            </div>
            {lawyer.website && (
                <div className="flex items-center">
                    <Globe size={14} className="mr-1" />
                    <a href={lawyer.website} className="hover:text-primary" target="_blank" rel="noopener noreferrer">
                        {lawyer.website}
                    </a>
                </div>
            )}
        </div>

        <div className="mt-4 flex items-center text-yellow-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-gray-600">{lawyer.rating}</span>
        </div>
    </div>
);

// Section Card Component
const SectionCard = ({ title, children }) => (
    <div className="bg-background rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-text">{title}</h2>
        </div>
        <div className="p-6">
            {children}
        </div>
    </div>
);

// About Section Component
const AboutSection = ({ lawyer }) => (
    <SectionCard title="About">
        <p className="text-text/80">{lawyer.bio || lawyer.about_me}</p>
    </SectionCard>
);

// Experience Section Component
const ExperienceSection = ({ lawyer }) => (
    <SectionCard title="Experience">
        <div className="space-y-4">
            <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center text-primary mr-4">
                    <Building size={24} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-text">Experience</h3>
                    <p className="text-text/80">{lawyer.experienceInYears} years of experience</p>
                    <p className="text-sm text-text/60">{lawyer.experience}</p>
                </div>
            </div>
            <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center text-primary mr-4">
                    <Briefcase size={24} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-text">Court Practiced</h3>
                    <p className="text-text/80">{lawyer.courtPracticed}</p>
                </div>
            </div>
        </div>
    </SectionCard>
);

// Education Section Component
const EducationSection = ({ lawyer }) => (
    <SectionCard title="Education">
        <div className="flex items-start">
            <div className="w-12 h-12 bg-accent/10 rounded-md flex items-center justify-center text-accent mr-4">
                <GraduationCap size={24} />
            </div>
            <div>
                <p className="text-text/80">{lawyer.education}</p>
            </div>
        </div>
    </SectionCard>
);

// Skills Section Component
const SkillsSection = ({ lawyer }) => (
    <SectionCard title="Skills">
        <div className="flex flex-wrap gap-2">
            {lawyer.practiceAreas?.map((area, index) => (
                <div key={index} className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm">
                    {area}
                </div>
            ))}
        </div>
    </SectionCard>
);

// Activity Section Component
const ActivitySection = () => (
    <SectionCard title="Activity">
        <div className="text-center text-text/60">
            <p>No recent activity</p>
        </div>
    </SectionCard>
);

// Profile Page Component
export default function ProfilePage() {
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

        console.log('UserData in ProfilePage:', userData);
        const fetchLawyerData = async () => {
            try {
                if (!userData?.lawyer_id || userData?.role !== 'Lawyer') {
                    console.log('Invalid user data:', userData);
                    setError('Please log in as a lawyer to view your profile');
                    setLoading(false);
                    return;
                }

                console.log('Fetching lawyer data for ID:', userData.lawyer_id);
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/lawyers/${userData.lawyer_id}`);
                console.log('Lawyer data response:', response.data);

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
        <div className="bg-primary/5 min-h-screen">
            <main className="container mx-auto px-4 py-6">
                <div className="bg-background rounded-lg shadow-sm overflow-hidden mb-6">
                    <ProfileHeader lawyer={lawyer} />
                    <UserInfo lawyer={lawyer} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <AboutSection lawyer={lawyer} />
                        <ExperienceSection lawyer={lawyer} />
                        <EducationSection lawyer={lawyer} />
                    </div>

                    <div>
                        <SkillsSection lawyer={lawyer} />
                        <ActivitySection />
                    </div>
                </div>
            </main>

            <footer className="bg-accent text-background py-6 mt-12">
                <div className="container mx-auto px-6 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} LexInsight. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}
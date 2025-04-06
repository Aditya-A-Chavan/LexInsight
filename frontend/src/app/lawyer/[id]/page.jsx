'use client';

import { useLawyers } from '@/contexts/lawyers.context';
import Image from 'next/image';
import { useParams } from 'next/navigation';
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

const LawyerDetail = () => {
  const { id } = useParams();
  const { getLawyerById, loading, error } = useLawyers();
  const lawyer = getLawyerById(id);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading lawyer details...</p>
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
          <h1 className="text-2xl font-bold text-gray-900">Lawyer not found</h1>
          <p className="mt-2 text-gray-600">The lawyer you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="relative mb-24 md:mb-16">
        <div className="h-48 md:h-64 bg-gradient-to-r from-primary/30 to-accent/30 w-full rounded-b-lg"></div>

        <div className="absolute left-6 md:left-12 -bottom-16 border-4 border-background rounded-full">
          <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <Image
                src={lawyer.profilePicture}
                alt={lawyer.name}
                width={128}
                height={128}
                className="rounded-full"
              />
            </div>
          </div>

          <div className="absolute right-6 bottom-4 flex space-x-3">
            <button className="bg-primary hover:bg-primary-dark text-background px-4 py-1.5 rounded-md font-medium text-sm">
              <MessageSquare size={14} className="inline mr-1" /> Message
            </button>
            <button className="bg-secondary hover:bg-secondary/80 text-text px-4 py-1.5 rounded-md font-medium text-sm">
              <UserPlus size={14} className="inline mr-1" /> Connect
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* User Info */}
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

          {/* Professional Details */}
          <SectionCard title="Professional Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-text mb-2">Experience</h3>
                <p className="text-text/80">{lawyer.experienceInYears} years of experience</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text mb-2">Bar Registration</h3>
                <p className="text-text/80">{lawyer.barRegistrationNumber}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text mb-2">Court Practiced</h3>
                <p className="text-text/80">{lawyer.courtPracticed}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text mb-2">License Number</h3>
                <p className="text-text/80">{lawyer.licenseNumber}</p>
              </div>
            </div>
          </SectionCard>

          {/* Practice Areas */}
          <SectionCard title="Practice Areas">
            <div className="flex flex-wrap gap-2">
              {lawyer.practiceAreas?.map((area, index) => (
                <div key={index} className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm">
                  {area}
                </div>
                        ))}
            </div>
          </SectionCard>

          {/* Languages */}
          <SectionCard title="Languages">
            <div className="flex flex-wrap gap-2">
              {lawyer.languages ? (
                lawyer.languages.split(',').map((lang, index) => (
                  <div key={index} className="bg-accent/10 text-accent px-3 py-1.5 rounded-full text-sm">
                    {lang.trim()}
                  </div>
                            ))
              ) : (
                <p className="text-text/60">No languages specified</p>
              )}
            </div>
          </SectionCard>

          {/* About */}
          {lawyer.bio && (
            <SectionCard title="About">
              <p className="text-text/80">{lawyer.bio}</p>
            </SectionCard>
          )}

          {/* Availability */}
          {lawyer.availability && (
            <SectionCard title="Availability">
              <div className="flex items-center text-text/80">
                <Calendar size={16} className="mr-2" />
                <span>{lawyer.availability}</span>
              </div>
            </SectionCard>
          )}

          {/* Education */}
          {lawyer.education && (
            <SectionCard title="Education">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-accent/10 rounded-md flex items-center justify-center text-accent mr-4">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text">{JSON.parse(lawyer.education).qualification}</h3>
                </div>
              </div>
            </SectionCard>
          )}

          {/* Awards */}
          {lawyer.awards && (
            <SectionCard title="Awards">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center text-primary mr-4">
                  <Award size={24} />
                </div>
                <div>
                  <p className="text-text/80">{lawyer.awards}</p>
                </div>
              </div>
            </SectionCard>
          )}
        </div>
      </div>
    );
};

export default LawyerDetail; 
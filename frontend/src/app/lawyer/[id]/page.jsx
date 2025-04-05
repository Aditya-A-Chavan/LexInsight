'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const LawyerProfile = ({ params }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: ''
  });

  // Mock lawyer data - replace with actual data fetching from your backend
  const lawyer = {
    id: parseInt(params.id),
    name: "John Doe",
    profilePic: "/lawyer-profile.jpg",
    isVerified: true,
    rating: 4.8,
    location: "Mumbai, Maharashtra",
    experience: "15 years",
    languages: ["English", "Hindi", "Gujarati"],
    practiceAreas: ["Criminal Law", "Civil Law", "Family Law"],
    phone: "*****12345",
    description: "Experienced lawyer specializing in criminal and civil cases with a proven track record of successful outcomes. With over 15 years of experience, I have handled numerous high-profile cases and have a deep understanding of the legal system. My approach combines thorough research, strategic thinking, and effective communication to achieve the best possible outcomes for my clients.",
    specialization: ["Criminal Defense", "Civil Litigation", "Family Disputes"],
    courts: ["Supreme Court", "High Court", "District Court"],
    education: [
      {
        degree: "LLB",
        institution: "Mumbai University",
        year: "2005"
      },
      {
        degree: "BA in Law",
        institution: "Government Law College, Mumbai",
        year: "2003"
      }
    ],
    achievements: [
      "Best Criminal Lawyer Award 2020",
      "Member of Bar Council of India",
      "Published 5 research papers on Criminal Law"
    ]
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="relative h-48 bg-green-600">
            <div className="absolute -bottom-16 left-4">
              <div className="relative">
                <Image
                  src={lawyer.profilePic}
                  alt={lawyer.name}
                  width={150}
                  height={150}
                  className="rounded-full border-4 border-white"
                />
                {lawyer.isVerified && (
                  <svg className="absolute bottom-2 right-2 text-green-500 w-6 h-6 bg-white rounded-full p-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="pt-20 px-6 pb-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Info */}
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-4">
                  <h1 className="text-3xl font-bold text-gray-900">{lawyer.name}</h1>
                  <div className="flex items-center text-yellow-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-gray-600">{lawyer.rating}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{lawyer.location}</span>
                </div>

                <div className="mt-2 text-gray-600">
                  <span className="font-semibold">Experience:</span> {lawyer.experience}
                </div>

                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-900">About</h2>
                  <p className="mt-2 text-gray-600">{lawyer.description}</p>
                </div>

                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-900">Practice Areas</h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {lawyer.practiceAreas.map((area, index) => (
                      <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-900">Specialization</h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {lawyer.specialization.map((spec, index) => (
                      <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-900">Courts</h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {lawyer.courts.map((court, index) => (
                      <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {court}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-900">Education</h2>
                  <div className="mt-2 space-y-2">
                    {lawyer.education.map((edu, index) => (
                      <div key={index} className="text-gray-600">
                        <p className="font-medium">{edu.degree}</p>
                        <p className="text-sm">{edu.institution}</p>
                        <p className="text-sm text-gray-500">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-900">Achievements</h2>
                  <ul className="mt-2 space-y-2">
                    {lawyer.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start text-gray-600">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column - Contact Form */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Get in Touch with {lawyer.name}</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Your Contact Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        Your City
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerProfile; 
'use client';

import { useState } from 'react';
import Image from 'next/image';

const LawyerDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPracticeArea, setSelectedPracticeArea] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Mock lawyers data - replace with actual data from your backend
  const lawyers = [
    {
      id: 1,
      name: "John Doe",
      profilePic: "/lawyer-profile.jpg",
      isVerified: true,
      rating: 4.8,
      location: "Mumbai, Maharashtra",
      experience: "15 years",
      languages: ["English", "Hindi", "Gujarati"],
      practiceAreas: ["Criminal Law", "Civil Law", "Family Law"],
      phone: "*****12345",
      description: "Experienced lawyer specializing in criminal and civil cases.",
      specialization: ["Criminal Defense", "Civil Litigation"],
      courts: ["Supreme Court", "High Court"]
    },
    {
      id: 2,
      name: "Jane Smith",
      profilePic: "/lawyer-profile.jpg",
      isVerified: true,
      rating: 4.9,
      location: "Delhi, NCR",
      experience: "12 years",
      languages: ["English", "Hindi"],
      practiceAreas: ["Corporate Law", "Intellectual Property"],
      phone: "*****67890",
      description: "Expert in corporate law and intellectual property rights.",
      specialization: ["Corporate Law", "IP Rights"],
      courts: ["High Court", "District Court"]
    },
    // Add more lawyers as needed
  ];

  // Get unique practice areas and cities for filters
  const practiceAreas = [...new Set(lawyers.flatMap(lawyer => lawyer.practiceAreas))];
  const cities = [...new Set(lawyers.map(lawyer => lawyer.location.split(',')[0]))];

  // Filter lawyers based on search term and filters
  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lawyer.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPracticeArea = !selectedPracticeArea || lawyer.practiceAreas.includes(selectedPracticeArea);
    const matchesCity = !selectedCity || lawyer.location.startsWith(selectedCity);
    return matchesSearch && matchesPracticeArea && matchesCity;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search Lawyers
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or location..."
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label htmlFor="practiceArea" className="block text-sm font-medium text-gray-700 mb-1">
                Practice Area
              </label>
              <select
                id="practiceArea"
                value={selectedPracticeArea}
                onChange={(e) => setSelectedPracticeArea(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              >
                <option value="">All Practice Areas</option>
                {practiceAreas.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <select
                id="city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Lawyers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLawyers.map((lawyer) => (
            <div key={lawyer.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <Image
                      src={lawyer.profilePic}
                      alt={lawyer.name}
                      width={100}
                      height={100}
                      className="rounded-lg"
                    />
                    {lawyer.isVerified && (
                      <svg className="absolute bottom-1 right-1 text-green-500 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h2 className="text-xl font-bold text-gray-900">{lawyer.name}</h2>
                      <div className="flex items-center text-yellow-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-gray-600">{lawyer.rating}</span>
                      </div>
                    </div>
                    <div className="mt-1 flex items-center text-gray-600 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{lawyer.location}</span>
                    </div>
                    <div className="mt-1 text-gray-600 text-sm">
                      <span className="font-semibold">Experience:</span> {lawyer.experience}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-gray-900">Practice Areas</h3>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {lawyer.practiceAreas.map((area, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => window.location.href = `/lawyer/${lawyer.id}`}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredLawyers.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No lawyers found</h3>
            <p className="mt-2 text-gray-600">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LawyerDirectory;

'use client';

import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">About Us</h1>
          <p className="mt-2 text-gray-600">
            Learn more about our mission, vision, and the team behind LexInsight.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
          <p className="mt-2 text-gray-600">
            At LexInsight, our mission is to make legal knowledge accessible to everyone. We aim to bridge the gap between complex legal frameworks and everyday people by providing innovative solutions and expert guidance.
          </p>
        </div>

        {/* Vision Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Our Vision</h2>
          <p className="mt-2 text-gray-600">
            We envision a world where legal services are transparent, affordable, and easily accessible to all. Our goal is to empower individuals and businesses with the tools they need to navigate the legal landscape confidently.
          </p>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Meet Our Team</h2>
          <p className="mt-2 text-gray-600">
            Our team consists of experienced legal professionals, technologists, and innovators dedicated to transforming the legal industry.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Team Member 1 */}
            <div className="flex items-center space-x-4">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Team Member"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-medium text-gray-800">John Doe</h3>
                <p className="text-sm text-gray-600">Founder & CEO</p>
              </div>
            </div>
            {/* Team Member 2 */}
            <div className="flex items-center space-x-4">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Team Member"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-medium text-gray-800">Jane Smith</h3>
                <p className="text-sm text-gray-600">Chief Legal Officer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
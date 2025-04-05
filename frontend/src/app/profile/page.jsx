"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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

// Header component reused from main page (simplified)
const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Define navigation links with actual paths for Next.js Link component
    const navLinks = [
        { href: "/articles", text: "Articles" },
        { href: "/videos", text: "Videos" },
        { href: "/forum", text: "Q&A Forum" },
        { href: "/lexbot", text: "LexBot" }, // Assuming a dedicated page for LexBot interaction
        { href: "/directory", text: "Lawyer Directory" },
        { href: "/events", text: "Events" },
        { href: "/about", text: "About Us" },
    ];

    return (
        <header className="bg-background shadow-sm sticky top-0 z-50 border-b border-gray-200">
            <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                {/* Logo and Tagline - Link to homepage */}
                <div>
                    <Link href="/" className="text-2xl font-bold text-primary">
                        LexInsight
                    </Link>
                    <p className="text-xs text-text/70 hidden sm:block">
                        Your Trusted Guide to Understanding Indian Law
                    </p>
                </div>
                {/* Navigation Links (Desktop) - Use Next.js Link */}
                <div className="hidden md:flex items-center space-x-5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.text}
                            href={link.href}
                            className="text-text/80 hover:text-primary font-medium"
                        >
                            {link.text}
                        </Link>
            ))}
                    {/* Search button - likely triggers a modal or state change, not navigation */}
                    <button className="text-text/70 hover:text-primary">
                        <Search className="h-5 w-5" strokeWidth={1.5} />
                    </button>
                </div>
                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        className="text-text/80 hover:text-primary focus:outline-none"
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </nav>
            {/* Mobile Menu (Conditionally Rendered) - Use Next.js Link */}
            <div
                className={`mobile-menu md:hidden ${isMobileMenuOpen ? "block" : "hidden"} bg-background border-t border-gray-200 py-2 px-6 space-y-1 absolute w-full shadow-lg`}
            >
                {navLinks.map((link) => (
                    <Link
                        key={link.text}
                        href={link.href}
                        className="block text-text/80 hover:text-primary py-1"
                        onClick={() => setIsMobileMenuOpen(false)} /* Close menu on click */
                    >
                        {link.text}
                    </Link>
                ))}
                {/* Mobile search input */}
                <input
                    type="search"
                    placeholder="Search topics..."
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background text-text placeholder:text-text/50"
                />
            </div>
        </header>
    );
};

// Profile Header Component
const ProfileHeader = () => (
    <div className="relative mb-24 md:mb-16">
        {/* Cover Image */}
        <div className="h-48 md:h-64 bg-gradient-to-r from-primary/30 to-accent/30 w-full rounded-b-lg"></div>

        {/* Profile Picture */}
        <div className="absolute left-6 md:left-12 -bottom-16 border-4 border-background rounded-full">
            <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <FileText size={40} />
            </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute right-6 bottom-4 flex space-x-3">
            <button className="bg-primary hover:bg-primary-dark text-background px-4 py-1.5 rounded-md font-medium text-sm">
                Edit Profile
            </button>
            <button className="bg-background hover:bg-gray-100 text-text px-3 py-1.5 rounded-md font-medium text-sm border border-gray-300">
                <MoreHorizontal size={18} />
            </button>
        </div>
    </div>
);

// User Info Component
const UserInfo = () => (
    <div className="px-6 md:px-12 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-text">Aryan Malhotra</h1>
        <p className="text-lg text-text/80 mb-2">Founder at LexInsight | Legal Technology Entrepreneur</p>

        <div className="flex flex-wrap items-center text-sm text-text/60 gap-y-1">
            <div className="flex items-center mr-4">
                <MapPin size={14} className="mr-1" />
                <span>Mumbai, Maharashtra, India</span>
            </div>
            <div className="flex items-center mr-4">
                <Mail size={14} className="mr-1" />
                <a href="mailto:aryan@lexinsight.in" className="hover:text-primary">aryan@lexinsight.in</a>
            </div>
            <div className="flex items-center">
                <Globe size={14} className="mr-1" />
                <a href="https://lexinsight.in" className="hover:text-primary">lexinsight.in</a>
            </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
            <button className="bg-primary hover:bg-primary-dark text-background px-4 py-1.5 rounded-md font-medium text-sm">
                <MessageSquare size={14} className="inline mr-1" /> Message
            </button>
            <button className="bg-secondary hover:bg-secondary/80 text-text px-4 py-1.5 rounded-md font-medium text-sm">
                <UserPlus size={14} className="inline mr-1" /> Connect
            </button>
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
const AboutSection = () => (
    <SectionCard title="About">
        <p className="text-text/80">
            Legal technology entrepreneur passionate about making legal knowledge accessible to all Indian citizens.
            Founded LexInsight with a vision to bridge the gap between complex legal frameworks and everyday people.
            <br /><br />
            With over 15 years of experience in both law practice and technology development, I lead a team dedicated to
            creating educational resources that empower individuals to understand their rights and navigate legal processes confidently.
        </p>
    </SectionCard>
);

// Experience Item Component
const ExperienceItem = ({ role, company, duration, location, description, current }) => (
    <div className="mb-6 last:mb-0">
        <div className="flex items-start">
            <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center text-primary mr-4">
                <Building size={24} />
            </div>
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-text">{role}</h3>
                <p className="text-text/80">{company}</p>
                <p className="text-sm text-text/60">{duration} • {location}</p>
                {current && <span className="inline-block bg-secondary/20 text-primary text-xs px-2 py-1 rounded-full mt-1">Current</span>}

                <p className="mt-3 text-text/80">{description}</p>
            </div>
        </div>
    </div>
);

// Experience Section Component
const ExperienceSection = () => (
    <SectionCard title="Experience">
        <ExperienceItem
            role="Founder & CEO"
            company="LexInsight"
            duration="Jan 2020 - Present"
            location="Mumbai, India"
            description="Leading a team of legal experts and technologists to build India's most comprehensive legal education platform. Responsible for strategic vision, partnerships with legal professionals, and ensuring all content adheres to Bar Council of India guidelines."
            current={true}
        />

        <ExperienceItem
            role="Legal Tech Consultant"
            company="TechLaw Solutions"
            duration="Mar 2016 - Dec 2019"
            location="Delhi, India"
            description="Advised law firms and legal departments on technology adoption. Developed custom legal knowledge management systems and conducted workshops on legal tech innovation."
        />

        <ExperienceItem
            role="Associate Lawyer"
            company="Sharma & Associates"
            duration="May 2010 - Feb 2016"
            location="Mumbai, India"
            description="Practiced in corporate and technology law, focusing on technology agreements, data privacy compliance, and startup advisory."
        />
    </SectionCard>
);

// Education Item Component
const EducationItem = ({ degree, institution, year, description }) => (
    <div className="mb-6 last:mb-0">
        <div className="flex items-start">
            <div className="w-12 h-12 bg-accent/10 rounded-md flex items-center justify-center text-accent mr-4">
                <GraduationCap size={24} />
            </div>
            <div>
                <h3 className="text-lg font-semibold text-text">{degree}</h3>
                <p className="text-text/80">{institution}</p>
                <p className="text-sm text-text/60">{year}</p>
                {description && <p className="mt-2 text-text/80">{description}</p>}
            </div>
        </div>
    </div>
);

// Education Section Component
const EducationSection = () => (
    <SectionCard title="Education">
        <EducationItem
            degree="LL.M., Technology & Intellectual Property Law"
            institution="National Law School of India University"
            year="2008 - 2010"
            description="Specialized in legal implications of emerging technologies, data protection laws, and intellectual property in digital ecosystems."
        />

        <EducationItem
            degree="B.A. LL.B. (Hons)"
            institution="Faculty of Law, University of Delhi"
            year="2003 - 2008"
        />
    </SectionCard>
);

// Skills Section Component
const SkillsSection = () => {
    const skills = [
        "Legal Education", "Technology Law", "Legal Content Creation",
        "Public Speaking", "Legal Research", "Product Development",
        "Team Leadership", "Strategic Planning", "Legal Ethics"
    ];

    return (
        <SectionCard title="Skills">
            <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                    <div key={skill} className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm">
                        {skill}
                    </div>
                ))}
            </div>
        </SectionCard>
    );
};

// Activity Post Component
const ActivityPost = ({ content, timestamp, likes, comments }) => (
    <div className="mb-6 last:mb-0 pb-6 last:pb-0 border-b last:border-b-0 border-gray-100">
        <p className="text-text/80 mb-3">{content}</p>

        <div className="text-xs text-text/60 mb-3">{timestamp}</div>

        <div className="flex items-center gap-4">
            <button className="flex items-center text-text/70 hover:text-primary">
                <ThumbsUp size={16} className="mr-1" />
                <span>{likes}</span>
            </button>
            <button className="flex items-center text-text/70 hover:text-primary">
                <MessageCircle size={16} className="mr-1" />
                <span>{comments}</span>
            </button>
            <button className="flex items-center text-text/70 hover:text-primary">
                <Share2 size={16} className="mr-1" />
                <span>Share</span>
            </button>
        </div>
    </div>
);

// Activity Section Component
const ActivitySection = () => (
    <SectionCard title="Activity">
        <ActivityPost
            content="Excited to announce that LexInsight has just released a comprehensive guide on the Digital Personal Data Protection Act! We've broken down the complex provisions into simple, actionable information for citizens and businesses. Check it out on our website."
            timestamp="Posted 2 days ago"
            likes={42}
            comments={7}
        />

        <ActivityPost
            content="Just wrapped up an incredible panel discussion on 'Technology's Role in Legal Awareness' at the National Legal Tech Summit. The consensus? Tech can democratize legal knowledge, but ethical boundaries must be respected. Thanks to all the participants for their insights!"
            timestamp="Posted 1 week ago"
            likes={103}
            comments={12}
        />

        <div className="text-center mt-2">
            <button className="text-primary hover:text-primary-dark flex items-center mx-auto">
                <span>Show more activity</span>
                <ChevronDown size={16} className="ml-1" />
            </button>
        </div>
    </SectionCard>
);

// Recommendation Item Component
const RecommendationItem = ({ name, title, content, date }) => (
    <div className="mb-6 last:mb-0">
        <div className="flex items-start">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent mr-3">
                {name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
                <h3 className="font-semibold text-text">{name}</h3>
                <p className="text-sm text-text/70 mb-2">{title} • {date}</p>
                <p className="text-text/80 text-sm">{content}</p>
            </div>
        </div>
    </div>
);

// Recommendations Section Component
const RecommendationsSection = () => (
    <SectionCard title="Recommendations">
        <RecommendationItem
            name="Priya Sharma"
            title="Managing Partner, Sharma Legal"
            date="July 2023"
            content="Aryan has revolutionized how legal information is presented to the public. His platform maintains professional standards while making complex legal concepts accessible. A true innovator in the legal education space."
        />

        <RecommendationItem
            name="Dr. Raj Mehta"
            title="Professor of Law, National Law University"
            date="March 2023"
            content="Working with Aryan on legal education content has been refreshing. He has a unique ability to maintain accuracy while simplifying complex legal frameworks for public consumption."
        />

        <div className="text-center mt-2">
            <button className="text-primary hover:text-primary-dark flex items-center mx-auto">
                <span>Show all recommendations</span>
                <ChevronDown size={16} className="ml-1" />
            </button>
        </div>
    </SectionCard>
);

// Publications Section Component
const PublicationsSection = () => (
    <SectionCard title="Publications">
        <div className="mb-4 last:mb-0">
            <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center text-primary mr-4">
                    <BookOpen size={24} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-text">Bridging the Legal Knowledge Gap in Digital India</h3>
                    <p className="text-sm text-text/70">Published in Indian Law Review • October 2022</p>
                    <p className="mt-2 text-text/80">
                        This paper explores innovative approaches to legal education for the general public, focusing on digital platforms and ethical considerations in simplifying legal concepts.
                    </p>
                </div>
            </div>
        </div>
    </SectionCard>
);

// Profile Page Component
export default function ProfilePage() {
    return (
        <div className="bg-primary/5 min-h-screen">
            <Header />

            <main className="container mx-auto px-4 py-6">
                <div className="bg-background rounded-lg shadow-sm overflow-hidden mb-6">
                    <ProfileHeader />
                    <UserInfo />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <AboutSection />
                        <ExperienceSection />
                        <EducationSection />
                        <PublicationsSection />
                    </div>

                    <div>
                        <SkillsSection />
                        <RecommendationsSection />
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
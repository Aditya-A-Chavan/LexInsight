"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Video,
  MessageSquare,
  Bot,
  Briefcase,
  MapPin,
  ShieldCheck,
  Users,
  BookMarked,
  Mail,
} from "lucide-react";
import { useBlogs } from '@/contexts/blogs.context';

// --- Reusable Components ---
// Note: In a Next.js project, these would typically reside in a 'components/' directory.

// Feature Card Component
// (No changes needed here as links might be internal or external depending on context,
// but assuming they link to feature pages)
const FeatureCard = ({
  icon: Icon,
  title,
  description,
  linkText,
  linkHref,
  isLexBot = false,
}) => (
  <div className="bg-background p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
    <Icon
      className="text-primary text-4xl mb-4 inline-block"
      strokeWidth={1.5}
    />
    <h3 className="text-xl font-semibold mb-2 text-text">{title}</h3>
    <p className="text-text/70 mb-4 text-sm">{description}</p>
    {/* Use Link for internal navigation */}
    <Link href={linkHref} className="text-primary hover:underline font-medium">
      {linkText} &rarr;
    </Link>
    {isLexBot && (
      <p className="text-xs text-text/60 mt-3 italic">
        *LexBot provides informational guidance only, not formal legal advice.
      </p>
    )}
  </div>
);

// Article Card Component
// (Link points to a specific article page)
const ArticleCard = ({ title, description, date, category, linkHref }) => (
  <div className="bg-background p-4 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow duration-200">
    <h4 className="font-semibold text-lg mb-1 text-text">
      {/* Use Link for internal navigation to the article */}
      <Link href={linkHref} className="hover:text-primary">
        {title}
      </Link>
    </h4>
    <p className="text-sm text-text/70">{description}</p>
    <span className="text-xs text-text/50">
      {date} | {category}
    </span>
  </div>
);

// Popular Topic Link Component
// (Link points to a topic category page)
const TopicLink = ({ text, linkHref }) => (
  // Use Link for internal navigation to the topic page
  <Link
    href={linkHref}
    className="block bg-secondary/10 hover:bg-secondary/20 p-3 rounded-md text-primary font-medium transition duration-200"
  >
    {text}
  </Link>
);

// Event Card Component
// (Assuming registration link might be internal or external, keeping as 'a' for flexibility,
// but could be Link if it's an internal registration page)
const EventCard = ({ title, description, dateTime, linkHref }) => (
  <div className="bg-background p-4 rounded-lg border border-gray-200">
    <h4 className="font-semibold text-lg mb-1 text-text">{title}</h4>
    <p className="text-sm text-text/70 mb-2">{description}</p>
    <span className="text-xs text-text/50">{dateTime}</span>
    {/* Keeping as 'a' tag for now, assuming it might link externally or to a specific registration flow */}
    <a
      href={linkHref}
      className="text-primary hover:underline font-medium text-sm block mt-2"
      target="_blank"
      rel="noopener noreferrer"
    >
      Register Now &rarr;
    </a>
  </div>
);

// Disclaimer Box Component
// (No links, no changes needed)
const DisclaimerBox = () => (
  <div className="bg-accent/10 border-l-4 border-accent text-accent-dark p-4 rounded-md mb-8 max-w-3xl mx-auto text-left text-sm">
    <p>
      <strong>Disclaimer:</strong> LexInsight provides this directory solely as
      a neutral informational resource, adhering strictly to Bar Council of
      India guidelines. We do not endorse, rate, recommend, or review any lawyer
      or firm. Profiles contain only factual, verifiable information provided by
      the professionals. Users are advised to conduct their own due diligence
      and connect with lawyers independently. LexInsight facilitates connection
      but is not involved in any lawyer-client relationship or communication.
    </p>
  </div>
);

// Directory Search Component
// (Form elements, no navigation links, no changes needed)
const DirectorySearch = () => (
  <div className="flex flex-wrap justify-center gap-4 mb-8">
    <div className="relative">
      <Briefcase
        className="lucide absolute left-3 top-1/2 -translate-y-1/2 text-text/40 h-5 w-5"
        strokeWidth={1.5}
      />
      <select className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary w-full sm:w-auto bg-background text-text">
        <option>Area of Practice (All)</option>
        <option>Family Law</option>
        <option>Property Law</option>
        <option>Criminal Law</option>
        <option>Corporate Law</option>
        {/* Add more options */}
      </select>
    </div>
    <div className="relative">
      <MapPin
        className="lucide absolute left-3 top-1/2 -translate-y-1/2 text-text/40 h-5 w-5"
        strokeWidth={1.5}
      />
      <input
        type="text"
        placeholder="Location (e.g., Mumbai)"
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary w-full sm:w-auto bg-background text-text placeholder:text-text/50"
      />
    </div>
  </div>
);

// Trust Item Component
// (No links, no changes needed)
const TrustItem = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center">
    <Icon className="text-secondary text-3xl mb-3" strokeWidth={1.5} />
    <h4 className="font-semibold mb-2 text-text">{title}</h4>
    <p className="text-sm">{description}</p>
  </div>
);

// Newsletter Form Component
// (Form, no navigation links, no changes needed)
const NewsletterForm = () => (
  <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
    <label htmlFor="email-sub" className="sr-only">
      Email Address
    </label>
    <div className="relative flex-grow w-full sm:w-auto">
      <Mail
        className="lucide absolute left-3 top-1/2 -translate-y-1/2 text-text/40 h-5 w-5 text-foreground"
        strokeWidth={1.5}
      />
      <input
        type="email"
        id="email-sub"
        placeholder="Enter your email address"
        required
        className="pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary w-full text-foreground bg-background placeholder:text-text/50"
      />
    </div>
    {/* Button using Secondary color */}
    <button
      type="submit"
      className="bg-primary hover:bg-primary-dark text-text font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out w-full sm:w-auto"
    >
      Subscribe
    </button>
  </form>
);

// --- Section Components ---
// Note: In a Next.js project, these would typically be part of page files in 'pages/' or 'app/',
// or larger layout components in 'components/'.

// Header Component
// (Uses Next.js Link for navigation)


// Hero Section Component
// (Uses Next.js Link for internal links, 'a' tag for same-page anchor link)
const Hero = () => (
  <section className="bg-gradient-to-r from-secondary/10 via-background to-primary/10 py-20 md:py-32">
    <div className="container mx-auto px-6 text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 leading-tight">
        Demystifying Indian Law
      </h1>
      <p className="text-lg md:text-xl text-text/70 mb-8 max-w-3xl mx-auto">
        Explore expert blogs, explainer videos, Q&A forums, and AI assistance
        to understand your rights and legal procedures in India. An ethical,
        educational resource compliant with Bar Council guidelines.
      </p>
      <div className="space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Primary CTA with Secondary Color - Use Next.js Link */}
        <Link
          href="/blogs"
          className="bg-secondary hover:bg-secondary-dark text-text font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out inline-block"
        >
          Read Legal Blogs
        </Link>
        {/* Secondary CTA with Primary Color - Use 'a' tag for same-page anchor link */}
        <Link
          href="/lexbot"
          className="bg-primary hover:bg-primary-dark text-background font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out inline-block"
        >
          Ask LexBot a Question
        </Link>
      </div>
    </div>
  </section>
);

// Features Section Component
// (Uses FeatureCard which now uses Next.js Link)
const FeaturesSection = () => {
  // Update hrefs to represent actual page paths
  const features = [
    {
      icon: BookOpen,
      title: "In-Depth Legal Guides",
      description:
        "Access comprehensive blogs written by experts on various Indian laws.",
      linkText: "Read Blogs",
      linkHref: "/blogs",
    },
    {
      icon: Video,
      title: "Expert Explainer Videos",
      description:
        "Watch short videos simplifying complex legal concepts and rights.",
      linkText: "Watch Videos",
      linkHref: "/videos",
    },
    {
      icon: MessageSquare,
      title: "Community Legal Q&A",
      description:
        "Ask general legal questions anonymously and get insights from experts.",
      linkText: "Visit the Forum",
      linkHref: "/forum",
    },
    // The anchor link #lexbot is handled by the 'a' tag in the Hero section.
    // This card links to a potential dedicated LexBot page/feature.
    {
      icon: Bot,
      title: "Instant Basic Legal Info",
      description:
        "Get quick answers to basic legal queries from our AI assistant.",
      linkText: "Chat with LexBot",
      linkHref: "/lexbot",
      isLexBot: true,
    },
  ];

  return (
    // Added id="lexbot" here to allow the anchor link from Hero section to work
    <section id="lexbot" className="py-16 bg-primary/5">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">
          Core Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Featured Content Section Component
const FeaturedContentSection = () => {
  const { blogs, loading, error } = useBlogs();
  const topics = [
    { text: "Family Law & Marriage", linkHref: "/forum?category=family-law" },
    { text: "Property & Real Estate", linkHref: "/forum?category=property-law" },
    { text: "Criminal Law Basics", linkHref: "/forum?category=criminal-law" },
    {
      text: "Consumer Rights & Protection",
      linkHref: "/forum?category=consumer-rights",
    },
    { text: "Corporate Compliance", linkHref: "/forum?category=corporate-law" },
  ];

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center text-red-600">
            <p>Error loading blogs: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  // Get the latest 3 blogs
  const latestBlogs = [...blogs]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Latest Blogs */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">
              Latest Blogs
            </h2>
            <div className="space-y-4">
              {latestBlogs.map((blog) => (
                <ArticleCard
                  key={blog.id}
                  title={blog.title}
                  description={blog.content}
                  date={new Date(blog.createdAt).toLocaleDateString()}
                  category={blog.type}
                  linkHref={`/blogs/${blog.id}`}
                />
              ))}
              {/* Link to the main blogs page */}
              <Link
                href="/blogs"
                className="text-primary hover:underline font-medium inline-block mt-4"
              >
                View All Blogs &rarr;
              </Link>
            </div>
          </div>
          {/* Popular Topics */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">
              Popular Topics
            </h2>
            <div className="space-y-3">
              {topics.map((topic) => (
                <TopicLink key={topic.text} {...topic} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Lawyer Directory Section Component
// (Uses Next.js Link for the main browse button)
const DirectorySection = () => (
  <section className="py-16 bg-primary/5">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-3xl font-bold text-primary mb-4">
        Legal Professionals Directory
      </h2>
      <p className="text-text/70 max-w-3xl mx-auto mb-6">
        Find legal professionals based on objective criteria like area of
        practice, location, and experience.
      </p>
      <DisclaimerBox />
      <DirectorySearch />
      {/* Use Next.js Link to navigate to the directory page */}
      <Link
        href="/directory"
        className="bg-primary hover:bg-primary-dark text-background font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out inline-block"
      >
        Browse Directory
      </Link>
    </div>
  </section>
);

// Trust and Expertise Section Component
// (No links, no changes needed)
const TrustSection = () => {
  const trustItems = [
    {
      icon: ShieldCheck,
      title: "Ethical & Compliant",
      description:
        "Strictly adhering to Bar Council of India guidelines for legal information dissemination.",
    },
    {
      icon: Users,
      title: "Expert Contributors",
      description:
        "Content curated and reviewed by experienced lawyers, academics, and legal experts.",
    },
    {
      icon: BookMarked,
      title: "Focus on Education",
      description:
        "Dedicated to empowering citizens with accessible and reliable legal knowledge.",
    },
  ];
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-primary mb-8">
          Built on Trust & Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-text/70">
          {trustItems.map((item) => (
            <TrustItem key={item.title} {...item} />
          ))}
        </div>
        {/* Founder Quote */}
        <div className="mt-12 border-t border-gray-200 pt-8 max-w-2xl mx-auto">
          <p className="italic text-text/60">
            &ldquo;Our mission is to bridge the gap between complex legal
            frameworks and the citizens they serve, fostering understanding and
            access through integrity and clarity.&rdquo;
          </p>
          <p className="mt-2 font-semibold text-primary">
            - Aryan Malhotra, Founder
          </p>
        </div>
      </div>
    </section>
  );
};

// Newsletter Section Component
// (No navigation links, no changes needed)
const NewsletterSection = () => (
  <section className="py-16 bg-accent text-background">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-3xl font-bold mb-4">
        Stay Updated on Indian Legal Developments
      </h2>
      <p className="mb-8 max-w-xl mx-auto text-background/80">
        Subscribe for summaries of important judgments, legal news, and
        educational events. No promotional content, guaranteed.
      </p>
      <NewsletterForm />
    </div>
  </section>
);

// Footer Component


// --- Main App Component ---
// Note: In Next.js with the Pages Router, this structure would typically be in `pages/_app.js` and `pages/index.js`.
// With the App Router, it would be in `app/layout.jsx` and `app/page.jsx`.
// This example assumes this component represents the content of the main landing page (`pages/index.js` or `app/page.jsx`).
export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <FeaturedContentSection />
      <DirectorySection />
      <TrustSection />
      <NewsletterSection />
    </>
  );
}

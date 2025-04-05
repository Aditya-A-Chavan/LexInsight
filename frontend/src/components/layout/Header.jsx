"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Define navigation links with actual paths for Next.js Link component
  const navLinks = [
    { href: "/articles", text: "Articles" },
    { href: "/videos", text: "Videos" },
    { href: "/forum", text: "Q&A Forum" },
    { href: "/lexbot", text: "LexBot" },
    { href: "/directory", text: "Lawyer Directory" },
    { href: "/events", text: "Events" },
    { href: "/about", text: "About Us" },
  ];

  return (
    <header className="bg-background shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo and Tagline */}
        <div>
          <Link href="/" className="text-2xl font-bold text-primary">
            LexInsight
          </Link>
          <p className="text-xs text-text/70 hidden sm:block">
            Your Trusted Guide to Understanding Indian Law
          </p>
        </div>
        
        {/* Navigation Links (Desktop) */}
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
      
      {/* Mobile Menu */}
      <div
        className={`mobile-menu md:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        } bg-background border-t border-gray-200 py-2 px-6 space-y-1 absolute w-full shadow-lg`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.text}
            href={link.href}
            className="block text-text/80 hover:text-primary py-1"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.text}
          </Link>
        ))}
        <input
          type="search"
          placeholder="Search topics..."
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background text-text placeholder:text-text/50"
        />
      </div>
    </header>
  );
}
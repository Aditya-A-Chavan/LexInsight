"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, Search, X, User } from "lucide-react";
import { UserDataContext } from "@/contexts/userData.context";
import { useContext } from "react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { userData, setUserData } = useContext(UserDataContext);
  const profileRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    setUserData(null);
    localStorage.removeItem('userData');
    setIsProfileMenuOpen(false);
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Define navigation links with actual paths for Next.js Link component
  const navLinks = [
    { href: "/blogs", text: "Blogs" },
    { href: "/forum", text: "Q&A Forum" },
    { href: "/videos", text: "Videos" },
    { href: "/lexbot", text: "LexBot" },
    { href: "/directory", text: "Lawyer Directory" },
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

          {/* Authentication Button */}
          {userData ? (
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 text-text/80 hover:text-primary"
              >
                {userData.image ? (
                  <img
                    src={userData.image}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                )}
              </button>
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-text/80 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Login
            </Link>
          )}
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
        {/* Mobile Authentication Button */}
        {userData ? (
          <button
            onClick={handleLogout}
            className="w-full mt-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Sign Out
          </button>
        ) : (
          <Link
            href="/login"
            className="w-full mt-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-center block"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
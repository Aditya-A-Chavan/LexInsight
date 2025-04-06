"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { UserDataProvider } from "@/contexts/userData.context";
import "./globals.css";
import { BlogsProvider } from "@/contexts/blogs.context";
import { LawyersProvider } from "@/contexts/lawyers.context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background text-text">
        <BlogsProvider>
          <LawyersProvider>
            <UserDataProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </UserDataProvider>
          </LawyersProvider>
        </BlogsProvider>
      </body>
    </html>
  );
}

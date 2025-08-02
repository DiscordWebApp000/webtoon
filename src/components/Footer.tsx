"use client";

import { Instagram, Twitter, Youtube, Facebook, Music } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Top Section - Logo and Social Media */}
        <div className="text-center mb-6">
          {/* Logo */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-1">Toonoku</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Stories you crave</p>
          </div>
          
          {/* Social Media Icons */}
          <div className="flex justify-center space-x-4">
            <Link href="#" className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              <Instagram className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </Link>
            <Link href="#" className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              <Twitter className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </Link>
            <Link href="#" className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              <Youtube className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </Link>
            <Link href="#" className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              <Facebook className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </Link>
            <Link href="#" className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              <Music className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </Link>
          </div>
        </div>

        

        {/* Bottom Section - Copyright and Legal */}
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">© 2024 Toonoku Entertainment.</p>
            <div className="flex justify-center space-x-4 text-sm">
              <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-[#f05123] dark:hover:text-[#f05123] transition-colors">
                Terms
              </Link>
              <span className="text-gray-400 dark:text-gray-500">•</span>
              <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-[#f05123] dark:hover:text-[#f05123] transition-colors">
                Privacy
              </Link>
              <span className="text-gray-400 dark:text-gray-500">•</span>
              <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-[#f05123] dark:hover:text-[#f05123] transition-colors">
                Content
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 
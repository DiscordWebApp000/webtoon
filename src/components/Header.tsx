"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Clock, Menu, Sun, Moon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // categories kaldırıldı
  const { theme, toggleTheme } = useTheme();


  return (
    <header className="bg-[#fcfdfe] dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <h1 className="text-xl md:text-2xl font-bold text-[#0a0b0b] dark:text-white">
              Toonoku
              </h1>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className="text-[#0a0b0b] dark:text-white hover:text-[#f05123] transition-colors font-medium text-sm"
              >
                Ana Sayfa
              </Link>
              <Link
                href="/explore"
                className="text-[#0a0b0b] dark:text-white hover:text-[#f05123] transition-colors font-medium text-sm"
              >
                Keşfet
              </Link>
              
            </nav>
          </div>

          {/* Search Bar */}
          <div className="hidden sm:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Seri ara..."
                className="pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-[#f05123] focus:ring-[#f05123] dark:text-white"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            
            
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Sun className="h-5 w-5 text-gray-300" />
              )}
            </Button>
            
            <Button 
              size="sm"
              className="text-xs md:text-sm bg-[#f05123] hover:bg-[#d94a1f] text-[#fcfdfe]"
            >
              Giriş Yap
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Seri ara..."
                  className="pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-[#f05123] focus:ring-[#f05123] dark:text-white"
                />
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                <Link
                  href="/"
                  className="block text-[#0a0b0b] dark:text-white hover:text-[#f05123] transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Ana Sayfa
                </Link>
                <Link
                  href="/explore"
                  className="block text-[#0a0b0b] dark:text-white hover:text-[#f05123] transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Keşfet
                </Link>
                <Link
                  href="/popular"
                  className="block text-[#0a0b0b] dark:text-white hover:text-[#f05123] transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Popüler
                </Link>
              </nav>

              {/* Mobile Action Buttons */}
              <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full border-[#f05123] text-[#f05123] hover:bg-[#f05123] hover:text-[#fcfdfe] dark:border-[#f05123] dark:text-[#f05123]"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Son
                </Button>
                <Button 
                  size="sm"
                  className="w-full bg-[#f05123] hover:bg-[#d94a1f] text-[#fcfdfe]"
                >
                  Giriş Yap
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 
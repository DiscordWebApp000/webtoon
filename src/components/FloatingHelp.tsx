"use client";

import { Button } from "@/components/ui/button";
import { HelpCircle, X, MessageCircle, BookOpen, Users, Mail } from "lucide-react";
import { useState } from "react";

export default function FloatingHelp() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Floating Help Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          size="lg" 
          className="bg-[#f05123] text-[#fcfdfe] rounded-full h-14 w-14 p-0 hover:bg-[#d94a1f] shadow-lg transition-all duration-300"
          onClick={handleOpenModal}
        >
          <HelpCircle className="h-6 w-6" />
        </Button>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-end p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto mb-20 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Yardım Merkezi</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCloseModal}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="space-y-4">
                {/* Help Categories */}
                <div className="grid grid-cols-1 gap-3">
                  <button className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left">
                    <BookOpen className="h-5 w-5 text-[#f05123]" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Nasıl Okurum?</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Webtoon okuma rehberi</p>
                    </div>
                  </button>

                  <button className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left">
                    <Users className="h-5 w-5 text-[#f05123]" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Topluluk</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Diğer okuyucularla bağlantı kur</p>
                    </div>
                  </button>

                  <button className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left">
                    <MessageCircle className="h-5 w-5 text-[#f05123]" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">SSS</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Sık sorulan sorular</p>
                    </div>
                  </button>

                  <button className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left">
                    <Mail className="h-5 w-5 text-[#f05123]" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">İletişim</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Destek ekibiyle iletişim</p>
                    </div>
                  </button>
                </div>

                {/* Quick Links */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Hızlı Linkler</h3>
                  <div className="space-y-2">
                    <a href="#" className="block text-sm text-[#f05123] hover:text-[#d94a1f] hover:underline transition-colors">Kullanım Şartları</a>
                    <a href="#" className="block text-sm text-[#f05123] hover:text-[#d94a1f] hover:underline transition-colors">Gizlilik Politikası</a>
                    <a href="#" className="block text-sm text-[#f05123] hover:text-[#d94a1f] hover:underline transition-colors">İçerik Politikası</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 
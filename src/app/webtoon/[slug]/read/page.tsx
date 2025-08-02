"use client";

import { useState, use } from "react";
import { List, Settings, Share2, Heart, Home, ArrowLeft, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { dataService } from "@/lib/dataService";
import readingData from "@/data/readingData.json";

interface WebtoonReadPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    chapter?: string;
  }>;
}

export default function WebtoonReadPage({ params, searchParams }: WebtoonReadPageProps) {
  const { slug } = use(params);
  const searchParamsData = searchParams ? use(searchParams) : undefined;
  const chapter = searchParamsData?.chapter;
  const [currentChapter, setCurrentChapter] = useState(chapter ? parseInt(chapter) : 1);
  const [isChapterListOpen, setIsChapterListOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading] = useState(true);
  const [readingTheme] = useState<'light' | 'dark' | 'sepia'>('light');

  // Find webtoon by slug
  const allWebtoons = dataService.getAllWebtoonsForCategory("spotlight")
    .concat(dataService.getAllWebtoonsForCategory("new"))
    .concat(dataService.getAllWebtoonsForCategory("popular"));
  
  const webtoon = allWebtoons.find(w => 
    w.id === slug || 
    w.title.toLowerCase().replace(/\s+/g, '-') === slug
  );

  // Get reading data for this webtoon
  const webtoonSlug = slug.replace(/\s+/g, '-').toLowerCase();
  const readingWebtoon = readingData.webtoons[webtoonSlug as keyof typeof readingData.webtoons];

  if (!webtoon || !readingWebtoon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 max-w-md mx-auto border border-gray-200 dark:border-gray-700">
            <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/20 dark:to-red-800/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">📚</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Webtoon Bulunamadı</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">Aradığınız webtoon mevcut değil veya henüz yüklenmemiş.</p>
            <div className="space-y-3">
              <Link 
                href="/" 
                className="inline-flex items-center bg-gradient-to-r from-[#f05123] to-[#ff6b35] text-white px-8 py-4 rounded-xl hover:from-[#d94a1f] hover:to-[#e55a2b] transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
              >
                <Home className="h-5 w-5 mr-2" />
                Ana Sayfaya Dön
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get chapters from reading data
  const chapters = Object.entries(readingWebtoon.chapters).map(([id, chapter]) => ({
    id: parseInt(id),
    title: chapter.title,
    date: new Date(chapter.date).toLocaleDateString('tr-TR'),
    isFree: true,
    isRead: parseInt(id) < currentChapter
  }));

  const currentChapterData = chapters.find(c => c.id === currentChapter);







  const getThemeClasses = () => {
    switch (readingTheme) {
      case 'dark':
        return 'bg-gray-900 text-gray-100';
      case 'sepia':
        return 'bg-amber-50 text-amber-900';
      default:
        return 'bg-white text-gray-900';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#f05123] border-t-transparent mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-orange-300 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">Bölüm yükleniyor...</p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">Bölüm {currentChapter}: {currentChapterData?.title}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${getThemeClasses()} transition-all duration-300`}>
      {/* Top Navigation Bar */}
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link 
                href={`/webtoon/${slug}`}
                className="flex items-center text-[#f05123] hover:text-[#d94a1f] transition-colors bg-white dark:bg-gray-700 px-4 py-2 rounded-xl shadow-sm hover:shadow-md"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span className="font-medium">Geri</span>
              </Link>
              <div className="border-l border-gray-300 dark:border-gray-600 h-8"></div>
              <div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">{webtoon.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>Bölüm {currentChapter}: {currentChapterData?.title}</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{currentChapterData?.date}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsChapterListOpen(!isChapterListOpen)}
                className="text-gray-600 dark:text-gray-300 hover:text-[#f05123] dark:hover:text-[#f05123] hover:bg-gray-100 dark:hover:bg-gray-700 p-3 rounded-xl"
              >
                <List className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="text-gray-600 dark:text-gray-300 hover:text-[#f05123] dark:hover:text-[#f05123] hover:bg-gray-100 dark:hover:bg-gray-700 p-3 rounded-xl"
              >
                <Settings className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 dark:text-gray-300 hover:text-[#f05123] dark:hover:text-[#f05123] hover:bg-gray-100 dark:hover:bg-gray-700 p-3 rounded-xl"
              >
                <Share2 className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 dark:text-gray-300 hover:text-[#f05123] dark:hover:text-[#f05123] hover:bg-gray-100 dark:hover:bg-gray-700 p-3 rounded-xl"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter List Sidebar */}
      {isChapterListOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex">
          <div className="bg-white dark:bg-gray-800 w-96 max-w-full h-full overflow-y-auto border-r border-gray-200 dark:border-gray-700 shadow-2xl">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Bölümler</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsChapterListOpen(false)}
                  className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-xl"
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-3">
                {chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => {
                      setCurrentChapter(chapter.id);
                      setIsChapterListOpen(false);
                    }}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                      chapter.id === currentChapter
                        ? 'bg-gradient-to-r from-[#f05123] to-[#ff6b35] text-white shadow-lg'
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{chapter.title}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{chapter.date}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Diğer içerikler buraya eklenebilir */}
    </div>
  );
}


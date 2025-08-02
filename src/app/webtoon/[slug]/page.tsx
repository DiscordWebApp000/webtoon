import Header from "@/components/Header";
import FloatingHelp from "@/components/FloatingHelp";
import Footer from "@/components/Footer";
import { ChevronLeft, Heart, Share2, BookOpen, Star, Calendar, Facebook, Twitter, Link as LinkIcon, Rss } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { dataService } from "@/lib/dataService";
import { use } from "react";

interface WebtoonDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function WebtoonDetailPage({ params }: WebtoonDetailPageProps) {
  const { slug } = use(params);
  
  // Find webtoon by slug (simplified for demo)
  const allWebtoons = dataService.getAllWebtoonsForCategory("spotlight")
    .concat(dataService.getAllWebtoonsForCategory("new"))
    .concat(dataService.getAllWebtoonsForCategory("popular"));
  
  const webtoon = allWebtoons.find(w => 
    w.id === slug || 
    w.title.toLowerCase().replace(/\s+/g, '-') === slug
  );

  if (!webtoon) {
    return (
      <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-md mx-auto border border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Webtoon Bulunamadı</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Aradığınız webtoon mevcut değil.</p>
              <Link 
                href="/" 
                className="inline-flex items-center bg-[#f05123] text-white px-6 py-3 rounded-lg hover:bg-[#d94a1f] transition-colors"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Ana Sayfaya Dön
              </Link>
            </div>
          </div>
        </div>
        <Footer />
        <FloatingHelp />
      </main>
    );
  }

  // Sample chapters data
  const chapters = [
    { id: 205, title: "Bölüm 205", status: "Son Bölüm", likes: 14364, date: "Bugün" },
    { id: 204, title: "Bölüm 204", status: "2 gün önce", likes: 13893, date: "2 gün önce" },
    { id: 203, title: "Bölüm 203", status: "3 gün önce", likes: 14354, date: "3 gün önce" },
    { id: 202, title: "Bölüm 202", status: "4 gün önce", likes: 13951, date: "4 gün önce" },
    { id: 201, title: "Bölüm 201", status: "5 gün önce", likes: 14213, date: "5 gün önce" },
    { id: 200, title: "Bölüm 200", status: "6 gün önce", likes: 13080, date: "6 gün önce" },
    { id: 109, title: "Bölüm 109", status: "1 hafta önce", likes: 13454, date: "1 hafta önce" },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-110 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden pt-16">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 dark:opacity-30"
          style={{ backgroundImage: `url(${webtoon.imageUrl})` }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent dark:from-gray-900/50 dark:via-gray-900/30 dark:to-transparent" />
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              {/* Genre Tags */}
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-[#f05123] text-white px-3 py-1 rounded-full text-sm font-medium">
                  Aksiyon
                </span>
                <span className="bg-[#f05123] text-white px-3 py-1 rounded-full text-sm font-medium">
                  Fantastik
                </span>
                <span className="bg-[#f05123] text-white px-3 py-1 rounded-full text-sm font-medium">
                  Shounen
                </span>
              </div>
              
              {/* Title */}
              <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">{webtoon.title} (2)</h1>
              
              {/* Metadata */}
              <div className="flex items-center gap-6 mb-6 text-gray-600 dark:text-gray-300">
                <span>Koyoharu Gotouge</span>
                <span>Tamamlandı</span>
                <span>2016</span>
              </div>
              
              {/* Synopsis */}
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
                Tanjiro, ailesini katleden ve kız kardeşi Nezuko&#39;yu bir iblise dönüştüren iblislere karşı mücadele etmek için bir İblis Avcısı olmaya karar verir. İnsanlığını korumaya çalışan Nezuko ve Tanjiro, iblislere karşı zorlu bir yolculuğa çıkar.
              </p>
              
              {/* Engagement Bar */}
              <div className="flex items-center justify-between mt-8 p-4 bg-white/80 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span className="font-medium text-gray-900 dark:text-white">4.8</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-400" />
                    <span className="font-medium text-gray-900 dark:text-white">205 Bölüm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-green-400" />
                    <span className="font-medium text-gray-900 dark:text-white">Tamamlandı</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Heart className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Share2 className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Chapter List */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Bölümler</h2>
                
                {/* Chapter List */}
                <div className="space-y-3">
                  {chapters.map((chapter, index) => (
                    <div 
                      key={chapter.id} 
                      className={`flex items-center gap-4 p-4 rounded-lg transition-colors cursor-pointer ${
                        index === 4 ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {/* Thumbnail */}
                      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg flex-shrink-0">
                        <Image 
                          src={webtoon.imageUrl} 
                          alt={chapter.title}
                          className="w-full h-full object-cover rounded-lg"
                          width={64}
                          height={64}
                          unoptimized
                        />
                      </div>
                      
                      {/* Chapter Info */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{chapter.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{chapter.status}</p>
                      </div>
                      
                      {/* Likes */}
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{chapter.likes.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination */}
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button className="px-3 py-2 bg-[#f05123] text-white rounded-lg">1</button>
                  <button className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">2</button>
                  <button className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">3</button>
                  <span className="px-3 py-2 text-gray-500 dark:text-gray-400">...</span>
                  <button className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">26</button>
                </div>
                
                {/* Comments Section */}
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Manga Yorumları</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">0 yorum</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-gray-600 dark:text-gray-300">
                      Yorum yapmak için lütfen{" "}
                      <button className="text-[#f05123] hover:text-[#d94a1f] underline">
                        giriş yapın
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Cover and Actions */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                {/* Cover Image */}
                <div className="mb-6">
                  <Image 
                    src={webtoon.imageUrl} 
                    alt={webtoon.title}
                    className="w-full h-80 object-cover rounded-lg"
                    width={320}
                    height={320}
                    unoptimized
                  />
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-3 mb-6">
                  <Link href={`/webtoon/${slug}/read?chapter=1`}>
                    <button className="w-full bg-[#f05123] text-white py-3 px-4 rounded-lg hover:bg-[#d94a1f] transition-colors font-medium">
                      İlk Bölümü Oku
                    </button>
                  </Link>
                  <Link href={`/webtoon/${slug}/read?chapter=205`}>
                    <button className="w-full bg-transparent border border-[#f05123] text-[#f05123] dark:text-white py-3 px-4 rounded-lg hover:bg-[#f05123]/10 transition-colors font-medium mt-4">
                      Son Bölümü Oku
                    </button>
                  </Link>
                </div>
                
                {/* Social Sharing */}
                <div className="flex items-center justify-center gap-3">
                  <button className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <Facebook className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  </button>
                  <button className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <Twitter className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  </button>
                  <button className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <LinkIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  </button>
                  <button className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <Rss className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <FloatingHelp />
    </main>
  );
} 
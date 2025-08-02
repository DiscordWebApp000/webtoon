import Header from "@/components/Header";
import WebtoonCard from "@/components/WebtoonCard";
import FloatingHelp from "@/components/FloatingHelp";
import Footer from "@/components/Footer";
import { ChevronLeft, Grid, List, Filter, ArrowLeft, Search, SortAsc } from "lucide-react";
import Link from "next/link";
import { dataService } from "@/lib/dataService";
import { use } from "react";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = use(params);
  const category = dataService.getCategory(slug);

  if (!category) {
    return (
      <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Kategori Bulunamadı</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Aradığınız kategori mevcut değil.</p>
              <Link 
                href="/explore" 
                className="inline-flex items-center bg-[#f05123] text-white px-6 py-3 rounded-lg hover:bg-[#d94a1f] transition-colors"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Keşfete Dön
              </Link>
            </div>
          </div>
        </div>
        <Footer />
        <FloatingHelp />
      </main>
    );
  }

  // Get all webtoons for this category (flattened from all subcategories)
  const allWebtoons = dataService.getAllWebtoonsForCategory(slug);

  const categoryInfo = {
    'spotlight': { icon: '⭐', color: 'from-yellow-400 to-orange-500', name: 'Öne Çıkanlar' },
    'new': { icon: '🆕', color: 'from-blue-400 to-purple-500', name: 'Yeni Yayınlar' },
    'popular': { icon: '🔥', color: 'from-red-400 to-pink-500', name: 'Popüler Seriler' },
    'free-access': { icon: '🆓', color: 'from-green-400 to-teal-500', name: 'Ücretsiz İçerikler' },
    'completed': { icon: '✅', color: 'from-gray-400 to-gray-600', name: 'Tamamlanmış Seriler' }
  };

  const currentCategory = categoryInfo[slug as keyof typeof categoryInfo] || {
    icon: '📚',
    color: 'from-[#f05123] to-[#ff6b35]',
    name: category.name
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      {/* Simple Header */}
      <section className="bg-gradient-to-br from-[#f05123] via-[#ff6b35] to-[#0a0b0b] py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              href="/explore" 
              className="inline-flex items-center text-white hover:text-gray-200 transition-colors bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Keşfete Dön
            </Link>
          </div>
          
          <div className="flex items-center gap-6">
            <div className={`w-16 h-16 bg-gradient-to-br ${currentCategory.color} rounded-2xl flex items-center justify-center`}>
              <span className="text-2xl text-white font-bold">{currentCategory.icon}</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-3">{currentCategory.name}</h1>
              <p className="text-white/90 text-lg mb-4">
                {category.description === 'Featured and highlighted content' ? 'Editör seçimleri ve öne çıkan içerikler' :
                 category.description === 'Latest releases and updates' ? 'En son yayınlar ve güncellemeler' :
                 category.description === 'Most popular and trending' ? 'En popüler ve trend olan seriler' :
                 category.description === 'Free content available' ? 'Ücretsiz olarak okunabilen içerikler' :
                 category.description === 'Completed series' ? 'Tamamlanmış seriler' : category.description}
              </p>
              
              {/* Stats */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <span className="text-white/90">{allWebtoons.length} webtoon</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-white/90">{allWebtoons.filter(w => w.isNew).length} yeni</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-white/90">{allWebtoons.filter(w => w.isEvent).length} etkinlik</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Simple Toolbar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Webtoon ara..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f05123] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300">
                <Filter className="h-4 w-4" />
                <span className="text-sm">Filtrele</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300">
                <SortAsc className="h-4 w-4" />
                <span className="text-sm">Sırala</span>
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Grid className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
              <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <List className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Webtoon Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Tüm Webtoonlar</h2>
            <p className="text-gray-600 dark:text-gray-400">{allWebtoons.length} sonuç bulundu</p>
          </div>
          
                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {allWebtoons.map((webtoon, index) => (
                <WebtoonCard
                  key={webtoon.id || index}
                  id={webtoon.id}
                  title={webtoon.title}
                  imageUrl={webtoon.imageUrl}
                  isEvent={webtoon.isEvent}
                  isNew={webtoon.isNew}
                  isUp={webtoon.isUp}
                  views={webtoon.views}
                  genre="Romance"
                />
              ))}
          </div>
        </div>

        {/* Load More Button */}
        <div className="text-center mb-8">
          <button className="bg-[#f05123] text-white px-8 py-3 rounded-lg hover:bg-[#d94a1f] transition-colors font-medium">
            Daha Fazla Yükle
          </button>
        </div>
      </div>
      
      <Footer />
      <FloatingHelp />
    </main>
  );
} 
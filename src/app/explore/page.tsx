"use client";

import Header from "@/components/Header";
import FloatingHelp from "@/components/FloatingHelp";
import Footer from "@/components/Footer";
import { Filter, RotateCcw } from "lucide-react";
import { useState } from "react";
import { dataService } from "@/lib/dataService";
import WebtoonCard from "@/components/WebtoonCard";

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState("Tüm Kategoriler");
  const [minRating, setMinRating] = useState(0);
  const [showCompleted, setShowCompleted] = useState(false);

  // Get all webtoons from all categories
  const allWebtoons = Object.values(dataService.getMainCategories()).flatMap(category =>
    Object.values(category.subcategories).flatMap(subcategory => subcategory.webtoons)
  );

  // Filter webtoons based on selected criteria
  const filteredWebtoons = allWebtoons.filter(webtoon => {
    if (selectedCategory !== "Tüm Kategoriler") {
      // Filter by category logic would go here
    }
    if (webtoon.rating < minRating) {
      return false;
    }
    return true;
  });

  const categories = [
    "Tüm Kategoriler",
    "Aksiyon",
    "Macera", 
    "Romantik",
    "Komedi",
    "Drama",
    "Fantastik",
    "Gerilim"
  ];

  const resetFilters = () => {
    setSelectedCategory("Tüm Kategoriler");
    setMinRating(0);
    setShowCompleted(false);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Header />
      
      {/* Header Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-3">Keşfet</h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Tüm manga koleksiyonumuzu keşfedin ve filtreleme seçenekleriyle size uygun olanı bulun.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Options Section */}
      <section className="mb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-purple-400" />
                  <h2 className="text-xl font-bold">Filtreleme Seçenekleri</h2>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Sıfırla
                  </button>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filtrele
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Manga Türü */}
                                  <div>
                    <label className="block text-base font-semibold mb-3 text-gray-900 dark:text-white">Manga Türü</label>
                                      <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800"
                    >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Minimum Kullanıcı Puanı */}
                <div>
                  <label className="block text-base font-semibold mb-3 text-gray-900 dark:text-white">Minimum Kullanıcı Puanı</label>
                                      <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="5"
                        step="0.1"
                        value={minRating}
                        onChange={(e) => setMinRating(parseFloat(e.target.value))}
                        className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <span className="text-base font-medium text-gray-900 dark:text-white min-w-[4rem]">{minRating}%</span>
                    </div>
                </div>

                {/* Tamamlanmış Seriler */}
                <div>
                  <label className="block text-base font-semibold mb-3 text-gray-900 dark:text-white">Tamamlanmış Seriler</label>
                  <div className="flex items-center">
                    <button
                      onClick={() => setShowCompleted(!showCompleted)}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                        showCompleted ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform ${
                          showCompleted ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                    <span className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                      {showCompleted ? 'Açık' : 'Kapalı'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manga Grid Section */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
                             <p className="text-gray-600 dark:text-gray-300">
                 {filteredWebtoons.length} Manga Bulundu
               </p>
            </div>

                         {/* Manga Grid */}
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
               {filteredWebtoons.slice(0, 18).map((webtoon) => (
                 <WebtoonCard
                   key={webtoon.id}
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
        </div>
      </section>
      
      <Footer />
      <FloatingHelp />
    </main>
  );
} 
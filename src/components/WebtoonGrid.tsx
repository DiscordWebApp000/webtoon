"use client";

import WebtoonCard from "./WebtoonCard";
import { dataService, WebtoonItem } from "@/lib/dataService";
import { useState, useEffect } from "react";

interface WebtoonSectionProps {
  title: string;
  webtoons: WebtoonItem[];
  subtitle?: string;
  categorySlug: string;
  subcategorySlug?: string;
}

function WebtoonSection({ title, webtoons, subtitle}: WebtoonSectionProps) {



  // Auto-slide için useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      // setCurrentAdIndex((prev) => (prev + 1) % sponsorAds.length); // Removed
    }, 3000); // 3 saniyede bir değiş

    return () => clearInterval(interval);
  }, []); // Removed sponsorAds.length

  // Popüler Seriler için özel layout
  if (title === "Popüler Seriler") {
    return (
      <section className="py-6 bg-[#fcfdfe] dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#0a0b0b] dark:text-white mb-1">{title}</h2>
              {subtitle && (
                <p className="text-gray-600 dark:text-gray-400 text-sm">{subtitle}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-6 gap-2">
            {/* Sol taraf - 8 webtoon kartı (2 sıra) */}
            <div className="col-span-4">
              <div className="grid grid-cols-4 gap-2">
                {/* İlk sıra - 4 webtoon */}
                {webtoons.slice(0, 4).map((webtoon, index) => (
                  <WebtoonCard
                    key={webtoon.id || index}
                    title={webtoon.title}
                    imageUrl={webtoon.imageUrl}
                    isEvent={webtoon.isEvent}
                    isNew={webtoon.isNew}
                    isUp={webtoon.isUp}
                    views={webtoon.views}
                    genre="Romance"
                    id={webtoon.id}
                  />
                ))}
              </div>
              
              {/* İkinci sıra - 4 webtoon */}
              <div className="grid grid-cols-4 gap-2 mt-2">
                {webtoons.slice(4, 8).map((webtoon, index) => (
                  <WebtoonCard
                    key={webtoon.id || (index + 4)}
                    title={webtoon.title}
                    imageUrl={webtoon.imageUrl}
                    isEvent={webtoon.isEvent}
                    isNew={webtoon.isNew}
                    isUp={webtoon.isUp}
                    views={webtoon.views}
                    genre="Romance"
                    id={webtoon.id}
                  />
                ))}
              </div>
            </div>
            
            {/* Sağ taraf - Sponsor kutusu */}
            <div className="col-span-2">
              <div className="bg-gradient-to-br from-[#f05123] via-[#ff6b35] to-[#ff8c42] rounded-2xl p-6 h-full shadow-2xl relative overflow-hidden flex items-center justify-center">
                {/* Arka plan dekoratif elementler */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="relative z-10 text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">💎</span>
                    </div>
                    <h3 className="text-white font-bold text-2xl mb-3">Sponsorluk</h3>
                    <p className="text-white/90 text-lg mb-6 leading-relaxed">
                      Bu alan sponsorlarınız için ayrılmıştır
                    </p>
                    <p className="text-white/80 text-sm mb-8">
                      Reklamınızı burada göstermek için bizimle iletişime geçin
                    </p>
                  </div>
                  
                  <button className="bg-white text-[#f05123] font-bold py-3 px-6 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Sponsor Ol
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Diğer bölümler için normal layout
  return (
    <section className="py-6 bg-[#fcfdfe] dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#0a0b0b] dark:text-white mb-1">{title}</h2>
            {subtitle && (
              <p className="text-gray-600 dark:text-gray-400 text-sm">{subtitle}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-6 gap-4">
          {webtoons.slice(0, 12).map((webtoon, index) => (
            <WebtoonCard
              key={webtoon.id || index}
              title={webtoon.title}
              imageUrl={webtoon.imageUrl}
              isEvent={webtoon.isEvent}
              isNew={webtoon.isNew}
              isUp={webtoon.isUp}
              views={webtoon.views}
              genre="Romance"
              id={webtoon.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface WebtoonGridProps {
  selectedCategory?: string;
  selectedSubcategory?: string;
}

export default function WebtoonGrid({ selectedCategory = "spotlight", selectedSubcategory }: WebtoonGridProps) {
  const [sections, setSections] = useState<Array<{
    title: string;
    webtoons: WebtoonItem[];
    subtitle?: string;
    categorySlug: string;
    subcategorySlug?: string;
  }>>([]);

  useEffect(() => {
    const newSections: Array<{
      title: string;
      webtoons: WebtoonItem[];
      subtitle?: string;
      categorySlug: string;
      subcategorySlug?: string;
    }> = [];

    // Get all webtoons for filtering
    const allWebtoons = dataService.getAllWebtoonsForCategory("spotlight")
      .concat(dataService.getAllWebtoonsForCategory("new"))
      .concat(dataService.getAllWebtoonsForCategory("popular"));

    // If a specific subcategory is selected, show that content
    if (selectedSubcategory) {
      const webtoons = dataService.getWebtoons(selectedCategory, selectedSubcategory);
      const subcategory = dataService.getSubcategory(selectedCategory, selectedSubcategory);
      
      if (subcategory) {
        newSections.push({
          title: subcategory.name === 'Featured' ? 'Öne Çıkan Webtoonlar' : 
                 subcategory.name === 'Trending' ? 'Trend Webtoonlar' :
                 subcategory.name === 'Recent' ? 'Son Eklenenler' :
                 subcategory.name === 'Updates' ? 'Güncellemeler' :
                 subcategory.name === 'Top Rated' ? 'En Yüksek Puanlı' :
                 subcategory.name === 'Most Viewed' ? 'En Çok İzlenen' :
                 subcategory.name === 'Free Comics' ? 'Ücretsiz Çizgi Romanlar' :
                 subcategory.name === 'Free Novels' ? 'Ücretsiz Romanlar' :
                 subcategory.name === 'Recently Completed' ? 'Yeni Tamamlanan' :
                 subcategory.name === 'Classics' ? 'Klasikler' : subcategory.name,
          webtoons: webtoons,
          subtitle: subcategory.description === 'Editor\'s picks and highlights' ? 'Editör seçimleri ve öne çıkanlar' :
                   subcategory.description === 'Most popular this week' ? 'Bu haftanın en popülerleri' :
                   subcategory.description === 'Just released' ? 'Yeni yayınlanan' :
                   subcategory.description === 'Recently updated' ? 'Yakın zamanda güncellenen' :
                   subcategory.description === 'Highest rated webtoons' ? 'En yüksek puanlı webtoonlar' :
                   subcategory.description === 'Highest view count' ? 'En yüksek izlenme sayısı' :
                   subcategory.description === 'Completely free to read' ? 'Tamamen ücretsiz okuma' :
                   subcategory.description === 'Free novel adaptations' ? 'Ücretsiz roman uyarlamaları' :
                   subcategory.description === 'Just finished' ? 'Yeni tamamlanan' :
                   subcategory.description === 'Timeless completed series' ? 'Zamansız tamamlanmış seriler' : subcategory.description,
          categorySlug: selectedCategory,
          subcategorySlug: selectedSubcategory
        });
      }
    } else {
      // Show 3 main sections: Popüler, Yeni Bölüm, Yeni Eklenenler
      
      // 1. Popüler Seriler
      const popularWebtoons = dataService.getAllWebtoonsForCategory("popular").slice(0, 12);
      newSections.push({
        title: "Popüler Seriler",
        webtoons: popularWebtoons,
        subtitle: "En çok okunan ve sevilen webtoonlar",
        categorySlug: "popular"
      });

      // 2. Yeni Bölüm (isUp olan webtoonlar)
      const updatedWebtoons = allWebtoons.filter(w => w.isUp).slice(0, 12);
      newSections.push({
        title: "Yeni Bölüm",
        webtoons: updatedWebtoons,
        subtitle: "Yeni bölümü yayınlanan webtoonlar",
        categorySlug: "new"
      });

      // 3. Yeni Eklenenler (isNew olan webtoonlar)
      const newWebtoons = allWebtoons.filter(w => w.isNew).slice(0, 12);
      newSections.push({
        title: "Yeni Eklenenler",
        webtoons: newWebtoons,
        subtitle: "Yeni eklenen webtoon serileri",
        categorySlug: "new"
      });
    }

    setSections(newSections);
  }, [selectedCategory, selectedSubcategory]);

  return (
    <div>
      {sections.map((section, index) => (
        <WebtoonSection
          key={index}
          title={section.title}
          webtoons={section.webtoons}
          subtitle={section.subtitle}
          categorySlug={section.categorySlug}
          subcategorySlug={section.subcategorySlug}
        />
      ))}
    </div>
  );
} 
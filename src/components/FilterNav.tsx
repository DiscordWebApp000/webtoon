"use client";

import { Badge } from "@/components/ui/badge";
import { dataService, Subcategory } from "@/lib/dataService";
import { useState, useEffect } from "react";

interface FilterNavProps {
  onSubcategoryChange?: (categorySlug: string, subcategorySlug: string) => void;
  selectedCategory?: string;
  selectedSubcategory?: string;
}

export default function FilterNav({ 
  onSubcategoryChange,
  selectedCategory = "spotlight",
  selectedSubcategory 
}: FilterNavProps) {
  const [subcategories, setSubcategories] = useState<Record<string, Subcategory>>({});

  useEffect(() => {
    if (selectedCategory) {
      const subs = dataService.getSubcategories(selectedCategory);
      setSubcategories(subs || {});
    }
  }, [selectedCategory]);

  const handleSubcategoryClick = (subcategorySlug: string) => {
    if (selectedCategory) {
      onSubcategoryChange?.(selectedCategory, subcategorySlug);
    }
  };

  // Turkish translations for subcategory names
  const getTurkishName = (name: string): string => {
    const translations: Record<string, string> = {
      'Featured': 'Öne Çıkanlar',
      'Trending': 'Trend',
      'Recent': 'Son Eklenenler',
      'Updates': 'Güncellemeler',
      'Top Rated': 'En Yüksek Puanlı',
      'Most Viewed': 'En Çok İzlenen',
      'Free Comics': 'Ücretsiz Çizgi Romanlar',
      'Free Novels': 'Ücretsiz Romanlar',
      'Recently Completed': 'Yeni Tamamlanan',
      'Classics': 'Klasikler'
    };
    return translations[name] || name;
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 bg-[#fcfdfe] dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        {/* Subcategories Only */}
        {Object.keys(subcategories).length > 0 && (
          <div className="flex items-center space-x-3 overflow-x-auto">
            {Object.entries(subcategories).map(([slug, subcategory]) => (
              <Badge 
                key={slug}
                variant="outline" 
                className={`cursor-pointer transition-all ${
                  selectedSubcategory === slug 
                    ? 'bg-[#f05123] text-[#fcfdfe] border-[#f05123]' 
                    : 'bg-[#fcfdfe] dark:bg-gray-700 text-[#0a0b0b] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 border-gray-300 dark:border-gray-600'
                }`}
                onClick={() => handleSubcategoryClick(slug)}
              >
                {getTurkishName(subcategory.name)}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 
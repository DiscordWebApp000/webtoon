import categoriesData from '@/data/categories.json';

export interface WebtoonItem {
  id: string;
  title: string;
  imageUrl: string;
  isEvent?: boolean;
  isNew?: boolean;
  isUp?: boolean;
  rating: number;
  views: string;
  dateRange?: string;
}

export interface Subcategory {
  name: string;
  description: string;
  webtoons: WebtoonItem[];
}

export interface Category {
  name: string;
  description: string;
  subcategories: Record<string, Subcategory>;
}

export interface CategoriesData {
  categories: Record<string, Category>;
}

class DataService {
  private data: CategoriesData;

  constructor() {
    this.data = categoriesData as CategoriesData;
  }

  // Get all main categories
  getMainCategories(): Record<string, Category> {
    return this.data.categories;
  }

  // Get a specific main category
  getCategory(categorySlug: string): Category | null {
    return this.data.categories[categorySlug] || null;
  }

  // Get subcategories for a main category
  getSubcategories(categorySlug: string): Record<string, Subcategory> | null {
    const category = this.getCategory(categorySlug);
    return category?.subcategories || null;
  }

  // Get a specific subcategory
  getSubcategory(categorySlug: string, subcategorySlug: string): Subcategory | null {
    const subcategories = this.getSubcategories(categorySlug);
    return subcategories?.[subcategorySlug] || null;
  }

  // Get webtoons for a specific subcategory
  getWebtoons(categorySlug: string, subcategorySlug: string): WebtoonItem[] {
    const subcategory = this.getSubcategory(categorySlug, subcategorySlug);
    return subcategory?.webtoons || [];
  }

  // Get all webtoons for a main category (flattened)
  getAllWebtoonsForCategory(categorySlug: string): WebtoonItem[] {
    const subcategories = this.getSubcategories(categorySlug);
    if (!subcategories) return [];

    return Object.values(subcategories).flatMap(subcategory => subcategory.webtoons);
  }

  // Search webtoons by title
  searchWebtoons(query: string): WebtoonItem[] {
    const results: WebtoonItem[] = [];
    const searchTerm = query.toLowerCase();

    Object.values(this.data.categories).forEach(category => {
      Object.values(category.subcategories).forEach(subcategory => {
        subcategory.webtoons.forEach(webtoon => {
          if (webtoon.title.toLowerCase().includes(searchTerm)) {
            results.push(webtoon);
          }
        });
      });
    });

    return results;
  }

  // Get featured webtoons (with high ratings)
  getFeaturedWebtoons(limit: number = 10): WebtoonItem[] {
    const allWebtoons: WebtoonItem[] = [];
    
    Object.values(this.data.categories).forEach(category => {
      Object.values(category.subcategories).forEach(subcategory => {
        subcategory.webtoons.forEach(webtoon => {
          allWebtoons.push(webtoon);
        });
      });
    });

    return allWebtoons
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  // Get trending webtoons (high views)
  getTrendingWebtoons(limit: number = 10): WebtoonItem[] {
    const allWebtoons: WebtoonItem[] = [];
    
    Object.values(this.data.categories).forEach(category => {
      Object.values(category.subcategories).forEach(subcategory => {
        subcategory.webtoons.forEach(webtoon => {
          allWebtoons.push(webtoon);
        });
      });
    });

    return allWebtoons
      .sort((a, b) => {
        const aViews = parseInt(a.views.replace(/[^0-9]/g, ''));
        const bViews = parseInt(b.views.replace(/[^0-9]/g, ''));
        return bViews - aViews;
      })
      .slice(0, limit);
  }

  // Get new webtoons (with isNew flag)
  getNewWebtoons(limit: number = 10): WebtoonItem[] {
    const newWebtoons: WebtoonItem[] = [];
    
    Object.values(this.data.categories).forEach(category => {
      Object.values(category.subcategories).forEach(subcategory => {
        subcategory.webtoons.forEach(webtoon => {
          if (webtoon.isNew) {
            newWebtoons.push(webtoon);
          }
        });
      });
    });

    return newWebtoons.slice(0, limit);
  }

  // Get updated webtoons (with isUp flag)
  getUpdatedWebtoons(limit: number = 10): WebtoonItem[] {
    const updatedWebtoons: WebtoonItem[] = [];
    
    Object.values(this.data.categories).forEach(category => {
      Object.values(category.subcategories).forEach(subcategory => {
        subcategory.webtoons.forEach(webtoon => {
          if (webtoon.isUp) {
            updatedWebtoons.push(webtoon);
          }
        });
      });
    });

    return updatedWebtoons.slice(0, limit);
  }
}

// Export singleton instance
export const dataService = new DataService(); 
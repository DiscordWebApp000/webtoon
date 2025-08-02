"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const heroSlides = [
  {
    id: 1,
    title: "Solo Leveling",
    subtitle: "Dünyanın en güçlü avcısı olmak için yola çıkan Sung Jin-Woo'nun destansı hikayesi. Gölge ordusuyla birlikte tüm dünyayı fethetmeye hazırlanıyor.",
    imageUrl: "https://cdn.magicdecor.in/com/2023/10/20180551/Elemental-Magic-Anime-Wallpaper-for-Wall-M.jpg",
    tag: "Aksiyon • Fantastik",
    rating: "4.9",
    views: "2.1M",
    likes: "45K"
  },
  {
    id: 2,
    title: "The Beginning After The End",
    subtitle: "Kral Arthur'un yeniden doğuşu. Bu hayatta sihir ve güç dolu bir dünyada, geçmiş yaşamının bilgisiyle yeni bir yolculuğa çıkıyor.",
    imageUrl: "https://www.korea.net/upload/content/editImage/20240924110618151_CWK4UPZ2.jpg",
    tag: "Romantik • Macera",
    rating: "4.8",
    views: "1.8M",
    likes: "38K"
  },
  {
    id: 3,
    title: "Tower of God",
    subtitle: "Rachel'ı bulmak için kuleye tırmanan Bam'ın hikayesi. Her katında yeni sınavlar ve tehlikelerle karşılaşırken gerçekleri öğreniyor.",
    imageUrl: "https://static1.dualshockersimages.com/wordpress/wp-content/uploads/wm/2024/01/best-manhwa-to-read-on-webtoons.jpg",
    tag: "Macera • Gerilim",
    rating: "4.7",
    views: "1.5M",
    likes: "32K"
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  // Auto-slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const currentHero = heroSlides[currentSlide];

  return (
    <section className="relative h-[500px] bg-gradient-to-br from-[#f05123] via-[#ff6b35] to-[#0a0b0b] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: `url('${currentHero.imageUrl}')`
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      
      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <div className="mb-4">
              <Badge className="bg-[#f05123] text-white px-4 py-2 text-sm font-semibold mb-4">
                {currentHero.tag}
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 transition-all duration-500 leading-tight">
              {currentHero.title}
            </h1>
            <p className="text-white/90 text-lg mb-8 transition-all duration-500 leading-relaxed">
              {currentHero.subtitle}
            </p>
            
           
            
            {/* CTA Buttons */}
            <div className="flex items-center space-x-4 mb-8">
              <Button className="bg-[#f05123] hover:bg-[#d94a1f] text-white px-8 py-8 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                Hemen Oku
              </Button>
              
            </div>
            

          </div>
        </div>
      </div>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#f05123]/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#ff6b35]/20 to-transparent rounded-full blur-2xl" />
    </section>
  );
} 
"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import Image from "next/image";

interface WebtoonCardProps {
  title: string;
  imageUrl: string;
  isEvent?: boolean;
  isNew?: boolean;
  isUp?: boolean;
  id?: string;
  views?: string;
  genre?: string;
}

export default function WebtoonCard({ 
  title, 
  imageUrl, 
  isEvent, 
  isNew, 
  isUp, 
  id,
  views = "1.4M",
  genre = "Romance"
}: WebtoonCardProps) {
  return (
    <Link href={`/webtoon/${id || title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="w-46 h-70 rounded-lg overflow-hidden flex flex-col">
        {/* Image Container */}
        <div className="relative flex-shrink-0">
          <Image
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
            width={160}
            height={192}
            unoptimized
          />
          
          {/* UP Badge - Only show if isUp is true */}
          {isUp && (
            <div className="absolute top-2 left-2">
              <span className="px-2 py-1 text-xs font-medium bg-green-500 text-white rounded shadow-sm">
                UP
              </span>
            </div>
          )}
          
          {/* NEW Badge - Show for new additions */}
          {isNew && (
            <div className="absolute top-2 right-2">
              <span className="px-2 py-1 text-xs font-bold bg-[#f05123] text-white rounded shadow-sm ">
                NEW
              </span>
            </div>
          )}
          
          {/* Event Badge - Show if isEvent is true */}
          {isEvent && (
            <div className="absolute bottom-2 left-2">
              <span className="px-2 py-1 text-xs font-medium bg-purple-500 text-white rounded shadow-sm">
                EVENT
              </span>
            </div>
          )}
        </div>
        
        {/* Text Details Section - Always visible */}
        <div className="p-3 flex-grow flex flex-col justify-between">
          <div>
            {/* Title */}
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1 line-clamp-2 leading-tight">
              {title.length > 14 ? title.substring(0, 14) + '...' : title}
            </h3>
            
            {/* Category Label */}
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {genre}
            </p>
          </div>
          
          {/* Likes/Views Count */}
          <div className="flex items-center gap-1 mt-auto">
            <Heart className="h-3 w-3 text-green-500 fill-green-500" />
            <span className="text-xs text-gray-600 dark:text-gray-300">
              {views}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
} 
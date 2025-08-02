"use client";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WebtoonGrid from "@/components/WebtoonGrid";
import FloatingHelp from "@/components/FloatingHelp";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function Home() {
  const [selectedCategory] = useState("spotlight");
  const [selectedSubcategory] = useState<string | undefined>();

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <WebtoonGrid 
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
      />
      <Footer />
      <FloatingHelp />
    </main>
  );
}

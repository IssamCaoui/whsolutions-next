// src/app/page.tsx
import Hero from "@/components/sections/Hero";
import MarqueeSection from "@/components/sections/MarqueeSection";
import Features from "@/components/sections/Features";
import Categories from "@/components/sections/Categories";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import Commitments from "@/components/sections/Commitments";
import CatalogueDownload from "@/components/sections/CatalogueDownload";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeSection />
      <Features />
      <Categories />
      <FeaturedProducts />
      <Commitments />
      <CatalogueDownload />
    </>
  );
}

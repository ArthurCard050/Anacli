'use client';

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ConveniosHeroSection from '@/components/sections/ConveniosHeroSection';
import ConveniosGallerySection from '@/components/sections/ConveniosGallerySection';
import ConveniosContactSection from '@/components/sections/ConveniosContactSection';

export default function ConveniosPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <ConveniosHeroSection />
      <ConveniosGallerySection />
      <ConveniosContactSection />
      <Footer />
    </main>
  );
}
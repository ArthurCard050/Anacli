import { Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSection from '@/components/sections/HeroSection'
import PacotesFitnessSection from '@/components/sections/PacotesFitnessSection'
import CertificatesSection from '@/components/sections/CertificatesSection'
import MissionSection from '@/components/sections/MissionSection'
import ConveniosSection from '@/components/sections/ConveniosSection'
import HybridBentoSection from '@/components/sections/HybridBentoSection'
import NewsSectionWrapper from '@/components/sections/NewsSectionWrapper'
import InstagramSection from '@/components/sections/InstagramSection'
import ContactSection from '@/components/sections/ContactSection'

// Componente de loading otimizado
const SectionSkeleton = () => (
  <div className="w-full h-96 bg-gray-100 animate-pulse rounded-lg mx-auto max-w-7xl" />
)

export default async function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <PacotesFitnessSection />
        <CertificatesSection />
        <MissionSection />
        <Suspense fallback={<SectionSkeleton />}>
          <ConveniosSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <HybridBentoSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <NewsSectionWrapper />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <InstagramSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
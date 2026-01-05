"use client"

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Lazy load do Swiper para reduzir bundle inicial
const InstagramVideoCarousel = dynamic(() => import('./InstagramVideoCarousel'), {
  loading: () => (
    <div className="w-full h-[400px] bg-gray-100 rounded-xl flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
        <p className="text-sm text-gray-600">Carregando Instagram...</p>
      </div>
    </div>
  ),
  ssr: false // Não renderizar no servidor para reduzir bundle inicial
})

interface VideoData {
  id: number
  title: string
  videoSrc: string
}

interface LazyInstagramCarouselProps {
  videos: VideoData[]
  title?: string
  subtitle?: string
  instagramUrl?: string
  onVideoClick?: (video: VideoData) => void
}

export default function LazyInstagramCarousel(props: LazyInstagramCarouselProps) {
  return (
    <Suspense fallback={
      <div className="w-full h-[400px] bg-gray-100 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Carregando Instagram...</p>
        </div>
      </div>
    }>
      <InstagramVideoCarousel {...props} />
    </Suspense>
  )
}
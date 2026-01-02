"use client"

import { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { Instagram, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import type { Swiper as SwiperType } from 'swiper'
import { HierarchicalButton } from "@/components/ui/hierarchical-button"

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

interface VideoData {
  id: number
  title: string
  thumbnail: string
  videoSrc: string
}

interface InstagramVideoCarouselProps {
  videos: VideoData[]
  title?: string
  subtitle?: string
  instagramUrl?: string
  onVideoClick?: (video: VideoData) => void
}

const InstagramVideoCarousel = ({
  videos,
  title = "Siga @lab_anacli",
  subtitle = "Acompanhe nosso dia a dia e fique por dentro das novidades.",
  instagramUrl = "https://instagram.com/lab_anacli",
  onVideoClick
}: InstagramVideoCarouselProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleVideoClick = (video: VideoData) => {
    if (onVideoClick) {
      onVideoClick(video)
    }
  }

  const handleSwiperInit = (swiper: SwiperType) => {
    swiperRef.current = swiper;

    // Aguarda um tick para garantir que o Swiper está totalmente inicializado
    setTimeout(() => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    }, 100);
  }

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }

  const handlePrevClick = () => {
    if (swiperRef.current && !swiperRef.current.destroyed) {
      // Move uma distância menor (metade de um slide)
      const currentTranslate = swiperRef.current.translate;
      const slideWidth = 256 + 20; // largura do slide (256px) + spaceBetween (20px)
      const moveDistance = slideWidth * 1; // move metade da largura de um slide

      swiperRef.current.translateTo(currentTranslate + moveDistance, 600);
    }
  }

  const handleNextClick = () => {
    if (swiperRef.current && !swiperRef.current.destroyed) {
      // Move uma distância menor (metade de um slide)
      const currentTranslate = swiperRef.current.translate;
      const slideWidth = 256 + 20; // largura do slide (256px) + spaceBetween (20px)
      const moveDistance = slideWidth * 1; // move metade da largura de um slide

      swiperRef.current.translateTo(currentTranslate - moveDistance, 600);
    }
  }

  return (
    <section className="bg-primary/5 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-center w-full">
        {/* Left Column */}
        <div className="space-y-8 max-w-7xl mx-auto px-6 lg:px-0 lg:pl-[max(1.5rem,calc((100vw-80rem)/2))]">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-gray-900">Siga </span>
            <span className="text-accent">
              @lab_anacli
            </span>
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            {subtitle}
          </p>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-4">
            <HierarchicalButton
              hierarchy="tertiary"
              size="md"
              icon={<ChevronLeft className="w-6 h-6" />}
              onClick={handlePrevClick}
              disabled={isBeginning}
              className="w-14 h-14 rounded-full p-0 active:!bg-accent active:!text-white active:!border-accent"
            >
              <span className="sr-only">Anterior</span>
            </HierarchicalButton>

            <HierarchicalButton
              hierarchy="tertiary"
              size="md"
              icon={<ChevronRight className="w-6 h-6" />}
              onClick={handleNextClick}
              disabled={isEnd}
              className="w-14 h-14 rounded-full p-0 active:!bg-accent active:!text-white active:!border-accent"
            >
              <span className="sr-only">Próximo</span>
            </HierarchicalButton>
          </div>

          <HierarchicalButton
            hierarchy="primary"
            size="lg"
            icon={<Instagram className="w-5 h-5" />}
            iconPosition="left"
            className="bg-accent hover:bg-accent/90 focus:ring-accent"
            onClick={() => window.open(instagramUrl, '_blank')}
          >
            Seguir no Instagram
          </HierarchicalButton>
        </div>

        {/* Right Column - Overflow contido aqui */}
        <div className="relative px-6 lg:px-0 overflow-x-hidden">
          <Swiper
            onSwiper={handleSwiperInit}
            onSlideChange={handleSlideChange}
            onReachBeginning={() => setIsBeginning(true)}
            onReachEnd={() => setIsEnd(true)}
            onFromEdge={() => {
              setIsBeginning(false);
              setIsEnd(false);
            }}
            modules={[Navigation]}
            slidesPerView="auto"
            spaceBetween={20}
            loop={false}
            speed={600}
            allowTouchMove={true}
            watchSlidesProgress={true}
            breakpoints={{
              320: {
                slidesPerView: 1.2,
                spaceBetween: 16
              },
              640: {
                slidesPerView: 1.8,
                spaceBetween: 20
              },
              768: {
                slidesPerView: 2.2,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 2.5,
                spaceBetween: 20
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 24
              }
            }}
            className="instagram-carousel pr-6"
          >
            {videos.map((video) => (
              <SwiperSlide key={video.id} className="!w-64">
                <VideoCard
                  video={video}
                  onClick={() => handleVideoClick(video)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

interface VideoCardProps {
  video: VideoData
  onClick: () => void
}

const VideoCard = ({ video, onClick }: VideoCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative w-full h-96 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundImage: `url(${video.thumbnail})` }}
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
      
      {/* Efeito de brilho no hover */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
          <div className="bg-primary rounded-full p-3 group-hover:bg-primary/90 transition-colors">
            <Play className="w-6 h-6 text-white fill-white" />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/80">
        <h3 className="text-white text-sm font-medium text-left leading-tight group-hover:text-white/90 transition-colors duration-300">
          {video.title}
        </h3>
      </div>
    </button>
  )
}

export default InstagramVideoCarousel
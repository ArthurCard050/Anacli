'use client';

import { useState } from 'react'
import InstagramVideoCarousel from '@/components/ui/InstagramVideoCarousel'
import { VideoModal } from '@/components/ui/video-modal'

const exampleVideos = [
  {
    id: 1,
    title: "Como funciona o exame de sangue",
    videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Preparação para exames laboratoriais",
    videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "Tecnologia de ponta em análises",
    videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 4,
    title: "Atendimento humanizado Anacli",
    videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 5,
    title: "Resultados rápidos e seguros",
    videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 6,
    title: "Certificações e qualidade",
    videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  }
]

const InstagramCarouselExample = () => {
  const [selectedVideo, setSelectedVideo] = useState<{src: string, title: string} | null>(null)

  const handleVideoClick = (video: { id: number; title: string; videoSrc: string; thumbnail?: string }) => {
    setSelectedVideo({ src: video.videoSrc, title: video.title })
  }

  const closeVideo = () => {
    setSelectedVideo(null)
  }

  return (
    <>
      <InstagramVideoCarousel
        videos={exampleVideos}
        title="Siga @lab_anacli"
        subtitle="Acompanhe nosso dia a dia e fique por dentro das novidades."
        instagramUrl="https://instagram.com/lab_anacli"
        onVideoClick={handleVideoClick}
      />

      {/* Video Modal */}
      <VideoModal
        isOpen={selectedVideo !== null}
        onClose={closeVideo}
        videoSrc={selectedVideo?.src || ""}
        title={selectedVideo?.title || ""}
      />
    </>
  )
}

export default InstagramCarouselExample
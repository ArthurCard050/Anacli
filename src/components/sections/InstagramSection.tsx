'use client';

import { useState } from "react"
import { VideoModal } from "@/components/ui/video-modal" // Certifique-se que este caminho está correto
import InstagramVideoCarousel from "@/components/ui/InstagramVideoCarousel"

const instagramReels = [
  {
    id: 1,
    title: "O diagnóstico é o primeiro passo…",
    videoSrc: "/assets/reels/O diagnóstico é o primeiro passo…Mas é no tratamento que a esperança se transforma em ação. 💗Co.mp4",
  },
  {
    id: 2,
    title: "É cada figura que passa por aqui 😂🍭🍬",
    videoSrc: "/assets/reels/É cada figura que passa por aqui 😂🍭🍬.mp4",
  },
  {
    id: 3,
    title: "🩸👶 Tornar o exame de sangue menos assustador para as crianças é possível com algumas atitudes simples!",
    videoSrc: "/assets/reels/🩸👶 Tornar o exame de sangue menos assustador para as crianças é possível com algumas atitudes .mp4",
  },
  {
    id: 4,
    title: "Aqui nosso objetivo é não criar traumas, mas trazer uma relação transformada entre coleta de sangue e nossos pequenos 👦🏽 🍭",
    videoSrc: "/assets/reels/Aqui nosso objetivo é não criar traumas, mas trazer uma relação transformada entre coleta de san.mp4",
  },
  {
    id: 5,
    title: "Quando o chefe começa a me seguir nas redes sociais 💚😂",
    videoSrc: "/assets/reels/Quando o chefe começa a me seguir nas redes sociais 💚😂.mp4",
  },
  {
    id: 6,
    title: "A nossa velhice é cultivada de acordo com as nossas escolhas quando ainda jovens 👴🏼💚✨",
    videoSrc: "/assets/reels/A nossa velhice é cultivada de acordo com as nossas escolhas quando ainda jovens 👴🏼💚✨.mp4",
  },
  {
    id: 7,
    title: "Segue pra não perder vídeo como esse 🤣",
    videoSrc: "/assets/reels/Segue pra não perder vídeo como esse 🤣#pcgamer #tecnologia #reelsbr #techbr #memes.mp4",
  }
]

const InstagramSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<{src: string, title: string} | null>(null)

  const handleVideoClick = (video: typeof instagramReels[0]) => {
    setSelectedVideo({ src: video.videoSrc, title: video.title })
  }

  const closeVideo = () => {
    setSelectedVideo(null)
  }

  return (
    <>
      <InstagramVideoCarousel
        videos={instagramReels}
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

export default InstagramSection
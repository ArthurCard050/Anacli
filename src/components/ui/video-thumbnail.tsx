"use client"

import { Play } from "lucide-react"

interface VideoThumbnailProps {
  thumbnail: string
  title: string
  onClick: () => void
  className?: string
}

export function VideoThumbnail({ thumbnail, title, onClick, className = "" }: VideoThumbnailProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-transform hover:scale-105 ${className}`}
    >
      {/* Thumbnail image */}
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-full object-cover"
      />

      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform">
          <div className="bg-primary rounded-full p-3">
            <Play className="w-6 h-6 text-white fill-white" />
          </div>
        </div>
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4">
        <h3 className="text-white text-sm font-medium">{title}</h3>
      </div>
    </button>
  )
}
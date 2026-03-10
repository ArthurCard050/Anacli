'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Calendar, Clock, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

interface BlogHeroCarouselProps {
  posts: Post[];
}

export default function BlogHeroCarousel({ posts }: BlogHeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % posts.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [posts.length]);

  const nextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    setCurrentSlide((prev) => (prev + 1) % posts.length);
  };

  const prevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    setCurrentSlide((prev) => (prev - 1 + posts.length) % posts.length);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <section className="relative bg-white overflow-hidden pt-20 md:pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        <div className="space-y-4">
          <div 
            ref={carouselRef}
            className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {posts.map((post, index) => (
              <div
                key={post.id}
                className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              >
                <Link href={`/blog/${post.slug}`} className="block h-full group">
                  <div className="relative h-full">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority={index === 0}
                      sizes="100vw"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-12 xl:p-16">
                      <div className="max-w-4xl">
                        <div className="flex items-center gap-3 mb-3 md:mb-4">
                          <Badge className="bg-red-600 text-white border-0 px-3 py-1 trending-badge">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            EM DESTAQUE
                          </Badge>
                          <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 px-3 py-1">
                            {post.category}
                          </Badge>
                        </div>

                        <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 md:mb-4 leading-tight group-hover:text-accent transition-colors">
                          {post.title}
                        </h1>

                        <p className="text-base md:text-lg lg:text-xl text-white/90 mb-4 md:mb-6 max-w-3xl line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center gap-4 md:gap-6 text-white/80 text-xs md:text-sm">
                          <span className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}

            {/* Navigation Buttons - Hidden on Mobile */}
            <div className="hidden md:flex absolute inset-y-0 left-4 items-center no-print z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => prevSlide(e)}
                className="h-12 w-12 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white border border-white/20"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>
            <div className="hidden md:flex absolute inset-y-0 right-4 items-center no-print z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => nextSlide(e)}
                className="h-12 w-12 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white border border-white/20"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Indicators - Outside card */}
          <div className="flex justify-center gap-2 no-print py-2">
            {posts.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setCurrentSlide(index);
                }}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

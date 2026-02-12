'use client';

import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % posts.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [posts.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % posts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + posts.length) % posts.length);
  };

  return (
    <section className="relative bg-white overflow-hidden pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden">
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
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16">
                    <div className="max-w-4xl">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge className="bg-red-600 text-white border-0 px-3 py-1 trending-badge">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          EM DESTAQUE
                        </Badge>
                        <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 px-3 py-1">
                          {post.category}
                        </Badge>
                      </div>

                      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight group-hover:text-accent transition-colors">
                        {post.title}
                      </h1>

                      <p className="text-lg md:text-xl text-white/90 mb-6 max-w-3xl line-clamp-2">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-6 text-white/80 text-sm">
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

          {/* Navigation Buttons */}
          <div className="absolute inset-y-0 left-4 flex items-center no-print">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute inset-y-0 right-4 flex items-center no-print">
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 no-print">
            {posts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? 'w-8 bg-white'
                    : 'w-2 bg-white/50 hover:bg-white/75'
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

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter, Copy, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface BlogPostHeaderProps {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorAvatar?: string;
  date: string;
  readTime: string;
  image: string;
}

export default function BlogPostHeader({
  title,
  excerpt,
  category,
  author,
  authorAvatar,
  date,
  readTime,
  image,
}: BlogPostHeaderProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const text = title;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <div
        className="reading-progress no-print"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Hero Image */}
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] pt-20 md:pt-24">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Article Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 lg:p-12">
            {/* Back Button */}
            <Link href="/blog" className="inline-block mb-6">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-primary -ml-2">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para o Blog
              </Button>
            </Link>

            <Badge className="mb-4 bg-primary text-white text-sm px-4 py-1.5">
              {category}
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {title}
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed">
              {excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-primary flex items-center justify-center">
                  {authorAvatar ? (
                    <Image
                      src={authorAvatar}
                      alt={author}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5 text-white" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-sm">{author}</p>
                  <p className="text-xs text-gray-500">Autor</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-sm">{date}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-sm">{readTime} de leitura</span>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-6 no-print">
              <span className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Compartilhar:
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('facebook')}
                className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600"
                title="Compartilhar no Facebook"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('twitter')}
                className="hover:bg-sky-50 hover:text-sky-600 hover:border-sky-600"
                title="Compartilhar no Twitter"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('whatsapp')}
                className="hover:bg-green-50 hover:text-green-600 hover:border-green-600"
                title="Compartilhar no WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('copy')}
                className={`hover:bg-gray-100 ml-auto ${copied ? 'bg-green-50 text-green-600 border-green-600' : ''}`}
                title={copied ? 'Link copiado!' : 'Copiar link'}
              >
                <Copy className="h-4 w-4 mr-2" />
                {copied ? 'Copiado!' : 'Copiar link'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

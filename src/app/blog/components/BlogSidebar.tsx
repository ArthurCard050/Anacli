'use client';

import Link from 'next/link';
import Image from 'next/image';
import { TrendingUp, Mail, Search, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

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

interface BlogSidebarProps {
  posts: Post[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function BlogSidebar({ posts, searchQuery, onSearchChange }: BlogSidebarProps) {
  const [email, setEmail] = useState('');
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const trendingPosts = posts.slice(0, 5);
  const popularTags = [
    'Saúde',
    'Prevenção',
    'Exames',
    'Nutrição',
    'Bem-estar',
    'Diabetes',
    'Check-up',
    'Imunidade',
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    alert('Obrigado por se inscrever! Em breve você receberá nossos conteúdos.');
    setEmail('');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(localSearchQuery);
  };

  const handleClearSearch = () => {
    setLocalSearchQuery('');
    onSearchChange('');
  };

  return (
    <aside className="space-y-6">
      {/* Search */}
      <div className="sidebar-sticky">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Buscar Artigos
          </h3>
          <form onSubmit={handleSearch} className="space-y-2">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Digite sua busca..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            {searchQuery && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleClearSearch}
                className="w-full text-xs"
              >
                Limpar busca
              </Button>
            )}
          </form>
        </div>

        {/* Newsletter */}
        <div className="bg-primary rounded-xl p-6 text-white shadow-lg mt-6">
          <div className="flex items-center gap-2 mb-3">
            <Mail className="h-5 w-5" />
            <h3 className="text-lg font-bold">Newsletter</h3>
          </div>
          <p className="text-sm text-white/90 mb-4">
            Receba conteúdo exclusivo sobre saúde direto no seu e-mail
          </p>
          <form onSubmit={handleNewsletterSubmit} className="space-y-2">
            <Input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              required
            />
            <Button
              type="submit"
              className="w-full bg-white text-primary hover:bg-white/90 font-semibold"
            >
              Inscrever-se
            </Button>
          </form>
          <p className="text-xs text-white/70 mt-2">
            Sem spam. Cancele quando quiser.
          </p>
        </div>

        {/* Trending Posts */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-500" />
            Em Alta
          </h3>
          <div className="space-y-4">
            {trendingPosts.map((post, index) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <article className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Tags */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Tag className="h-5 w-5 text-primary" />
            Tags Populares
          </h3>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-colors"
                onClick={() => {
                  setLocalSearchQuery(tag);
                  onSearchChange(tag);
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gray-900 rounded-xl p-6 text-white shadow-lg mt-6 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-2">Agende seus Exames</h3>
            <p className="text-sm text-white/80 mb-4">
              Cuidar da saúde nunca foi tão fácil
            </p>
            <Link href="/loja/exames">
              <Button className="w-full bg-accent hover:bg-accent/90 text-white font-semibold">
                Ver Exames
              </Button>
            </Link>
          </div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
        </div>
      </div>
    </aside>
  );
}

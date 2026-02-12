'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, TrendingUp, Flame, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import BlogSidebar from './BlogSidebar';
import BlogPagination from './BlogPagination';

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

interface BlogMainGridProps {
  posts: Post[];
  allPosts: Post[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  postsPerPage: number;
}

export default function BlogMainGrid({ 
  posts, 
  allPosts, 
  searchQuery, 
  onSearchChange,
  currentPage,
  onPageChange,
  postsPerPage
}: BlogMainGridProps) {
  // Calculate pagination
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  
  // Get posts for current page
  const currentPosts = posts.slice(startIndex, endIndex);
  
  // Split current posts into featured and list
  const mainPosts = currentPosts.slice(0, 6);
  const listPosts = currentPosts.slice(6);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="blog-grid">
          {/* Main Content */}
          <div className="space-y-8">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Nenhum artigo encontrado.</p>
                <p className="text-gray-400 text-sm mt-2">Tente ajustar os filtros ou busca.</p>
              </div>
            ) : (
              <>
                {/* Featured Grid */}
                {mainPosts.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <Flame className="h-6 w-6 text-orange-500" />
                        <h2 className="text-2xl font-bold text-gray-900">
                          {searchQuery ? 'Resultados da Busca' : 'Mais Lidos'}
                        </h2>
                      </div>
                      {searchQuery && (
                        <span className="text-sm text-gray-500">
                          {posts.length} {posts.length === 1 ? 'resultado' : 'resultados'}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {mainPosts.map((post, index) => (
                        <Link
                          key={post.id}
                          href={`/blog/${post.slug}`}
                          className="block group blog-card bg-white rounded-xl overflow-hidden border border-gray-200"
                        >
                          <article>
                            <div className="relative aspect-[16/9] overflow-hidden">
                              <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                              
                              <div className="absolute top-4 left-4 flex items-center gap-2">
                                <Badge className="bg-white text-gray-900 border-0 text-xs px-3 py-1">
                                  {post.category}
                                </Badge>
                                {index < 3 && !searchQuery && currentPage === 1 && (
                                  <Badge className="bg-red-600 text-white border-0 text-xs px-2 py-1">
                                    <TrendingUp className="h-3 w-3" />
                                  </Badge>
                                )}
                              </div>
                            </div>

                            <div className="p-6">
                              <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                              </h3>
                              <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
                                {post.excerpt}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {post.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {post.readTime}
                                </span>
                              </div>
                            </div>
                          </article>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* List Posts */}
                {listPosts.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <Eye className="h-6 w-6 text-primary" />
                      <h2 className="text-2xl font-bold text-gray-900">Últimas Publicações</h2>
                    </div>

                    <div className="space-y-4">
                      {listPosts.map((post) => (
                        <Link
                          key={post.id}
                          href={`/blog/${post.slug}`}
                          className="block group"
                        >
                          <article className="flex gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-primary/50 transition-all">
                            <div className="relative w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                              <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="128px"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <Badge variant="outline" className="mb-2 text-xs">
                                {post.category}
                              </Badge>
                              <h3 className="font-bold text-gray-900 mb-2 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                              </h3>
                              <div className="flex items-center gap-3 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {post.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {post.readTime}
                                </span>
                              </div>
                            </div>
                          </article>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pagination */}
                <BlogPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                />
              </>
            )}
          </div>

          {/* Sidebar */}
          <BlogSidebar 
            posts={allPosts} 
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
          />
        </div>
      </div>
    </section>
  );
}

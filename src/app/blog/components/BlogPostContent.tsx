'use client';

import { Tag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import BlogPostHeader from './BlogPostHeader';
import BlogLikes from './BlogLikes';
import FacebookComments from './FacebookComments';
import FacebookCommentsIframe from './FacebookCommentsIframe';
import '../styles/blog.css';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorBio: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

interface BlogPostContentProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostContent({ post, relatedPosts }: BlogPostContentProps) {
  const postUrl = typeof window !== 'undefined' ? window.location.href : `https://anacli.com.br/blog/${post.slug}`;
  const [useIframe, setUseIframe] = useState(false);

  return (
    <article className="min-h-screen bg-gray-50">
      <BlogPostHeader
        title={post.title}
        excerpt={post.excerpt}
        category={post.category}
        author={post.author}
        date={post.date}
        readTime={post.readTime}
        image={post.image}
      />

      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Article Content */}
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 mb-8">
            <div 
              className="prose prose-lg max-w-none custom-scrollbar
                prose-headings:font-bold prose-headings:text-gray-900
                prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-200
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
                prose-ul:my-6 prose-ul:space-y-2
                prose-li:text-gray-700 prose-li:leading-relaxed
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-3 flex-wrap">
                  <Tag className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">Tags:</span>
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-sm hover:bg-primary hover:text-white hover:border-primary transition-colors cursor-pointer"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Engagement Actions */}
            <div className="mt-8 pt-8 border-t border-gray-200 flex items-center justify-between no-print">
              <BlogLikes postId={post.id} />
            </div>
          </div>

          {/* Author Bio */}
          <div className="bg-white rounded-2xl p-8 mb-8 border border-gray-200 shadow-sm">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <User className="h-10 w-10 text-white" />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Sobre {post.author}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {post.authorBio}
                </p>
                <Link href="/blog">
                  <Button variant="outline" size="sm" className="hover:bg-primary hover:text-white">
                    Ver todos os artigos
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Leia Também</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="block group">
                    <article className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-primary/50 transition-all shadow-sm hover:shadow-md">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="p-4">
                        <Badge variant="outline" className="mb-2 text-xs">
                          {relatedPost.category}
                        </Badge>
                        <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                          {relatedPost.title}
                        </h3>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className="mb-8">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setUseIframe(!useIframe)}
                className="text-xs text-gray-500 hover:text-gray-700 underline"
              >
                Alternar para versão {useIframe ? 'SDK' : 'iframe'}
              </button>
            </div>
            {useIframe ? (
              <FacebookCommentsIframe postUrl={postUrl} />
            ) : (
              <FacebookComments postUrl={postUrl} />
            )}
          </div>

          {/* CTA */}
          <div className="bg-primary rounded-2xl p-8 md:p-10 text-center text-white shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Cuide da sua saúde com a Anacli
            </h2>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              Agende seus exames de forma rápida, segura e com resultados confiáveis
            </p>
            <Link href="/loja/exames">
              <Button size="lg" className="bg-accent text-white hover:bg-accent/90 font-semibold shadow-lg">
                Ver Exames Disponíveis
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

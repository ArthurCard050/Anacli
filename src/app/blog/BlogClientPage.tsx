'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogHeroCarousel from './components/BlogHeroCarousel';
import BlogCategoriesBar from './components/BlogCategoriesBar';
import BlogMainGrid from './components/BlogMainGrid';
import BlogNewsletterCTA from './components/BlogNewsletterCTA';
import './styles/blog.css';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

interface Category {
  name: string;
  slug: string;
  count: number;
}

interface BlogClientPageProps {
  initialPosts: BlogPost[];
  initialCategories: Category[];
}

const POSTS_PER_PAGE = 20;

export default function BlogClientPage({ initialPosts, initialCategories }: BlogClientPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter posts based on category and search
  const filteredPosts = useMemo(() => {
    return initialPosts.filter(post => {
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  // Reset to page 1 when filters change
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {initialPosts.length > 0 && (
          <BlogHeroCarousel posts={initialPosts.slice(0, 3)} />
        )}
        <BlogCategoriesBar 
          categories={initialCategories} 
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
        />
        <BlogMainGrid 
          posts={filteredPosts}
          allPosts={initialPosts}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          postsPerPage={POSTS_PER_PAGE}
        />
        <BlogNewsletterCTA />
      </main>

      <Footer />
    </div>
  );
}

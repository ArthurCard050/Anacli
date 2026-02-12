import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogHeroCarousel from './components/BlogHeroCarousel';
import BlogCategoriesBar from './components/BlogCategoriesBar';
import BlogMainGrid from './components/BlogMainGrid';
import BlogNewsletterCTA from './components/BlogNewsletterCTA';
import { mockPosts, categories } from './data/mock-posts';
import './styles/blog.css';

export const metadata: Metadata = {
  title: 'Blog Anacli | Saúde, Bem-estar e Prevenção',
  description: 'Fique por dentro das últimas novidades sobre saúde, exames laboratoriais, prevenção de doenças e bem-estar.',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        <BlogHeroCarousel posts={mockPosts.slice(0, 3)} />
        <BlogCategoriesBar categories={categories} />
        <BlogMainGrid posts={mockPosts} />
        <BlogNewsletterCTA />
      </main>

      <Footer />
    </div>
  );
}

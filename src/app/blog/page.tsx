import { Metadata } from 'next';
import BlogClientPage from './BlogClientPage';
import { getPosts, getCategories } from '@/lib/wordpress';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog Anacli | Saúde, Bem-estar e Prevenção',
  description: 'Fique por dentro das últimas novidades sobre saúde, exames laboratoriais, prevenção de doenças e bem-estar.',
};

export default async function BlogPage() {
  try {
    // Fetch data from WordPress
    const posts = await getPosts();
    const categories = await getCategories();

    return <BlogClientPage initialPosts={posts} initialCategories={categories} />;
  } catch (error) {
    console.error('Error loading blog page:', error);
    
    // Fallback to empty data
    return <BlogClientPage initialPosts={[]} initialCategories={[]} />;
  }
}

import { getPosts } from '@/lib/wordpress';
import NewsSection from './NewsSection';

export default async function NewsSectionWrapper() {
  try {
    const latestPosts = await getPosts({ per_page: 3 });
    
    // Se não houver posts, retorna null (não renderiza a seção)
    if (!latestPosts || latestPosts.length === 0) {
      return null;
    }
    
    return <NewsSection posts={latestPosts} />;
  } catch (error) {
    console.error('Error loading news section:', error);
    return null;
  }
}

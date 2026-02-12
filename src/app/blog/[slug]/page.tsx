import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogPostContent from '@/app/blog/components/BlogPostContent';
import { getPosts, getPostBySlug } from '@/lib/wordpress';

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getPosts({ per_page: 100 });
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post não encontrado | Blog Anacli',
    };
  }

  return {
    title: `${post.title} | Blog Anacli`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Get all posts for related posts
  const allPosts = await getPosts();
  
  // Find related posts (same category, excluding current post)
  const relatedPosts = allPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        <BlogPostContent post={post} relatedPosts={relatedPosts} />
      </main>

      <Footer />
    </div>
  );
}

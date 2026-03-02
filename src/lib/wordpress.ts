// WordPress API Configuration
const WORDPRESS_API_URL = 'https://cms.anacli.com.br/wp-json/wp/v2';

// WordPress Post Type
export interface WordPressPost {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    author?: Array<{
      id: number;
      name: string;
      description: string;
      avatar_urls: {
        [key: string]: string;
      };
    }>;
    'wp:featuredmedia'?: Array<{
      id: number;
      source_url: string;
      alt_text: string;
      media_details: {
        width: number;
        height: number;
      };
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

export interface WordPressCategory {
  id: number;
  count: number;
  name: string;
  slug: string;
  description: string;
}

// Transformed Post Type (for our app)
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  author: string;
  authorBio: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

// Calculate read time based on content
function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min`;
}

// Clean HTML excerpt
function cleanExcerpt(excerpt: string): string {
  return excerpt
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\[&hellip;\]/g, '...') // Replace WordPress ellipsis
    .trim();
}

// Extract first image from HTML content
function extractFirstImage(content: string): string | null {
  // Try to find img tag
  const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
  if (imgMatch && imgMatch[1]) {
    return imgMatch[1];
  }

  // Try to find figure with img
  const figureMatch = content.match(/<figure[^>]*>[\s\S]*?<img[^>]+src="([^">]+)"[\s\S]*?<\/figure>/);
  if (figureMatch && figureMatch[1]) {
    return figureMatch[1];
  }

  // Try to find wp-block-image
  const wpImageMatch = content.match(/<div[^>]*class="[^"]*wp-block-image[^"]*"[^>]*>[\s\S]*?<img[^>]+src="([^">]+)"[\s\S]*?<\/div>/);
  if (wpImageMatch && wpImageMatch[1]) {
    return wpImageMatch[1];
  }

  return null;
}

// Format date to Brazilian format
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const months = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];
  
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day} ${month} ${year}`;
}

// Transform WordPress post to our BlogPost format
export function transformWordPressPost(wpPost: WordPressPost): BlogPost {
  const author = wpPost._embedded?.author?.[0];
  const featuredMedia = wpPost._embedded?.['wp:featuredmedia']?.[0];
  const categories = wpPost._embedded?.['wp:term']?.[0] || [];
  const tags = wpPost._embedded?.['wp:term']?.[1] || [];

  // Get primary category (first one)
  const primaryCategory = categories[0] || { name: 'Sem categoria', slug: 'sem-categoria' };

  // Get image: priority order
  // 1. Featured media from WordPress (imagem de capa)
  // 2. First image in content (fallback para posts antigos)
  // 3. Fallback image (último recurso)
  let postImage: string;
  
  if (featuredMedia?.source_url) {
    // Usa a imagem de capa do WordPress
    postImage = featuredMedia.source_url;
    console.log(`[${wpPost.slug}] Using featured image:`, postImage);
  } else {
    // Fallback: tenta extrair primeira imagem do conteúdo
    const extractedImage = extractFirstImage(wpPost.content.rendered);
    postImage = extractedImage || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=630&fit=crop';
    console.log(`[${wpPost.slug}] No featured image, using:`, extractedImage ? 'content image' : 'fallback');
  }

  return {
    id: wpPost.id.toString(),
    slug: wpPost.slug,
    title: wpPost.title.rendered,
    excerpt: cleanExcerpt(wpPost.excerpt.rendered),
    content: wpPost.content.rendered,
    category: primaryCategory.name,
    categorySlug: primaryCategory.slug,
    author: author?.name || 'Anacli',
    authorBio: author?.description || 'Equipe Anacli',
    date: formatDate(wpPost.date),
    readTime: calculateReadTime(wpPost.content.rendered),
    image: postImage,
    tags: tags.map(tag => tag.name),
  };
}

// Fetch all posts
export async function getPosts(params?: {
  per_page?: number;
  page?: number;
  categories?: string;
  search?: string;
}): Promise<BlogPost[]> {
  try {
    // Se não especificar per_page, buscar TODOS os posts
    const perPage = params?.per_page || 100;
    const currentPage = params?.page || 1;
    
    const queryParams = new URLSearchParams({
      _embed: 'true',
      per_page: perPage.toString(),
      page: currentPage.toString(),
      ...(params?.categories && { categories: params.categories }),
      ...(params?.search && { search: params.search }),
    });

    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?${queryParams}`,
      {
        next: { revalidate: 10 }, // Revalidate every 10 seconds (para testes)
      }
    );

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const posts: WordPressPost[] = await response.json();
    const transformedPosts = posts.map(transformWordPressPost);
    
    // Se retornou 100 posts (limite máximo), pode haver mais páginas
    // Buscar recursivamente todas as páginas
    if (posts.length === 100 && !params?.per_page) {
      const nextPagePosts = await getPosts({
        ...params,
        per_page: 100,
        page: currentPage + 1,
      });
      
      return [...transformedPosts, ...nextPagePosts];
    }
    
    return transformedPosts;
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    return [];
  }
}

// Fetch single post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?slug=${slug}&_embed=true`,
      {
        next: { revalidate: 10 }, // Revalidate every 10 seconds (para testes)
      }
    );

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const posts: WordPressPost[] = await response.json();
    
    if (posts.length === 0) {
      return null;
    }

    return transformWordPressPost(posts[0]);
  } catch (error) {
    console.error('Error fetching WordPress post:', error);
    return null;
  }
}

// Fetch categories
export async function getCategories(): Promise<Array<{ name: string; slug: string; count: number }>> {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/categories?per_page=100`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const categories: WordPressCategory[] = await response.json();
    
    // Filter out empty categories and "Uncategorized"
    return categories
      .filter(cat => cat.count > 0 && cat.slug !== 'uncategorized')
      .map(cat => ({
        name: cat.name,
        slug: cat.slug,
        count: cat.count,
      }));
  } catch (error) {
    console.error('Error fetching WordPress categories:', error);
    return [];
  }
}

// Get category ID by slug
export async function getCategoryIdBySlug(slug: string): Promise<number | null> {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/categories?slug=${slug}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      return null;
    }

    const categories: WordPressCategory[] = await response.json();
    return categories[0]?.id || null;
  } catch (error) {
    console.error('Error fetching category ID:', error);
    return null;
  }
}

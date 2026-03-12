import { mockExams, mockPackages } from '../../data/mock-products';
import ProductPageContent from './ProductPageContent';

export const dynamic = 'force-dynamic';

// Gerar parâmetros estáticos para todas as páginas de produto
export function generateStaticParams() {
  const examSlugs = mockExams.map((exam) => ({
    slug: exam.slug,
  }));
  
  const packageSlugs = mockPackages.map((pkg) => ({
    slug: pkg.slug,
  }));
  
  return [...examSlugs, ...packageSlugs];
}

// Página de Produto (Server Component)
export default function ProductPage({ params }: { params: { slug: string } }) {
  return <ProductPageContent slug={params.slug} />;
}

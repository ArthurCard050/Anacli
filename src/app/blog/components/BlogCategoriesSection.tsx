'use client';

import { Badge } from '@/components/ui/badge';

interface Category {
  name: string;
  slug: string;
  count: number;
}

interface BlogCategoriesSectionProps {
  categories: Category[];
}

export default function BlogCategoriesSection({ categories }: BlogCategoriesSectionProps) {
  const getColor = (index: number) => {
    return index % 2 === 0 
      ? 'bg-primary/10 text-primary hover:bg-primary/20' 
      : 'bg-accent/10 text-accent hover:bg-accent/20';
  };

  return (
    <section className="py-8 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <span className="text-sm font-medium text-gray-600 whitespace-nowrap">Categorias:</span>
          {categories.map((category, index) => (
            <Badge
              key={category.slug}
              variant="secondary"
              className={`${getColor(index)} cursor-pointer transition-colors whitespace-nowrap flex items-center gap-2 px-4 py-2`}
            >
              {category.name}
              <span className="text-xs opacity-70">({category.count})</span>
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}

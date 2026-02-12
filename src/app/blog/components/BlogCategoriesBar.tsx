'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Filter } from 'lucide-react';

interface Category {
  name: string;
  slug: string;
  count: number;
}

interface BlogCategoriesBarProps {
  categories: Category[];
}

export default function BlogCategoriesBar({ categories }: BlogCategoriesBarProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categoryColors = [
    'bg-blue-100 text-blue-700 hover:bg-blue-200',
    'bg-green-100 text-green-700 hover:bg-green-200',
    'bg-purple-100 text-purple-700 hover:bg-purple-200',
    'bg-orange-100 text-orange-700 hover:bg-orange-200',
    'bg-pink-100 text-pink-700 hover:bg-pink-200',
    'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
  ];

  return (
    <section className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 py-4 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 text-gray-600 font-medium whitespace-nowrap">
            <Filter className="h-4 w-4" />
            <span className="text-sm">Filtrar:</span>
          </div>

          <Badge
            variant={selectedCategory === null ? 'default' : 'outline'}
            className={`cursor-pointer transition-all whitespace-nowrap px-4 py-2 ${
              selectedCategory === null
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'hover:bg-gray-100'
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            Todos os artigos
          </Badge>

          {categories.map((category, index) => (
            <Badge
              key={category.slug}
              variant={selectedCategory === category.slug ? 'default' : 'outline'}
              className={`cursor-pointer transition-all whitespace-nowrap px-4 py-2 ${
                selectedCategory === category.slug
                  ? categoryColors[index % categoryColors.length]
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedCategory(category.slug)}
            >
              {category.name}
              <span className="ml-2 text-xs opacity-70">({category.count})</span>
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}

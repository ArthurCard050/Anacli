'use client';

import { ShoppingCart, Clock, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Exam } from '../types';

interface ExamCardProps {
  exam: Exam;
  onAddToCart?: (examId: string) => void;
}

export default function ExamCard({ exam, onAddToCart }: ExamCardProps) {
  const hasDiscount = exam.originalPrice && exam.originalPrice > exam.price;
  const discountPercentage = hasDiscount
    ? Math.round(((exam.originalPrice! - exam.price) / exam.originalPrice!) * 100)
    : 0;

  return (
    <Card className="group overflow-hidden border-gray-200 hover:border-primary hover:shadow-lg transition-all h-full flex flex-col">
      {/* Header com badges */}
      <div className="relative p-4 pb-0">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap gap-2">
            {exam.popular && (
              <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                <Tag className="h-3 w-3 mr-1" />
                Popular
              </Badge>
            )}
            {exam.featured && (
              <Badge variant="secondary" className="bg-accent/10 text-accent border-0">
                Destaque
              </Badge>
            )}
          </div>
          {hasDiscount && (
            <Badge className="bg-accent text-white border-0 font-bold">
              -{discountPercentage}%
            </Badge>
          )}
        </div>

        {/* Nome do exame */}
        <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors mb-2 line-clamp-2">
          {exam.name}
        </h3>

        {/* Descrição curta */}
        {exam.shortDescription && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {exam.shortDescription}
          </p>
        )}
      </div>

      {/* Informações adicionais */}
      <div className="px-4 pb-4 flex-1 flex flex-col justify-end">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{exam.deliveryTime}</span>
          </div>
          {exam.category && (
            <Badge variant="outline" className="text-xs">
              {exam.category}
            </Badge>
          )}
        </div>

        {/* Preço e ação */}
        <div className="flex items-end justify-between gap-3 pt-3 border-t border-gray-100">
          <div className="flex flex-col">
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through">
                R$ {exam.originalPrice!.toFixed(2)}
              </span>
            )}
            <span className="text-2xl font-bold text-primary">
              R$ {exam.price.toFixed(2)}
            </span>
          </div>
          <Button
            size="sm"
            onClick={() => onAddToCart?.(exam.id)}
            className="bg-accent hover:bg-accent/90 text-white rounded-full h-9 px-4"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Adicionar
          </Button>
        </div>
      </div>
    </Card>
  );
}

'use client';

import { ShoppingCart, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ExamPackage } from '../types';

interface PackageCardProps {
  package: ExamPackage;
  onAddToCart?: (packageId: string) => void;
}

export default function PackageCard({ package: pkg, onAddToCart }: PackageCardProps) {
  const hasDiscount = pkg.originalPrice && pkg.originalPrice > pkg.price;
  const savings = hasDiscount ? pkg.originalPrice! - pkg.price : 0;

  return (
    <Card className="group overflow-hidden border-gray-200 hover:border-primary hover:shadow-xl transition-all h-full flex flex-col relative">
      {/* Badge de destaque */}
      {pkg.featured && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-accent text-white border-0 font-bold shadow-lg">
            <Sparkles className="h-3 w-3 mr-1" />
            {pkg.discount || 'DESTAQUE'}
          </Badge>
        </div>
      )}

      {/* Header com gradiente */}
      <div className="relative p-6 pb-4 bg-gradient-to-br from-primary/5 to-accent/5">
        <h3 className="font-bold text-2xl text-gray-900 group-hover:text-primary transition-colors mb-2">
          {pkg.title}
        </h3>
        <p className="text-sm text-gray-600">
          {pkg.description}
        </p>
      </div>

      {/* Lista de benefícios */}
      <div className="px-6 py-4 flex-1">
        {pkg.benefits && pkg.benefits.length > 0 && (
          <ul className="space-y-2">
            {pkg.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer com preço e ação */}
      <div className="px-6 pb-6">
        {/* Economia */}
        {hasDiscount && (
          <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm font-semibold text-green-700 text-center">
              💰 Economize R$ {savings.toFixed(2)}
            </p>
          </div>
        )}

        {/* Preço */}
        <div className="flex items-end justify-between gap-3 mb-4">
          <div className="flex flex-col">
            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through">
                De R$ {pkg.originalPrice!.toFixed(2)}
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-xs text-gray-600">Por apenas</span>
              <span className="text-3xl font-bold text-primary">
                R$ {pkg.price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Botão de ação */}
        <Button
          size="lg"
          onClick={() => onAddToCart?.(pkg.id)}
          className="w-full bg-accent hover:bg-accent/90 text-white rounded-xl h-12 font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Adicionar ao Carrinho
        </Button>

        {/* Link para ver detalhes */}
        <button className="w-full mt-2 text-sm text-gray-600 hover:text-primary transition-colors">
          Ver detalhes do pacote →
        </button>
      </div>
    </Card>
  );
}

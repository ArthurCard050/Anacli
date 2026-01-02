'use client';

import Link from 'next/link'
import { HierarchicalButton } from '@/components/ui/hierarchical-button'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary/5">
      <div className="text-center px-6 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary/20 mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Página não encontrada
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <HierarchicalButton
              hierarchy="primary"
              size="lg"
              icon={<Home className="w-4 h-4" />}
              iconPosition="left"
            >
              Voltar ao Início
            </HierarchicalButton>
          </Link>
          
          <HierarchicalButton
            hierarchy="tertiary"
            size="lg"
            icon={<ArrowLeft className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => window.history.back()}
          >
            Página Anterior
          </HierarchicalButton>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          <p>Se você acredita que isso é um erro, entre em contato conosco:</p>
          <a 
            href="mailto:contato@anacli.com.br" 
            className="text-primary hover:text-primary-dark transition-colors"
          >
            contato@anacli.com.br
          </a>
        </div>
      </div>
    </div>
  )
}
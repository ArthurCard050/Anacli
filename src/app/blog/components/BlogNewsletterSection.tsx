'use client';

import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function BlogNewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-200">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Left side - Text */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-4">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-primary text-sm font-medium">Newsletter</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Receba Conteúdo Exclusivo
                </h2>
                <p className="text-gray-600">
                  Dicas de saúde e novidades direto no seu e-mail
                </p>
              </div>

              {/* Right side - Form */}
              <div className="flex-1 w-full">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Seu melhor e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                    required
                  />
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Inscrever
                  </Button>
                </form>
                <p className="text-xs text-gray-500 mt-2">
                  Sem spam. Cancele quando quiser.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

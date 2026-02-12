'use client';

import { Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function BlogNewsletterCTA() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  const benefits = [
    'Artigos exclusivos sobre saúde',
    'Dicas de prevenção e bem-estar',
    'Novidades sobre exames e tratamentos',
    'Promoções especiais',
  ];

  return (
    <section className="py-16 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-primary rounded-3xl p-8 md:p-12 lg:p-16 text-white shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left Side - Text */}
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm font-medium">Newsletter Anacli</span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                    Fique por Dentro das Novidades
                  </h2>

                  <p className="text-lg text-white/90 mb-6">
                    Receba conteúdo exclusivo sobre saúde, prevenção e bem-estar direto no seu e-mail
                  </p>

                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="text-white/90">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Side - Form */}
                <div>
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Inscreva-se Grátis
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Junte-se a milhares de leitores
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="newsletter-email" className="block text-sm font-medium text-gray-700 mb-2">
                          Seu melhor e-mail
                        </label>
                        <Input
                          id="newsletter-email"
                          type="email"
                          placeholder="seuemail@exemplo.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-12"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-12 bg-accent hover:bg-accent/90 text-white font-semibold text-lg"
                      >
                        Quero Receber Conteúdo
                      </Button>

                      <p className="text-xs text-gray-500 text-center">
                        Ao se inscrever, você concorda em receber e-mails da Anacli. Sem spam, cancele quando quiser.
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

'use client';

import PackageCard from './PackageCard';
import { mockPackages } from '../data/mock-products';

export default function PackagesSection() {
  // Pega os pacotes em destaque
  const featuredPackages = mockPackages.filter(pkg => pkg.featured);

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título da seção */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Pacotes de Exames
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Escolha o pacote ideal para cuidar da sua saúde com economia
          </p>
        </div>

        {/* Grid de pacotes */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {featuredPackages.map((pkg) => (
            <PackageCard key={pkg.id} package={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}

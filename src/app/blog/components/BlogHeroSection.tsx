import { BookOpen } from 'lucide-react';

export default function BlogHeroSection() {
  return (
    <section className="relative min-h-[60vh] overflow-hidden bg-gray-50 rounded-b-[40px] lg:rounded-b-[80px] border-b border-gray-200">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-24 sm:pt-28 lg:pt-40 pb-12 lg:pb-20 min-h-[60vh] flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium text-sm">Blog Anacli</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Saúde e <span className="text-accent">Bem-estar</span>
            </h1>

            {/* Divider */}
            <div className="w-20 h-1 bg-accent mx-auto" />

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Conteúdo especializado sobre saúde, prevenção e qualidade de vida
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

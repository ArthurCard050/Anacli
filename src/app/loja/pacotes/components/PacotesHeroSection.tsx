'use client';

export default function PacotesHeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-page mt-[120px] md:mt-32">
      <div className="px-4 sm:px-6 lg:px-8 pt-4 md:pt-0 pb-0">
        <div className="lg:container lg:mx-auto">
          <div className="relative w-full h-48 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-lg">
            <div className="w-full h-full bg-gray-200 relative" 
              style={{ 
                backgroundImage: 'url(/assets/loja/hero-pacotes.png)', 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                backgroundRepeat: 'no-repeat' 
              }} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}

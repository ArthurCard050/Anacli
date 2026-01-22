'use client';

import { useState, useCallback } from 'react';
import { Search, FileText, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ShopHeader from './ShopHeader';

export default function HeroSectionV5() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Dropzone handlers
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setUploadedFile(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setUploadedFile(files[0]);
    }
  }, []);

  const startAIAnalysis = () => {
    console.log('Iniciando análise de IA do arquivo:', uploadedFile?.name);
  };

  return (
    <>
      <ShopHeader />
      
      {/* Hero Section Anacli */}
      <section className="relative text-white hero-anacli-bg" style={{ overflow: 'visible' }}>
        {/* Conteúdo Principal */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-32 pb-16 lg:pb-32 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-6 lg:space-y-8">
            {/* Título Principal */}
            <div className="space-y-2 lg:space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                Os melhores preços
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                em <span className="text-primary">check-ups</span> de qualidade
              </h2>
            </div>

            {/* Subtítulo */}
            <p className="text-base lg:text-xl opacity-90 font-light">
              FAÇA UM ORÇAMENTO AGORA:
            </p>

            {/* Barra de Busca */}
            <div className="max-w-2xl mx-auto">
              <div className="relative hero-search-bar rounded-full">
                <input
                  type="text"
                  placeholder="Busque pelo nome do exame..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 lg:px-6 py-3 lg:py-4 pr-14 lg:pr-16 text-base lg:text-lg text-gray-900 bg-transparent rounded-full border-0 focus:ring-0 outline-none placeholder-gray-500"
                />
                <Button
                  size="lg"
                  className="hero-search-button absolute right-1 lg:right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-white rounded-full w-10 h-10 lg:w-12 lg:h-12 p-0"
                >
                  <Search className="h-4 w-4 lg:h-5 lg:w-5" />
                </Button>
              </div>
            </div>

            {/* Card de Upload */}
            <div className="max-w-xl mx-auto">
              <div
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`hero-upload-card relative rounded-xl lg:rounded-2xl p-4 lg:p-6 transition-all duration-300 cursor-pointer ${
                  isDragging ? 'dragging' : ''
                } ${uploadedFile ? 'uploaded' : ''}`}
              >
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-white mb-1 text-sm lg:text-base">
                      {uploadedFile ? uploadedFile.name : 'Faça seus exames pelo plano de saúde'}
                    </p>
                    <p className="text-xs lg:text-sm text-white/80">
                      {uploadedFile ? 'Arquivo pronto para análise' : 'Envie o pedido médico e agende online o seu agendamento'}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 lg:gap-3">
                    {uploadedFile ? (
                      <Button
                        onClick={startAIAnalysis}
                        className="bg-green-500 hover:bg-green-600 text-white rounded-lg lg:rounded-xl px-3 lg:px-6 text-sm lg:text-base"
                      >
                        <Sparkles className="mr-1 lg:mr-2 h-3 w-3 lg:h-4 lg:w-4" />
                        Analisar
                      </Button>
                    ) : (
                      <Button className="bg-accent hover:bg-accent/90 text-white rounded-lg lg:rounded-xl px-3 lg:px-6 text-sm lg:text-base">
                        ENVIAR PEDIDO
                      </Button>
                    )}
                    
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-lg lg:rounded-xl flex items-center justify-center">
                      {uploadedFile ? (
                        <CheckCircle2 className="h-5 w-5 lg:h-6 lg:w-6 text-green-400" />
                      ) : (
                        <FileText className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* Wave Divider */}
        <div className="hero-wave-divider">
          <svg
            className="relative block w-full h-24"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </section>

      {/* Seção de Cards com Exames - Posicionados para sair da borda do hero (Desktop) */}
      <section className="relative -mt-16 hidden lg:block" style={{ zIndex: 30 }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            
            {/* Card Esquerdo - Exames */}
            <div className="hero-exam-card bg-white p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="hero-card-icon w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Exames</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Colesterol Total</span>
                  <span className="font-bold text-gray-900">R$ 8,00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Glicose</span>
                  <span className="font-bold text-gray-900">R$ 11,00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Hemograma Completo</span>
                  <span className="font-bold text-gray-900">R$ 15,00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">TSH - Hormônio Tireoestimulante</span>
                  <span className="font-bold text-gray-900">R$ 29,00</span>
                </div>
              </div>
            </div>

            {/* Card Direito - Testes */}
            <div className="hero-exam-card bg-white p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="hero-card-icon w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                  <Search className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Testes</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Teste do Coronavírus - Soro HCG</span>
                  <span className="font-bold text-gray-900">R$ 29,00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Teste de Coronavírus - Antígeno</span>
                  <span className="font-bold text-gray-900">R$ 62,00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Teste de Oxigênio Fetal</span>
                  <span className="font-bold text-gray-900">R$ 108,00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Teste de Coronavírus Sars Cov 2 - Urina</span>
                  <span className="font-bold text-gray-900">R$ 218,00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Cards - Simples para Mobile */}
      <section className="bg-white py-8 lg:hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cards para Mobile */}
          <div className="lg:hidden space-y-4 max-w-lg mx-auto">
            
            {/* Card Exames (Mobile) */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Exames</h3>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700 text-sm">Colesterol Total</span>
                  <span className="font-bold text-gray-900 text-sm">R$ 8,00</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700 text-sm">Glicose</span>
                  <span className="font-bold text-gray-900 text-sm">R$ 11,00</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700 text-sm">Hemograma Completo</span>
                  <span className="font-bold text-gray-900 text-sm">R$ 15,00</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700 text-sm">TSH</span>
                  <span className="font-bold text-gray-900 text-sm">R$ 29,00</span>
                </div>
              </div>
            </div>

            {/* Card Testes (Mobile) */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-pink-100 rounded-lg flex items-center justify-center">
                  <Search className="h-4 w-4 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Testes</h3>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700 text-sm">Teste Coronavírus</span>
                  <span className="font-bold text-gray-900 text-sm">R$ 29,00</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700 text-sm">Antígeno</span>
                  <span className="font-bold text-gray-900 text-sm">R$ 62,00</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700 text-sm">Oxigênio Fetal</span>
                  <span className="font-bold text-gray-900 text-sm">R$ 108,00</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700 text-sm">Sars Cov 2</span>
                  <span className="font-bold text-gray-900 text-sm">R$ 218,00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
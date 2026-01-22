'use client';

import { useState, useCallback } from 'react';
import { Camera, Search, Home, Upload, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ShopHeader from './ShopHeader';

export default function HeroSectionV4() {
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
      
      {/* Hero Section com Fundo Magenta */}
      <section className="relative min-h-screen text-white overflow-hidden" style={{ backgroundColor: '#FF0055' }}>
        {/* Efeito de Ondas Simples no Fundo */}
        <div className="absolute inset-0 opacity-10">
          <div className="wave-animation wave-1"></div>
          <div className="wave-animation wave-2"></div>
          <div className="wave-animation wave-3"></div>
        </div>

        {/* Conteúdo Centralizado */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-40 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Realize seus exames em segundos, sem sair de casa.
            </h1>
            <p className="text-xl md:text-2xl font-light opacity-90 max-w-3xl mx-auto">
              Tecnologia e carinho para cuidar da sua saúde com a agilidade que você precisa.
            </p>
          </div>
        </div>

        {/* Wave Divider SVG */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            className="relative block w-full h-32 md:h-48"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="fill-white"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="fill-white"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="fill-white"
            ></path>
          </svg>
        </div>
      </section>

      {/* Cards Flutuantes Sobrepostos - Ajustado para maior sobreposição */}
      <section className="relative bg-white -mt-32 md:-mt-48 pt-32 md:pt-48 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            
            {/* Card 1 - Enviar Receita (Destaque) */}
            <div className="hero-card hero-card-featured group">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-accent/10 rounded-2xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Camera className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Enviar Receita via IA</h3>
                <p className="text-gray-600 text-sm">
                  Nossa inteligência artificial identifica seus exames em segundos
                </p>
                
                {/* Área de Upload Integrada */}
                <div
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-xl p-4 transition-all duration-300 cursor-pointer ${
                    isDragging
                      ? 'border-accent bg-accent/5'
                      : uploadedFile
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 hover:border-accent hover:bg-accent/5'
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  {uploadedFile ? (
                    <div className="flex flex-col items-center gap-2">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                      <p className="text-sm font-medium text-gray-900">{uploadedFile.name}</p>
                      <Button
                        size="sm"
                        onClick={startAIAnalysis}
                        className="bg-accent hover:bg-accent/90 text-white rounded-lg"
                      >
                        <Sparkles className="mr-1 h-4 w-4" />
                        Analisar
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-6 w-6 text-gray-400" />
                      <p className="text-sm text-gray-600">Clique ou arraste aqui</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <FileText className="h-3 w-3" />
                        <span>JPG, PNG, PDF</span>
                      </div>
                    </div>
                  )}
                </div>

                <Button className="w-full bg-accent hover:bg-accent/90 text-white rounded-xl h-12 font-semibold">
                  Enviar agora
                </Button>
              </div>
            </div>

            {/* Card 2 - Buscar Exames */}
            <div className="hero-card group">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Buscar Exames</h3>
                <p className="text-gray-600 text-sm">
                  Encontre rapidamente o exame que você precisa
                </p>
                
                {/* Input de Busca Simples */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Digite o nome do exame..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-colors"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>

                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white rounded-xl h-12 font-semibold">
                  Ver lista completa
                </Button>
              </div>
            </div>

            {/* Card 3 - Coleta Domiciliar */}
            <div className="hero-card group">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Home className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Coleta Domiciliar</h3>
                <p className="text-gray-600 text-sm">
                  Vamos até você com toda segurança e comodidade
                </p>
                
                {/* Informações do Serviço */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Disponível 7 dias por semana</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Agendamento flexível</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl h-12 font-semibold">
                  Agendar coleta
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
'use client';

import { useState } from 'react';
import { Camera, Sparkles, CheckCircle, Lock, TrendingUp, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import UppyUploader from './UppyUploader';

export default function IAReceituarioContent() {
  const [showUploader, setShowUploader] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleFileSelected = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result as string);
      setShowUploader(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className="pt-[120px] md:pt-32 pb-12 md:pb-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Section - Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-6 mb-4 md:mb-8">
            
            {/* Main Hero - 7 columns */}
            <div className="lg:col-span-7 relative overflow-hidden rounded-2xl md:rounded-[2rem] bg-gradient-to-br from-brand-accent via-[#FF1A7A] to-[#FF3D8F] p-6 md:p-12 min-h-[400px] md:min-h-[550px] flex items-center group">
              {/* Animated mesh gradient background */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
              
              <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-6 md:gap-8">
                {/* Imagem OCR - visível apenas no mobile */}
                <div className="flex-shrink-0 lg:hidden">
                  <Image
                    src="/assets/loja/leitura-ia/OCR.jpg"
                    alt="Leitura Inteligente de Receitas"
                    width={640}
                    height={360}
                    className="w-80 h-36 md:w-[28rem] md:h-48 object-cover rounded-2xl md:rounded-3xl shadow-2xl"
                  />
                </div>

                {/* Conteúdo */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl md:text-6xl lg:text-7xl font-clean-bold text-white mb-4 md:mb-6 leading-[1.1] tracking-tight">
                    Leitura Inteligente de Receitas
                  </h1>
                  
                  <p className="text-base md:text-xl text-white/95 mb-6 md:mb-8 font-clean-medium leading-relaxed">
                    Tire uma foto da sua receita e nossa IA identifica todos os exames em segundos. Simples, rápido e preciso.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start">
                    <Button 
                      onClick={() => setShowUploader(true)}
                      className="bg-white text-brand-accent hover:bg-white/90 hover:scale-105 h-12 md:h-16 px-6 md:px-10 text-sm md:text-lg font-clean-bold rounded-xl md:rounded-2xl shadow-2xl shadow-black/20 transition-all duration-300"
                    >
                      <Camera className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3" />
                      Começar Agora
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards - 5 columns, asymmetric layout */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3 md:gap-6">
              {/* Stat 1 - Tall */}
              <div className="col-span-2 card-clean p-5 md:p-8 bg-gradient-to-br from-[#F5F9E8] to-[#E8F3D6] border-[#A6C022]/20 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#A6C022]/20 rounded-full blur-2xl"></div>
                <div className="relative z-10 flex items-center gap-4 md:gap-6">
                  <Image
                    src="/assets/loja/leitura-ia/instantaneo.png"
                    alt="Instantâneo"
                    width={160}
                    height={160}
                    className="w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 object-contain flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="text-4xl md:text-5xl font-clean-bold text-[#7A9019] mb-1 md:mb-2">
                      &lt;3s
                    </div>
                    <div className="text-sm md:text-base text-[#5A6B14] font-clean-semibold">
                      Resultado rápido
                    </div>
                    <div className="text-xs md:text-xs text-[#7A9019] font-clean-medium mt-1">
                      Em poucos segundos
                    </div>
                  </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="card-clean p-4 md:p-6 bg-gradient-to-br from-pink-50 to-rose-50 border-pink-100 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-pink-200/30 rounded-full blur-xl"></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <Image
                    src="/assets/loja/leitura-ia/precisao.png"
                    alt="Precisão"
                    width={120}
                    height={120}
                    className="w-20 h-20 md:w-28 md:h-28 object-contain mb-3"
                  />
                  <div className="text-3xl md:text-4xl font-clean-bold text-brand-accent mb-1">
                    99%
                  </div>
                  <div className="text-xs md:text-xs text-pink-900 font-clean-semibold">
                    Taxa de acerto
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="card-clean p-4 md:p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-200/30 rounded-full blur-xl"></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <Image
                    src="/assets/loja/leitura-ia/analises.png"
                    alt="Análises"
                    width={120}
                    height={120}
                    className="w-20 h-20 md:w-28 md:h-28 object-contain mb-3"
                  />
                  <div className="text-3xl md:text-4xl font-clean-bold text-blue-700 mb-1">
                    50k+
                  </div>
                  <div className="text-xs md:text-xs text-blue-900 font-clean-semibold">
                    Receitas lidas
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Result */}
          {uploadedImage && (
            <div className="card-clean p-6 md:p-8 mb-6 md:mb-8 bg-gradient-to-br from-green-50 to-white border-green-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-clean-bold text-text-primary-clean">Imagem Recebida</h3>
                  <p className="text-sm text-text-secondary-clean font-clean-regular">Pronta para análise</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <img
                  src={uploadedImage}
                  alt="Receita enviada"
                  className="w-full h-64 object-contain rounded-xl bg-white"
                />
                <div className="flex flex-col justify-center">
                  <Button className="btn-primary-clean h-14 text-base mb-3">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Analisar com IA
                  </Button>
                  <p className="text-xs text-text-secondary-clean text-center font-clean-regular">
                    A análise leva apenas alguns segundos
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Features - Advanced Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-3 md:gap-6 mb-4 md:mb-8">
            
            {/* Feature 1 - Large Spotlight */}
            <div className="md:col-span-6 lg:col-span-8 card-clean p-6 md:p-10 bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 relative overflow-hidden group hover:scale-[1.01] transition-all duration-500">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl group-hover:opacity-100 opacity-70 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8 mb-4 md:mb-6">
                  <Image
                    src="/assets/loja/leitura-ia/ocr.png"
                    alt="Leitura Inteligente"
                    width={160}
                    height={160}
                    className="w-32 h-32 md:w-40 md:h-40 object-contain flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl md:text-3xl font-clean-bold text-text-primary-clean mb-2 md:mb-3">
                      Leitura Inteligente de Receitas
                    </h3>
                    <p className="text-sm md:text-lg text-text-secondary-clean font-clean-medium leading-relaxed">
                      Nossa tecnologia consegue ler qualquer tipo de letra médica, mesmo as mais difíceis. Já analisamos milhares de receitas e aprendemos a identificar cada exame com precisão.
                    </p>
                  </div>
                </div>
                
                {/* Mini stats */}
                <div className="grid grid-cols-3 gap-3 md:gap-4 pt-4 md:pt-6 border-t border-slate-200">
                  <div>
                    <div className="text-xl md:text-2xl font-clean-bold text-brand-accent mb-1">Rápido</div>
                    <div className="text-[10px] md:text-xs text-text-secondary-clean font-clean-medium">Menos de 3 segundos</div>
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-clean-bold text-[#A6C022] mb-1">Sempre</div>
                    <div className="text-[10px] md:text-xs text-text-secondary-clean font-clean-medium">Disponível 24h</div>
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-clean-bold text-blue-600 mb-1">Seguro</div>
                    <div className="text-[10px] md:text-xs text-text-secondary-clean font-clean-medium">Seus dados protegidos</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 - Vertical Card */}
            <div className="md:col-span-6 lg:col-span-4 md:row-span-2 card-clean p-6 md:p-8 bg-gradient-to-br from-[#F5F9E8] to-[#E8F3D6] border-[#A6C022]/20 relative overflow-hidden group hover:scale-[1.01] transition-all duration-500">
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#A6C022]/10 rounded-full blur-2xl"></div>
              
              <div className="relative z-10 h-full flex flex-col">
                <Image
                  src="/assets/loja/leitura-ia/seguranca.png"
                  alt="Segurança"
                  width={120}
                  height={120}
                  className="w-24 h-24 md:w-32 md:h-32 object-contain mb-4 md:mb-6"
                />
                
                <h3 className="text-xl md:text-3xl font-clean-bold text-[#5A6B14] mb-3 md:mb-4">
                  Seus Dados Protegidos
                </h3>
                
                <p className="text-sm md:text-base text-[#6B7F1A] font-clean-medium leading-relaxed mb-4 md:mb-6 flex-grow">
                  Suas informações são totalmente seguras e privadas. Seguimos todas as regras de proteção de dados e privacidade médica.
                </p>
                
                <div className="space-y-2 md:space-y-3">
                  <div className="flex items-center gap-2 md:gap-3">
                    <Lock className="h-4 w-4 md:h-5 md:w-5 text-[#7A9019] flex-shrink-0" />
                    <span className="text-xs md:text-sm text-[#5A6B14] font-clean-semibold">Dados criptografados</span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3">
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-[#7A9019] flex-shrink-0" />
                    <span className="text-xs md:text-sm text-[#5A6B14] font-clean-semibold">Certificado de segurança</span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3">
                    <Lock className="h-4 w-4 md:h-5 md:w-5 text-[#7A9019] flex-shrink-0" />
                    <span className="text-xs md:text-sm text-[#5A6B14] font-clean-semibold">Privacidade garantida</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 - Wide Card */}
            <div className="md:col-span-6 lg:col-span-8 card-clean p-5 md:p-8 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100 relative overflow-hidden group hover:scale-[1.01] transition-all duration-500">
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 md:gap-6">
                <Image
                  src="/assets/loja/leitura-ia/qualquer-formato.png"
                  alt="Qualquer Formato"
                  width={120}
                  height={120}
                  className="w-24 h-24 md:w-28 md:h-28 object-contain flex-shrink-0"
                />
                
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg md:text-2xl font-clean-bold text-text-primary-clean mb-2 md:mb-3">
                    Aceita Qualquer Tipo de Receita
                  </h3>
                  
                  <p className="text-xs md:text-base text-text-secondary-clean font-clean-medium leading-relaxed">
                    Escrita à mão, impressa ou digital - nossa IA consegue ler todos os formatos de receita médica
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* How it Works - Compact Timeline */}
          <div className="card-clean p-5 md:p-8 bg-gradient-to-br from-slate-50 to-white border-slate-100">
            <div className="text-center mb-5 md:mb-8">
              <h2 className="text-xl md:text-3xl font-clean-bold text-text-primary-clean mb-2">
                Como Funciona
              </h2>
              <p className="text-xs md:text-base text-text-secondary-clean font-clean-medium">
                Três passos simples para agendar seus exames
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 relative max-w-4xl mx-auto">
              {/* Connection line - desktop only */}
              <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-accent via-[#A6C022] to-brand-accent opacity-20"></div>
              
              {/* Step 1 */}
              <div className="relative group">
                <div className="flex flex-col items-center text-center">
                  {/* Number badge */}
                  <div className="absolute -top-2 -left-2 w-7 h-7 md:w-8 md:h-8 rounded-lg bg-brand-accent text-white font-clean-bold text-xs md:text-sm flex items-center justify-center shadow-md z-10">
                    1
                  </div>
                  
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-brand-accent to-[#FF3D8F] flex items-center justify-center mb-3 md:mb-4 relative z-10 shadow-lg shadow-brand-accent/20 group-hover:scale-105 transition-transform duration-300">
                    <Camera className="h-7 w-7 md:h-8 md:w-8 text-white" />
                  </div>
                  
                  <h3 className="text-sm md:text-lg font-clean-bold text-text-primary-clean mb-1 md:mb-2">
                    Capture a Receita
                  </h3>
                  <p className="text-xs md:text-sm text-text-secondary-clean font-clean-medium leading-relaxed">
                    Tire uma foto ou faça upload
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative group">
                <div className="flex flex-col items-center text-center">
                  {/* Number badge */}
                  <div className="absolute -top-2 -left-2 w-7 h-7 md:w-8 md:h-8 rounded-lg bg-[#A6C022] text-white font-clean-bold text-xs md:text-sm flex items-center justify-center shadow-md z-10">
                    2
                  </div>
                  
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-[#A6C022] to-[#8FA01B] flex items-center justify-center mb-3 md:mb-4 relative z-10 shadow-lg shadow-[#A6C022]/20 group-hover:scale-105 transition-transform duration-300">
                    <Brain className="h-7 w-7 md:h-8 md:w-8 text-white" />
                  </div>
                  
                  <h3 className="text-sm md:text-lg font-clean-bold text-text-primary-clean mb-1 md:mb-2">
                    IA Processa
                  </h3>
                  <p className="text-xs md:text-sm text-text-secondary-clean font-clean-medium leading-relaxed">
                    Identificação automática
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative group">
                <div className="flex flex-col items-center text-center">
                  {/* Number badge */}
                  <div className="absolute -top-2 -left-2 w-7 h-7 md:w-8 md:h-8 rounded-lg bg-brand-accent text-white font-clean-bold text-xs md:text-sm flex items-center justify-center shadow-md z-10">
                    3
                  </div>
                  
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-brand-accent to-[#FF3D8F] flex items-center justify-center mb-3 md:mb-4 relative z-10 shadow-lg shadow-brand-accent/20 group-hover:scale-105 transition-transform duration-300">
                    <CheckCircle className="h-7 w-7 md:h-8 md:w-8 text-white" />
                  </div>
                  
                  <h3 className="text-sm md:text-lg font-clean-bold text-text-primary-clean mb-1 md:mb-2">
                    Confirme e Agende
                  </h3>
                  <p className="text-xs md:text-sm text-text-secondary-clean font-clean-medium leading-relaxed">
                    Revise e finalize
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-6 md:mt-8">
              <Button 
                onClick={() => setShowUploader(true)}
                className="btn-primary-clean h-11 md:h-12 px-6 md:px-8 text-sm md:text-base hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Experimentar Agora
              </Button>
            </div>
          </div>

        </div>
      </div>

      {/* Uppy Uploader Modal */}
      {showUploader && (
        <UppyUploader 
          onClose={() => setShowUploader(false)}
          onFileSelected={handleFileSelected}
        />
      )}
    </main>
  );
}

import { Camera, Zap, Brain, CheckCircle, ArrowUpRight, X } from 'lucide-react';
import { useState } from 'react';

// Componente Banner - Com texto real e imagem normal
function Banner({ backgroundImage = "/assets/loja/3.webp" }) {
  const [showModal, setShowModal] = useState(false);
  
  // SVG path para o background rosa customizado
  const backgroundPath = "M599.486 25.3868C599.486 11.3661 588.12 0 574.099 0H25.3868C11.3661 0 0 11.3661 0 25.3868V264.274C0 278.294 11.366 289.66 25.3868 289.66H495.133C509.154 289.66 520.52 278.294 520.52 264.274V238.343C520.52 224.322 531.886 212.956 545.907 212.956H574.099C588.12 212.956 599.486 201.59 599.486 187.569V25.3868Z";

  return (
    <>
      {/* Layout Desktop */}
      <div className="hidden lg:block relative w-full max-w-[927.16px] h-[289.66px]">
        {/* Imagem de fundo direita - quadrado normal */}
        <div className="absolute flex h-[289.66px] items-center justify-center left-[627.28px] top-0 w-[299.884px]">
          <div className="h-[289.66px] relative rounded-[20px] w-[299.884px] bg-gray-300">
            <img
              alt="Tecnologia IA Anacli"
              className="absolute inset-0 w-full h-full object-cover rounded-[20px]"
              src={backgroundImage}
            />
          </div>
        </div>

        {/* Background Rosa */}
        <div className="absolute h-[289.66px] left-0 top-0 w-[599.486px]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 599.486 289.66"
          >
            <path
              d={backgroundPath}
              fill="#FF006A"
            />
          </svg>
        </div>

        {/* Conteúdo de texto dentro da área rosa */}
        <div className="absolute inset-0 flex flex-col justify-between p-8 max-w-[520px]">
          {/* Título e Subtítulo */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Envie a foto da sua receita
            </h2>
            
            <p className="text-base md:text-lg text-white/90 mb-6">
              Nossa IA lê automaticamente e agenda seus exames em segundos
            </p>

            {/* Botão Principal */}
            <button className="group relative bg-white text-[#FF006A] font-semibold rounded-2xl h-14 px-8 flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 overflow-hidden">
              {/* Gradient overlay no hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
              
              {/* Conteúdo do botão */}
              <div className="relative flex items-center gap-3 z-10">
                <div className="p-1.5 bg-[#FF006A]/10 rounded-full group-hover:bg-[#FF006A]/20 transition-colors duration-300">
                  <Camera className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  Experimentar agora
                </span>
              </div>
              
              {/* Borda animada */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#FF006A]/20 transition-colors duration-300"></div>
            </button>
          </div>

          {/* Benefícios na Base */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex items-center gap-2 text-white">
              <Brain className="h-4 w-4 opacity-80" />
              <span className="text-sm font-medium">Leitura Inteligente</span>
            </div>
            
            <div className="flex items-center gap-2 text-white">
              <Zap className="h-4 w-4 opacity-80" />
              <span className="text-sm font-medium">Super Rápido</span>
            </div>
            
            <div className="flex items-center gap-2 text-white">
              <CheckCircle className="h-4 w-4 opacity-80" />
              <span className="text-sm font-medium">Fácil de Usar</span>
            </div>
          </div>
        </div>

        {/* Botão circular com seta - Modal trigger */}
        <button 
          onClick={() => setShowModal(true)}
          className="absolute left-[538.1px] size-[61.384px] top-[228.28px] bg-[#FF006A] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 cursor-pointer group"
        >
          <ArrowUpRight className="h-6 w-6 text-white transform rotate-12 group-hover:rotate-45 transition-transform duration-200" />
        </button>
      </div>

      {/* Layout Mobile */}
      <div className="lg:hidden w-full">
        <div className="bg-[#FF006A] rounded-3xl p-6 mb-6 relative overflow-hidden">
          {/* Conteúdo Mobile */}
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white mb-3">
              Envie a foto da sua receita
            </h2>
            
            <p className="text-base text-white/90 mb-6">
              Nossa IA lê automaticamente e agenda seus exames em segundos
            </p>

            {/* Botão Principal Mobile */}
            <button className="group relative bg-white text-[#FF006A] font-semibold rounded-2xl h-12 px-6 flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden w-full justify-center mb-6">
              {/* Gradient overlay no hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
              
              {/* Conteúdo do botão */}
              <div className="relative flex items-center gap-3 z-10">
                <div className="p-1.5 bg-[#FF006A]/10 rounded-full group-hover:bg-[#FF006A]/20 transition-colors duration-300">
                  <Camera className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  Experimentar agora
                </span>
              </div>
            </button>

            {/* Benefícios Mobile */}
            <div className="grid grid-cols-3 gap-3 text-center mb-4">
              <div className="flex flex-col items-center gap-1 text-white">
                <Brain className="h-5 w-5 opacity-80" />
                <span className="text-xs font-medium">Leitura Inteligente</span>
              </div>
              
              <div className="flex flex-col items-center gap-1 text-white">
                <Zap className="h-5 w-5 opacity-80" />
                <span className="text-xs font-medium">Super Rápido</span>
              </div>
              
              <div className="flex flex-col items-center gap-1 text-white">
                <CheckCircle className="h-5 w-5 opacity-80" />
                <span className="text-xs font-medium">Fácil de Usar</span>
              </div>
            </div>

            {/* Botão "Como funciona" mobile */}
            <button 
              onClick={() => setShowModal(true)}
              className="w-full text-center text-white/80 text-sm underline hover:text-white transition-colors duration-200"
            >
              Como funciona?
            </button>
          </div>
        </div>

        {/* Imagem Mobile */}
        <div className="w-full h-48 bg-gray-300 rounded-2xl overflow-hidden">
          <img
            alt="Tecnologia IA Anacli"
            className="w-full h-full object-cover"
            src={backgroundImage}
          />
        </div>
      </div>

      {/* Modal de Informações */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
            {/* Header do Modal */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b sticky top-0 bg-white rounded-t-2xl z-10">
              <h3 className="text-lg md:text-2xl font-bold text-gray-900">Como Funciona a IA</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#FF006A] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Camera className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <h4 className="text-lg md:text-xl font-semibold mb-2">Processo Simples e Rápido</h4>
                <p className="text-gray-600 text-sm md:text-base">Nossa inteligência artificial revoluciona o agendamento de exames</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold text-sm md:text-base">1</span>
                  </div>
                  <h5 className="font-semibold mb-2 text-sm md:text-base">Tire a Foto</h5>
                  <p className="text-xs md:text-sm text-gray-600">Fotografe sua receita médica com qualidade</p>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 font-bold text-sm md:text-base">2</span>
                  </div>
                  <h5 className="font-semibold mb-2 text-sm md:text-base">IA Analisa</h5>
                  <p className="text-xs md:text-sm text-gray-600">Nossa IA lê e identifica todos os exames automaticamente</p>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-purple-600 font-bold text-sm md:text-base">3</span>
                  </div>
                  <h5 className="font-semibold mb-2 text-sm md:text-base">Agendamento</h5>
                  <p className="text-xs md:text-sm text-gray-600">Exames são agendados automaticamente em segundos</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h5 className="font-semibold mb-2 flex items-center gap-2 text-sm md:text-base">
                  <Brain className="h-4 w-4 md:h-5 md:w-5 text-[#FF006A]" />
                  Tecnologia Avançada
                </h5>
                <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-600">
                  <li>• Reconhecimento óptico de caracteres (OCR)</li>
                  <li>• Processamento de linguagem natural</li>
                  <li>• Validação automática de exames</li>
                  <li>• Integração com sistema de agendamento</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button 
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-[#FF006A] text-white py-3 px-4 md:px-6 rounded-xl font-semibold hover:bg-[#e6005f] transition-colors text-sm md:text-base"
                >
                  Experimentar Agora
                </button>
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-4 md:px-6 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors text-sm md:text-base"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Exemplo de uso
export default function AIBanner() {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <Banner 
            backgroundImage="/assets/loja/3.webp"
          />
        </div>
      </div>
    </section>
  );
}
'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, CheckCircle, AlertCircle, Lightbulb, Image as ImageIcon, Loader2, ShoppingCart, X, RotateCcw, Zap, FileImage, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/app/loja/context/CartContext';
import { useAnalyzeExam } from '../hooks/useAnalyzeExam';
import '../styles/modern-uploader.css';

interface DesktopImageUploaderProps {
  onClose: () => void;
  onFileSelected: (file: File) => void;
}

interface DetectedExam {
  name: string;
}

type Step = 'instructions' | 'upload' | 'processing' | 'confirmation';

export default function DesktopImageUploader({ onClose }: DesktopImageUploaderProps) {
  const { addItemsByName } = useCart();
  const { analyzeExam } = useAnalyzeExam();
  const [currentStep, setCurrentStep] = useState<Step>('instructions');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [detectedExams, setDetectedExams] = useState<DetectedExam[]>([]);
  const [notFoundExams, setNotFoundExams] = useState<string[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('O arquivo deve ter no máximo 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    setCurrentStep('processing');

    // Chama a API real de análise
    const examNames = await analyzeExam(file);

    if (examNames.length === 0) {
      setDetectedExams([]);
      setCurrentStep('confirmation');
      return;
    }

    // Adiciona ao carrinho automaticamente e obtém os não encontrados
    const { notFound } = await addItemsByName(examNames);

    setDetectedExams(examNames.map(name => ({ name })));
    setNotFoundExams(notFound);
    setCurrentStep('confirmation');
  }, [analyzeExam, addItemsByName]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const addedExams = detectedExams.filter(e => !notFoundExams.includes(e.name));

  return (
    <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl flex flex-col border border-slate-200/50">
        
        {/* Desktop Header */}
        <div className="relative bg-gradient-to-r from-slate-50 to-white border-b border-slate-200/80 p-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-accent to-[#FF3D8F] flex items-center justify-center shadow-lg">
                  <Monitor className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-clean-bold text-slate-900">
                    {currentStep === 'instructions' && 'Análise Inteligente - Desktop'}
                    {currentStep === 'upload' && 'Enviar Receita'}
                    {currentStep === 'processing' && 'Processando IA'}
                    {currentStep === 'confirmation' && 'Confirmar Exames'}
                  </h2>
                  <p className="text-base text-slate-600 font-clean-medium">
                    Envie sua receita médica para análise automática
                  </p>
                </div>
              </div>
              
              {/* Desktop Progress Indicator */}
              <div className="flex items-center gap-4">
                {['instructions', 'upload', 'processing', 'confirmation'].map((step, index) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                      currentStep === step 
                        ? 'bg-gradient-to-br from-brand-accent to-[#FF3D8F] text-white shadow-lg scale-110' 
                        : index < ['instructions', 'upload', 'processing', 'confirmation'].indexOf(currentStep)
                          ? 'bg-[#A6C022] text-white'
                          : 'bg-slate-200 text-slate-500'
                    }`}>
                      {index + 1}
                    </div>
                    {index < 3 && (
                      <div className={`w-16 h-0.5 mx-3 transition-all duration-500 ${
                        index < ['instructions', 'upload', 'processing', 'confirmation'].indexOf(currentStep)
                          ? 'bg-[#A6C022]'
                          : 'bg-slate-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-4 hover:bg-slate-100 rounded-2xl transition-all duration-200 hover:scale-105"
            >
              <X className="h-7 w-7 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50/50 to-white">
          
          {/* STEP 1: Desktop Instructions */}
          {currentStep === 'instructions' && (
            <div className="p-12">
              <div className="max-w-5xl mx-auto">
                
                {/* Hero Section */}
                <div className="text-center mb-16">
                  <div className="relative w-28 h-28 mx-auto mb-8">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-accent/20 to-[#FF3D8F]/20 animate-pulse"></div>
                    <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-br from-brand-accent to-[#FF3D8F] flex items-center justify-center shadow-2xl">
                      <FileImage className="h-14 w-14 text-white" />
                    </div>
                  </div>
                  <h3 className="text-4xl font-clean-bold text-slate-900 mb-6">
                    Envio Profissional de Receitas
                  </h3>
                  <p className="text-xl text-slate-600 font-clean-medium max-w-3xl mx-auto leading-relaxed">
                    Faça upload da sua receita médica digitalizada para análise automática com nossa IA de última geração
                  </p>
                </div>

                {/* Desktop Tips Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  
                  {/* Tip 1 */}
                  <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100/50 p-10 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-8 shadow-lg">
                        <ImageIcon className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="text-2xl font-clean-bold text-slate-900 mb-4">
                        Qualidade da Imagem
                      </h4>
                      <p className="text-slate-600 font-clean-medium leading-relaxed text-lg">
                        Use imagens escaneadas ou fotografias de alta resolução para garantir a melhor leitura da IA.
                      </p>
                    </div>
                  </div>

                  {/* Tip 2 */}
                  <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100/50 p-10 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center mb-8 shadow-lg">
                        <CheckCircle className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="text-2xl font-clean-bold text-slate-900 mb-4">
                        Formatos Aceitos
                      </h4>
                      <p className="text-slate-600 font-clean-medium leading-relaxed text-lg">
                        JPG, PNG, WEBP até 10MB. Documentos escaneados ou fotografias nítidas funcionam perfeitamente.
                      </p>
                    </div>
                  </div>

                  {/* Tip 3 */}
                  <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100/50 p-10 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-8 shadow-lg">
                        <Zap className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="text-2xl font-clean-bold text-slate-900 mb-4">
                        Processamento Rápido
                      </h4>
                      <p className="text-slate-600 font-clean-medium leading-relaxed text-lg">
                        Nossa IA processa sua receita em segundos, identificando todos os exames automaticamente.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Professional Note */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/50 p-10 mb-12">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-slate-300/20 to-slate-400/20 rounded-full -translate-y-24 translate-x-24"></div>
                  <div className="relative flex items-start gap-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <AlertCircle className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-clean-bold text-slate-900 mb-4">
                        Tecnologia Avançada para Desktop
                      </h4>
                      <p className="text-slate-600 font-clean-medium leading-relaxed text-lg">
                        Otimizado para computadores, nosso sistema aceita arquivos de alta qualidade e oferece 
                        uma experiência profissional de upload com drag & drop intuitivo.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="text-center">
                  <Button
                    onClick={() => setCurrentStep('upload')}
                    className="group relative overflow-hidden bg-gradient-to-r from-brand-accent to-[#FF3D8F] hover:from-[#FF3D8F] hover:to-brand-accent text-white px-16 py-8 rounded-2xl text-xl font-clean-bold shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105"
                  >
                    <span className="relative z-10 flex items-center gap-4">
                      Enviar Receita
                      <Upload className="h-7 w-7 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Button>
                </div>
              </div>
            </div>
          )}
          {/* STEP 2: Desktop Upload Interface */}
          {currentStep === 'upload' && (
            <div className="p-12">
              <div className="max-w-4xl mx-auto">
                
                {/* Upload Header */}
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-clean-bold text-slate-900 mb-4">
                    Selecione sua Receita
                  </h3>
                  <p className="text-lg text-slate-600 font-clean-medium">
                    Arraste e solte ou clique para selecionar o arquivo
                  </p>
                </div>

                {/* Large Drop Zone */}
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative cursor-pointer rounded-3xl border-3 border-dashed transition-all duration-500 p-20 text-center ${
                    isDragOver
                      ? 'border-brand-accent bg-gradient-to-br from-brand-accent/10 to-[#FF3D8F]/10 scale-105 shadow-2xl'
                      : 'border-slate-300 hover:border-brand-accent/50 hover:bg-gradient-to-br hover:from-slate-50 hover:to-white'
                  }`}
                >
                  <div className="space-y-8">
                    <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br flex items-center justify-center mx-auto transition-all duration-500 shadow-2xl ${
                      isDragOver 
                        ? 'from-brand-accent to-[#FF3D8F] scale-125' 
                        : 'from-slate-400 to-slate-500 hover:from-brand-accent hover:to-[#FF3D8F]'
                    }`}>
                      <Upload className={`transition-all duration-500 text-white ${
                        isDragOver ? 'h-12 w-12' : 'h-10 w-10'
                      }`} />
                    </div>
                    
                    <div>
                      <h4 className={`text-3xl font-clean-bold mb-4 transition-colors duration-300 ${
                        isDragOver ? 'text-brand-accent' : 'text-slate-900'
                      }`}>
                        {isDragOver ? 'Solte aqui!' : 'Arraste sua receita aqui'}
                      </h4>
                      <p className="text-xl text-slate-600 font-clean-medium mb-6">
                        ou clique para selecionar do computador
                      </p>
                      
                      <div className="flex items-center justify-center gap-8 text-slate-500">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                          <span className="font-clean-medium">JPG, PNG, WEBP</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span className="font-clean-medium">Até 10MB</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                          <span className="font-clean-medium">Alta qualidade</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(file);
                    }}
                    className="hidden"
                  />
                </div>

                {/* Alternative Upload Button */}
                <div className="text-center mt-12">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-12 py-6 rounded-2xl text-lg font-clean-bold transition-all duration-300 hover:scale-105 border border-slate-200"
                  >
                    <FileImage className="h-6 w-6 mr-3" />
                    Procurar Arquivo
                  </Button>
                </div>

                {/* Tips */}
                <div className="mt-16 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-200/50 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                      <Lightbulb className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-xl font-clean-bold text-slate-900">
                      Dicas para Melhor Resultado
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
                    <div className="flex items-start gap-3 text-slate-600">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                      <span className="font-clean-medium">Use scanner ou foto de alta qualidade</span>
                    </div>
                    <div className="flex items-start gap-3 text-slate-600">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                      <span className="font-clean-medium">Certifique-se que o texto está legível</span>
                    </div>
                    <div className="flex items-start gap-3 text-slate-600">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                      <span className="font-clean-medium">Evite sombras ou reflexos</span>
                    </div>
                    <div className="flex items-start gap-3 text-slate-600">
                      <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                      <span className="font-clean-medium">Inclua toda a receita no arquivo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* STEP 3: Processing */}
          {currentStep === 'processing' && (
            <div className="p-12 flex items-center justify-center min-h-[600px]">
              <div className="text-center max-w-2xl">
                
                {/* Desktop Loading Animation */}
                <div className="relative w-48 h-48 mx-auto mb-16">
                  {/* Outer Ring */}
                  <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
                  {/* Animated Ring */}
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-brand-accent border-r-[#FF3D8F] animate-spin"></div>
                  {/* Inner Glow */}
                  <div className="absolute inset-6 rounded-full bg-gradient-to-br from-brand-accent/20 to-[#FF3D8F]/20 animate-pulse"></div>
                  {/* Center Icon */}
                  <div className="absolute inset-12 rounded-full bg-gradient-to-br from-brand-accent to-[#FF3D8F] flex items-center justify-center shadow-2xl">
                    <Zap className="h-16 w-16 text-white animate-pulse" />
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-4xl font-clean-bold text-slate-900 mb-4">
                      IA Processando
                    </h3>
                    <p className="text-xl text-slate-600 font-clean-medium leading-relaxed">
                      Nossa inteligência artificial está analisando sua receita com precisão profissional
                    </p>
                  </div>
                  
                  {/* Processing Steps */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-4 text-slate-700">
                      <div className="w-3 h-3 rounded-full bg-brand-accent animate-pulse"></div>
                      <span className="font-clean-medium text-lg">Reconhecimento óptico avançado</span>
                    </div>
                    <div className="flex items-center justify-center gap-4 text-slate-700">
                      <div className="w-3 h-3 rounded-full bg-[#FF3D8F] animate-pulse animation-delay-200"></div>
                      <span className="font-clean-medium text-lg">Identificação de medicamentos</span>
                    </div>
                    <div className="flex items-center justify-center gap-4 text-slate-700">
                      <div className="w-3 h-3 rounded-full bg-[#A6C022] animate-pulse animation-delay-400"></div>
                      <span className="font-clean-medium text-lg">Validação de exames</span>
                    </div>
                  </div>
                </div>
                
                {uploadedImage && (
                  <div className="mt-16 rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50 max-w-2xl mx-auto">
                    <img
                      src={uploadedImage}
                      alt="Receita em análise"
                      className="w-full h-80 object-contain bg-slate-50"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: Confirmation - Same as mobile but with desktop styling */}
          {currentStep === 'confirmation' && (
            <div className="p-12">
              <div className="max-w-5xl mx-auto">
                
                {/* Success Header */}
                <div className="text-center mb-16">
                  <div className="relative w-24 h-24 mx-auto mb-8">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/20 to-green-500/20 animate-ping"></div>
                    <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-2xl">
                      <CheckCircle className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h3 className="text-4xl font-clean-bold text-slate-900 mb-6">
                    {addedExams.length > 0 ? 'Exames Adicionados ao Carrinho!' : 'Análise Concluída'}
                  </h3>
                  <p className="text-xl text-slate-600 font-clean-medium">
                    {addedExams.length > 0 && (
                      <>
                        <span className="font-clean-bold text-brand-accent">{addedExams.length} exame{addedExams.length > 1 ? 's' : ''}</span> adicionado{addedExams.length > 1 ? 's' : ''} ao carrinho automaticamente
                      </>
                    )}
                    {addedExams.length === 0 && 'Nenhum exame encontrado no catálogo para esta receita.'}
                  </p>
                </div>

                {/* Added Exams List */}
                {addedExams.length > 0 && (
                  <div className="mb-12">
                    <h4 className="text-3xl font-clean-bold text-slate-900 mb-8">
                      Exames Adicionados
                    </h4>
                    <div className="space-y-4">
                      {addedExams.map((exam, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-6 rounded-2xl bg-white border border-slate-200/50 p-6 shadow-sm"
                        >
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-md flex-shrink-0">
                            <CheckCircle className="h-6 w-6 text-white" />
                          </div>
                          <span className="text-xl font-clean-bold text-slate-900">{exam.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Not Found Exams */}
                {notFoundExams.length > 0 && (
                  <div className="mb-12 rounded-2xl bg-amber-50 border border-amber-200 p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-xl font-clean-bold text-slate-900 mb-2">
                          Exames não encontrados no catálogo
                        </h4>
                        <p className="text-slate-600 font-clean-medium mb-4">
                          Os exames abaixo foram identificados na receita mas não estão disponíveis no catálogo:
                        </p>
                        <ul className="space-y-2">
                          {notFoundExams.map((name, i) => (
                            <li key={i} className="flex items-center gap-2 text-slate-700 font-clean-medium">
                              <div className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0"></div>
                              {name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-6">
                  <Button
                    onClick={() => setCurrentStep('upload')}
                    className="flex-1 h-20 text-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-clean-bold rounded-2xl transition-all duration-300 hover:scale-105 border border-slate-200"
                  >
                    <RotateCcw className="h-6 w-6 mr-4" />
                    Enviar Nova Receita
                  </Button>
                  <Button
                    onClick={onClose}
                    className="flex-1 h-20 text-xl font-clean-bold rounded-2xl bg-gradient-to-r from-brand-accent to-[#FF3D8F] hover:from-[#FF3D8F] hover:to-brand-accent text-white shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    <ShoppingCart className="h-7 w-7 mr-4" />
                    Ver Carrinho
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
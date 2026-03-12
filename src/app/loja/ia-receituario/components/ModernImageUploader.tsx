'use client';

import { useState, useRef, useCallback } from 'react';
import { Camera, Upload, CheckCircle, AlertCircle, Lightbulb, Image as ImageIcon, Loader2, ShoppingCart, X, RotateCcw, Crop, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/app/loja/context/CartContext';
import '../styles/modern-uploader.css';

interface ModernImageUploaderProps {
  onClose: () => void;
  onFileSelected: (file: File) => void;
}

interface DetectedExam {
  id: string;
  name: string;
  price: number;
}

type Step = 'instructions' | 'capture' | 'processing' | 'confirmation';

// Mock de exames detectados pela IA (em produção, viriam da API)
const mockDetectedExams: DetectedExam[] = [
  { id: 'hemograma-completo', name: 'Hemograma Completo', price: 45.90 },
  { id: 'glicemia-jejum', name: 'Glicemia em Jejum', price: 25.90 },
  { id: 'colesterol-total', name: 'Colesterol Total e Frações', price: 55.90 },
  { id: 'tsh', name: 'TSH', price: 39.90 },
  { id: 'ureia-creatinina', name: 'Ureia e Creatinina', price: 35.90 },
];

export default function ModernImageUploader({ onClose }: ModernImageUploaderProps) {
  const { addItem } = useCart();
  const [currentStep, setCurrentStep] = useState<Step>('instructions');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [detectedExams, setDetectedExams] = useState<DetectedExam[]>([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showFullTerms, setShowFullTerms] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleFileSelect = useCallback((file: File) => {
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
      setCurrentStep('processing');
      
      // Simular processamento da IA
      setTimeout(() => {
        setDetectedExams(mockDetectedExams);
        setCurrentStep('confirmation');
      }, 3000);
    };
    reader.readAsDataURL(file);
  }, []);
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

  const startCamera = async () => {
    try {
      setIsCapturing(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Erro ao acessar câmera:', error);
      alert('Não foi possível acessar a câmera. Verifique as permissões.');
      setIsCapturing(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCapturing(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'receita-camera.jpg', { type: 'image/jpeg' });
        handleFileSelect(file);
        stopCamera();
      }
    }, 'image/jpeg', 0.9);
  };

  const handleAddToCart = () => {
    if (!agreedToTerms) return;
    
    setIsAddingToCart(true);
    
    // Adicionar cada exame detectado ao carrinho
    detectedExams.forEach(exam => {
      addItem(exam.id, 'exam');
    });
    
    // Pequeno delay para feedback visual
    setTimeout(() => {
      setIsAddingToCart(false);
      onClose();
    }, 500);
  };

  const totalPrice = detectedExams.reduce((sum, exam) => sum + exam.price, 0);

  return (
    <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-2xl flex flex-col border border-slate-200/50">
        
        {/* Modern Header */}
        <div className="relative bg-gradient-to-r from-slate-50 to-white border-b border-slate-200/80 p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-accent to-[#FF3D8F] flex items-center justify-center shadow-lg">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-clean-bold text-slate-900">
                    {currentStep === 'instructions' && 'Análise Inteligente'}
                    {currentStep === 'capture' && 'Capturar Receita'}
                    {currentStep === 'processing' && 'Processando IA'}
                    {currentStep === 'confirmation' && 'Confirmar Exames'}
                  </h2>
                  <p className="text-sm text-slate-600 font-clean-medium">
                    Tecnologia de ponta para análise de receitas médicas
                  </p>
                </div>
              </div>
              
              {/* Modern Progress Indicator */}
              <div className="flex items-center gap-3">
                {['instructions', 'capture', 'processing', 'confirmation'].map((step, index) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                      currentStep === step 
                        ? 'bg-gradient-to-br from-brand-accent to-[#FF3D8F] text-white shadow-lg scale-110' 
                        : index < ['instructions', 'capture', 'processing', 'confirmation'].indexOf(currentStep)
                          ? 'bg-[#A6C022] text-white'
                          : 'bg-slate-200 text-slate-500'
                    }`}>
                      {index + 1}
                    </div>
                    {index < 3 && (
                      <div className={`w-12 h-0.5 mx-2 transition-all duration-500 ${
                        index < ['instructions', 'capture', 'processing', 'confirmation'].indexOf(currentStep)
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
              className="p-3 hover:bg-slate-100 rounded-2xl transition-all duration-200 hover:scale-105"
            >
              <X className="h-6 w-6 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50/50 to-white">
          
          {/* STEP 1: Instructions */}
          {currentStep === 'instructions' && (
            <div className="p-8">
              <div className="max-w-4xl mx-auto">
                
                {/* Hero Section */}
                <div className="text-center mb-12">
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-accent/20 to-[#FF3D8F]/20 animate-pulse"></div>
                    <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-brand-accent to-[#FF3D8F] flex items-center justify-center shadow-2xl">
                      <Lightbulb className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-clean-bold text-slate-900 mb-4">
                    Guia para Foto Perfeita
                  </h3>
                  <p className="text-lg text-slate-600 font-clean-medium max-w-2xl mx-auto leading-relaxed">
                    Nossa IA de última geração precisa de uma imagem nítida para identificar todos os exames com precisão máxima
                  </p>
                </div>

                {/* Professional Tips Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  
                  {/* Tip 1 - Enhanced */}
                  <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100/50 p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 shadow-lg">
                        <ImageIcon className="h-7 w-7 text-white" />
                      </div>
                      <h4 className="text-xl font-clean-bold text-slate-900 mb-3">
                        Enquadramento Preciso
                      </h4>
                      <p className="text-slate-600 font-clean-medium leading-relaxed">
                        Capture toda a receita dentro do quadro, garantindo que nenhuma informação importante seja cortada nas bordas.
                      </p>
                    </div>
                  </div>

                  {/* Tip 2 - Enhanced */}
                  <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100/50 p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-6 shadow-lg">
                        <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-clean-bold text-slate-900 mb-3">
                        Iluminação Profissional
                      </h4>
                      <p className="text-slate-600 font-clean-medium leading-relaxed">
                        Use luz natural ou ambiente bem iluminado. Evite sombras e reflexos que possam comprometer a leitura.
                      </p>
                    </div>
                  </div>

                  {/* Tip 3 - Enhanced */}
                  <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100/50 p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center mb-6 shadow-lg">
                        <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-clean-bold text-slate-900 mb-3">
                        Nitidez Máxima
                      </h4>
                      <p className="text-slate-600 font-clean-medium leading-relaxed">
                        Mantenha a câmera estável e aguarde o foco automático. Cada letra deve estar perfeitamente legível.
                      </p>
                    </div>
                  </div>

                  {/* Tip 4 - Enhanced */}
                  <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100/50 p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-lg">
                        <Crop className="h-7 w-7 text-white" />
                      </div>
                      <h4 className="text-xl font-clean-bold text-slate-900 mb-3">
                        Ângulo Perfeito
                      </h4>
                      <p className="text-slate-600 font-clean-medium leading-relaxed">
                        Posicione a câmera paralela ao documento, evitando distorções que podem afetar a análise da IA.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Professional Note */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/50 p-8 mb-8">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-slate-300/20 to-slate-400/20 rounded-full -translate-y-20 translate-x-20"></div>
                  <div className="relative flex items-start gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <AlertCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-clean-bold text-slate-900 mb-3">
                        Tecnologia de Precisão
                      </h4>
                      <p className="text-slate-600 font-clean-medium leading-relaxed text-lg">
                        Nossa IA utiliza algoritmos avançados de reconhecimento óptico. Quanto melhor a qualidade da imagem, 
                        maior será a precisão na identificação dos exames solicitados.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="text-center">
                  <Button
                    onClick={() => setCurrentStep('capture')}
                    className="group relative overflow-hidden bg-gradient-to-r from-brand-accent to-[#FF3D8F] hover:from-[#FF3D8F] hover:to-brand-accent text-white px-12 py-6 rounded-2xl text-lg font-clean-bold shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Iniciar Captura
                      <svg className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Button>
                </div>
              </div>
            </div>
          )}
          {/* STEP 2: Modern Capture Interface */}
          {currentStep === 'capture' && (
            <div className="p-8">
              <div className="max-w-4xl mx-auto">
                
                {/* Capture Options */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  
                  {/* Camera Capture */}
                  <div className="relative">
                    <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100/50 p-8 h-full">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <Camera className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-clean-bold text-slate-900 mb-2">
                          Câmera
                        </h3>
                        <p className="text-slate-600 font-clean-medium">
                          Capture diretamente com a câmera do seu dispositivo
                        </p>
                      </div>
                      
                      {!isCapturing ? (
                        <Button
                          onClick={startCamera}
                          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-4 rounded-2xl text-lg font-clean-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                          Abrir Câmera
                        </Button>
                      ) : (
                        <div className="space-y-4">
                          <div className="relative rounded-2xl overflow-hidden bg-black">
                            <video
                              ref={videoRef}
                              autoPlay
                              playsInline
                              className="w-full h-64 object-cover"
                            />
                            <div className="absolute inset-0 border-4 border-dashed border-white/50 rounded-2xl pointer-events-none"></div>
                          </div>
                          <div className="flex gap-3">
                            <Button
                              onClick={capturePhoto}
                              className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white py-3 rounded-xl font-clean-bold shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                              Capturar
                            </Button>
                            <Button
                              onClick={stopCamera}
                              className="px-6 bg-slate-200 hover:bg-slate-300 text-slate-700 py-3 rounded-xl font-clean-bold transition-all duration-300"
                            >
                              <RotateCcw className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* File Upload */}
                  <div className="relative">
                    <div className="rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100/50 p-8 h-full">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <Upload className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-clean-bold text-slate-900 mb-2">
                          Galeria
                        </h3>
                        <p className="text-slate-600 font-clean-medium">
                          Selecione uma foto da sua galeria
                        </p>
                      </div>
                      
                      {/* Modern Drop Zone */}
                      <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onClick={() => fileInputRef.current?.click()}
                        className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300 p-8 text-center ${
                          isDragOver
                            ? 'border-purple-400 bg-purple-100/50 scale-105'
                            : 'border-purple-200 hover:border-purple-300 hover:bg-purple-50/50'
                        }`}
                      >
                        <div className="space-y-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mx-auto transition-all duration-300 ${
                            isDragOver ? 'scale-110' : ''
                          }`}>
                            <ImageIcon className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-lg font-clean-bold text-slate-900 mb-1">
                              {isDragOver ? 'Solte aqui' : 'Clique ou arraste'}
                            </p>
                            <p className="text-sm text-slate-600 font-clean-medium">
                              Máximo 10MB • JPG, PNG, WEBP
                            </p>
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
                    </div>
                  </div>
                </div>

                {/* Professional Tips */}
                <div className="rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-200/50 p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                      <Lightbulb className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-clean-bold text-slate-900">
                      Dicas Rápidas
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="font-clean-medium">Boa iluminação</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="font-clean-medium">Texto nítido</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <span className="font-clean-medium">Documento completo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* STEP 3: Modern Processing */}
          {currentStep === 'processing' && (
            <div className="p-8 flex items-center justify-center min-h-[600px]">
              <div className="text-center max-w-lg">
                
                {/* Modern Loading Animation */}
                <div className="relative w-40 h-40 mx-auto mb-12">
                  {/* Outer Ring */}
                  <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
                  {/* Animated Ring */}
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-brand-accent border-r-[#FF3D8F] animate-spin"></div>
                  {/* Inner Glow */}
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-brand-accent/20 to-[#FF3D8F]/20 animate-pulse"></div>
                  {/* Center Icon */}
                  <div className="absolute inset-8 rounded-full bg-gradient-to-br from-brand-accent to-[#FF3D8F] flex items-center justify-center shadow-2xl">
                    <Zap className="h-12 w-12 text-white animate-pulse" />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-clean-bold text-slate-900 mb-3">
                      IA Analisando
                    </h3>
                    <p className="text-lg text-slate-600 font-clean-medium leading-relaxed">
                      Nossa inteligência artificial está processando sua receita com tecnologia de ponta
                    </p>
                  </div>
                  
                  {/* Processing Steps */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-3 text-slate-700">
                      <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></div>
                      <span className="font-clean-medium">Reconhecimento óptico de caracteres</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-slate-700">
                      <div className="w-2 h-2 rounded-full bg-[#FF3D8F] animate-pulse animation-delay-200"></div>
                      <span className="font-clean-medium">Identificação de medicamentos</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-slate-700">
                      <div className="w-2 h-2 rounded-full bg-[#A6C022] animate-pulse animation-delay-400"></div>
                      <span className="font-clean-medium">Validação de exames</span>
                    </div>
                  </div>
                </div>
                
                {uploadedImage && (
                  <div className="mt-12 rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50">
                    <img
                      src={uploadedImage}
                      alt="Receita em análise"
                      className="w-full h-64 object-contain bg-slate-50"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: Modern Confirmation */}
          {currentStep === 'confirmation' && (
            <div className="p-8">
              <div className="max-w-4xl mx-auto">
                
                {/* Success Header */}
                <div className="text-center mb-12">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/20 to-green-500/20 animate-ping"></div>
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-2xl">
                      <CheckCircle className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-clean-bold text-slate-900 mb-4">
                    Análise Concluída!
                  </h3>
                  <p className="text-lg text-slate-600 font-clean-medium">
                    Identificamos <span className="font-clean-bold text-brand-accent">{detectedExams.length} exames</span> na sua receita
                  </p>
                </div>

                {/* Modern Exams List */}
                <div className="mb-8">
                  <h4 className="text-2xl font-clean-bold text-slate-900 mb-6">
                    Exames Detectados
                  </h4>
                  <div className="space-y-4">
                    {detectedExams.map((exam, index) => (
                      <div
                        key={exam.id}
                        className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200/50 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-accent/5 to-[#FF3D8F]/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="relative flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-accent to-[#FF3D8F] flex items-center justify-center shadow-lg">
                              <span className="text-lg font-clean-bold text-white">
                                {index + 1}
                              </span>
                            </div>
                            <div>
                              <h5 className="text-lg font-clean-bold text-slate-900">
                                {exam.name}
                              </h5>
                              <p className="text-sm text-slate-600 font-clean-medium">
                                Exame laboratorial
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-clean-bold text-[#A6C022]">
                              R$ {exam.price.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Modern Total */}
                  <div className="mt-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/50 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                          <ShoppingCart className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-clean-bold text-slate-900">
                          Total do Pedido
                        </span>
                      </div>
                      <span className="text-3xl font-clean-bold text-brand-accent">
                        R$ {totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Modern Terms Agreement */}
                <div className="rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50 p-8 mb-8">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="w-6 h-6 rounded-lg border-2 border-amber-300 text-brand-accent focus:ring-2 focus:ring-brand-accent cursor-pointer"
                      />
                    </div>
                    <label htmlFor="terms" className="flex-1 cursor-pointer">
                      <h5 className="text-lg font-clean-bold text-slate-900 mb-2">
                        Confirmação de Responsabilidade
                      </h5>
                      <p className="text-slate-700 font-clean-medium leading-relaxed">
                        Confirmo que revisei todos os exames listados acima e que estão corretos conforme minha receita médica.
                      </p>
                    </label>
                  </div>
                  
                  {/* Terms Details */}
                  <div className="pl-12">
                    <button
                      onClick={() => setShowFullTerms(!showFullTerms)}
                      className="group flex items-center gap-2 text-brand-accent hover:text-[#FF3D8F] transition-colors font-clean-bold"
                    >
                      {showFullTerms ? 'Ocultar detalhes' : 'Ver detalhes completos'}
                      <svg 
                        className={`h-4 w-4 transition-transform duration-300 ${showFullTerms ? 'rotate-180' : ''} group-hover:scale-110`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {showFullTerms && (
                      <div className="mt-6 p-6 bg-white rounded-2xl border border-amber-200/50 shadow-lg">
                        <h6 className="text-base font-clean-bold text-slate-900 mb-4">
                          Termo de Responsabilidade Detalhado
                        </h6>
                        <div className="text-sm text-slate-600 font-clean-medium space-y-3 leading-relaxed">
                          <p>
                            Ao confirmar, você declara e concorda que:
                          </p>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>Revisou cuidadosamente todos os exames identificados pela IA e confirma que correspondem exatamente aos exames solicitados em sua receita médica.</li>
                            <li>Está ciente de que a tecnologia de IA, embora avançada, pode estar sujeita a erros de interpretação, especialmente em casos de caligrafia médica de difícil leitura.</li>
                            <li>Assume total responsabilidade pela conferência e validação dos exames listados antes de prosseguir com o agendamento.</li>
                            <li>Compromete-se a informar imediatamente o laboratório caso identifique qualquer divergência entre os exames listados e sua receita médica original.</li>
                            <li>Entende que exames incorretos, faltantes ou adicionais indevidamente podem resultar em custos adicionais ou necessidade de nova coleta.</li>
                            <li>Concorda em apresentar a receita médica original no momento da coleta para validação final pelo laboratório.</li>
                          </ul>
                          <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                            <p className="font-clean-bold text-slate-800">
                              O laboratório Anacli se reserva o direito de solicitar esclarecimentos ou recusar a realização de exames que não estejam claramente especificados na receita médica original.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Modern Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => setCurrentStep('capture')}
                    className="flex-1 h-16 text-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-clean-bold rounded-2xl transition-all duration-300 hover:scale-105 border border-slate-200"
                  >
                    <RotateCcw className="h-5 w-5 mr-3" />
                    Nova Captura
                  </Button>
                  <Button
                    onClick={handleAddToCart}
                    disabled={!agreedToTerms || isAddingToCart}
                    className={`flex-1 h-16 text-lg font-clean-bold rounded-2xl transition-all duration-300 ${
                      agreedToTerms && !isAddingToCart
                        ? 'bg-gradient-to-r from-brand-accent to-[#FF3D8F] hover:from-[#FF3D8F] hover:to-brand-accent text-white shadow-2xl hover:shadow-3xl hover:scale-105'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {isAddingToCart ? (
                      <>
                        <Loader2 className="h-6 w-6 mr-3 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-6 w-6 mr-3" />
                        Adicionar ao Carrinho
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Hidden Canvas for Camera Capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
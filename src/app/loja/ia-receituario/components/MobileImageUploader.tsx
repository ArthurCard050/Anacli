'use client';

import { useState, useRef, useCallback } from 'react';
import { Camera, Upload, CheckCircle, AlertCircle, Lightbulb, Image as ImageIcon, Loader2, ShoppingCart, X, RotateCcw, Zap, Smartphone, Images } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/app/loja/context/CartContext';
import '../styles/modern-uploader.css';

interface MobileImageUploaderProps {
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

export default function MobileImageUploader({ onClose }: MobileImageUploaderProps) {
  const { addItem } = useCart();
  const [currentStep, setCurrentStep] = useState<Step>('instructions');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [detectedExams, setDetectedExams] = useState<DetectedExam[]>([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showFullTerms, setShowFullTerms] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
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
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col">
      
      {/* Mobile Header */}
      <div className="bg-gradient-to-r from-brand-accent to-[#FF3D8F] p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <Smartphone className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-lg font-clean-bold">
              {currentStep === 'instructions' && 'IA Receituário'}
              {currentStep === 'capture' && 'Capturar Receita'}
              {currentStep === 'processing' && 'Processando'}
              {currentStep === 'confirmation' && 'Confirmar'}
            </h2>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="bg-white px-4 py-3 border-b">
        <div className="flex items-center gap-2">
          {['instructions', 'capture', 'processing', 'confirmation'].map((step, index) => (
            <div key={step} className="flex items-center flex-1">
              <div className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                index < ['instructions', 'capture', 'processing', 'confirmation'].indexOf(currentStep) + 1
                  ? 'bg-gradient-to-r from-brand-accent to-[#FF3D8F]'
                  : 'bg-slate-200'
              }`} />
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-white">
        
        {/* STEP 1: Mobile Instructions */}
        {currentStep === 'instructions' && (
          <div className="p-6">
            
            {/* Hero */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-accent to-[#FF3D8F] flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Zap className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-clean-bold text-slate-900 mb-3">
                Foto Perfeita da Receita
              </h3>
              <p className="text-base text-slate-600 font-clean-medium leading-relaxed">
                Nossa IA precisa de uma imagem nítida para identificar todos os exames
              </p>
            </div>

            {/* Mobile Tips */}
            <div className="space-y-4 mb-8">
              
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <ImageIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-clean-bold text-slate-900 mb-2">
                      Enquadramento Total
                    </h4>
                    <p className="text-sm text-slate-600 font-clean-medium leading-relaxed">
                      Capture toda a receita dentro do quadro, sem cortar nenhuma parte importante
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-clean-bold text-slate-900 mb-2">
                      Boa Iluminação
                    </h4>
                    <p className="text-sm text-slate-600 font-clean-medium leading-relaxed">
                      Use luz natural ou ambiente bem iluminado, evite sombras sobre o documento
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-clean-bold text-slate-900 mb-2">
                      Foco Nítido
                    </h4>
                    <p className="text-sm text-slate-600 font-clean-medium leading-relaxed">
                      Mantenha o celular estável e aguarde o foco automático para texto legível
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Note */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-600 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-base font-clean-bold text-slate-900 mb-2">
                    Dica Importante
                  </h4>
                  <p className="text-sm text-slate-600 font-clean-medium leading-relaxed">
                    Quanto melhor a qualidade da foto, mais precisa será a leitura da IA. 
                    Use a câmera em tela cheia para melhor visualização.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => setCurrentStep('capture')}
              className="w-full bg-gradient-to-r from-brand-accent to-[#FF3D8F] text-white py-4 rounded-2xl text-lg font-clean-bold shadow-lg"
            >
              Começar Captura
              <Camera className="h-5 w-5 ml-2" />
            </Button>
          </div>
        )}

        {/* STEP 2: Mobile Capture - Fullscreen Camera */}
        {currentStep === 'capture' && (
          <div className="flex-1 flex flex-col">
            
            {!isCapturing ? (
              // Capture Options
              <div className="flex-1 p-6 flex flex-col">
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-clean-bold text-slate-900 mb-3">
                    Como Capturar?
                  </h3>
                  <p className="text-base text-slate-600 font-clean-medium">
                    Escolha a melhor opção para sua receita
                  </p>
                </div>

                {/* Camera Option */}
                <div className="flex-1 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-3xl p-8 h-full flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 shadow-lg">
                      <Camera className="h-10 w-10 text-white" />
                    </div>
                    <h4 className="text-xl font-clean-bold text-slate-900 mb-3">
                      Tirar Foto Agora
                    </h4>
                    <p className="text-sm text-slate-600 font-clean-medium mb-6 leading-relaxed">
                      Abrir câmera em tela cheia para melhor enquadramento da receita
                    </p>
                    <Button
                      onClick={startCamera}
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-2xl font-clean-bold shadow-lg"
                    >
                      Abrir Câmera
                    </Button>
                  </div>
                </div>

                {/* Gallery Option */}
                <div className="mb-6">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-3xl p-8 text-center">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 mx-auto shadow-lg">
                      <Images className="h-10 w-10 text-white" />
                    </div>
                    <h4 className="text-xl font-clean-bold text-slate-900 mb-3">
                      Escolher da Galeria
                    </h4>
                    <p className="text-sm text-slate-600 font-clean-medium mb-6 leading-relaxed">
                      Selecionar uma foto já existente na galeria do seu celular
                    </p>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-clean-bold shadow-lg"
                    >
                      Abrir Galeria
                    </Button>
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

                {/* Quick Tips */}
                <div className="bg-slate-50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="h-4 w-4 text-slate-600" />
                    <span className="text-sm font-clean-bold text-slate-900">Dicas Rápidas</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1 text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      <span className="font-clean-medium">Boa luz</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      <span className="font-clean-medium">Texto nítido</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Fullscreen Camera
              <div className="flex-1 relative bg-black">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                
                {/* Camera Overlay */}
                <div className="absolute inset-0 flex flex-col">
                  
                  {/* Top Instructions */}
                  <div className="bg-black/50 text-white p-4 text-center">
                    <p className="text-sm font-clean-medium">
                      Posicione a receita dentro do quadro
                    </p>
                  </div>
                  
                  {/* Center Frame */}
                  <div className="flex-1 flex items-center justify-center p-8">
                    <div className="w-full max-w-sm aspect-[3/4] border-4 border-white border-dashed rounded-2xl relative">
                      {/* Corner indicators */}
                      <div className="absolute -top-2 -left-2 w-6 h-6 border-l-4 border-t-4 border-white rounded-tl-lg"></div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 border-r-4 border-t-4 border-white rounded-tr-lg"></div>
                      <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-4 border-b-4 border-white rounded-bl-lg"></div>
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-4 border-b-4 border-white rounded-br-lg"></div>
                    </div>
                  </div>
                  
                  {/* Bottom Controls */}
                  <div className="bg-black/50 p-6">
                    <div className="flex items-center justify-center gap-8">
                      <Button
                        onClick={stopCamera}
                        className="w-16 h-16 rounded-full bg-slate-600 hover:bg-slate-700 text-white p-0 shadow-lg"
                      >
                        <X className="h-6 w-6" />
                      </Button>
                      
                      <Button
                        onClick={capturePhoto}
                        className="w-20 h-20 rounded-full bg-white hover:bg-slate-100 text-slate-900 p-0 shadow-2xl border-4 border-white"
                      >
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-accent to-[#FF3D8F]"></div>
                      </Button>
                      
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-16 h-16 rounded-full bg-slate-600 hover:bg-slate-700 text-white p-0 shadow-lg"
                      >
                        <Images className="h-6 w-6" />
                      </Button>
                    </div>
                    
                    <p className="text-white text-center text-sm font-clean-medium mt-4">
                      Toque no botão central para capturar
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {/* STEP 3: Mobile Processing */}
        {currentStep === 'processing' && (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center max-w-sm">
              
              {/* Mobile Loading Animation */}
              <div className="relative w-32 h-32 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full border-3 border-slate-200"></div>
                <div className="absolute inset-0 rounded-full border-3 border-transparent border-t-brand-accent border-r-[#FF3D8F] animate-spin"></div>
                <div className="absolute inset-3 rounded-full bg-gradient-to-br from-brand-accent/20 to-[#FF3D8F]/20 animate-pulse"></div>
                <div className="absolute inset-6 rounded-full bg-gradient-to-br from-brand-accent to-[#FF3D8F] flex items-center justify-center shadow-xl">
                  <Zap className="h-8 w-8 text-white animate-pulse" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-clean-bold text-slate-900 mb-2">
                    IA Analisando
                  </h3>
                  <p className="text-base text-slate-600 font-clean-medium leading-relaxed">
                    Processando sua receita com tecnologia avançada
                  </p>
                </div>
                
                {/* Processing Steps */}
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-slate-700">
                    <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></div>
                    <span className="font-clean-medium text-sm">Lendo documento</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-slate-700">
                    <div className="w-2 h-2 rounded-full bg-[#FF3D8F] animate-pulse animation-delay-200"></div>
                    <span className="font-clean-medium text-sm">Identificando exames</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-slate-700">
                    <div className="w-2 h-2 rounded-full bg-[#A6C022] animate-pulse animation-delay-400"></div>
                    <span className="font-clean-medium text-sm">Validando resultados</span>
                  </div>
                </div>
              </div>
              
              {uploadedImage && (
                <div className="mt-8 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                  <img
                    src={uploadedImage}
                    alt="Receita em análise"
                    className="w-full h-48 object-contain bg-slate-50"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: Mobile Confirmation */}
        {currentStep === 'confirmation' && (
          <div className="p-6">
            
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/20 to-green-500/20 animate-ping"></div>
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-xl">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-clean-bold text-slate-900 mb-2">
                Análise Concluída!
              </h3>
              <p className="text-base text-slate-600 font-clean-medium">
                <span className="font-clean-bold text-brand-accent">{detectedExams.length} exames</span> identificados
              </p>
            </div>

            {/* Mobile Exams List */}
            <div className="mb-6">
              <h4 className="text-lg font-clean-bold text-slate-900 mb-4">
                Exames Detectados
              </h4>
              <div className="space-y-3">
                {detectedExams.map((exam, index) => (
                  <div
                    key={exam.id}
                    className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-accent to-[#FF3D8F] flex items-center justify-center">
                          <span className="text-sm font-clean-bold text-white">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <h5 className="text-base font-clean-bold text-slate-900">
                            {exam.name}
                          </h5>
                          <p className="text-xs text-slate-600 font-clean-medium">
                            Exame laboratorial
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-clean-bold text-[#A6C022]">
                          R$ {exam.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Mobile Total */}
              <div className="mt-4 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                      <ShoppingCart className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-lg font-clean-bold text-slate-900">
                      Total
                    </span>
                  </div>
                  <span className="text-2xl font-clean-bold text-brand-accent">
                    R$ {totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Terms Agreement */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-4 mb-4">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-2 border-amber-300 text-brand-accent focus:ring-2 focus:ring-brand-accent cursor-pointer"
                />
                <label htmlFor="terms" className="flex-1 cursor-pointer">
                  <h5 className="text-base font-clean-bold text-slate-900 mb-2">
                    Confirmação de Responsabilidade
                  </h5>
                  <p className="text-sm text-slate-700 font-clean-medium leading-relaxed">
                    Confirmo que revisei todos os exames e estão corretos conforme minha receita médica.
                  </p>
                </label>
              </div>
              
              <button
                onClick={() => setShowFullTerms(!showFullTerms)}
                className="text-sm font-clean-bold text-brand-accent hover:text-[#FF3D8F] transition-colors flex items-center gap-1"
              >
                {showFullTerms ? 'Ocultar detalhes' : 'Ver detalhes'}
                <svg 
                  className={`h-3 w-3 transition-transform duration-200 ${showFullTerms ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showFullTerms && (
                <div className="mt-4 p-4 bg-white rounded-xl border border-amber-200">
                  <div className="text-xs text-slate-600 font-clean-medium space-y-2 leading-relaxed">
                    <p>Ao confirmar, você declara que:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Revisou todos os exames identificados pela IA</li>
                      <li>Confirma que correspondem à sua receita médica</li>
                      <li>Assume responsabilidade pela conferência</li>
                      <li>Apresentará a receita original na coleta</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={() => setCurrentStep('capture')}
                className="w-full h-12 bg-slate-100 hover:bg-slate-200 text-slate-700 font-clean-bold rounded-xl transition-colors"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Nova Captura
              </Button>
              <Button
                onClick={handleAddToCart}
                disabled={!agreedToTerms || isAddingToCart}
                className={`w-full h-12 font-clean-bold rounded-xl transition-all duration-300 ${
                  agreedToTerms && !isAddingToCart
                    ? 'bg-gradient-to-r from-brand-accent to-[#FF3D8F] text-white shadow-lg'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isAddingToCart ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Adicionando...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Adicionar ao Carrinho
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Hidden Canvas for Camera Capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
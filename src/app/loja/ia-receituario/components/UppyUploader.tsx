'use client';

import { useState } from 'react';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/react/dashboard';
import Webcam from '@uppy/webcam';
import { Camera, Upload, CheckCircle, AlertCircle, Lightbulb, Image as ImageIcon, Loader2, ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/app/loja/context/CartContext';

import '@uppy/core/css/style.min.css';
import '@uppy/dashboard/css/style.min.css';
import '@uppy/webcam/css/style.min.css';

interface UppyUploaderProps {
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

function createUppy(onFileSelected: (file: File) => void) {
  const uppy = new Uppy({
    restrictions: {
      maxNumberOfFiles: 1,
      allowedFileTypes: ['image/*'],
      maxFileSize: 10 * 1024 * 1024,
    },
    autoProceed: false,
  });

  uppy.use(Webcam, {
    modes: ['picture'],
    mirror: false,
  });

  uppy.on('complete', (result) => {
    if (result.successful && result.successful.length > 0) {
      const file = result.successful[0];
      if (file.data instanceof Blob) {
        const fileObj = new File([file.data], file.name || 'receita.jpg', { 
          type: file.type || 'image/jpeg' 
        });
        onFileSelected(fileObj);
      }
    }
  });

  return uppy;
}

export default function UppyUploader({ onClose, onFileSelected }: UppyUploaderProps) {
  const { addItem } = useCart();
  const [currentStep, setCurrentStep] = useState<Step>('instructions');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [detectedExams, setDetectedExams] = useState<DetectedExam[]>([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showFullTerms, setShowFullTerms] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const [uppy] = useState(() => createUppy((file: File) => {
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
  }));

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
    <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header com progresso */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex-1">
            <h2 className="text-2xl font-clean-bold text-text-primary-clean">
              {currentStep === 'instructions' && 'Instruções'}
              {currentStep === 'capture' && 'Capturar Receita'}
              {currentStep === 'processing' && 'Processando...'}
              {currentStep === 'confirmation' && 'Confirmar Exames'}
            </h2>
            
            {/* Progress bar */}
            <div className="flex items-center gap-2 mt-3">
              <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                currentStep === 'instructions' ? 'bg-brand-accent' : 'bg-[#A6C022]'
              }`} />
              <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                currentStep === 'capture' || currentStep === 'processing' || currentStep === 'confirmation' 
                  ? 'bg-brand-accent' 
                  : 'bg-slate-200'
              }`} />
              <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                currentStep === 'processing' || currentStep === 'confirmation'
                  ? 'bg-brand-accent' 
                  : 'bg-slate-200'
              }`} />
              <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                currentStep === 'confirmation' ? 'bg-[#A6C022]' : 'bg-slate-200'
              }`} />
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-3 hover:bg-slate-100 rounded-2xl transition-colors ml-4"
          >
            <X className="h-6 w-6 text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          
          {/* STEP 1: Instructions */}
          {currentStep === 'instructions' && (
            <div className="p-8">
              <div className="max-w-2xl mx-auto">
                
                {/* Intro */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-accent to-[#FF3D8F] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-accent/20">
                    <Lightbulb className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-clean-bold text-text-primary-clean mb-3">
                    Como Tirar uma Boa Foto da Receita
                  </h3>
                  <p className="text-base text-text-secondary-clean font-clean-medium">
                    Siga estas orientações para garantir que nossa IA consiga ler todos os exames corretamente
                  </p>
                </div>

                {/* Tips Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  
                  {/* Tip 1 */}
                  <div className="card-clean p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                      <ImageIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-clean-bold text-text-primary-clean mb-2">
                      Enquadramento Perfeito
                    </h4>
                    <p className="text-sm text-text-secondary-clean font-clean-medium leading-relaxed">
                      Capture toda a receita dentro do quadro. Certifique-se de que nenhuma parte do texto fique cortada nas bordas.
                    </p>
                  </div>

                  {/* Tip 2 */}
                  <div className="card-clean p-6 bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-100">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                      <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-clean-bold text-text-primary-clean mb-2">
                      Iluminação Adequada
                    </h4>
                    <p className="text-sm text-text-secondary-clean font-clean-medium leading-relaxed">
                      Use luz natural ou ambiente bem iluminado. Evite sombras sobre o documento e reflexos de luz direta.
                    </p>
                  </div>

                  {/* Tip 3 */}
                  <div className="card-clean p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
                    <div className="w-12 h-12 rounded-xl bg-[#A6C022]/10 flex items-center justify-center mb-4">
                      <svg className="h-6 w-6 text-[#A6C022]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-clean-bold text-text-primary-clean mb-2">
                      Foco e Nitidez
                    </h4>
                    <p className="text-sm text-text-secondary-clean font-clean-medium leading-relaxed">
                      Mantenha a câmera estável e aguarde o foco automático. O texto deve estar nítido e legível.
                    </p>
                  </div>

                  {/* Tip 4 */}
                  <div className="card-clean p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                      <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-clean-bold text-text-primary-clean mb-2">
                      Ângulo Correto
                    </h4>
                    <p className="text-sm text-text-secondary-clean font-clean-medium leading-relaxed">
                      Posicione a câmera paralela ao documento, evitando ângulos inclinados que distorcem o texto.
                    </p>
                  </div>
                </div>

                {/* Important Note */}
                <div className="card-clean p-6 bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                      <h4 className="text-base font-clean-bold text-text-primary-clean mb-2">
                        Importante
                      </h4>
                      <p className="text-sm text-text-secondary-clean font-clean-medium leading-relaxed">
                        Quanto melhor a qualidade da foto, mais precisa será a leitura da IA. Tire um momento para garantir que a imagem está perfeita antes de enviar.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => setCurrentStep('capture')}
                  className="w-full btn-primary-clean h-14 text-lg hover:scale-[1.02] transition-transform duration-300 shadow-lg"
                >
                  Entendi, Vamos Começar
                  <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Capture */}
          {currentStep === 'capture' && (
            <div className="p-6">
              <Dashboard 
                uppy={uppy}
                plugins={['Webcam']}
                proudlyDisplayPoweredByUppy={false}
                height={500}
                theme="light"
                note="Apenas imagens até 10MB"
                locale={{
                  strings: {
                    dropPasteImportBoth: 'Arraste a foto aqui, %{browseFiles} ou tire uma foto',
                    dropPasteImportFiles: 'Arraste a foto aqui ou %{browseFiles}',
                    browseFiles: 'selecione do dispositivo',
                    dropHint: 'Solte a foto aqui',
                  },
                }}
              />
            </div>
          )}

          {/* STEP 3: Processing */}
          {currentStep === 'processing' && (
            <div className="p-8 flex items-center justify-center min-h-[500px]">
              <div className="text-center max-w-md">
                <div className="relative w-32 h-32 mx-auto mb-8">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-accent to-[#FF3D8F] opacity-20 animate-ping"></div>
                  <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-brand-accent to-[#FF3D8F] flex items-center justify-center">
                    <Loader2 className="h-16 w-16 text-white animate-spin" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-clean-bold text-text-primary-clean mb-3">
                  Analisando sua Receita
                </h3>
                <p className="text-base text-text-secondary-clean font-clean-medium mb-6">
                  Nossa IA está identificando todos os exames solicitados. Isso leva apenas alguns segundos...
                </p>
                
                {uploadedImage && (
                  <div className="card-clean p-4 bg-slate-50">
                    <img
                      src={uploadedImage}
                      alt="Receita"
                      className="w-full h-48 object-contain rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: Confirmation */}
          {currentStep === 'confirmation' && (
            <div className="p-8">
              <div className="max-w-3xl mx-auto">
                
                {/* Success Message */}
                <div className="card-clean p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#A6C022] flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-clean-bold text-text-primary-clean mb-1">
                        Análise Concluída!
                      </h3>
                      <p className="text-sm text-text-secondary-clean font-clean-medium">
                        Identificamos {detectedExams.length} exames na sua receita
                      </p>
                    </div>
                  </div>
                </div>

                {/* Detected Exams List */}
                <div className="mb-6">
                  <h4 className="text-lg font-clean-bold text-text-primary-clean mb-4">
                    Exames Detectados
                  </h4>
                  <div className="space-y-3">
                    {detectedExams.map((exam, index) => (
                      <div
                        key={exam.id}
                        className="card-clean p-4 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center">
                              <span className="text-sm font-clean-bold text-brand-accent">
                                {index + 1}
                              </span>
                            </div>
                            <span className="text-base font-clean-semibold text-text-primary-clean">
                              {exam.name}
                            </span>
                          </div>
                          <span className="text-lg font-clean-bold text-[#A6C022]">
                            R$ {exam.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Total */}
                  <div className="card-clean p-4 bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-clean-bold text-text-primary-clean">
                        Total
                      </span>
                      <span className="text-2xl font-clean-bold text-brand-accent">
                        R$ {totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="card-clean p-6 bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 mb-6">
                  <div className="flex items-start gap-4 mb-4">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-2 border-amber-300 text-brand-accent focus:ring-2 focus:ring-brand-accent cursor-pointer"
                    />
                    <label htmlFor="terms" className="flex-1 cursor-pointer">
                      <p className="text-sm font-clean-semibold text-text-primary-clean leading-relaxed">
                        Confirmo que revisei todos os exames listados acima e que estão corretos conforme minha receita médica.
                      </p>
                    </label>
                  </div>
                  
                  {/* Terms Details */}
                  <div className="pl-9">
                    <button
                      onClick={() => setShowFullTerms(!showFullTerms)}
                      className="text-sm font-clean-semibold text-brand-accent hover:text-[#FF3D8F] transition-colors flex items-center gap-1"
                    >
                      {showFullTerms ? 'Ler menos' : 'Ler mais'}
                      <svg 
                        className={`h-4 w-4 transition-transform duration-200 ${showFullTerms ? 'rotate-180' : ''}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {showFullTerms && (
                      <div className="mt-4 p-4 bg-white rounded-xl border border-amber-200">
                        <h5 className="text-sm font-clean-bold text-text-primary-clean mb-3">
                          Termo de Responsabilidade
                        </h5>
                        <div className="text-xs text-text-secondary-clean font-clean-medium space-y-2 leading-relaxed">
                          <p>
                            Ao marcar esta opção, você declara e concorda que:
                          </p>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Revisou cuidadosamente todos os exames identificados pela IA e confirma que correspondem exatamente aos exames solicitados em sua receita médica.</li>
                            <li>Está ciente de que a tecnologia de IA, embora avançada, pode estar sujeita a erros de interpretação, especialmente em casos de caligrafia médica de difícil leitura.</li>
                            <li>Assume total responsabilidade pela conferência e validação dos exames listados antes de prosseguir com o agendamento.</li>
                            <li>Compromete-se a informar imediatamente o laboratório caso identifique qualquer divergência entre os exames listados e sua receita médica original.</li>
                            <li>Entende que exames incorretos, faltantes ou adicionais indevidamente podem resultar em custos adicionais ou necessidade de nova coleta.</li>
                            <li>Concorda em apresentar a receita médica original no momento da coleta para validação final pelo laboratório.</li>
                          </ul>
                          <p className="pt-2 font-clean-semibold">
                            O laboratório Anacli se reserva o direito de solicitar esclarecimentos ou recusar a realização de exames que não estejam claramente especificados na receita médica original.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    onClick={() => setCurrentStep('capture')}
                    className="flex-1 h-14 text-base bg-slate-100 text-slate-700 hover:bg-slate-200 font-clean-bold rounded-xl transition-colors"
                  >
                    Tirar Nova Foto
                  </Button>
                  <Button
                    onClick={handleAddToCart}
                    disabled={!agreedToTerms || isAddingToCart}
                    className={`flex-1 h-14 text-base font-clean-bold rounded-xl transition-all duration-300 ${
                      agreedToTerms && !isAddingToCart
                        ? 'btn-primary-clean hover:scale-[1.02] shadow-lg'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {isAddingToCart ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Adicionando...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Adicionar ao Carrinho
                      </>
                    )}
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

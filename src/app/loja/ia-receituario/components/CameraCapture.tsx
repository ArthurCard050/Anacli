'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Camera, Upload, RotateCcw, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CameraCaptureProps {
  onClose: () => void;
}

export default function CameraCapture({ onClose }: CameraCaptureProps) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedExams, setDetectedExams] = useState<string[]>([]);
  const [useCamera, setUseCamera] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Iniciar câmera
  useEffect(() => {
    if (useCamera && !capturedImage) {
      startCamera();
    }

    return () => {
      stopCamera();
    };
  }, [useCamera, capturedImage]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Câmera traseira no mobile
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Erro ao acessar câmera:', error);
      alert('Não foi possível acessar a câmera. Por favor, verifique as permissões.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg', 0.9);
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
        setUseCamera(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setDetectedExams([]);
    if (useCamera) {
      startCamera();
    }
  };

  const processImage = async () => {
    setIsProcessing(true);
    
    // Simulação de processamento de IA (substituir por API real)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Exames simulados detectados
    const mockExams = [
      'Hemograma Completo',
      'Glicemia de Jejum',
      'Colesterol Total e Frações',
      'TSH - Hormônio da Tireoide',
      'Ureia e Creatinina'
    ];
    
    setDetectedExams(mockExams);
    setIsProcessing(false);
  };

  const addToCart = () => {
    // Adicionar exames ao carrinho
    alert(`${detectedExams.length} exames adicionados ao carrinho!`);
    onClose();
  };

  return (
    <div className="camera-modal fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass-effect bg-white/95 backdrop-blur-md rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-slate-200/50">
          <h2 className="text-2xl font-bold text-slate-900">
            {capturedImage ? 'Revisar Imagem' : 'Capturar Receituário'}
          </h2>
          <button
            onClick={onClose}
            className="p-3 hover:bg-slate-100/50 rounded-2xl transition-colors"
          >
            <X className="h-6 w-6 text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {!capturedImage ? (
            <>
              {/* Camera/Upload Toggle */}
              <div className="flex gap-4 mb-8">
                <Button
                  onClick={() => setUseCamera(true)}
                  variant={useCamera ? 'default' : 'outline'}
                  className={`flex-1 h-14 text-lg font-medium rounded-2xl transition-all duration-300 ${
                    useCamera 
                      ? 'bg-primary hover:bg-primary-dark text-white shadow-lg' 
                      : 'border-2 border-primary hover:border-primary hover:bg-primary/10 text-primary'
                  }`}
                >
                  <Camera className="mr-2 h-5 w-5" />
                  Usar Câmera
                </Button>
                <Button
                  onClick={() => {
                    setUseCamera(false);
                    fileInputRef.current?.click();
                  }}
                  variant={!useCamera ? 'default' : 'outline'}
                  className={`flex-1 h-14 text-lg font-medium rounded-2xl transition-all duration-300 ${
                    !useCamera 
                      ? 'bg-primary hover:bg-primary-dark text-white shadow-lg' 
                      : 'border-2 border-primary hover:border-primary hover:bg-primary/10 text-primary'
                  }`}
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Enviar Imagem
                </Button>
              </div>

              {/* Camera Preview */}
              {useCamera && (
                <div className="relative bg-slate-900 rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay com guia de enquadramento */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="border-4 border-white/60 rounded-3xl w-[80%] h-[70%] relative">
                      {/* Cantos decorativos */}
                      <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-accent rounded-tl-3xl"></div>
                      <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-accent rounded-tr-3xl"></div>
                      <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-accent rounded-bl-3xl"></div>
                      <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-accent rounded-br-3xl"></div>
                      
                      {/* Texto de instrução */}
                      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm text-white px-6 py-3 rounded-2xl text-sm whitespace-nowrap border border-white/20">
                        Posicione o receituário dentro do quadro
                      </div>
                    </div>
                  </div>

                  {/* Botão de captura */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                    <button
                      onClick={capturePhoto}
                      className="h-20 w-20 rounded-full bg-white/90 backdrop-blur-sm border-4 border-accent shadow-2xl hover:scale-110 transition-all duration-300 hover:border-primary"
                    >
                      <div className="h-full w-full rounded-full bg-accent shadow-inner"></div>
                    </button>
                  </div>
                </div>
              )}

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </>
          ) : (
            <>
              {/* Captured Image Preview */}
              <div className="mb-8">
                <img
                  src={capturedImage}
                  alt="Receituário capturado"
                  className="w-full rounded-2xl border-2 border-slate-200 shadow-lg"
                />
              </div>

              {/* Processing or Results */}
              {isProcessing ? (
                <div className="text-center py-16 bg-primary/5 rounded-2xl border border-primary/10">
                  <Loader2 className="h-16 w-16 text-primary animate-spin mx-auto mb-6" />
                  <p className="text-xl font-semibold text-slate-900 mb-3">Processando imagem...</p>
                  <p className="text-slate-600 text-lg">Nossa IA está identificando os exames</p>
                </div>
              ) : detectedExams.length > 0 ? (
                <div className="bg-primary/5 border-2 border-primary/20 rounded-2xl p-8 mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center">
                      <Check className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      {detectedExams.length} exames identificados
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {detectedExams.map((exam, index) => (
                      <li key={index} className="flex items-center gap-3 text-slate-700 text-lg">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        {exam}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* Action Buttons */}
              <div className="flex gap-6">
                <Button
                  onClick={retakePhoto}
                  variant="outline"
                  className="flex-1 h-14 text-lg font-medium border-2 border-slate-300 hover:border-primary hover:bg-primary/10 text-slate-700 hover:text-primary rounded-2xl transition-all duration-300"
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Tirar Outra Foto
                </Button>
                
                {detectedExams.length > 0 ? (
                  <Button
                    onClick={addToCart}
                    className="flex-1 h-14 text-lg font-medium bg-accent hover:bg-accent/90 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Check className="mr-2 h-5 w-5" />
                    Adicionar ao Carrinho
                  </Button>
                ) : (
                  <Button
                    onClick={processImage}
                    className="flex-1 h-14 text-lg font-medium bg-primary hover:bg-primary-dark text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isProcessing}
                  >
                    <Camera className="mr-2 h-5 w-5" />
                    Processar Imagem
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}

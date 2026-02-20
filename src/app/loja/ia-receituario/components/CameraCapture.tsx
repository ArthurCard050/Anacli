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
    <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {capturedImage ? 'Revisar Imagem' : 'Capturar Receituário'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!capturedImage ? (
            <>
              {/* Camera/Upload Toggle */}
              <div className="flex gap-4 mb-6">
                <Button
                  onClick={() => setUseCamera(true)}
                  variant={useCamera ? 'default' : 'outline'}
                  className="flex-1"
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
                  className="flex-1"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Enviar Arquivo
                </Button>
              </div>

              {/* Camera Preview */}
              {useCamera && (
                <div className="relative bg-black rounded-xl overflow-hidden aspect-[4/3]">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay com guia de enquadramento */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="border-4 border-white/50 rounded-2xl w-[80%] h-[70%] relative">
                      {/* Cantos decorativos */}
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-accent rounded-tl-2xl"></div>
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-accent rounded-tr-2xl"></div>
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-accent rounded-bl-2xl"></div>
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-accent rounded-br-2xl"></div>
                      
                      {/* Texto de instrução */}
                      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm whitespace-nowrap">
                        Posicione o receituário dentro do quadro
                      </div>
                    </div>
                  </div>

                  {/* Botão de captura */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                    <button
                      onClick={capturePhoto}
                      className="h-16 w-16 rounded-full bg-white border-4 border-accent shadow-lg hover:scale-110 transition-transform"
                    >
                      <div className="h-full w-full rounded-full bg-accent"></div>
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
              <div className="mb-6">
                <img
                  src={capturedImage}
                  alt="Receituário capturado"
                  className="w-full rounded-xl border-2 border-gray-200"
                />
              </div>

              {/* Processing or Results */}
              {isProcessing ? (
                <div className="text-center py-12">
                  <Loader2 className="h-12 w-12 text-accent animate-spin mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-900 mb-2">Processando imagem...</p>
                  <p className="text-gray-600">Nossa IA está identificando os exames</p>
                </div>
              ) : detectedExams.length > 0 ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Check className="h-6 w-6 text-green-600" />
                    <h3 className="text-xl font-bold text-gray-900">
                      {detectedExams.length} exames identificados
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {detectedExams.map((exam, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700">
                        <Check className="h-4 w-4 text-green-600" />
                        {exam}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={retakePhoto}
                  variant="outline"
                  className="flex-1"
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Tirar Outra Foto
                </Button>
                
                {detectedExams.length > 0 ? (
                  <Button
                    onClick={addToCart}
                    className="flex-1 bg-accent hover:bg-accent/90"
                  >
                    <Check className="mr-2 h-5 w-5" />
                    Adicionar ao Carrinho
                  </Button>
                ) : (
                  <Button
                    onClick={processImage}
                    className="flex-1 bg-accent hover:bg-accent/90"
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

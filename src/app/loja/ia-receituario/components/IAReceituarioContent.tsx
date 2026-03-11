'use client';

import { useState } from 'react';
import { Sparkles, Camera, Upload, CheckCircle, Zap, Shield, Clock, Brain, Scan } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CameraCapture from './CameraCapture';

export default function IAReceituarioContent() {
  const [showCamera, setShowCamera] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full mb-8 border border-primary/20 backdrop-blur-sm">
              <Brain className="h-5 w-5" />
              <span className="font-medium">Inteligência Artificial Avançada</span>
            </div>

            {/* Título */}
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 leading-tight">
              Leitura Inteligente de
              <span className="block text-accent">
                Receituário Médico
              </span>
            </h1>

            {/* Descrição */}
            <p className="text-xl md:text-2xl text-slate-600 mb-16 max-w-4xl mx-auto leading-relaxed">
              Nossa IA identifica automaticamente todos os exames do seu receituário em segundos. 
              Tecnologia de ponta para máxima precisão e agilidade.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
              <Button
                size="lg"
                onClick={() => setShowCamera(true)}
                className="h-16 px-10 text-lg font-semibold bg-primary hover:bg-primary-dark text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-2xl"
              >
                <Camera className="mr-3 h-6 w-6" />
                Fotografar Receituário
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setShowCamera(true)}
                className="h-16 px-10 text-lg font-semibold border-2 border-accent hover:border-accent hover:bg-accent/10 text-accent hover:text-accent transition-all duration-300 rounded-2xl backdrop-blur-sm"
              >
                <Upload className="mr-3 h-6 w-6" />
                Enviar Imagem
              </Button>
            </div>

            {/* Benefícios */}
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="benefit-card group flex flex-col items-center text-center p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
                <div className="icon-hover h-20 w-20 rounded-2xl bg-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Resultado Instantâneo</h3>
                <p className="text-slate-600 leading-relaxed">Processamento em tempo real com tecnologia de IA avançada</p>
              </div>

              <div className="benefit-card group flex flex-col items-center text-center p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
                <div className="icon-hover h-20 w-20 rounded-2xl bg-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Scan className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Precisão Máxima</h3>
                <p className="text-slate-600 leading-relaxed">Reconhecimento óptico de caracteres com 99.9% de acurácia</p>
              </div>

              <div className="benefit-card group flex flex-col items-center text-center p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
                <div className="icon-hover h-20 w-20 rounded-2xl bg-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Segurança Total</h3>
                <p className="text-slate-600 leading-relaxed">Criptografia de ponta a ponta para proteção dos seus dados</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Como Funciona?
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Processo simples e intuitivo em apenas 3 passos
              </p>
            </div>

            <div className="space-y-12">
              {/* Passo 1 */}
              <div className="flex gap-8 items-start group">
                <div className="flex-shrink-0 h-16 w-16 rounded-2xl bg-primary text-white flex items-center justify-center text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Capture ou envie sua imagem</h3>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Use a câmera do seu dispositivo ou faça upload de uma foto do seu receituário médico. 
                    Suportamos formatos JPG, PNG e PDF com qualidade otimizada.
                  </p>
                </div>
              </div>

              {/* Passo 2 */}
              <div className="flex gap-8 items-start group">
                <div className="flex-shrink-0 h-16 w-16 rounded-2xl bg-accent text-white flex items-center justify-center text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">IA processa automaticamente</h3>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Nossa inteligência artificial de última geração analisa e identifica todos os exames solicitados 
                    com precisão médica em segundos.
                  </p>
                </div>
              </div>

              {/* Passo 3 */}
              <div className="flex gap-8 items-start group">
                <div className="flex-shrink-0 h-16 w-16 rounded-2xl bg-secondary text-white flex items-center justify-center text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Revise e finalize</h3>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Confira os exames identificados, faça ajustes se necessário e adicione todos ao carrinho 
                    com um único clique para agendar.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Final */}
            <div className="mt-16 text-center">
              <Button
                size="lg"
                onClick={() => setShowCamera(true)}
                className="h-16 px-12 text-lg font-semibold bg-primary hover:bg-primary-dark text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-2xl"
              >
                <Sparkles className="mr-3 h-6 w-6" />
                Começar Agora
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Camera Modal */}
      {showCamera && (
        <CameraCapture onClose={() => setShowCamera(false)} />
      )}
    </div>
  );
}

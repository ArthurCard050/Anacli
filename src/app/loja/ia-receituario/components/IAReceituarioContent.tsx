'use client';

import { useState } from 'react';
import { Sparkles, Camera, Upload, CheckCircle, Zap, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CameraCapture from './CameraCapture';

export default function IAReceituarioContent() {
  const [showCamera, setShowCamera] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-5 w-5" />
              <span className="font-semibold">Tecnologia de Inteligência Artificial</span>
            </div>

            {/* Título */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Leitura Automática de
              <span className="block text-accent">Receituário Médico</span>
            </h1>

            {/* Descrição */}
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Nossa IA identifica automaticamente todos os exames do seu receituário em segundos. 
              Rápido, preciso e sem erros de digitação.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                size="lg"
                onClick={() => setShowCamera(true)}
                className="h-16 px-8 text-lg font-semibold bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <Camera className="mr-2 h-6 w-6" />
                Tirar Foto do Receituário
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setShowCamera(true)}
                className="h-16 px-8 text-lg font-semibold border-2 hover:bg-gray-50"
              >
                <Upload className="mr-2 h-6 w-6" />
                Enviar Arquivo
              </Button>
            </div>

            {/* Benefícios */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm">
                <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Zap className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Resultado em Segundos</h3>
                <p className="text-gray-600">Nossa IA processa seu receituário instantaneamente</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">100% Preciso</h3>
                <p className="text-gray-600">Tecnologia avançada de reconhecimento de texto</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm">
                <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Dados Seguros</h3>
                <p className="text-gray-600">Suas informações são protegidas e criptografadas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Como Funciona?
            </h2>

            <div className="space-y-8">
              {/* Passo 1 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-accent text-white flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Tire uma foto ou envie o arquivo</h3>
                  <p className="text-gray-600 text-lg">
                    Use a câmera do seu celular ou faça upload de uma foto do seu receituário médico. 
                    Aceita formatos JPG, PNG e PDF.
                  </p>
                </div>
              </div>

              {/* Passo 2 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-accent text-white flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Nossa IA processa automaticamente</h3>
                  <p className="text-gray-600 text-lg">
                    Em poucos segundos, nossa inteligência artificial identifica todos os exames solicitados 
                    pelo seu médico com precisão.
                  </p>
                </div>
              </div>

              {/* Passo 3 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-accent text-white flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Revise e adicione ao carrinho</h3>
                  <p className="text-gray-600 text-lg">
                    Confira os exames identificados, ajuste se necessário e adicione todos ao carrinho 
                    com um único clique.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Final */}
            <div className="mt-12 text-center">
              <Button
                size="lg"
                onClick={() => setShowCamera(true)}
                className="h-16 px-12 text-lg font-semibold bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <Sparkles className="mr-2 h-6 w-6" />
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

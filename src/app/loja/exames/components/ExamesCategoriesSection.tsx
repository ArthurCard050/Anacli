'use client';

import { Droplet, Activity, Heart, Brain, Eye, Stethoscope, TestTube, Microscope } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ExamesCategoriesSection() {
  const categories = [
    {
      name: 'Exames de Sangue',
      icon: Droplet,
      color: 'text-accent',
      bgColor: 'bg-accent/5',
      borderColor: 'border-accent/20',
      hoverColor: 'hover:bg-accent/10',
      count: 85,
      description: 'Hemograma, glicemia, colesterol e mais',
      popular: ['Hemograma Completo', 'Glicemia', 'Colesterol Total', 'TSH']
    },
    {
      name: 'Exames de Imagem',
      icon: Activity,
      color: 'text-primary',
      bgColor: 'bg-primary/5',
      borderColor: 'border-primary/20',
      hoverColor: 'hover:bg-primary/10',
      count: 32,
      description: 'Ultrassom, raio-x, tomografia',
      popular: ['Ultrassom Abdominal', 'Raio-X Tórax', 'Ecocardiograma']
    },
    {
      name: 'Cardiologia',
      icon: Heart,
      color: 'text-accent',
      bgColor: 'bg-accent/5',
      borderColor: 'border-accent/20',
      hoverColor: 'hover:bg-accent/10',
      count: 18,
      description: 'ECG, holter, teste ergométrico',
      popular: ['Eletrocardiograma', 'Holter 24h', 'Teste Ergométrico']
    },
    {
      name: 'Neurologia',
      icon: Brain,
      color: 'text-primary',
      bgColor: 'bg-primary/5',
      borderColor: 'border-primary/20',
      hoverColor: 'hover:bg-primary/10',
      count: 12,
      description: 'EEG, doppler cerebral',
      popular: ['Eletroencefalograma', 'Doppler Cerebral']
    },
    {
      name: 'Oftalmologia',
      icon: Eye,
      color: 'text-accent',
      bgColor: 'bg-accent/5',
      borderColor: 'border-accent/20',
      hoverColor: 'hover:bg-accent/10',
      count: 15,
      description: 'Acuidade visual, fundo de olho',
      popular: ['Acuidade Visual', 'Tonometria', 'Fundo de Olho']
    },
    {
      name: 'Check-ups',
      icon: Stethoscope,
      color: 'text-primary',
      bgColor: 'bg-primary/5',
      borderColor: 'border-primary/20',
      hoverColor: 'hover:bg-primary/10',
      count: 8,
      description: 'Pacotes completos de prevenção',
      popular: ['Check-up Básico', 'Check-up Premium', 'Check-up Executivo']
    },
    {
      name: 'Exames de Urina',
      icon: TestTube,
      color: 'text-accent',
      bgColor: 'bg-accent/5',
      borderColor: 'border-accent/20',
      hoverColor: 'hover:bg-accent/10',
      count: 22,
      description: 'Urina tipo I, urocultura',
      popular: ['Urina Tipo I', 'Urocultura', 'Microalbuminúria']
    },
    {
      name: 'Microbiologia',
      icon: Microscope,
      color: 'text-primary',
      bgColor: 'bg-primary/5',
      borderColor: 'border-primary/20',
      hoverColor: 'hover:bg-primary/10',
      count: 28,
      description: 'Culturas, antibiogramas',
      popular: ['Cultura de Urina', 'Cultura de Fezes', 'Antibiograma']
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Categorias de Exames
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encontre rapidamente o exame que você precisa navegando por nossas categorias especializadas
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className={`group category-card category-hover-effect ${category.bgColor} ${category.borderColor} border-2 rounded-2xl p-6 ${category.hoverColor} transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow`}>
                  <category.icon className={`h-6 w-6 ${category.color}`} />
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${category.color}`}>{category.count}</div>
                  <div className="text-xs text-gray-600">exames</div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="font-bold text-gray-900 text-lg group-hover:text-gray-800 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {category.description}
                </p>

                {/* Popular Exams */}
                <div className="space-y-2">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Mais procurados:
                  </div>
                  <div className="space-y-1">
                    {category.popular.slice(0, 3).map((exam, examIndex) => (
                      <div key={examIndex} className="text-xs text-gray-700 flex items-center gap-1">
                        <div className={`w-1 h-1 rounded-full ${
                          category.color === 'text-primary' ? 'bg-primary' : 'bg-accent'
                        }`}></div>
                        {exam}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action */}
                <Button
                  variant="ghost"
                  size="sm"
                  className={`w-full mt-4 ${category.color} hover:bg-white/70 font-medium`}
                >
                  Ver todos os exames
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Microscope className="h-4 w-4" />
              Não encontrou o que procura?
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Temos mais de 200 tipos de exames disponíveis
            </h3>
            
            <p className="text-lg text-gray-600 mb-8">
              Nossa equipe especializada pode ajudar você a encontrar exames específicos ou esclarecer dúvidas sobre preparos e procedimentos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
                Ver Lista Completa
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                Falar com Especialista
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
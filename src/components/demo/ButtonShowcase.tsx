import { ArrowRight, MapPin, Zap, Building2, Heart, Star } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { MorphingButton } from "@/components/ui/morphing-button";
import { WaveButton } from "@/components/ui/wave-button";

const ButtonShowcase = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Showcase dos Botões Animados
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* AnimatedButton Examples */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">AnimatedButton</h3>
            <div className="space-y-4">
              <AnimatedButton variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                Primary Button
              </AnimatedButton>
              
              <AnimatedButton variant="gradient" size="md" icon={<Star className="w-4 h-4" />}>
                Gradient Button
              </AnimatedButton>
              
              <AnimatedButton variant="glow" size="md" icon={<Heart className="w-4 h-4" />}>
                Glow Button
              </AnimatedButton>
              
              <AnimatedButton variant="ripple" size="md" icon={<Zap className="w-4 h-4" />}>
                Ripple Button
              </AnimatedButton>
            </div>
          </div>

          {/* MorphingButton Examples */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">MorphingButton</h3>
            <div className="space-y-4">
              <MorphingButton
                hoverText="Vamos acelerar! ⚡"
                icon={<Zap className="w-4 h-4" />}
                hoverIcon={<ArrowRight className="w-4 h-4" />}
              >
                Acelere seu atendimento
              </MorphingButton>
              
              <MorphingButton
                hoverText="Encontre agora! 📍"
                icon={<MapPin className="w-4 h-4" />}
                hoverIcon={<Building2 className="w-4 h-4" />}
              >
                Nossas unidades
              </MorphingButton>
            </div>
          </div>

          {/* WaveButton Examples */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">WaveButton</h3>
            <div className="space-y-4">
              <WaveButton
                variant="primary"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Wave Primary
              </WaveButton>
              
              <WaveButton
                variant="secondary"
                icon={<Building2 className="w-4 h-4" />}
              >
                Wave Secondary
              </WaveButton>
            </div>
          </div>

          {/* MagneticButton Examples */}
          <div className="bg-white p-6 rounded-2xl shadow-lg md:col-span-2 lg:col-span-3">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">MagneticButton</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <MagneticButton strength={0.2}>
                Magnetic Suave
              </MagneticButton>
              
              <MagneticButton strength={0.4}>
                Magnetic Médio
              </MagneticButton>
              
              <MagneticButton strength={0.6}>
                Magnetic Forte
              </MagneticButton>
            </div>
            <p className="text-sm text-gray-500 text-center mt-4">
              Passe o mouse sobre os botões para ver o efeito magnético
            </p>
          </div>

        </div>

        <div className="mt-12 bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
            Combinações Especiais
          </h3>
          
          <div className="flex flex-wrap gap-6 justify-center">
            <AnimatedButton 
              variant="gradient" 
              size="lg" 
              icon={<Heart className="w-5 h-5" />}
              iconPosition="left"
            >
              ❤️ Cuidamos de Você
            </AnimatedButton>
            
            <MorphingButton
              hoverText="Portal do Paciente 🚀"
              icon={<Star className="w-4 h-4" />}
              hoverIcon={<ArrowRight className="w-4 h-4" />}
              className="bg-purple-500"
            >
              Acesse seus Resultados
            </MorphingButton>
            
            <WaveButton
              variant="primary"
              icon={<Building2 className="w-4 h-4" />}
              className="bg-green-500"
            >
              🏥 Nossas Unidades
            </WaveButton>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Todos os botões são responsivos e otimizados para mobile 📱
          </p>
        </div>
      </div>
    </div>
  );
};

export default ButtonShowcase;
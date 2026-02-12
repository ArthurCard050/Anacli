import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Política de Privacidade | Anacli',
  description: 'Política de Privacidade do Laboratório Anacli',
};

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Política de Privacidade</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Informações que Coletamos</h2>
              <p className="text-gray-700 mb-4">
                O Laboratório Anacli coleta informações quando você utiliza nossos serviços, incluindo:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Dados pessoais fornecidos voluntariamente (nome, email, telefone)</li>
                <li>Informações de navegação e uso do site</li>
                <li>Dados de comentários e interações no blog</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Como Usamos suas Informações</h2>
              <p className="text-gray-700 mb-4">
                Utilizamos as informações coletadas para:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Fornecer e melhorar nossos serviços</li>
                <li>Comunicar sobre agendamentos e resultados de exames</li>
                <li>Enviar informações relevantes sobre saúde e bem-estar</li>
                <li>Responder a dúvidas e solicitações</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Compartilhamento de Dados</h2>
              <p className="text-gray-700 mb-4">
                Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Quando exigido por lei</li>
                <li>Com prestadores de serviços essenciais (ex: sistema de comentários)</li>
                <li>Com seu consentimento explícito</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cookies e Tecnologias Similares</h2>
              <p className="text-gray-700 mb-4">
                Utilizamos cookies para melhorar sua experiência de navegação e analisar o uso do site.
                Você pode configurar seu navegador para recusar cookies, mas isso pode afetar algumas funcionalidades.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Segurança</h2>
              <p className="text-gray-700 mb-4">
                Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações
                contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Seus Direitos</h2>
              <p className="text-gray-700 mb-4">
                De acordo com a LGPD, você tem direito a:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos ou desatualizados</li>
                <li>Solicitar a exclusão de seus dados</li>
                <li>Revogar consentimento</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contato</h2>
              <p className="text-gray-700 mb-4">
                Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:
              </p>
              <ul className="list-none text-gray-700 space-y-2">
                <li><strong>Email:</strong> contato@anacli.com.br</li>
                <li><strong>Telefone:</strong> (75) 3030-0030</li>
                <li><strong>Endereço:</strong> Feira de Santana - BA</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Alterações nesta Política</h2>
              <p className="text-gray-700">
                Podemos atualizar esta Política de Privacidade periodicamente. Recomendamos que você
                revise esta página regularmente para se manter informado sobre como protegemos suas informações.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

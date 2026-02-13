import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Exclusão de Dados do Usuário | Anacli',
  description: 'Instruções para solicitar a exclusão de seus dados pessoais',
};

export default function ExclusaoDadosPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Exclusão de Dados do Usuário</h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Como Solicitar a Exclusão dos Seus Dados</h2>
              <p className="text-gray-700 mb-4">
                De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem o direito de solicitar
                a exclusão de seus dados pessoais armazenados em nossos sistemas.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Dados que Podem Ser Excluídos</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Informações de perfil (nome, email, telefone)</li>
                <li>Histórico de comentários no blog</li>
                <li>Preferências e configurações</li>
                <li>Dados de navegação e cookies</li>
              </ul>
              <p className="text-gray-700 mt-4">
                <strong>Importante:</strong> Dados relacionados a exames e prontuários médicos são mantidos
                por exigência legal e não podem ser excluídos, conforme determina o Conselho Federal de Medicina.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Como Fazer a Solicitação</h2>
              <p className="text-gray-700 mb-4">
                Para solicitar a exclusão de seus dados, entre em contato conosco através de um dos canais abaixo:
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Canais de Atendimento</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <a href="mailto:contato@anacli.com.br" className="text-primary hover:underline">
                        contato@anacli.com.br
                      </a>
                      <p className="text-sm text-gray-600 mt-1">
                        Assunto: "Solicitação de Exclusão de Dados - LGPD"
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Telefone</p>
                      <a href="tel:+557530300030" className="text-primary hover:underline">
                        (75) 3030-0030
                      </a>
                      <p className="text-sm text-gray-600 mt-1">
                        Horário: Segunda a Sexta, 6h às 18h | Sábado, 6h às 12h
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Informações Necessárias</h2>
              <p className="text-gray-700 mb-4">
                Para processar sua solicitação, precisaremos das seguintes informações:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Nome completo</li>
                <li>Email cadastrado</li>
                <li>CPF (para validação de identidade)</li>
                <li>Descrição dos dados que deseja excluir</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Prazo de Atendimento</h2>
              <p className="text-gray-700 mb-4">
                Sua solicitação será processada em até <strong>15 dias úteis</strong> após a confirmação
                de sua identidade. Você receberá uma confirmação por email quando o processo for concluído.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Consequências da Exclusão</h2>
              <p className="text-gray-700 mb-4">
                Ao solicitar a exclusão de seus dados, você estará ciente de que:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Não poderá mais acessar serviços que requerem cadastro</li>
                <li>Perderá o histórico de interações no site</li>
                <li>Precisará criar um novo cadastro caso queira utilizar nossos serviços novamente</li>
              </ul>
            </section>

            <section className="mb-8 bg-primary/10 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Dúvidas?</h2>
              <p className="text-gray-700">
                Se você tiver dúvidas sobre o processo de exclusão de dados ou sobre nossa
                Política de Privacidade, entre em contato conosco. Estamos à disposição para
                ajudá-lo a exercer seus direitos de proteção de dados.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

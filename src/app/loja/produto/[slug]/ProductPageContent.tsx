'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  Clock, 
  Calendar, 
  ShoppingCart, 
  Check, 
  AlertCircle,
  ChevronDown,
  Plus,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getExamById, getPackageById, mockExams } from '../../data/mock-products';
import { useCart, CartProvider } from '../../context/CartContext';
import ShopHeader from '../../components/ShopHeader';
import ShopFooter from '../../components/ShopFooter';
import CartDrawer from '../../components/CartDrawer';
import WhatsAppFAB from '../../components/WhatsAppFAB';
import type { Exam, ExamPackage } from '../../types';

// Componente de Accordion
function Accordion({ 
  title, 
  children, 
  defaultOpen = false 
}: { 
  title: string; 
  children: React.ReactNode; 
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 md:p-5 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <span className="font-semibold text-gray-900">{title}</span>
        <ChevronDown 
          className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="p-4 md:p-5 pt-0 bg-white">
          {children}
        </div>
      </div>
    </div>
  );
}


// Componente de Card de Produto Relacionado
function RelatedProductCard({ exam }: { exam: Exam }) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addItem(exam.id, 'exam');
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 hover:border-primary transition-all">
      <div className="flex gap-4">
        <div className="w-16 h-16 bg-primary/10 rounded-xl flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <Link href={`/loja/produto/${exam.slug}`}>
            <h4 className="font-semibold text-gray-900 hover:text-primary transition-colors mb-1 line-clamp-1">
              {exam.name}
            </h4>
          </Link>
          <p className="text-sm text-gray-600 mb-2 line-clamp-1">
            {exam.shortDescription}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-primary">
              R$ {exam.price.toFixed(2)}
            </span>
            <Button
              size="sm"
              onClick={handleAdd}
              className={`rounded-full ${
                isAdded ? 'bg-green-500 hover:bg-green-600' : 'bg-primary hover:bg-primary/90'
              }`}
            >
              {isAdded ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente de Mobile Sticky Bar
function MobileStickyBar({ product, onAdd, isAdded }: { 
  product: Exam | ExamPackage; 
  onAdd: () => void;
  isAdded: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const name = 'title' in product ? product.title : product.name;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40 md:hidden transform transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm truncate">{name}</p>
          <p className="font-bold text-primary">R$ {product.price.toFixed(2)}</p>
        </div>
        <Button
          onClick={onAdd}
          className={`rounded-xl h-12 px-6 ${
            isAdded ? 'bg-green-500 hover:bg-green-600' : 'bg-accent hover:bg-accent/90'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Adicionado
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Adicionar
            </>
          )}
        </Button>
      </div>
    </div>
  );
}


// Componente Principal da Página
function ProductPageInner({ slug }: { slug: string }) {
  const { addItem } = useCart();
  
  const [product, setProduct] = useState<Exam | ExamPackage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Exam[]>([]);

  // Buscar produto
  useEffect(() => {
    const exam = getExamById(slug);
    const pkg = getPackageById(slug);
    
    if (exam) {
      setProduct(exam);
      const related = mockExams
        .filter(e => e.category === exam.category && e.id !== exam.id)
        .slice(0, 3);
      setRelatedProducts(related);
    } else if (pkg) {
      setProduct(pkg);
      const related = mockExams
        .filter(e => pkg.exams.includes(e.id))
        .slice(0, 3);
      setRelatedProducts(related);
    }
    
    setIsLoading(false);
  }, [slug]);

  // Adicionar ao carrinho
  const handleAddToCart = () => {
    if (!product) return;
    
    const type = 'title' in product ? 'package' : 'exam';
    addItem(product.id, type);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <ShopHeader />
        <div className="container mx-auto px-4 py-32 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  // Produto não encontrado
  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <ShopHeader />
        <div className="container mx-auto px-4 py-32 text-center">
          <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Produto não encontrado
          </h1>
          <p className="text-gray-600 mb-6">
            O exame que você procura não existe ou foi removido.
          </p>
          <Link href="/loja">
            <Button className="rounded-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Loja
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Determinar se é exame ou pacote
  const isPackage = 'title' in product;
  const name = isPackage ? product.title : product.name;
  const description = product.description;
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader />
      
      <main className="pt-20 md:pt-24 pb-24 md:pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 md:mb-8">
            <Link href="/loja" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/loja#vitrine" className="hover:text-primary transition-colors">
              {isPackage ? 'Pacotes' : 'Exames'}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium truncate">{name}</span>
          </nav>

          {/* Layout Principal */}
          <div className="grid lg:grid-cols-[1fr_400px] gap-8 lg:gap-12">
            {/* Coluna Esquerda - Informações */}
            <div className="space-y-6">
              {/* Header do Produto */}
              <div className="bg-white rounded-3xl p-6 md:p-8">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {!isPackage && (product as Exam).popular && (
                    <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                      Popular
                    </span>
                  )}
                  {hasDiscount && (
                    <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full font-medium">
                      {Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}% OFF
                    </span>
                  )}
                  {isPackage && (
                    <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full font-medium">
                      Pacote
                    </span>
                  )}
                </div>

                {/* Nome */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {name}
                </h1>

                {/* Descrição */}
                <p className="text-lg text-gray-600 leading-relaxed">
                  {description}
                </p>

                {/* Tags de Info (apenas para exames) */}
                {!isPackage && (
                  <div className="flex flex-wrap gap-3 mt-6">
                    {(product as Exam).tags?.map((tag, i) => (
                      <span 
                        key={i} 
                        className="inline-flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full"
                      >
                        {tag.includes('Jejum') && <Clock className="h-4 w-4 text-primary" />}
                        {tag.includes('Resultado') && <Calendar className="h-4 w-4 text-primary" />}
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Accordions */}
              <div className="space-y-3">
                {/* Preparo Necessário */}
                {!isPackage && (product as Exam).preparationInfo && (
                  <Accordion title="Preparo Necessário" defaultOpen>
                    <ul className="space-y-2">
                      {(product as Exam).preparationInfo?.map((info, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-600">
                          <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          {info}
                        </li>
                      ))}
                    </ul>
                  </Accordion>
                )}

                {/* Exames Incluídos (para pacotes) */}
                {isPackage && (product as ExamPackage).benefits && (
                  <Accordion title="O que está incluído" defaultOpen>
                    <ul className="space-y-2">
                      {(product as ExamPackage).benefits?.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-600">
                          <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </Accordion>
                )}

                {/* O que detecta */}
                <Accordion title="O que este exame detecta">
                  <p className="text-gray-600">
                    Este exame é utilizado para avaliar diversos parâmetros de saúde, 
                    auxiliando no diagnóstico e acompanhamento de condições médicas. 
                    Consulte seu médico para mais informações sobre a indicação específica.
                  </p>
                </Accordion>

                {/* Perguntas Frequentes */}
                <Accordion title="Perguntas Frequentes">
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-gray-900 mb-1">
                        Preciso de pedido médico?
                      </p>
                      <p className="text-gray-600 text-sm">
                        Não é obrigatório, mas recomendamos consultar um médico para 
                        interpretação dos resultados.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 mb-1">
                        Como recebo os resultados?
                      </p>
                      <p className="text-gray-600 text-sm">
                        Os resultados são disponibilizados online em nossa plataforma 
                        e também podem ser enviados por e-mail.
                      </p>
                    </div>
                  </div>
                </Accordion>
              </div>
            </div>

            {/* Coluna Direita - Card de Compra Sticky */}
            <div className="hidden lg:block">
              <div className="sticky top-28">
                <div className="bg-white rounded-3xl p-6 border border-gray-200">
                  {/* Preço */}
                  <div className="mb-6">
                    {hasDiscount && (
                      <p className="text-sm text-gray-400 line-through">
                        R$ {product.originalPrice!.toFixed(2)}
                      </p>
                    )}
                    <p className="text-4xl font-bold text-primary">
                      R$ {product.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      ou 3x de R$ {(product.price / 3).toFixed(2)} sem juros
                    </p>
                  </div>

                  {/* Info de Prazo */}
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl mb-6">
                    <Calendar className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-semibold text-gray-900">Resultado em até</p>
                      <p className="text-sm text-gray-600">
                        {!isPackage ? (product as Exam).deliveryTime : '48h'}
                      </p>
                    </div>
                  </div>

                  {/* Botão CTA */}
                  <Button
                    size="lg"
                    onClick={handleAddToCart}
                    className={`w-full h-14 text-lg font-semibold rounded-xl transition-all ${
                      isAdded 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : 'bg-accent hover:bg-accent/90'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="h-5 w-5 mr-2" />
                        Adicionado ao Carrinho
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Adicionar ao Carrinho
                      </>
                    )}
                  </Button>

                  {/* Garantias */}
                  <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="h-4 w-4 text-green-500" />
                      Pagamento seguro
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="h-4 w-4 text-green-500" />
                      Laboratório certificado ISO
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="h-4 w-4 text-green-500" />
                      Resultados online
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seção "Compre Junto" */}
          {relatedProducts.length > 0 && (
            <section className="mt-12 md:mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Quem faz este exame também faz...
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedProducts.map((exam) => (
                  <RelatedProductCard key={exam.id} exam={exam} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <ShopFooter />
      
      {/* Mobile Sticky Bar */}
      <MobileStickyBar 
        product={product} 
        onAdd={handleAddToCart}
        isAdded={isAdded}
      />
      
      {/* Componentes Flutuantes */}
      <CartDrawer />
      <WhatsAppFAB />
    </div>
  );
}

// Wrapper com CartProvider
export default function ProductPageContent({ slug }: { slug: string }) {
  return (
    <CartProvider>
      <ProductPageInner slug={slug} />
    </CartProvider>
  );
}

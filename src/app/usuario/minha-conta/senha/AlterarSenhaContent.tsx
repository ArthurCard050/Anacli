'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { ChevronLeft, Lock, Eye, EyeOff, Shield, CheckCircle } from 'lucide-react';
import ShopHeader from '@/app/loja/components/ShopHeader';
import ShopFooter from '@/app/loja/components/ShopFooter';
import CartDrawer from '@/app/loja/components/CartDrawer';
import { CartProvider } from '@/app/loja/context/CartContext';
import NavigationCards from '../components/NavigationCards';

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function AlterarSenhaContent() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<PasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [errors, setErrors] = useState<Partial<PasswordForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/usuario/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const validatePassword = (password: string) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    return requirements;
  };

  const handleInputChange = (field: keyof PasswordForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Limpar mensagem de sucesso
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const validateForm = () => {
    const newErrors: Partial<PasswordForm> = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Senha atual é obrigatória';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'Nova senha é obrigatória';
    } else {
      const requirements = validatePassword(formData.newPassword);
      if (!requirements.length || !requirements.uppercase || !requirements.lowercase || !requirements.number) {
        newErrors.newPassword = 'A senha não atende aos requisitos mínimos';
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'A nova senha deve ser diferente da atual';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simular chamada da API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aqui você implementaria a lógica real de alteração de senha
      console.log('Alterando senha:', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      
      setSuccessMessage('Senha alterada com sucesso!');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
    } catch (error) {
      setErrors({ currentPassword: 'Senha atual incorreta' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordRequirements = validatePassword(formData.newPassword);

  return (
    <CartProvider>
      <div className="min-h-screen bg-page flex flex-col">
        <ShopHeader />
        
        <main className="flex-1 pt-36 md:pt-32 pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => router.push('/usuario/minha-conta/pedidos')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-text-secondary-clean" />
                </button>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-text-primary-clean">
                    Alterar Senha
                  </h1>
                  <p className="text-text-secondary-clean">
                    Atualize sua senha de acesso para manter sua conta segura
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Cards */}
            <NavigationCards />

            {/* Mensagem de Sucesso */}
            {successMessage && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-green-800">{successMessage}</span>
              </div>
            )}

            {/* Formulário */}
            <div className="card-clean">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-gray-100">
                  <Lock className="h-5 w-5 text-gray-700" />
                </div>
                <h2 className="text-xl font-semibold text-text-primary-clean">
                  Alterar Senha
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Senha Atual */}
                <div>
                  <label className="block text-sm font-medium text-text-primary-clean mb-2">
                    Senha atual
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      value={formData.currentPassword}
                      onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                      className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                        errors.currentPassword ? 'border-red-300' : 'border-border-clean'
                      }`}
                      placeholder="Digite sua senha atual"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('current')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
                  )}
                </div>

                {/* Nova Senha */}
                <div>
                  <label className="block text-sm font-medium text-text-primary-clean mb-2">
                    Nova senha
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? 'text' : 'password'}
                      value={formData.newPassword}
                      onChange={(e) => handleInputChange('newPassword', e.target.value)}
                      className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                        errors.newPassword ? 'border-red-300' : 'border-border-clean'
                      }`}
                      placeholder="Digite sua nova senha"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('new')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
                  )}
                </div>

                {/* Requisitos da Senha */}
                {formData.newPassword && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-text-primary-clean mb-3">
                      Requisitos da senha:
                    </h4>
                    <div className="space-y-2">
                      <div className={`flex items-center gap-2 text-sm ${
                        passwordRequirements.length ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        <CheckCircle className={`h-4 w-4 ${
                          passwordRequirements.length ? 'text-green-600' : 'text-gray-400'
                        }`} />
                        Pelo menos 8 caracteres
                      </div>
                      <div className={`flex items-center gap-2 text-sm ${
                        passwordRequirements.uppercase ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        <CheckCircle className={`h-4 w-4 ${
                          passwordRequirements.uppercase ? 'text-green-600' : 'text-gray-400'
                        }`} />
                        Uma letra maiúscula
                      </div>
                      <div className={`flex items-center gap-2 text-sm ${
                        passwordRequirements.lowercase ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        <CheckCircle className={`h-4 w-4 ${
                          passwordRequirements.lowercase ? 'text-green-600' : 'text-gray-400'
                        }`} />
                        Uma letra minúscula
                      </div>
                      <div className={`flex items-center gap-2 text-sm ${
                        passwordRequirements.number ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        <CheckCircle className={`h-4 w-4 ${
                          passwordRequirements.number ? 'text-green-600' : 'text-gray-400'
                        }`} />
                        Um número
                      </div>
                    </div>
                  </div>
                )}

                {/* Confirmar Nova Senha */}
                <div>
                  <label className="block text-sm font-medium text-text-primary-clean mb-2">
                    Confirmar nova senha
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                        errors.confirmPassword ? 'border-red-300' : 'border-border-clean'
                      }`}
                      placeholder="Confirme sua nova senha"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirm')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Botões */}
                <div className="flex gap-3 pt-6 border-t border-border-light">
                  <button
                    type="button"
                    onClick={() => router.push('/usuario/minha-conta/pedidos')}
                    className="btn-secondary-clean px-6 py-2"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary-clean px-6 py-2 flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Alterando...
                      </>
                    ) : (
                      'Alterar senha'
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Dicas de Segurança */}
            <div className="card-clean mt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gray-100">
                  <Shield className="h-5 w-5 text-gray-600" />
                </div>
                <h3 className="font-semibold text-text-primary-clean">
                  Dicas de Segurança
                </h3>
              </div>
              <div className="space-y-2 text-sm text-text-secondary-clean">
                <p>• Use uma senha única que você não usa em outros sites</p>
                <p>• Evite informações pessoais como nome, data de nascimento ou CPF</p>
                <p>• Considere usar um gerenciador de senhas</p>
                <p>• Altere sua senha regularmente</p>
                <p>• Nunca compartilhe sua senha com outras pessoas</p>
              </div>
            </div>
          </div>
        </main>

        <ShopFooter />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
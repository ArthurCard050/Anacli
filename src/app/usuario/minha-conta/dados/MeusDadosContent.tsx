'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, getAuthToken } from '../../context/AuthContext';
import { ChevronLeft, User, Mail, Edit3, Save, X, AlertCircle, CheckCircle } from 'lucide-react';
import ShopHeader from '@/app/loja/components/ShopHeader';
import ShopFooter from '@/app/loja/components/ShopFooter';
import CartDrawer from '@/app/loja/components/CartDrawer';
import { CartProvider } from '@/app/loja/context/CartContext';
import NavigationCards from '../components/NavigationCards';

interface UserData {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
}

interface ApiResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
}

export default function MeusDadosContent() {
  const { user, isAuthenticated, isLoading, updateUser } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    birthDate: ''
  });
  const [originalData, setOriginalData] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    birthDate: ''
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/usuario/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Buscar dados do perfil da API
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!isAuthenticated) return;

      try {
        setIsLoadingData(true);
        const token = getAuthToken();
        const apiUrl = process.env.NEXT_PUBLIC_VARIAVEL_API_URL || 'http://localhost:3001';

        const response = await fetch(`${apiUrl}/auth/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar dados do perfil');
        }

        const data: ApiResponse = await response.json();
        
        const profileData: UserData = {
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          cpf: data.cpf || '',
          birthDate: data.birthDate || ''
        };

        setUserData(profileData);
        setOriginalData(profileData);
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        setMessage({ type: 'error', text: 'Erro ao carregar dados do perfil' });
      } finally {
        setIsLoadingData(false);
      }
    };

    if (isAuthenticated) {
      fetchUserProfile();
    }
  }, [isAuthenticated]);

  if (isLoading || isLoadingData || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleInputChange = (field: keyof UserData, value: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setMessage(null);
      
      const token = getAuthToken();
      const apiUrl = process.env.NEXT_PUBLIC_VARIAVEL_API_URL || 'http://localhost:3001';

      // Preparar dados para envio (todos os campos são opcionais)
      const updateData: Record<string, string> = {};
      
      if (userData.name !== originalData.name) {
        updateData.username = userData.name;
      }
      if (userData.email !== originalData.email) {
        updateData.email = userData.email;
      }
      if (userData.phone !== originalData.phone) {
        updateData.phone = userData.phone;
      }
      if (userData.cpf !== originalData.cpf) {
        updateData.cpf = userData.cpf;
      }
      if (userData.birthDate !== originalData.birthDate) {
        updateData.birthDate = userData.birthDate;
      }

      // Se não houver alterações, apenas fecha o modo de edição
      if (Object.keys(updateData).length === 0) {
        setIsEditing(false);
        return;
      }

      const response = await fetch(`${apiUrl}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar dados');
      }

      // Atualizar contexto de autenticação
      await updateUser({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        cpf: userData.cpf,
        birthDate: userData.birthDate,
      });

      setOriginalData(userData);
      setIsEditing(false);
      setMessage({ type: 'success', text: 'Dados atualizados com sucesso!' });
      
      // Limpar mensagem após 3 segundos
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      setMessage({ type: 'error', text: 'Erro ao atualizar dados. Tente novamente.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setUserData(originalData);
    setIsEditing(false);
  };

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
                    Meus Dados
                  </h1>
                  <p className="text-text-secondary-clean">
                    Gerencie suas informações pessoais
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Cards */}
            <NavigationCards />

            {/* Message Alert */}
            {message && (
              <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                message.type === 'success' 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {message.type === 'success' ? (
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                )}
                <p className="text-sm font-medium">{message.text}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mb-6">
              <div className="flex gap-2 justify-start">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleCancel}
                      disabled={isSaving}
                      className="btn-secondary-clean px-4 py-2 text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <X className="h-4 w-4" />
                      Cancelar
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="btn-primary-clean px-4 py-2 text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          Salvar
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-primary-clean px-4 py-2 text-sm flex items-center gap-2"
                  >
                    <Edit3 className="h-4 w-4" />
                    Editar
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Informações Pessoais */}
              <div className="lg:col-span-2">
                <div className="card-clean">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-gray-100">
                      <User className="h-5 w-5 text-gray-700" />
                    </div>
                    <h2 className="text-xl font-semibold text-text-primary-clean">
                      Informações Pessoais
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-primary-clean mb-2">
                        Nome completo
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={userData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-3 py-2 border border-border-clean rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      ) : (
                        <p className="text-text-primary-clean py-2">{userData.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary-clean mb-2">
                        CPF
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={userData.cpf}
                          onChange={(e) => handleInputChange('cpf', e.target.value)}
                          className="w-full px-3 py-2 border border-border-clean rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          placeholder="000.000.000-00"
                        />
                      ) : (
                        <p className="text-text-primary-clean py-2">{userData.cpf}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary-clean mb-2">
                        Data de nascimento
                      </label>
                      {isEditing ? (
                        <input
                          type="date"
                          value={userData.birthDate}
                          onChange={(e) => handleInputChange('birthDate', e.target.value)}
                          className="w-full px-3 py-2 border border-border-clean rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      ) : (
                        <p className="text-text-primary-clean py-2">
                          {new Date(userData.birthDate).toLocaleDateString('pt-BR')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Informações de Contato */}
                <div className="card-clean mt-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-gray-100">
                      <Mail className="h-5 w-5 text-gray-700" />
                    </div>
                    <h2 className="text-xl font-semibold text-text-primary-clean">
                      Informações de Contato
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-primary-clean mb-2">
                        E-mail
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={userData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-3 py-2 border border-border-clean rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      ) : (
                        <p className="text-text-primary-clean py-2">{userData.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary-clean mb-2">
                        Telefone
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={userData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-3 py-2 border border-border-clean rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          placeholder="(11) 99999-9999"
                        />
                      ) : (
                        <p className="text-text-primary-clean py-2">{userData.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Foto do Perfil */}
                <div className="card-clean text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <User className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="font-semibold text-text-primary-clean mb-2">
                    {userData.name.split(' ')[0]}
                  </h3>
                  <p className="text-sm text-text-secondary-clean mb-4">
                    Membro desde março de 2024
                  </p>
                  <button className="btn-secondary-clean px-4 py-2 text-sm w-full">
                    Alterar foto
                  </button>
                </div>
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
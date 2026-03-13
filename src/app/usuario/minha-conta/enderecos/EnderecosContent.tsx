'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, getAuthToken } from '../../context/AuthContext';
import { ChevronLeft, MapPin, Plus, Edit3, Trash2, Home, Building, Star, AlertCircle, CheckCircle } from 'lucide-react';
import ShopHeader from '@/app/loja/components/ShopHeader';
import ShopFooter from '@/app/loja/components/ShopFooter';
import CartDrawer from '@/app/loja/components/CartDrawer';
import { CartProvider } from '@/app/loja/context/CartContext';
import NavigationCards from '../components/NavigationCards';

interface Address {
  id: string;
  label: string;
  type: 'home' | 'work' | 'other';
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

interface ApiAddress {
  id: number;
  userId: number;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  label?: string;
  type?: string;
  isDefault?: boolean;
}

interface ApiAddressResponse {
  msg: string;
  address: ApiAddress;
}

export default function EnderecosContent() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    label: '',
    type: 'home',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    isDefault: false
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/usuario/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Buscar endereços da API
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!isAuthenticated) return;

      try {
        setIsLoadingAddresses(true);
        const token = getAuthToken();
        const apiUrl = process.env.NEXT_PUBLIC_VARIAVEL_API_URL || 'http://localhost:3001';

        const response = await fetch(`${apiUrl}/addresses`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar endereços');
        }

        const data: ApiAddress[] = await response.json();
        
        // Converter dados da API para o formato do componente
        const formattedAddresses: Address[] = data.map(addr => ({
          id: addr.id.toString(),
          label: addr.label || 'Endereço',
          type: (addr.type as 'home' | 'work' | 'other') || 'home',
          street: addr.street,
          number: addr.number,
          complement: addr.complement,
          neighborhood: addr.neighborhood,
          city: addr.city,
          state: addr.state,
          zipCode: addr.zipCode,
          isDefault: addr.isDefault || false
        }));

        setAddresses(formattedAddresses);
      } catch (error) {
        console.error('Erro ao carregar endereços:', error);
        setMessage({ type: 'error', text: 'Erro ao carregar endereços' });
      } finally {
        setIsLoadingAddresses(false);
      }
    };

    if (isAuthenticated) {
      fetchAddresses();
    }
  }, [isAuthenticated]);

  if (isLoading || isLoadingAddresses || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const getAddressIcon = (type: string) => {
    switch (type) {
      case 'home':
        return Home;
      case 'work':
        return Building;
      default:
        return MapPin;
    }
  };

  const handleAddAddress = async () => {
    if (!newAddress.street || !newAddress.number || !newAddress.city) {
      setMessage({ type: 'error', text: 'Preencha todos os campos obrigatórios' });
      return;
    }

    try {
      setIsSaving(true);
      setMessage(null);
      const token = getAuthToken();
      const apiUrl = process.env.NEXT_PUBLIC_VARIAVEL_API_URL || 'http://localhost:3001';

      const addressData = {
        street: newAddress.street,
        number: newAddress.number,
        complement: newAddress.complement || '',
        neighborhood: newAddress.neighborhood || '',
        city: newAddress.city,
        state: newAddress.state || '',
        zipCode: newAddress.zipCode || '',
        label: newAddress.label || 'Endereço',
        type: newAddress.type || 'home',
        isDefault: addresses.length === 0 || newAddress.isDefault || false
      };

      const response = await fetch(`${apiUrl}/addresses`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addressData),
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar endereço');
      }

      const responseData: ApiAddressResponse = await response.json();
      const data = responseData.address;

      const newAddr: Address = {
        id: data.id.toString(),
        label: data.label || 'Endereço',
        type: (data.type as 'home' | 'work' | 'other') || 'home',
        street: data.street,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        isDefault: data.isDefault || false
      };

      if (newAddr.isDefault) {
        setAddresses(prev => prev.map(addr => ({ ...addr, isDefault: false })));
      }

      setAddresses(prev => [...prev, newAddr]);
      setNewAddress({
        label: '',
        type: 'home',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: '',
        isDefault: false
      });
      setShowAddForm(false);
      setMessage({ type: 'success', text: 'Endereço adicionado com sucesso!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Erro ao adicionar endereço:', error);
      setMessage({ type: 'error', text: 'Erro ao adicionar endereço. Tente novamente.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateAddress = async () => {
    if (!editingAddress) return;
    
    if (!editingAddress.street || !editingAddress.number || !editingAddress.city) {
      setMessage({ type: 'error', text: 'Preencha todos os campos obrigatórios' });
      return;
    }

    try {
      setIsSaving(true);
      setMessage(null);
      const token = getAuthToken();
      const apiUrl = process.env.NEXT_PUBLIC_VARIAVEL_API_URL || 'http://localhost:3001';

      const addressData = {
        street: editingAddress.street,
        number: editingAddress.number,
        complement: editingAddress.complement || '',
        neighborhood: editingAddress.neighborhood || '',
        city: editingAddress.city,
        state: editingAddress.state || '',
        zipCode: editingAddress.zipCode || '',
        label: editingAddress.label || 'Endereço',
        type: editingAddress.type || 'home',
        isDefault: editingAddress.isDefault || false
      };

      const response = await fetch(`${apiUrl}/addresses/${editingAddress.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addressData),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar endereço');
      }

      if (editingAddress.isDefault) {
        setAddresses(prev => prev.map(addr => ({
          ...addr,
          isDefault: addr.id === editingAddress.id
        })));
      } else {
        setAddresses(prev => prev.map(addr => 
          addr.id === editingAddress.id ? editingAddress : addr
        ));
      }

      setEditingAddress(null);
      setMessage({ type: 'success', text: 'Endereço atualizado com sucesso!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Erro ao atualizar endereço:', error);
      setMessage({ type: 'error', text: 'Erro ao atualizar endereço. Tente novamente.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este endereço?')) {
      return;
    }

    try {
      setMessage(null);
      const token = getAuthToken();
      const apiUrl = process.env.NEXT_PUBLIC_VARIAVEL_API_URL || 'http://localhost:3001';

      const response = await fetch(`${apiUrl}/addresses/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir endereço');
      }

      setAddresses(prev => prev.filter(addr => addr.id !== id));
      setMessage({ type: 'success', text: 'Endereço excluído com sucesso!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Erro ao excluir endereço:', error);
      setMessage({ type: 'error', text: 'Erro ao excluir endereço. Tente novamente.' });
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      setMessage(null);
      const token = getAuthToken();
      const apiUrl = process.env.NEXT_PUBLIC_VARIAVEL_API_URL || 'http://localhost:3001';

      const address = addresses.find(addr => addr.id === id);
      if (!address) return;

      const response = await fetch(`${apiUrl}/addresses/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...address,
          isDefault: true
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao definir endereço padrão');
      }

      setAddresses(prev => prev.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      })));
      
      setMessage({ type: 'success', text: 'Endereço padrão atualizado!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Erro ao definir endereço padrão:', error);
      setMessage({ type: 'error', text: 'Erro ao definir endereço padrão. Tente novamente.' });
    }
  };

  const handleInputChange = (field: keyof Address, value: string | boolean) => {
    if (editingAddress) {
      setEditingAddress(prev => prev ? { ...prev, [field]: value } : null);
    } else {
      setNewAddress(prev => ({ ...prev, [field]: value }));
    }
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
                    Meus Endereços
                  </h1>
                  <p className="text-text-secondary-clean">
                    Cadastre e edite seus endereços para coleta domiciliar
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
                <button
                  onClick={() => setShowAddForm(true)}
                  className="btn-primary-clean px-4 py-2 text-sm flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Novo endereço
                </button>
              </div>
            </div>

            {/* Lista de Endereços */}
            <div className="space-y-4 mb-8">
              {addresses.map((address) => {
                const Icon = getAddressIcon(address.type);
                return (
                  <div key={address.id} className="card-clean">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-gray-100 flex-shrink-0">
                        <Icon className="h-5 w-5 text-gray-700" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-text-primary-clean">
                            {address.label}
                          </h3>
                          {address.isDefault && (
                            <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                              <Star className="h-3 w-3" />
                              Padrão
                            </span>
                          )}
                        </div>
                        
                        <div className="text-sm text-text-secondary-clean space-y-1">
                          <p>
                            {address.street}, {address.number}
                            {address.complement && `, ${address.complement}`}
                          </p>
                          <p>
                            {address.neighborhood} - {address.city}, {address.state}
                          </p>
                          <p>CEP: {address.zipCode}</p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        {!address.isDefault && (
                          <button
                            onClick={() => handleSetDefault(address.id)}
                            className="text-sm text-primary hover:text-primary/80 transition-colors"
                          >
                            Tornar padrão
                          </button>
                        )}
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingAddress(address)}
                            className="p-2 text-gray-500 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteAddress(address.id)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Formulário de Novo Endereço */}
            {(showAddForm || editingAddress) && (
              <div className="card-clean">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-text-primary-clean">
                    {editingAddress ? 'Editar Endereço' : 'Novo Endereço'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingAddress(null);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-primary-clean mb-2">
                      Nome do endereço
                    </label>
                    <input
                      type="text"
                      value={editingAddress?.label || newAddress.label}
                      onChange={(e) => handleInputChange('label', e.target.value)}
                      className="w-full px-3 py-2 border border-border-clean rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="Ex: Casa, Trabalho, Casa da mãe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary-clean mb-2">
                      Tipo
                    </label>
                    <select
                      value={editingAddress?.type || newAddress.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="w-full px-3 py-2 border border-border-clean rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      <option value="home">Casa</option>
                      <option value="work">Trabalho</option>
                      <option value="other">Outro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary-clean mb-2">
                      CEP
                    </label>
                    <input
                      type="text"
                      value={editingAddress?.zipCode || newAddress.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      className="w-full px-3 py-2 border border-border-clean rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="00000-000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary-clean mb-2">
                      Rua
                    </label>
                    <input
                      type="text"
                      value={editingAddress?.street || newAddress.street}
                      onChange={(e) => handleInputChange('street', e.target.value)}
                      className="w-full px-3 py-2 border border-border-clean rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="Nome da rua"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary-clean mb-2">
                      Número
                    </label>
                    <input
                      type="text"
                      value={editingAddress?.number || newAddress.number}
                      onChange={(e) => handleInputChange('number', e.target.value)}
                      className="w-full px-3 py-2 border border-border-clean rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="123"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary-clean mb-2">
                      Complemento
                    </label>
                    <input
                      type="text"
                      value={editingAddress?.complement || newAddress.complement}
                      onChange={(e) => handleInputChange('complement', e.target.value)}
                      className="w-full px-3 py-2 border border-border-clean rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="Apto, bloco, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary-clean mb-2">
                      Bairro
                    </label>
                    <input
                      type="text"
                      value={editingAddress?.neighborhood || newAddress.neighborhood}
                      onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                      className="w-full px-3 py-2 border border-border-clean rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="Nome do bairro"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary-clean mb-2">
                      Cidade
                    </label>
                    <input
                      type="text"
                      value={editingAddress?.city || newAddress.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-3 py-2 border border-border-clean rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="Nome da cidade"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary-clean mb-2">
                      Estado
                    </label>
                    <select
                      value={editingAddress?.state || newAddress.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-full px-3 py-2 border border-border-clean rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      <option value="">Selecione</option>
                      <option value="SP">São Paulo</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="RS">Rio Grande do Sul</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={editingAddress?.isDefault || newAddress.isDefault}
                        onChange={(e) => handleInputChange('isDefault', e.target.checked)}
                        className="rounded border-border-clean text-primary focus:ring-primary/20"
                      />
                      <span className="text-sm text-text-primary-clean">
                        Definir como endereço padrão
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-6 border-t border-border-light">
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingAddress(null);
                    }}
                    disabled={isSaving}
                    className="btn-secondary-clean px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={editingAddress ? handleUpdateAddress : handleAddAddress}
                    disabled={isSaving}
                    className="btn-primary-clean px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Salvando...
                      </>
                    ) : (
                      editingAddress ? 'Salvar alterações' : 'Adicionar endereço'
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Estado vazio */}
            {addresses.length === 0 && !showAddForm && (
              <div className="text-center py-16">
                <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary-clean mb-2">
                  Nenhum endereço cadastrado
                </h3>
                <p className="text-text-secondary-clean mb-6">
                  Adicione um endereço para facilitar suas coletas domiciliares
                </p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="btn-primary-clean px-6 py-3"
                >
                  Adicionar primeiro endereço
                </button>
              </div>
            )}
          </div>
        </main>

        <ShopFooter />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

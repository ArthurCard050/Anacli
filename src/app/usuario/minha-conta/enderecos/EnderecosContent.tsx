'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { ChevronLeft, MapPin, Plus, Edit3, Trash2, Home, Building, Star } from 'lucide-react';
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

export default function EnderecosContent() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      label: 'Casa',
      type: 'home',
      street: 'Rua das Flores',
      number: '123',
      complement: 'Apto 45',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      isDefault: true
    },
    {
      id: '2',
      label: 'Trabalho',
      type: 'work',
      street: 'Av. Paulista',
      number: '1000',
      complement: 'Sala 1001',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100',
      isDefault: false
    }
  ]);
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

  if (isLoading || !user) {
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

  const handleAddAddress = () => {
    if (newAddress.street && newAddress.number && newAddress.city) {
      const address: Address = {
        id: Date.now().toString(),
        label: newAddress.label || 'Novo endereço',
        type: newAddress.type as 'home' | 'work' | 'other',
        street: newAddress.street,
        number: newAddress.number,
        complement: newAddress.complement,
        neighborhood: newAddress.neighborhood || '',
        city: newAddress.city,
        state: newAddress.state || '',
        zipCode: newAddress.zipCode || '',
        isDefault: addresses.length === 0 || newAddress.isDefault || false
      };

      if (address.isDefault) {
        setAddresses(prev => prev.map(addr => ({ ...addr, isDefault: false })));
      }

      setAddresses(prev => [...prev, address]);
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
    }
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
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
                      {/* Adicionar outros estados */}
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
                    className="btn-secondary-clean px-6 py-2"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleAddAddress}
                    className="btn-primary-clean px-6 py-2"
                  >
                    {editingAddress ? 'Salvar alterações' : 'Adicionar endereço'}
                  </button>
                </div>
              </div>
            )}

            {/* Estado vazio */}
            {addresses.length === 0 && (
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
'use client';

import { ExternalLink, Shield, Bell, Database } from 'lucide-react';
import { RESULTS_URL } from '../data/mock-data';

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-text-primary-clean">Configurações</h1>
        <p className="text-text-secondary-clean text-sm mt-1">Ajustes do painel administrativo</p>
      </div>

      <div className="space-y-4">
        {/* Results Link */}
        <div className="bg-card-clean border border-border-clean rounded-card-clean p-5" style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-button-clean bg-brand-accent/10 flex items-center justify-center"><ExternalLink className="w-5 h-5 text-brand-accent" /></div>
            <div><h3 className="text-text-primary-clean font-semibold text-sm">Resultados de Exames</h3><p className="text-text-secondary-clean text-xs">Link para o portal de laudos</p></div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-button-clean bg-gray-50 border border-border-clean">
            <code className="text-xs text-brand-accent flex-1 truncate">{RESULTS_URL}</code>
            <a href={RESULTS_URL} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-button-clean bg-brand-accent text-white text-xs font-medium hover:bg-brand-accent/90 transition-colors">Abrir Portal</a>
          </div>
        </div>

        {/* Security */}
        <div className="bg-card-clean border border-border-clean rounded-card-clean p-5" style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-button-clean bg-blue-50 flex items-center justify-center"><Shield className="w-5 h-5 text-blue-600" /></div>
            <div><h3 className="text-text-primary-clean font-semibold text-sm">Segurança</h3><p className="text-text-secondary-clean text-xs">Configurações de acesso e autenticação</p></div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-button-clean bg-gray-50 border border-border-clean">
              <div><p className="text-sm text-text-primary-clean">Autenticação Admin</p><p className="text-xs text-text-secondary-clean">Credenciais locais (mock)</p></div>
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200">Ativo</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-button-clean bg-gray-50 border border-border-clean">
              <div><p className="text-sm text-text-primary-clean">Integração Backend</p><p className="text-xs text-text-secondary-clean">API JWT para autenticação</p></div>
              <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full border border-amber-200">Em breve</span>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card-clean border border-border-clean rounded-card-clean p-5" style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-button-clean bg-amber-50 flex items-center justify-center"><Bell className="w-5 h-5 text-amber-600" /></div>
            <div><h3 className="text-text-primary-clean font-semibold text-sm">Notificações</h3><p className="text-text-secondary-clean text-xs">Preferências de alertas</p></div>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Novo pedido recebido', enabled: true },
              { label: 'Pagamento confirmado', enabled: true },
              { label: 'Coleta concluída', enabled: true },
              { label: 'Novo cliente cadastrado', enabled: false },
            ].map(n => (
              <div key={n.label} className="flex items-center justify-between p-3 rounded-button-clean bg-gray-50 border border-border-clean">
                <span className="text-sm text-text-primary-clean">{n.label}</span>
                <div className={`w-10 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors ${n.enabled ? 'bg-brand-accent justify-end' : 'bg-gray-300 justify-start'}`}>
                  <div className="w-4 h-4 rounded-full bg-white" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System */}
        <div className="bg-card-clean border border-border-clean rounded-card-clean p-5" style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-button-clean bg-purple-50 flex items-center justify-center"><Database className="w-5 h-5 text-purple-600" /></div>
            <div><h3 className="text-text-primary-clean font-semibold text-sm">Sistema</h3><p className="text-text-secondary-clean text-xs">Informações do ambiente</p></div>
          </div>
          <div className="space-y-2 text-xs">
            {[
              { label: 'Versão', value: '1.0.0-beta', color: 'text-text-primary-clean' },
              { label: 'Framework', value: 'Next.js 14', color: 'text-text-primary-clean' },
              { label: 'Dados', value: 'Mock (desenvolvimento)', color: 'text-amber-600' },
              { label: 'Gateway Pagamento', value: 'Não integrado', color: 'text-amber-600' },
            ].map(item => (
              <div key={item.label} className="flex justify-between p-2 rounded-button-clean bg-gray-50 border border-border-clean">
                <span className="text-text-secondary-clean">{item.label}</span>
                <span className={`font-mono ${item.color}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

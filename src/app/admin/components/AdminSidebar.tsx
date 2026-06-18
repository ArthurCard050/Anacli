'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAdminAuth } from '../context/AdminAuthContext';
import {
  LayoutDashboard,
  ShoppingBag,
  CalendarClock,
  Users,
  UserCircle,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  ExternalLink,
  Bell,
  TestTube,
} from 'lucide-react';
import { useState } from 'react';
import { mockNotifications, RESULTS_URL } from '../data/mock-data';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/exames', label: 'Exames', icon: TestTube },
  { href: '/admin/pedidos', label: 'Pedidos', icon: ShoppingBag, badge: 6 },
  { href: '/admin/agendamentos', label: 'Agendamentos', icon: CalendarClock, badge: 5 },
  { href: '/admin/profissionais', label: 'Profissionais', icon: Users },
  { href: '/admin/clientes', label: 'Clientes', icon: UserCircle },
  { href: '/admin/relatorios', label: 'Relatórios', icon: BarChart3 },
  { href: '/admin/configuracoes', label: 'Configurações', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { admin, logout } = useAdminAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-border-clean ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-9 h-9 flex-shrink-0">
          <img src="/icone.svg" alt="Anacli" className="w-9 h-9 object-contain" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <h2 className="text-text-primary-clean font-bold text-sm truncate">Anacli Admin</h2>
            <p className="text-text-secondary-clean text-xs truncate">Painel de Gestão</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-button-clean text-sm font-medium transition-all duration-200 group ${
                active
                  ? 'bg-brand-accent/10 text-brand-accent'
                  : 'text-text-secondary-clean hover:text-text-primary-clean hover:bg-gray-100'
              } ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-brand-accent' : 'text-gray-400 group-hover:text-text-secondary-clean'}`} />
              {!collapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="bg-brand-accent/10 text-brand-accent text-xs font-semibold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}

        {/* Results link */}
        <a
          href={RESULTS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-button-clean text-sm font-medium text-text-secondary-clean hover:text-text-primary-clean hover:bg-gray-100 transition-all duration-200 ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? 'Resultados de Exames' : undefined}
        >
          <ExternalLink className="w-5 h-5 flex-shrink-0 text-gray-400" />
          {!collapsed && <span className="flex-1">Resultados</span>}
        </a>
      </nav>

      {/* User / Collapse */}
      <div className="border-t border-border-clean p-3 space-y-2">
        {!collapsed && admin && (
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent text-xs font-bold flex-shrink-0">
              {admin.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-text-primary-clean text-sm font-medium truncate">{admin.name}</p>
              <p className="text-text-secondary-clean text-xs truncate">{admin.role === 'admin' ? 'Administrador' : 'Gerente'}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-button-clean text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 w-full ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? 'Sair' : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Sair</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center justify-center w-full py-2 rounded-button-clean text-text-secondary-clean hover:text-text-primary-clean hover:bg-gray-100 transition-all"
        >
          <ChevronLeft className={`w-4 h-4 transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-button-clean bg-card-clean border border-border-clean flex items-center justify-center text-text-secondary-clean hover:text-text-primary-clean transition-colors"
        style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile notifications */}
      <div className="lg:hidden fixed top-4 right-4 z-50 flex items-center gap-2">
        <button
          className="w-10 h-10 rounded-button-clean bg-card-clean border border-border-clean flex items-center justify-center text-text-secondary-clean hover:text-text-primary-clean transition-colors relative"
          style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-accent text-white text-xs font-bold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/30 z-40" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-card-clean border-r border-border-clean flex flex-col z-40 transition-all duration-300 ${
          collapsed ? 'w-[72px]' : 'w-64'
        } ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}

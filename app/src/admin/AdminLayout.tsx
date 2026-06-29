import { useState, type ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { adminApi } from './AdminApi';
import {
  LayoutDashboard, Settings, BookOpen, Star, Lightbulb,
  Users, CalendarCheck, LogOut, Menu, X, Clock,
} from 'lucide-react';

const navItems = [
  { to: '/admin', label: '仪表盘', icon: LayoutDashboard, end: true },
  { to: '/admin/config', label: '站点配置', icon: Settings },
  { to: '/admin/courses', label: '课程管理', icon: BookOpen },
  { to: '/admin/advantages', label: '核心优势', icon: Star },
  { to: '/admin/features', label: '教学特色/学习路径', icon: Lightbulb },
  { to: '/admin/team', label: '团队成员', icon: Users },
  { to: '/admin/milestones', label: '发展历程', icon: Clock },
  { to: '/admin/contacts', label: '预约管理', icon: CalendarCheck },
];

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    adminApi.logout();
    navigate('/admin/login');
  };

  if (!adminApi.isLoggedIn()) {
    window.location.href = '/admin/login';
    return null;
  }

  return (
    <div className="min-h-screen flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-slate-900 text-white transform transition-transform lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-700">
          <h1 className="text-lg font-bold">管理后台</h1>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-slate-800"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="size-5" />
          </Button>
        </div>
        <nav className="flex flex-col gap-1 p-2 mt-2">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to + label}
              to={to}
              end={end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm outline-none focus:outline-none focus-visible:outline-none ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <Icon className="size-4" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 border-b flex items-center justify-between px-4 lg:px-6 bg-white">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
          <div className="flex-1" />
          <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
            <LogOut className="size-4" />
            退出登录
          </Button>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}

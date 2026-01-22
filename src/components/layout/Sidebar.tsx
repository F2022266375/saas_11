import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Video, FileText, FolderOpen, Settings, Shield, LogOut, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}
const navigationItems = [{
  path: '/dashboard',
  icon: LayoutDashboard,
  label: 'Dashboard'
}, {
  path: '/monitoring',
  icon: Video,
  label: 'Live Monitoring'
}, {
  path: '/evidence',
  icon: FileText,
  label: 'Evidence'
}, {
  path: '/cases',
  icon: FolderOpen,
  label: 'Cases'
}];
const adminItems = [{
  path: '/admin',
  icon: Shield,
  label: 'Admin Panel'
}, {
  path: '/settings',
  icon: Settings,
  label: 'Settings'
}];
export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggle
}) => {
  const location = useLocation();
  const {
    user,
    logout
  } = useAuth();
  const isActive = (path: string) => location.pathname === path;
  return <aside className={cn('fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col', collapsed ? 'w-16' : 'w-64')}>
      {/* Logo Section */}
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Camera className="w-6 h-6 text-primary-foreground" />
          </div>
          {!collapsed && <div className="flex flex-col">
              <span className="text-sm font-bold text-sidebar-foreground">SaaS_11</span>
              <span className="text-xs text-muted-foreground">CCTV System</span>
            </div>}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
        <div className="space-y-1">
          {!collapsed && <span className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Main
            </span>}
          {navigationItems.map(item => <Link key={item.path} to={item.path} className={cn('nav-link', isActive(item.path) && 'active')}>
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span className="flex-1">{item.label}</span>}
            </Link>)}
        </div>

        {user?.role === 'admin' && <div className="pt-4 space-y-1">
            {!collapsed && <span className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Administration
              </span>}
            {adminItems.map(item => <Link key={item.path} to={item.path} className={cn('nav-link', isActive(item.path) && 'active')}>
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>)}
          </div>}
      </nav>

      {/* User Section */}
      <div className="p-3 border-t border-sidebar-border">
        {!collapsed && user && <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">
                {user.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user.name}
              </p>
            </div>
          </div>}
        <Button variant="ghost" className={cn('w-full justify-start text-muted-foreground hover:text-destructive', collapsed && 'justify-center')} onClick={logout}>
          <LogOut className="w-5 h-5" />
          {!collapsed && <span>Sign Out</span>}
        </Button>
      </div>

      {/* Toggle Button */}
      <button onClick={onToggle} className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-sidebar border border-sidebar-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>;
};
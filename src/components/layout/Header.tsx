import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Bell,
  Moon,
  Sun,
  Search,
  Menu,
} from 'lucide-react';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, onMenuToggle }) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-xl border-b border-border flex items-center px-6">
      <div className="flex items-center gap-4 flex-1">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuToggle}
        >
          <Menu className="w-5 h-5" />
        </Button>

        <div>
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center relative">
          <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 w-64 bg-secondary/50 border-transparent focus:border-primary"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-[10px] text-white rounded-full flex items-center justify-center font-medium">
            3
          </span>
        </Button>

        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === 'dark' ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>

        {/* User Info */}
        <div className="hidden lg:flex items-center gap-3 pl-3 border-l border-border">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
            <span className="text-[8px] font-semibold text-primary text-center leading-tight px-0.5">
              {user?.name}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

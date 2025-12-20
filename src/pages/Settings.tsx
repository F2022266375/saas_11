import React from 'react';
import { Header } from '@/components/layout/Header';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Bell,
  Palette,
  Shield,
  Database,
  Server,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  const systemHealth = [
    { name: 'AI Detection Engine', status: 'operational' },
    { name: 'Database Connection', status: 'operational' },
    { name: 'Video Storage', status: 'operational' },
    { name: 'Notification Service', status: 'warning' },
  ];

  return (
    <div className="min-h-screen">
      <Header
        title="Settings"
        subtitle="Manage your preferences and system configuration"
      />

      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* User Profile */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Profile Settings</h2>
          </div>

          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">
                {user?.name?.charAt(0)}
              </span>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input defaultValue={user?.name} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input defaultValue={user?.email} disabled />
              </div>
              <div className="space-y-2">
                <Label>Department</Label>
                <Input defaultValue={user?.department} />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <div className="flex items-center gap-2 h-10">
                  <Badge variant="default">
                    {user?.role === 'admin' ? 'Administrator' : 'Security Officer'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button>Save Changes</Button>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Notification Preferences</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                label: 'Real-time Violation Alerts',
                description: 'Get notified immediately when a violation is detected',
                defaultChecked: true,
              },
              {
                label: 'Daily Summary Reports',
                description: 'Receive a daily email with violation statistics',
                defaultChecked: true,
              },
              {
                label: 'Camera Status Alerts',
                description: 'Get notified when cameras go offline',
                defaultChecked: false,
              },
              {
                label: 'Case Assignment Notifications',
                description: 'Get notified when you are assigned to a case',
                defaultChecked: true,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <Switch defaultChecked={item.defaultChecked} />
              </div>
            ))}
          </div>
        </div>

        {/* Appearance */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Appearance</h2>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Theme</p>
              <p className="text-sm text-muted-foreground">
                Choose between light and dark mode
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                size="sm"
                onClick={() => theme === 'dark' && toggleTheme()}
              >
                Light
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                size="sm"
                onClick={() => theme === 'light' && toggleTheme()}
              >
                Dark
              </Button>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Security</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <p className="font-medium">Change Password</p>
                <p className="text-sm text-muted-foreground">
                  Update your account password
                </p>
              </div>
              <Button variant="outline">Change</Button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security
                </p>
              </div>
              <Badge variant="secondary">Not Enabled</Badge>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Session Timeout</p>
                <p className="text-sm text-muted-foreground">
                  Automatically log out after inactivity
                </p>
              </div>
              <span className="text-sm font-medium">30 minutes</span>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Server className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">System Health</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {systemHealth.map((service, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">{service.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      'w-2 h-2 rounded-full',
                      service.status === 'operational'
                        ? 'bg-status-online'
                        : 'bg-status-warning'
                    )}
                  />
                  {service.status === 'operational' ? (
                    <Check className="w-4 h-4 text-status-online" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-status-warning" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

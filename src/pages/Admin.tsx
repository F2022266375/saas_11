import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { mockCameras } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Camera,
  Settings,
  Shield,
  Cpu,
  HardDrive,
  Plus,
  Edit,
  Trash2,
  Power,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Admin: React.FC = () => {
  const [detectionSensitivity, setDetectionSensitivity] = useState([75]);
  const [confidenceThreshold, setConfidenceThreshold] = useState([85]);
  const [retentionDays, setRetentionDays] = useState([30]);

  return (
    <div className="min-h-screen">
      <Header
        title="Admin Panel"
        subtitle="System configuration and management"
      />

      <div className="p-6 space-y-6">
        {/* Camera Management */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Camera className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Camera Management</h2>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Camera
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Camera
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Location
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Zone
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Detection
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockCameras.slice(0, 6).map((camera) => (
                  <tr
                    key={camera.id}
                    className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                          <Camera className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{camera.name}</p>
                          <p className="text-sm text-muted-foreground font-mono">
                            {camera.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">{camera.location}</td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary">{camera.zone}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          camera.status === 'online'
                            ? 'online'
                            : camera.status === 'offline'
                            ? 'offline'
                            : 'warning'
                        }
                      >
                        {camera.status.charAt(0).toUpperCase() + camera.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Switch defaultChecked={camera.status === 'online'} />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Power className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Detection Settings */}
          <div className="glass-card rounded-xl p-6 space-y-6">
            <div className="flex items-center gap-3">
              <Cpu className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Detection Settings</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Detection Sensitivity</Label>
                  <span className="text-sm font-mono text-muted-foreground">
                    {detectionSensitivity[0]}%
                  </span>
                </div>
                <Slider
                  value={detectionSensitivity}
                  onValueChange={setDetectionSensitivity}
                  max={100}
                  step={1}
                />
                <p className="text-xs text-muted-foreground">
                  Higher values may increase false positives
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Confidence Threshold</Label>
                  <span className="text-sm font-mono text-muted-foreground">
                    {confidenceThreshold[0]}%
                  </span>
                </div>
                <Slider
                  value={confidenceThreshold}
                  onValueChange={setConfidenceThreshold}
                  max={100}
                  step={1}
                />
                <p className="text-xs text-muted-foreground">
                  Minimum confidence required to trigger an alert
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <Label>Enabled Detection Types</Label>
                {[
                  { type: 'Cigarette', emoji: '🚬', enabled: true },
                  { type: 'Vape/E-Cigarette', emoji: '💨', enabled: true },
                  { type: 'Cake', emoji: '🍰', enabled: true },
                  { type: 'CSD/Soft Drinks', emoji: '🥤', enabled: true },
                ].map((item) => (
                  <div
                    key={item.type}
                    className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.emoji}</span>
                      <span className="font-medium">{item.type}</span>
                    </div>
                    <Switch defaultChecked={item.enabled} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Storage & Model Settings */}
          <div className="space-y-6">
            {/* Storage Settings */}
            <div className="glass-card rounded-xl p-6 space-y-6">
              <div className="flex items-center gap-3">
                <HardDrive className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold">Storage Settings</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Evidence Retention Period</Label>
                  <span className="text-sm font-mono text-muted-foreground">
                    {retentionDays[0]} days
                  </span>
                </div>
                <Slider
                  value={retentionDays}
                  onValueChange={setRetentionDays}
                  min={7}
                  max={90}
                  step={1}
                />
              </div>

              <div className="p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Storage Used</span>
                  <span className="text-sm font-mono">245 GB / 500 GB</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: '49%' }}
                  />
                </div>
              </div>
            </div>

            {/* Model Settings */}
            <div className="glass-card rounded-xl p-6 space-y-6">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold">Model Configuration</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>YOLOv11 Model Version</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {['v11-nano', 'v11-small', 'v11-medium', 'v11-large'].map(
                      (version) => (
                        <Button
                          key={version}
                          variant={version === 'v11-medium' ? 'default' : 'outline'}
                          size="sm"
                          className="justify-start"
                        >
                          {version}
                        </Button>
                      )
                    )}
                  </div>
                </div>

                <div className="p-4 bg-secondary/50 rounded-lg space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Current Model</span>
                    <span className="font-mono">YOLOv11-medium</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Last Updated</span>
                    <span className="font-mono">2024-01-10</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Accuracy</span>
                    <span className="font-mono text-status-online">94.5%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Restricted Zones */}
            <div className="glass-card rounded-xl p-6 space-y-6">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold">Restricted Zones</h2>
              </div>

              <div className="space-y-2">
                {['Cafeteria', 'Library', 'Dormitory', 'Sports Complex'].map((zone) => (
                  <div
                    key={zone}
                    className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                  >
                    <span className="font-medium">{zone}</span>
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Zone
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

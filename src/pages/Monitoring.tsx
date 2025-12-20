import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { CameraCard } from '@/components/dashboard/CameraCard';
import { mockCameras, Detection } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Grid2x2,
  Grid3x3,
  LayoutGrid,
  Filter,
  RefreshCw,
  Circle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type GridLayout = '4' | '9' | '16';

// Mock detections for demo
const mockDetections: Record<string, Detection[]> = {
  'CAM-002': [
    {
      id: 'd1',
      type: 'cigarette',
      confidence: 94.5,
      boundingBox: { x: 30, y: 40, width: 15, height: 20 },
      timestamp: new Date().toISOString(),
    },
  ],
  'CAM-005': [
    {
      id: 'd2',
      type: 'vape',
      confidence: 87.2,
      boundingBox: { x: 60, y: 30, width: 12, height: 18 },
      timestamp: new Date().toISOString(),
    },
  ],
};

const Monitoring: React.FC = () => {
  const [gridLayout, setGridLayout] = useState<GridLayout>('9');
  const [showOnlyActive, setShowOnlyActive] = useState(false);

  const filteredCameras = showOnlyActive
    ? mockCameras.filter((c) => c.status === 'online')
    : mockCameras;

  const displayCameras = filteredCameras.slice(
    0,
    gridLayout === '4' ? 4 : gridLayout === '9' ? 9 : 16
  );

  const onlineCameras = mockCameras.filter((c) => c.status === 'online').length;
  const offlineCameras = mockCameras.filter((c) => c.status === 'offline').length;

  return (
    <div className="min-h-screen">
      <Header
        title="Live Monitoring"
        subtitle={`${onlineCameras} cameras online • ${offlineCameras} offline`}
      />

      <div className="p-6">
        {/* Controls Bar */}
        <div className="glass-card rounded-xl p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Status Summary */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Circle className="w-2.5 h-2.5 fill-status-online text-status-online" />
                <span className="text-sm font-medium">{onlineCameras} Online</span>
              </div>
              <div className="flex items-center gap-2">
                <Circle className="w-2.5 h-2.5 fill-status-offline text-status-offline" />
                <span className="text-sm font-medium">{offlineCameras} Offline</span>
              </div>
              <Badge variant="destructive" className="animate-pulse">
                2 Active Detections
              </Badge>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant={showOnlyActive ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowOnlyActive(!showOnlyActive)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Active Only
              </Button>

              <div className="flex items-center border border-border rounded-lg p-1">
                <Button
                  variant={gridLayout === '4' ? 'secondary' : 'ghost'}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setGridLayout('4')}
                >
                  <Grid2x2 className="w-4 h-4" />
                </Button>
                <Button
                  variant={gridLayout === '9' ? 'secondary' : 'ghost'}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setGridLayout('9')}
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={gridLayout === '16' ? 'secondary' : 'ghost'}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setGridLayout('16')}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
              </div>

              <Button variant="outline" size="icon">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Camera Grid */}
        <div
          className={cn(
            'grid gap-4',
            gridLayout === '4' && 'grid-cols-1 md:grid-cols-2',
            gridLayout === '9' && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
            gridLayout === '16' && 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          )}
        >
          {displayCameras.map((camera, index) => (
            <div
              key={camera.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CameraCard
                camera={camera}
                detections={mockDetections[camera.id]}
                isLarge={gridLayout === '4'}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {displayCameras.length === 0 && (
          <div className="glass-card rounded-xl p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No cameras found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your filters to see more cameras.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Monitoring;

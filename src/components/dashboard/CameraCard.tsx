import React, { useState } from 'react';
import { Camera, CameraStatus, Detection } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Maximize2,
  Camera as CameraIcon,
  Video,
  Circle,
  AlertTriangle,
} from 'lucide-react';

interface CameraCardProps {
  camera: Camera;
  detections?: Detection[];
  onFullscreen?: () => void;
  isLarge?: boolean;
}

const statusConfig: Record<CameraStatus, { color: string; label: string }> = {
  online: { color: 'bg-status-online', label: 'Live' },
  offline: { color: 'bg-status-offline', label: 'Offline' },
  warning: { color: 'bg-status-warning', label: 'Warning' },
};

export const CameraCard: React.FC<CameraCardProps> = ({
  camera,
  detections = [],
  onFullscreen,
  isLarge = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const status = statusConfig[camera.status];

  return (
    <div
      className={cn(
        'relative rounded-xl overflow-hidden bg-card border border-border group',
        'transition-all duration-300',
        isLarge ? 'aspect-video' : 'aspect-video',
        camera.status === 'offline' && 'opacity-75'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Camera Feed Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
        {camera.status === 'offline' ? (
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-status-offline mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Camera Offline</p>
          </div>
        ) : (
          <div className="text-center">
            <Video className="w-16 h-16 text-muted-foreground/30 mx-auto" />
            <p className="text-xs text-muted-foreground mt-2 font-mono">
              {camera.id}
            </p>
          </div>
        )}
      </div>

      {/* Detection Boxes */}
      {detections.map((detection, index) => (
        <div
          key={index}
          className={cn(
            'detection-box',
            detection.type === 'cigarette' || detection.type === 'vape'
              ? 'border-violation-cigarette text-violation-cigarette'
              : detection.type === 'cake'
              ? 'border-violation-cake text-violation-cake'
              : 'border-violation-csd text-violation-csd'
          )}
          style={{
            left: `${detection.boundingBox.x}%`,
            top: `${detection.boundingBox.y}%`,
            width: `${detection.boundingBox.width}%`,
            height: `${detection.boundingBox.height}%`,
          }}
        >
          <span className="absolute -top-5 left-0 text-xs font-mono bg-black/70 px-1 rounded">
            {detection.type} {Math.round(detection.confidence)}%
          </span>
        </div>
      ))}

      {/* Overlay Gradient */}
      <div className="camera-grid-overlay" />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn('w-2 h-2 rounded-full', status.color, 'animate-pulse-soft')} />
          <span className="text-xs font-medium text-white bg-black/40 px-2 py-0.5 rounded">
            {camera.status === 'online' ? 'LIVE' : status.label.toUpperCase()}
          </span>
        </div>
        {detections.length > 0 && (
          <Badge variant="destructive" className="animate-pulse">
            {detections.length} Detection{detections.length > 1 ? 's' : ''}
          </Badge>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <div className="flex items-end justify-between">
          <div className="text-white">
            <h4 className="font-medium text-sm drop-shadow-md">{camera.name}</h4>
            <p className="text-xs text-white/70 flex items-center gap-1">
              <CameraIcon className="w-3 h-3" />
              {camera.location}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'text-white bg-black/30 hover:bg-black/50 transition-opacity',
              isHovered ? 'opacity-100' : 'opacity-0'
            )}
            onClick={onFullscreen}
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Recording Indicator */}
      {camera.status === 'online' && (
        <div className="absolute top-3 right-3 flex items-center gap-1">
          <Circle className="w-2 h-2 fill-red-500 text-red-500 animate-pulse" />
          <span className="text-[10px] text-white font-mono">REC</span>
        </div>
      )}
    </div>
  );
};

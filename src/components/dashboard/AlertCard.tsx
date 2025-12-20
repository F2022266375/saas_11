import React from 'react';
import { Alert, getViolationTypeLabel, ViolationType } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Camera, Clock, Eye, ChevronRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface AlertCardProps {
  alert: Alert;
  onClick?: () => void;
}

const violationIcons: Record<ViolationType, string> = {
  cigarette: '🚬',
  vape: '💨',
  cake: '🍰',
  csd: '🥤',
};

export const AlertCard: React.FC<AlertCardProps> = ({ alert, onClick }) => {
  return (
    <div
      className={cn(
        'glass-card rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer group',
        'animate-slide-up'
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        {/* Thumbnail */}
        <div className="relative w-20 h-20 rounded-lg bg-muted overflow-hidden shrink-0">
          <div className="absolute inset-0 flex items-center justify-center text-3xl">
            {violationIcons[alert.type]}
          </div>
          <div className="absolute bottom-1 right-1">
            <Badge variant={alert.type} className="text-[10px] px-1.5 py-0.5">
              {Math.round(alert.confidence)}%
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-semibold text-foreground">
                {getViolationTypeLabel(alert.type)} Detected
              </h4>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <Camera className="w-3.5 h-3.5" />
                <span className="truncate">{alert.cameraName}</span>
              </div>
            </div>
            <Badge variant={alert.status as any} className="shrink-0">
              {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
            </Badge>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>
                {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Eye className="w-4 h-4 mr-1" />
              View
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, getViolationTypeLabel, ViolationType } from '@/data/mockData';
import { Camera, Clock, AlertTriangle, Eye } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface ViolationPopupProps {
  alert: Alert | null;
  open: boolean;
  onClose: () => void;
}

const violationIcons: Record<ViolationType, string> = {
  cigarette: '🚬',
  vape: '💨',
  cake: '🍰',
  csd: '🥤',
};

export const ViolationPopup: React.FC<ViolationPopupProps> = ({ alert, open, onClose }) => {
  const navigate = useNavigate();

  if (!alert) return null;

  const handleViewEvidence = () => {
    onClose();
    navigate('/evidence');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            Violation Detected!
          </DialogTitle>
          <DialogDescription>
            A new violation has been detected by the surveillance system.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Violation Icon & Type */}
          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
            <div className="w-16 h-16 rounded-lg bg-background flex items-center justify-center text-4xl">
              {violationIcons[alert.type]}
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                {getViolationTypeLabel(alert.type)}
              </h3>
              <Badge variant={alert.type} className="mt-1">
                {Math.round(alert.confidence)}% Confidence
              </Badge>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Camera className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Camera:</span>
              <span className="font-medium">{alert.cameraName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Time:</span>
              <span className="font-medium">
                {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Dismiss
            </Button>
            <Button className="flex-1" onClick={handleViewEvidence}>
              <Eye className="w-4 h-4 mr-2" />
              View Evidence
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

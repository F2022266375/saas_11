import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { mockAlerts, getViolationTypeLabel } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Play,
  Pause,
  Download,
  CheckCircle,
  XCircle,
  Forward,
  Rewind,
  Volume2,
  Maximize,
  Camera,
  Clock,
  Target,
  FileVideo,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const Evidence: React.FC = () => {
  const [selectedAlert, setSelectedAlert] = useState(mockAlerts[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const detectionMarkers = [
    { time: 12, type: 'cigarette' },
    { time: 28, type: 'cigarette' },
  ];

  return (
    <div className="min-h-screen">
      <Header
        title="Evidence Viewer"
        subtitle="Review and manage detection evidence"
      />

      <div className="p-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Video Player Section */}
          <div className="xl:col-span-3 space-y-4">
            {/* Video Player */}
            <div className="glass-card rounded-xl overflow-hidden">
              {/* Video Area */}
              <div className="relative aspect-video bg-black flex items-center justify-center">
                <div className="text-center text-white/50">
                  <FileVideo className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg font-medium">Evidence Video</p>
                  <p className="text-sm">Camera: {selectedAlert.cameraName}</p>
                </div>

                {/* Detection Overlay */}
                <div
                  className="absolute border-2 border-violation-cigarette rounded"
                  style={{
                    left: '30%',
                    top: '35%',
                    width: '15%',
                    height: '25%',
                  }}
                >
                  <span className="absolute -top-6 left-0 text-xs font-mono bg-violation-cigarette text-white px-2 py-0.5 rounded">
                    Cigarette 94.5%
                  </span>
                </div>

                {/* Play Button Overlay */}
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    {isPlaying ? (
                      <Pause className="w-10 h-10 text-white" />
                    ) : (
                      <Play className="w-10 h-10 text-white ml-1" />
                    )}
                  </div>
                </button>
              </div>

              {/* Timeline */}
              <div className="p-4 border-t border-border">
                <div className="relative h-2 bg-muted rounded-full mb-4">
                  <div
                    className="absolute h-full bg-primary rounded-full"
                    style={{ width: `${(currentTime / 60) * 100}%` }}
                  />
                  {/* Detection Markers */}
                  {detectionMarkers.map((marker, index) => (
                    <div
                      key={index}
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-violation-cigarette border-2 border-white cursor-pointer"
                      style={{ left: `${(marker.time / 60) * 100}%` }}
                      title={`Detection at ${marker.time}s`}
                    />
                  ))}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Rewind className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="default"
                      size="icon"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5" />
                      )}
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Forward className="w-5 h-5" />
                    </Button>
                    <span className="text-sm font-mono text-muted-foreground ml-2">
                      0:{currentTime.toString().padStart(2, '0')} / 1:00
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Volume2 className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Maximize className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="glass-card rounded-xl p-4">
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Evidence
                </Button>
                <Button variant="success">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark as Valid
                </Button>
                <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">
                  <XCircle className="w-4 h-4 mr-2" />
                  False Positive
                </Button>
                <Button variant="warning">
                  <Forward className="w-4 h-4 mr-2" />
                  Forward to Authority
                </Button>
              </div>
            </div>
          </div>

          {/* Metadata Panel */}
          <div className="space-y-4">
            {/* Detection Info */}
            <div className="glass-card rounded-xl p-5 space-y-4">
              <h3 className="font-semibold text-foreground">Detection Details</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Object</span>
                  <Badge variant={selectedAlert.type as any}>
                    {getViolationTypeLabel(selectedAlert.type)}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Confidence</span>
                  <span className="font-mono font-semibold text-foreground">
                    {selectedAlert.confidence}%
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant={selectedAlert.status as any}>
                    {selectedAlert.status.charAt(0).toUpperCase() +
                      selectedAlert.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Camera Info */}
            <div className="glass-card rounded-xl p-5 space-y-4">
              <h3 className="font-semibold text-foreground">Camera Information</h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Camera className="w-4 h-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{selectedAlert.cameraName}</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedAlert.cameraId}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Target className="w-4 h-4 mt-0.5 text-muted-foreground" />
                  <p className="text-sm">{selectedAlert.location}</p>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm">
                      {format(new Date(selectedAlert.timestamp), 'PPP')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(selectedAlert.timestamp), 'pp')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Evidence */}
            <div className="glass-card rounded-xl p-5 space-y-4">
              <h3 className="font-semibold text-foreground">Related Alerts</h3>

              <div className="space-y-2">
                {mockAlerts.slice(0, 3).map((alert) => (
                  <button
                    key={alert.id}
                    className={cn(
                      'w-full p-3 rounded-lg text-left transition-colors',
                      alert.id === selectedAlert.id
                        ? 'bg-primary/10 border border-primary/20'
                        : 'bg-secondary/50 hover:bg-secondary'
                    )}
                    onClick={() => setSelectedAlert(alert)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{alert.id}</span>
                      <Badge variant={alert.type as any} className="text-[10px]">
                        {alert.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(new Date(alert.timestamp), 'Pp')}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Evidence;

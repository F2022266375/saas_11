import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Alert, mockAlerts } from '@/data/mockData';

interface ViolationContextType {
  currentViolation: Alert | null;
  showPopup: boolean;
  dismissPopup: () => void;
  triggerViolation: (alert: Alert) => void;
}

const ViolationContext = createContext<ViolationContextType | undefined>(undefined);

export const ViolationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentViolation, setCurrentViolation] = useState<Alert | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [violationQueue, setViolationQueue] = useState<Alert[]>([]);

  const triggerViolation = useCallback((alert: Alert) => {
    setViolationQueue(prev => [...prev, alert]);
  }, []);

  const dismissPopup = useCallback(() => {
    setShowPopup(false);
    setCurrentViolation(null);
  }, []);

  // Process violation queue
  useEffect(() => {
    if (!showPopup && violationQueue.length > 0) {
      const nextViolation = violationQueue[0];
      setCurrentViolation(nextViolation);
      setShowPopup(true);
      setViolationQueue(prev => prev.slice(1));
    }
  }, [showPopup, violationQueue]);

  // Simulate real-time violations for demo
  useEffect(() => {
    const simulateViolation = () => {
      // Pick a random alert from mock data
      const randomAlert = mockAlerts[Math.floor(Math.random() * mockAlerts.length)];
      const newAlert: Alert = {
        ...randomAlert,
        id: `alert-${Date.now()}`,
        timestamp: new Date().toISOString(),
        status: 'new',
      };
      triggerViolation(newAlert);
    };

    // Trigger first violation after 10 seconds, then every 30-60 seconds
    const initialTimeout = setTimeout(simulateViolation, 10000);
    const interval = setInterval(() => {
      simulateViolation();
    }, 30000 + Math.random() * 30000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [triggerViolation]);

  return (
    <ViolationContext.Provider value={{ currentViolation, showPopup, dismissPopup, triggerViolation }}>
      {children}
    </ViolationContext.Provider>
  );
};

export const useViolation = () => {
  const context = useContext(ViolationContext);
  if (context === undefined) {
    throw new Error('useViolation must be used within a ViolationProvider');
  }
  return context;
};

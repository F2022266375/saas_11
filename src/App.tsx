import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ViolationProvider, useViolation } from "@/context/ViolationContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { MainLayout } from "@/components/layout/MainLayout";
import { ViolationPopup } from "@/components/ViolationPopup";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Monitoring from "./pages/Monitoring";
import Evidence from "./pages/Evidence";
import Cases from "./pages/Cases";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ViolationPopupWrapper = () => {
  const { currentViolation, showPopup, dismissPopup } = useViolation();
  return (
    <ViolationPopup
      alert={currentViolation}
      open={showPopup}
      onClose={dismissPopup}
    />
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ViolationProvider>
              <ViolationPopupWrapper />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                
                <Route
                  element={
                    <ProtectedRoute>
                      <MainLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/monitoring" element={<Monitoring />} />
                  <Route path="/evidence" element={<Evidence />} />
                  <Route path="/cases" element={<Cases />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <Admin />
                      </ProtectedRoute>
                    }
                  />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </ViolationProvider>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

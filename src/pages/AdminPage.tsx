import React, { useState } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { AdminAuthGate } from '@/components/admin/AdminAuthGate';
import { authService } from '@/services/auth.service';

interface AdminPageProps {
  onBackToSite: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onBackToSite }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    authService.isAuthenticated()
  );

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    onBackToSite();
  };

  // If unauthenticated, gate access with high-security passphrase challenge
  if (!isAuthenticated) {
    return (
      <AdminAuthGate
        onAuthenticated={() => setIsAuthenticated(true)}
        onBackToSite={onBackToSite}
      />
    );
  }

  // Once authenticated, render full administration suite
  return (
    <div className="min-h-screen bg-[#07080A] text-white">
      <Navbar
        isAdminPage
        onNavigateAdmin={() => {}}
        onNavigateHome={onBackToSite}
      />
      <main>
        <AdminDashboard
          onBackToSite={onBackToSite}
          onLogout={handleLogout}
        />
      </main>
    </div>
  );
};

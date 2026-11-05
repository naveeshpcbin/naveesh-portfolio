import React, { useState, useEffect } from 'react';
import { HomePage } from '@/pages/HomePage';
import { AdminPage } from '@/pages/AdminPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const pathname = window.location.pathname;
    const hash = window.location.hash;
    if (pathname === '/admin' || hash === '#admin') return '/admin';
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname;
      const hash = window.location.hash;
      if (pathname === '/admin' || hash === '#admin') {
        setCurrentPath('/admin');
      } else {
        setCurrentPath('/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    if (path === '/admin') {
      window.history.pushState({}, '', '/admin');
    } else {
      window.history.pushState({}, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (currentPath === '/admin') {
    // Disable demo administration workflow in production to ensure the public website remains a view-only portfolio
    if (import.meta.env.PROD) {
      return <NotFoundPage onBackToHome={() => navigateTo('/')} />;
    }
    return <AdminPage onBackToSite={() => navigateTo('/')} />;
  }

  if (currentPath === '/') {
    return <HomePage onNavigateAdmin={() => navigateTo('/admin')} />;
  }

  return <NotFoundPage onBackToHome={() => navigateTo('/')} />;
};

export default App;

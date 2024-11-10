import React from 'react';
import { Navigate } from 'react-router-dom';
import { IS_DEBUG } from '../utils/constants';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // In debug mode, always allow access
  if (IS_DEBUG) {
    return <>{children}</>;
  }

  // Check for user data in localStorage
  const user = localStorage.getItem('user');
  const isAuthenticated = !!user;

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}
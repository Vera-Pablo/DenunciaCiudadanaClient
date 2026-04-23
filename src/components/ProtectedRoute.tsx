import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth";

interface ProtectedRouteProps {
  requiredRole?: "Ciudadano" | "Autoridad";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="animate-pulse text-on-surface-variant font-headline">
          Cargando...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role.type_role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

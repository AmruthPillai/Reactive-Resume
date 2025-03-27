import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { Loading } from './loading';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loading className="h-screen" />;
  }

  if (!isAuthenticated) {
    // Save the attempted URL for redirecting after login
    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}

export function PublicGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const from = location.state?.from ?? '/dashboard';

  if (isLoading) {
    return <Loading className="h-screen" />;
  }

  if (isAuthenticated) {
    // Redirect to the saved URL or dashboard
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
}

// Optional auth guard that allows both authenticated and unauthenticated access
export function OptionalAuthGuard({ children }: AuthGuardProps) {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <Loading className="h-screen" />;
  }

  return <>{children}</>;
}
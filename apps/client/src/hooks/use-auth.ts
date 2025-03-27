import { useCallback } from 'react';
import { useSupabase } from '../providers/supabase-provider';
import type { User } from '@supabase/supabase-js';
import type { AuthError } from '@supabase/supabase-js';

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
}

export interface AuthActions {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

export function useAuth(): AuthState & AuthActions {
  const { user, loading, signInWithEmail, signUp: signUpWithEmail, signOut, signInWithGitHub, signInWithGoogle } = useSupabase();

  const handleError = useCallback((error: AuthError) => {
    console.error('Auth error:', error.message);
    throw error;
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      await signInWithEmail(email, password);
    } catch (error) {
      handleError(error as AuthError);
    }
  }, [signInWithEmail, handleError]);

  const signUp = useCallback(async (email: string, password: string) => {
    try {
      await signUpWithEmail(email, password);
    } catch (error) {
      handleError(error as AuthError);
    }
  }, [signUpWithEmail, handleError]);

  return {
    isAuthenticated: !!user,
    isLoading: loading,
    user,
    signIn,
    signUp,
    signOut,
    signInWithGithub: signInWithGitHub,
    signInWithGoogle,
  };
}

export function useRequireAuth() {
  const auth = useAuth();

  if (!auth.isLoading && !auth.isAuthenticated) {
    throw new Error('Authentication required');
  }

  return auth;
}

export function useOptionalAuth() {
  return useAuth();
}
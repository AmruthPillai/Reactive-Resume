import { createContext, useContext, useEffect, useState } from 'react';
import { AuthError, Session, User, AuthChangeEvent } from '@supabase/supabase-js';
import { useNavigate } from 'react-router';
import { supabase, getUserProfile } from '../lib/supabase';
import type { User as AppUser } from '@reactive-resume/schema';

interface SupabaseContextType {
  user: User | null;
  profile: AppUser | null;
  signInWithGitHub: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null }}) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state (logged in, signed out, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
      setUser(session?.user ?? null);
      setLoading(false);

      if (event === 'SIGNED_OUT') {
        setProfile(null);
        navigate('/auth/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  // Fetch user profile when user changes
  useEffect(() => {
    if (user) {
      getUserProfile(user.id).then(setProfile);
    }
  }, [user]);

  const value: SupabaseContextType = {
    user,
    profile,
    loading,
    signInWithGitHub: async () => {
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'github',
        });
        if (error) throw error;
      } catch (error) {
        throw error as AuthError;
      }
    },
    signInWithGoogle: async () => {
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
        });
        if (error) throw error;
      } catch (error) {
        throw error as AuthError;
      }
    },
    signInWithEmail: async (email: string, password: string) => {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } catch (error) {
        throw error as AuthError;
      }
    },
    signUp: async (email: string, password: string) => {
      try {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
      } catch (error) {
        throw error as AuthError;
      }
    },
    signOut: async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      } catch (error) {
        throw error as AuthError;
      }
    },
  };

  return (
    <SupabaseContext.Provider value={value}>
      {!loading && children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
}
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: string;
  factoryName: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signInMock: () => void;
  signOutMock: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  signInMock: () => {},
  signOutMock: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>({
    id: 'usr-001',
    email: 'sarah.jenkins@apex-auto.com',
    fullName: 'Eng. Sarah Jenkins',
    role: 'Lead Operations Officer',
    factoryName: 'Apex Automotive Plant #4',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data }: { data: { session: any } }) => {
        if (data.session?.user) {
          setUser({
            id: data.session.user.id,
            email: data.session.user.email || '',
            fullName: data.session.user.user_metadata?.full_name || 'Engineering Operator',
            role: data.session.user.user_metadata?.role || 'Technician',
            factoryName: 'Apex Automotive Plant #4',
          });
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            fullName: session.user.user_metadata?.full_name || 'Engineering Operator',
            role: session.user.user_metadata?.role || 'Technician',
            factoryName: 'Apex Automotive Plant #4',
          });
        }
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  const signInMock = () => {
    setUser({
      id: 'usr-001',
      email: 'sarah.jenkins@apex-auto.com',
      fullName: 'Eng. Sarah Jenkins',
      role: 'Lead Operations Officer',
      factoryName: 'Apex Automotive Plant #4',
    });
  };

  const signOutMock = () => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut();
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        signInMock,
        signOutMock,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

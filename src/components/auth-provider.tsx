'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

export interface UserProfile {
  id: string;
  email: string;
  phone?: string;
  fullName: string;
  role: string;
  factoryName: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUpWithEmail: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: () => Promise<void>;
  signInWithMobileOtp: (phone: string) => Promise<{ success: boolean; error?: string }>;
  verifyMobileOtp: (phone: string, token: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  signInWithEmail: async () => ({ success: false }),
  signUpWithEmail: async () => ({ success: false }),
  signInWithGoogle: async () => {},
  signInWithMobileOtp: async () => ({ success: false }),
  verifyMobileOtp: async () => ({ success: false }),
  signOut: async () => {},
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
            phone: data.session.user.phone || '',
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
            phone: session.user.phone || '',
            fullName: session.user.user_metadata?.full_name || 'Engineering Operator',
            role: session.user.user_metadata?.role || 'Technician',
            factoryName: 'Apex Automotive Plant #4',
          });
        } else {
          setUser(null);
        }
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    setIsLoading(true);
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      setIsLoading(false);
      if (error) return { success: false, error: error.message };
      return { success: true };
    }

    setUser({
      id: `usr-${Date.now()}`,
      email,
      fullName: email.split('@')[0],
      role: 'Operations Engineer',
      factoryName: 'Apex Automotive Plant #4',
    });
    setIsLoading(false);
    return { success: true };
  };

  const signUpWithEmail = async (email: string, password: string, fullName: string) => {
    setIsLoading(true);
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName, role: 'Technician' } },
      });
      setIsLoading(false);
      if (error) return { success: false, error: error.message };
      return { success: true };
    }

    setUser({
      id: `usr-${Date.now()}`,
      email,
      fullName,
      role: 'Technician',
      factoryName: 'Apex Automotive Plant #4',
    });
    setIsLoading(false);
    return { success: true };
  };

  const signInWithGoogle = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/chat` },
      });
    } else {
      setUser({
        id: `usr-google-${Date.now()}`,
        email: 'operator.google@factorygpt.app',
        fullName: 'Google Operator Account',
        role: 'Operations Engineer',
        factoryName: 'Apex Automotive Plant #4',
      });
    }
  };

  const signInWithMobileOtp = async (phone: string) => {
    setIsLoading(true);
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithOtp({ phone });
      setIsLoading(false);
      if (error) return { success: false, error: error.message };
      return { success: true };
    }

    setIsLoading(false);
    return { success: true };
  };

  const verifyMobileOtp = async (phone: string, token: string) => {
    setIsLoading(true);
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.verifyOtp({ phone, token, type: 'sms' });
      setIsLoading(false);
      if (error) return { success: false, error: error.message };
      return { success: true };
    }

    setUser({
      id: `usr-mobile-${Date.now()}`,
      email: `${phone}@factorygpt.app`,
      phone,
      fullName: `Operator (${phone})`,
      role: 'Plant Operator',
      factoryName: 'Apex Automotive Plant #4',
    });
    setIsLoading(false);
    return { success: true };
  };

  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signInWithMobileOtp,
        verifyMobileOtp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

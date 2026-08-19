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
  authProvider?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUpWithEmail: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
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
  signInWithGoogle: async () => ({ success: false }),
  signInWithMobileOtp: async () => ({ success: false }),
  verifyMobileOtp: async () => ({ success: false }),
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Restore local session cache if present
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('factorygpt_user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {}
      }
    }

    // 2. Check Supabase Auth active session
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data }: { data: { session: any } }) => {
        if (data.session?.user) {
          const profile: UserProfile = {
            id: data.session.user.id,
            email: data.session.user.email || '',
            phone: data.session.user.phone || '',
            fullName: data.session.user.user_metadata?.full_name || data.session.user.user_metadata?.name || 'Engineering Operator',
            role: data.session.user.user_metadata?.role || 'Technician',
            factoryName: 'Apex Automotive Plant #4',
            authProvider: data.session.user.app_metadata?.provider || 'supabase',
          };
          setUser(profile);
          if (typeof window !== 'undefined') {
            localStorage.setItem('factorygpt_user', JSON.stringify(profile));
          }
        }
        setIsLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
        if (session?.user) {
          const profile: UserProfile = {
            id: session.user.id,
            email: session.user.email || '',
            phone: session.user.phone || '',
            fullName: session.user.user_metadata?.full_name || session.user.user_metadata?.name || 'Engineering Operator',
            role: session.user.user_metadata?.role || 'Technician',
            factoryName: 'Apex Automotive Plant #4',
            authProvider: session.user.app_metadata?.provider || 'supabase',
          };
          setUser(profile);
          if (typeof window !== 'undefined') {
            localStorage.setItem('factorygpt_user', JSON.stringify(profile));
          }
        } else if (_event === 'SIGNED_OUT') {
          setUser(null);
          if (typeof window !== 'undefined') {
            localStorage.removeItem('factorygpt_user');
          }
        }
        setIsLoading(false);
      });

      return () => subscription.unsubscribe();
    } else {
      setIsLoading(false);
    }
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    setIsLoading(true);
    if (!email || !email.includes('@')) {
      setIsLoading(false);
      return { success: false, error: 'Please enter a valid work email address.' };
    }
    if (!password || password.length < 6) {
      setIsLoading(false);
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: password,
      });

      if (error) {
        setIsLoading(false);
        return { success: false, error: error.message };
      }

      if (data?.user) {
        const profile: UserProfile = {
          id: data.user.id,
          email: data.user.email || email,
          fullName: data.user.user_metadata?.full_name || email.split('@')[0],
          role: 'Technician',
          factoryName: 'Apex Automotive Plant #4',
        };
        setUser(profile);
        if (typeof window !== 'undefined') {
          localStorage.setItem('factorygpt_user', JSON.stringify(profile));
        }
        setIsLoading(false);
        return { success: true };
      }
    }

    setIsLoading(false);
    return { success: false, error: 'Unable to connect to database authentication server.' };
  };

  const signUpWithEmail = async (email: string, password: string, fullName: string) => {
    setIsLoading(true);

    // Call backend API endpoint for validation & database creation
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullName }),
      });

      const data = await res.json();

      if (!res.ok) {
        setIsLoading(false);
        return { success: false, error: data.error || 'Registration failed. Please check inputs.' };
      }

      if (data.user) {
        setUser(data.user);
        if (typeof window !== 'undefined') {
          localStorage.setItem('factorygpt_user', JSON.stringify(data.user));
        }
        setIsLoading(false);
        return { success: true };
      }

      setIsLoading(false);
      return { success: false, error: data.error || 'Failed to create user account.' };
    } catch (e: any) {
      setIsLoading(false);
      return { success: false, error: e.message || 'Server connection error during registration.' };
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          },
        },
      });

      if (error) {
        setIsLoading(false);
        return { success: false, error: error.message };
      }
      return { success: true };
    }

    setIsLoading(false);
    return { success: false, error: 'Google OAuth configuration missing on server.' };
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
    return { success: false, error: 'SMS service configuration missing.' };
  };

  const verifyMobileOtp = async (phone: string, token: string) => {
    setIsLoading(true);
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.verifyOtp({ phone, token, type: 'sms' });
      if (error) {
        setIsLoading(false);
        return { success: false, error: error.message };
      }

      if (data.user) {
        const profile: UserProfile = {
          id: data.user.id,
          email: data.user.email || `${phone}@factorygpt.app`,
          phone,
          fullName: `Operator (${phone})`,
          role: 'Plant Operator',
          factoryName: 'Apex Automotive Plant #4',
        };
        setUser(profile);
        if (typeof window !== 'undefined') {
          localStorage.setItem('factorygpt_user', JSON.stringify(profile));
        }
        setIsLoading(false);
        return { success: true };
      }
    }

    setIsLoading(false);
    return { success: false, error: 'OTP verification failed.' };
  };

  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('factorygpt_user');
    }
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

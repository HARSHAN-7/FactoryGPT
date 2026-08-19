'use client';

import React, { createContext, useContext, useState } from 'react';

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
  user: {
    id: 'usr-001',
    email: 'sarah.jenkins@factorygpt.app',
    fullName: 'Eng. Sarah Jenkins',
    role: 'Lead Operations Officer',
    factoryName: 'Apex Automotive Plant #4',
  },
  isAuthenticated: true,
  isLoading: false,
  signInMock: () => {},
  signOutMock: () => {},
});

/**
 * Open Access AuthProvider — Authentication Gate Removed.
 * All operators have instant, unrestricted access to Chat, RAG, Ingestion, and Admin modules.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user] = useState<UserProfile>({
    id: 'usr-001',
    email: 'sarah.jenkins@factorygpt.app',
    fullName: 'Eng. Sarah Jenkins',
    role: 'Lead Operations Officer',
    factoryName: 'Apex Automotive Plant #4',
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: true,
        isLoading: false,
        signInMock: () => {},
        signOutMock: () => {},
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

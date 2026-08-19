'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Mail, Lock, User, ShieldCheck, 
  AlertCircle, RefreshCw, ArrowRight, Chrome 
} from 'lucide-react';
import { useAuth } from '@/components/auth-provider';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function SignupPage() {
  const router = useRouter();
  const { signUpWithEmail, signInWithGoogle } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // 1. Frontend Field Validations
    if (!fullName || !fullName.trim()) {
      setErrorMsg('Full Name is required.');
      return;
    }

    if (!email || !email.trim()) {
      setErrorMsg('Work Email Address is required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('Please enter a valid work email address (e.g. operator@factory.com).');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    // 2. Submit to Backend Registration Endpoint
    setIsSubmitting(true);
    const res = await signUpWithEmail(email.trim(), password, fullName.trim());
    setIsSubmitting(false);

    if (res.success) {
      router.push('/chat');
    } else {
      setErrorMsg(res.error || 'Failed to create account.');
    }
  };

  const handleGoogleSignup = async () => {
    setErrorMsg(null);
    setIsGoogleSubmitting(true);
    const res = await signInWithGoogle();
    if (res && !res.success) {
      setIsGoogleSubmitting(false);
      setErrorMsg(res.error || 'Google authentication was canceled or unavailable.');
    }
  };

  return (
    <div className="min-h-screen bg-industrial-950 text-industrial-100 flex items-center justify-center p-4 font-sans bg-grid-pattern">
      <div className="w-full max-w-md space-y-6">
        
        {/* Brand Logo Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <img src="/logo.png" alt="FactoryGPT Official Logo" className="h-12 mx-auto object-contain" />
          </Link>
          <p className="text-xs font-mono text-industrial-400">
            Create Engineering Operator & Administrator Account
          </p>
        </div>

        {/* Auth Card */}
        <Card className="bg-industrial-900 border-industrial-800 p-6 shadow-2xl space-y-6">
          
          {/* Error Banner with Specific Useful Messages */}
          {errorMsg && (
            <div className="p-3.5 bg-red-950/90 border border-red-800 rounded-lg text-xs font-mono text-red-200 flex items-start gap-2.5 shadow-md">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{errorMsg}</div>
            </div>
          )}

          {/* Email Signup Form */}
          <form onSubmit={handleSignup} className="space-y-4 text-xs font-mono">
            <div className="space-y-1 text-left">
              <label className="text-industrial-300 block">Full Name</label>
              <Input
                type="text"
                placeholder="Eng. Sarah Jenkins"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                icon={<User className="w-4 h-4 text-industrial-500" />}
                required
                disabled={isSubmitting || isGoogleSubmitting}
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-industrial-300 block">Work Email Address</label>
              <Input
                type="email"
                placeholder="sarah.jenkins@apex-auto.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-4 h-4 text-industrial-500" />}
                required
                disabled={isSubmitting || isGoogleSubmitting}
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-industrial-300 block">Create Password (min. 6 characters)</label>
              <Input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="w-4 h-4 text-industrial-500" />}
                required
                disabled={isSubmitting || isGoogleSubmitting}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center font-bold py-3 text-xs uppercase tracking-wider"
              disabled={isSubmitting || isGoogleSubmitting}
              icon={isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
            >
              {isSubmitting ? 'Registering Account...' : 'Register Operator Account'}
            </Button>
          </form>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-industrial-800 w-full" />
            <span className="bg-industrial-900 px-3 text-[10px] font-mono text-industrial-500 uppercase shrink-0">
              Or Register With
            </span>
            <div className="border-t border-industrial-800 w-full" />
          </div>

          {/* Official Google OAuth Button */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={isSubmitting || isGoogleSubmitting}
            className="w-full py-3.5 rounded-lg bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs font-mono transition-all flex items-center justify-center gap-3 shadow-md disabled:opacity-50 cursor-pointer"
          >
            {isGoogleSubmitting ? (
              <RefreshCw className="w-4 h-4 animate-spin text-slate-700" />
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            )}
            <span>{isGoogleSubmitting ? 'Opening Google Account Chooser...' : 'Continue with Google'}</span>
          </button>

          {/* Footer Login Prompt */}
          <div className="pt-4 border-t border-industrial-800 text-center text-xs font-mono text-industrial-400">
            <span>Already have an account? </span>
            <Link href="/auth/login" className="text-gold-500 font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

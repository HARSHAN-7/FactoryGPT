'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Mail, Lock, Phone, ArrowRight, ShieldCheck, 
  AlertCircle, CheckCircle2, RefreshCw, KeyRound, Chrome 
} from 'lucide-react';
import { useAuth } from '@/components/auth-provider';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function LoginPage() {
  const router = useRouter();
  const { signInWithEmail, signInWithGoogle, signInWithMobileOtp, verifyMobileOtp, isLoading } = useAuth();

  const [activeTab, setActiveTab] = useState<'email' | 'google' | 'mobile'>('email');

  // Email form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Mobile form
  const [phone, setPhone] = useState('');
  const [otpToken, setOtpToken] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const res = await signInWithEmail(email, password);
    if (res.success) {
      router.push('/chat');
    } else {
      setErrorMsg(res.error || 'Invalid credentials');
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const res = await signInWithMobileOtp(phone);
    if (res.success) {
      setOtpSent(true);
    } else {
      setErrorMsg(res.error || 'Failed to send OTP to mobile number');
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const res = await verifyMobileOtp(phone, otpToken);
    if (res.success) {
      router.push('/chat');
    } else {
      setErrorMsg(res.error || 'Invalid OTP token');
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg(null);
    await signInWithGoogle();
    router.push('/chat');
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
            Industrial Plant Authentication & Authorization Portal
          </p>
        </div>

        {/* Auth Card */}
        <Card className="bg-industrial-900 border-industrial-800 p-6 shadow-2xl space-y-6">
          
          {/* Method Tabs */}
          <div className="grid grid-cols-3 gap-1 bg-industrial-950 p-1 rounded-lg border border-industrial-800 text-xs font-mono">
            <button
              onClick={() => { setActiveTab('email'); setErrorMsg(null); }}
              className={`py-2 rounded font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'email' ? 'bg-gold-600/20 text-gold-500 border border-gold-500/30' : 'text-industrial-400 hover:text-white'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </button>

            <button
              onClick={() => { setActiveTab('google'); setErrorMsg(null); }}
              className={`py-2 rounded font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'google' ? 'bg-gold-600/20 text-gold-500 border border-gold-500/30' : 'text-industrial-400 hover:text-white'
              }`}
            >
              <Chrome className="w-3.5 h-3.5" />
              <span>Google</span>
            </button>

            <button
              onClick={() => { setActiveTab('mobile'); setErrorMsg(null); }}
              className={`py-2 rounded font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'mobile' ? 'bg-gold-600/20 text-gold-500 border border-gold-500/30' : 'text-industrial-400 hover:text-white'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Mobile OTP</span>
            </button>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="p-3 bg-red-950/80 border border-red-800 rounded text-xs font-mono text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Tab 1: Email & Password Form */}
          {activeTab === 'email' && (
            <form onSubmit={handleEmailLogin} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-industrial-300 block">Operator Email Address</label>
                <Input
                  type="email"
                  placeholder="operator@factory.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="w-4 h-4 text-industrial-500" />}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-industrial-300 block">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<Lock className="w-4 h-4 text-industrial-500" />}
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full justify-center font-bold"
                disabled={isLoading}
                icon={isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
              >
                {isLoading ? 'Authenticating...' : 'Sign In with Email'}
              </Button>
            </form>
          )}

          {/* Tab 2: Google OAuth */}
          {activeTab === 'google' && (
            <div className="space-y-4 py-4 text-center">
              <p className="text-xs text-industrial-400 font-mono">
                One-click OAuth authentication for plant operators and engineers.
              </p>
              <button
                onClick={handleGoogleLogin}
                className="w-full py-3.5 rounded-lg bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs font-mono transition-all flex items-center justify-center gap-3 shadow-lg"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google Account</span>
              </button>
            </div>
          )}

          {/* Tab 3: Mobile OTP Login */}
          {activeTab === 'mobile' && (
            <div className="space-y-4 text-xs font-mono">
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-industrial-300 block">Mobile Phone Number</label>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      icon={<Phone className="w-4 h-4 text-industrial-500" />}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full justify-center font-bold"
                    disabled={isLoading}
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Send One-Time OTP Code
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-industrial-300 block">Enter 6-Digit OTP Code</label>
                    <Input
                      type="text"
                      placeholder="123456"
                      value={otpToken}
                      onChange={(e) => setOtpToken(e.target.value)}
                      icon={<KeyRound className="w-4 h-4 text-industrial-500" />}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full justify-center font-bold"
                    disabled={isLoading}
                    icon={<CheckCircle2 className="w-4 h-4" />}
                  >
                    Verify & Sign In
                  </Button>
                </form>
              )}
            </div>
          )}

          {/* Footer Signup Prompt */}
          <div className="pt-4 border-t border-industrial-800 text-center text-xs font-mono text-industrial-400">
            <span>Don't have an account? </span>
            <Link href="/auth/signup" className="text-gold-500 font-bold hover:underline">
              Create Account
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

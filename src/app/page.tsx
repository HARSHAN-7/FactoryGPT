'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Construction, ArrowUpRight, Play, TrendingUp, Cpu, 
  CheckCircle2, Activity, ShieldAlert, BarChart3, Database, 
  Layers, Search, Sliders, Zap, Wrench, RefreshCw, ChevronDown,
  Mail, Lock, Phone, Chrome, AlertCircle, KeyRound, UserCheck, ShieldCheck
} from 'lucide-react';
import { LandingNav } from '@/components/navigation/LandingNav';
import { useAuth } from '@/components/auth-provider';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function LandingPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, signInWithEmail, signUpWithEmail, signInWithGoogle, signInWithMobileOtp, verifyMobileOtp } = useAuth();

  // Auth Portal States for Gate
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [activeTab, setActiveTab] = useState<'email' | 'google' | 'mobile'>('email');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otpToken, setOtpToken] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (authMode === 'signup' && (!fullName || !fullName.trim())) {
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

    setIsSubmitting(true);
    if (authMode === 'login') {
      const res = await signInWithEmail(email.trim(), password);
      setIsSubmitting(false);
      if (res.success) {
        router.push('/chat');
      } else {
        setErrorMsg(res.error || 'Invalid email or password.');
      }
    } else {
      const res = await signUpWithEmail(email.trim(), password, fullName.trim());
      setIsSubmitting(false);
      if (res.success) {
        router.push('/chat');
      } else {
        setErrorMsg(res.error || 'Failed to create account.');
      }
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!phone || phone.trim().length < 8) {
      setErrorMsg('Please enter a valid mobile phone number.');
      return;
    }

    setIsSubmitting(true);
    const res = await signInWithMobileOtp(phone.trim());
    setIsSubmitting(false);

    if (res.success) setOtpSent(true);
    else setErrorMsg(res.error || 'Failed to send OTP to mobile number');
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!otpToken || otpToken.trim().length < 4) {
      setErrorMsg('Please enter the 6-digit OTP code.');
      return;
    }

    setIsSubmitting(true);
    const res = await verifyMobileOtp(phone.trim(), otpToken.trim());
    setIsSubmitting(false);

    if (res.success) router.push('/chat');
    else setErrorMsg(res.error || 'Invalid or expired OTP token');
  };

  const handleGoogleAuth = async () => {
    setErrorMsg(null);
    setIsGoogleSubmitting(true);
    const res = await signInWithGoogle();
    if (res && !res.success) {
      setIsGoogleSubmitting(false);
      setErrorMsg(res.error || 'Google authentication was canceled or unavailable.');
    }
  };

  // If NOT authenticated, show Mandatory Authentication Portal Gate FIRST with crisp contrast & fitting layout
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-industrial-950 text-industrial-100 flex flex-col justify-between font-sans bg-grid-pattern selection:bg-gold-600 selection:text-white">
        <LandingNav />

        <main className="flex-1 flex items-center justify-center p-4 sm:p-8 my-auto">
          <div className="w-full max-w-md space-y-6">
            
            {/* Header Title & Clear Crisp Logo View */}
            <div className="text-center space-y-3">
              <img
                src="/logo.png"
                alt="FactoryGPT Official Logo"
                className="h-14 sm:h-16 w-auto mx-auto object-contain drop-shadow-xl"
              />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-industrial-900 border border-gold-500/40 text-xs text-gold-500 font-mono font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-gold-500 animate-status-pulse" />
                <span>INDUSTRIAL OPERATOR AUTHENTICATION GATE</span>
              </div>
              <p className="text-xs font-mono text-industrial-300 font-medium">
                Log in or register an operator account to unlock FactoryGPT.
              </p>
            </div>

            {/* Login & Registration Portal Card */}
            <Card className="bg-industrial-900 border-industrial-800 p-6 sm:p-8 shadow-2xl space-y-6 gold-glow rounded-2xl">
              
              {/* Mode Toggle (Login vs Registration) */}
              <div className="flex items-center justify-center border-b border-industrial-800 pb-4 gap-6 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => { setAuthMode('login'); setErrorMsg(null); }}
                  className={`pb-1 font-bold tracking-wider transition-all ${
                    authMode === 'login' ? 'text-gold-500 border-b-2 border-gold-500 scale-105' : 'text-industrial-400 hover:text-white'
                  }`}
                >
                  LOGIN PORTAL
                </button>
                <span className="text-industrial-700">|</span>
                <button
                  type="button"
                  onClick={() => { setAuthMode('signup'); setErrorMsg(null); }}
                  className={`pb-1 font-bold tracking-wider transition-all ${
                    authMode === 'signup' ? 'text-gold-500 border-b-2 border-gold-500 scale-105' : 'text-industrial-400 hover:text-white'
                  }`}
                >
                  REGISTRATION PORTAL
                </button>
              </div>

              {/* Login Method Tabs */}
              <div className="grid grid-cols-3 gap-1 bg-industrial-950 p-1.5 rounded-xl border border-industrial-800 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => { setActiveTab('email'); setErrorMsg(null); }}
                  className={`py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'email' ? 'bg-gold-600/20 text-gold-500 border border-gold-500/40 shadow-sm' : 'text-industrial-400 hover:text-white'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('google'); setErrorMsg(null); }}
                  className={`py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'google' ? 'bg-gold-600/20 text-gold-500 border border-gold-500/40 shadow-sm' : 'text-industrial-400 hover:text-white'
                  }`}
                >
                  <Chrome className="w-3.5 h-3.5" />
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('mobile'); setErrorMsg(null); }}
                  className={`py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'mobile' ? 'bg-gold-600/20 text-gold-500 border border-gold-500/40 shadow-sm' : 'text-industrial-400 hover:text-white'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Mobile OTP</span>
                </button>
              </div>

              {/* High Contrast Clear Error Banner */}
              {errorMsg && (
                <div className="p-3.5 bg-red-950/90 border border-red-800 rounded-xl text-xs font-mono text-red-200 flex items-start gap-2.5 shadow-md text-left">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div className="leading-relaxed font-semibold">{errorMsg}</div>
                </div>
              )}

              {/* Email Form */}
              {activeTab === 'email' && (
                <form onSubmit={handleEmailAuth} className="space-y-4 text-xs font-mono">
                  {authMode === 'signup' && (
                    <div className="space-y-1 text-left">
                      <label className="text-industrial-200 font-semibold block">Full Name</label>
                      <Input
                        type="text"
                        placeholder="Eng. Sarah Jenkins"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        disabled={isSubmitting || isGoogleSubmitting}
                        className="bg-industrial-950 border-industrial-700 text-white font-sans text-sm focus:border-gold-500"
                      />
                    </div>
                  )}

                  <div className="space-y-1 text-left">
                    <label className="text-industrial-200 font-semibold block">Work Email Address</label>
                    <Input
                      type="email"
                      placeholder="operator@factory.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      icon={<Mail className="w-4 h-4 text-gold-500" />}
                      required
                      disabled={isSubmitting || isGoogleSubmitting}
                      className="bg-industrial-950 border-industrial-700 text-white font-sans text-sm focus:border-gold-500"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-industrial-200 font-semibold block">Password (min. 6 characters)</label>
                    <Input
                      type="password"
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      icon={<Lock className="w-4 h-4 text-gold-500" />}
                      required
                      disabled={isSubmitting || isGoogleSubmitting}
                      className="bg-industrial-950 border-industrial-700 text-white font-sans text-sm focus:border-gold-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full justify-center font-extrabold py-3 text-xs uppercase tracking-wider shadow-lg shadow-gold-600/20"
                    disabled={isSubmitting || isGoogleSubmitting}
                    icon={isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                  >
                    {isSubmitting
                      ? 'Authenticating Account...'
                      : authMode === 'login'
                      ? 'Sign In & Unlock FactoryGPT'
                      : 'Register Operator Account'}
                  </Button>
                </form>
              )}

              {/* Official Google OAuth Button */}
              {activeTab === 'google' && (
                <div className="space-y-4 py-4 text-center">
                  <p className="text-xs text-industrial-300 font-mono font-medium">
                    Official Google Identity & Account Chooser Authentication.
                  </p>
                  <button
                    type="button"
                    onClick={handleGoogleAuth}
                    disabled={isGoogleSubmitting}
                    className="w-full py-3.5 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-bold text-xs font-mono transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50 cursor-pointer"
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
                </div>
              )}

              {/* Mobile OTP */}
              {activeTab === 'mobile' && (
                <div className="space-y-4 text-xs font-mono">
                  {!otpSent ? (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                      <div className="space-y-1 text-left">
                        <label className="text-industrial-200 font-semibold block">Mobile Phone Number</label>
                        <Input
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          icon={<Phone className="w-4 h-4 text-gold-500" />}
                          required
                          disabled={isSubmitting}
                          className="bg-industrial-950 border-industrial-700 text-white font-sans text-sm focus:border-gold-500"
                        />
                      </div>
                      <Button
                        type="submit"
                        variant="primary"
                        className="w-full justify-center font-bold py-3 uppercase text-xs"
                        disabled={isSubmitting}
                        icon={isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ArrowUpRight className="w-4 h-4" />}
                      >
                        Send Mobile OTP Code
                      </Button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                      <div className="space-y-1 text-left">
                        <label className="text-industrial-200 font-semibold block">Enter 6-Digit OTP Code</label>
                        <Input
                          type="text"
                          placeholder="123456"
                          value={otpToken}
                          onChange={(e) => setOtpToken(e.target.value)}
                          icon={<KeyRound className="w-4 h-4 text-gold-500" />}
                          required
                          disabled={isSubmitting}
                          className="bg-industrial-950 border-industrial-700 text-white font-sans text-sm focus:border-gold-500"
                        />
                      </div>
                      <Button
                        type="submit"
                        variant="primary"
                        className="w-full justify-center font-bold py-3 uppercase text-xs"
                        disabled={isSubmitting}
                        icon={isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                      >
                        Verify OTP & Unlock FactoryGPT
                      </Button>
                    </form>
                  )}
                </div>
              )}

            </Card>
          </div>
        </main>

        <footer className="py-6 border-t border-industrial-800 text-center text-xs font-mono text-industrial-400">
          © 2026 FactoryGPT Industrial Security Gate. All Accounts Stored in Supabase Database.
        </footer>
      </div>
    );
  }

  // Once Authenticated, render full FactoryGPT System
  return (
    <div className="min-h-screen bg-industrial-950 text-industrial-100 flex flex-col font-sans selection:bg-gold-600 selection:text-white bg-grid-pattern">
      {/* Header Navigation matching template */}
      <LandingNav />

      {/* Hero Section */}
      <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Call-to-actions */}
          <div className="lg:col-span-5 text-left space-y-6">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-industrial-900 border border-gold-500/40 text-xs text-gold-500 font-mono font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-gold-500 animate-status-pulse" />
              <span>AI FOR SMARTER MANUFACTURING</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Run Your Factory.<br />
              <span className="text-gold-500 font-extrabold">Smarter with AI.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-industrial-300 font-normal leading-relaxed">
              FactoryGPT brings the power of AI to your production line. Optimize operations, predict issues, and make data-driven decisions in real-time.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <Link href="/chat" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gold-600 hover:bg-gold-700 text-industrial-950 font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-xl shadow-gold-600/25">
                  <span>Open FactoryGPT Assistant</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </Link>

              <Link href="/admin" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-industrial-900 border border-industrial-700 hover:border-gold-500/50 text-white font-bold text-sm transition-all flex items-center justify-center gap-2">
                  <span>Admin Portal</span>
                  <Database className="w-4 h-4 text-gold-500" />
                </button>
              </Link>
            </div>

            {/* Trusted by Industry Leaders */}
            <div className="pt-8 border-t border-industrial-800/80 space-y-3">
              <div className="text-[11px] font-mono text-industrial-400 tracking-wider uppercase font-bold">
                TRUSTED BY INDUSTRY LEADERS
              </div>
              <div className="flex flex-wrap items-center gap-6 text-industrial-300 font-mono font-bold text-sm">
                <span className="hover:text-white transition-colors">SIEMENS</span>
                <span className="hover:text-white transition-colors">ABB</span>
                <span className="hover:text-white transition-colors">TATA</span>
                <span className="hover:text-white transition-colors">Honeywell</span>
                <span className="hover:text-white transition-colors">Schneider</span>
              </div>
            </div>
          </div>

          {/* Right Column: High Resolution Smart Factory 3D Render Image */}
          <div className="lg:col-span-7 relative">
            <div className="relative mx-auto rounded-2xl bg-industrial-900 border border-industrial-800 p-2 sm:p-3 gold-glow overflow-hidden shadow-2xl">
              <div className="relative rounded-xl overflow-hidden border border-industrial-800/80 bg-industrial-950">
                <img
                  src="/smart-factory-hero.png"
                  alt="FactoryGPT Smart Automated 3D Factory"
                  className="w-full h-auto object-cover rounded-xl shadow-2xl hover:scale-[1.01] transition-transform duration-300"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Highlights Bar */}
      <section className="border-y border-industrial-800 bg-industrial-900/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-4 rounded-xl bg-industrial-900 border border-industrial-800 flex items-start gap-4 hover:border-gold-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-gold-600/10 border border-gold-500/30 flex items-center justify-center text-gold-500 shrink-0">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Real-time Analytics</div>
              <div className="text-xs text-industrial-300 mt-1">Monitor every machine and process in real-time.</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-industrial-900 border border-industrial-800 flex items-start gap-4 hover:border-gold-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-gold-600/10 border border-gold-500/30 flex items-center justify-center text-gold-500 shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Predictive Maintenance</div>
              <div className="text-xs text-industrial-300 mt-1">AI predicts failures before they happen.</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-industrial-900 border border-industrial-800 flex items-start gap-4 hover:border-gold-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-gold-600/10 border border-gold-500/30 flex items-center justify-center text-gold-500 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Process Optimization</div>
              <div className="text-xs text-industrial-300 mt-1">Optimize workflows and increase productivity.</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-industrial-900 border border-industrial-800 flex items-start gap-4 hover:border-gold-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-gold-600/10 border border-gold-500/30 flex items-center justify-center text-gold-500 shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Seamless Integration</div>
              <div className="text-xs text-industrial-300 mt-1">Works with your existing systems and sensors.</div>
            </div>
          </div>

        </div>
      </section>

      {/* Section 2: Powerful Insights & Real-Time Dashboard Preview */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-6 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-gold-500 font-bold">
              <span>⦿ POWERFUL INSIGHTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Data. AI. Results.
            </h2>
            <p className="text-base text-industrial-300 font-normal">
              FactoryGPT turns your factory data into actionable insights that drive real results.
            </p>
          </div>

          {/* 4 Key Stat Counters */}
          <div className="lg:col-span-6 grid grid-cols-4 gap-4 text-center">
            <div className="p-3.5 rounded-xl bg-industrial-900 border border-industrial-800">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-gold-500">+32%</div>
              <div className="text-[11px] text-industrial-300 font-semibold mt-1">Productivity</div>
            </div>
            <div className="p-3.5 rounded-xl bg-industrial-900 border border-industrial-800">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-gold-500">-24%</div>
              <div className="text-[11px] text-industrial-300 font-semibold mt-1">Downtime</div>
            </div>
            <div className="p-3.5 rounded-xl bg-industrial-900 border border-industrial-800">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-gold-500">+18%</div>
              <div className="text-[11px] text-industrial-300 font-semibold mt-1">Quality</div>
            </div>
            <div className="p-3.5 rounded-xl bg-industrial-900 border border-industrial-800">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-gold-500">-21%</div>
              <div className="text-[11px] text-industrial-300 font-semibold mt-1">Energy Cost</div>
            </div>
          </div>
        </div>

        {/* Real-time Dashboard Interface Preview Mockup */}
        <div className="rounded-2xl border border-industrial-800 bg-industrial-900 p-4 sm:p-6 shadow-2xl space-y-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Mock Dashboard Sidebar */}
            <div className="lg:col-span-3 bg-industrial-950 p-4 rounded-xl border border-industrial-800 space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2 pb-3 mb-2 border-b border-industrial-800 text-white font-bold">
                <Construction className="w-4 h-4 text-gold-500" />
                <span>FactoryGPT</span>
              </div>
              <div className="px-3 py-2 rounded-lg bg-gold-600/15 border border-gold-500/40 text-gold-500 font-bold flex items-center gap-2">
                <span>Overview</span>
              </div>
              <div className="px-3 py-2 text-industrial-300 hover:text-white cursor-pointer font-medium">Production</div>
              <div className="px-3 py-2 text-industrial-300 hover:text-white cursor-pointer font-medium">Machines</div>
              <div className="px-3 py-2 text-industrial-300 hover:text-white cursor-pointer font-medium">Analytics</div>
              <div className="px-3 py-2 text-industrial-300 hover:text-white cursor-pointer font-medium">Alerts</div>
              <div className="px-3 py-2 text-industrial-300 hover:text-white cursor-pointer font-medium">Reports</div>
              <div className="px-3 py-2 text-industrial-300 hover:text-white cursor-pointer font-medium">Settings</div>
            </div>

            {/* Mock Main Metrics Grid */}
            <div className="lg:col-span-9 space-y-6">
              
              {/* 4 Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-industrial-950 border border-industrial-800 space-y-1 text-left">
                  <div className="text-[10px] font-mono text-industrial-400 font-semibold">Production Efficiency</div>
                  <div className="text-2xl font-bold font-mono text-white">98.6%</div>
                  <div className="text-[10px] text-emerald-400 font-mono font-bold">↑ 12.5%</div>
                </div>

                <div className="p-4 rounded-xl bg-industrial-950 border border-industrial-800 space-y-1 text-left">
                  <div className="text-[10px] font-mono text-industrial-400 font-semibold">Total Output</div>
                  <div className="text-2xl font-bold font-mono text-white">24.5K</div>
                  <div className="text-[10px] text-emerald-400 font-mono font-bold">↑ 8.4%</div>
                </div>

                <div className="p-4 rounded-xl bg-industrial-950 border border-industrial-800 space-y-1 text-left">
                  <div className="text-[10px] font-mono text-industrial-400 font-semibold">Active Machines</div>
                  <div className="text-2xl font-bold font-mono text-white">128</div>
                  <div className="text-[10px] text-emerald-400 font-mono font-bold">↑ 3.7%</div>
                </div>

                <div className="p-4 rounded-xl bg-industrial-950 border border-industrial-800 space-y-1 text-left">
                  <div className="text-[10px] font-mono text-industrial-400 font-semibold">Alerts</div>
                  <div className="text-2xl font-bold font-mono text-white">3</div>
                  <div className="text-[10px] text-red-400 font-mono font-bold">↓ 25%</div>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Production Trend Line Chart */}
                <div className="md:col-span-2 p-4 rounded-xl bg-industrial-950 border border-industrial-800 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white font-bold">Production Trend</span>
                    <span className="text-industrial-300 font-semibold flex items-center gap-1 border border-industrial-700 px-2.5 py-1 rounded-md bg-industrial-900">This Week <ChevronDown className="w-3 h-3 text-gold-500" /></span>
                  </div>
                  {/* SVG Wave Sparkline Chart */}
                  <div className="h-36 w-full flex items-end">
                    <svg className="w-full h-full text-gold-500" viewBox="0 0 400 100" fill="none">
                      <path d="M0 80 Q 50 20, 100 60 T 200 40 T 300 70 T 400 20" stroke="currentColor" strokeWidth="3" fill="none" />
                    </svg>
                  </div>
                </div>

                {/* Machine Status Donut Chart */}
                <div className="p-4 rounded-xl bg-industrial-950 border border-industrial-800 space-y-4">
                  <div className="text-xs font-mono text-white font-bold text-left">Machine Status</div>
                  <div className="flex items-center justify-center relative py-2">
                    <div className="w-24 h-24 rounded-full border-8 border-gold-500 flex items-center justify-center text-center">
                      <div>
                        <div className="text-lg font-bold font-mono text-white">128</div>
                        <div className="text-[9px] text-industrial-400 font-semibold">Total</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-[11px] font-mono text-industrial-300 text-left font-medium">
                    <div className="flex justify-between"><span>● Running</span><span className="text-white font-bold">90</span></div>
                    <div className="flex justify-between"><span>● Idle</span><span className="text-white font-bold">21</span></div>
                    <div className="flex justify-between"><span>● Maintenance</span><span className="text-white font-bold">12</span></div>
                    <div className="flex justify-between"><span>● Offline</span><span className="text-white font-bold">5</span></div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-industrial-800 bg-industrial-950 py-8 px-4 text-center text-xs font-mono text-industrial-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© 2026 FactoryGPT Industrial AI Platform. All Rights Reserved.</div>
          <div className="flex items-center gap-6">
            <Link href="/chat" className="hover:text-gold-500 transition-colors">Open Assistant</Link>
            <Link href="/admin" className="hover:text-gold-500 transition-colors">Admin Portal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

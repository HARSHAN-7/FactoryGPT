'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Volume2, VolumeX, X, SkipForward } from 'lucide-react';

export function IntroVideoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if intro has already been shown in this session
    const hasSeen = sessionStorage.getItem('hasSeenIntro');
    if (!hasSeen) {
      setIsOpen(true);
    }
  }, []);

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    sessionStorage.setItem('hasSeenIntro', 'true');
    setIsOpen(false);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center font-sans overflow-hidden">
      {/* Full-screen Background Video */}
      <video
        ref={videoRef}
        src="/intro.mp4"
        autoPlay
        muted={isMuted}
        playsInline
        onEnded={handleSkip}
        className="w-full h-full object-cover"
      />

      {/* Top Controls Overlay */}
      <div className="absolute top-6 right-6 z-10 flex items-center gap-4">
        {/* Mute/Unmute Toggle */}
        <button
          onClick={toggleMute}
          className="px-4 py-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white text-xs font-mono backdrop-blur-md transition-all flex items-center gap-2"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-gold-500" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          <span>{isMuted ? 'Unmute Audio' : 'Audio On'}</span>
        </button>

        {/* Skip Intro Button */}
        <button
          onClick={handleSkip}
          className="px-6 py-2.5 rounded-full bg-gold-600 hover:bg-gold-700 text-industrial-950 font-bold text-sm shadow-2xl transition-all flex items-center gap-2"
        >
          <span>Skip Intro</span>
          <SkipForward className="w-4 h-4 fill-current" />
        </button>
      </div>

      {/* Bottom Brand Watermark Overlay */}
      <div className="absolute bottom-6 left-6 z-10 flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
        <img src="/logo.png" alt="FactoryGPT Logo" className="h-7 w-auto object-contain" />
        <span className="text-xs font-mono text-industrial-300">FactoryGPT Industrial AI Platform</span>
      </div>
    </div>
  );
}

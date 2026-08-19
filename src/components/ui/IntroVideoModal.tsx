'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FastForward, X, Play, Volume2, VolumeX } from 'lucide-react';

interface IntroVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function IntroVideoModal({ isOpen, onClose }: IntroVideoModalProps) {
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // If autoplay fails, mute and retry
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(() => {});
        }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center font-sans animate-in fade-in duration-300">
      
      {/* Top Header Bar with Skip Intro & Mute Controls */}
      <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-auto">
        {/* Brand Label */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="FactoryGPT Logo" className="h-9 w-auto object-contain" />
          <span className="text-xs font-mono text-gold-500 font-bold bg-industrial-900/80 px-3 py-1 rounded-full border border-gold-500/30">
            ● INDUSTRIAL INTRO FILM
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.muted = !videoRef.current.muted;
                setIsMuted(videoRef.current.muted);
              }
            }}
            className="px-3 py-2 rounded-full bg-industrial-900/80 hover:bg-industrial-800 border border-industrial-700 text-white text-xs font-mono flex items-center gap-1.5 transition-all"
            title="Toggle Audio"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-industrial-400" /> : <Volume2 className="w-4 h-4 text-gold-500" />}
            <span>{isMuted ? 'Unmute' : 'Mute'}</span>
          </button>

          {/* Skip Intro Button */}
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-gold-600 hover:bg-gold-700 text-industrial-950 font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-gold-600/30 transition-all hover:scale-105"
          >
            <span>Skip Intro</span>
            <FastForward className="w-4 h-4 fill-current" />
          </button>
        </div>
      </div>

      {/* Video Container */}
      <div className="relative w-full max-w-5xl aspect-video mx-4 rounded-2xl overflow-hidden shadow-2xl border border-industrial-800 bg-black">
        <video
          ref={videoRef}
          src="/intro.mp4"
          playsInline
          controls
          onEnded={onClose}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

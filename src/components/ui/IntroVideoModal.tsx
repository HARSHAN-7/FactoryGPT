'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FastForward, Volume2, VolumeX, Play, AlertCircle, RefreshCw } from 'lucide-react';

interface IntroVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function IntroVideoModal({ isOpen, onClose }: IntroVideoModalProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      setHasError(false);
      setIsLoadingVideo(true);
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
      setIsMuted(true);

      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsLoadingVideo(false);
          })
          .catch((err) => {
            console.warn('Autoplay prevented by browser:', err);
            setIsPlaying(false);
            setIsLoadingVideo(false);
          });
      }
    }
  }, [isOpen]);

  const handleToggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);

      if (!isPlaying) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const handlePlayManual = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setHasError(true));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center font-sans animate-in fade-in duration-300">
      
      {/* Top Header Controls Bar */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 z-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="FactoryGPT Logo" className="h-9 w-auto object-contain" />
          <span className="hidden sm:inline-block text-xs font-mono text-gold-500 font-bold bg-industrial-900/90 px-3 py-1 rounded-full border border-gold-500/30">
            ● FACTORYGPT INTRO FILM
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Mute/Unmute Button */}
          <button
            type="button"
            onClick={handleToggleMute}
            className="px-3.5 py-2 rounded-full bg-industrial-900/90 hover:bg-industrial-800 border border-industrial-700 text-white text-xs font-mono flex items-center gap-1.5 transition-all shadow-md"
            title="Toggle Audio"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-industrial-400" /> : <Volume2 className="w-4 h-4 text-gold-500" />}
            <span>{isMuted ? 'Sound OFF (Click for Audio)' : 'Sound ON'}</span>
          </button>

          {/* Skip Intro Button */}
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-gold-600 hover:bg-gold-700 text-industrial-950 font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-gold-600/30 transition-all hover:scale-105 cursor-pointer"
          >
            <span>Skip Intro</span>
            <FastForward className="w-4 h-4 fill-current" />
          </button>
        </div>
      </div>

      {/* Video Container */}
      <div className="relative w-full max-w-5xl aspect-video mx-4 rounded-2xl overflow-hidden shadow-2xl border border-industrial-800 bg-black flex items-center justify-center">
        
        <video
          ref={videoRef}
          preload="auto"
          autoPlay
          muted
          playsInline
          controls
          onEnded={onClose}
          onError={() => setHasError(true)}
          onPlay={() => { setIsPlaying(true); setIsLoadingVideo(false); }}
          onWaiting={() => setIsLoadingVideo(true)}
          onPlaying={() => setIsLoadingVideo(false)}
          className="w-full h-full object-cover"
        >
          {/* Stream Source 1: HTTP 206 Range Stream Endpoint */}
          <source src="/api/video" type="video/mp4" />
          {/* Stream Source 2: Direct Static File Asset */}
          <source src="/intro.mp4" type="video/mp4" />
          Your browser does not support HTML5 video streaming.
        </video>

        {/* Loading Spinner Indicator */}
        {isLoadingVideo && !hasError && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center text-gold-500 font-mono text-xs gap-2">
            <RefreshCw className="w-6 h-6 animate-spin" />
            <span>Buffering Intro Video Stream...</span>
          </div>
        )}

        {/* Play Overlay if video paused */}
        {!isPlaying && !isLoadingVideo && !hasError && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4 z-10">
            <button
              onClick={handlePlayManual}
              className="w-20 h-20 rounded-full bg-gold-600 text-industrial-950 flex items-center justify-center shadow-2xl shadow-gold-600/50 hover:scale-110 transition-transform"
            >
              <Play className="w-10 h-10 fill-current ml-1" />
            </button>
            <span className="text-xs font-mono text-white font-bold tracking-wider">
              CLICK TO PLAY INTRO FILM
            </span>
          </div>
        )}

        {/* Error Fallback */}
        {hasError && (
          <div className="absolute inset-0 bg-industrial-950 flex flex-col items-center justify-center p-6 text-center space-y-4 z-10 text-xs font-mono text-industrial-300">
            <AlertCircle className="w-10 h-10 text-red-400" />
            <div>
              <div className="text-white font-bold text-sm">Video Stream Buffering</div>
              <div className="text-industrial-400 mt-1">Please allow a few seconds for the video stream to load on your connection.</div>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-gold-600 text-industrial-950 font-bold text-xs uppercase"
            >
              Continue to FactoryGPT
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

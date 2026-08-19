'use client';

import React from 'react';
import { Mic, Volume2, Info } from 'lucide-react';
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VoiceModalPlaceholder({ isOpen, onClose }: VoiceModalProps) {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Hands-Free Voice AI Assistant"
      description="Voice Input & Speech Synthesis Controls"
    >
      <div className="space-y-6 text-center py-4">
        {/* Animated Mic Wave Pulse Placeholder */}
        <div className="mx-auto w-20 h-20 rounded-full bg-industrial-950 border-2 border-accent-orange flex items-center justify-center text-accent-orange shadow-lg shadow-orange-500/10 relative">
          <Mic className="w-10 h-10 animate-pulse" />
          <span className="absolute inset-0 rounded-full border border-accent-orange/40 animate-ping" />
        </div>

        <div className="space-y-2">
          <Badge variant="orange">PHASE 3 FEATURE</Badge>
          <h4 className="text-lg font-semibold text-white font-mono">Speech Recognition Engine</h4>
          <p className="text-xs text-industrial-300 max-w-sm mx-auto leading-relaxed">
            Hands-free voice recognition is scheduled for Phase 3. This module will transcribe factory floor audio and speak operating instructions aloud to technicians.
          </p>
        </div>

        <div className="p-3 bg-industrial-950 rounded border border-industrial-800 text-left text-xs font-mono text-industrial-400 space-y-1.5">
          <div className="flex items-center gap-2 text-industrial-200">
            <Info className="w-4 h-4 text-blue-400" />
            <span>Planned Voice Pipeline Architecture:</span>
          </div>
          <div>• STT: Web Speech API / Whisper Engine</div>
          <div>• TTS: Neural High-Noise Voice Model</div>
          <div>• Noise Cancellation: Industrial DSP Filter</div>
        </div>

        <div className="pt-2">
          <Button variant="secondary" onClick={onClose} className="w-full">
            Close Control Window
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

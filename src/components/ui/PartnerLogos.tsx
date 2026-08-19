'use client';

import React from 'react';

export function PartnerLogos() {
  return (
    <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-2">
      {/* Siemens Logo */}
      <div title="Siemens Industrial Automation" className="h-7 opacity-85 hover:opacity-100 transition-opacity flex items-center">
        <svg className="h-5 sm:h-6 w-auto" viewBox="0 0 160 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="24" fontFamily="Arial, Helvetica, sans-serif" fontSize="24" fontWeight="900" fill="#009999" letterSpacing="2">
            SIEMENS
          </text>
        </svg>
      </div>

      {/* ABB Logo */}
      <div title="ABB Robotics & Power" className="h-7 opacity-85 hover:opacity-100 transition-opacity flex items-center">
        <svg className="h-6 sm:h-7 w-auto" viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="25" fontFamily="Impact, Arial Black, sans-serif" fontSize="28" fontWeight="900" fill="#FF0000" letterSpacing="1">
            ABB
          </text>
        </svg>
      </div>

      {/* TATA Logo */}
      <div title="Tata Group Industry" className="h-7 opacity-85 hover:opacity-100 transition-opacity flex items-center gap-1.5">
        <svg className="h-6 w-auto" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="18" stroke="#003366" strokeWidth="3.5" fill="none" />
          <path d="M10 14 H30 M20 14 V30" stroke="#003366" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
        <span className="font-extrabold text-sm sm:text-base font-sans tracking-widest text-[#003366]">
          TATA
        </span>
      </div>

      {/* Honeywell Logo */}
      <div title="Honeywell Industrial Safety" className="h-7 opacity-85 hover:opacity-100 transition-opacity flex items-center">
        <svg className="h-5 sm:h-6 w-auto" viewBox="0 0 180 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="23" fontFamily="Arial, Helvetica, sans-serif" fontSize="23" fontWeight="900" fontStyle="italic" fill="#E2231A" letterSpacing="0.5">
            Honeywell
          </text>
        </svg>
      </div>

      {/* Schneider Electric Logo */}
      <div title="Schneider Electric Automation" className="h-7 opacity-85 hover:opacity-100 transition-opacity flex items-center gap-2">
        <svg className="h-6 w-auto" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="36" rx="6" fill="#3DCD58" />
          <path d="M8 18 H28 M18 8 V28" stroke="white" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <span className="font-extrabold text-xs sm:text-sm font-sans tracking-tight text-[#059669]">
          Schneider <span className="font-semibold text-slate-700">Electric</span>
        </span>
      </div>
    </div>
  );
}

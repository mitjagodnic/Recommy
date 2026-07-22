/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface AbstractAvatarProps {
  seed: number;
  revealStage: 'anonymous' | 'matched' | 'unveiled' | 'fully_revealed';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function AbstractAvatar({ seed, revealStage, className = '', size = 'md' }: AbstractAvatarProps) {
  
  // Decide dimensions based on sizes
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
  };

  const glowColor = seed === 1 ? 'from-emerald-700/35 to-amber-700/25' : seed === 2 ? 'from-teal-700/35 to-blue-700/25' : 'from-indigo-700/35 to-rose-700/25';

  // SVG artworks corresponding to candidate seeds
  const renderArt = () => {
    switch (seed) {
      case 1: // Elena (Landscape Architect) - Clay, Earth, Plants, Sand
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            {/* Clay pot/dome base */}
            <circle cx="50" cy="50" r="42" fill="url(#clayGrad)" />
            {/* Organic plant loops */}
            <path d="M50,90 C40,70 25,60 25,45 C25,30 35,25 50,45 C65,25 75,30 75,45 C75,60 60,70 50,90 Z" fill="url(#leafGrad)" opacity="0.85" />
            {/* Graphic sun circle */}
            <circle cx="50" cy="30" r="10" fill="#E6A15C" />
            
            <defs>
              <linearGradient id="clayGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C86A4B" />
                <stop offset="100%" stopColor="#E29E7D" />
              </linearGradient>
              <linearGradient id="leafGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#2E5A36" />
                <stop offset="100%" stopColor="#557F5D" />
              </linearGradient>
            </defs>
          </svg>
        );
      case 2: // Marcus (Climate VC) - Oceans, Tech, Sailing, Structure
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            {/* Deep sea blue disk */}
            <circle cx="50" cy="50" r="42" fill="url(#seaGrad)" />
            {/* Geometric triangle sails */}
            <path d="M30,75 L65,30 L65,75 Z" fill="url(#goldSail)" opacity="0.9" />
            <path d="M55,75 L75,45 L75,75 Z" fill="#E0F2FE" opacity="0.6" />
            {/* Structured modern dots */}
            <circle cx="35" cy="30" r="3" fill="#EEF2F6" />
            <circle cx="45" cy="25" r="2.5" fill="#EEF2F6" opacity="0.8" />
            <circle cx="55" cy="23" r="2" fill="#EEF2F6" opacity="0.6" />
 
            <defs>
              <linearGradient id="seaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0B4C5F" />
                <stop offset="100%" stopColor="#081E26" />
              </linearGradient>
              <linearGradient id="goldSail" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B45309" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
          </svg>
        );
      case 3: // Sasha (Psychologist) - Mind, Waves, Sourdough fermentation, Violet-indigo
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            {/* Deep twilight violet disk */}
            <circle cx="50" cy="50" r="42" fill="url(#violetGrad)" />
            {/* Fluid organic blob waves representing consciousness & fermentation */}
            <path d="M50,15 C65,15 80,30 80,48 C80,68 62,85 50,85 C30,85 20,68 20,48 C20,30 35,15 50,15 Z" fill="url(#fluidGrad)" opacity="0.75" />
            {/* Golden central glowing core */}
            <circle cx="50" cy="50" r="12" fill="#FFD700" className="animate-pulse" />

            <defs>
              <linearGradient id="violetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#311B92" />
                <stop offset="100%" stopColor="#1A237E" />
              </linearGradient>
              <linearGradient id="fluidGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D81B60" />
                <stop offset="100%" stopColor="#8E24AA" />
              </linearGradient>
            </defs>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <circle cx="50" cy="50" r="42" fill="url(#defaultGrad)" />
            <defs>
              <linearGradient id="defaultGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4B5563" />
                <stop offset="100%" stopColor="#1F2937" />
              </linearGradient>
            </defs>
          </svg>
        );
    }
  };

  const isFullyOpen = revealStage === 'unveiled' || revealStage === 'fully_revealed';

  return (
    <div className={`relative flex items-center justify-center select-none ${className} ${sizeClasses[size]}`}>
      {/* Background Pulse Glows */}
      {isFullyOpen && (
        <span className="absolute inset-0 rounded-full bg-amber-500/10 animate-ping pointer-events-none" />
      )}

      {/* Screen Aspect Ring Container */}
      <div className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden bg-zinc-950">
        
        {/* Render Stage views */}
        {revealStage === 'anonymous' ? (
          // 1. ANONYMOUS: Elegant swirling gradient representing mystery, no detail visible.
          <div className={`w-full h-full bg-gradient-to-tr ${glowColor} flex flex-col items-center justify-center p-3 text-center`}>
            <div className="absolute inset-0 backdrop-blur-md bg-zinc-950/20" />
            <div className="z-10 flex flex-col items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF416C] animate-pulse mb-1" />
              <div className="text-[9px] font-mono tracking-widest text-[#FFFDF6] uppercase font-black opacity-90">
                Recommy
              </div>
              <div className="text-[7px] font-mono text-zinc-500 tracking-wider">
                SECURE LOCK
              </div>
            </div>
          </div>
        ) : revealStage === 'matched' ? (
          // 2. MATCHED: Beautiful sharp art, but with a refined overlay layer of "reveal on tap" style or glass shimmer.
          <div className="w-full h-full relative">
            {renderArt()}
            {/* Premium geometric screen veil/shimmer */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950/40" />
            {/* Center icon indicator */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 bg-zinc-950/85 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF416C]" />
              <div className="text-[7.5px] font-mono font-black text-[#E1D8C4] tracking-wider uppercase">
                MUTUAL INTRO
              </div>
            </div>
          </div>
        ) : (
          // 3. UNVEILED / FULLY_REVEALED: Fully open art in its complete aesthetic glory, reflecting mutual conscious disclosure.
          <motion.div 
            initial={{ scale: 0.9, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-full h-full relative"
          >
            {renderArt()}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/30 via-transparent to-transparent" />
            
            {/* Sparkling badges */}
            <div className="absolute -top-1 -right-1 bg-amber-500 text-zinc-950 p-1 rounded-full shadow-lg flex items-center justify-center w-5 h-5">
              <span className="text-[10px]">✨</span>
            </div>
            
            {/* Trusted Stamp of disclosures */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-emerald-950/90 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
              <span className="text-[9px]">🛡️</span>
              <span className="text-[7px] font-mono font-bold text-[#E2F0D9] tracking-wider">
                UNLOCKED
              </span>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}

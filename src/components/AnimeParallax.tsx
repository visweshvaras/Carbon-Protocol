'use client';

import React, { useEffect, useRef } from 'react';
import { createTimeline, Timeline } from 'animejs';

interface AnimeParallaxProps {
  progress: number; // Overall scroll progress (0 to 1)
}

export default function AnimeParallax({ progress }: AnimeParallaxProps) {
  // SVG Elements Refs
  const sunRef = useRef<SVGCircleElement>(null);
  const cloudsRef = useRef<SVGGElement>(null);
  const mountainRef = useRef<SVGPathElement>(null);
  const hillsRef = useRef<SVGPathElement>(null);
  const foregroundRef = useRef<SVGGElement>(null);
  
  // Scrollytelling Refs
  const factoryRef = useRef<SVGGElement>(null);
  const factoryGearRef = useRef<SVGGElement>(null);
  const smogRef = useRef<SVGGElement>(null);
  
  const solarGridsRef = useRef<SVGGElement>(null);
  
  const aeroKunRef = useRef<SVGGElement>(null);
  const windGustsRef = useRef<SVGGElement>(null);
  
  const uraniumRef = useRef<SVGGElement>(null);
  
  const trashGoblinRef = useRef<SVGGElement>(null);
  const litterRef = useRef<SVGGElement>(null);
  
  const hydrogenRef = useRef<SVGGElement>(null);
  
  const acidRainRef = useRef<SVGGElement>(null);
  
  const biomassObaasanRef = useRef<SVGGElement>(null);
  const sproutRef = useRef<SVGGElement>(null);
  
  const hudChartRef = useRef<SVGGElement>(null);
  const chartBarsRef = useRef<SVGGElement>(null);
  
  const charPoseARef = useRef<SVGGElement>(null);
  const charPoseBRef = useRef<SVGGElement>(null);
  const charPoseCRef = useRef<SVGGElement>(null);
  const carbonDaemonRef = useRef<SVGGElement>(null);
  
  // Animation timeline controller
  const timelineRef = useRef<Timeline | null>(null);

  // Initialize Anime.js timeline mapping scroll positions
  useEffect(() => {
    const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (hasReducedMotion) return;

    if (
      !sunRef.current || !cloudsRef.current || !mountainRef.current || 
      !hillsRef.current || !foregroundRef.current || !factoryRef.current || 
      !factoryGearRef.current || !smogRef.current || !solarGridsRef.current ||
      !aeroKunRef.current || !windGustsRef.current || !uraniumRef.current ||
      !trashGoblinRef.current || !litterRef.current || !hydrogenRef.current ||
      !acidRainRef.current || !biomassObaasanRef.current || !sproutRef.current ||
      !hudChartRef.current || !chartBarsRef.current || 
      !charPoseARef.current || !charPoseBRef.current || !charPoseCRef.current ||
      !carbonDaemonRef.current
    ) return;

    // Timeline duration 0 to 1000ms mapping 0 to 80% scroll (the scrollytelling phase)
    const tl = createTimeline({
      autoplay: false,
      duration: 1000
    });

    tl
      // ==================== STAGE 0 (0% - 9% scroll: Welcome by Eco-Chan) ====================
      .add(charPoseARef.current, { opacity: [1, 0], duration: 90, easing: 'linear' }, 0)
      .add(charPoseBRef.current, { opacity: [0, 1], duration: 90, easing: 'linear' }, 70)

      // ==================== STAGE 1 (9% - 18% scroll: Scope 1 - Direct Combustion / Ray) ====================
      .add(factoryRef.current, { translateX: [800, 0], duration: 130, easing: 'easeOutQuad' }, 90)
      .add(factoryGearRef.current, { rotate: [0, 720], duration: 160, easing: 'linear' }, 110)
      .add(smogRef.current, { scale: [0, 1.4], translateY: [40, -120], opacity: [0, 0.75], duration: 130, easing: 'easeOutQuad' }, 120)

      // ==================== STAGE 2 (18% - 27% scroll: Scope 2 - Utility Power Grids / Solar-Senpai) ====================
      .add(solarGridsRef.current, { translateY: [200, 0], opacity: [0, 1], duration: 130, easing: 'easeOutBack' }, 180)

      // ==================== STAGE 3 (27% - 36% scroll: Scope 2 - Aero-Kun & Wind Turbine) ====================
      .add(aeroKunRef.current, { scale: [0, 1], opacity: [0, 1], duration: 130, easing: 'easeOutBack' }, 270)
      .add(windGustsRef.current, { translateX: [-200, 50], opacity: [0, 0.8], duration: 130, easing: 'easeOutQuad' }, 270)

      // ==================== STAGE 4 (36% - 45% scroll: Scope 2 - Uranium-Onee-san Base-load Nuclear) ====================
      .add(uraniumRef.current, { scale: [0, 1], opacity: [0, 1], duration: 130, easing: 'easeOutBack' }, 360)

      // ==================== STAGE 5 (45% - 54% scroll: Scope 3 - Value Chains / Trash Goblin) ====================
      .add(trashGoblinRef.current, { translateY: [-200, 0], scale: [0.5, 1], opacity: [0, 1], duration: 130, easing: 'easeOutBack' }, 450)
      .add(litterRef.current, { translateY: [-200, 240], rotate: [0, 360], opacity: [0, 1], duration: 130, easing: 'easeInQuad' }, 470)
      .add(charPoseBRef.current, { translateX: [0, -30], duration: 100, easing: 'easeOutQuad' }, 450)

      // ==================== STAGE 6 (54% - 63% scroll: Scope 3 - Hydrogen transport / H2-Senpai) ====================
      .add(hydrogenRef.current, { translateX: [500, 0], opacity: [0, 1], duration: 130, easing: 'easeOutBack' }, 540)

      // ==================== STAGE 7 (63% - 72% scroll: H2O-Chan & Acid Rain) ====================
      .add(acidRainRef.current, { translateY: [-100, 150], opacity: [0, 0.85], duration: 130, easing: 'linear' }, 630)
      .add(cloudsRef.current, { translateY: [0, -40], opacity: [0.8, 0.2], duration: 110, easing: 'linear' }, 630)

      // ==================== STAGE 8 (72% - 81% scroll: Biological Carbon Sinks / Biomass-Obaasan) ====================
      .add(biomassObaasanRef.current, { scale: [0, 1], opacity: [0, 1], duration: 130, easing: 'easeOutBack' }, 720)
      .add(sproutRef.current, { scale: [0, 1.2], opacity: [0, 1], duration: 130, easing: 'easeOutBack' }, 720)

      // ==================== STAGE 9 (81% - 90% scroll: Carbon-Daemon & Chart) ====================
      .add(carbonDaemonRef.current, { translateY: [-250, 0], scale: [0.6, 1.15], opacity: [0, 0.95], duration: 130, easing: 'easeOutBack' }, 810)
      .add(hudChartRef.current, { translateY: [300, 0], opacity: [0, 1], duration: 130, easing: 'easeOutBack' }, 810)
      .add(chartBarsRef.current, { scaleY: [0, 1], duration: 110, easing: 'easeOutExpo' }, 830)
      .add(sunRef.current, {
        translateY: [0, 120],
        translateX: [0, -40],
        scale: [1, 0.8],
        fill: ['#fef08a', '#f472b6'], // Yellow to Pink
        duration: 130,
        easing: 'linear'
      }, 810)

      // ==================== STAGE 10 (90% - 100% scroll: Deep Space Transition) ====================
      .add(foregroundRef.current, { translateY: [0, 350], duration: 120, easing: 'easeInQuad' }, 900)
      .add(mountainRef.current, { translateY: [0, 280], duration: 120, easing: 'easeInQuad' }, 905)
      .add(hillsRef.current, { translateY: [0, 290], duration: 120, easing: 'easeInQuad' }, 910)
      .add(factoryRef.current, { translateY: [0, 350], duration: 120, easing: 'easeInQuad' }, 905)
      .add(solarGridsRef.current, { translateY: [0, 350], duration: 120, easing: 'easeInQuad' }, 905)
      .add(aeroKunRef.current, { translateY: [0, 350], duration: 120, easing: 'easeInQuad' }, 905)
      .add(uraniumRef.current, { translateY: [0, 350], duration: 120, easing: 'easeInQuad' }, 905)
      .add(hydrogenRef.current, { translateY: [0, 350], duration: 120, easing: 'easeInQuad' }, 905)
      .add(windGustsRef.current, { opacity: [0.8, 0], duration: 80, easing: 'linear' }, 900)
      .add(trashGoblinRef.current, { translateY: [0, 350], duration: 120, easing: 'easeInQuad' }, 905)
      .add(biomassObaasanRef.current, { translateY: [0, 350], duration: 120, easing: 'easeInQuad' }, 905)
      .add(sproutRef.current, { translateY: [0, 350], duration: 120, easing: 'easeInQuad' }, 905)
      .add(acidRainRef.current, { opacity: [0.85, 0], duration: 80, easing: 'linear' }, 900)
      .add(smogRef.current, { opacity: [0.75, 0], translateY: [-120, -300], duration: 100, easing: 'linear' }, 900)
      .add(hudChartRef.current, { translateY: [0, 350], opacity: [1, 0], duration: 100, easing: 'easeInQuad' }, 900)
      .add(carbonDaemonRef.current, { translateY: [0, 350], opacity: [0.95, 0], duration: 100, easing: 'easeInQuad' }, 900)
      
      .add(charPoseBRef.current, { opacity: [1, 0], duration: 80, easing: 'linear' }, 900)
      .add(charPoseCRef.current, { opacity: [0, 1], translateY: [200, 0], duration: 120, easing: 'easeOutBack' }, 910)
      .add(charPoseCRef.current, { translateY: [0, -15], duration: 90, easing: 'linear', loop: true, direction: 'alternate' }, 930);

    timelineRef.current = tl;

    return () => {
      if (timelineRef.current) {
        timelineRef.current.pause();
      }
    };
  }, []);

  // Map window scroll progress to timeline progress
  useEffect(() => {
    if (timelineRef.current) {
      // Scale progress: scrollytelling occupies the first 80% of page scroll.
      const relativeProgress = Math.min(1, progress / 0.8);
      timelineRef.current.seek(relativeProgress * 1000);
    }
  }, [progress]);

  return (
    <div className="w-full h-full relative border-4 border-black bg-gradient-to-b from-sky-400 to-sky-200 overflow-hidden shadow-[6px_6px_0px_rgba(0,0,0,1)] rounded-lg">
      
      {/* Space Backdrop (revealed on scroll) */}
      <div 
        className="absolute inset-0 bg-[#030712] transition-opacity duration-500 pointer-events-none" 
        style={{ opacity: Math.min(1, (progress / 0.8)) }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(1.5px_1.5px_at_20px_30px,#fff,#0000),radial-gradient(1px_1px_at_150px_60px,#fff,#0000),radial-gradient(2px_2px_at_300px_180px,#fff,#0000),radial-gradient(1.5px_1.5px_at_450px_80px,#fff,#0000),radial-gradient(2px_2px_at_280px_300px,#fff,#0000)] opacity-50 bg-[size:500px_400px]" />
      </div>

      <svg
        viewBox="0 0 800 600"
        className="w-full h-full select-none"
        role="img"
        aria-label="Interactive visual novel scrollytelling parallax animation depicting carbon scopes"
      >
        <defs>
          <linearGradient id="daemonSmokeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a044e" />
            <stop offset="100%" stopColor="#701a75" />
          </linearGradient>
          <linearGradient id="solarPanelGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
        </defs>

        {/* Sun / Emissive Moon */}
        <circle 
          ref={sunRef} 
          cx="600" 
          cy="120" 
          r="45" 
          fill="#fef08a" 
          style={{ transformOrigin: '600px 120px' }}
        />

        {/* Fluffy Skies Clouds */}
        <g ref={cloudsRef} className="fill-white/80">
          <path d="M 80 140 Q 120 120 160 140 T 240 140 L 240 170 L 80 170 Z" />
          <path d="M 440 90 Q 480 70 520 90 T 600 90 L 600 120 L 440 120 Z" />
        </g>

        {/* Far Mountains */}
        <path
          ref={mountainRef}
          d="M 0 380 Q 140 300 320 340 T 680 320 T 800 360 L 800 600 L 0 600 Z"
          fill="#047857"
          className="transition-colors duration-500"
        />

        {/* Midground Hills */}
        <path
          ref={hillsRef}
          d="M 0 440 Q 200 370 420 410 T 800 400 L 800 600 L 0 600 Z"
          fill="#10b981"
          className="transition-colors duration-500"
        />

        {/* ==================== INDUSTRIAL FACTORY LAYER ==================== */}
        <g ref={factoryRef} transform="translate(0, 0)">
          <rect x="520" y="320" width="160" height="90" fill="#3f3f46" stroke="#000000" strokeWidth="3" />
          <polygon points="520,320 560,280 600,320" fill="#27272a" stroke="#000000" strokeWidth="3" />
          <polygon points="600,320 640,280 680,320" fill="#27272a" stroke="#000000" strokeWidth="3" />
          
          <rect x="635" y="210" width="22" height="75" fill="#52525b" stroke="#000000" strokeWidth="3" />
          <line x1="635" y1="230" x2="657" y2="230" stroke="#ef4444" strokeWidth="3" />
          
          <g ref={factoryGearRef} transform="translate(560, 360)" style={{ transformOrigin: '560px 360px' }}>
            <circle cx="560" cy="360" r="18" fill="#18181b" stroke="#000" strokeWidth="2.5" />
            {Array.from({ length: 8 }).map((_, i) => (
              <rect
                key={i}
                x="556"
                y="336"
                width="8"
                height="10"
                fill="#18181b"
                stroke="#000"
                strokeWidth="2"
                transform={`rotate(${i * 45}, 560, 360)`}
              />
            ))}
            <circle cx="560" cy="360" r="6" fill="#71717a" />
          </g>
        </g>

        {/* SMOG CLOUD */}
        <g ref={smogRef} className="fill-zinc-700 opacity-0" style={{ transformOrigin: '646px 210px' }}>
          <circle cx="646" cy="180" r="18" />
          <circle cx="630" cy="165" r="24" />
          <circle cx="665" cy="160" r="28" />
          <circle cx="645" cy="130" r="35" />
        </g>

        {/* ==================== SOLAR PANEL GRIDS LAYER (Stage 2) ==================== */}
        <g ref={solarGridsRef} className="opacity-0" transform="translate(0, 0)">
          {/* Panel structure */}
          <rect x="420" y="340" width="70" height="50" fill="url(#solarPanelGrad)" stroke="#000" strokeWidth="2.5" transform="skewX(-10)" />
          {/* Grid lines */}
          <line x1="432" y1="340" x2="422" y2="390" stroke="#fbbf24" strokeWidth="1.5" />
          <line x1="455" y1="340" x2="445" y2="390" stroke="#fbbf24" strokeWidth="1.5" />
          <line x1="478" y1="340" x2="468" y2="390" stroke="#fbbf24" strokeWidth="1.5" />
          <line x1="425" y1="356" x2="480" y2="356" stroke="#fbbf24" strokeWidth="1.5" />
          <line x1="420" y1="373" x2="475" y2="373" stroke="#fbbf24" strokeWidth="1.5" />
          {/* Metal Stand */}
          <line x1="455" y1="390" x2="455" y2="430" stroke="#000" strokeWidth="4" />
        </g>

        {/* ==================== AERO-KUN & WIND TURBINE LAYER (Stage 3) ==================== */}
        <g ref={aeroKunRef} className="opacity-0" transform="translate(490, 250)">
          {/* Dynamic spiky cyan hair */}
          <path d="M -15 -25 L -5 -40 L 10 -45 L 5 -30 L 25 -28 L 0 -10 Z" fill="#06b6d4" stroke="#000" strokeWidth="2"/>
          <circle cx="0" cy="-5" r="16" fill="#ffedd5" stroke="#000" strokeWidth="2" />
          {/* Goggles on forehead */}
          <rect x="-10" y="-16" width="20" height="7" rx="2" fill="#eab308" stroke="#000" strokeWidth="1.5" />
          <circle cx="-5" cy="-12" r="1.5" fill="#fff" />
          <circle cx="5" cy="-12" r="1.5" fill="#fff" />
          {/* Eyes & smile */}
          <circle cx="-5" cy="-2" r="2" fill="#000" />
          <circle cx="5" cy="-2" r="2" fill="#000" />
          <path d="M -4 4 Q 0 8 4 4" stroke="#000" strokeWidth="2" fill="none" />
          {/* Body and pilot suit */}
          <path d="M -10 11 L -15 28 L 15 28 L 10 11 Z" fill="#0891b2" stroke="#000" strokeWidth="2" />
          <path d="M 0 11 L 0 28" stroke="#fff" strokeWidth="1.5" />
          
          {/* Local miniature spinning wind turbine next to Aero-Kun */}
          <g transform="translate(-40, 5)">
            <line x1="0" y1="0" x2="0" y2="-45" stroke="#000" strokeWidth="3" />
            <line x1="0" y1="0" x2="0" y2="-45" stroke="#fff" strokeWidth="1.5" />
            {/* Spinning blades */}
            <g className="animate-spin" style={{ animationDuration: '3.5s', transformOrigin: '0px -45px' }}>
              <circle cx="0" cy="-45" r="2.5" fill="#000" />
              <path d="M 0 -45 L -3 -68 L 3 -68 Z" fill="#fff" stroke="#000" strokeWidth="1" />
              <path d="M 0 -45 L 20 -33 L 15 -40 Z" fill="#fff" stroke="#000" strokeWidth="1" />
              <path d="M 0 -45 L -18 -33 L -21 -37 Z" fill="#fff" stroke="#000" strokeWidth="1" />
            </g>
          </g>
        </g>

        {/* WIND GUSTS overlay */}
        <g ref={windGustsRef} className="opacity-0" stroke="#bae6fd" strokeWidth="3.5" strokeDasharray="8 8" strokeLinecap="round" fill="none">
          <path d="M 280 180 Q 380 140 480 180 Q 580 220 680 180" />
          <path d="M 240 220 Q 340 180 440 220 Q 540 260 640 220" />
          <path d="M 300 140 Q 400 100 500 140 Q 600 180 700 140" />
        </g>

        {/* ==================== NUCLEAR GRID LAYER (Stage 4) ==================== */}
        <g ref={uraniumRef} className="opacity-0" transform="translate(340, 230)">
          {/* Cooling Tower */}
          <g transform="translate(40, 30)">
            <path d="M 0 80 Q 5 35 12 0 L 38 0 Q 45 35 50 80 Z" fill="#4b5563" stroke="#000" strokeWidth="2.5" />
            <rect x="9" y="-2" width="32" height="5" rx="1" fill="#1f2937" stroke="#000" strokeWidth="1.5" />
            <path d="M 25 -2 C 15 -15 35 -20 25 -32 C 35 -32 40 -15 25 -2" fill="#e0f2fe" opacity="0.65" className="animate-pulse" />
            {/* Glowing Atomic core */}
            <circle cx="25" cy="42" r="10" stroke="#22c55e" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
            <circle cx="25" cy="42" r="2.5" fill="#a3e635" className="animate-ping" style={{ animationDuration: '1.5s' }} />
          </g>
          {/* Uranium-Onee-san */}
          <g transform="translate(-10, 45)">
            <path d="M -15 -18 C -22 -35 -30 -12 -22 -2 Z" fill="#22c55e" stroke="#000" strokeWidth="1.8" />
            <path d="M 15 -18 C 22 -35 30 -12 22 -2 Z" fill="#22c55e" stroke="#000" strokeWidth="1.8" />
            <circle cx="0" cy="-5" r="14" fill="#ffedd5" stroke="#000" strokeWidth="2" />
            <ellipse cx="-5" cy="-2" rx="1.5" ry="2.5" fill="#000" />
            <ellipse cx="5" cy="-2" rx="1.5" ry="2.5" fill="#000" />
            <path d="M -3 4 Q 0 7 3 4" stroke="#000" strokeWidth="1.5" fill="none" />
            {/* Operator suit */}
            <path d="M -8 9 L -12 26 L 12 26 L 8 9 Z" fill="#581c87" stroke="#000" strokeWidth="2" />
          </g>
        </g>

        {/* ==================== TRASH GOBLIN LAYER (Stage 5) ==================== */}
        <g ref={trashGoblinRef} className="opacity-0" transform="translate(320, 240)">
          {/* Goblin body */}
          <circle cx="0" cy="0" r="16" fill="#15803d" stroke="#000" strokeWidth="2" />
          <polygon points="-8,-4 -20,-12 -12,0" fill="#15803d" stroke="#000" strokeWidth="2" />
          <polygon points="8,-4 20,-12 12,0" fill="#15803d" stroke="#000" strokeWidth="2" />
          {/* Mischievous face */}
          <ellipse cx="-6" cy="-2" rx="2" ry="3.5" fill="#facc15" />
          <ellipse cx="6" cy="-2" rx="2" ry="3.5" fill="#facc15" />
          <path d="M -8 6 Q 0 12 8 6" stroke="#000" strokeWidth="2" fill="none" />
          {/* Soda can crown */}
          <rect x="-6" y="-22" width="12" height="8" fill="#e2e8f0" stroke="#000" strokeWidth="1.5" />
        </g>

        {/* ==================== CONSUMPTION LITTER PLASTIC RAIN ==================== */}
        <g ref={litterRef} className="opacity-0">
          <g transform="translate(280, 200)">
            <rect x="-4" y="-8" width="8" height="20" rx="1.5" fill="#bae6fd" stroke="#000" strokeWidth="2" />
            <rect x="-2" y="-12" width="4" height="4" fill="#3b82f6" />
          </g>
          <g transform="translate(340, 220)">
            <path d="M -6 -8 L 6 -8 L 4 6 L -4 6 Z" fill="#cbd5e1" stroke="#000" strokeWidth="2" />
            <line x1="-5" y1="-1" x2="3" y2="-1" stroke="#ef4444" strokeWidth="1.5" />
          </g>
          <g transform="translate(460, 180) rotate(45)">
            <polygon points="-6,-10 6,-10 4,8 -4,8" fill="#fecdd3" stroke="#000" strokeWidth="2" />
            <line x1="-7" y1="-10" x2="7" y2="-10" stroke="#000" strokeWidth="2" />
          </g>
        </g>

        {/* ==================== HYDROGEN CARGO & H2-SENPAI (Stage 6) ==================== */}
        <g ref={hydrogenRef} className="opacity-0" transform="translate(460, 240)">
          {/* H2 Cargo Truck */}
          <g transform="translate(-100, 30)">
            <rect x="0" y="15" width="70" height="35" rx="3" fill="#3b82f6" stroke="#000" strokeWidth="2.5" />
            <rect x="70" y="25" width="25" height="25" rx="2" fill="#93c5fd" stroke="#000" strokeWidth="2.5" />
            <circle cx="20" cy="50" r="8" fill="#1e293b" stroke="#000" strokeWidth="2" />
            <circle cx="65" cy="50" r="8" fill="#1e293b" stroke="#000" strokeWidth="2" />
            <circle cx="35" cy="32" r="7" fill="#fff" stroke="#3b82f6" strokeWidth="2" />
            <text x="31" y="36" fill="#3b82f6" fontFamily="monospace" fontSize="8" fontWeight="bold">H2</text>
            <circle cx="-10" cy="40" r="3.5" fill="#bae6fd" opacity="0.65" className="animate-ping" style={{ animationDuration: '1.5s' }} />
          </g>
          {/* H2-Senpai */}
          <g transform="translate(10, 40)">
            <path d="M -15 -18 Q 0 -35 15 -18 Z" fill="#3b82f6" stroke="#000" strokeWidth="2" />
            <circle cx="0" cy="-5" r="14" fill="#ffedd5" stroke="#000" strokeWidth="2" />
            <rect x="-8" y="-12" width="16" height="5" rx="1" fill="#60a5fa" stroke="#000" strokeWidth="1" />
            <circle cx="-4" cy="-3" r="1.5" fill="#000" />
            <circle cx="4" cy="-3" r="1.5" fill="#000" />
            <path d="M -3 4 Q 0 8 3 4" stroke="#000" strokeWidth="1.5" fill="none" />
            <path d="M -8 9 L -12 28 L 12 28 L 8 9 Z" fill="#2563eb" stroke="#000" strokeWidth="2" />
          </g>
        </g>

        {/* ==================== ACID RAIN LAYER (Stage 7) ==================== */}
        <g ref={acidRainRef} className="opacity-0" stroke="#c084fc" strokeWidth="2" strokeLinecap="round">
          <line x1="100" y1="50" x2="95" y2="70" />
          <line x1="150" y1="120" x2="145" y2="140" />
          <line x1="220" y1="70" x2="215" y2="90" />
          <line x1="300" y1="140" x2="295" y2="160" />
          <line x1="380" y1="40" x2="375" y2="60" />
          <line x1="480" y1="110" x2="475" y2="130" />
          <line x1="550" y1="80" x2="545" y2="100" />
        </g>

        {/* ==================== BIOMASS-OBAASAN & SPROUT NODE (Stage 8) ==================== */}
        <g ref={biomassObaasanRef} className="opacity-0" transform="translate(485, 230)">
          {/* Green buns */}
          <circle cx="-14" cy="-14" r="8" fill="#15803d" stroke="#000" strokeWidth="2" />
          <circle cx="14" cy="-14" r="8" fill="#15803d" stroke="#000" strokeWidth="2" />
          <circle cx="0" cy="-5" r="18" fill="#ffedd5" stroke="#000" strokeWidth="2" />
          {/* Gold glasses frame */}
          <circle cx="-6" cy="-4" r="4.5" fill="none" stroke="#eab308" strokeWidth="2" />
          <circle cx="6" cy="-4" r="4.5" fill="none" stroke="#eab308" strokeWidth="2" />
          <line x1="-1.5" y1="-4" x2="1.5" y2="-4" stroke="#eab308" strokeWidth="2" />
          {/* Squint happy eyes */}
          <path d="M -8 -4 L -4 -4" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 4 -4 L 8 -4" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M -5 5 Q 0 9 5 5" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Wise robes */}
          <path d="M -12 13 L -18 30 L 18 30 L 12 13 Z" fill="#166534" stroke="#000" strokeWidth="2" />
          <path d="M 0 13 L 0 30" stroke="#fbbf24" strokeWidth="1.5" />
        </g>

        {/* Organic rising sprout sproutRef */}
        <g ref={sproutRef} className="opacity-0" transform="translate(560, 410)">
          {/* Organic soil mound */}
          <path d="M -22 10 Q 0 -6 22 10 Z" fill="#78350f" stroke="#000" strokeWidth="2" />
          {/* Sprout stem */}
          <path d="M 0 10 Q -4 -12 -2 -28" stroke="#22c55e" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          {/* Green leaves */}
          <path d="M -2 -28 Q -16 -34 -8 -42 Q 0 -36 -2 -28" fill="#4ade80" stroke="#000" strokeWidth="1.5" />
          <path d="M -2 -28 Q 12 -36 14 -44 Q 3 -42 -2 -28" fill="#4ade80" stroke="#000" strokeWidth="1.5" />
          <circle cx="6" cy="-45" r="2" fill="#fbbf24" className="animate-ping" style={{ animationDuration: '2s' }} />
        </g>

        {/* Foreground Ground mass */}
        <g ref={foregroundRef}>
          <path
            d="M 0 500 Q 250 460 500 510 T 800 480 L 800 600 L 0 600 Z"
            fill="#34d399"
          />
          
          <g transform="translate(80, 480)">
            <rect x="-3" y="0" width="6" height="24" fill="#78350f" stroke="#000" strokeWidth="2" />
            <path d="M -15 0 C -20 -8 -15 -22 0 -22 C 15 -22 20 -8 15 0 Z" fill="#047857" stroke="#000" strokeWidth="2" />
          </g>
          <g transform="translate(200, 490) scale(1.1)">
            <rect x="-3" y="0" width="6" height="24" fill="#78350f" stroke="#000" strokeWidth="2" />
            <path d="M -15 0 C -20 -8 -15 -22 0 -22 C 15 -22 20 -8 15 0 Z" fill="#059669" stroke="#000" strokeWidth="2" />
          </g>
        </g>

        {/* ==================== CARBON-DAEMON BOSS ==================== */}
        <g ref={carbonDaemonRef} transform="translate(420, 140)" className="opacity-0" style={{ transformOrigin: '420px 140px' }}>
          <path d="M -60 0 Q -90 -45 0 -60 Q 90 -45 60 0 Q 90 45 0 60 Q -90 45 -60 0 Z" fill="url(#daemonSmokeGrad)" stroke="#701a75" strokeWidth="3" />
          <polygon points="-25,-18 -5,-8 -22,-3" fill="#f43f5e" />
          <circle cx="-15" cy="-8" r="1.5" fill="#fff" />
          <polygon points="25,-18 5,-8 22,-3" fill="#f43f5e" />
          <circle cx="15" cy="-8" r="1.5" fill="#fff" />
          <path d="M -20 12 L -15 8 L -10 12 L -5 8 L 0 12 L 5 8 L 10 12 L 15 8 L 20 12 L 15 15 L 10 13 L 5 15 L 0 13 L -5 15 L -10 13 L -15 15 Z" fill="#facc15" stroke="#000" strokeWidth="1.5" />
          <rect x="-42" y="-72" width="10" height="30" fill="#4a044e" stroke="#000" strokeWidth="2.5" />
          <rect x="32" y="-72" width="10" height="30" fill="#4a044e" stroke="#000" strokeWidth="2.5" />
        </g>

        {/* ==================== THERMAL HUD TEMPERATURE CHART ==================== */}
        <g ref={hudChartRef} className="opacity-0" transform="translate(0, 0)">
          <rect x="250" y="320" width="300" height="150" rx="6" fill="#1e1b4b" stroke="#000" strokeWidth="4" />
          <rect x="255" y="325" width="290" height="140" rx="3" fill="#0f172a" stroke="#fbbf24" strokeWidth="2" />
          
          <text x="270" y="355" fill="#f43f5e" fontFamily="monospace" fontSize="11" fontWeight="bold">ANOMALY: +1.2C [THERMAL CRITICAL]</text>
          <text x="270" y="375" fill="#38bdf8" fontFamily="monospace" fontSize="10" fontWeight="bold">CO2 GRID: 420 PPM</text>
          
          <g ref={chartBarsRef} transform="translate(0, 0)" style={{ transformOrigin: '270px 450px' }}>
            <rect x="280" y="400" width="16" height="40" fill="#f87171" stroke="#000" strokeWidth="1.5" />
            <rect x="310" y="390" width="16" height="50" fill="#ef4444" stroke="#000" strokeWidth="1.5" />
            <rect x="340" y="380" width="16" height="60" fill="#dc2626" stroke="#000" strokeWidth="1.5" />
            <rect x="370" y="360" width="16" height="80" fill="#b91c1c" stroke="#000" strokeWidth="1.5" />
          </g>
          <text x="400" y="445" fill="#fbbf24" fontFamily="monospace" fontSize="9" fontWeight="bold">PRE_IND --&gt; 2026</text>
        </g>

        {/* ==================== LIVE SCROLLING ANIME CHARACTERS ==================== */}
        
        {/* POSE A: Eco-Chan waving (Visible at 0% - 9% scroll) */}
        <g ref={charPoseARef} transform="translate(130, 410)" className="opacity-1">
          <path d="M 12 70 L 20 80 L 28 70 Z" fill="#ffffff" stroke="#000" strokeWidth="1.5" />
          <path d="M 0 75 L 40 75 L 35 90 L 5 90 Z" fill="#ef4444" stroke="#000" strokeWidth="2" />
          
          <circle cx="20" cy="50" r="16" fill="#fbcfe8" stroke="#000" strokeWidth="2" />
          <path d="M 12 48 Q 15 44 18 48" stroke="#000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 22 48 Q 25 44 28 48" stroke="#000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <ellipse cx="20" cy="56" rx="2.5" ry="1.5" fill="#ef4444" />
          
          <path d="M 3 60 Q -12 42 -8 38 L 4 54 Z" fill="#ef4444" stroke="#000" strokeWidth="2" />
          <circle cx="-9" cy="38" r="4" fill="#fbcfe8" stroke="#000" strokeWidth="1.5" />

          <path d="M 5 45 C 5 28 35 28 35 45 Z" fill="#1e3a8a" />
          <path d="M 3 32 C 3 16 37 16 37 32 Z" fill="#10b981" stroke="#000" strokeWidth="2" />
          <path d="M 20 18 Q 23 10 26 15 Z" fill="#4ade80" stroke="#000" strokeWidth="1" />
        </g>

        {/* POSE B: Eco-Chan Concerned / Pointing (Visible at 9% - 90% scroll) */}
        <g ref={charPoseBRef} transform="translate(130, 410)" className="opacity-0">
          <path d="M 12 70 L 20 80 L 28 70 Z" fill="#ffffff" stroke="#000" strokeWidth="1.5" />
          <path d="M 0 75 L 40 75 L 35 90 L 5 90 Z" fill="#ef4444" stroke="#000" strokeWidth="2" />
          
          <circle cx="20" cy="50" r="16" fill="#fbcfe8" stroke="#000" strokeWidth="2" />
          <ellipse cx="15" cy="48" rx="2" ry="3" fill="#000" />
          <ellipse cx="25" cy="48" rx="2" ry="3" fill="#000" />
          <path d="M 12 42 L 17 44" stroke="#000" strokeWidth="2" />
          <path d="M 28 42 L 23 44" stroke="#000" strokeWidth="2" />
          <path d="M 17 56 Q 20 58 23 56" stroke="#000" strokeWidth="2" fill="none" />

          <path d="M 37 60 Q 55 56 53 50 L 35 55 Z" fill="#ef4444" stroke="#000" strokeWidth="2" />
          <circle cx="55" cy="50" r="4.5" fill="#fbcfe8" stroke="#000" strokeWidth="1.5" />

          <path d="M 5 45 C 5 28 35 28 35 45 Z" fill="#1e3a8a" />
          <path d="M 3 32 C 3 16 37 16 37 32 Z" fill="#10b981" stroke="#000" strokeWidth="2" />
          <path d="M 20 18 Q 23 10 26 15 Z" fill="#4ade80" stroke="#000" strokeWidth="1" />
        </g>

        {/* POSE C: Space Cadet Eco-Chan (Visible at 90% - 100% scroll) */}
        <g ref={charPoseCRef} transform="translate(380, 220)" className="opacity-0">
          <circle cx="20" cy="48" r="28" fill="rgba(56, 189, 248, 0.15)" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3 3" />
          
          <path d="M -5 75 L 45 75 L 40 100 L 0 100 Z" fill="#f1f5f9" stroke="#000" strokeWidth="2" />
          <circle cx="20" cy="88" r="5" fill="#10b981" />
          
          <circle cx="20" cy="48" r="16" fill="#fbcfe8" stroke="#000" strokeWidth="2" />
          <ellipse cx="14" cy="46" rx="2" ry="3.5" fill="#000" />
          <ellipse cx="26" cy="46" rx="2" ry="3.5" fill="#000" />
          <circle cx="13" cy="44" r="0.8" fill="#fff" />
          <circle cx="25" cy="44" r="0.8" fill="#fff" />
          <path d="M 16 56 Q 20 60 24 56" stroke="#000" strokeWidth="2" fill="none" />

          <path d="M 5 43 C 5 26 35 26 35 43 Z" fill="#1e3a8a" />
          
          <path d="M -3 65 Q -15 50 -10 46" stroke="#000" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M 43 65 Q 55 50 50 46" stroke="#000" strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
      </svg>
      
      {/* Dynamic scanlines HUD grid indicators */}
      <div className="absolute inset-0 pointer-events-none border border-emerald-500/20 flex items-center justify-center m-6 rounded" />
    </div>
  );
}

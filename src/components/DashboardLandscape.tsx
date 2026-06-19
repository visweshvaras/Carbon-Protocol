'use client';

import React, { useEffect, useState } from 'react';

interface DashboardLandscapeProps {
  score: number; // 0 to 100
  triggerMetroTrain?: boolean;
  onMetroAnimationComplete?: () => void;
}

export default function DashboardLandscape({
  score,
  triggerMetroTrain = false,
  onMetroAnimationComplete
}: DashboardLandscapeProps) {
  const [trainActive, setTrainActive] = useState(false);

  // Trigger train sliding animation
  useEffect(() => {
    if (triggerMetroTrain) {
      setTrainActive(true);
      const timer = setTimeout(() => {
        setTrainActive(false);
        if (onMetroAnimationComplete) {
          onMetroAnimationComplete();
        }
      }, 3500); // 3.5s animation duration
      return () => clearTimeout(timer);
    }
  }, [triggerMetroTrain, onMetroAnimationComplete]);

  // Interpolate color parameters based on the carbon score (0 to 100)
  const isHealthy = score >= 50;
  const factor = score / 100; // 0 to 1

  // Color mappings based on score
  // Sky: Good = Sky Blue (#38bdf8 to #7dd3fc), Bad = Toxic Smog (#3f3f46 to #18181b)
  const skyColor = isHealthy 
    ? `rgb(${Math.round(56 + (125 * (factor - 0.5) * 2))}, ${Math.round(189 + (50 * (factor - 0.5) * 2))}, ${Math.round(248 + (7 * (factor - 0.5) * 2))})`
    : `rgb(${Math.round(24 + (32 * factor * 2))}, ${Math.round(24 + (32 * factor * 2))}, ${Math.round(37 + (20 * factor * 2))})`;

  // Mountain colors: Good = Vibrant Green, Bad = Muddy Brown
  const hillFarColor = isHealthy ? '#047857' : '#451a03';
  const hillCloseColor = isHealthy ? '#10b981' : '#78350f';
  const groundColor = isHealthy ? '#34d399' : '#854d0e';
  
  // River: Good = Azure Blue, Bad = Purple Toxic sludge
  const riverColor = isHealthy ? '#0284c7' : '#6b21a8';

  // CSS Filter string depending on score
  // High score = saturated, bright, high contrast (Ghibli vibe)
  // Low score = grayed out, sepia, dark (Industrial apocalypse)
  let landscapeFilter = 'saturate(1.2) contrast(1.05) brightness(1.05)';
  if (score < 80) {
    const desat = 1.2 - (0.8 * (1 - score / 80)); // scale down to 0.4 saturation
    const sepiaVal = 0.4 * (1 - score / 80);
    const brightnessVal = 1.05 - (0.35 * (1 - score / 80)); // scale down to 0.7 brightness
    landscapeFilter = `saturate(${desat.toFixed(2)}) sepia(${sepiaVal.toFixed(2)}) brightness(${brightnessVal.toFixed(2)})`;
  }

  // Calculate items counts based on score
  const numTrees = Math.max(0, Math.floor((score - 20) / 10)); // 0 to 8 trees
  const numSmokePlumes = Math.max(0, Math.floor((60 - score) / 10)); // 0 to 6 smoke plumes
  const showWindTurbines = score >= 60;
  const showFactories = score < 60;

  return (
    <div className="relative w-full h-[320px] md:h-[400px] border-4 border-black rounded-lg overflow-hidden bg-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] select-none">
      
      {/* Dynamic landscape environment */}
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full transition-all duration-1000 ease-in-out"
        style={{ filter: landscapeFilter }}
        role="img"
        aria-label={`Dynamic landscape environment depicting ecosystem health based on carbon score of ${score}`}
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={skyColor} />
            <stop offset="100%" stopColor={isHealthy ? '#f0f9ff' : '#27272a'} />
          </linearGradient>
          
          <linearGradient id="riverGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={riverColor} />
            <stop offset="100%" stopColor={isHealthy ? '#0369a1' : '#4c1d95'} />
          </linearGradient>
          
          {/* Cloud Clip Path */}
          <clipPath id="riverClip">
            <path d="M 0 350 Q 200 330 400 360 T 800 340 L 800 400 L 0 400 Z" />
          </clipPath>
        </defs>

        {/* Sky Background */}
        <rect width="800" height="400" fill="url(#skyGrad)" className="transition-all duration-1000" />

        {/* Sun or Acid Moon */}
        {isHealthy ? (
          <circle cx="650" cy="80" r="40" fill="#fef08a" filter="drop-shadow(0 0 10px #fef08a)" />
        ) : (
          <circle cx="650" cy="80" r="35" fill="#f472b6" filter="drop-shadow(0 0 12px #db2777)" />
        )}

        {/* Floating Clouds */}
        {isHealthy && (
          <g className="opacity-80">
            {/* Cloud 1 */}
            <path d="M 120 70 A 20 20 0 0 1 150 60 A 25 25 0 0 1 190 70 A 15 15 0 0 1 200 85 A 15 15 0 0 1 185 100 L 125 100 A 15 15 0 0 1 120 70 Z" fill="#ffffff" className="animate-pulse" style={{ animationDuration: '6s' }} />
            {/* Cloud 2 */}
            <path d="M 450 50 A 15 15 0 0 1 470 42 A 20 20 0 0 1 505 50 A 12 12 0 0 1 515 62 L 445 62 A 12 12 0 0 1 450 50 Z" fill="#ffffff" className="animate-pulse" style={{ animationDuration: '9s' }} />
          </g>
        )}

        {/* Acid Smog Overlays for Low Score */}
        {!isHealthy && (
          <g className="opacity-40 fill-zinc-600">
            <path d="M -50 80 Q 200 40 450 90 T 900 70 L 900 150 L -50 150 Z" />
            <path d="M -50 120 Q 150 90 400 130 T 900 110 L 900 200 L -50 200 Z" fill="#4b5563" className="opacity-30" />
          </g>
        )}

        {/* Far Mountains/Hills */}
        <path
          d="M 0 280 Q 120 220 260 250 T 560 230 T 800 260 L 800 400 L 0 400 Z"
          fill={hillFarColor}
          className="transition-all duration-1000"
        />

        {/* Midground Hills */}
        <path
          d="M 0 310 Q 180 260 380 290 T 800 290 L 800 400 L 0 400 Z"
          fill={hillCloseColor}
          className="transition-all duration-1000"
        />

        {/* Wind Turbines (High Eco Score) */}
        {showWindTurbines && (
          <g className="transition-all duration-500">
            {/* Turbine 1 */}
            <g transform="translate(180, 220)">
              <line x1="0" y1="0" x2="0" y2="-60" stroke="#ffffff" strokeWidth="4" />
              <g className="animate-spin" style={{ animationDuration: '3s', transformOrigin: '0px -60px' }}>
                <circle cx="0" cy="-60" r="4" fill="#ffffff" />
                <path d="M 0 -60 L -6 -95 L 6 -95 Z" fill="#f8fafc" />
                <path d="M 0 -60 L 32 -42 L 25 -52 Z" fill="#f8fafc" />
                <path d="M 0 -60 L -28 -42 L -33 -48 Z" fill="#f8fafc" />
              </g>
            </g>
            {/* Turbine 2 */}
            <g transform="translate(540, 200)">
              <line x1="0" y1="0" x2="0" y2="-50" stroke="#ffffff" strokeWidth="3" />
              <g className="animate-spin" style={{ animationDuration: '4.5s', transformOrigin: '0px -50px' }}>
                <circle cx="0" cy="-50" r="3" fill="#ffffff" />
                <path d="M 0 -50 L -5 -78 L 5 -78 Z" fill="#f8fafc" />
                <path d="M 0 -50 L 26 -35 L 21 -43 Z" fill="#f8fafc" />
                <path d="M 0 -50 L -23 -35 L -27 -40 Z" fill="#f8fafc" />
              </g>
            </g>
          </g>
        )}

        {/* Industrial Smoke Stack Factories (Low Score) */}
        {showFactories && (
          <g className="transition-all duration-500">
            {/* Factory 1 */}
            <g transform="translate(140, 210)">
              {/* Building outline */}
              <polygon points="0,50 60,50 60,10 40,25 20,10 0,25" fill="#3f3f46" stroke="#18181b" strokeWidth="3" />
              {/* Smokestack */}
              <rect x="10" y="-20" width="12" height="35" fill="#52525b" stroke="#18181b" strokeWidth="3" />
              <line x1="10" y1="-10" x2="22" y2="-10" stroke="#e11d48" strokeWidth="3" />
              
              {/* Floating smoke particles based on pollution levels */}
              {Array.from({ length: numSmokePlumes }).map((_, i) => (
                <circle
                  key={i}
                  cx={16 + Math.sin(i) * 10}
                  cy={-25 - i * 15}
                  r={6 + i * 2}
                  fill="#71717a"
                  className="animate-pulse"
                  style={{
                    opacity: 0.6 - i * 0.1,
                    animationDuration: '2s',
                    animationDelay: `${i * 0.4}s`
                  }}
                />
              ))}
            </g>

            {/* Factory 2 */}
            <g transform="translate(560, 195)">
              <rect x="0" y="30" width="80" height="40" fill="#27272a" stroke="#09090b" strokeWidth="3" />
              <polygon points="0,30 20,10 20,30" fill="#3f3f46" stroke="#09090b" strokeWidth="2" />
              <polygon points="20,30 40,10 40,30" fill="#3f3f46" stroke="#09090b" strokeWidth="2" />
              <rect x="55" y="-15" width="10" height="45" fill="#52525b" stroke="#09090b" strokeWidth="3" />
              
              {/* Floating smoke */}
              {Array.from({ length: numSmokePlumes }).map((_, i) => (
                <circle
                  key={i}
                  cx={60 + Math.cos(i) * 8}
                  cy={-20 - i * 12}
                  r={5 + i * 1.5}
                  fill="#52525b"
                  style={{
                    opacity: 0.5 - i * 0.08,
                    animationDuration: '2.5s',
                    animationDelay: `${i * 0.3}s`
                  }}
                />
              ))}
            </g>
          </g>
        )}

        {/* Foreground Ground */}
        <path
          d="M 0 350 Q 200 330 400 360 T 800 340 L 800 400 L 0 400 Z"
          fill={groundColor}
          className="transition-all duration-1000"
        />

        {/* Clean River (Good Score) or Acid Drainage (Bad Score) */}
        <g clipPath="url(#riverClip)">
          {/* Water Base */}
          <rect x="0" y="300" width="800" height="100" fill="url(#riverGrad)" className="transition-all duration-1000" />
          
          {/* River Waves / Currents */}
          <path
            d="M -50 360 Q 200 350 400 375 T 850 360"
            fill="none"
            stroke={isHealthy ? '#38bdf8' : '#a855f7'}
            strokeWidth="3"
            strokeDasharray="15 30"
            className="animate-pulse opacity-70"
            style={{ animationDuration: '4s' }}
          />
          <path
            d="M -50 380 Q 200 370 400 395 T 850 380"
            fill="none"
            stroke={isHealthy ? '#7dd3fc' : '#c084fc'}
            strokeWidth="2"
            strokeDasharray="20 40"
            className="animate-pulse opacity-50"
            style={{ animationDuration: '6s', animationDelay: '1s' }}
          />
        </g>

        {/* Trees Layer (Lush for Eco, Dead logs for Polluted) */}
        <g>
          {Array.from({ length: 8 }).map((_, idx) => {
            // Set X positions for trees spacing
            const xPositions = [40, 100, 240, 310, 480, 520, 680, 740];
            const yPositions = [335, 340, 328, 335, 325, 330, 328, 338];
            const scale = [1.1, 0.9, 1.2, 0.8, 1.0, 1.1, 0.9, 1.3][idx];

            const x = xPositions[idx];
            const y = yPositions[idx];
            
            // If tree should be displayed
            if (idx < numTrees) {
              return (
                <g key={idx} transform={`translate(${x}, ${y}) scale(${scale})`} className="transition-all duration-500">
                  {/* Trunk */}
                  <rect x="-4" y="0" width="8" height="24" fill="#78350f" stroke="#000000" strokeWidth="2" />
                  {/* Leaves (fluffy Ghibli blobs) */}
                  <path d="M -16 0 C -24 -8 -16 -24 0 -24 C 16 -24 24 -8 16 0 Z" fill="#10b981" stroke="#000000" strokeWidth="2" />
                  <path d="M -8 -10 C -14 -16 -8 -26 2 -26 C 12 -26 18 -16 12 -10 Z" fill="#34d399" />
                </g>
              );
            } else if (score < 40 && idx % 3 === 0) {
              // Dead burnt logs for polluted wasteland
              return (
                <g key={idx} transform={`translate(${x}, ${y}) scale(${scale})`} className="transition-all duration-500">
                  {/* Burnt crooked trunk */}
                  <path d="M -3 0 L -2 -14 L -8 -18 L -6 -20 L 0 -15 L 4 -22 L 7 -20 L 2 -10 L 3 0 Z" fill="#1c1917" stroke="#000000" strokeWidth="1.5" />
                </g>
              );
            }
            return null;
          })}
        </g>

        {/* Small SVG Details: Flowers vs Litter */}
        {isHealthy ? (
          // Cute anime flowers
          <g>
            <path d="M 60 370 Q 62 360 65 362" stroke="#16a34a" strokeWidth="2" fill="none" />
            <circle cx="65" cy="360" r="3" fill="#f43f5e" />
            <circle cx="61" cy="361" r="2.5" fill="#fef08a" />
            <circle cx="69" cy="361" r="2.5" fill="#fef08a" />

            <path d="M 280 375 Q 278 368 275 370" stroke="#16a34a" strokeWidth="2" fill="none" />
            <circle cx="275" cy="368" r="4" fill="#3b82f6" />
            <circle cx="275" cy="368" r="1.5" fill="#fef08a" />

            <path d="M 710 365 Q 712 355 715 357" stroke="#16a34a" strokeWidth="2" fill="none" />
            <circle cx="715" cy="355" r="3.5" fill="#a855f7" />
          </g>
        ) : (
          // Industrial waste / green glowing barrels
          <g>
            {/* Litter bottles */}
            <rect x="70" y="360" width="5" height="10" rx="1" fill="#a1a1aa" transform="rotate(45, 70, 360)" stroke="#18181b" strokeWidth="1.5" />
            <rect x="290" y="370" width="4" height="8" rx="1" fill="#71717a" transform="rotate(-30, 290, 370)" stroke="#18181b" strokeWidth="1" />
            
            {/* Toxic Barrel */}
            <g transform="translate(680, 345)">
              <rect x="-8" y="0" width="16" height="22" rx="2" fill="#15803d" stroke="#000000" strokeWidth="2" />
              <line x1="-8" y1="7" x2="8" y2="7" stroke="#000000" strokeWidth="2" />
              <line x1="-8" y1="14" x2="8" y2="14" stroke="#000000" strokeWidth="2" />
              {/* Radioactive symbol mock */}
              <circle cx="0" cy="11" r="2" fill="#facc15" />
              {/* Green toxic leak */}
              <path d="M 6 18 Q 8 20 8 24 L 2 24 Z" fill="#22c55e" />
            </g>
          </g>
        )}

        {/* Metro Train (Animated slide from left to right) */}
        <g
          className="transition-transform ease-out"
          style={{
            transform: trainActive 
              ? 'translate(900px, 0px)' 
              : 'translate(-300px, 0px)',
            transitionDuration: trainActive ? '3.5s' : '0s',
            transitionTimingFunction: 'linear'
          }}
        >
          {/* Metro tracks / bridge */}
          <g transform="translate(0, 315)" className="opacity-80">
            {/* Train body */}
            <rect x="0" y="0" width="220" height="28" rx="4" fill="#f8fafc" stroke="#000000" strokeWidth="3" />
            {/* Strips */}
            <rect x="0" y="18" width="220" height="4" fill="#3b82f6" />
            {/* Windows */}
            {Array.from({ length: 6 }).map((_, i) => (
              <rect key={i} x={15 + i * 32} y="5" width="20" height="10" rx="1" fill="#38bdf8" stroke="#000000" strokeWidth="2" />
            ))}
            {/* Headlights */}
            <polygon points="220,16 220,24 225,20" fill="#facc15" />
            {/* Wheels */}
            <circle cx="40" cy="28" r="5" fill="#334155" stroke="#000000" strokeWidth="2" />
            <circle cx="70" cy="28" r="5" fill="#334155" stroke="#000000" strokeWidth="2" />
            <circle cx="150" cy="28" r="5" fill="#334155" stroke="#000000" strokeWidth="2" />
            <circle cx="180" cy="28" r="5" fill="#334155" stroke="#000000" strokeWidth="2" />
          </g>
        </g>
      </svg>
      
      {/* Absolute overlay display of score */}
      <div className="absolute top-4 left-4 font-mono text-xs font-bold text-white bg-black/80 px-3 py-1.5 border-2 border-white rounded shadow-[2px_2px_0px_rgba(255,255,255,1)]">
        WORLD STATE SCORE: <span className={score >= 50 ? 'text-emerald-400' : 'text-rose-400'}>{score}/100</span>
      </div>
      
      {/* Aesthetic JRPG HUD Indicators */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${score >= 50 ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
          <span className={`relative inline-flex rounded-full h-3 w-3 ${score >= 50 ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
        </span>
        <div className="font-mono text-[10px] font-bold text-white bg-black/80 px-2 py-0.5 border border-white/20 rounded uppercase">
          {score >= 75 ? 'Lush Green Era' : score >= 50 ? 'Struggling Oasis' : score >= 25 ? 'Smog Descent' : 'Carbon Apocalypse'}
        </div>
      </div>
    </div>
  );
}

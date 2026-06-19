'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Procedurally generate a stylized anime world map canvas texture
function generateEarthTexture(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return canvas;

  // Ocean background
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  oceanGrad.addColorStop(0, '#1d4ed8'); // Deep blue
  oceanGrad.addColorStop(1, '#1e3a8a'); // Dark deep blue
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // HUD grid lines
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
  ctx.lineWidth = 1;
  for (let y = 32; y < canvas.height; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
  for (let x = 64; x < canvas.width; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  // Draw continents
  ctx.fillStyle = '#10b981'; // Emerald green
  ctx.strokeStyle = '#065f46'; // Forest green border
  ctx.lineWidth = 4;

  const drawContinent = (pts: [number, number][]) => {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) {
      ctx.lineTo(pts[i][0], pts[i][1]);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  // North America
  drawContinent([
    [100, 60], [380, 40], [340, 150], [280, 240], 
    [260, 240], [240, 180], [120, 160]
  ]);

  // South America
  drawContinent([
    [260, 240], [330, 250], [350, 300], [330, 420], 
    [280, 450], [260, 350], [240, 280]
  ]);

  // Eurasia
  drawContinent([
    [450, 40], [920, 30], [950, 150], [900, 280], 
    [820, 280], [780, 250], [700, 250], [600, 200], 
    [540, 220], [450, 150]
  ]);

  // Africa
  drawContinent([
    [450, 200], [580, 200], [620, 250], [600, 380], 
    [550, 430], [490, 380], [460, 260]
  ]);

  // Australia
  drawContinent([
    [800, 300], [900, 310], [920, 370], [820, 380], [780, 340]
  ]);

  // Antarctica
  drawContinent([
    [50, 470], [974, 470], [970, 500], [50, 500]
  ]);

  // Clouds overlay
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  const drawCloud = (cx: number, cy: number, r: number) => {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.arc(cx - r * 0.6, cy + r * 0.1, r * 0.7, 0, Math.PI * 2);
    ctx.arc(cx + r * 0.6, cy + r * 0.1, r * 0.7, 0, Math.PI * 2);
    ctx.fill();
  };

  drawCloud(200, 120, 22);
  drawCloud(550, 100, 35);
  drawCloud(750, 180, 28);
  drawCloud(300, 320, 20);
  drawCloud(850, 80, 24);

  return canvas;
}

export default function ThreeEarth() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#030712');

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 5;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Lights
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.65);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight('#ffffff', 1.8);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);

    const blueLight = new THREE.PointLight('#3b82f6', 0.8, 50);
    blueLight.position.set(-5, -3, -5);
    scene.add(blueLight);

    const greenLight = new THREE.PointLight('#10b981', 0.5, 50);
    greenLight.position.set(0, 5, 0);
    scene.add(greenLight);

    // 5. Starfield background
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 2000;
    const starsPositions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i += 3) {
      // Position stars randomly in a shell around the origin
      const radius = 50 + Math.random() * 30;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      starsPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      starsPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starsPositions[i + 2] = radius * Math.cos(phi);
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
    const starsMaterial = new THREE.PointsMaterial({
      color: '#ffffff',
      size: 0.15,
      sizeAttenuation: true
    });
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    // 6. Earth Mesh
    const earthCanvas = generateEarthTexture();
    const earthTexture = new THREE.CanvasTexture(earthCanvas);
    const earthGeometry = new THREE.SphereGeometry(2.1, 64, 64);
    
    // MeshToonMaterial for cel-shaded JRPG look
    const earthMaterial = new THREE.MeshToonMaterial({
      map: earthTexture
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earthMesh);

    // 7. Animation loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animateLoop = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Slow continuous rotation
      earthMesh.rotation.y += delta * 0.15;
      
      // Floating wobble effect
      earthMesh.position.y = Math.sin(elapsedTime * 0.8) * 0.1;

      // Slow background stars rotate
      starField.rotation.y += delta * 0.02;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animateLoop);
    };

    animateLoop();

    // 8. Resizing handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);

      // Clean up buffers & assets
      earthGeometry.dispose();
      earthMaterial.dispose();
      earthTexture.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative select-none bg-[#030712]">
      <canvas ref={canvasRef} className="w-full h-full block" role="img" aria-label="3D dynamic globe illustrating real-time carbon atmospheric simulation" />
      
      {/* Tactical UI indicators */}
      <div className="absolute inset-0 border border-emerald-500/20 pointer-events-none flex items-center justify-center m-6 rounded-lg">
        <div className="absolute top-4 left-4 text-[10px] font-mono text-emerald-400/60 uppercase tracking-widest animate-pulse">
          SYSTEM_STATE: ONLINE
        </div>
        <div className="absolute bottom-4 right-4 text-[10px] font-mono text-emerald-400/60 uppercase tracking-widest">
          SIMULATION_DYNAMICS: 2.2X
        </div>
      </div>
    </div>
  );
}

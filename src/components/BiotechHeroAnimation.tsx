import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const BiotechHeroAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  // Keep themeRef current for the animation loop
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 300);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // DNA Helix Parameters
    const numNodes = 28;
    const helixRadius = Math.min(height * 0.35, 75);
    let time = 0;

    // Floating Bio Particles
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      colorDark: string;
      colorLight: string;
    }> = [];

    const darkColors = ['rgba(6, 182, 212, ', 'rgba(16, 185, 129, ', 'rgba(245, 158, 11, '];
    const lightColors = ['rgba(2, 132, 199, ', 'rgba(13, 148, 136, ', 'rgba(217, 119, 6, '];

    for (let i = 0; i < 35; i++) {
      const idx = Math.floor(Math.random() * darkColors.length);
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 1,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.3,
        colorDark: darkColors[idx],
        colorLight: lightColors[idx],
      });
    }

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const isDark = themeRef.current === 'dark';
      const centerX = width / 2;
      const centerY = height / 2;

      // 1. Draw Background Bio-Glow Gradient
      const radialGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        Math.max(width, height) * 0.6
      );

      if (isDark) {
        radialGlow.addColorStop(0, 'rgba(6, 182, 212, 0.15)');
        radialGlow.addColorStop(0.5, 'rgba(13, 148, 136, 0.08)');
        radialGlow.addColorStop(1, 'rgba(2, 6, 23, 0)');
      } else {
        radialGlow.addColorStop(0, 'rgba(8, 145, 178, 0.12)');
        radialGlow.addColorStop(0.5, 'rgba(13, 148, 136, 0.05)');
        radialGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      }

      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Floating Molecular Particles & Connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `${p.colorDark}${p.alpha})`
          : `${p.colorLight}${p.alpha * 1.1})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 75) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 75) * (isDark ? 0.15 : 0.22);
            ctx.strokeStyle = isDark
              ? `rgba(6, 182, 212, ${lineAlpha})`
              : `rgba(14, 116, 144, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // 3. Draw Rotating 3D DNA Helix Strand
      const spacing = width / (numNodes - 1);

      for (let i = 0; i < numNodes; i++) {
        const x = i * spacing;
        const phase = time + i * 0.28;

        const y1 = centerY + Math.sin(phase) * helixRadius;
        const y2 = centerY - Math.sin(phase) * helixRadius;

        const z1 = Math.cos(phase);
        const z2 = -Math.cos(phase);

        // Calculate depths & scales
        const scale1 = 0.6 + (z1 + 1) * 0.4;
        const scale2 = 0.6 + (z2 + 1) * 0.4;

        // Base pair hydrogen bond lines
        ctx.beginPath();
        ctx.moveTo(x, y1);
        ctx.lineTo(x, y2);
        if (isDark) {
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.12 + Math.abs(z1) * 0.2})`;
        } else {
          ctx.strokeStyle = `rgba(2, 132, 199, ${0.2 + Math.abs(z1) * 0.25})`;
        }
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Strand 1 Nucleotide Nodes (Cyan/Blue)
        ctx.beginPath();
        ctx.arc(x, y1, Math.max(1, 3.5 * scale1), 0, Math.PI * 2);
        if (isDark) {
          ctx.fillStyle = z1 > 0 ? '#38bdf8' : '#0284c7';
          ctx.shadowColor = '#06b6d4';
          ctx.shadowBlur = z1 > 0 ? 8 : 0;
        } else {
          ctx.fillStyle = z1 > 0 ? '#0284c7' : '#0369a1';
          ctx.shadowColor = '#0284c7';
          ctx.shadowBlur = z1 > 0 ? 5 : 0;
        }
        ctx.fill();

        // Strand 2 Nucleotide Nodes (Emerald/Teal)
        ctx.beginPath();
        ctx.arc(x, y2, Math.max(1, 3.5 * scale2), 0, Math.PI * 2);
        if (isDark) {
          ctx.fillStyle = z2 > 0 ? '#10b981' : '#059669';
          ctx.shadowColor = '#10b981';
          ctx.shadowBlur = z2 > 0 ? 8 : 0;
        } else {
          ctx.fillStyle = z2 > 0 ? '#059669' : '#047857';
          ctx.shadowColor = '#059669';
          ctx.shadowBlur = z2 > 0 ? 5 : 0;
        }
        ctx.fill();

        ctx.shadowBlur = 0; // Reset shadow
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-3xl border transition-colors ${
      theme === 'dark' ? 'border-cyan-500/20' : 'border-cyan-400/30'
    }`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};


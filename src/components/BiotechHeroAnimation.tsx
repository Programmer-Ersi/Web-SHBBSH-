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
    let width = 800;
    let height = 400;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // DNA Helix Parameters
    const numNodes = 32;
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

    for (let i = 0; i < 42; i++) {
      const idx = Math.floor(Math.random() * darkColors.length);
      particles.push({
        x: Math.random() * (width || 800),
        y: Math.random() * (height || 400),
        radius: Math.random() * 2.2 + 0.8,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.45 + 0.25,
        colorDark: darkColors[idx],
        colorLight: lightColors[idx],
      });
    }

    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      const isDark = themeRef.current === 'dark';
      const centerX = width * 0.5;
      const centerY = height * 0.42;
      const helixRadius = Math.min(height * 0.26, 85);

      // 1. Ambient Background Bio-Glow Gradient (Ultra soft, zero hard edges)
      const radialGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        20,
        centerX,
        centerY,
        Math.max(width, height) * 0.65
      );

      if (isDark) {
        radialGlow.addColorStop(0, 'rgba(6, 182, 212, 0.12)');
        radialGlow.addColorStop(0.5, 'rgba(13, 148, 136, 0.05)');
        radialGlow.addColorStop(1, 'rgba(2, 6, 23, 0)');
      } else {
        radialGlow.addColorStop(0, 'rgba(8, 145, 178, 0.09)');
        radialGlow.addColorStop(0.5, 'rgba(13, 148, 136, 0.04)');
        radialGlow.addColorStop(1, 'rgba(248, 250, 252, 0)');
      }

      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. Floating Molecular Particles & Micro-Connections
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

          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 80) * (isDark ? 0.14 : 0.18);
            ctx.strokeStyle = isDark
              ? `rgba(6, 182, 212, ${lineAlpha})`
              : `rgba(14, 116, 144, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // 3. Rotating 3D DNA Helix Strand
      const spacing = width / (numNodes - 1);

      for (let i = 0; i < numNodes; i++) {
        const x = i * spacing;
        const phase = time + i * 0.26;

        const y1 = centerY + Math.sin(phase) * helixRadius;
        const y2 = centerY - Math.sin(phase) * helixRadius;

        const z1 = Math.cos(phase);
        const z2 = -Math.cos(phase);

        // Calculate depths & scales
        const scale1 = 0.65 + (z1 + 1) * 0.35;
        const scale2 = 0.65 + (z2 + 1) * 0.35;

        // Base pair hydrogen bond lines
        ctx.beginPath();
        ctx.moveTo(x, y1);
        ctx.lineTo(x, y2);
        if (isDark) {
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.1 + Math.abs(z1) * 0.16})`;
        } else {
          ctx.strokeStyle = `rgba(2, 132, 199, ${0.15 + Math.abs(z1) * 0.2})`;
        }
        ctx.lineWidth = 1.35;
        ctx.stroke();

        // Strand 1 Nucleotide Nodes (Cyan/Blue)
        ctx.beginPath();
        ctx.arc(x, y1, Math.max(1, 3.2 * scale1), 0, Math.PI * 2);
        if (isDark) {
          ctx.fillStyle = z1 > 0 ? '#38bdf8' : '#0284c7';
          ctx.shadowColor = '#06b6d4';
          ctx.shadowBlur = z1 > 0 ? 6 : 0;
        } else {
          ctx.fillStyle = z1 > 0 ? '#0284c7' : '#0369a1';
          ctx.shadowColor = '#0284c7';
          ctx.shadowBlur = z1 > 0 ? 4 : 0;
        }
        ctx.fill();

        // Strand 2 Nucleotide Nodes (Emerald/Teal)
        ctx.beginPath();
        ctx.arc(x, y2, Math.max(1, 3.2 * scale2), 0, Math.PI * 2);
        if (isDark) {
          ctx.fillStyle = z2 > 0 ? '#10b981' : '#059669';
          ctx.shadowColor = '#10b981';
          ctx.shadowBlur = z2 > 0 ? 6 : 0;
        } else {
          ctx.fillStyle = z2 > 0 ? '#059669' : '#047857';
          ctx.shadowColor = '#059669';
          ctx.shadowBlur = z2 > 0 ? 4 : 0;
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
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_90%)]">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};


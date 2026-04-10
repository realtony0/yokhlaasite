'use client';

import { useEffect, useRef, type MutableRefObject } from 'react';

/**
 * HeroScene — Scène nocturne sénégalaise full-bleed (SVG, version éditoriale)
 * - Gradient nuit profonde (navy → noir)
 * - Étoiles scintillantes
 * - Skyline Dakar (palmiers, mosquée, buildings, Monument de la Renaissance)
 * - Route incurvée avec point lumineux qui suit le scroll
 * - Bokeh subtil ambré (phares lointains)
 *
 * Pas de gradient blob néon, pas d'aurora, pas de particules colorées —
 * éditorial, pas généré par IA.
 */

interface Props {
  progressRef?: MutableRefObject<number>;
}

export function HeroScene({ progressRef }: Props) {
  const carRef = useRef<SVGCircleElement>(null);
  const carHaloRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let raf = 0;
    const path = document.getElementById(
      'hero-route-path'
    ) as unknown as SVGPathElement | null;
    if (!path) return;

    const totalLength = path.getTotalLength();

    const tick = () => {
      const p = progressRef?.current ?? 0;
      const pt = path.getPointAtLength(totalLength * p);
      if (carRef.current) {
        carRef.current.setAttribute('cx', String(pt.x));
        carRef.current.setAttribute('cy', String(pt.y));
      }
      if (carHaloRef.current) {
        carHaloRef.current.setAttribute('cx', String(pt.x));
        carHaloRef.current.setAttribute('cy', String(pt.y));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [progressRef]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background gradient — deep navy night, no blob mess */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 60% at 50% 100%, rgba(255,168,107,0.08) 0%, transparent 55%),
            linear-gradient(180deg, #060812 0%, #0a0f1e 35%, #08111c 65%, #030609 100%)
          `,
        }}
        aria-hidden
      />

      {/* SVG scene */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden
      >
        <defs>
          <filter id="route-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="car-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" />
          </filter>

          <filter id="bokeh-blur" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="22" />
          </filter>

          <linearGradient id="route-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffd3a4" stopOpacity="0" />
            <stop offset="15%" stopColor="#ffa86b" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#ffd3a4" stopOpacity="0.95" />
            <stop offset="85%" stopColor="#ffa86b" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffd3a4" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="ground-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#030609" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#000" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Stars */}
        <g>
          {Array.from({ length: 150 }).map((_, i) => {
            const cx = (i * 983 + 47) % 1920;
            const cy = (i * 677 + 13) % 650;
            const r = ((i * 7) % 3) * 0.5 + 0.4;
            const o = ((i * 13) % 10) / 14 + 0.25;
            return (
              <circle
                key={`star-${i}`}
                cx={cx}
                cy={cy}
                r={r}
                fill="#fff"
                opacity={o}
                className="hero-star"
                style={{ animationDelay: `${(i * 0.07) % 4}s` }}
              />
            );
          })}
        </g>

        {/* Topographic curves — abstract map feel, very subtle */}
        <g opacity="0.1" stroke="#9ab" strokeWidth="0.7" fill="none">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <path
              key={`topo-${i}`}
              d={`M -100 ${550 + i * 42} Q 480 ${450 + i * 36} 960 ${540 + i * 38} T 2020 ${530 + i * 40}`}
              strokeDasharray={i % 2 === 0 ? '0' : '2 6'}
            />
          ))}
        </g>

        {/* Bokeh — faint amber points (distant headlights) */}
        <g filter="url(#bokeh-blur)">
          <circle cx="320" cy="780" r="32" fill="#ffa86b" opacity="0.35" />
          <circle cx="430" cy="800" r="26" fill="#ffd3a4" opacity="0.3" />
          <circle cx="1500" cy="800" r="36" fill="#88b4ff" opacity="0.18" />
          <circle cx="1610" cy="820" r="30" fill="#b4c9ff" opacity="0.16" />
          <circle cx="900" cy="830" r="22" fill="#fff" opacity="0.14" />
        </g>

        {/* Ground gradient */}
        <rect x="-100" y="720" width="2120" height="500" fill="url(#ground-grad)" />

        {/* DAKAR SKYLINE */}
        <g transform="translate(0, 720)" fill="#040810">
          {/* Palmiers gauche */}
          <g>
            <rect x="60" y="-60" width="6" height="160" />
            <ellipse cx="63" cy="-65" rx="35" ry="10" />
            <ellipse cx="63" cy="-65" rx="10" ry="35" />
            <ellipse cx="50" cy="-72" rx="20" ry="6" transform="rotate(-25 50 -72)" />
            <ellipse cx="76" cy="-72" rx="20" ry="6" transform="rotate(25 76 -72)" />

            <rect x="130" y="-50" width="5" height="150" />
            <ellipse cx="132" cy="-55" rx="30" ry="9" />
            <ellipse cx="132" cy="-55" rx="9" ry="30" />
            <ellipse cx="120" cy="-62" rx="18" ry="5" transform="rotate(-25 120 -62)" />
            <ellipse cx="144" cy="-62" rx="18" ry="5" transform="rotate(25 144 -62)" />
          </g>

          {/* Buildings */}
          <g>
            <rect x="220" y="-20" width="60" height="220" />
            <rect x="290" y="-50" width="75" height="250" />
            <polygon points="290,-50 327,-75 365,-50" />
            <rect x="380" y="-90" width="55" height="290" />
            <rect x="402" y="-130" width="12" height="40" />
            <rect x="450" y="-30" width="90" height="230" />
            <polygon points="555,-15 555,200 640,200 640,-40 595,-65" />
            <rect x="655" y="-25" width="65" height="225" />
          </g>

          {/* Mosquée */}
          <g>
            <rect x="745" y="40" width="140" height="160" />
            <ellipse cx="815" cy="40" rx="65" ry="50" />
            <path d="M 810 -20 L 815 -42 L 820 -20 Z" />
            <rect x="730" y="-10" width="12" height="210" />
            <rect x="727" y="-15" width="18" height="8" />
            <path d="M 732 -25 L 736 -45 L 740 -25 Z" />
            <rect x="888" y="-10" width="12" height="210" />
            <rect x="885" y="-15" width="18" height="8" />
            <path d="M 890 -25 L 894 -45 L 898 -25 Z" />
          </g>

          <g>
            <rect x="920" y="-20" width="70" height="220" />
            <rect x="1000" y="0" width="80" height="200" />
            <polygon points="1090,0 1090,200 1170,200 1170,-20 1130,-40" />
            <rect x="1185" y="-30" width="60" height="230" />
            <rect x="1255" y="-110" width="48" height="310" />
            <rect x="1270" y="-150" width="14" height="40" />
            <rect x="1313" y="-10" width="78" height="210" />
            <rect x="1400" y="-25" width="62" height="225" />
            <polygon points="1400,-25 1431,-50 1462,-25" />
          </g>

          {/* Monument de la Renaissance Africaine */}
          <g>
            <polygon points="1530,200 1573,-35 1616,200" />
            <circle cx="1573" cy="-40" r="9" />
            <path d="M 1573 -45 L 1605 -100 L 1612 -97 L 1580 -42 Z" />
            <circle cx="1605" cy="-110" r="6" />
            <circle cx="1556" cy="-22" r="8" />
          </g>

          <g>
            <rect x="1645" y="-15" width="60" height="215" />
            <rect x="1715" y="-40" width="80" height="240" />
            <rect x="1810" y="-25" width="65" height="225" />
            <polygon points="1880,-15 1880,200 1955,200 1955,-35 1915,-55" />
          </g>

          {/* Lit windows — warm amber */}
          <g fill="#ffc880">
            {[
              [235, 20], [255, 20], [235, 60], [255, 60], [235, 100], [255, 100], [235, 140], [255, 140],
              [305, -20], [340, -20], [305, 30], [340, 30], [305, 80], [340, 80], [305, 130], [340, 130],
              [395, -60], [415, -60], [395, -20], [415, -20], [395, 20], [415, 20], [395, 60], [415, 60], [395, 100], [415, 100],
              [465, 0], [495, 0], [520, 0], [465, 50], [495, 50], [520, 50], [465, 100], [495, 100], [520, 100],
              [565, 0], [595, 0], [620, 0], [565, 50], [595, 50], [620, 50], [565, 100],
              [670, 0], [695, 0], [670, 50], [695, 50], [670, 100],
              [935, 10], [965, 10], [935, 50], [965, 50], [935, 100], [965, 100], [935, 140], [965, 140],
              [1015, 30], [1045, 30], [1015, 70], [1045, 70], [1015, 110], [1045, 110],
              [1100, 30], [1130, 30], [1155, 30], [1100, 70], [1130, 70], [1155, 70],
              [1200, 0], [1225, 0], [1200, 50], [1225, 50], [1200, 100], [1225, 100], [1200, 150], [1225, 150],
              [1265, -90], [1285, -90], [1265, -50], [1285, -50], [1265, -10], [1285, -10], [1265, 30], [1285, 30], [1265, 70], [1285, 70], [1265, 110], [1285, 110], [1265, 150], [1285, 150],
              [1325, 10], [1355, 10], [1380, 10], [1325, 60], [1355, 60], [1380, 60], [1325, 110], [1355, 110], [1380, 110],
              [1413, 0], [1438, 0], [1413, 50], [1438, 50], [1413, 100], [1438, 100],
              [1660, 10], [1685, 10], [1660, 60], [1685, 60], [1660, 110], [1685, 110],
              [1728, -10], [1755, -10], [1780, -10], [1728, 40], [1755, 40], [1780, 40], [1728, 90], [1755, 90], [1780, 90],
              [1825, 5], [1850, 5], [1825, 55], [1850, 55], [1825, 105], [1850, 105],
              [1895, 0], [1920, 0], [1895, 50], [1920, 50], [1895, 100], [1920, 100],
            ].map(([x, y], i) => (
              <rect
                key={`win-${i}`}
                x={x}
                y={y}
                width="4"
                height="6"
                opacity={0.55 + ((i * 7) % 5) / 12}
              />
            ))}
          </g>
        </g>

        {/* Route — outer glow */}
        <g filter="url(#route-glow)">
          <path
            id="hero-route-path"
            d="M -50 940 Q 480 800 960 850 T 2000 750"
            fill="none"
            stroke="url(#route-grad)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
        {/* Route — dashed top layer */}
        <path
          d="M -50 940 Q 480 800 960 850 T 2000 750"
          fill="none"
          stroke="#ffd3a4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="14 12"
          className="hero-route-dash"
        />

        {/* Pickup point */}
        <g>
          <circle cx="120" cy="900" r="7" fill="#ffa86b" className="hero-pulse" />
          <circle cx="120" cy="900" r="20" fill="none" stroke="#ffa86b" strokeWidth="1.4" opacity="0.5" className="hero-ring" />
        </g>
        {/* Dropoff point */}
        <g>
          <circle cx="1900" cy="755" r="7" fill="#fff" className="hero-pulse" style={{ animationDelay: '1s' }} />
          <circle cx="1900" cy="755" r="20" fill="none" stroke="#fff" strokeWidth="1.4" opacity="0.5" className="hero-ring" style={{ animationDelay: '1s' }} />
        </g>

        {/* Car (moving along route based on scroll) */}
        <circle ref={carHaloRef} cx="120" cy="900" r="18" fill="#fff8e0" opacity="0.5" filter="url(#car-glow)" />
        <circle ref={carRef} cx="120" cy="900" r="5" fill="#fff8e0" />
      </svg>

      <style jsx>{`
        :global(.hero-star) {
          animation: hero-twinkle 3s ease-in-out infinite;
        }
        @keyframes hero-twinkle {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        :global(.hero-route-dash) {
          animation: hero-dash 6s linear infinite;
        }
        @keyframes hero-dash {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -104; }
        }
        :global(.hero-pulse) {
          animation: hero-pulse 2.2s ease-in-out infinite;
        }
        @keyframes hero-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.55; }
        }
        :global(.hero-ring) {
          animation: hero-ring 2.2s ease-out infinite;
          transform-origin: center;
          transform-box: fill-box;
        }
        @keyframes hero-ring {
          0% { transform: scale(0.6); opacity: 0.7; }
          100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

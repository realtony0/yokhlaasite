'use client';

import { useEffect, useRef, useState } from 'react';
import { HeroScene } from './HeroScene';
import { useSlideDeck } from './SlideDeck';

export function Hero() {
  const progressRef = useRef(0);
  const [mounted, setMounted] = useState(false);
  const { active, next } = useSlideDeck();

  useEffect(() => {
    setMounted(true);
  }, []);

  // When this slide is active, drive the car along the route subtly
  useEffect(() => {
    if (active !== 0) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = () => {
      const elapsed = (performance.now() - t0) / 1000;
      // Soft auto-progression of the car (loops 0 → 1 over 12s)
      progressRef.current = (elapsed / 12) % 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <HeroScene progressRef={progressRef} />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%), linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 25%, transparent 60%, rgba(0,0,0,0.85) 100%)',
        }}
      />

      <div className="absolute inset-0 z-20 flex flex-col">
        <div className="pt-28 md:pt-36" />

        <div className="flex-1 container-site flex items-center">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 w-full items-center">
            <div className="lg:col-span-8">
              <div
                className={`text-eyebrow mb-6 md:mb-8 text-white/75 transition-all duration-1000 ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                Dakar · Sénégal · 2026
              </div>

              <h1
                className={`text-display uppercase transition-all duration-1000 delay-150 ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ textShadow: '0 8px 60px rgba(0,0,0,0.8)' }}
              >
                Conduire.
                <br />
                <span className="italic font-light">Garder</span>{' '}
                <span className="whitespace-nowrap text-accent">100&nbsp;%</span>
                <br />
                des gains.
              </h1>
            </div>

            <div className="lg:col-span-4">
              <div
                className={`max-w-sm lg:ml-auto transition-all duration-1000 delay-300 ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <div className="hairline mb-6 md:mb-8" />
                <p className="text-[15px] md:text-[16px] leading-[1.65] font-light text-white/85 mb-6 md:mb-8">
                  Le premier service de transport sans commission au Sénégal.
                  Abonnement fixe{' '}
                  <span className="font-mono text-white whitespace-nowrap">
                    18&thinsp;500&thinsp;FCFA
                  </span>{' '}
                  par mois. Aucun prélèvement sur les courses.
                </p>

                <div className="flex flex-col gap-3">
                  <button onClick={next} className="btn-solid">
                    Découvrir
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path
                        d="M4 6l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-24 md:pb-12 container-site">
          <div className="hairline mb-5" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6 text-white/80">
            <MetaItem eyebrow="Localisation" value="Dakar" />
            <MetaItem eyebrow="Lancement" value="2026" />
            <MetaItem eyebrow="Abonnement" value="18 500 FCFA" mono />
            <MetaItem eyebrow="Commission" value="0 %" mono />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetaItem({ eyebrow, value, mono }: { eyebrow: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div className="text-eyebrow mb-1 md:mb-2 text-white/60">{eyebrow}</div>
      <div className={`text-[12px] md:text-[14px] text-white font-medium ${mono ? 'font-mono' : ''}`}>
        {value}
      </div>
    </div>
  );
}

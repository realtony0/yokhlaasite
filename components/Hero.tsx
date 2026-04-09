'use client';

import { useInView } from '@/lib/useInView';

export function Hero() {
  const [ref, inView] = useInView<HTMLDivElement>({ once: true, threshold: 0.01 });

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] flex items-center overflow-hidden"
    >
      {/* Full-bleed background with Ken Burns */}
      <div className="hero-bg" aria-hidden />

      {/* Hairline grid overlay (very subtle) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        aria-hidden
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '120px 120px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 80%)',
        }}
      />

      {/* Content */}
      <div className="container-site relative z-10 pt-36 pb-24">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          {/* Left — massive headline (8/12) */}
          <div className={`lg:col-span-8 reveal ${inView ? 'in-view' : ''}`}>
            <h1 className="text-display uppercase">
              Conduire.<br />
              Garder<br />
              <span className="italic font-extralight">100 %</span>
              <br />
              des gains.
            </h1>
          </div>

          {/* Right — subhead + CTAs (4/12) */}
          <div className={`lg:col-span-4 reveal reveal-delay-2 ${inView ? 'in-view' : ''}`}>
            <div className="max-w-sm lg:ml-auto">
              <div className="hairline mb-8" />
              <p className="text-subhead mb-10">
                Le premier service de transport sans commission à Dakar.
                Abonnement fixe de{' '}
                <span className="font-mono text-ink whitespace-nowrap">18&thinsp;500&thinsp;FCFA</span>{' '}
                par mois. Aucun prélèvement sur les courses.
              </p>

              <div className="flex flex-col gap-3">
                <a href="#inscription" className="btn-solid">
                  Réserver une place
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M3 8h10m-4-4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a href="#avantages" className="btn-outline">
                  En savoir plus
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom strip — meta info */}
        <div className={`reveal reveal-delay-3 ${inView ? 'in-view' : ''} mt-24 lg:mt-32`}>
          <div className="hairline mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
            <MetaItem eyebrow="Localisation" value="Dakar, Sénégal" />
            <MetaItem eyebrow="Lancement" value="2026" />
            <MetaItem eyebrow="Abonnement" value="18 500 FCFA / mois" mono />
            <MetaItem eyebrow="Commission" value="0 %" mono />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ink/40 text-[10px] uppercase tracking-[0.3em] flex flex-col items-center gap-3">
        <span>Scroll</span>
        <svg width="10" height="20" viewBox="0 0 10 20" fill="none" aria-hidden>
          <path d="M5 0v18m-4-4l4 4 4-4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}

function MetaItem({ eyebrow, value, mono }: { eyebrow: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div className="text-eyebrow mb-2">{eyebrow}</div>
      <div className={`text-[14px] md:text-[15px] text-ink font-medium ${mono ? 'font-mono' : ''}`}>
        {value}
      </div>
    </div>
  );
}

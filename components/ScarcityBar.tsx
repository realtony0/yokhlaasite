'use client';

import { useInView } from '@/lib/useInView';

interface ScarcityBarProps {
  signedUp?: number;
  total?: number;
}

export function ScarcityBar({ signedUp = 27, total = 50 }: ScarcityBarProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ once: true, threshold: 0.25 });
  const percent = Math.min(100, Math.round((signedUp / total) * 100));
  const remaining = Math.max(0, total - signedUp);

  return (
    <section className="relative py-20 lg:py-24 border-t border-b border-line">
      <div ref={ref} className="container-site">
        <div className={`reveal ${inView ? 'in-view' : ''}`}>
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-5">
              <div className="text-eyebrow mb-6">Offre limitée</div>
              <h3 className="text-headline uppercase max-w-md">
                Les 50 premiers<br />chauffeurs.
              </h3>
            </div>

            <div className="lg:col-span-7 flex items-end gap-10 lg:gap-16 lg:justify-end">
              <div>
                <div className="text-eyebrow mb-3">Inscrits</div>
                <div className="text-[clamp(3rem,6vw,5rem)] font-display font-extrabold leading-none tracking-tightest font-mono text-ink">
                  {String(signedUp).padStart(2, '0')}
                </div>
              </div>
              <div className="font-display text-[clamp(3rem,6vw,5rem)] leading-none text-ink/20 font-extralight">
                /
              </div>
              <div>
                <div className="text-eyebrow mb-3">Total</div>
                <div className="text-[clamp(3rem,6vw,5rem)] font-display font-extrabold leading-none tracking-tightest font-mono text-ink/30">
                  {total}
                </div>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-16">
            <div className="relative h-[2px] bg-white/10">
              <div
                className="absolute inset-y-0 left-0 bg-white transition-all duration-[1500ms] ease-out"
                style={{ width: inView ? `${percent}%` : '0%' }}
              />
            </div>
            <div className="mt-5 flex items-baseline justify-between text-[11px] uppercase tracking-[0.18em] text-dim">
              <span className="font-mono">{percent} % complet</span>
              <span>
                <span className="text-ink font-mono">{String(remaining).padStart(2, '0')}</span>
                <span className="ml-2">places restantes</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

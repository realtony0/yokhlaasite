'use client';

import { useMemo, useState } from 'react';
import { useInView } from '@/lib/useInView';

const SUBSCRIPTION = 18500;
const COMPETITOR_COMMISSION = 0.2;
const DAYS_PER_MONTH = 26;
const formatFCFA = (n: number) => new Intl.NumberFormat('fr-FR').format(Math.round(n));

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  format?: (n: number) => string;
  onChange: (v: number) => void;
}

function Slider({ label, value, min, max, step = 1, format, onChange }: SliderProps) {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <label className="text-eyebrow">{label}</label>
        <span className="text-[clamp(1.5rem,2.5vw,2rem)] font-display font-extrabold font-mono text-ink tracking-tightest">
          {format ? format(value) : value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider-minimal w-full"
        style={{ ['--fill' as string]: `${percent}%` }}
      />
      <div className="flex justify-between mt-3 text-[10px] text-dim font-mono uppercase tracking-[0.15em]">
        <span>{format ? format(min) : min}</span>
        <span>{format ? format(max) : max}</span>
      </div>
    </div>
  );
}

export function Calculator() {
  const [coursesPerDay, setCoursesPerDay] = useState(12);
  const [avgPrice, setAvgPrice] = useState(2500);
  const [ref, inView] = useInView<HTMLDivElement>({ once: true, threshold: 0.1 });

  const { yokhlaaRevenue, competitorRevenue, saving } = useMemo(() => {
    const gross = coursesPerDay * avgPrice * DAYS_PER_MONTH;
    const yokhlaa = gross - SUBSCRIPTION;
    const competitor = gross * (1 - COMPETITOR_COMMISSION);
    return {
      yokhlaaRevenue: Math.max(0, yokhlaa),
      competitorRevenue: Math.max(0, competitor),
      saving: Math.max(0, yokhlaa - competitor),
    };
  }, [coursesPerDay, avgPrice]);

  return (
    <>
      <section id="calculateur" ref={ref} className="relative section-pad border-t border-line">
        <div className="container-site">
          <div className={`reveal ${inView ? 'in-view' : ''} mb-10 lg:mb-14 max-w-4xl`}>
            <div className="text-eyebrow mb-6">Simulateur de revenus</div>
            <h2 className="text-display-sm uppercase">
              Combien de gain<br />
              <span className="italic font-extralight">par mois ?</span>
            </h2>
          </div>

          <div className={`reveal reveal-delay-1 ${inView ? 'in-view' : ''} grid lg:grid-cols-2 gap-16 lg:gap-24`}>
            {/* Sliders */}
            <div>
              <div className="space-y-14">
                <Slider
                  label="Courses par jour"
                  value={coursesPerDay}
                  min={4}
                  max={25}
                  onChange={setCoursesPerDay}
                />
                <Slider
                  label="Prix moyen par course"
                  value={avgPrice}
                  min={1500}
                  max={5000}
                  step={100}
                  format={(n) => `${formatFCFA(n)} F`}
                  onChange={setAvgPrice}
                />
              </div>

              <div className="mt-14 pt-10 border-t border-line grid grid-cols-3 gap-6">
                <div>
                  <div className="text-eyebrow mb-2">Jours / mois</div>
                  <div className="font-mono text-[18px] font-bold text-ink">{DAYS_PER_MONTH}</div>
                </div>
                <div>
                  <div className="text-eyebrow mb-2">Courses / mois</div>
                  <div className="font-mono text-[18px] font-bold text-ink">
                    {formatFCFA(coursesPerDay * DAYS_PER_MONTH)}
                  </div>
                </div>
                <div>
                  <div className="text-eyebrow mb-2">CA brut</div>
                  <div className="font-mono text-[18px] font-bold text-ink">
                    {formatFCFA(coursesPerDay * avgPrice * DAYS_PER_MONTH)}
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div>
              {/* Yokh Laa */}
              <div className="mb-14">
                <div className="text-eyebrow mb-3">Avec Yokh Laa</div>
                <div className="font-display text-[clamp(3rem,6vw,5rem)] font-extrabold font-mono leading-none tracking-tightest text-ink">
                  {formatFCFA(yokhlaaRevenue)}
                </div>
                <div className="text-[13px] text-dim mt-3 uppercase tracking-[0.15em]">FCFA / mois</div>
                <div className="text-[11px] text-dim mt-2 font-mono">
                  CA brut − 18 500 FCFA d&apos;abonnement
                </div>
              </div>

              <div className="hairline mb-14" />

              {/* Competitor */}
              <div className="mb-14">
                <div className="text-eyebrow mb-3">Avec Uber ou Yango (20 % commission)</div>
                <div className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold font-mono leading-none tracking-tightest text-ink/30 line-through decoration-ink/20">
                  {formatFCFA(competitorRevenue)}
                </div>
                <div className="text-[13px] text-dim mt-3 uppercase tracking-[0.15em]">FCFA / mois</div>
              </div>

              {/* Saving */}
              <div className="border border-line p-8 lg:p-10">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                  <div>
                    <div className="text-eyebrow mb-3">Gain supplémentaire</div>
                    <div className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-extrabold font-mono leading-none tracking-tightest text-ink">
                      +{formatFCFA(saving)}
                    </div>
                    <div className="text-[12px] text-dim mt-2 uppercase tracking-[0.15em]">FCFA / mois</div>
                  </div>
                  <div className="text-right">
                    <div className="text-eyebrow mb-2">Soit / an</div>
                    <div className="font-mono text-[20px] font-bold text-ink">
                      +{formatFCFA(saving * 12)}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-dim mt-6 leading-relaxed font-mono">
                Estimation basée sur {DAYS_PER_MONTH} jours travaillés par mois et une commission concurrente de 20 %.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .slider-minimal {
          -webkit-appearance: none;
          appearance: none;
          height: 2px;
          border-radius: 0;
          background: linear-gradient(
            to right,
            #ffffff 0%,
            #ffffff var(--fill),
            rgba(255, 255, 255, 0.12) var(--fill),
            rgba(255, 255, 255, 0.12) 100%
          );
          outline: none;
          cursor: pointer;
          margin: 18px 0;
        }
        .slider-minimal::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #fff;
          cursor: grab;
          transition: transform 200ms;
          border: none;
        }
        .slider-minimal::-webkit-slider-thumb:hover {
          transform: scale(1.25);
        }
        .slider-minimal::-webkit-slider-thumb:active {
          cursor: grabbing;
        }
        .slider-minimal::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #fff;
          cursor: grab;
          border: none;
        }
      `}</style>
    </>
  );
}

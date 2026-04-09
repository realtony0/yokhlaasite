'use client';

import { useInView } from '@/lib/useInView';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  zone: string;
}

const items: Testimonial[] = [
  {
    name: 'Moussa D.',
    role: 'Chauffeur — 8 ans d\'expérience',
    zone: 'Plateau',
    quote:
      "Avec Yango, je laisse 250 000 FCFA par mois en commissions. Chez Yokh Laa, je récupère tout.",
  },
  {
    name: 'Aïssatou N.',
    role: 'Chauffeur indépendante',
    zone: 'Almadies',
    quote:
      "Ce qui me convainc, c'est le prix bloqué à vie. Dans cinq ans, les autres auront augmenté. Moi, je paierai toujours 18 500.",
  },
  {
    name: 'Ibrahima S.',
    role: 'Chauffeur et taxi',
    zone: 'Ouakam',
    quote:
      "Enfin une application où le support parle français et wolof. Conçue par des Sénégalais, pour des Sénégalais.",
  },
];

export function Testimonials() {
  const [ref, inView] = useInView<HTMLDivElement>({ once: true, threshold: 0.05 });

  return (
    <section ref={ref} className="relative py-32 lg:py-48 border-t border-line">
      <div className="container-site">
        <div className={`reveal ${inView ? 'in-view' : ''} mb-20 lg:mb-28 max-w-4xl`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="text-eyebrow">Témoignages</div>
            <span className="text-[10px] uppercase tracking-[0.22em] text-ink/35 font-mono border border-line px-2 py-0.5">
              À venir
            </span>
          </div>
          <h2 className="text-display-sm uppercase">
            Les premiers chauffeurs<br />
            <span className="italic font-extralight">ont déjà choisi.</span>
          </h2>
        </div>

        <div className="space-y-16 lg:space-y-20">
          {items.map((t, i) => (
            <div
              key={t.name}
              className={`reveal reveal-delay-${i + 1} ${inView ? 'in-view' : ''}`}
            >
              <div className="hairline mb-10" />
              <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-2">
                  <div className="text-eyebrow font-mono">0{i + 1} / 03</div>
                </div>

                <div className="lg:col-span-7">
                  <blockquote className="text-[clamp(1.25rem,2.2vw,1.875rem)] leading-[1.4] font-light text-ink italic">
                    « {t.quote} »
                  </blockquote>
                </div>

                <div className="lg:col-span-3">
                  <div className="text-[14px] font-medium text-ink">{t.name}</div>
                  <div className="text-[12px] text-ink/55 mt-1">{t.role}</div>
                  <div className="text-eyebrow font-mono mt-3">{t.zone}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

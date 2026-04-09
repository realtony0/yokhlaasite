'use client';

import { useInView } from '@/lib/useInView';

interface Prop {
  index: string;
  title: string;
  description: string;
  figure: string;
  figureSuffix?: string;
}

const props: Prop[] = [
  {
    index: '01',
    title: 'Aucune commission',
    description:
      "Contrairement aux plateformes traditionnelles qui prélèvent 20 à 25 % sur chaque course, Yokh Laa ne prélève rien. Le montant affiché au passager correspond exactement à celui perçu par le chauffeur.",
    figure: '0',
    figureSuffix: '%',
  },
  {
    index: '02',
    title: 'Abonnement fixe',
    description:
      "Un forfait mensuel unique et transparent. Courses illimitées, chat passager, tableau de bord analytique, support prioritaire. Aucun frais caché, aucun palier, aucune augmentation dissimulée.",
    figure: '18 500',
    figureSuffix: 'FCFA / mois',
  },
  {
    index: '03',
    title: 'Tarif garanti à vie',
    description:
      "Les 50 premiers chauffeurs conservent leur tarif initial, même en cas d'augmentation ultérieure. Une garantie inscrite dans le contrat, sans clause de révision.",
    figure: '∞',
    figureSuffix: 'années',
  },
];

export function ValueProps() {
  const [ref, inView] = useInView<HTMLDivElement>({ once: true, threshold: 0.05 });

  return (
    <section id="avantages" ref={ref} className="relative py-32 lg:py-48">
      <div className="container-site">
        {/* Section header */}
        <div className={`reveal ${inView ? 'in-view' : ''} mb-24 lg:mb-36 max-w-4xl`}>
          <div className="text-eyebrow mb-6">Principes fondamentaux</div>
          <h2 className="text-display-sm uppercase">
            Trois promesses.<br />
            <span className="italic font-extralight">Zéro exception.</span>
          </h2>
        </div>

        {/* Props — editorial numbered list */}
        <div className="space-y-20 lg:space-y-28">
          {props.map((p, i) => (
            <div
              key={p.title}
              className={`reveal reveal-delay-${i + 1} ${inView ? 'in-view' : ''}`}
            >
              <div className="hairline mb-12" />
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-1">
                  <div className="text-eyebrow font-mono">{p.index}</div>
                </div>

                <div className="lg:col-span-4">
                  <h3 className="text-headline uppercase">{p.title}</h3>
                </div>

                <div className="lg:col-span-4">
                  <p className="text-[16px] leading-[1.75] font-light text-ink/70 max-w-md">
                    {p.description}
                  </p>
                </div>

                <div className="lg:col-span-3 lg:text-right">
                  <div className="inline-flex flex-col lg:items-end">
                    <div className="font-display text-[clamp(3rem,5.5vw,4.5rem)] font-extrabold leading-[0.9] tracking-tightest text-ink font-mono">
                      {p.figure}
                    </div>
                    {p.figureSuffix && (
                      <div className="text-eyebrow mt-4">{p.figureSuffix}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

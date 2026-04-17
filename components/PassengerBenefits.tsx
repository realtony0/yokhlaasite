'use client';

import { useInView } from '@/lib/useInView';

interface Benefit {
  index: string;
  title: string;
  description: string;
  figure: string;
  figureSuffix?: string;
}

const benefits: Benefit[] = [
  {
    index: '01',
    title: 'Prix affiché = prix payé',
    description:
      "Le tarif annoncé avant le départ est exactement celui que vous réglez à l'arrivée. Pas d'arrondi, pas de frais cachés, pas de mauvaise surprise. Calcul transparent : une base fixe, plus un tarif kilométrique visible dans l'application.",
    figure: '0',
    figureSuffix: 'surprise',
  },
  {
    index: '02',
    title: 'Tarifs plus bas',
    description:
      "Sans commission de plateforme, les chauffeurs n'ont pas besoin de gonfler leurs prix pour compenser. Le montant reflète le vrai coût du trajet : carburant, temps, usure. En moyenne 15 à 25 % moins cher que les applications internationales.",
    figure: '−20',
    figureSuffix: '% en moyenne',
  },
  {
    index: '03',
    title: 'Paiement libre',
    description:
      "Payez directement au chauffeur, de la manière qui vous convient : espèces, Wave, Orange Money. Aucune carte bancaire requise, aucun dépôt, aucun prélèvement automatique. L'application ne touche jamais à votre argent.",
    figure: '3',
    figureSuffix: 'modes de paiement',
  },
  {
    index: '04',
    title: 'Sécurité intégrée',
    description:
      "Chauffeurs vérifiés par pièce d'identité, permis et casier judiciaire. Bouton SOS dans l'application (police + partage de position). Partage de position en direct avec un proche pendant toute la course, via un simple lien.",
    figure: 'SOS',
    figureSuffix: '+ suivi live',
  },
];

export function PassengerBenefits() {
  const [ref, inView] = useInView<HTMLDivElement>({ once: true, threshold: 0.05 });

  return (
    <section id="passagers" ref={ref} className="relative section-pad border-t border-line">
      <div className="container-site">
        {/* Section header */}
        <div className={`reveal ${inView ? 'in-view' : ''} mb-10 lg:mb-14 max-w-4xl`}>
          <div className="text-eyebrow mb-6">Pour les passagers</div>
          <h2 className="text-display-sm uppercase">
            Un trajet juste.<br />
            <span className="italic font-extralight">Un prix honnête.</span>
          </h2>
          <p className="text-[16px] leading-[1.7] font-light text-ink/70 mt-8 max-w-xl">
            Quand le chauffeur garde 100 % de sa course, tout le monde y gagne.
            Des tarifs plus bas, plus transparents, et un service local pensé
            pour Dakar.
          </p>
        </div>

        {/* Benefits — editorial numbered list */}
        <div className="space-y-10 lg:space-y-14">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className={`reveal reveal-delay-${i + 1} ${inView ? 'in-view' : ''}`}
            >
              <div className="hairline mb-12" />
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-1">
                  <div className="text-eyebrow font-mono text-accent">{b.index}</div>
                </div>

                <div className="lg:col-span-4">
                  <h3 className="text-headline uppercase">{b.title}</h3>
                </div>

                <div className="lg:col-span-4">
                  <p className="text-[16px] leading-[1.75] font-light text-ink/70 max-w-md">
                    {b.description}
                  </p>
                </div>

                <div className="lg:col-span-3 lg:text-right">
                  <div className="inline-flex flex-col lg:items-end">
                    <div className="font-display text-[clamp(3rem,5.5vw,4.5rem)] font-extrabold leading-[0.9] tracking-tightest text-accent font-mono">
                      {b.figure}
                    </div>
                    {b.figureSuffix && (
                      <div className="text-eyebrow mt-4">{b.figureSuffix}</div>
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

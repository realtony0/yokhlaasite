'use client';

import { useState } from 'react';
import { useInView } from '@/lib/useInView';

interface QA {
  q: string;
  a: React.ReactNode;
}

const items: QA[] = [
  {
    q: "Comment fonctionne l'abonnement mensuel ?",
    a: (
      <>
        L'abonnement est de{' '}
        <strong className="text-accent font-medium">25&nbsp;000&nbsp;FCFA</strong>{' '}
        par mois, sans engagement. Avec les autocollants (−10&nbsp;000&nbsp;FCFA)
        et le parrainage (1 mois offert tous les 5 filleuls), votre mensualité
        réelle peut descendre à{' '}
        <strong className="text-ink font-medium">15&nbsp;000&nbsp;FCFA</strong>{' '}
        voire à zéro. Paiement en début de mois via Wave, Orange Money ou Free Money.
        Aucune commission, aucun frais caché. Résiliation possible à tout
        moment — l'abonnement prend fin à l'issue du mois en cours, sans
        engagement ni pénalité.
      </>
    ),
  },
  {
    q: 'Quels documents sont requis ?',
    a: (
      <>
        <ul className="space-y-2 list-none">
          {[
            "Carte nationale d'identité (recto et verso)",
            'Permis de conduire (recto et verso)',
            'Carte grise du véhicule',
            "Certificat d'assurance à jour",
            'Photographies du véhicule (quatre angles)',
            'Casier judiciaire de moins de trois mois',
          ].map((d) => (
            <li key={d} className="flex items-start gap-3">
              <span className="mt-2 h-[3px] w-3 bg-ink/60 shrink-0" aria-hidden />
              <span>{d}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[13px] text-ink/50">
          Validation par notre équipe sous 48 heures.
        </p>
      </>
    ),
  },
  {
    q: 'Comment les passagers paient-ils ?',
    a: (
      <>
        Directement au chauffeur, en espèces, via Wave ou Orange Money, selon
        la préférence du passager. Yokh Laa n'intervient jamais dans la
        transaction. L'application affiche le tarif calculé à l'avance, et le
        chauffeur perçoit <strong className="text-ink font-medium">100&nbsp;% du montant</strong>.
      </>
    ),
  },
  {
    q: "Que se passe-t-il en cas de non-paiement d'un mois ?",
    a: (
      <>
        Une notification est envoyée trois jours avant l'échéance. Sans
        renouvellement, le compte est mis en pause et ne reçoit plus de courses
        jusqu'au règlement. Aucune pénalité n'est appliquée, et le compte peut
        être réactivé à tout moment.
      </>
    ),
  },
  {
    q: "Pourquoi limiter l'offre à 50 chauffeurs ?",
    a: (
      <>
        L'objectif est de démarrer avec une équipe restreinte que nous pouvons
        accompagner individuellement : formation, assistance, retours produit.
        Les 50 premiers chauffeurs bénéficient du{' '}
        <strong className="text-ink font-medium">premier mois offert</strong> et du{' '}
        <strong className="text-accent font-medium">tarif bloqué à 25&nbsp;000&nbsp;FCFA</strong>,
        même lors des futures révisions tarifaires.
      </>
    ),
  },
  {
    q: 'Comment fonctionne le parrainage ?',
    a: (
      <>
        Chaque chauffeur dispose d'un code unique à partager. Dès que{' '}
        <strong className="text-accent font-medium">5 filleuls</strong> souscrivent
        un abonnement actif, un{' '}
        <strong className="text-ink font-medium">mois gratuit</strong> est
        automatiquement ajouté à votre compte. Le système est{' '}
        <strong className="text-ink font-medium">illimité</strong> : 10 filleuls = 2 mois
        offerts, 15 filleuls = 3 mois, et ainsi de suite. Les mois offerts
        s'accumulent et se cumulent avec votre tarif préférentiel.
      </>
    ),
  },
  {
    q: 'Comment obtenir la réduction avec les autocollants ?',
    a: (
      <>
        Il suffit d'apposer les autocollants officiels Yokh Laa sur votre
        véhicule (fournis gratuitement lors de l'inscription) et d'en transmettre
        une photo via l'application. Une fois validés, vous bénéficiez
        automatiquement de{' '}
        <strong className="text-accent font-medium">10 000&nbsp;FCFA de réduction</strong>{' '}
        sur chaque mensualité, aussi longtemps que les autocollants restent
        visibles. Un contrôle ponctuel peut être effectué sur le terrain.
      </>
    ),
  },
];

function AccordionItem({
  qa,
  isOpen,
  onToggle,
  index,
}: {
  qa: QA;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div className="border-b border-line">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-8 py-10 text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-8 flex-1">
          <span className="text-eyebrow font-mono shrink-0 mt-2 text-accent">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3
            className={`text-[clamp(1.125rem,2vw,1.5rem)] font-display font-extrabold uppercase leading-tight tracking-tightest transition-colors ${
              isOpen ? 'text-ink' : 'text-ink/80 group-hover:text-ink'
            }`}
          >
            {qa.q}
          </h3>
        </div>
        <span
          className={`shrink-0 mt-3 h-[1px] w-6 relative transition-all duration-500 ${
            isOpen ? 'bg-ink' : 'bg-ink/50'
          }`}
        >
          <span
            className={`absolute left-1/2 top-1/2 w-[1px] h-6 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
              isOpen ? 'scale-y-0 bg-ink' : 'scale-y-100 bg-ink/50'
            }`}
          />
        </span>
      </button>
      <div
        className={`grid transition-all duration-500 ease-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100 pb-12' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="ml-[52px] pr-8 text-[16px] leading-[1.75] font-light text-ink/70 max-w-2xl">
            {qa.a}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const [ref, inView] = useInView<HTMLDivElement>({ once: true, threshold: 0.02 });

  return (
    <section id="faq" ref={ref} className="relative section-pad border-t border-line">
      <div className="container-site">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className={`lg:col-span-4 reveal ${inView ? 'in-view' : ''}`}>
            <div className="text-eyebrow mb-6">Questions fréquentes</div>
            <h2 className="text-display-sm uppercase">
              Tout ce qu'il<br />
              <span className="italic font-extralight">faut savoir.</span>
            </h2>
            <p className="text-[16px] leading-[1.7] font-light text-ink/70 mt-10 max-w-md">
              Une autre question ? Contactez-nous directement par email.
              Réponse sous 24 heures.
            </p>
            <a
              href="mailto:contact@yokhlaa.app"
              className="inline-flex items-center gap-2 mt-8 text-[13px] uppercase tracking-[0.18em] text-ink font-medium border-b border-ink/40 hover:border-ink pb-1 transition-colors"
            >
              contact@yokhlaa.app
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M3 8h10m-4-4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          <div className={`lg:col-span-8 reveal reveal-delay-1 ${inView ? 'in-view' : ''}`}>
            <div className="border-t border-line">
              {items.map((qa, i) => (
                <AccordionItem
                  key={qa.q}
                  qa={qa}
                  index={i}
                  isOpen={open === i}
                  onToggle={() => setOpen(open === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

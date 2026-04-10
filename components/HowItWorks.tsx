'use client';

import { useInView } from '@/lib/useInView';

interface Step {
  num: string;
  title: string;
  description: string;
  eta: string;
}

const steps: Step[] = [
  {
    num: '01',
    title: 'Inscription',
    description:
      "Remplissez le formulaire avec vos coordonnées et les informations de votre véhicule. Deux minutes suffisent.",
    eta: '02 min',
  },
  {
    num: '02',
    title: 'Vérification',
    description:
      "Notre équipe contrôle vos documents : identité, permis de conduire, carte grise, assurance. Validation sous 48 heures.",
    eta: '48 h',
  },
  {
    num: '03',
    title: 'Mise en service',
    description:
      "Téléchargez l'application Yokh Laa Chauffeur, activez votre compte et commencez à recevoir des courses. Premier mois offert.",
    eta: 'Jour J',
  },
];

export function HowItWorks() {
  const [ref, inView] = useInView<HTMLDivElement>({ once: true, threshold: 0.05 });

  return (
    <section ref={ref} className="relative section-pad border-t border-line">
      <div className="container-site">
        <div className={`reveal ${inView ? 'in-view' : ''} mb-10 lg:mb-14 max-w-4xl`}>
          <div className="text-eyebrow mb-6">Processus</div>
          <h2 className="text-display-sm uppercase">
            Trois étapes.<br />
            <span className="italic font-extralight">Rien de plus.</span>
          </h2>
        </div>

        <div className="space-y-10 lg:space-y-14">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`reveal reveal-delay-${i + 1} ${inView ? 'in-view' : ''}`}
            >
              <div className="hairline mb-12" />
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-1">
                  <div className="text-eyebrow font-mono">{step.num}</div>
                </div>
                <div className="lg:col-span-4">
                  <h3 className="text-headline uppercase">{step.title}</h3>
                </div>
                <div className="lg:col-span-4">
                  <p className="text-[16px] leading-[1.75] font-light text-ink/70 max-w-md">
                    {step.description}
                  </p>
                </div>
                <div className="lg:col-span-3 lg:text-right">
                  <div className="text-eyebrow font-mono">{step.eta}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

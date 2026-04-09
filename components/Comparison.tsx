'use client';

import { useInView } from '@/lib/useInView';

interface Row {
  feature: string;
  yokhlaa: string;
  uber: string;
  yango: string;
  bolt: string;
}

const rows: Row[] = [
  {
    feature: 'Commission sur course',
    yokhlaa: '0 %',
    uber: '25 %',
    yango: '20 %',
    bolt: '18 %',
  },
  {
    feature: 'Abonnement mensuel',
    yokhlaa: '18 500 FCFA',
    uber: '—',
    yango: '—',
    bolt: '—',
  },
  {
    feature: 'Paiement direct au chauffeur',
    yokhlaa: 'Oui',
    uber: 'Non',
    yango: 'Non',
    bolt: 'Partiel',
  },
  {
    feature: 'Support local français / wolof',
    yokhlaa: 'Oui',
    uber: 'Non',
    yango: 'Partiel',
    bolt: 'Partiel',
  },
  {
    feature: 'Siège au Sénégal',
    yokhlaa: 'Oui',
    uber: 'Non',
    yango: 'Non',
    bolt: 'Non',
  },
  {
    feature: 'Tarif garanti à vie (50 premiers)',
    yokhlaa: 'Oui',
    uber: 'Non',
    yango: 'Non',
    bolt: 'Non',
  },
];

function Cell({ value, highlight }: { value: string; highlight?: boolean }) {
  const isYes = value === 'Oui';
  const isNo = value === 'Non';
  return (
    <td
      className={`px-6 py-6 text-[15px] font-mono align-middle ${
        highlight ? 'text-ink' : isNo ? 'text-ink/35' : 'text-ink/70'
      }`}
    >
      <div className="flex items-center gap-2">
        {isYes && (
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M3 8l3 3 7-7"
              stroke={highlight ? '#fff' : 'rgba(255,255,255,0.7)'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {isNo && (
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M4 4l8 8M12 4l-8 8"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
        <span>{value}</span>
      </div>
    </td>
  );
}

export function Comparison() {
  const [ref, inView] = useInView<HTMLDivElement>({ once: true, threshold: 0.05 });

  return (
    <section id="comparaison" ref={ref} className="relative py-32 lg:py-48 border-t border-line">
      <div className="container-site">
        <div className={`reveal ${inView ? 'in-view' : ''} mb-20 lg:mb-28 max-w-4xl`}>
          <div className="text-eyebrow mb-6">Comparaison</div>
          <h2 className="text-display-sm uppercase">
            Le seul qui ne prélève<br />
            <span className="italic font-extralight">rien sur les courses.</span>
          </h2>
        </div>

        <div className={`reveal reveal-delay-1 ${inView ? 'in-view' : ''}`}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px]">
              <thead>
                <tr className="border-b border-line">
                  <th className="px-6 py-8 text-left text-eyebrow w-[34%]" scope="col">
                    Critère
                  </th>
                  <th className="px-6 py-8 text-left" scope="col">
                    <div className="text-[22px] font-display font-extrabold tracking-tightest text-ink">
                      YOKH LAA
                    </div>
                  </th>
                  <th className="px-6 py-8 text-left" scope="col">
                    <div className="text-[16px] font-display font-light text-ink/40">Uber</div>
                  </th>
                  <th className="px-6 py-8 text-left" scope="col">
                    <div className="text-[16px] font-display font-light text-ink/40">Yango</div>
                  </th>
                  <th className="px-6 py-8 text-left" scope="col">
                    <div className="text-[16px] font-display font-light text-ink/40">Bolt</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.feature} className="border-b border-line-soft">
                    <td className="px-6 py-6 text-[14px] text-ink/80">{row.feature}</td>
                    <Cell value={row.yokhlaa} highlight />
                    <Cell value={row.uber} />
                    <Cell value={row.yango} />
                    <Cell value={row.bolt} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[11px] text-dim mt-8 max-w-2xl font-mono uppercase tracking-[0.1em]">
            Taux indicatifs publiés par les plateformes en Afrique de l'Ouest, 2024 — 2025.
            Susceptibles de varier selon la ville et les offres promotionnelles.
          </p>
        </div>
      </div>
    </section>
  );
}

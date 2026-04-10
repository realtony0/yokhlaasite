'use client';

import { useState, type FormEvent } from 'react';
import { useInView } from '@/lib/useInView';
import { submitWaitlistEntry } from '@/lib/supabase';

const ZONES = [
  'Dakar Plateau',
  'Almadies',
  'Mermoz',
  'Ouakam',
  'Yoff',
  'Parcelles Assainies',
  'Keur Massar',
  'Pikine',
  'Guédiawaye',
  'Rufisque',
  'Autre',
];

const VEHICLES = ['Berline', 'SUV', 'Monospace', 'Taxi', 'Autre'];

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function SignupForm() {
  const [ref, inView] = useInView<HTMLDivElement>({ once: true, threshold: 0.05 });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const [form, setForm] = useState({
    nom: '',
    phone: '',
    zone: '',
    vehicule: '',
    annee: '',
    accepted: false,
  });

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!form.nom.trim()) return setErrorMsg('Le nom est requis');
    if (!form.phone.match(/^(\+221)?[\s]?[0-9]{2}[\s]?[0-9]{3}[\s]?[0-9]{2}[\s]?[0-9]{2}$/)) {
      return setErrorMsg('Format téléphone invalide. Exemple : +221 77 123 45 67');
    }
    if (!form.zone) return setErrorMsg('Veuillez sélectionner une zone de travail');
    if (!form.vehicule) return setErrorMsg('Veuillez sélectionner un type de véhicule');
    if (!form.accepted) return setErrorMsg('Acceptation des conditions requise');

    setStatus('submitting');

    const result = await submitWaitlistEntry({
      nom: form.nom.trim(),
      whatsapp: form.phone.replace(/\s/g, ''),
      role: 'chauffeur',
      zone: form.zone,
      vehicule: `${form.vehicule}${form.annee ? ` ${form.annee}` : ''}`,
    });

    if (result.success) {
      setStatus('success');
    } else {
      setStatus('error');
      setErrorMsg(result.error || 'Une erreur est survenue. Veuillez réessayer.');
    }
  };

  if (status === 'success') {
    return (
      <>
        <section id="inscription" className="relative section-pad border-t border-line">
          <div className="container-narrow text-center">
            <div className="text-eyebrow mb-6">Confirmation</div>
            <h2 className="text-display-sm uppercase mb-10">
              Inscription<br />
              <span className="italic font-extralight">confirmée.</span>
            </h2>
            <p className="text-subhead max-w-xl mx-auto mb-12">
              Votre place parmi les 50 premiers chauffeurs est réservée. Notre
              équipe prendra contact sous 48 heures pour la validation des
              documents et l'activation du premier mois offert.
            </p>
            <a href="#top" className="btn-outline">
              Retour en haut
            </a>
          </div>
        </section>
        <SiteEnd />
      </>
    );
  }

  return (
    <>
    <section id="inscription" ref={ref} className="relative section-pad border-t border-line">
      <div className="container-narrow relative">
        <div className={`reveal ${inView ? 'in-view' : ''} text-center mb-20 lg:mb-24`}>
          <div className="text-eyebrow mb-6">Inscription</div>
          <h2 className="text-display-sm uppercase">
            Réserver<br />
            <span className="italic font-extralight">une place.</span>
          </h2>
          <p className="text-subhead mt-8 max-w-lg mx-auto">
            Premier mois offert · Tarif à vie à{' '}
            <span className="text-accent font-medium">15 000 FCFA</span>{' '}
            par mois (au lieu de 20 000). Deux minutes d&rsquo;inscription.
          </p>
        </div>

        <div className={`reveal reveal-delay-1 ${inView ? 'in-view' : ''}`}>
          <form onSubmit={onSubmit} className="space-y-14">
            <Field label="Nom complet" required>
              <input
                type="text"
                value={form.nom}
                onChange={(e) => update('nom', e.target.value)}
                placeholder="Ex. Moussa Diop"
                className="input-line"
                disabled={status === 'submitting'}
              />
            </Field>

            <Field label="Téléphone WhatsApp" required>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                placeholder="+221 77 123 45 67"
                className="input-line"
                disabled={status === 'submitting'}
              />
            </Field>

            <div className="grid md:grid-cols-2 gap-10 md:gap-16">
              <Field label="Zone de travail" required>
                <select
                  value={form.zone}
                  onChange={(e) => update('zone', e.target.value)}
                  className="input-line"
                  disabled={status === 'submitting'}
                >
                  <option value="">Sélectionner</option>
                  {ZONES.map((z) => (
                    <option key={z} value={z}>{z}</option>
                  ))}
                </select>
              </Field>
              <Field label="Type de véhicule" required>
                <select
                  value={form.vehicule}
                  onChange={(e) => update('vehicule', e.target.value)}
                  className="input-line"
                  disabled={status === 'submitting'}
                >
                  <option value="">Sélectionner</option>
                  {VEHICLES.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Année du véhicule">
              <input
                type="number"
                min={1990}
                max={2026}
                value={form.annee}
                onChange={(e) => update('annee', e.target.value)}
                placeholder="2018"
                className="input-line"
                disabled={status === 'submitting'}
              />
            </Field>

            <div className="pt-6">
              <label className="flex items-start gap-4 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={form.accepted}
                  onChange={(e) => update('accepted', e.target.checked)}
                  className="sr-only"
                />
                <span
                  className={`mt-0.5 h-5 w-5 border flex items-center justify-center transition-all shrink-0 ${
                    form.accepted ? 'bg-white border-white' : 'border-ink/30 group-hover:border-ink/60'
                  }`}
                >
                  {form.accepted && (
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path
                        d="M3 8l3 3 7-7"
                        stroke="#000"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span className="text-[13px] leading-[1.7] text-ink/60 font-light">
                  J'accepte d'être contacté·e par l'équipe Yokh Laa et je prends
                  connaissance des{' '}
                  <a href="#" className="text-ink border-b border-ink/30 hover:border-ink">
                    conditions d'utilisation
                  </a>{' '}
                  et de la{' '}
                  <a href="#" className="text-ink border-b border-ink/30 hover:border-ink">
                    politique de confidentialité
                  </a>
                  .
                </span>
              </label>
            </div>

            {errorMsg && (
              <div className="border-l-2 border-ink px-5 py-4 text-[13px] text-ink/90 font-light">
                {errorMsg}
              </div>
            )}

            <div className="pt-8 flex flex-col items-center gap-6">
              <button type="submit" className="btn-solid" disabled={status === 'submitting'}>
                {status === 'submitting' ? (
                  <>
                    <span
                      className="h-3 w-3 rounded-full border-2 border-black/30 border-t-black animate-spin"
                      aria-hidden
                    />
                    Enregistrement
                  </>
                ) : (
                  <>
                    M&rsquo;inscrire
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path
                        d="M3 8h10m-4-4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>
              <p className="text-[11px] text-ink/40 font-mono uppercase tracking-[0.18em]">
                Aucun paiement requis · Désinscription possible à tout moment
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
    <SiteEnd />
    </>
  );
}

function SiteEnd() {
  return (
    <footer className="relative mt-16 md:mt-24 border-t border-line">
      <div className="container-site py-10 md:py-14">
        <div
          className="text-[clamp(2.75rem,10vw,6rem)] font-extrabold leading-[0.85] uppercase text-ink/90"
          style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.045em' }}
        >
          YOKH LAA<span className="text-accent">.</span>
        </div>
        <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[11px] uppercase tracking-[0.18em] text-ink/40 font-mono">
          <div className="flex items-center gap-3">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
            <span>© {new Date().getFullYear()} Yokh Laa · Dakar, Sénégal</span>
          </div>
          <a
            href="mailto:contact@yokhlaa.app"
            className="hover:text-accent transition-colors"
          >
            contact@yokhlaa.app
          </a>
        </div>
      </div>
    </footer>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-eyebrow mb-3 block">
        {label}
        {required && <span className="ml-1 text-ink/40">*</span>}
      </label>
      {children}
    </div>
  );
}

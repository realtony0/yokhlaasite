'use client';

import { useState, type FormEvent } from 'react';
import { submitWaitlistEntry } from '@/lib/supabase';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function PassengerCTA() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [phone, setPhone] = useState('');
  const [nom, setNom] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!nom.trim()) return setErrorMsg('Entrez votre prénom');
    if (!phone.match(/^(\+221)?[\s]?[0-9]{2}[\s]?[0-9]{3}[\s]?[0-9]{2}[\s]?[0-9]{2}$/)) {
      return setErrorMsg('Format téléphone invalide (ex: +221 77 123 45 67)');
    }

    setStatus('submitting');

    const result = await submitWaitlistEntry({
      nom: nom.trim(),
      whatsapp: phone.replace(/\s/g, ''),
      role: 'passager',
    });

    if (result.success) {
      setStatus('success');
    } else {
      setStatus('error');
      setErrorMsg(result.error || 'Erreur. Réessayez.');
    }
  };

  if (status === 'success') {
    return (
      <div className="border border-accent/30 bg-accent/5 p-8 md:p-10">
        <div className="flex items-start gap-4">
          <span className="mt-1 shrink-0 h-6 w-6 rounded-full bg-accent flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M3 8l3 3 7-7"
                stroke="#000"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div>
            <div className="text-eyebrow text-accent mb-2">Confirmé</div>
            <p className="text-[16px] leading-[1.6] font-light text-ink/80 max-w-md">
              Merci <strong className="text-ink font-medium">{nom}</strong>. Vous
              serez prévenu·e par WhatsApp dès que l'application sera
              disponible sur Dakar.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-line p-8 md:p-10">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-5">
          <div className="text-eyebrow text-accent mb-4">Bientôt disponible</div>
          <h3 className="text-[clamp(1.5rem,2.5vw,2rem)] font-display font-extrabold uppercase leading-[1.05] tracking-tightest">
            Soyez prévenu·e<br />
            <span className="italic font-extralight">au lancement.</span>
          </h3>
          <p className="text-[14px] leading-[1.6] font-light text-ink/60 mt-5 max-w-xs">
            Nous vous envoyons un message WhatsApp dès que Yokh Laa est
            disponible sur votre téléphone. Aucune relance commerciale, un seul
            message.
          </p>
        </div>

        <div className="lg:col-span-7">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-eyebrow mb-2 block">Prénom</label>
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Aminata"
                  className="input-line"
                  disabled={status === 'submitting'}
                />
              </div>
              <div>
                <label className="text-eyebrow mb-2 block">WhatsApp</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+221 77 123 45 67"
                  className="input-line"
                  disabled={status === 'submitting'}
                />
              </div>
            </div>

            {errorMsg && (
              <div className="border-l-2 border-ink px-4 py-3 text-[12px] text-ink/80">
                {errorMsg}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
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
                    Me prévenir
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
              <p className="text-[10px] text-ink/40 font-mono uppercase tracking-[0.18em]">
                Un seul message · Désabonnement sur demande
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

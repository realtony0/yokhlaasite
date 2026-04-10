'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { getSupabase } from '@/lib/supabase';

const ADMIN_CODE = '280304150803';
const STORAGE_KEY = 'yokhlaa_admin_auth';

interface WaitlistEntry {
  id: string;
  nom: string;
  whatsapp: string;
  role: string;
  zone: string | null;
  vehicule: string | null;
  created_at: string;
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'chauffeur' | 'passager'>('all');

  // Restore session
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(STORAGE_KEY) === ADMIN_CODE) {
      setAuthed(true);
    }
    // Make sure body scroll is not locked (in case user navigated from SlideDeck)
    document.body.style.overflow = '';
  }, []);

  // Fetch entries when authed
  useEffect(() => {
    if (!authed) return;
    let cancelled = false;
    const fetchEntries = async () => {
      setLoading(true);
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase
          .from('waitlist')
          .select('id, nom, whatsapp, role, zone, vehicule, created_at')
          .order('created_at', { ascending: false });
        if (cancelled) return;
        if (error) {
          console.error('[admin] fetch error:', error);
          setError('Impossible de charger les inscriptions.');
          setEntries([]);
        } else {
          setEntries((data as WaitlistEntry[]) || []);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchEntries();
    return () => {
      cancelled = true;
    };
  }, [authed]);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (code === ADMIN_CODE) {
      localStorage.setItem(STORAGE_KEY, ADMIN_CODE);
      setAuthed(true);
      setError('');
      setCode('');
    } else {
      setError("Code invalide");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAuthed(false);
    setCode('');
    setEntries([]);
    setError('');
  };

  const exportCSV = () => {
    const headers = ['Date', 'Nom', 'WhatsApp', 'Role', 'Zone', 'Vehicule'];
    const rows = filtered.map((e) => [
      new Date(e.created_at).toLocaleString('fr-FR'),
      e.nom,
      e.whatsapp,
      e.role,
      e.zone || '',
      e.vehicule || '',
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `yokhlaa-waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = entries.filter((e) => filter === 'all' || e.role === filter);
  const chauffeursCount = entries.filter((e) => e.role === 'chauffeur').length;
  const passagersCount = entries.filter((e) => e.role === 'passager').length;

  /* ============================================================
     Login screen
     ============================================================ */
  if (!authed) {
    return (
      <div className="min-h-screen bg-bg text-ink flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm">
          <div className="text-eyebrow mb-6 text-center">Espace restreint</div>
          <h1 className="text-display-sm uppercase text-center mb-12">
            Admin<span className="text-accent">.</span>
          </h1>

          <label className="text-eyebrow mb-4 block text-center">
            Code d&rsquo;accès
          </label>
          <input
            type="password"
            inputMode="numeric"
            autoFocus
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="input-line text-center"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.3em',
              fontSize: '20px',
            }}
          />

          {error && (
            <div className="border-l-2 border-red-500 px-5 py-3 mt-6 text-[13px] text-red-400 font-light">
              {error}
            </div>
          )}

          <button type="submit" className="btn-solid w-full mt-10">
            Déverrouiller
          </button>

          <a
            href="/"
            className="block text-center mt-8 text-[11px] uppercase tracking-[0.18em] text-ink/40 hover:text-ink transition-colors"
          >
            ← Retour au site
          </a>
        </form>
      </div>
    );
  }

  /* ============================================================
     Dashboard
     ============================================================ */
  return (
    <div className="min-h-screen bg-bg text-ink">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-black/85 backdrop-blur-xl border-b border-line">
        <div className="container-site py-5 md:py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-eyebrow">Administration</div>
            <div
              className="text-[18px] md:text-[20px] font-extrabold uppercase mt-1"
              style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
            >
              YOKH LAA<span className="text-accent">.</span>
            </div>
          </div>

          <div className="flex items-center gap-5 md:gap-8">
            <div>
              <div className="text-eyebrow">Chauffeurs</div>
              <div className="font-mono text-[18px] md:text-[22px] font-bold mt-1">
                <span className="text-accent">{chauffeursCount}</span>
                <span className="text-ink/40"> / 50</span>
              </div>
            </div>

            <button
              onClick={exportCSV}
              disabled={filtered.length === 0}
              className="btn-outline disabled:opacity-30"
              style={{ padding: '10px 20px', fontSize: '10px' }}
            >
              Export CSV
            </button>

            <button
              onClick={handleLogout}
              className="text-[11px] uppercase tracking-[0.18em] text-ink/60 hover:text-ink transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="container-site py-6 flex flex-wrap items-center gap-3">
        <FilterBtn
          active={filter === 'all'}
          onClick={() => setFilter('all')}
          label={`Tous (${entries.length})`}
        />
        <FilterBtn
          active={filter === 'chauffeur'}
          onClick={() => setFilter('chauffeur')}
          label={`Chauffeurs (${chauffeursCount})`}
        />
        <FilterBtn
          active={filter === 'passager'}
          onClick={() => setFilter('passager')}
          label={`Passagers (${passagersCount})`}
        />
      </div>

      {/* Main */}
      <main className="container-site pb-16">
        {loading ? (
          <div className="text-center text-ink/60 py-20">Chargement…</div>
        ) : error ? (
          <div className="border-l-2 border-red-500 px-5 py-4 text-[13px] text-red-400 font-light">
            {error}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-eyebrow mb-4 text-ink/40">Aucune inscription</div>
            <div className="text-[14px] text-ink/50 font-light">
              Les inscriptions apparaîtront ici en temps réel.
            </div>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="text-eyebrow text-left border-b border-line">
                    <th className="py-4 pr-4 font-normal">#</th>
                    <th className="py-4 pr-4 font-normal">Date</th>
                    <th className="py-4 pr-4 font-normal">Nom</th>
                    <th className="py-4 pr-4 font-normal">WhatsApp</th>
                    <th className="py-4 pr-4 font-normal">Rôle</th>
                    <th className="py-4 pr-4 font-normal">Zone</th>
                    <th className="py-4 pr-4 font-normal">Véhicule</th>
                    <th className="py-4 pr-4 font-normal text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((e, i) => {
                    const phone = e.whatsapp.replace(/[^\d]/g, '');
                    return (
                      <tr
                        key={e.id}
                        className="border-b border-line/50 hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="py-4 pr-4 font-mono text-ink/40">
                          {String(filtered.length - i).padStart(2, '0')}
                        </td>
                        <td className="py-4 pr-4 font-mono text-ink/60">
                          {new Date(e.created_at).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit',
                          })}
                          <span className="text-ink/30 ml-2">
                            {new Date(e.created_at).toLocaleTimeString('fr-FR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </td>
                        <td className="py-4 pr-4 font-medium">{e.nom}</td>
                        <td className="py-4 pr-4 font-mono">{e.whatsapp}</td>
                        <td className="py-4 pr-4">
                          <span
                            className={`text-[10px] uppercase tracking-[0.12em] font-mono ${
                              e.role === 'chauffeur' ? 'text-accent' : 'text-ink/60'
                            }`}
                          >
                            {e.role}
                          </span>
                        </td>
                        <td className="py-4 pr-4 text-ink/70">{e.zone || '—'}</td>
                        <td className="py-4 pr-4 text-ink/70">{e.vehicule || '—'}</td>
                        <td className="py-4 pr-4 text-right">
                          <a
                            href={`https://wa.me/${phone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-accent hover:text-accent/80 text-[11px] uppercase tracking-[0.1em] font-mono transition-colors"
                          >
                            WhatsApp
                            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden>
                              <path
                                d="M3 8h10m-4-4l4 4-4 4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {filtered.map((e, i) => {
                const phone = e.whatsapp.replace(/[^\d]/g, '');
                return (
                  <div
                    key={e.id}
                    className="border border-line rounded-lg p-5 bg-surface/50"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="font-mono text-ink/40 text-[11px]">
                          #{String(filtered.length - i).padStart(2, '0')}
                        </div>
                        <div className="font-medium text-[15px] mt-1">{e.nom}</div>
                        <div className="font-mono text-[13px] text-ink/70 mt-1">
                          {e.whatsapp}
                        </div>
                      </div>
                      <span
                        className={`text-[10px] uppercase tracking-[0.12em] font-mono shrink-0 ${
                          e.role === 'chauffeur' ? 'text-accent' : 'text-ink/60'
                        }`}
                      >
                        {e.role}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[12px] mb-4">
                      <div>
                        <div className="text-eyebrow">Zone</div>
                        <div className="text-ink/70 mt-0.5">{e.zone || '—'}</div>
                      </div>
                      <div>
                        <div className="text-eyebrow">Véhicule</div>
                        <div className="text-ink/70 mt-0.5">{e.vehicule || '—'}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-eyebrow">Inscrit le</div>
                        <div className="font-mono text-ink/60 mt-0.5">
                          {new Date(e.created_at).toLocaleString('fr-FR')}
                        </div>
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/${phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-accent text-[12px] uppercase tracking-[0.1em] font-mono border-b border-accent/30 hover:border-accent pb-0.5"
                    >
                      Contacter via WhatsApp
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
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function FilterBtn({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-[11px] uppercase tracking-[0.15em] font-mono px-4 py-2 border transition-all ${
        active
          ? 'border-accent text-accent bg-accent/5'
          : 'border-line text-ink/60 hover:border-ink/40 hover:text-ink'
      }`}
    >
      {label}
    </button>
  );
}

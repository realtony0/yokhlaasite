import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: true, follow: true },
};

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg text-ink">
      {/* Simple header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-black/70 backdrop-blur-xl border-b border-line">
        <div className="container-site flex items-center justify-between h-[64px] md:h-[72px]">
          <Link
            href="/"
            aria-label="Yokh Laa — retour à l'accueil"
            className="text-[15px] md:text-[16px] font-extrabold text-ink hover:text-accent transition-colors duration-300"
            style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
          >
            YOKH LAA
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ink/70 hover:text-ink transition-colors duration-300"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M10 4L6 8l4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Retour
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="pt-[64px] md:pt-[72px]">
        <div className="container-narrow py-16 md:py-24">{children}</div>
      </main>

      {/* Legal footer — minimal */}
      <footer className="border-t border-line py-10">
        <div className="container-narrow flex flex-col md:flex-row md:items-center justify-between gap-4 text-[11px] uppercase tracking-[0.18em] text-ink/40 font-mono">
          <div>© {new Date().getFullYear()} Yokh Laa SAS · Tous droits réservés</div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/mentions-legales" className="hover:text-ink transition-colors">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="hover:text-ink transition-colors">
              Confidentialité
            </Link>
            <Link href="/conditions" className="hover:text-ink transition-colors">
              CGU
            </Link>
            <Link href="/cookies" className="hover:text-ink transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

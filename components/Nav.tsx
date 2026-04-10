'use client';

import { useEffect, useState } from 'react';

export function Nav() {
  const [open, setOpen] = useState(false);

  // Watch the active slide's internal scroll (SlideDeck locks body scroll
  // so window.scrollY stays at 0). When any active slide scrolls > 40px
  // inside, add the backdrop so content doesn't bleed through the nav.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const checkScroll = () => {
      const scrollers = document.querySelectorAll<HTMLElement>(
        'section[aria-hidden="false"] > .absolute.inset-0.overflow-y-auto'
      );
      let max = 0;
      scrollers.forEach((s) => {
        if (s.scrollTop > max) max = s.scrollTop;
      });
      setScrolled(max > 40);
    };
    checkScroll();
    // Listen globally — any scroll event will bubble up via capture
    document.addEventListener('scroll', checkScroll, { capture: true, passive: true });
    // Also when the slide changes (hashchange signals slide change)
    window.addEventListener('hashchange', () => {
      // next frame to let the new slide take effect
      requestAnimationFrame(checkScroll);
    });
    return () => {
      document.removeEventListener('scroll', checkScroll, { capture: true });
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/70 backdrop-blur-xl border-b border-line'
            : 'bg-gradient-to-b from-black/50 via-black/20 to-transparent'
        }`}
      >
        <div className="container-site flex items-center justify-between h-[84px]">
          {/* Logo — pure wordmark */}
          <a href="#top" aria-label="Yokh Laa">
            <span
              className="text-[18px] font-extrabold text-ink"
              style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
            >
              YOKH LAA
            </span>
          </a>

          {/* Center nav — desktop only */}
          <nav className="hidden lg:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
            {[
              ['#avantages', 'Avantages'],
              ['#comment', 'Comment ça marche'],
              ['#faq', 'FAQ'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="text-[11px] uppercase tracking-[0.18em] text-ink/70 hover:text-ink transition-colors duration-300"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right CTA */}
          <div className="flex items-center gap-3">
            <a
              href="#inscription"
              className="hidden md:inline-flex btn-outline"
              style={{ padding: '12px 24px', fontSize: '10px' }}
            >
              Réserver
            </a>
            <button
              className="lg:hidden h-10 w-10 inline-flex items-center justify-center text-ink"
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              <svg width="24" height="16" viewBox="0 0 24 16" fill="none" aria-hidden>
                {open ? (
                  <path d="M4 2l16 12M4 14L20 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                ) : (
                  <>
                    <line x1="0" y1="3" x2="24" y2="3" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="0" y1="13" x2="24" y2="13" stroke="currentColor" strokeWidth="1.5" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 top-[84px] z-40 bg-black lg:hidden">
          <nav className="container-site pt-16 flex flex-col">
            {[
              ['#avantages', 'Avantages'],
              ['#comment', 'Comment ça marche'],
              ['#faq', 'FAQ'],
              ['#inscription', 'Réserver une place'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="block py-6 border-b border-line text-[22px] font-extrabold"
                style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.03em' }}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

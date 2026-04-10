'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

/**
 * SlideDeck — App-like fullscreen slide navigation (wearebrand.io style)
 *
 * Le site n'est plus une longue page mais une succession de slides en plein
 * écran. L'utilisateur navigue avec :
 *  - boutons prev / next (chevrons sur le côté)
 *  - indicateurs de slide
 *  - clavier (flèches haut/bas, page up/down, home/end)
 *  - swipe vertical (mobile)
 *  - scroll wheel (1 cran = 1 slide)
 *  - clic sur lien Nav (#id) → slide correspondante via hash
 */

interface SlideDeckContextValue {
  total: number;
  active: number;
  goTo: (i: number) => void;
  next: () => void;
  prev: () => void;
  registerSlide: (id: string) => number;
}

const SlideDeckContext = createContext<SlideDeckContextValue | null>(null);

export function useSlideDeck() {
  const ctx = useContext(SlideDeckContext);
  if (!ctx) throw new Error('useSlideDeck must be used inside SlideDeck');
  return ctx;
}

interface SlideDeckProps {
  children: ReactNode;
  slideIds: string[]; // ordered list of slide DOM ids
}

const TRANSITION_MS = 800;

export function SlideDeck({ children, slideIds }: SlideDeckProps) {
  const [active, setActive] = useState(0);
  const isAnimatingRef = useRef(false);
  const lastWheelRef = useRef(0);

  const total = slideIds.length;

  const goTo = useCallback(
    (i: number) => {
      if (isAnimatingRef.current) return;
      const next = Math.max(0, Math.min(total - 1, i));
      if (next === active) return;
      isAnimatingRef.current = true;
      setActive(next);
      // Update URL hash without scroll
      const id = slideIds[next];
      if (id && typeof window !== 'undefined') {
        history.replaceState(null, '', `#${id}`);
      }
      window.setTimeout(() => {
        isAnimatingRef.current = false;
      }, TRANSITION_MS);
    },
    [active, total, slideIds]
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  // Sync from initial hash on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.slice(1);
    if (hash) {
      const idx = slideIds.indexOf(hash);
      if (idx >= 0) setActive(idx);
    }
  }, [slideIds]);

  // Listen to hashchange (e.g. user clicks nav link)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onHashChange = () => {
      const hash = window.location.hash.slice(1);
      const idx = slideIds.indexOf(hash);
      if (idx >= 0) goTo(idx);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [goTo, slideIds]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLElement &&
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)
      ) {
        return;
      }
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        prev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goTo(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goTo(total - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, goTo, total]);

  // Wheel navigation (1 cran = 1 slide, debounced)
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      // Allow normal scroll inside scrollable areas
      let target = e.target as HTMLElement | null;
      while (target && target !== document.body) {
        const overflow = window.getComputedStyle(target).overflowY;
        const isScrollable = overflow === 'auto' || overflow === 'scroll';
        if (isScrollable && target.scrollHeight > target.clientHeight) {
          // Inside scrollable container — let it handle the scroll natively
          const atTop = target.scrollTop === 0;
          const atBottom =
            target.scrollTop + target.clientHeight >= target.scrollHeight - 1;
          if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) {
            return; // let native scroll work
          }
        }
        target = target.parentElement;
      }

      e.preventDefault();
      const now = Date.now();
      if (now - lastWheelRef.current < TRANSITION_MS) return;
      lastWheelRef.current = now;

      if (e.deltaY > 30) next();
      else if (e.deltaY < -30) prev();
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [next, prev]);

  // Touch swipe
  useEffect(() => {
    let startY = 0;
    let startTime = 0;
    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startTime = Date.now();
    };
    const onTouchEnd = (e: TouchEvent) => {
      const endY = e.changedTouches[0].clientY;
      const dy = startY - endY;
      const dt = Date.now() - startTime;
      if (Math.abs(dy) < 50 || dt > 600) return;
      if (dy > 0) next();
      else prev();
    };
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [next, prev]);

  // Lock body scroll while deck is mounted
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // Slide registration (simple — uses ids)
  const registerSlide = useCallback(
    (id: string) => slideIds.indexOf(id),
    [slideIds]
  );

  const ctxValue = useMemo<SlideDeckContextValue>(
    () => ({ total, active, goTo, next, prev, registerSlide }),
    [total, active, goTo, next, prev, registerSlide]
  );

  return (
    <SlideDeckContext.Provider value={ctxValue}>
      <div className="fixed inset-0 overflow-hidden bg-bg">{children}</div>
      <SlideControls />
    </SlideDeckContext.Provider>
  );
}

/* ============================================================
   Slide — wraps a single slide with fade transition
   ============================================================ */
export function Slide({ id, children }: { id: string; children: ReactNode }) {
  const { active, registerSlide } = useSlideDeck();
  const idx = registerSlide(id);
  const isActive = idx === active;

  return (
    <section
      id={id}
      aria-hidden={!isActive}
      className="absolute inset-0 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden"
      style={{
        opacity: isActive ? 1 : 0,
        transform: isActive ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.98)',
        pointerEvents: isActive ? 'auto' : 'none',
        zIndex: isActive ? 10 : 1,
      }}
    >
      <div className="absolute inset-0 overflow-y-auto">{children}</div>
    </section>
  );
}

/* ============================================================
   Slide controls — chevrons + indicators (wearebrand.io style)
   ============================================================ */
function SlideControls() {
  const { active, total, next, prev, goTo } = useSlideDeck();

  return (
    <>
      {/* Right side — vertical indicators (desktop) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-end gap-3">
        <div className="text-eyebrow font-mono text-white/60 mb-2 [writing-mode:vertical-rl] rotate-180">
          {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Aller à la slide ${i + 1}`}
            className="block transition-all duration-300"
            style={{
              width: '2px',
              height: i === active ? '32px' : '12px',
              backgroundColor: i === active ? '#fff' : 'rgba(255,255,255,0.25)',
            }}
          />
        ))}
      </div>

      {/* Bottom right — chevrons */}
      <div className="fixed right-4 md:right-6 bottom-6 md:bottom-8 z-50 flex items-center gap-2">
        <button
          onClick={prev}
          disabled={active === 0}
          aria-label="Slide précédente"
          className="h-12 w-12 md:h-14 md:w-14 rounded-full border border-white/30 text-white/80 hover:text-white hover:border-white/80 transition-all duration-300 flex items-center justify-center disabled:opacity-25 disabled:cursor-not-allowed"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M12 10L8 6 4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={next}
          disabled={active === total - 1}
          aria-label="Slide suivante"
          className="h-12 w-12 md:h-14 md:w-14 rounded-full border border-white/30 text-white/80 hover:text-white hover:border-white/80 transition-all duration-300 flex items-center justify-center disabled:opacity-25 disabled:cursor-not-allowed"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Bottom indicators (mobile) */}
      <div className="fixed left-4 bottom-7 md:bottom-9 z-50 flex md:hidden items-center gap-3">
        <span className="text-eyebrow font-mono text-white/70">
          {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>
    </>
  );
}

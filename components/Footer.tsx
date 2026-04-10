import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="container-site pt-16 md:pt-20 pb-10 md:pb-12">
        {/* Wordmark + tagline */}
        <div className="mb-10 md:mb-14">
          <div
            className="text-[clamp(3rem,12vw,9rem)] font-extrabold leading-[0.85] tracking-tightest text-ink uppercase"
            style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.05em' }}
          >
            YOKH LAA
          </div>
          <p className="text-[14px] md:text-[15px] leading-[1.7] font-light text-ink/60 max-w-md mt-6 md:mt-8">
            Transport sans commission à Dakar.
            <br />
            Abonnement fixe <span className="font-mono text-ink">18&thinsp;500&thinsp;FCFA</span> par mois.
          </p>
        </div>

        <div className="hairline" />

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-6 pt-10 md:pt-14 pb-10 md:pb-14">
          <FooterCol
            title="Navigation"
            className="md:col-span-3"
            links={[
              ['/#avantages', 'Avantages'],
              ['/#comment', 'Comment ça marche'],
              ['/#faq', 'FAQ'],
              ['/#inscription', 'Réserver une place'],
            ]}
          />
          <FooterCol
            title="Légal"
            className="md:col-span-3"
            links={[
              ['/mentions-legales', 'Mentions légales'],
              ['/confidentialite', 'Confidentialité'],
              ['/conditions', "Conditions d'utilisation"],
              ['/cookies', 'Cookies'],
            ]}
          />
          <FooterCol
            title="Contact"
            className="md:col-span-3"
            links={[
              ['mailto:contact@yokhlaa.com', 'contact@yokhlaa.com'],
              ['mailto:privacy@yokhlaa.com', 'privacy@yokhlaa.com'],
              ['https://wa.me/221', 'WhatsApp'],
            ]}
          />
          <div className="md:col-span-3">
            <h4 className="text-eyebrow mb-5">Établi à</h4>
            <p className="text-[13px] text-ink/70 font-light leading-[1.7]">
              Dakar<br />
              République du Sénégal
            </p>
          </div>
        </div>

        <div className="hairline" />

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[11px] uppercase tracking-[0.18em] text-ink/40 font-mono">
          <div>
            © {new Date().getFullYear()} Yokh Laa SAS · Tous droits réservés
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
            <span>Conforme loi n° 2008-12 / CDP Sénégal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
  className = '',
}: {
  title: string;
  links: [string, string][];
  className?: string;
}) {
  return (
    <div className={className}>
      <h4 className="text-eyebrow mb-5">{title}</h4>
      <ul className="space-y-3">
        {links.map(([href, label]) => {
          const isExternal = href.startsWith('http') || href.startsWith('mailto:');
          return (
            <li key={label}>
              {isExternal ? (
                <a
                  href={href}
                  className="text-[13px] text-ink/70 hover:text-ink transition-colors duration-300 font-light"
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {label}
                </a>
              ) : (
                <Link
                  href={href}
                  className="text-[13px] text-ink/70 hover:text-ink transition-colors duration-300 font-light"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

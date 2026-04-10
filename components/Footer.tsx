export function Footer() {
  return (
    <footer className="relative border-t border-line pt-24 lg:pt-32 pb-12">
      <div className="container-site">
        {/* Top — massive wordmark */}
        <div className="mb-10 lg:mb-14">
          <div
            className="text-[clamp(4rem,16vw,14rem)] font-display font-extrabold leading-[0.82] tracking-tightest text-ink uppercase"
            style={{ letterSpacing: '-0.055em' }}
          >
            YOKH LAA
          </div>
          <div className="hairline mt-12" />
        </div>

        {/* Columns */}
        <div className="grid md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-5">
            <p className="text-[15px] leading-[1.7] font-light text-ink/70 max-w-md">
              Le premier service de transport sans commission à Dakar.
              Aucun prélèvement sur les courses.{' '}
              <span className="text-accent font-medium">15&nbsp;000&nbsp;FCFA</span>{' '}
              par mois à vie pour les 50 premiers chauffeurs.
            </p>
            <div className="flex items-center gap-3 mt-10">
              <SocialLink href="https://wa.me/221" label="WhatsApp">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </SocialLink>
              <SocialLink href="https://instagram.com/yokhlaa" label="Instagram">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
                </svg>
              </SocialLink>
              <SocialLink href="https://facebook.com/yokhlaa" label="Facebook">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M22 12a10 10 0 10-11.6 9.88V14.9H7.9V12h2.5V9.8c0-2.5 1.5-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.44h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.9h-2.33v6.98A10 10 0 0022 12z" />
                </svg>
              </SocialLink>
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-3 gap-6">
            <FooterCol
              title="Produit"
              links={[
                ['#avantages', 'Avantages'],
                ['#comment', 'Comment ça marche'],
                ['#faq', 'FAQ'],
              ]}
            />
            <FooterCol
              title="Entreprise"
              links={[
                ['#', 'À propos'],
                ['#', 'Équipe'],
                ['mailto:contact@yokhlaa.app', 'Contact'],
                ['mailto:press@yokhlaa.app', 'Presse'],
              ]}
            />
            <FooterCol
              title="Légal"
              links={[
                ['#', 'Mentions légales'],
                ['#', "Conditions d'utilisation"],
                ['#', 'Confidentialité'],
                ['#', 'Cookies'],
              ]}
            />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-line text-[11px] uppercase tracking-[0.18em] text-ink/40 font-mono">
          <div>
            © {new Date().getFullYear()} Yokh Laa SAS · Tous droits réservés
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="text-eyebrow mb-6">{title}</h4>
      <ul className="space-y-4">
        {links.map(([href, label]) => (
          <li key={label}>
            <a
              href={href}
              className="text-[13px] text-ink/70 hover:text-ink transition-colors duration-300 font-light"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="h-10 w-10 rounded-full border border-line inline-flex items-center justify-center text-ink/60 hover:text-ink hover:border-ink/60 transition-all duration-300"
    >
      {children}
    </a>
  );
}

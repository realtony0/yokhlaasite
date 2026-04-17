import type { Metadata } from 'next';
import Link from 'next/link';
import { POSTS, formatDate } from '@/lib/blog';
import { JsonLd } from '@/components/JsonLd';

const BASE_URL = 'https://yokhlaa.app';

export const metadata: Metadata = {
  title: 'Blog — Yokh Laa',
  description:
    "Guides, analyses et conseils sur le transport VTC à Dakar : tarifs, sécurité, économie locale. Tout pour mieux comprendre et mieux voyager.",
  keywords: [
    'blog VTC Dakar',
    'transport Dakar',
    'guide taxi Dakar',
    'Yokh Laa blog',
  ],
  openGraph: {
    title: 'Blog — Yokh Laa',
    description:
      "Guides et analyses sur le transport VTC à Dakar.",
    type: 'website',
  },
};

export default function BlogIndex() {
  const sorted = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog Yokh Laa',
    description: 'Guides et analyses sur le transport VTC à Dakar',
    url: `${BASE_URL}/blog`,
    inLanguage: 'fr-SN',
    publisher: {
      '@type': 'Organization',
      name: 'Yokh Laa',
      url: BASE_URL,
    },
    blogPost: sorted.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      url: `${BASE_URL}/blog/${post.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-bg text-ink">
      <JsonLd data={blogJsonLd} />
      {/* Minimal nav */}
      <header className="border-b border-line">
        <div className="container-site h-[84px] flex items-center justify-between">
          <Link
            href="/"
            className="text-[18px] font-extrabold text-ink"
            style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
          >
            YOKH LAA
          </Link>
          <nav className="flex items-center gap-8">
            <Link
              href="/"
              className="text-[11px] uppercase tracking-[0.18em] text-ink/70 hover:text-ink transition-colors"
            >
              Accueil
            </Link>
            <Link
              href="/#inscription"
              className="btn-outline"
              style={{ padding: '12px 24px', fontSize: '10px' }}
            >
              M&rsquo;inscrire
            </Link>
          </nav>
        </div>
      </header>

      <main className="section-pad">
        <div className="container-site">
          {/* Header */}
          <div className="mb-20 lg:mb-28 max-w-3xl">
            <div className="text-eyebrow mb-6">Blog</div>
            <h1 className="text-display-sm uppercase">
              Analyses.<br />
              <span className="italic font-extralight">Guides.</span>
            </h1>
            <p className="text-[17px] leading-[1.7] font-light text-ink/70 mt-8 max-w-xl">
              Comprendre le transport à Dakar, anticiper les vrais coûts,
              circuler en toute sécurité. Publications régulières de l'équipe
              Yokh Laa.
            </p>
          </div>

          {/* Article list */}
          <div className="space-y-0 border-t border-line">
            {sorted.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block border-b border-line py-10 lg:py-14 hover:bg-ink/[0.02] transition-colors"
              >
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-1">
                    <div className="text-eyebrow font-mono text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>

                  <div className="lg:col-span-8">
                    <div className="flex items-center gap-4 mb-4 text-[11px] uppercase tracking-[0.18em] text-ink/50 font-mono">
                      <span>{post.category}</span>
                      <span className="w-1 h-1 rounded-full bg-ink/30" />
                      <span>{formatDate(post.date)}</span>
                      <span className="w-1 h-1 rounded-full bg-ink/30" />
                      <span>{post.readMinutes} min</span>
                    </div>
                    <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-display font-extrabold uppercase leading-[1.05] tracking-tightest mb-4 group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-[15px] leading-[1.6] font-light text-ink/70 max-w-2xl">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="lg:col-span-3 lg:text-right">
                    <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ink/60 group-hover:text-accent border-b border-ink/30 group-hover:border-accent pb-1 transition-colors">
                      Lire
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path
                          d="M3 8h10m-4-4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-line mt-20">
        <div className="container-site py-10 text-[11px] uppercase tracking-[0.18em] text-ink/40 font-mono flex flex-col md:flex-row md:items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} Yokh Laa · Dakar, Sénégal</span>
          <a href="mailto:contact@yokhlaa.app" className="hover:text-accent transition-colors">
            contact@yokhlaa.app
          </a>
        </div>
      </footer>
    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, POSTS, formatDate } from '@/lib/blog';
import { getArticleContent } from './articles';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPost(params.slug);
  if (!post) return {};

  return {
    title: `${post.title} — Yokh Laa`,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['Yokh Laa'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default function ArticlePage({ params }: PageProps) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const content = getArticleContent(post.slug);
  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-bg text-ink">
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
              href="/blog"
              className="text-[11px] uppercase tracking-[0.18em] text-ink/70 hover:text-ink transition-colors"
            >
              ← Tous les articles
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
        <article className="container-narrow">
          {/* Meta */}
          <div className="flex items-center gap-4 mb-8 text-[11px] uppercase tracking-[0.18em] text-ink/50 font-mono">
            <span>{post.category}</span>
            <span className="w-1 h-1 rounded-full bg-ink/30" />
            <span>{formatDate(post.date)}</span>
            <span className="w-1 h-1 rounded-full bg-ink/30" />
            <span>{post.readMinutes} min de lecture</span>
          </div>

          {/* Title */}
          <h1 className="text-display-sm uppercase mb-10">
            {post.title}
          </h1>

          <p className="text-[18px] leading-[1.6] font-light text-ink/70 mb-16 max-w-xl">
            {post.excerpt}
          </p>

          <div className="hairline mb-16" />

          {/* Body */}
          <div className="prose-article">{content}</div>

          {/* CTA footer */}
          <div className="mt-20 pt-12 border-t border-line">
            <div className="text-eyebrow text-accent mb-4">Prochaine étape</div>
            <h3 className="text-[clamp(1.5rem,2.5vw,2rem)] font-display font-extrabold uppercase leading-[1.05] tracking-tightest mb-4">
              Prévenu·e<br />
              <span className="italic font-extralight">au lancement.</span>
            </h3>
            <p className="text-[15px] leading-[1.7] font-light text-ink/70 max-w-lg mb-8">
              Inscrivez votre WhatsApp pour recevoir un unique message dès
              que l'application Yokh Laa est disponible à Dakar.
            </p>
            <Link href="/#passagers" className="btn-solid">
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
            </Link>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-20 pt-12 border-t border-line">
              <div className="text-eyebrow mb-8">À lire aussi</div>
              <div className="grid md:grid-cols-2 gap-8">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group block"
                  >
                    <div className="text-[11px] uppercase tracking-[0.18em] text-ink/50 font-mono mb-3">
                      {r.category} · {r.readMinutes} min
                    </div>
                    <h4 className="text-[18px] font-display font-extrabold uppercase leading-[1.1] tracking-tightest group-hover:text-accent transition-colors mb-2">
                      {r.title}
                    </h4>
                    <p className="text-[14px] leading-[1.6] font-light text-ink/60">
                      {r.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
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

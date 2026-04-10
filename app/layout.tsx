import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Yokh Laa — Conduire. Garder 100 % des gains.',
  description:
    "Le premier service de transport sans commission à Dakar. 15 000 FCFA par mois à vie pour les 50 premiers chauffeurs (au lieu de 20 000). Premier mois offert.",
  keywords: [
    'Yokh Laa',
    'Dakar',
    'VTC Dakar',
    'taxi Dakar',
    'chauffeur',
    'sans commission',
    'Sénégal transport',
  ],
  authors: [{ name: 'Yokh Laa' }],
  openGraph: {
    title: 'Yokh Laa — Conduire. Garder 100 % des gains.',
    description:
      "Transport sans commission à Dakar. 15 000 FCFA par mois à vie pour les 50 premiers chauffeurs. Premier mois offert.",
    locale: 'fr_SN',
    type: 'website',
    siteName: 'Yokh Laa',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yokh Laa — Conduire. Garder 100 % des gains.',
    description: 'Transport sans commission à Dakar. 15 000 FCFA/mois à vie pour les 50 premiers.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;800;900&family=League+Spartan:wght@300;400;500;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="bg-bg text-ink font-body antialiased selection:bg-white selection:text-black grain">
        {children}
      </body>
    </html>
  );
}

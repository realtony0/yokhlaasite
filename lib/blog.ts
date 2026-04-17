/**
 * Blog registry — articles in pure TSX for now (simple, no MDX pipeline).
 * Each article = a slug + metadata + a React component that renders the body.
 */

import type { ReactNode } from 'react';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO date
  readMinutes: number;
  category: string;
  keywords: string[];
}

export const POSTS: BlogPost[] = [
  {
    slug: 'combien-coute-trajet-dakar',
    title: 'Combien coûte un trajet VTC à Dakar en 2026 ?',
    excerpt:
      "Tarifs réels constatés sur les principaux trajets de Dakar — Plateau, Almadies, aéroport, Mermoz. Comparaison Yokh Laa vs Yango vs Heetch.",
    date: '2026-04-16',
    readMinutes: 5,
    category: 'Guide',
    keywords: [
      'prix VTC Dakar',
      'tarif taxi Dakar',
      'Yango Dakar prix',
      'Heetch Dakar',
      'Yokh Laa tarif',
    ],
  },
  {
    slug: 'pourquoi-sans-commission',
    title: 'Pourquoi un VTC sans commission change tout à Dakar',
    excerpt:
      "Sur chaque course, les plateformes internationales prélèvent 20 à 25 %. Cela change tout : pour le chauffeur, pour le passager, pour l'économie locale. Explications.",
    date: '2026-04-14',
    readMinutes: 6,
    category: 'Édito',
    keywords: [
      'VTC sans commission',
      'Yokh Laa',
      'économie Sénégal',
      'chauffeur Dakar revenu',
    ],
  },
  {
    slug: 'securite-vtc-dakar',
    title: 'Sécurité en VTC : 7 bons réflexes à Dakar',
    excerpt:
      "Vérifier le chauffeur, partager sa position, payer intelligemment. Guide pratique pour circuler en toute sérénité à Dakar.",
    date: '2026-04-10',
    readMinutes: 4,
    category: 'Guide',
    keywords: [
      'sécurité VTC',
      'Dakar transport sécurisé',
      'bon reflexe VTC',
      'chauffeur vérifié Dakar',
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

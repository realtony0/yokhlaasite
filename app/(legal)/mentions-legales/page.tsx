import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions légales — Yokh Laa',
  description: "Mentions légales obligatoires du site Yokh Laa, conformément à la loi sénégalaise n° 2008-08 sur les transactions électroniques.",
};

export default function MentionsLegalesPage() {
  return (
    <article className="prose-legal">
      <div className="text-eyebrow mb-6">Informations légales</div>
      <h1 className="text-display-sm uppercase mb-10">
        Mentions<br />
        <span className="italic font-extralight">légales.</span>
      </h1>
      <p className="text-[13px] font-mono uppercase tracking-[0.18em] text-ink/50 mb-16">
        Dernière mise à jour&nbsp;: 10 avril 2026
      </p>

      <section>
        <h2>1. Éditeur du site</h2>
        <p>
          Le présent site <strong>yokhlaa.com</strong> est édité par&nbsp;:
        </p>
        <ul>
          <li><strong>Raison sociale&nbsp;:</strong> Yokh Laa SAS</li>
          <li><strong>Forme juridique&nbsp;:</strong> Société par Actions Simplifiée de droit sénégalais</li>
          <li><strong>Siège social&nbsp;:</strong> Dakar, République du Sénégal</li>
          <li><strong>RCCM&nbsp;:</strong> en cours d&rsquo;immatriculation</li>
          <li><strong>NINEA&nbsp;:</strong> en cours d&rsquo;attribution</li>
          <li><strong>Courriel&nbsp;:</strong> <a href="mailto:contact@yokhlaa.com">contact@yokhlaa.com</a></li>
        </ul>
        <p className="text-ink/60 text-[13px]">
          Les informations d&rsquo;immatriculation (RCCM, NINEA) seront mises à jour dès leur obtention auprès des autorités compétentes sénégalaises.
        </p>
      </section>

      <section>
        <h2>2. Directeur de la publication</h2>
        <p>
          Le directeur de la publication est le représentant légal de Yokh Laa SAS. Toute demande peut être adressée à l&rsquo;adresse <a href="mailto:contact@yokhlaa.com">contact@yokhlaa.com</a>.
        </p>
      </section>

      <section>
        <h2>3. Hébergement</h2>
        <p>
          Le site est hébergé par&nbsp;:
        </p>
        <ul>
          <li><strong>Vercel Inc.</strong></li>
          <li>340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis d&rsquo;Amérique</li>
          <li>Site web&nbsp;: <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a></li>
        </ul>
        <p>
          Les données de formulaire sont stockées via&nbsp;:
        </p>
        <ul>
          <li><strong>Supabase, Inc.</strong></li>
          <li>970 Toa Payoh N #07-04, Singapour 318992</li>
          <li>Site web&nbsp;: <a href="https://supabase.com" target="_blank" rel="noopener noreferrer">supabase.com</a></li>
        </ul>
      </section>

      <section>
        <h2>4. Propriété intellectuelle</h2>
        <p>
          L&rsquo;ensemble des éléments composant le site Yokh Laa (textes, logos, graphismes, illustrations, photographies, vidéos, sons, structure, mise en page, code source) sont la propriété exclusive de Yokh Laa SAS ou de ses partenaires, et sont protégés par les lois sénégalaises et internationales relatives à la propriété intellectuelle.
        </p>
        <p>
          Toute reproduction, représentation, diffusion ou exploitation, totale ou partielle, par quelque procédé que ce soit, sans l&rsquo;autorisation écrite préalable de Yokh Laa SAS, est strictement interdite et constitue une contrefaçon sanctionnée par la loi.
        </p>
      </section>

      <section>
        <h2>5. Liens hypertextes</h2>
        <p>
          Le site peut contenir des liens vers des sites tiers. Yokh Laa SAS n&rsquo;exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu, leur politique de confidentialité ou leur usage.
        </p>
      </section>

      <section>
        <h2>6. Responsabilité</h2>
        <p>
          Yokh Laa SAS met tout en œuvre pour assurer l&rsquo;exactitude et la mise à jour des informations diffusées sur le site, mais ne saurait garantir l&rsquo;absence d&rsquo;erreur ou d&rsquo;omission. L&rsquo;utilisation du site se fait sous la seule responsabilité de l&rsquo;utilisateur.
        </p>
      </section>

      <section>
        <h2>7. Droit applicable</h2>
        <p>
          Les présentes mentions légales sont régies par le droit sénégalais. Tout litige relatif au site relève de la compétence exclusive des tribunaux de Dakar, sous réserve des dispositions légales impératives applicables.
        </p>
      </section>

      <section>
        <h2>8. Contact</h2>
        <p>
          Pour toute question relative aux présentes mentions légales&nbsp;:
          <br />
          <a href="mailto:contact@yokhlaa.com">contact@yokhlaa.com</a>
        </p>
      </section>
    </article>
  );
}

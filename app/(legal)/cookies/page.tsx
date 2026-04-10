import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique cookies — Yokh Laa',
  description: "Politique d'utilisation des cookies et traceurs sur le site Yokh Laa.",
};

export default function CookiesPage() {
  return (
    <article className="prose-legal">
      <div className="text-eyebrow mb-6">Cookies et traceurs</div>
      <h1 className="text-display-sm uppercase mb-10">
        Politique<br />
        <span className="italic font-extralight">cookies.</span>
      </h1>
      <p className="text-[13px] font-mono uppercase tracking-[0.18em] text-ink/50 mb-16">
        Dernière mise à jour&nbsp;: 10 avril 2026
      </p>

      <section>
        <h2>1. Qu&rsquo;est-ce qu&rsquo;un cookie&nbsp;?</h2>
        <p>
          Un cookie est un petit fichier texte déposé sur le terminal (ordinateur, smartphone, tablette) d&rsquo;un utilisateur lorsqu&rsquo;il visite un site web. Il permet notamment de reconnaître le terminal, de mémoriser certaines préférences, ou d&rsquo;établir des statistiques de fréquentation.
        </p>
      </section>

      <section>
        <h2>2. Cookies utilisés par Yokh Laa</h2>
        <p>
          <strong>Le site yokhlaa.com n&rsquo;utilise aucun cookie publicitaire, aucun cookie de mesure d&rsquo;audience et aucun traceur tiers.</strong>
        </p>
        <p>
          Seuls des cookies et éléments de stockage strictement nécessaires au fonctionnement technique du Site peuvent être utilisés&nbsp;:
        </p>
        <ul>
          <li><strong>Cookies techniques de session&nbsp;:</strong> déposés par l&rsquo;hébergeur (Vercel) pour assurer la sécurité et la disponibilité du Site&nbsp;;</li>
          <li><strong>Stockage local (localStorage)&nbsp;:</strong> utilisé, le cas échéant, pour mémoriser temporairement les informations saisies dans le formulaire d&rsquo;inscription afin d&rsquo;éviter toute perte en cas de navigation.</li>
        </ul>
        <p>
          Ces éléments sont dits «&nbsp;strictement nécessaires&nbsp;» et sont exemptés de consentement préalable en application des recommandations de la Commission de Protection des Données Personnelles (CDP) du Sénégal et des bonnes pratiques internationales.
        </p>
      </section>

      <section>
        <h2>3. Absence de traceurs tiers</h2>
        <p>
          Yokh Laa s&rsquo;engage à ne pas intégrer, sans consentement explicite préalable et exprès de l&rsquo;utilisateur, les services suivants&nbsp;:
        </p>
        <ul>
          <li>outils de mesure d&rsquo;audience (Google Analytics, Matomo, etc.)&nbsp;;</li>
          <li>régies publicitaires (Google Ads, Meta Pixel, etc.)&nbsp;;</li>
          <li>boutons de partage sociaux avec suivi comportemental&nbsp;;</li>
          <li>cartographies tierces avec traceurs.</li>
        </ul>
        <p>
          Si l&rsquo;un de ces outils devait être intégré à l&rsquo;avenir, la présente politique serait mise à jour et un mécanisme de recueil du consentement conforme à la loi n° 2008-12 serait mis en place avant tout dépôt.
        </p>
      </section>

      <section>
        <h2>4. Vos choix</h2>
        <p>
          Vous pouvez à tout moment configurer votre navigateur pour bloquer les cookies ou être averti avant leur enregistrement. La plupart des navigateurs modernes (Chrome, Firefox, Safari, Edge) proposent des réglages dédiés dans leurs menus «&nbsp;Préférences&nbsp;» ou «&nbsp;Paramètres&nbsp;».
        </p>
        <p>
          Le blocage de l&rsquo;ensemble des cookies, y compris les cookies techniques strictement nécessaires, peut altérer certaines fonctionnalités du Site.
        </p>
      </section>

      <section>
        <h2>5. Durée de conservation</h2>
        <p>
          Les cookies techniques éventuellement déposés ont une durée de vie limitée à la session de navigation ou, au maximum, à treize (13) mois, conformément aux recommandations en vigueur.
        </p>
      </section>

      <section>
        <h2>6. Contact</h2>
        <p>
          Pour toute question relative à la présente politique cookies ou plus généralement à la protection de vos données&nbsp;:
          <br />
          <a href="mailto:privacy@yokhlaa.com">privacy@yokhlaa.com</a>
        </p>
        <p>
          Voir également la <a href="/confidentialite">politique de confidentialité</a> pour l&rsquo;ensemble des traitements de données personnelles effectués par Yokh Laa.
        </p>
      </section>
    </article>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de confidentialité — Yokh Laa',
  description: "Politique de protection des données personnelles de Yokh Laa, conforme à la loi sénégalaise n° 2008-12 du 25 janvier 2008 et au contrôle de la Commission de Protection des Données Personnelles (CDP).",
};

export default function ConfidentialitePage() {
  return (
    <article className="prose-legal">
      <div className="text-eyebrow mb-6">Protection des données</div>
      <h1 className="text-display-sm uppercase mb-10">
        Politique de<br />
        <span className="italic font-extralight">confidentialité.</span>
      </h1>
      <p className="text-[13px] font-mono uppercase tracking-[0.18em] text-ink/50 mb-16">
        Dernière mise à jour&nbsp;: 10 avril 2026
      </p>

      <section>
        <h2>1. Préambule</h2>
        <p>
          Yokh Laa SAS attache la plus grande importance à la protection de la vie privée et des données à caractère personnel de ses utilisateurs. La présente politique a pour objet d&rsquo;informer clairement les visiteurs du site <strong>yokhlaa.com</strong> sur les traitements opérés, conformément à&nbsp;:
        </p>
        <ul>
          <li>la <strong>loi n° 2008-12 du 25 janvier 2008</strong> sur la protection des données à caractère personnel en République du Sénégal&nbsp;;</li>
          <li>le contrôle de la <strong>Commission de Protection des Données Personnelles (CDP)</strong> du Sénégal&nbsp;;</li>
          <li>les bonnes pratiques internationales en matière de protection de la vie privée (RGPD de l&rsquo;Union européenne, à titre de référence).</li>
        </ul>
      </section>

      <section>
        <h2>2. Responsable du traitement</h2>
        <p>
          Le responsable du traitement des données à caractère personnel collectées via le site est&nbsp;:
        </p>
        <ul>
          <li><strong>Yokh Laa SAS</strong>, siège social à Dakar, Sénégal</li>
          <li>Courriel&nbsp;: <a href="mailto:privacy@yokhlaa.com">privacy@yokhlaa.com</a></li>
          <li>Contact général&nbsp;: <a href="mailto:contact@yokhlaa.com">contact@yokhlaa.com</a></li>
        </ul>
      </section>

      <section>
        <h2>3. Données collectées</h2>
        <p>
          Dans le cadre du formulaire d&rsquo;inscription à la liste d&rsquo;attente des 50 premiers chauffeurs, Yokh Laa collecte&nbsp;:
        </p>
        <ul>
          <li><strong>Identité&nbsp;:</strong> nom et prénom&nbsp;;</li>
          <li><strong>Coordonnées&nbsp;:</strong> numéro de téléphone WhatsApp (format sénégalais +221)&nbsp;;</li>
          <li><strong>Zone d&rsquo;activité&nbsp;:</strong> quartier ou commune de travail à Dakar&nbsp;;</li>
          <li><strong>Véhicule&nbsp;:</strong> type et année du véhicule utilisé.</li>
        </ul>
        <p>
          Aucune donnée sensible au sens de l&rsquo;article 1<sup>er</sup> de la loi n° 2008-12 (origine raciale, opinions politiques, religieuses, santé, vie sexuelle, etc.) n&rsquo;est collectée.
        </p>
      </section>

      <section>
        <h2>4. Finalités et base légale</h2>
        <p>Les données sont collectées pour les finalités suivantes&nbsp;:</p>
        <ul>
          <li><strong>Gestion de la liste d&rsquo;attente&nbsp;:</strong> inscription, validation, contact préalable au lancement&nbsp;;</li>
          <li><strong>Attribution de l&rsquo;offre «&nbsp;50 premiers chauffeurs&nbsp;»&nbsp;:</strong> premier mois d&rsquo;abonnement offert et tarif garanti à vie&nbsp;;</li>
          <li><strong>Communication&nbsp;:</strong> envoi d&rsquo;informations sur l&rsquo;état du projet, la date de lancement et les prochaines étapes d&rsquo;inscription&nbsp;;</li>
          <li><strong>Statistiques internes&nbsp;:</strong> mesure agrégée et anonyme de la demande par zone et type de véhicule.</li>
        </ul>
        <p>
          La base légale du traitement est le <strong>consentement libre, spécifique, éclairé et univoque</strong> de la personne concernée, donné via la case à cocher du formulaire d&rsquo;inscription.
        </p>
      </section>

      <section>
        <h2>5. Destinataires des données</h2>
        <p>Les données collectées sont destinées&nbsp;:</p>
        <ul>
          <li>à l&rsquo;équipe interne de Yokh Laa SAS habilitée à gérer la liste d&rsquo;attente&nbsp;;</li>
          <li>à nos sous-traitants techniques, strictement encadrés par contrat&nbsp;:
            <ul>
              <li><strong>Supabase, Inc.</strong> (hébergement de la base de données)&nbsp;;</li>
              <li><strong>Vercel Inc.</strong> (hébergement du site web).</li>
            </ul>
          </li>
        </ul>
        <p>
          Aucune donnée n&rsquo;est cédée, vendue ou louée à des tiers à des fins commerciales.
        </p>
      </section>

      <section>
        <h2>6. Durée de conservation</h2>
        <p>
          Les données sont conservées pour une durée n&rsquo;excédant pas <strong>vingt-quatre (24) mois</strong> à compter de la collecte, ou jusqu&rsquo;à douze (12) mois après le lancement effectif de l&rsquo;application, selon la première échéance atteinte.
        </p>
        <p>
          Au terme de cette période, les données sont soit supprimées, soit anonymisées à des fins statistiques. Toute personne peut demander la suppression de ses données à tout moment (cf. section&nbsp;9).
        </p>
      </section>

      <section>
        <h2>7. Transfert hors du Sénégal</h2>
        <p>
          Les données peuvent faire l&rsquo;objet d&rsquo;un transfert en dehors du territoire sénégalais, dans les pays où sont établis nos sous-traitants techniques (Supabase&nbsp;: Singapour / États-Unis&nbsp;; Vercel&nbsp;: États-Unis).
        </p>
        <p>
          Ces transferts sont encadrés par des garanties contractuelles appropriées, conformément à l&rsquo;article&nbsp;49 de la loi n° 2008-12, et notamment&nbsp;:
        </p>
        <ul>
          <li>l&rsquo;adhésion des prestataires à des standards internationaux de sécurité et de confidentialité&nbsp;;</li>
          <li>la conclusion de clauses contractuelles garantissant un niveau de protection adéquat.</li>
        </ul>
      </section>

      <section>
        <h2>8. Sécurité</h2>
        <p>
          Yokh Laa met en œuvre des mesures techniques et organisationnelles appropriées pour protéger les données collectées contre la destruction accidentelle ou illicite, la perte, l&rsquo;altération, la diffusion ou l&rsquo;accès non autorisés. Ces mesures incluent notamment&nbsp;:
        </p>
        <ul>
          <li>chiffrement HTTPS/TLS de toutes les communications&nbsp;;</li>
          <li>contrôles d&rsquo;accès stricts aux bases de données via Row-Level Security&nbsp;;</li>
          <li>sauvegardes régulières et chiffrées.</li>
        </ul>
      </section>

      <section>
        <h2>9. Droits des personnes concernées</h2>
        <p>
          Conformément aux articles 58 à 69 de la loi n° 2008-12, toute personne concernée dispose des droits suivants&nbsp;:
        </p>
        <ul>
          <li><strong>Droit d&rsquo;information</strong> sur les traitements la concernant&nbsp;;</li>
          <li><strong>Droit d&rsquo;accès</strong> à ses données&nbsp;;</li>
          <li><strong>Droit de rectification</strong> des données inexactes, incomplètes ou périmées&nbsp;;</li>
          <li><strong>Droit d&rsquo;opposition</strong> au traitement pour motifs légitimes&nbsp;;</li>
          <li><strong>Droit à l&rsquo;effacement</strong> (droit à l&rsquo;oubli) de ses données&nbsp;;</li>
          <li><strong>Droit de retrait du consentement</strong> à tout moment, sans préjudice de la licéité des traitements effectués avant ce retrait.</li>
        </ul>
        <p>
          Ces droits peuvent être exercés à tout moment par courriel à l&rsquo;adresse <a href="mailto:privacy@yokhlaa.com">privacy@yokhlaa.com</a>, en justifiant de son identité. Une réponse sera apportée dans un délai maximal de trente (30) jours à compter de la réception de la demande.
        </p>
      </section>

      <section>
        <h2>10. Réclamation auprès de la CDP</h2>
        <p>
          Toute personne qui estime que ses droits en matière de protection des données ne sont pas respectés peut introduire une réclamation auprès de la&nbsp;:
        </p>
        <ul>
          <li><strong>Commission de Protection des Données Personnelles (CDP)</strong></li>
          <li>Autorité administrative indépendante de la République du Sénégal</li>
          <li>Site officiel&nbsp;: <a href="https://www.cdp.sn" target="_blank" rel="noopener noreferrer">www.cdp.sn</a></li>
        </ul>
      </section>

      <section>
        <h2>11. Cookies et traceurs</h2>
        <p>
          Le site n&rsquo;utilise aucun cookie publicitaire, analytique ou de mesure d&rsquo;audience. Pour plus de détails, consulter la <a href="/cookies">politique cookies</a>.
        </p>
      </section>

      <section>
        <h2>12. Modifications</h2>
        <p>
          La présente politique peut être amenée à évoluer pour tenir compte des évolutions légales et des bonnes pratiques. Toute modification substantielle sera portée à la connaissance des inscrits avant son entrée en vigueur. La date de dernière mise à jour figure en tête du présent document.
        </p>
      </section>
    </article>
  );
}

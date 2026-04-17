import type { ReactNode } from 'react';

export function getArticleContent(slug: string): ReactNode {
  switch (slug) {
    case 'combien-coute-trajet-dakar':
      return <PrixTrajetDakar />;
    case 'pourquoi-sans-commission':
      return <PourquoiSansCommission />;
    case 'securite-vtc-dakar':
      return <SecuriteVtc />;
    default:
      return <p>Article en préparation.</p>;
  }
}

// ─────────────────────────────────────────────────────────────
// Article 1 : Prix des trajets à Dakar
// ─────────────────────────────────────────────────────────────
function PrixTrajetDakar() {
  return (
    <>
      <p>
        Combien devrait coûter un trajet entre Plateau et Almadies ? Entre
        l&rsquo;aéroport et Mermoz ? La vérité, c&rsquo;est que ça dépend
        énormément de la plateforme utilisée, de l&rsquo;heure et du niveau de
        trafic. Voici les tarifs réellement constatés sur les principaux
        trajets dakarois en avril 2026.
      </p>

      <h2>La formule de base</h2>
      <p>
        La plupart des applications de VTC à Dakar utilisent la même logique :
        un tarif de base fixe + un coût au kilomètre. La différence se fait
        sur trois leviers : le niveau du tarif de base, le taux par kilomètre,
        et surtout la commission prélevée par la plateforme (qui se retrouve
        dans la poche du passager).
      </p>

      <ul>
        <li>
          <strong>Yokh Laa</strong> : 500 FCFA de base + 400 FCFA/km · 0 %
          de commission
        </li>
        <li>
          <strong>Yango</strong> : 500 FCFA de base + 500 FCFA/km · 25 %
          de commission
        </li>
        <li>
          <strong>Heetch</strong> : 600 FCFA de base + 475 FCFA/km · 20 %
          de commission
        </li>
      </ul>

      <h2>5 trajets types</h2>
      <p>
        Tarifs constatés pour un trajet en heure normale (hors pointe), classe
        standard, paiement direct :
      </p>

      <table>
        <thead>
          <tr>
            <th>Trajet</th>
            <th>Distance</th>
            <th>Yokh Laa</th>
            <th>Yango</th>
            <th>Heetch</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Plateau → Almadies</td>
            <td>12 km</td>
            <td><strong>5 300 F</strong></td>
            <td>6 500 F</td>
            <td>6 300 F</td>
          </tr>
          <tr>
            <td>Aéroport DSS → Plateau</td>
            <td>45 km</td>
            <td><strong>18 500 F</strong></td>
            <td>23 000 F</td>
            <td>22 000 F</td>
          </tr>
          <tr>
            <td>Mermoz → Parcelles Assainies</td>
            <td>14 km</td>
            <td><strong>6 100 F</strong></td>
            <td>7 500 F</td>
            <td>7 250 F</td>
          </tr>
          <tr>
            <td>Ouakam → VDN</td>
            <td>8 km</td>
            <td><strong>3 700 F</strong></td>
            <td>4 500 F</td>
            <td>4 400 F</td>
          </tr>
          <tr>
            <td>Yoff → Sacré-Cœur</td>
            <td>10 km</td>
            <td><strong>4 500 F</strong></td>
            <td>5 500 F</td>
            <td>5 350 F</td>
          </tr>
        </tbody>
      </table>

      <p className="meta">
        Sources : relevés de l&rsquo;équipe Yokh Laa, avril 2026. Tarifs hors
        surge et hors majorations nuit.
      </p>

      <h2>Pourquoi Yokh Laa est moins cher</h2>
      <p>
        La réponse tient en un mot : <strong>commission</strong>. Quand une
        plateforme prélève 20 à 25 % sur chaque course, le chauffeur doit
        nécessairement intégrer cette ponction dans son tarif s&rsquo;il veut
        gagner sa vie. Le passager paie donc deux choses : le trajet, et la
        commission de la plateforme.
      </p>
      <p>
        Yokh Laa fonctionne avec un abonnement mensuel fixe pour le chauffeur,
        et <strong>zéro commission</strong> sur les courses. Résultat : le
        chauffeur peut afficher un tarif plus juste, et le passager paie le
        vrai prix du trajet.
      </p>

      <h2>Ce que vous pouvez faire</h2>
      <p>
        Avant chaque course, comparez l&rsquo;estimation affichée par votre
        application et demandez-vous si le prix reflète réellement la distance.
        Un trajet de 10 km ne devrait jamais vous coûter 7 000 FCFA en heure
        normale.
      </p>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Article 2 : Pourquoi sans commission
// ─────────────────────────────────────────────────────────────
function PourquoiSansCommission() {
  return (
    <>
      <p>
        Les plateformes internationales prélèvent entre 20 et 25 % sur chaque
        course. C&rsquo;est devenu tellement banal qu&rsquo;on ne s&rsquo;y
        arrête plus. Pourtant, ce modèle a des conséquences directes, pour le
        chauffeur comme pour le passager. Un VTC sans commission, c&rsquo;est
        un autre équilibre.
      </p>

      <h2>Ce que la commission coûte au chauffeur</h2>
      <p>
        Imaginez un chauffeur qui fait 300 000 FCFA de courses par mois. Sur
        une plateforme classique avec 25 % de commission, il paie 75 000 FCFA
        à la plateforme. Sur Yokh Laa, il paie un abonnement fixe de 25 000
        FCFA (et souvent moins grâce aux autocollants ou au parrainage).
        <strong> Différence : 50 000 FCFA par mois dans sa poche.</strong>
      </p>
      <p>
        Sur une année, c&rsquo;est 600 000 FCFA de différence. De quoi changer
        de voiture, financer les études d&rsquo;un enfant, rembourser une
        dette. Pour beaucoup de chauffeurs sénégalais, c&rsquo;est la
        différence entre survivre et vivre.
      </p>

      <h2>Ce que la commission coûte au passager</h2>
      <p>
        Moins visible, mais tout aussi réel : le passager paie aussi la
        commission. Quand le chauffeur sait qu&rsquo;un quart de chaque course
        part ailleurs, il doit le compenser. Soit en affichant des tarifs
        légèrement plus hauts, soit en refusant les trajets courts peu
        rentables.
      </p>
      <p>
        C&rsquo;est pour ça que vous avez parfois du mal à trouver un chauffeur
        pour un trajet de 5 km en heure normale sur les applications
        classiques. Ce n&rsquo;est pas rentable après commission.
      </p>

      <h2>Ce que ça change pour l&rsquo;économie locale</h2>
      <p>
        Les commissions des plateformes internationales sortent du pays. Ce
        sont des millions de FCFA qui quittent l&rsquo;économie sénégalaise
        chaque mois pour atterrir à Amsterdam, Amsterdam, Moscou ou San
        Francisco. Un VTC local comme Yokh Laa réinvestit 100 % des gains sur
        place : chauffeurs, salariés, infrastructures, fournisseurs.
      </p>

      <h2>Un autre modèle est possible</h2>
      <p>
        Le modèle sans commission n&rsquo;est pas une nouveauté — c&rsquo;est
        juste qu&rsquo;aucune plateforme n&rsquo;osait le tenter à Dakar. La
        recette :
      </p>
      <ol>
        <li>
          Un abonnement mensuel fixe pour le chauffeur (prévisible, simple).
        </li>
        <li>Zéro commission sur les courses (100 % au chauffeur).</li>
        <li>
          Paiement direct entre passager et chauffeur (la plateforme ne touche
          jamais l&rsquo;argent).
        </li>
        <li>
          Des leviers pour baisser l&rsquo;abonnement : parrainage, autocollants,
          premier mois offert.
        </li>
      </ol>

      <p>
        Résultat : chauffeurs mieux payés, passagers moins facturés, économie
        locale renforcée. Tout le monde y gagne — sauf la plateforme qui
        prélève. Ce n&rsquo;est pas un hasard si cette approche n&rsquo;existait
        pas encore à Dakar.
      </p>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Article 3 : Sécurité
// ─────────────────────────────────────────────────────────────
function SecuriteVtc() {
  return (
    <>
      <p>
        Prendre un VTC à Dakar est en général plus sûr que beaucoup de villes
        comparables. Mais quelques bons réflexes permettent de circuler en
        toute sérénité, surtout tard le soir ou seul·e. Voici 7 règles simples
        à appliquer.
      </p>

      <h2>1. Vérifiez la plaque et le véhicule avant de monter</h2>
      <p>
        L&rsquo;application vous affiche la plaque, la marque, le modèle et la
        couleur du véhicule. Prenez 5 secondes pour confirmer que tout
        correspond. En cas de doute, annulez la course — vous ne serez pas
        facturé·e.
      </p>

      <h2>2. Confirmez le nom du chauffeur</h2>
      <p>
        Un chauffeur Yokh Laa vous accueille toujours en prononçant votre
        prénom (visible sur sa propre application). Si on ne vous appelle pas
        par votre prénom, ne montez pas.
      </p>

      <h2>3. Partagez votre trajet en live</h2>
      <p>
        L&rsquo;application Yokh Laa permet de partager votre trajet en temps
        réel avec un proche. Un simple lien WhatsApp — votre contact voit
        votre position se déplacer sur la carte jusqu&rsquo;à l&rsquo;arrivée.
        Utilisez-le systématiquement le soir ou sur des trajets longs.
      </p>

      <h2>4. Asseyez-vous à l&rsquo;arrière</h2>
      <p>
        Règle simple et efficace, surtout seul·e. Cela maintient une distance
        respectueuse avec le chauffeur et vous permet de surveiller
        discrètement la route via votre téléphone.
      </p>

      <h2>5. Ayez le bouton SOS à portée</h2>
      <p>
        Sur Yokh Laa, un bouton rouge SOS appelle directement le 17 (police
        nationale) et partage votre position exacte, votre nom et les
        informations du chauffeur. Sur les autres applications, enregistrez le
        17 en numéro rapide sur votre téléphone.
      </p>

      <h2>6. Payez au bon moment</h2>
      <p>
        Avec Yokh Laa, le paiement se fait à l&rsquo;arrivée, directement au
        chauffeur. En espèces, préparez le montant exact quand vous
        approchez — évitez de sortir un gros billet ou un portefeuille plein.
        Avec Wave ou Orange Money, faites le transfert une fois arrivé·e, pas
        pendant le trajet.
      </p>

      <h2>7. Laissez une note honnête</h2>
      <p>
        La note que vous donnez au chauffeur protège les autres passagers.
        Une note basse sur un comportement inapproprié déclenche une revue
        automatique chez Yokh Laa. Ne minimisez pas un mauvais comportement —
        votre retour est écouté.
      </p>

      <p className="meta">
        En cas de problème grave, appelez immédiatement le 17 (police) ou le
        18 (pompiers). L&rsquo;équipe Yokh Laa reste joignable 24h/24 sur{' '}
        <a href="mailto:urgence@yokhlaa.app">urgence@yokhlaa.app</a>.
      </p>
    </>
  );
}

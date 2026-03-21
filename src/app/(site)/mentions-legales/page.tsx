export default function MentionsLegalesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mentions légales</h1>

      <div className="space-y-8 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Éditeur du site</h2>
          <p>
            Site : BricoSearch<br />
            URL : bricosearch.fr (à compléter)<br />
            Responsable de publication : À compléter<br />
            Contact : À compléter
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Hébergement</h2>
          <p>
            Ce site est hébergé sur Vercel Inc., 340 Pine Street, Suite 701,
            San Francisco, California 94104, USA.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Affiliation Amazon</h2>
          <p>
            BricoSearch est un site participant au Programme Partenaires d&apos;Amazon EU, un
            programme d&apos;affiliation conçu pour permettre à des sites de percevoir une
            rémunération grâce à la création de liens vers Amazon.fr.
          </p>
          <p className="mt-2">
            En tant que Partenaire Amazon, BricoSearch réalise des bénéfices sur les achats
            remplissant les conditions requises. Les prix affichés sont indicatifs et peuvent
            varier. Seul le prix affiché sur Amazon.fr au moment de l&apos;achat fait foi.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Propriété intellectuelle</h2>
          <p>
            Le contenu éditorial (articles, guides, comparatifs) de ce site est protégé par
            le droit d&apos;auteur. Toute reproduction sans autorisation est interdite.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Données personnelles</h2>
          <p>
            En Phase 1, BricoSearch ne collecte aucune donnée personnelle. Aucun formulaire
            d&apos;inscription, aucun cookie de tracking ni aucune donnée de navigation n&apos;est
            collectée à ce stade.
          </p>
          <p className="mt-2">
            Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et
            de suppression de vos données. Pour exercer ces droits, contactez-nous à
            l&apos;adresse indiquée ci-dessus.
          </p>
        </section>
      </div>
    </div>
  );
}

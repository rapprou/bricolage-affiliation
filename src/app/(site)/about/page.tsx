export const metadata = {
  title: 'À propos de BricoSearch | Moteur de recherche outils bricolage',
  description: 'BricoSearch est un comparateur d\'outils de bricolage participant au Programme Partenaires Amazon EU.',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">À propos de BricoSearch</h1>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed">
        <p>
          <strong className="text-gray-800">BricoSearch</strong> est un moteur de recommandation
          d&apos;outils de bricolage et d&apos;outillage électroportatif. Notre mission est simple :
          vous aider à trouver l&apos;outil idéal pour vos projets, au meilleur prix, sans perdre
          des heures à comparer.
        </p>

        <p>
          Nous sélectionnons et référençons des outils disponibles sur Amazon.fr : perceuses,
          visseuses, meuleuses, scies, ponceuses et bien plus. Chaque produit est évalué selon
          ses caractéristiques techniques, les avis des acheteurs et son rapport qualité-prix.
        </p>

        <h2 className="text-xl font-bold text-gray-800 mt-8">Programme Amazon Partenaires</h2>
        <p>
          BricoSearch est un site participant au Programme Partenaires d&apos;Amazon EU, un
          programme d&apos;affiliation conçu pour permettre à des sites de percevoir une
          rémunération grâce à la création de liens vers Amazon.fr.
        </p>
        <p>
          En cliquant sur un lien produit, vous êtes redirigé vers Amazon.fr. Si vous effectuez
          un achat, nous percevons une petite commission — sans aucun surcoût pour vous. Cela
          nous permet de maintenir ce site gratuitement et de continuer à publier des guides
          et comparatifs.
        </p>

        <p className="text-sm text-gray-400 mt-8">
          Pour toute question, utilisez le formulaire de contact (à venir).
        </p>
      </div>
    </div>
  );
}

export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col animate-pulse">
      {/* Image placeholder avec coin badge simulé */}
      <div className="relative w-full h-[200px] bg-gray-200">
        <div className="absolute top-2 left-2 h-5 w-20 bg-gray-300 rounded-full" />
      </div>

      {/* Contenu */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Titre — 2 lignes */}
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-4/5" />

        {/* Étoiles + avis */}
        <div className="h-3 bg-gray-200 rounded w-2/5" />

        {/* Prime */}
        <div className="h-3 bg-gray-200 rounded w-1/4" />

        {/* Prix */}
        <div className="h-7 bg-gray-200 rounded w-1/3 mt-auto" />

        {/* Séparateur */}
        <div className="border-t border-gray-100" />

        {/* Bouton */}
        <div className="h-9 bg-gray-200 rounded-lg w-full" />
      </div>
    </div>
  );
}

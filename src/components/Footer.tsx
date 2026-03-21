import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
          © 2026 BricoSearch — Site participant au Programme Partenaires
          d&apos;Amazon EU, un programme d&apos;affiliation conçu pour permettre à des
          sites de percevoir une rémunération grâce à la création de liens vers
          Amazon.fr
        </p>
        <div className="mt-4 flex justify-center gap-6">
          <Link
            href="/mentions-legales"
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Mentions légales
          </Link>
          <Link
            href="/about"
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            À propos
          </Link>
        </div>
      </div>
    </footer>
  );
}

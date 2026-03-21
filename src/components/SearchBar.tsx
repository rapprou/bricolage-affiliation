'use client';

import { Search, X } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';

const SUGGESTIONS = [
  'Rechercher une perceuse...',
  'Rechercher une visseuse...',
  'Rechercher une meuleuse...',
  'Rechercher un outil Bosch...',
];

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export default function SearchBar({ value, onChange, onSubmit }: SearchBarProps) {
  const [suggestionIdx, setSuggestionIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSuggestionIdx(i => (i + 1) % SUGGESTIONS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 bg-white shadow-md rounded-full px-5 py-3 w-full max-w-2xl mx-auto"
    >
      <Search size={20} className="text-gray-400 shrink-0" />

      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={SUGGESTIONS[suggestionIdx]}
        className="flex-1 text-lg outline-none text-gray-800 placeholder-gray-400 bg-transparent"
      />

      {/* Bouton effacer */}
      {value.length > 0 && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
          aria-label="Effacer la recherche"
        >
          <X size={18} />
        </button>
      )}

      {/* Bouton Rechercher — icône seule sur mobile, texte sur desktop */}
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-full transition-colors text-sm shrink-0 flex items-center gap-1.5"
        aria-label="Rechercher"
      >
        <Search size={16} className="shrink-0" />
        <span className="hidden sm:inline">Rechercher</span>
      </button>
    </form>
  );
}

'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

export interface FilterState {
  type: string;
  priceMin: string;
  priceMax: string;
  ratingMin: string;
}

interface FiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

const toolTypes = [
  { value: '', label: 'Tous' },
  { value: 'perceuse', label: 'Perceuse' },
  { value: 'visseuse', label: 'Visseuse' },
  { value: 'meuleuse', label: 'Meuleuse' },
  { value: 'scie', label: 'Scie' },
  { value: 'ponceuse', label: 'Ponceuse' },
];

const ratingOptions = [
  { value: '', label: 'Toutes' },
  { value: '3', label: '3+ étoiles' },
  { value: '4', label: '4+ étoiles' },
  { value: '4.5', label: '4.5+ étoiles' },
];

export default function Filters({ filters, onChange }: FiltersProps) {
  const [open, setOpen] = useState(false);

  function update(key: keyof FilterState, value: string) {
    onChange({ ...filters, [key]: value });
  }

  function reset() {
    onChange({ type: '', priceMin: '', priceMax: '', ratingMin: '' });
  }

  const hasActiveFilters =
    filters.type !== '' ||
    filters.priceMin !== '' ||
    filters.priceMax !== '' ||
    filters.ratingMin !== '';

  const content = (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-semibold text-gray-900">Affiner la recherche</h2>
        {hasActiveFilters && (
          <button
            onClick={reset}
            className="text-sm text-red-500 hover:text-red-700 transition-colors"
          >
            Réinitialiser
          </button>
        )}
      </div>

      {/* Type d'outil */}
      <div className="border-b border-gray-100 pb-4 mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Type d&apos;outil</h3>
        <div className="flex flex-wrap gap-2">
          {toolTypes.map(t => (
            <button
              key={t.value}
              onClick={() => update('type', t.value)}
              className={cn(
                'px-3 py-1 text-sm rounded-full transition-colors',
                filters.type === t.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="border-b border-gray-100 pb-4 mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Budget (€)</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            min={0}
            value={filters.priceMin}
            onChange={e => update('priceMin', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
          />
          <span className="text-gray-400 shrink-0">—</span>
          <input
            type="number"
            placeholder="Max"
            min={0}
            value={filters.priceMax}
            onChange={e => update('priceMax', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <p className="text-xs text-gray-400 mt-1.5">Entre 0 € et 500 €</p>
      </div>

      {/* Note minimale */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Note minimale</h3>
        <select
          value={filters.ratingMin}
          onChange={e => update('ratingMin', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
        >
          {ratingOptions.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <>
      {/* Sidebar desktop */}
      <aside className="hidden md:block w-64 shrink-0">{content}</aside>

      {/* Accordéon mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setOpen(prev => !prev)}
          className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700"
        >
          <span>Filtres {hasActiveFilters && <span className="ml-1 text-blue-600">•</span>}</span>
          <span>{open ? '▲' : '▼'}</span>
        </button>
        {open && <div className="mt-4 px-1 pb-4 border-b border-gray-100">{content}</div>}
      </div>
    </>
  );
}

'use client';

import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  function getPages(): (number | '...')[] {
    const pages: (number | '...')[] = [];
    const delta = 2;
    const left = currentPage - delta;
    const right = currentPage + delta;
    let last = 0;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i <= right)) {
        if (last && i - last > 1) pages.push('...');
        pages.push(i);
        last = i;
      }
    }
    return pages;
  }

  function handlePageChange(page: number) {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="mt-8 flex flex-col items-center gap-3">
      <p className="text-sm text-gray-500">
        Page {currentPage} sur {totalPages}
      </p>

      <nav className="flex items-center gap-1">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="min-w-[40px] min-h-[40px] px-3 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ←
        </button>

        {getPages().map((page, idx) =>
          page === '...' ? (
            <span key={`ellipsis-${idx}`} className="min-w-[40px] min-h-[40px] flex items-center justify-center text-gray-400 text-sm">
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => handlePageChange(page as number)}
              className={cn(
                'min-w-[40px] min-h-[40px] text-sm rounded-lg border transition-colors',
                page === currentPage
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              )}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="min-w-[40px] min-h-[40px] px-3 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          →
        </button>
      </nav>
    </div>
  );
}

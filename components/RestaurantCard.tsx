import Image from 'next/image';
import { clsx } from 'clsx';

export type Restaurant = {
  id: string;
  name: string;
  district: string;
  cuisine: string[];
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  rating: number; // 0-5
  michelin?: 'bib' | 'plate' | 'one' | 'two' | 'three';
  address: string;
  website?: string;
  image?: string;
  tags?: string[];
};

export function RestaurantCard({ r }: { r: Restaurant }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-[color:var(--card)] ring-1 ring-slate-800/60 shadow-xl hover:shadow-2xl transition-all">
      <div className="relative h-48 w-full">
        <Image
          src={r.image || '/placeholder.jpg'}
          alt={r.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-1">
          {r.michelin && (
            <span className={clsx(
              'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
              r.michelin === 'one' && 'bg-red-500/20 text-red-300',
              r.michelin === 'two' && 'bg-red-600/25 text-red-200',
              r.michelin === 'three' && 'bg-red-700/30 text-red-100',
              r.michelin === 'bib' && 'bg-amber-500/20 text-amber-200',
              r.michelin === 'plate' && 'bg-rose-400/20 text-rose-100'
            )}>
              {r.michelin === 'one' && '★ Michelin'}
              {r.michelin === 'two' && '★★ Michelin'}
              {r.michelin === 'three' && '★★★ Michelin'}
              {r.michelin === 'bib' && 'Bib Gourmand'}
              {r.michelin === 'plate' && 'Michelin Plate'}
            </span>
          )}
          <span className="ml-auto text-sm text-slate-300">{r.priceRange}</span>
        </div>
        <h3 className="text-lg font-semibold">{r.name}</h3>
        <p className="text-sm text-slate-400">{r.district} · {r.cuisine.join(', ')}</p>
        <div className="mt-3 flex items-center gap-2 text-amber-300">
          {Array.from({ length: 5 }, (_, i) => (
            <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={i < r.rating ? 'currentColor' : 'transparent'} className={clsx('h-4 w-4', i >= r.rating && 'text-slate-600 stroke-amber-300 stroke-[1.2]')}>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.803 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.803-2.036a1 1 0 00-1.175 0l-2.803 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {r.tags?.map((t) => (
            <span key={t} className="rounded-full bg-slate-700/50 px-2 py-0.5 text-xs text-slate-200">{t}</span>
          ))}
        </div>
        {r.website && (
          <a href={r.website} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm text-brand hover:text-brand-dark">Website →</a>
        )}
      </div>
    </div>
  );
}

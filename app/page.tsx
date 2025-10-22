import { RESTAURANTS } from '@/data/restaurants';
import { RestaurantCard } from '@/components/RestaurantCard';
import { Suspense } from 'react';

function FilterBar({
  query,
  setQuery,
  district,
  setDistrict,
  price,
  setPrice,
  michelin,
  setMichelin,
}: {
  query: string;
  setQuery: (v: string) => void;
  district: string;
  setDistrict: (v: string) => void;
  price: string;
  setPrice: (v: string) => void;
  michelin: string;
  setMichelin: (v: string) => void;
}) {
  const districts = Array.from(new Set(RESTAURANTS.map((r) => r.district))).sort();
  return (
    <div className="sticky top-0 z-10 -mx-4 md:mx-0 backdrop-blur bg-slate-900/60 border-b border-slate-800 px-4 py-3">
      <div className="flex flex-col md:flex-row gap-2 md:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, cuisine, tag..."
          className="w-full md:flex-1 rounded-lg bg-slate-800/60 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand"
        />
        <select value={district} onChange={(e) => setDistrict(e.target.value)} className="rounded-lg bg-slate-800/60 px-3 py-2 text-sm">
          <option value="">All districts</option>
          {districts.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select value={price} onChange={(e) => setPrice(e.target.value)} className="rounded-lg bg-slate-800/60 px-3 py-2 text-sm">
          <option value="">Any price</option>
          {['$', '$$', '$$$', '$$$$'].map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <select value={michelin} onChange={(e) => setMichelin(e.target.value)} className="rounded-lg bg-slate-800/60 px-3 py-2 text-sm">
          <option value="">Any accolade</option>
          <option value="one">★ Michelin</option>
          <option value="two">★★ Michelin</option>
          <option value="three">★★★ Michelin</option>
          <option value="bib">Bib Gourmand</option>
          <option value="plate">Michelin Plate</option>
        </select>
      </div>
    </div>
  );
}

export default function Page() {
  const initial = filterRestaurants('', '', '', '');
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Best Restaurants in Hong Kong</h1>
        <p className="mt-2 text-slate-300">Curated favorites across budgets, districts, and cuisines.</p>
      </header>
      <ClientGrid initial={initial} />
      <footer className="mt-16 text-center text-sm text-slate-400">Built for quick trip planning. Data curated.</footer>
    </main>
  );
}

function filterRestaurants(query: string, district: string, price: string, michelin: string) {
  const q = query.trim().toLowerCase();
  return RESTAURANTS.filter((r) => {
    if (district && r.district !== district) return false;
    if (price && r.priceRange !== (price as any)) return false;
    if (michelin && r.michelin !== (michelin as any)) return false;
    if (!q) return true;
    const hay = [r.name, r.district, r.address, ...(r.cuisine || []), ...(r.tags || [])]
      .join(' ')
      .toLowerCase();
    return hay.includes(q);
  });
}

function ClientGrid({ initial }: { initial: ReturnType<typeof filterRestaurants> }) {
  return (
    <Suspense>
      {/* @ts-expect-error Async Server Component interop via client wrapper */}
      <GridWrapper initial={initial} />
    </Suspense>
  );
}

'use client';
import { useMemo, useState } from 'react';
function GridWrapper({ initial }: { initial: ReturnType<typeof filterRestaurants> }) {
  const [query, setQuery] = useState('');
  const [district, setDistrict] = useState('');
  const [price, setPrice] = useState('');
  const [michelin, setMichelin] = useState('');

  const filtered = useMemo(() => filterRestaurants(query, district, price, michelin), [query, district, price, michelin]);

  return (
    <div className="">
      <FilterBar
        query={query}
        setQuery={setQuery}
        district={district}
        setDistrict={setDistrict}
        price={price}
        setPrice={setPrice}
        michelin={michelin}
        setMichelin={setMichelin}
      />
      <p className="mt-4 text-sm text-slate-400">Showing {filtered.length} of {RESTAURANTS.length} restaurants</p>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((r) => (
          <RestaurantCard key={r.id} r={r} />
        ))}
      </div>
    </div>
  );
}

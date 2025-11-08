import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import clsx from 'clsx';

dayjs.locale('fr');

function ProductCard({ product }) {
  const { name, price, imageUrl, slug, createdAt, stockStatus } = product;
  const formattedPrice = Number(price) || 0;

  return (
    <article className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
      <div className="relative h-72 overflow-hidden">
        <img
          src={imageUrl ? imageUrl : 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'}
          alt={name}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-4 left-4 bg-white/90 text-xs font-semibold px-3 py-1 rounded-full uppercase">
          {dayjs(createdAt).format('DD MMM YYYY')}
        </span>
        <span
          className={clsx('absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full uppercase', {
            'bg-emerald-500 text-white': stockStatus === 'available',
            'bg-amber-500 text-white': stockStatus === 'low-stock',
            'bg-rose-500 text-white': stockStatus === 'sold-out'
          })}
        >
          {stockStatus === 'available' && 'En stock'}
          {stockStatus === 'low-stock' && 'Stock limité'}
          {stockStatus === 'sold-out' && 'Rupture'}
        </span>
      </div>
      <div className="p-6 space-y-3">
        <h3 className="text-xl font-display font-semibold text-dark line-clamp-2">{name}</h3>
        <p className="text-2xl font-bold text-primary">
          {formattedPrice.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' })}
        </p>
        <Link
          to={`/produit/${slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary"
        >
          Voir le produit
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;

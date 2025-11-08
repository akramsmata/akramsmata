import { useState } from 'react';
import { api } from '../services/api.js';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

dayjs.locale('fr');

function ProductTable({ products, onRefresh }) {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce produit ?')) return;
    setDeletingId(id);
    try {
      await api.delete(`/products/${id}`);
      onRefresh?.();
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-100 shadow-lg bg-white">
      <table className="min-w-full divide-y divide-gray-100">
        <thead className="bg-gray-50 text-xs uppercase tracking-[0.2em] text-gray-500">
          <tr>
            <th className="px-6 py-4 text-left">Produit</th>
            <th className="px-6 py-4 text-left">Prix</th>
            <th className="px-6 py-4 text-left">Statut</th>
            <th className="px-6 py-4 text-left">Créé le</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-rose-50/40">
              <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                  <img
                    src={product.imageUrl || 'https://via.placeholder.com/80x80.png?text=ChicDZ'}
                    alt={product.name}
                    className="w-16 h-16 rounded-2xl object-cover"
                  />
                  <div>
                    <p className="font-semibold text-dark">{product.name}</p>
                    <p className="text-xs text-gray-500">Slug : {product.slug}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-5 font-medium text-primary">
                {Number(product.price || 0).toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' })}
              </td>
              <td className="px-6 py-5">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    product.stockStatus === 'available'
                      ? 'bg-emerald-100 text-emerald-600'
                      : product.stockStatus === 'low-stock'
                      ? 'bg-amber-100 text-amber-600'
                      : 'bg-rose-100 text-rose-600'
                  }`}
                >
                  {product.stockStatus === 'available' && 'Disponible'}
                  {product.stockStatus === 'low-stock' && 'Stock limité'}
                  {product.stockStatus === 'sold-out' && 'Rupture'}
                </span>
              </td>
              <td className="px-6 py-5 text-sm text-gray-500">{dayjs(product.createdAt).format('DD MMM YYYY')}</td>
              <td className="px-6 py-5 text-right">
                <a
                  href={`/produit/${product.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-primary hover:underline mr-4"
                >
                  Voir
                </a>
                <button
                  onClick={() => handleDelete(product.id)}
                  disabled={deletingId === product.id}
                  className="text-sm font-semibold text-rose-500 hover:text-rose-600"
                >
                  {deletingId === product.id ? 'Suppression...' : 'Supprimer'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;

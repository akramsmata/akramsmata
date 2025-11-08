import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api.js';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

dayjs.locale('fr');

function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${slug}`);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        setError("Ce produit n'est plus disponible ou a été supprimé.");
      }
    };
    fetchProduct();
  }, [slug]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Lien copié !');
  };

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20">
        <p className="text-lg text-rose-500">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20">
        <p className="text-gray-500">Chargement du produit...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-0 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <img
            src={product.imageUrl || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Collection ChicDZ</p>
          <h1 className="mt-3 text-3xl font-display font-semibold text-dark">{product.name}</h1>
          <p className="mt-4 text-3xl font-bold text-primary">
            {Number(product.price || 0).toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' })}
          </p>
          <p className="mt-6 text-gray-600 leading-relaxed whitespace-pre-line">{product.description}</p>

          <div className="mt-6 space-y-4">
            {product.colors?.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-[0.2em]">Couleurs disponibles</p>
                <div className="flex flex-wrap gap-3 mt-2">
                  {product.colors.map((color) => (
                    <span key={color} className="px-4 py-2 bg-rose-50 text-primary rounded-full text-xs font-semibold uppercase">
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {product.sizes?.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-[0.2em]">Tailles disponibles</p>
                <div className="flex flex-wrap gap-3 mt-2">
                  {product.sizes.map((size) => (
                    <span key={size} className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-xs font-semibold uppercase">
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={copyLink}
              className="px-6 py-3 bg-primary text-white rounded-full font-semibold uppercase tracking-widest shadow-lg shadow-primary/30"
            >
              Copier le lien
            </button>
            <a
              href="https://wa.me/213555123456"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 border border-primary text-primary rounded-full font-semibold uppercase tracking-widest"
            >
              Commander via WhatsApp
            </a>
          </div>

          <p className="mt-8 text-xs text-gray-400 uppercase tracking-[0.3em]">
            Dernière mise à jour : {dayjs(product.updatedAt).format('DD MMM YYYY à HH:mm')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;

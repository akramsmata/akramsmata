import { useEffect, useState } from 'react';
import { api } from '../services/api.js';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/products');
      setProducts(response.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Impossible de charger les produits');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refresh: fetchProducts };
}

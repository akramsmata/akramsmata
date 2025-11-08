import ProductCard from './ProductCard.jsx';

function ProductGrid({ products, loading, error }) {
  if (loading) {
    return <p className="text-center text-gray-500">Chargement des nouveautés...</p>;
  }

  if (error) {
    return <p className="text-center text-rose-500">{error}</p>;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">Aucun produit disponible pour le moment. Revenez très vite !</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;

import { Route, Routes } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar.jsx';
import DashboardHeader from '../components/DashboardHeader.jsx';
import ProductForm from '../components/ProductForm.jsx';
import ProductTable from '../components/ProductTable.jsx';
import { useProducts } from '../hooks/useProducts.js';

function DashboardOverview({ products, loading, error, refresh }) {
  return (
    <div className="p-8 space-y-6">
      {loading && <p className="text-gray-500">Chargement...</p>}
      {error && <p className="text-rose-500">{error}</p>}
      {!loading && !error && <ProductTable products={products} onRefresh={refresh} />}
    </div>
  );
}

function DashboardNewProduct({ refresh }) {
  return (
    <div className="p-8">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl">
        <h2 className="text-2xl font-display font-semibold text-dark">Ajouter un nouveau produit</h2>
        <p className="mt-2 text-sm text-gray-500">
          Remplissez le formulaire ci-dessous pour publier vos nouveautés sur la boutique ChicDZ.
        </p>
        <div className="mt-6">
          <ProductForm onSuccess={refresh} />
        </div>
      </div>
    </div>
  );
}

function DashboardPage() {
  const { products, loading, error, refresh } = useProducts();

  return (
    <div className="min-h-[70vh] flex bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <Routes>
          <Route index element={<DashboardOverview products={products} loading={loading} error={error} refresh={refresh} />} />
          <Route path="nouveau" element={<DashboardNewProduct refresh={refresh} />} />
        </Routes>
      </div>
    </div>
  );
}

export default DashboardPage;

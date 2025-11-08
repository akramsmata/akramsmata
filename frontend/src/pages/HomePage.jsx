import Hero from '../components/Hero.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import ShippingTable from '../components/ShippingTable.jsx';
import { useProducts } from '../hooks/useProducts.js';

function HomePage() {
  const { products, loading, error } = useProducts();

  return (
    <div>
      <Hero />
      <section id="catalogue" className="max-w-6xl mx-auto px-4 lg:px-0 py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="uppercase text-sm font-semibold tracking-widest text-primary">La sélection ChicDZ</p>
            <h2 className="text-3xl font-display font-semibold text-dark mt-3">Nouveautés et best-sellers</h2>
            <p className="mt-2 text-gray-600 max-w-2xl">
              Des ensembles modernes, robes de cérémonie, abayas et vêtements traditionnels revisités pour la femme algérienne
              d'aujourd'hui.
            </p>
          </div>
          <div className="bg-white rounded-3xl shadow-lg px-6 py-4">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Livraison express</p>
            <p className="text-lg font-semibold text-primary">Paiement à la livraison partout en Algérie</p>
          </div>
        </div>
        <div className="mt-12">
          <ProductGrid products={products} loading={loading} error={error} />
        </div>
      </section>
      <ShippingTable />
      <section className="max-w-6xl mx-auto px-4 lg:px-0 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-xl font-display font-semibold text-dark">Qualité premium</h3>
            <p className="mt-3 text-gray-600 text-sm leading-relaxed">
              Nos partenaires ateliers sélectionnent des tissus confortables et résistants adaptés au climat algérien.
            </p>
          </div>
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-xl font-display font-semibold text-dark">Service client 7j/7</h3>
            <p className="mt-3 text-gray-600 text-sm leading-relaxed">
              Une équipe dédiée pour suivre vos commandes, gérer vos retours et répondre à toutes vos questions.
            </p>
          </div>
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-xl font-display font-semibold text-dark">Réseau revendeuses</h3>
            <p className="mt-3 text-gray-600 text-sm leading-relaxed">
              Conditions avantageuses pour les boutiques et revendeuses avec des remises exclusives sur volume.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

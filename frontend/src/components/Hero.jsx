import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 py-16 px-4 lg:px-0 items-center">
        <div>
          <p className="uppercase text-sm font-semibold tracking-widest text-primary">Nouvelle collection 2024</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-dark mt-4 leading-tight">
            Élégance algérienne pour toutes vos occasions
          </h1>
          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            Découvrez une sélection raffinée de vêtements féminins conçus pour sublimer votre quotidien. Livraison rapide via
            Yalidine vers les 58 wilayas d'Algérie.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#catalogue"
              className="bg-primary text-white px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wider shadow-lg shadow-primary/30"
            >
              Voir le catalogue
            </a>
            <Link
              to="/connexion"
              className="border border-primary text-primary px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wider"
            >
              Espace revendeuse
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80" alt="Mode Algérienne" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white rounded-3xl shadow-xl p-6 w-52">
            <p className="text-xs uppercase tracking-widest text-gray-500">Livraison Yalidine</p>
            <p className="mt-2 text-3xl font-display font-semibold text-primary">24-72h</p>
            <p className="text-xs text-gray-500">dans les grandes wilayas</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

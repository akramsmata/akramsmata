import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-white mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 py-12 px-4 lg:px-0">
        <div>
          <h3 className="text-xl font-display font-semibold mb-4">ChicDZ</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Boutique en ligne de mode féminine inspirée des tendances algériennes. Livraison rapide via Yalidine dans les 58
            wilayas.
          </p>
        </div>
        <div>
          <h4 className="uppercase text-sm font-semibold tracking-widest mb-4">Navigation</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/#livraison" className="hover:text-white">
                Tarifs de livraison
              </Link>
            </li>
            <li>
              <Link to="/connexion" className="hover:text-white">
                Espace professionnel
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="uppercase text-sm font-semibold tracking-widest mb-4">Contact</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Email : contact@chicdz.dz</li>
            <li>Téléphone : +213 555 12 34 56</li>
            <li>Instagram : @chicdz.shop</li>
          </ul>
        </div>
        <div>
          <h4 className="uppercase text-sm font-semibold tracking-widest mb-4">Horaires</h4>
          <p className="text-sm text-gray-300 leading-relaxed">
            Support client disponible 7j/7 de 9h00 à 20h00. Traitement des commandes et préparation le jour même pour les
            commandes confirmées avant 14h.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} ChicDZ. Tous droits réservés.
      </div>
    </footer>
  );
}

export default Footer;

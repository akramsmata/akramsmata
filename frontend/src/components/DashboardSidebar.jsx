import { NavLink } from 'react-router-dom';

function DashboardSidebar() {
  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-dark text-white">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-2xl font-display font-semibold">ChicDZ Admin</h2>
        <p className="text-xs text-gray-400 mt-1 uppercase tracking-[0.3em]">Espace revendeur</p>
      </div>
      <nav className="flex-1 p-6 space-y-2 text-sm">
        <NavLink
          to="."
          end
          className={({ isActive }) =>
            `block px-4 py-3 rounded-xl transition ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-white/10'}`
          }
        >
          Aperçu des produits
        </NavLink>
        <NavLink
          to="nouveau"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-xl transition ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-white/10'}`
          }
        >
          Ajouter un produit
        </NavLink>
      </nav>
      <div className="p-6 text-xs text-gray-400 border-t border-white/10">
        Besoin d'aide ? contactez-nous sur WhatsApp au +213 555 12 34 56
      </div>
    </aside>
  );
}

export default DashboardSidebar;

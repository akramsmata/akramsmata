import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-4 lg:px-0">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-display font-semibold text-primary">ChicDZ</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 font-medium text-sm uppercase tracking-wide">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'text-primary' : 'text-gray-600 hover:text-primary')}>
            Accueil
          </NavLink>
          <NavLink
            to="/#livraison"
            className={({ isActive }) => (isActive ? 'text-primary' : 'text-gray-600 hover:text-primary')}
          >
            Livraison
          </NavLink>
          <NavLink
            to="/connexion"
            className={({ isActive }) => (isActive ? 'text-primary' : 'text-gray-600 hover:text-primary')}
          >
            Espace Pro
          </NavLink>
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <NavLink to="/dashboard" className="text-sm font-medium text-primary">
                Tableau de bord
              </NavLink>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-semibold bg-primary text-white rounded-full hover:bg-rose-700 transition"
              >
                Se déconnecter
              </button>
            </>
          ) : (
            <Link
              to="/connexion"
              className="px-4 py-2 text-sm font-semibold bg-primary text-white rounded-full hover:bg-rose-700 transition"
            >
              Connexion
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;

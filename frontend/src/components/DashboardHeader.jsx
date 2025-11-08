import { useAuth } from '../context/AuthContext.jsx';

function DashboardHeader() {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-display font-semibold text-dark">Gestion des produits</h1>
          <p className="text-sm text-gray-500">Publiez vos nouveautés et suivez l'activité de votre boutique.</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-primary">{user?.email}</p>
          <p className="text-xs text-gray-400 uppercase tracking-[0.3em]">Administratrice</p>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;

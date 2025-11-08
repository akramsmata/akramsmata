import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    setError(null);
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (err) {
      setError('Identifiants invalides');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-emerald-50 py-20">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-10">
        <p className="uppercase text-xs font-semibold tracking-[0.3em] text-primary">Accès réservé</p>
        <h1 className="text-3xl font-display font-semibold text-dark mt-3">Connexion administrateur</h1>
        <p className="text-sm text-gray-500 mt-2">
          Gérer vos produits, suivre les ventes et mettre à jour les tarifs en toute simplicité.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600">Email professionnel</label>
            <input
              type="email"
              {...register('email', { required: 'Email obligatoire' })}
              className="px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
              placeholder="admin@chicdz.dz"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600">Mot de passe</label>
            <input
              type="password"
              {...register('password', { required: 'Mot de passe obligatoire' })}
              className="px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
              placeholder="********"
            />
          </div>
          {error && <p className="text-sm text-rose-500">{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 bg-primary text-white rounded-full font-semibold uppercase tracking-widest shadow-lg shadow-primary/30 disabled:opacity-60"
          >
            {isSubmitting ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

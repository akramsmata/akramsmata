import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../services/api.js';

function ProductForm({ onSuccess, initialValues }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: initialValues || {
      name: '',
      price: '',
      description: '',
      colors: '',
      sizes: '',
      stockStatus: 'available',
      featured: false,
      imageUrl: ''
    }
  });

  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    if (initialValues) {
      reset({
        ...initialValues,
        colors: initialValues.colors?.join(', ') || '',
        sizes: initialValues.sizes?.join(', ') || ''
      });
    }
  }, [initialValues, reset]);

  const onSubmit = async (data) => {
    setServerError(null);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('colors', JSON.stringify(data.colors.split(',').map((item) => item.trim()).filter(Boolean)));
    formData.append('sizes', JSON.stringify(data.sizes.split(',').map((item) => item.trim()).filter(Boolean)));
    formData.append('stockStatus', data.stockStatus);
    formData.append('featured', data.featured);
    const imageFile = data.image?.[0];
    if (imageFile) {
      formData.append('image', imageFile);
    }
    if (data.imageUrl) {
      formData.append('imageUrl', data.imageUrl);
    }

    try {
      await api.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      reset();
      onSuccess?.();
    } catch (error) {
      console.error(error);
      setServerError(error.response?.data?.message || 'Erreur serveur. Veuillez réessayer.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">Nom du produit</label>
          <input
            type="text"
            {...register('name', { required: 'Nom obligatoire', minLength: { value: 3, message: 'Minimum 3 caractères' } })}
            className="px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
            placeholder="Robe satin, kimono, ensemble..."
          />
          {errors.name && <span className="text-xs text-rose-500">{errors.name.message}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">Prix (en DZD)</label>
          <input
            type="number"
            step="0.01"
            {...register('price', { required: 'Prix obligatoire', min: { value: 0, message: 'Prix invalide' } })}
            className="px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
            placeholder="6500"
          />
          {errors.price && <span className="text-xs text-rose-500">{errors.price.message}</span>}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-600">Description</label>
        <textarea
          rows="4"
          {...register('description', { required: 'Description obligatoire' })}
          className="px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
          placeholder="Détails, matières, coupe..."
        ></textarea>
        {errors.description && <span className="text-xs text-rose-500">{errors.description.message}</span>}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">Couleurs (séparées par virgule)</label>
          <input
            type="text"
            {...register('colors')}
            className="px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
            placeholder="Noir, beige, rouge"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">Tailles (séparées par virgule)</label>
          <input
            type="text"
            {...register('sizes')}
            className="px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
            placeholder="S, M, L, XL"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">Statut du stock</label>
          <select
            {...register('stockStatus')}
            className="px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
          >
            <option value="available">Disponible</option>
            <option value="low-stock">Stock limité</option>
            <option value="sold-out">Rupture</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">Image (upload)</label>
          <input type="file" accept="image/*" {...register('image')} className="px-4 py-3 rounded-xl border border-gray-200" />
          <span className="text-xs text-gray-400">Formats JPG/PNG, max 5 Mo.</span>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">ou URL d'image externe</label>
          <input
            type="url"
            {...register('imageUrl')}
            className="px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input type="checkbox" id="featured" {...register('featured')} className="rounded border-gray-300" />
        <label htmlFor="featured" className="text-sm text-gray-600">
          Mettre en avant sur la page d'accueil
        </label>
      </div>

      {serverError && <p className="text-sm text-rose-500">{serverError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-3 bg-primary text-white rounded-full font-semibold uppercase tracking-widest shadow-lg shadow-primary/30 disabled:opacity-60"
      >
        {isSubmitting ? 'Publication...' : 'Publier le produit'}
      </button>
    </form>
  );
}

export default ProductForm;

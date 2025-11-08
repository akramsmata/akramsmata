import { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api.js';

function ShippingTable() {
  const [rates, setRates] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchRates = async () => {
      const response = await api.get('/shipping');
      setRates(response.data);
    };
    fetchRates();
  }, []);

  const filteredRates = useMemo(() => {
    if (!search) return rates;
    return rates.filter((item) => item.wilaya.toLowerCase().includes(search.toLowerCase()));
  }, [rates, search]);

  return (
    <section id="livraison" className="bg-white py-16 mt-20">
      <div className="max-w-6xl mx-auto px-4 lg:px-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="uppercase text-sm font-semibold tracking-widest text-primary">Tarifs Yalidine 2024</p>
            <h2 className="text-3xl font-display font-semibold text-dark mt-3">Livraison partout en Algérie</h2>
            <p className="mt-2 text-gray-600 max-w-2xl">
              Les prix comprennent l'expédition standard via Yalidine. Les délais sont indicatifs et peuvent varier selon la
              saison et la disponibilité locale.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="search" className="text-sm font-medium text-gray-600">
              Rechercher une wilaya
            </label>
            <input
              id="search"
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Ex : Alger, Oran, Constantine"
              className="px-4 py-3 rounded-full border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
            />
          </div>
        </div>
        <div className="mt-10 overflow-hidden rounded-3xl border border-gray-100 shadow-lg">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-primary text-white uppercase text-xs tracking-[0.2em]">
              <tr>
                <th className="px-6 py-4 text-left">Wilaya</th>
                <th className="px-6 py-4 text-left">Livraison bureau</th>
                <th className="px-6 py-4 text-left">Livraison domicile</th>
                <th className="px-6 py-4 text-left">Délais estimés</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredRates.map((rate) => (
                <tr key={rate.wilayaCode} className="hover:bg-rose-50/40">
                  <td className="px-6 py-4 font-medium text-dark">{rate.wilaya}</td>
                  <td className="px-6 py-4 text-gray-600">{rate.bureauDelivery.toLocaleString('fr-DZ')} DA</td>
                  <td className="px-6 py-4 text-gray-600">{rate.homeDelivery.toLocaleString('fr-DZ')} DA</td>
                  <td className="px-6 py-4 text-gray-500">{rate.estimatedDays}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default ShippingTable;

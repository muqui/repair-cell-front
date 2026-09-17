import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  WrenchScrewdriverIcon,
  UserIcon,
  DevicePhoneMobileIcon,
  CurrencyDollarIcon,
  ClipboardDocumentIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export const Service = () => {
  const { folio } = useParams();
  const [repair, setRepair] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const apiUrl = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_SERVICE}/${folio}`;

  useEffect(() => {
    const fetchRepair = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            "x-client-id": "store_db",
            "Content-Type": "application/json",
          },
        });
        setRepair(response.data);
      } catch (err) {
        setError("No se pudo cargar el servicio");
      } finally {
        setLoading(false);
      }
    };

    fetchRepair();
  }, [folio]);

  if (loading) return <p className="text-center mt-20 text-gray-500">Cargando...</p>;
  if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white shadow z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-blue-600 font-bold text-xl">
            NavarroTECH
          </a>
        </div>
      </nav>

      {/* Card */}
      <main className="max-w-3xl mx-auto pt-28 px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <div className="flex items-center gap-3">
              <ClipboardDocumentIcon className="h-8 w-8" />
              <h1 className="text-2xl font-bold">Detalle del Servicio</h1>
            </div>
            <p className="mt-2 text-sm opacity-90">Folio: {repair.folio}</p>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            <Item icon={UserIcon} label="Cliente" value={repair.client} />
            <Item icon={WrenchScrewdriverIcon} label="Servicio" value={repair.service} />
            <Item
              icon={DevicePhoneMobileIcon}
              label="Dispositivo"
              value={`${repair.brand} ${repair.model}`}
            />
            <Item
              icon={CurrencyDollarIcon}
              label="Costo reparación"
              value={`$${repair.repair_cost}`}
            />
            <Item
              icon={CurrencyDollarIcon}
              label="Abonado"
              value={`$${repair.paid}`}
            />
            <Item
              icon={CurrencyDollarIcon}
              label="Pendiente"
              value={`$${repair.left}`}
              highlight
            />

            {/* Estado */}
            <div className="flex items-center gap-3 pt-4 border-t">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
              <span className="font-medium">Estado:</span>
              <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                {repair.status}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

/* Componente reutilizable */
const Item = ({ icon: Icon, label, value, highlight }) => (
  <div className="flex items-center gap-4">
    <Icon className="h-6 w-6 text-gray-400" />
    <div className="flex-1">
      <p className="text-sm text-gray-500">{label}</p>
      <p
        className={`font-semibold ${
          highlight ? "text-red-600 text-lg" : "text-gray-800"
        }`}
      >
        {value}
      </p>
    </div>
  </div>
);

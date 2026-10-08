
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
  XMarkIcon,
} from "@heroicons/react/24/outline";

export const Service = ({ folio: folioProp, onClose }) => {
  // Si viene como prop usamos ese folio.
  // Si no, lo obtenemos de la URL /service/:folio
  const { folio: folioParam } = useParams();

  const folio = folioProp || folioParam;

  const [repair, setRepair] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const apiUrl = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_SERVICE}/${folio}`;
  const xClientId = import.meta.env.VITE_X_CLIENT_ID;

  useEffect(() => {
    const fetchRepair = async () => {
      try {
        setLoading(true);
        setError("");
        setRepair(null);

        const response = await axios.get(apiUrl, {
          headers: {
            "x-client-id": xClientId,
            "Content-Type": "application/json",
          },
        });

        setRepair(response.data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el servicio");
      } finally {
        setLoading(false);
      }
    };

    if (folio) {
      fetchRepair();
    }
  }, [folio]);

  /*
   * ========================================
   * MODO PÁGINA
   * ========================================
   *
   * Si no existe onClose significa que
   * estamos entrando mediante /service/:folio
   */

  if (!onClose) {
    if (loading) {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <p className="text-center text-gray-500">
            Cargando...
          </p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <p className="text-center text-red-600">
            {error}
          </p>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-100">
        <main className="max-w-3xl mx-auto pt-10 px-4">
          <ServiceContent repair={repair} />
        </main>
      </div>
    );
  }

  /*
   * ========================================
   * MODO MODAL
   * ========================================
   */

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/20 hover:bg-black/30 transition"
          aria-label="Cerrar"
        >
          <XMarkIcon className="h-6 w-6 text-white" />
        </button>

        {loading && (
          <div className="p-12 text-center">
            <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto" />

            <p className="mt-4 text-gray-500">
              Buscando información del servicio...
            </p>
          </div>
        )}

        {error && !loading && (
          <div className="p-10 text-center">
            <div className="text-red-600 text-lg font-semibold">
              {error}
            </div>

            <p className="text-gray-500 mt-2">
              Verifica que el folio sea correcto.
            </p>

            <button
              onClick={onClose}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Cerrar
            </button>
          </div>
        )}

        {repair && !loading && !error && (
          <ServiceContent
            repair={repair}
            modal
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};


/*
 * ========================================
 * CONTENIDO DEL SERVICIO
 * ========================================
 */

const ServiceContent = ({ repair, modal = false, onClose }) => {
  if (!repair) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
        <div className="flex items-center gap-3 pr-8">
          <ClipboardDocumentIcon className="h-8 w-8" />

          <div>
            <h1 className="text-2xl font-bold">
              Detalle del Servicio
            </h1>

            <p className="mt-1 text-sm opacity-90">
              Folio: {repair.folio}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-5">

        <Item
          icon={UserIcon}
          label="Cliente"
          value={repair.client}
        />

        <Item
          icon={WrenchScrewdriverIcon}
          label="Servicio"
          value={repair.service}
        />

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
        <div className="flex items-center gap-3 pt-5 border-t">
          <CheckCircleIcon className="h-6 w-6 text-green-600" />

          <span className="font-medium text-gray-700">
            Estado:
          </span>

          <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
            {repair.status}
          </span>
        </div>

        {/* Botón cerrar solamente en modal */}
        {modal && (
          <div className="pt-4">
            <button
              onClick={onClose}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 rounded-lg transition"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


/*
 * ========================================
 * ITEM
 * ========================================
 */

const Item = ({ icon: Icon, label, value, highlight }) => (
  <div className="flex items-center gap-4">

    <Icon className="h-6 w-6 text-gray-400 flex-shrink-0" />

    <div className="flex-1 min-w-0">

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p
        className={`font-semibold break-words ${
          highlight
            ? "text-red-600 text-lg"
            : "text-gray-800"
        }`}
      >
        {value}
      </p>

    </div>
  </div>
);


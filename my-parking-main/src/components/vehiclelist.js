// src/components/VehicleList.jsx
import React, { useEffect, useState } from "react";
import { getActiveVehicles } from "../services/vehicleService";


const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadVehicles = async () => {
    try {
      setLoading(true);
      const data = await getActiveVehicles();
      setVehicles(data);
    } catch (err) {
      console.error(err);
      alert("No se pudieron cargar los vehículos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Vehículos activos</h2>
      {loading && <p>Cargando...</p>}
      {!loading && vehicles.length === 0 && <p>No hay vehículos activos</p>}
      <ul>
        {vehicles.map((v) => (
          <li key={v.id ?? v.license_plate} className="flex items-center gap-4 py-2">
            <div className="w-48">
              <strong>{v.license_plate ?? "Sin placa"}</strong>
              <div className="text-sm text-gray-600">
                Entrada: {v.entry_time ? new Date(v.entry_time).toLocaleString() : "—"}
              </div>
              <div className="text-sm text-gray-600">
                Tipo: {v.vehicle_type || "—"}
              </div>
              <div className="text-sm text-gray-600">
                Valor: {v.registration_value ?? "—"}
              </div>
              <div className="text-sm text-gray-600">
                Factura: {v.invoice_number || "—"}
              </div>
            </div>

            <VehicleExitButton
              plate={v.license_plate}
              onSuccess={loadVehicles} // refresca lista después de sacar
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehicleList;

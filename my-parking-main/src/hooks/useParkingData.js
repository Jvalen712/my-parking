import { useState, useEffect } from "react";
import {
  registerVehicleEntry,
  registerVehicleExit,
  getActiveVehicles,
  getTodayVehicles as fetchTodayVehicles,
  getVehicleHistory,
} from "../services/vehicleService";

// ✅ Hook para manejar datos del parqueadero
export const useParkingData = () => {
  const [activeVehicles, setActiveVehicles] = useState([]);
  const [todayVehicles, setTodayVehicles] = useState([]);
  const [vehicleHistory, setVehicleHistory] = useState([]);
  const [statistics, setStatistics] = useState({
    totalActive: 0,
    totalToday: 0,
    totalHistory: 0,
  });

  // 🚗 Registrar entrada
  const addVehicle = async (payload) => {
    const result = await registerVehicleEntry(payload);
    if (result?.success) {
      setActiveVehicles((prev) => [...prev, result]);
      setTodayVehicles((prev) => [...prev, result]);
    }
    return result;
  };

  // 🚙 Registrar salida
  const removeVehicle = async (plate) => {
    const result = await registerVehicleExit(plate);
    await loadActiveVehicles();
    await loadTodayVehicles();
    await loadHistory();
    return result;
  };

  // 📊 Cargar vehículos activos (filtrados por estado)
  const loadActiveVehicles = async () => {
    const data = await getActiveVehicles();
    if (data?.success) {
      const activos = (data.vehicles ?? []).filter(
        (v) => v.status?.toLowerCase().trim() === "en parqueadero"
      );
      setActiveVehicles(activos);
    }
  };

  // 📅 Vehículos de hoy
  const loadTodayVehicles = async () => {
    const data = await fetchTodayVehicles();
    if (data?.success) {
      setTodayVehicles(data.vehicles ?? []);
    }
  };

  // 📜 Historial
  const loadHistory = async () => {
    const data = await getVehicleHistory();
    if (data?.success) {
      setVehicleHistory(data.history ?? []);
    }
  };

  // 📈 Estadísticas corregidas
  useEffect(() => {
    const activosEnParqueadero = activeVehicles.filter(
      (v) => v.status?.toLowerCase().trim() === "en parqueadero"
    );

    const hoy = new Date().toLocaleDateString();
    const ingresosHoy = vehicleHistory.filter((v) => {
      const fechaEntrada = new Date(v.entry_time).toLocaleDateString();
      return fechaEntrada === hoy;
    });

    setStatistics({
      totalActive: activosEnParqueadero.length,
      totalToday: ingresosHoy.length,
      totalHistory: vehicleHistory.length,
    });
  }, [activeVehicles, todayVehicles, vehicleHistory]);

  // 🔄 Cargar datos al montar
  useEffect(() => {
    loadActiveVehicles();
    loadTodayVehicles();
    loadHistory();
  }, []);

  return {
    addVehicle,
    removeVehicle,
    todayVehicles,
    activeVehicles,
    vehicleHistory,
    getStatistics: () => statistics,
  };
};

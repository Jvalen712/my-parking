import React, { useState } from "react";
import { useParkingData } from "../hooks/useParkingData";
import { useVehicleForm } from "../hooks/useVehicleForm";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import VehicleForm from "../components/forms/VehicleForm";
import StatCard from "../components/stats/StatCard";
import SummarySection from "../components/stats/SummarySection";
import VehicleTable from "../components/tables/VehicleTable";
import { Car, Calendar, History } from "lucide-react";

import "../styles/variables.css";
import "../styles/globals.css";
import "../styles/components.css";

const ParkingDashboard = ({ user, onLogout }) => {
  const {
    addVehicle,
    removeVehicle,
    todayVehicles,
    activeVehicles,
    vehicleHistory,
    getStatistics,
  } = useParkingData();

  const {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleAddVehicle,
    handleRemoveVehicle,
    clearForm,
  } = useVehicleForm({
    onAddVehicle: addVehicle,
    onRemoveVehicle: removeVehicle,
    onSuccess: (res) => {
      console.log("Factura generada:", res.invoice_number, "Monto:", res.total_amount);
    },
    onError: (message) => alert(message),
  });

  const statistics = getStatistics();
  const [viewMode, setViewMode] = useState("today"); 
  // valores posibles: "active", "today", "history"

  return (
    <div className="app">
      <Header showActions={true} onLogout={onLogout} />

      <div className="app-container">
        <div className="app-grid">
          <Sidebar>
            <VehicleForm
              formData={formData}
              errors={errors}
              isSubmitting={isSubmitting}
              onInputChange={handleInputChange}
              onAddVehicle={handleAddVehicle}
              onRemoveVehicle={handleRemoveVehicle}
              onClearForm={clearForm}
            />
          </Sidebar>

          <main className="main-content">
            <div className="stats-grid">
              <div onClick={() => setViewMode("active")} style={{ cursor: "pointer" }}>
                <StatCard
                  icon={<Car size={40} />}
                  label="Vehículos Activos"
                  value={statistics.totalActive}
                  variant="yellow"
                />
              </div>

              <div onClick={() => setViewMode("today")} style={{ cursor: "pointer" }}>
                <StatCard
                  icon={<Calendar size={40} />}
                  label="Ingresos Hoy"
                  value={statistics.totalToday}
                  variant="black"
                />
              </div>

              <div onClick={() => setViewMode("history")} style={{ cursor: "pointer" }}>
                <StatCard
                  icon={<History size={32} />}
                  label="Historial Total"
                  value={statistics.totalHistory}
                  variant="white"
                />
              </div>
            </div>

            {/* Tabla controlada por viewMode */}
            <VehicleTable
              todayVehicles={todayVehicles}
              activeVehicles={activeVehicles}
              vehicleHistory={vehicleHistory}
              viewMode={viewMode}
            />

            <SummarySection
              activeVehicles={activeVehicles}
              todayVehicles={todayVehicles}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default ParkingDashboard;

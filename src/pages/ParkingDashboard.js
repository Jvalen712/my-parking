import React from 'react';
import { useParkingData } from '../hooks/useParkingData';
import { useVehicleForm } from '../hooks/useVehicleForm';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import VehicleForm from '../components/forms/VehicleForm';
import StatCard from '../components/stats/StatCard';
import SummarySection from '../components/stats/SummarySection';
import VehicleTable from '../components/tables/VehicleTable';
import { Car, Calendar, History } from 'lucide-react';

import '../styles/variables.css';
import '../styles/globals.css';
import '../styles/components.css';

const ParkingDashboard = () => {
  // Hook for parking data management
  const {
    activeVehicles,
    vehicleHistory,
    addVehicle,
    removeVehicle,
    getTodaysVehicles,
    getStatistics
  } = useParkingData();

  // Hook for form management
  const {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleAddVehicle,
    handleRemoveVehicle,
    clearForm
  } = useVehicleForm({
    addVehicle,
    removeVehicle,
    onSuccess: (message) => {
      alert(message);
    },
    onError: (message) => {
      alert(message);
    }
  });

  // Get calculated data
  const todaysVehicles = getTodaysVehicles();
  const statistics = getStatistics();

  return (
    <div className="app">
      {/* Header */}
      <Header />

      {/* Main container */}
      <div className="app-container">
        <div className="app-grid">
          {/* Sidebar with form */}
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

          {/* Main content */}
          <main className="main-content">
            {/* Statistics cards */}
            <div className="stats-grid">
              <StatCard
                icon={<Car size={24} />}
                label="Vehículos Activos"
                value={statistics.totalActive}
                variant="blue"
              />
              
              <StatCard
                icon={<Calendar size={24} />}
                label="Ingresos Hoy"
                value={statistics.totalToday}
                variant="green"
              />
              
              <StatCard
                icon={<History size={24} />}
                label="Historial Total"
                value={statistics.totalHistory}
                variant="purple"
              />
            </div>

            {/* Vehicle table */}
            <VehicleTable
              activeVehicles={activeVehicles}
              vehicleHistory={vehicleHistory}
            />

            {/* Final summary */}
            <SummarySection
              activeVehicles={activeVehicles}
              todaysVehicles={todaysVehicles}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default ParkingDashboard;
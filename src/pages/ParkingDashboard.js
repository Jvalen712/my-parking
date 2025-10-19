import React from 'react';
import { useParkingData } from '../hooks/useParkingData';
import { useVehicleForm } from '../hooks/useVehicleForm';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import VehicleForm from '../components/forms/VehicleForm';
import StatCard from '../components/stats/StatCard';
import SummarySection from '../components/stats/SummarySection';
import VehicleTable from '../components/tables/VehicleTable';
import { Car, Calendar, History, LogOut } from 'lucide-react'; // Agregar LogOut

import '../styles/variables.css';
import '../styles/globals.css';
import '../styles/components.css';

const ParkingDashboard = ({ user, onLogout }) => {
  // ... todo tu código actual de hooks ...

  const {
    activeVehicles,
    vehicleHistory,
    addVehicle,
    removeVehicle,
    getTodaysVehicles,
    getStatistics
  } = useParkingData();

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
    onSuccess: (message) => alert(message),
    onError: (message) => alert(message)
  });

  const todaysVehicles = getTodaysVehicles();
  const statistics = getStatistics();

  return (
    <div className="app">
      {/* Header con botón de logout */}
      <Header 
        showActions={true}
        onSettingsClick={onLogout} // Usar el botón de settings para logout
      />
      
      {/* Alternativamente, agregar un botón de logout personalizado */}
      <button 
        onClick={onLogout}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '8px 16px',
          background: '#dc2626',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '14px',
          fontWeight: '500',
          zIndex: 100
        }}
      >
        <LogOut size={16} />
        Cerrar Sesión
      </button>

      {/* Resto de tu dashboard */}
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
              <StatCard
                icon={<Car size={40} />}
                label="Vehículos Activos"
                value={statistics.totalActive}
                variant="blue"
              />
              
              <StatCard
                icon={<Calendar size={40} />}
                label="Ingresos Hoy"
                value={statistics.totalToday}
                variant="green"
              />
              
              <StatCard
                icon={<History size={32} />}
                label="Historial Total"
                value={statistics.totalHistory}
                variant="purple"
              />
            </div>

            <VehicleTable
              activeVehicles={activeVehicles}
              vehicleHistory={vehicleHistory}
            />

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
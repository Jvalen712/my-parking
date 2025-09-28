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

// Importar estilos globales
import '../styles/variables.css';
import '../styles/globals.css';
import '../styles/components.css';

const ParkingDashboard = () => {
  const {
    vehiculosActivos,
    historialVehiculos,
    ingresarVehiculo,
    sacarVehiculo,
    getVehiculosHoy,
    getEstadisticas
  } = useParkingData();

  const {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleIngresarVehiculo,
    handleSacarVehiculo,
    limpiarCasillas
  } = useVehicleForm({
    ingresarVehiculo,
    sacarVehiculo,
    onSuccess: (message) => alert(message),
    onError: (message) => alert(message)
  });

  const vehiculosHoy = getVehiculosHoy();
  const estadisticas = getEstadisticas();

  return (
    <div className="app">
      {/* Header con banner azul */}
      <Header />

      {/* Contenedor principal */}
      <div className="app-container">
        <div className="app-grid">
          {/* Sidebar con formulario */}
          <Sidebar>
            <VehicleForm
              formData={formData}
              errors={errors}
              isSubmitting={isSubmitting}
              onInputChange={handleInputChange}
              onIngresarVehiculo={handleIngresarVehiculo}
              onSacarVehiculo={handleSacarVehiculo}
              onLimpiarCasillas={limpiarCasillas}
            />
          </Sidebar>

          {/* Contenido principal */}
          <main className="main-content">
            {/* Tarjetas de estadísticas */}
            <div className="stats-grid">
              <StatCard
                icon={<Car size={24} />}
                label="Vehículos Activos"
                value={estadisticas.totalActivos}
                variant="blue"
              />
              
              <StatCard
                icon={<Calendar size={24} />}
                label="Ingresos Hoy"
                value={estadisticas.totalHoy}
                variant="green"
              />
              
              <StatCard
                icon={<History size={24} />}
                label="Historial Total"
                value={estadisticas.totalHistorial}
                variant="purple"
              />
            </div>

            {/* Tabla de vehículos */}
            <VehicleTable
              vehiculosActivos={vehiculosActivos}
              historialVehiculos={historialVehiculos}
            />

            {/* Resumen final */}
            <SummarySection
              vehiculosActivos={vehiculosActivos}
              vehiculosHoy={vehiculosHoy}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default ParkingDashboard;
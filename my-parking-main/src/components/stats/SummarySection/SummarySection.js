import React from 'react';
import styles from './SummarySection.module.css';

const SummarySection = ({
  activeVehicles = [],
  todayVehicles = [],   // 👈 nombre corregido
  title = "Resumen del Parqueadero",
  showRevenue = true,
  additionalStats = [],
  className = ''
}) => {
  // Calcular ingresos de hoy
  const calculateTodaysRevenue = () => {
    return todayVehicles.reduce((total, vehicle) => {
      return total + (Number(vehicle.registration_value) || 0); // 👈 campo corregido
    }, 0);
  };

  // Calcular ingresos de vehículos activos
  const calculateActiveRevenue = () => {
    return activeVehicles.reduce((total, vehicle) => {
      return total + (Number(vehicle.registration_value) || 0); // 👈 campo corregido
    }, 0);
  };

  // Formatear moneda
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Estadísticas por tipo
  const getVehiclesByType = () => {
    const cars = activeVehicles.filter(v => v.vehicle_type === 'car').length;
    const motorcycles = activeVehicles.filter(v => v.vehicle_type === 'motorcycle').length;
    return { cars, motorcycles };
  };

  const { cars, motorcycles } = getVehiclesByType();
  const todaysRevenue = calculateTodaysRevenue();
  const activeRevenue = calculateActiveRevenue();

  // No mostrar si no hay datos
  if (activeVehicles.length === 0 && todayVehicles.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.summaryContainer} ${className}`}>
      <div className={styles.header}>
        <h4 className={styles.title}>{title}</h4>
      </div>

      <div className={styles.statsGrid}>
      



        {/* Ingresos actuales */}
        {showRevenue && (
          <div className={styles.statItem}>
            <p className={styles.statLabel}>Ingresos actuales:</p>
            <p className={styles.statValue}>{formatCurrency(activeRevenue)}</p>
          </div>
        )}

        {/* Ingresos de hoy */}
        {showRevenue && (
          <div className={styles.statItem}>
            <p className={styles.statLabel}>Ingresos estimados hoy:</p>
            <p className={styles.statValue}>{formatCurrency(todaysRevenue)}</p>
          </div>
        )}

        {/* Estadísticas adicionales */}
        {additionalStats.map((stat, index) => (
          <div key={index} className={styles.statItem}>
            <p className={styles.statLabel}>{stat.label}:</p>
            <p className={styles.statValue}>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummarySection;


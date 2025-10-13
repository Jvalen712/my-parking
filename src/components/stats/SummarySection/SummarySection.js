import React from 'react';
import styles from './SummarySection.module.css';

const SummarySection = ({
  activeVehicles = [],
  todaysVehicles = [],
  title = "Resumen del Parqueadero",
  showRevenue = true,
  additionalStats = [],
  className = '',
  ...props
}) => {
  // Calculate today's total revenue
  const calculateTodaysRevenue = () => {
    return todaysVehicles.reduce((total, vehicle) => {
      return total + (Number(vehicle.registrationValue) || 0);
    }, 0);
  };

  // Calculate active vehicles revenue
  const calculateActiveRevenue = () => {
    return activeVehicles.reduce((total, vehicle) => {
      return total + (Number(vehicle.registrationValue) || 0);
    }, 0);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate statistics by vehicle type
  const getVehiclesByType = () => {
    const cars = activeVehicles.filter(v => v.vehicleType === 'car').length;
    const motorcycles = activeVehicles.filter(v => v.vehicleType === 'motorcycle').length;
    return { cars, motorcycles };
  };

  const { cars, motorcycles } = getVehiclesByType();
  const todaysRevenue = calculateTodaysRevenue();
  const activeRevenue = calculateActiveRevenue();

  // Don't show if no active vehicles
  if (activeVehicles.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.summaryContainer} ${className}`} {...props}>
      <div className={styles.header}>
        <h4 className={styles.title}>{title}</h4>
      </div>

      <div className={styles.statsGrid}>
        {/* Total active vehicles */}
        <div className={styles.statItem}>
          <p className={styles.statLabel}>Total de vehículos activos:</p>
          <p className={styles.statValue}>{activeVehicles.length}</p>
        </div>

        {/* Breakdown by type */}
        <div className={styles.statItem}>
          <p className={styles.statLabel}>Carros / Motos:</p>
          <p className={styles.statValue}>
            {cars} / {motorcycles}
          </p>
        </div>

        {/* Active vehicles revenue */}
        {showRevenue && (
          <div className={styles.statItem}>
            <p className={styles.statLabel}>Ingresos actuales:</p>
            <p className={styles.statValue}>{formatCurrency(activeRevenue)}</p>
          </div>
        )}

        {/* Today's estimated revenue */}
        {showRevenue && (
          <div className={styles.statItem}>
            <p className={styles.statLabel}>Ingresos estimados hoy:</p>
            <p className={styles.statValue}>{formatCurrency(todaysRevenue)}</p>
          </div>
        )}

        {/* Additional custom statistics */}
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
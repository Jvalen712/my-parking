import React from 'react';
import styles from './SummarySection.module.css';

const SummarySection = ({
  vehiculosActivos = [],
  vehiculosHoy = [],
  title = "Resumen del Parqueadero",
  showRevenue = true,
  additionalStats = [],
  className = '',
  ...props
}) => {
  // Calcular ingresos totales del día
  const calcularIngresosHoy = () => {
    return vehiculosHoy.reduce((total, vehiculo) => {
      return total + (Number(vehiculo.valorMatricula) || 0);
    }, 0);
  };

  // Calcular ingresos totales de vehículos activos
  const calcularIngresosActivos = () => {
    return vehiculosActivos.reduce((total, vehiculo) => {
      return total + (Number(vehiculo.valorMatricula) || 0);
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

  // Calcular estadísticas por tipo de vehículo
  const getVehiculosPorTipo = () => {
    const carros = vehiculosActivos.filter(v => v.tipoVehiculo === 'carro').length;
    const motos = vehiculosActivos.filter(v => v.tipoVehiculo === 'moto').length;
    return { carros, motos };
  };

  const { carros, motos } = getVehiculosPorTipo();
  const ingresosHoy = calcularIngresosHoy();
  const ingresosActivos = calcularIngresosActivos();

  // No mostrar si no hay vehículos activos
  if (vehiculosActivos.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.summaryContainer} ${className}`} {...props}>
      <div className={styles.header}>
        <h4 className={styles.title}>{title}</h4>
      </div>

      <div className={styles.statsGrid}>
        {/* Total de vehículos activos */}
        <div className={styles.statItem}>
          <p className={styles.statLabel}>Total de vehículos activos:</p>
          <p className={styles.statValue}>{vehiculosActivos.length}</p>
        </div>

        {/* Desglose por tipo */}
        <div className={styles.statItem}>
          <p className={styles.statLabel}>Carros / Motos:</p>
          <p className={styles.statValue}>
            {carros} / {motos}
          </p>
        </div>

        {/* Ingresos de vehículos activos */}
        {showRevenue && (
          <div className={styles.statItem}>
            <p className={styles.statLabel}>Ingresos actuales:</p>
            <p className={styles.statValue}>{formatCurrency(ingresosActivos)}</p>
          </div>
        )}

        {/* Ingresos estimados hoy */}
        {showRevenue && (
          <div className={styles.statItem}>
            <p className={styles.statLabel}>Ingresos estimados hoy:</p>
            <p className={styles.statValue}>{formatCurrency(ingresosHoy)}</p>
          </div>
        )}

        {/* Estadísticas adicionales personalizadas */}
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
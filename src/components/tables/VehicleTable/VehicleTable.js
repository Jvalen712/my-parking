import React, { useState } from 'react';
import { Car, Clock, History } from 'lucide-react';
import Button from '../../common/Button';
import StatusBadge from '../../common/StatusBadge';
import styles from './VehicleTable.module.css';

const VehicleTable = ({
  vehiculosActivos = [],
  historialVehiculos = [],
  showHistorial: initialShowHistorial = false,
  onVehicleClick,
  className = '',
  ...props
}) => {
  const [mostrarHistorial, setMostrarHistorial] = useState(initialShowHistorial);

  // Obtener fecha actual para filtrar vehículos del día
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('es-CO');
  };

  // Filtrar vehículos del día actual
  const vehiculosHoy = vehiculosActivos.filter(
    vehiculo => vehiculo.fechaIngreso === getCurrentDate()
  );

  // Determinar qué datos mostrar
  const vehiculosAMostrar = mostrarHistorial ? historialVehiculos : vehiculosHoy;

  // Renderizar icono según tipo de vehículo
  const renderVehicleIcon = (tipo) => {
    if (tipo === 'carro') {
      return <Car className={styles.vehicleIcon} size={16} />;
    }
    return <span className={styles.motoIcon}>🏍️</span>;
  };

  // Formatear moneda
  const formatCurrency = (amount) => {
    return `$${Number(amount).toLocaleString('es-CO')}`;
  };

  // Renderizar estado vacío
  const renderEmptyState = () => {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          {mostrarHistorial ? (
            <History size={48} />
          ) : (
            <Clock size={48} />
          )}
        </div>
        <p className={styles.emptyTitle}>
          {mostrarHistorial 
            ? 'No hay vehículos en el historial' 
            : 'No hay vehículos registrados para el día de hoy'
          }
        </p>
        {!mostrarHistorial && (
          <p className={styles.emptySubtitle}>
            Los vehículos aparecerán aquí una vez que los ingreses
          </p>
        )}
      </div>
    );
  };

  return (
    <div className={`${styles.tableSection} ${className}`} {...props}>
      {/* Header de la tabla */}
      <div className={styles.tableHeader}>
        <h3 className={styles.tableTitle}>
          <Clock className={styles.titleIcon} />
          {mostrarHistorial ? 'Historial Completo' : `Vehículos del Día (${getCurrentDate()})`}
        </h3>
        <Button
          variant="purple"
          onClick={() => setMostrarHistorial(!mostrarHistorial)}
          icon={<History size={16} />}
          className={styles.toggleButton}
        >
          {mostrarHistorial ? 'Ver Activos' : 'Ver Historial'}
        </Button>
      </div>

      {/* Tabla */}
      <div className={styles.tableContainer}>
        {vehiculosAMostrar.length === 0 ? (
          renderEmptyState()
        ) : (
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.th}>Placa</th>
                <th className={styles.th}>Tipo</th>
                <th className={styles.th}>Hora Ingreso</th>
                <th className={styles.th}>Valor</th>
                <th className={styles.th}>Factura</th>
                <th className={styles.th}>Estado</th>
                {mostrarHistorial && <th className={styles.th}>Hora Salida</th>}
              </tr>
            </thead>
            <tbody>
              {vehiculosAMostrar.map((vehiculo) => (
                <tr 
                  key={vehiculo.id} 
                  className={`${styles.tr} ${onVehicleClick ? styles.trClickable : ''}`}
                  onClick={() => onVehicleClick && onVehicleClick(vehiculo)}
                >
                  <td className={`${styles.td} ${styles.tdPlaca}`}>
                    {vehiculo.placa}
                  </td>
                  <td className={styles.td}>
                    <div className={styles.vehicleType}>
                      {renderVehicleIcon(vehiculo.tipoVehiculo)}
                      <span className={styles.vehicleTypeName}>
                        {vehiculo.tipoVehiculo.charAt(0).toUpperCase() + vehiculo.tipoVehiculo.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className={styles.td}>{vehiculo.horaIngreso}</td>
                  <td className={`${styles.td} ${styles.tdValue}`}>
                    {formatCurrency(vehiculo.valorMatricula)}
                  </td>
                  <td className={styles.td}>{vehiculo.numeroFactura}</td>
                  <td className={styles.td}>
                    <StatusBadge status={vehiculo.estado} />
                  </td>
                  {mostrarHistorial && (
                    <td className={styles.td}>
                      {vehiculo.horaSalida || 'N/A'}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer con información adicional */}
      {vehiculosAMostrar.length > 0 && (
        <div className={styles.tableFooter}>
          <p className={styles.footerText}>
            Mostrando <strong>{vehiculosAMostrar.length}</strong> {vehiculosAMostrar.length === 1 ? 'vehículo' : 'vehículos'}
          </p>
        </div>
      )}
    </div>
  );
};

export default VehicleTable;
import React, { useState } from 'react';
import { Car, Clock, History } from 'lucide-react';
import Button from '../../common/Button';
import StatusBadge from '../../common/StatusBadge';
import styles from './VehicleTable.module.css';

const VehicleTable = ({
  activeVehicles = [],
  vehicleHistory = [],
  showHistory: initialShowHistory = false,
  onVehicleClick,
  className = '',
  ...props
}) => {
  const [showHistory, setShowHistory] = useState(initialShowHistory);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Get current date
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('es-CO');
  };

  // Filter today's vehicles
  const todaysVehicles = activeVehicles.filter(
    vehicle => vehicle.entryDate === getCurrentDate()
  );

  // Determine which data to show
  const vehiclesToShow = showHistory ? vehicleHistory : todaysVehicles;

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedVehicles = vehiclesToShow.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(vehiclesToShow.length / itemsPerPage);

  // Reset page when switching views
  const handleToggleHistory = () => {
    setShowHistory(!showHistory);
    setCurrentPage(1);
  };

  // Render vehicle icon based on type
  const renderVehicleIcon = (type) => {
    if (type === 'car') {
      return <Car className={styles.vehicleIcon} size={16} />;
    }
    return <span className={styles.motorcycleIcon}>🏍️</span>;
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `$${Number(amount).toLocaleString('es-CO')}`;
  };

  // Render empty state
  const renderEmptyState = () => {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          {showHistory ? (
            <History size={48} />
          ) : (
            <Clock size={48} />
          )}
        </div>
        <p className={styles.emptyTitle}>
          {showHistory 
            ? 'No hay vehículos en el historial' 
            : 'No hay vehículos registrados para el día de hoy'
          }
        </p>
        {!showHistory && (
          <p className={styles.emptySubtitle}>
            Los vehículos aparecerán aquí una vez que los ingreses
          </p>
        )}
      </div>
    );
  };

  return (
    <div className={`${styles.tableSection} ${className}`} {...props}>
      {/* Table header */}
      <div className={styles.tableHeader}>
        <h3 className={styles.tableTitle}>
          <Clock className={styles.titleIcon} />
          {showHistory ? 'Historial Completo' : `Vehículos del Día (${getCurrentDate()})`}
        </h3>
        <Button
          variant="purple"
          onClick={handleToggleHistory}
          icon={<History size={16} />}
          className={styles.toggleButton}
        >
          {showHistory ? 'Ver Activos' : 'Ver Historial'}
        </Button>
      </div>

      {/* Table */}
      <div className={styles.tableContainer}>
        {vehiclesToShow.length === 0 ? (
          renderEmptyState()
        ) : (
          <>
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                <tr>
                  <th className={styles.th}>Placa</th>
                  <th className={styles.th}>Tipo</th>
                  <th className={styles.th}>Hora Ingreso</th>
                  <th className={styles.th}>Valor</th>
                  <th className={styles.th}>Factura</th>
                  <th className={styles.th}>Estado</th>
                  {showHistory && <th className={styles.th}>Hora Salida</th>}
                </tr>
              </thead>
              <tbody>
                {paginatedVehicles.map((vehicle) => (
                  <tr 
                    key={vehicle.id} 
                    className={`${styles.tr} ${onVehicleClick ? styles.trClickable : ''}`}
                    onClick={() => onVehicleClick && onVehicleClick(vehicle)}
                  >
                    <td className={`${styles.td} ${styles.tdPlate}`}>
                      {vehicle.plate}
                    </td>
                    <td className={styles.td}>
                      <div className={styles.vehicleType}>
                        {renderVehicleIcon(vehicle.vehicleType)}
                        <span className={styles.vehicleTypeName}>
                          {vehicle.vehicleType === 'car' ? 'Carro' : 'Moto'}
                        </span>
                      </div>
                    </td>
                    <td className={styles.td}>{vehicle.entryTime}</td>
                    <td className={`${styles.td} ${styles.tdValue}`}>
                      {formatCurrency(vehicle.registrationValue)}
                    </td>
                    <td className={styles.td}>{vehicle.invoiceNumber}</td>
                    <td className={styles.td}>
                      <StatusBadge status={vehicle.status} />
                    </td>
                    {showHistory && (
                      <td className={styles.td}>
                        {vehicle.exitTime || 'N/A'}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {vehiclesToShow.length > itemsPerPage && (
              <div className={styles.pagination}>
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={styles.paginationButton}
                >
                  Anterior
                </button>
                <span className={styles.paginationInfo}>
                  Página {currentPage} de {totalPages}
                </span>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={styles.paginationButton}
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer with additional info */}
      {vehiclesToShow.length > 0 && (
        <div className={styles.tableFooter}>
          <p className={styles.footerText}>
            Mostrando <strong>{paginatedVehicles.length}</strong> de <strong>{vehiclesToShow.length}</strong> {vehiclesToShow.length === 1 ? 'vehículo' : 'vehículos'}
          </p>
        </div>
      )}
    </div>
  );
};

export default VehicleTable;
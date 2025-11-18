import React from "react";
import { Car, Clock, History } from "lucide-react";
import styles from "./VehicleTable.module.css";

const formatStatus = (status) => {
  if (!status) return "Sin estado";
  const normalized = status.toLowerCase();
  if (normalized === "activo" || normalized === "en parqueadero") return "En Parqueadero";
  if (normalized === "inactivo" || normalized === "retirado" || normalized === "fuera" || normalized === "finalizado") return "Fuera";
  return status;
};

const typeLabels = {
  carro: "Carro",
  moto: "Moto",
  car: "Carro",
  motorcycle: "Moto",
};

const formatCurrency = (amount) => {
  if (amount == null) return "N/A";
  return `$${Number(amount).toLocaleString("es-CO")}`;
};

const formatDateTime = (dateString) => {
  if (!dateString) return "N/A";
  const d = new Date(dateString);
  return `${d.toLocaleDateString("es-CO")} ${d.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

const VehicleTable = ({
  todayVehicles = [],
  activeVehicles = [],
  vehicleHistory = [],
  viewMode = "today",
}) => {
  let vehiclesToShow = [];
  let title = "";

  if (viewMode === "active") {
    vehiclesToShow = activeVehicles;
    title = "Vehículos Activos";
  } else if (viewMode === "today") {
    vehiclesToShow = todayVehicles;
    title = "Vehículos del Día";
  } else {
    vehiclesToShow = vehicleHistory;
    title = "Historial Completo";
  }

  return (
    <section className={styles.tableSection}>
      <div className={styles.tableHeader}>
        <h3 className={styles.tableTitle}>
          <Clock className={styles.titleIcon} />
          {title}
        </h3>
      </div>

      <div className={styles.tableContainer}>
        {vehiclesToShow.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              {viewMode === "history" ? <History size={48} /> : <Clock size={48} />}
            </div>
            <p className={styles.emptyTitle}>
              {viewMode === "history"
                ? "No hay vehículos en el historial"
                : "No hay vehículos registrados"}
            </p>
          </div>
        ) : (
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.th}>Placa</th>
                <th className={styles.th}>Tipo</th>
                <th className={styles.th}>Entrada</th>
                <th className={styles.th}>Valor Base</th>
                <th className={styles.th}>Factura</th>
                <th className={styles.th}>Monto</th>
                <th className={styles.th}>Tiempo</th>
                <th className={styles.th}>Estado</th>
                {viewMode === "history" && <th className={styles.th}>Salida</th>}
              </tr>
            </thead>
            <tbody>
              {vehiclesToShow.map((v, idx) => {
                const statusText = formatStatus(v.status);
                const badgeClass =
                  statusText === "En Parqueadero" ? styles.statusEnParqueadero :
                  statusText === "Fuera" ? styles.statusFuera :
                  styles.statusNeutral;

                return (
                  <tr key={idx} className={styles.tr}>
                    <td className={`${styles.td} ${styles.tdPlaca}`}>{v.license_plate}</td>
                    <td className={styles.td}>
                      <div className={styles.vehicle_type}>
                        {v.vehicle_type === "carro" || v.vehicle_type === "car" ? (
                          <Car className={styles.vehicleIcon} size={16} />
                        ) : (
                          <span className={styles.motoIcon}>🏍️</span>
                        )}
                        <span className={styles.vehicle_typeName}>
                          {typeLabels[v.vehicle_type] || v.vehicle_type}
                        </span>
                      </div>
                    </td>
                    <td className={styles.td}>{formatDateTime(v.entry_time)}</td>
                    <td className={`${styles.td} ${styles.tdValue}`}>
                      {formatCurrency(v.registration_value)}
                    </td>
                    <td className={styles.td}>{v.invoice_number || "N/A"}</td>
                    <td className={`${styles.td} ${styles.tdValue}`}>
                      {formatCurrency(v.total_amount)}
                    </td>
                    <td className={styles.td}>
                      {v.parking_time ? `${v.parking_time} min` : "N/A"}
                    </td>
                    <td className={styles.td}>
                      <span className={`${styles.statusBadge} ${badgeClass}`}>
                        {statusText}
                      </span>
                    </td>
                    {viewMode === "history" && (
                      <td className={styles.td}>{formatDateTime(v.exit_time)}</td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {vehiclesToShow.length > 0 && (
        <div className={styles.tableFooter}>
          <p className={styles.footerText}>
            Mostrando <strong>{vehiclesToShow.length}</strong>{" "}
            {vehiclesToShow.length === 1 ? "vehículo" : "vehículos"}
          </p>
        </div>
      )}
    </section>
  );
};

export default VehicleTable;

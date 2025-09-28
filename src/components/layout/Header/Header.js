import React from 'react';
import { Car, Clock, Settings } from 'lucide-react';
import styles from './Header.module.css';

const Header = ({
  title = "Parking management system",
  subtitle = "Manage vehicle entry and exit efficiently.",
  showActions = false,
  onSettingsClick,
  className = '',
  ...props
}) => {
  // Obtener fecha y hora actual
  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const time = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
    return { date, time };
  };

  const { date, time } = getCurrentDateTime();

  return (
    <header className={`${styles.header} ${className}`} {...props}>
      <div className={styles.container}>
        {/* Logo y título */}
        <div className={styles.brandSection}>
          <div className={styles.logoContainer}>
            <Car className={styles.logo} size={32} />
          </div>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>{title}</h1>
            {subtitle && (
              <p className={styles.subtitle}>{subtitle}</p>
            )}
          </div>
        </div>

        {/* Información de fecha/hora y acciones */}
        <div className={styles.infoSection}>
          {/* Fecha y hora actual */}
          <div className={styles.dateTimeContainer}>
            <div className={styles.dateTime}>
              <Clock className={styles.clockIcon} size={16} />
              <div className={styles.timeInfo}>
                <span className={styles.time}>{time}</span>
                <span className={styles.date}>{date}</span>
              </div>
            </div>
          </div>

          {/* Acciones opcionales */}
          {showActions && (
            <div className={styles.actionsContainer}>
              <button
                className={styles.actionButton}
                onClick={onSettingsClick}
                title="Configuración"
              >
                <Settings size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
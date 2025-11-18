import React from 'react';
import { Clock, LogOut } from 'lucide-react';
import styles from './Header.module.css';

const Header = ({
  title = "",
  subtitle = "",
  showActions = true,
  onLogout,
  className = '',
  ...props
}) => {
  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const time = now.toLocaleTimeString('es-CO', {
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
            <img src="/logo.png" alt="Logo Parqueadero" className={styles.logo} />
          </div>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>{title}</h1>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        </div>

        {/* Fecha/hora + botón */}
        <div className={styles.infoSection}>
          <div className={styles.dateTimeContainer}>
            <div className={styles.dateTime}>
              <Clock className={styles.clockIcon} size={16} />
              <div className={styles.timeInfo}>
                <span className={styles.time}>{time}</span>
                <span className={styles.date}>{date}</span>
              </div>
            </div>
          </div>

          {showActions && (
           <div className={styles.actionsContainer}>
  <button className={styles.logoutButton} onClick={onLogout}>
    <LogOut size={16} />
    Cerrar Sesión
  </button>
</div>

          )}
        </div>
      </div>
    </header>
  );
};


export default Header;

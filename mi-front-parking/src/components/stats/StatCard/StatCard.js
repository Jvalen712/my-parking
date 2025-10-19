import React from 'react';
import styles from './StatCard.module.css';

const StatCard = ({
  icon,
  label,
  value,
  variant = 'blue',
  trend,
  trendValue,
  subtitle,
  loading = false,
  onClick,
  className = '',
  ...props
}) => {
  // Función para obtener las clases de variante
  const getVariantClasses = () => {
    switch (variant) {
      case 'blue':
        return {
          card: styles.cardBlue,
          icon: styles.iconBlue
        };
      case 'green':
        return {
          card: styles.cardGreen,
          icon: styles.iconGreen
        };
      case 'purple':
        return {
          card: styles.cardPurple,
          icon: styles.iconPurple
        };
      case 'orange':
        return {
          card: styles.cardOrange,
          icon: styles.iconOrange
        };
      case 'red':
        return {
          card: styles.cardRed,
          icon: styles.iconRed
        };
      default:
        return {
          card: styles.cardBlue,
          icon: styles.iconBlue
        };
    }
  };

  const variantClasses = getVariantClasses();

  // Renderizar estado de carga
  if (loading) {
    return (
      <div className={`${styles.card} ${variantClasses.card} ${styles.cardLoading} ${className}`}>
        <div className={styles.skeleton}></div>
      </div>
    );
  }

  return (
    <div
      className={`
        ${styles.card} 
        ${variantClasses.card} 
        ${onClick ? styles.cardClickable : ''} 
        ${className}
      `.trim()}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    >
      <div className={styles.content}>
        {/* Icono */}
        <div className={`${styles.iconContainer} ${variantClasses.icon}`}>
          {icon}
        </div>

        {/* Información */}
        <div className={styles.info}>
          <p className={styles.label}>{label}</p>
          <p className={styles.value}>{value}</p>
          
          {/* Subtítulo opcional */}
          {subtitle && (
            <p className={styles.subtitle}>{subtitle}</p>
          )}

          {/* Tendencia opcional */}
          {trend && (
            <div className={`${styles.trend} ${trend === 'up' ? styles.trendUp : styles.trendDown}`}>
              <span className={styles.trendIcon}>
                {trend === 'up' ? '↑' : '↓'}
              </span>
              <span className={styles.trendValue}>{trendValue}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
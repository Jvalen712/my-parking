import React from 'react';
import styles from './StatusBadge.module.css';

const StatusBadge = ({ 
  status, 
  variant,
  children,
  icon,
  size = 'medium',
  className = '',
  ...props 
}) => {
  // Función para determinar la variante automáticamente basada en el status
  const getVariantFromStatus = (status) => {
    if (variant) return variant; // Si se proporciona variante manual, úsala
    
    switch (status?.toLowerCase()) {
      case 'activo':
      case 'en parqueadero':
      case 'active':
      case 'success':
        return 'success';
      
      case 'retirado':
      case 'retirada':
      case 'inactive':
      case 'retired':
        return 'secondary';
      
      case 'error':
      case 'failed':
        return 'danger';
      
      case 'warning':
      case 'pending':
        return 'warning';
      
      default:
        return 'primary';
    }
  };

  // Función para determinar qué clase CSS usar según la variante
  const getVariantClass = () => {
    const effectiveVariant = getVariantFromStatus(status);
    
    switch (effectiveVariant) {
      case 'success':
        return styles.badgeSuccess;
      case 'danger':
        return styles.badgeDanger;
      case 'warning':
        return styles.badgeWarning;
      case 'secondary':
        return styles.badgeSecondary;
      case 'info':
        return styles.badgeInfo;
      default:
        return styles.badgePrimary;
    }
  };

  // Función para determinar el tamaño
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return styles.badgeSmall;
      case 'large':
        return styles.badgeLarge;
      default:
        return styles.badgeMedium;
    }
  };

  // Función para formatear el texto del status
  const formatStatusText = (status) => {
    if (status === 'activo') return 'En Parqueadero';
    if (status === 'retirado') return 'Retirado';
    return status;
  };

  return (
    <span
      className={`
        ${styles.badge} 
        ${getVariantClass()} 
        ${getSizeClass()} 
        ${className}
      `.trim()}
      {...props}
    >
      {icon && (
        <span className={styles.badgeIcon}>
          {icon}
        </span>
      )}
      {children || formatStatusText(status)}
    </span>
  );
};

export default StatusBadge;
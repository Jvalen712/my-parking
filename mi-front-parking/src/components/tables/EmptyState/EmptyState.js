import React from 'react';
import { Inbox, Search, AlertCircle, FileX, Frown } from 'lucide-react';
import styles from './EmptyState.module.css';

const EmptyState = ({
  icon,
  title,
  description,
  action,
  actionLabel,
  onAction,
  variant = 'default',
  size = 'medium',
  className = '',
  ...props
}) => {
  // Iconos por defecto según variante
  const getDefaultIcon = () => {
    switch (variant) {
      case 'search':
        return <Search size={48} />;
      case 'error':
        return <AlertCircle size={48} />;
      case 'nodata':
        return <FileX size={48} />;
      case 'sad':
        return <Frown size={48} />;
      default:
        return <Inbox size={48} />;
    }
  };

  // Clases según tamaño
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return styles.emptySmall;
      case 'large':
        return styles.emptyLarge;
      default:
        return styles.emptyMedium;
    }
  };

  // Clase según variante
  const getVariantClass = () => {
    switch (variant) {
      case 'error':
        return styles.emptyError;
      case 'warning':
        return styles.emptyWarning;
      case 'info':
        return styles.emptyInfo;
      default:
        return '';
    }
  };

  return (
    <div 
      className={`
        ${styles.emptyState} 
        ${getSizeClass()} 
        ${getVariantClass()} 
        ${className}
      `.trim()}
      {...props}
    >
      {/* Icono */}
      <div className={styles.iconContainer}>
        {icon || getDefaultIcon()}
      </div>

      {/* Título */}
      {title && (
        <h3 className={styles.title}>{title}</h3>
      )}

      {/* Descripción */}
      {description && (
        <p className={styles.description}>{description}</p>
      )}

      {/* Acción opcional */}
      {(action || (actionLabel && onAction)) && (
        <div className={styles.actionContainer}>
          {action || (
            <button 
              className={styles.actionButton}
              onClick={onAction}
            >
              {actionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
import React from 'react';
import styles from './Button.module.css';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  icon, 
  disabled = false,
  type = 'button',
  className = '',
  ...props 
}) => {
  // Función para determinar qué clase CSS usar según la variante
  const getVariantClass = () => {
    switch (variant) {
      case 'success': 
        return styles.buttonSuccess;
      case 'danger': 
        return styles.buttonDanger;
      case 'secondary': 
        return styles.buttonSecondary;
      case 'purple':
        return styles.buttonPurple;
      default: 
        return styles.buttonPrimary;
    }
  };

  return (
    <button
      type={type}
      className={`${styles.button} ${getVariantClass()} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && (
        <span className={styles.buttonIcon}>
          {icon}
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;
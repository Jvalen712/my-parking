import React from 'react';
import { Car } from 'lucide-react';
import styles from './vehicle_typeSelector.module.css';

const vehicle_typeSelector = ({
  value,
  onChange,
  name = 'tipoVehiculo',
  label = 'Tipo de Vehículo',
  required = false,
  disabled = false,
  className = '',
  ...props
}) => {
  // Opciones de vehículos disponibles
  const vehicleOptions = [
    {
      value: 'carro',
      label: 'Carro',
      icon: <Car size={20} className={styles.optionIcon} />,
      description: 'Automóvil de 4 ruedas'
    },
    {
      value: 'moto',
      label: 'Moto',
      icon: <span className={styles.motoIcon}>🏍️</span>,
      description: 'Motocicleta de 2 ruedas'
    }
  ];

  const handleChange = (selectedValue) => {
    if (onChange) {
      // Simular evento de input para mantener compatibilidad
      const syntheticEvent = {
        target: {
          name,
          value: selectedValue
        }
      };
      onChange(syntheticEvent);
    }
  };

  return (
    <div className={`${styles.container} ${className}`} {...props}>
      {/* Label del selector */}
      {label && (
        <label className={`${styles.label} ${required ? styles.labelRequired : ''}`}>
          {label}
          {required && <span className={styles.asterisk}>*</span>}
        </label>
      )}

      {/* Opciones de vehículos */}
      <div className={styles.optionsContainer}>
        {vehicleOptions.map((option) => (
          <label
            key={option.value}
            className={`
              ${styles.option} 
              ${value === option.value ? styles.optionSelected : ''} 
              ${disabled ? styles.optionDisabled : ''}
            `.trim()}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => handleChange(option.value)}
              disabled={disabled}
              className={styles.radioInput}
            />
            
            <div className={styles.optionContent}>
              <div className={styles.optionHeader}>
                {option.icon}
                <span className={styles.optionLabel}>{option.label}</span>
              </div>
              <span className={styles.optionDescription}>
                {option.description}
              </span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default vehicle_typeSelector;
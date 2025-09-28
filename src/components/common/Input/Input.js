import React from 'react';
import styles from './Input.module.css';

const Input = ({ 
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  icon,
  className = '',
  ...props 
}) => {
  // ID único para conectar label con input
  const inputId = `input-${name}`;

  return (
    <div className={`${styles.inputContainer} ${className}`}>
      {/* Label del input */}
      {label && (
        <label 
          htmlFor={inputId} 
          className={`${styles.label} ${required ? styles.labelRequired : ''}`}
        >
          {label}
          {required && <span className={styles.asterisk}>*</span>}
        </label>
      )}

      {/* Contenedor del input con icono opcional */}
      <div className={styles.inputWrapper}>
        {/* Icono a la izquierda */}
        {icon && (
          <span className={styles.inputIcon}>
            {icon}
          </span>
        )}

        {/* Input principal */}
        <input
          id={inputId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            ${styles.input} 
            ${icon ? styles.inputWithIcon : ''} 
            ${error ? styles.inputError : ''}
            ${disabled ? styles.inputDisabled : ''}
          `.trim()}
          {...props}
        />
      </div>

      {/* Mensaje de error */}
      {error && (
        <span className={styles.errorMessage}>
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
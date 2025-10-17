import React, { useEffect } from 'react';
import { Car, Plus, Minus, RotateCcw } from 'lucide-react';
import Button from '../../common/Button';
import Input from '../../common/Input';
import styles from './VehicleForm.module.css';

const VehicleForm = ({ 
  formData, 
  onInputChange, 
  onAddVehicle, 
  onRemoveVehicle, 
  onClearForm 
}) => {
  // Update rate automatically based on vehicle type
  useEffect(() => {
    const rates = {
      'car': '5000',
      'motorcycle': '1500'
    };
    
    if (formData.vehicleType && rates[formData.vehicleType]) {
      const event = {
        target: {
          name: 'registrationValue',
          value: rates[formData.vehicleType]
        }
      };
      onInputChange(event);
    }
  }, [formData.vehicleType, onInputChange]);

  // Handle plate change with 20 character limit
  const handlePlateChange = (e) => {
    const value = e.target.value.slice(0, 20);
    onInputChange({
      target: {
        name: 'plate',
        value: value
      }
    });
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>
        <Car className={styles.titleIcon} />
        Registro de Vehículos
      </h2>

      <div className={styles.formContent}>
        {/* Plate field */}
        <Input
          label="Placa del Vehículo"
          name="plate"
          value={formData.plate}
          onChange={handlePlateChange}
          placeholder="Ej: ABC123"
          required
          style={{ textTransform: 'uppercase' }}
        />

        {/* Vehicle type */}
        <div className={styles.formField}>
          <label className={styles.label}>
            Tipo de Vehículo *
          </label>
          <div className={styles.radioGroup}>
            <label className={styles.radioOption}>
              <input
                type="radio"
                name="vehicleType"
                value="car"
                checked={formData.vehicleType === 'car'}
                onChange={onInputChange}
                className={styles.radioInput}
              />
              <Car className={styles.radioIcon} size={18} />
              <span>Carro</span>
              <span className={styles.rate}>($5.000/h)</span>
            </label>
            <label className={styles.radioOption}>
              <input
                type="radio"
                name="vehicleType"
                value="motorcycle"
                checked={formData.vehicleType === 'motorcycle'}
                onChange={onInputChange}
                className={styles.radioInput}
              />
              <span className={styles.motorcycleIcon}>🏍️</span>
              <span>Moto</span>
              <span className={styles.rate}>($1.500/h)</span>
            </label>
          </div>
        </div>

        {/* Entry time field - READ ONLY */}
        <Input
          label="Hora de Ingreso"
          name="entryTime"
          type="time"
          value={formData.entryTime}
          onChange={onInputChange}
          required
          disabled
        />

        {/* Registration value field - READ ONLY */}
        <Input
          label="Valor de la Matrícula"
          name="registrationValue"
          type="number"
          value={formData.registrationValue}
          onChange={onInputChange}
          icon={<span>$</span>}
          required
          disabled
        />

        {/* Invoice number field - READ ONLY */}
        <Input
          label="Número de Factura"
          name="invoiceNumber"
          value={formData.invoiceNumber}
          onChange={onInputChange}
          placeholder="Auto"
          required
          disabled
        />

        {/* Buttons */}
        <div className={styles.buttonContainer}>
          <Button
            variant="success"
            onClick={onAddVehicle}
            icon={<Plus size={16} />}
          >
            Ingresar Vehículo
          </Button>
          
          <Button
            variant="danger"
            onClick={onRemoveVehicle}
            icon={<Minus size={16} />}
          >
            Sacar Vehículo
          </Button>
          
          <Button
            variant="secondary"
            onClick={onClearForm}
            icon={<RotateCcw size={16} />}
          >
            Limpiar Casillas
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VehicleForm;
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

  const handleAddVehicle = async () => {
    const licenseOk = !!formData.license_plate?.trim();
    const typeOk = !!formData.vehicle_type;
    const regOk = formData.registrationValue !== null && formData.registrationValue !== undefined;

    if (!licenseOk || !typeOk || !regOk) {
      alert('Por favor, complete todos los campos correctamente');
      return;
    }

    try {
      const result = await onAddVehicle();

      if (result?.success) {
        alert(result.message || "Vehículo registrado");
        onClearForm();
      } else {
        alert(result?.message || "No se pudo registrar el vehículo");
      }
    } catch (error) {
      const backendMessage =
        error?.response?.data?.detail ||
        error?.message ||
        "Error de conexión con el servidor";
      alert(backendMessage);
    }
  };

  const handlePlateChange = (e) => {
    const value = e.target.value.toUpperCase().slice(0, 20);
    onInputChange({ target: { name: 'license_plate', value } });
  };

  useEffect(() => {
    const rates = { carro: 3000, moto: 1500 };
    const newRate = rates[formData.vehicle_type];
    if (newRate !== undefined && formData.registrationValue !== newRate) {
      onInputChange({ target: { name: 'registrationValue', value: newRate } });
    }
  }, [formData.vehicle_type, onInputChange]);

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>
        <Car className={styles.titleIcon} />
        Registro de Vehículos
      </h2>

      <div className={styles.formContent}>
        <Input
          name="license_plate"
          value={formData.license_plate || ''}
          onChange={handlePlateChange}
        />

        <div className={styles.formField}>
          <label className={styles.label}>Tipo de Vehículo *</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioOption}>
              <input
                type="radio"
                name="vehicle_type"
                value="carro"
                checked={formData.vehicle_type === 'carro'}
                onChange={onInputChange}
                className={styles.radioInput}
              />
              <Car className={styles.radioIcon} size={18} />
              <span>Carro</span>
              <span className={styles.rate}>($3.000/h)</span>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                name="vehicle_type"
                value="moto"
                checked={formData.vehicle_type === 'moto'}
                onChange={onInputChange}
                className={styles.radioInput}
              />
              <span className={styles.motorcycleIcon}>🏍️</span>
              <span>Moto</span>
              <span className={styles.rate}>($1.500/h)</span>
            </label>
          </div>
        </div>

        <Input
          label="Hora de Ingreso"
          name="entryTime"
          type="datetime-local"
          value={formData.entryTime || ''}
          onChange={onInputChange}
          disabled
        />

        <Input
          label="Valor de la Matrícula"
          name="registrationValue"
          type="number"
          value={formData.registrationValue || ''}
          onChange={onInputChange}
          icon={<span>$</span>}
          required
          disabled
        />

        <Input
          label="Número de Factura"
          name="invoiceNumber"
          value={formData.invoiceNumber || ''}
          onChange={onInputChange}
          placeholder="Auto"
          disabled
        />

        <div className={styles.buttonContainer}>
          <Button variant="success" onClick={handleAddVehicle} icon={<Plus size={16} />}>
            Ingresar Vehículo
          </Button>
          <Button variant="danger" onClick={onRemoveVehicle} icon={<Minus size={16} />}>
            Sacar Vehículo
          </Button>
          <Button variant="secondary" onClick={onClearForm} icon={<RotateCcw size={16} />}>
            Limpiar Casillas
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VehicleForm;

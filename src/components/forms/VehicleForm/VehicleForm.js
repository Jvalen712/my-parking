import React from 'react';
import { Car, Plus, Minus, RotateCcw } from 'lucide-react';
import Button from '../../common/Button';
import Input from '../../common/Input';
import styles from './VehicleForm.module.css';

const VehicleForm = ({ 
  formData, 
  onInputChange, 
  onIngresarVehiculo, 
  onSacarVehiculo, 
  onLimpiarCasillas 
}) => {
  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>
        <Car className={styles.titleIcon} />
        Registro de Vehículos
      </h2>

      <div className={styles.formContent}>
        {/* Campo Placa */}
        <Input
          label="Placa del vehiculo"
          name="placa"
          value={formData.placa}
          onChange={onInputChange}
          placeholder="Ej: ABC123"
          required
          style={{ textTransform: 'uppercase' }}
        />

        {/* Tipo de Vehículo */}
        <div className={styles.formField}>
          <label className={styles.label}>
            Tipo de Vehículo *
          </label>
          <div className={styles.radioGroup}>
            <label className={styles.radioOption}>
              <input
                type="radio"
                name="tipoVehiculo"
                value="carro"
                checked={formData.tipoVehiculo === 'carro'}
                onChange={onInputChange}
                className={styles.radioInput}
              />
              <Car className={styles.radioIcon} size={20} />
              <span>Carro</span>
            </label>
            <label className={styles.radioOption}>
              <input
                type="radio"
                name="tipoVehiculo"
                value="moto"
                checked={formData.tipoVehiculo === 'moto'}
                onChange={onInputChange}
                className={styles.radioInput}
              />
              <span className={styles.motoIcon}>🏍️</span>
              <span>Moto</span>
            </label>
          </div>
        </div>

        {/* Campo Hora de Ingreso */}
        <Input
          label="Hora"
          name="horaIngreso"
          type="time"
          value={formData.horaIngreso}
          onChange={onInputChange}
          required
        />

        {/* Campo Valor Matrícula */}
        <Input
          label="Valor por hora"
          name="valorMatricula"
          type="number"
          value={formData.valorMatricula}
          onChange={onInputChange}
          placeholder="5000"
          icon={<span className={styles.currencyIcon}>$</span>}
          required
        />

        {/* Campo Número de Factura */}
        <Input
          label="Numero de factura"
          name="numeroFactura"
          value={formData.numeroFactura}
          onChange={onInputChange}
          placeholder="Ej: F001-123"
          required
        />

        {/* Botones */}
        <div className={styles.buttonContainer}>
          <Button
            variant="success"
            onClick={onIngresarVehiculo}
            icon={<Plus size={20} />}
            title="Haz click una vez llenes los campos solicitados"
          >
            Ingresar Vehículo
          </Button>
          
          <Button
            variant="danger"
            onClick={onSacarVehiculo}
            icon={<Minus size={20} />}
            title="Haz click una vez llenes los campos solicitados"
        
          >
            Sacar Vehículo
          </Button>
          
          <Button
            variant="secondary"
            onClick={onLimpiarCasillas}
            icon={<RotateCcw size={20} />}
            title= "Se borraran los datos ingresados"
          >
            Limpiar Casillas
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VehicleForm;
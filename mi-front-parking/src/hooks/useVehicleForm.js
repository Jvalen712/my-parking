import { useState, useEffect } from 'react';

/**
 * Custom hook to manage vehicle form
 * @param {Object} options - Configuration options
 * @returns {Object} - Form state and methods
 */
export const useVehicleForm = ({ 
  addVehicle, 
  removeVehicle,
  onSuccess,
  onError 
} = {}) => {
  // Generate automatic invoice number
  const generateInvoiceNumber = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const number = Math.floor(Math.random() * 99999) + 1;
    const letter = letters.charAt(Math.floor(Math.random() * letters.length));
    return `F${letter}-${number.toString().padStart(5, '0')}`;
  };

  const initialFormState = {
    plate: '',
    vehicleType: 'car',
    entryTime: '',
    registrationValue: '5000',
    invoiceNumber: generateInvoiceNumber()
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize current time on mount
  useEffect(() => {
    const now = new Date();
    const timeString = now.toTimeString().slice(0, 5);
    setFormData(prev => ({ 
      ...prev, 
      entryTime: timeString,
      invoiceNumber: generateInvoiceNumber()
    }));
  }, []);

  // Update rate automatically based on vehicle type
  useEffect(() => {
    const rates = {
      'car': '5000',
      'motorcycle': '1500'
    };
    
    if (formData.vehicleType && rates[formData.vehicleType]) {
      setFormData(prev => ({
        ...prev,
        registrationValue: rates[formData.vehicleType]
      }));
    }
  }, [formData.vehicleType]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error if exists
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate individual field
  const validateField = (name, value) => {
    switch (name) {
      case 'plate':
        if (!value) return 'La placa es requerida';
        if (value.length < 5) return 'La placa debe tener al menos 5 caracteres';
        if (value.length > 20) return 'La placa no puede tener más de 20 caracteres';
        return '';
      
      case 'registrationValue':
        if (!value) return 'El valor es requerido';
        if (Number(value) <= 0) return 'El valor debe ser mayor a 0';
        return '';
      
      case 'invoiceNumber':
        if (!value) return 'El número de factura es requerido';
        return '';
      
      case 'entryTime':
        if (!value) return 'La hora es requerida';
        return '';
      
      default:
        return '';
    }
  };

  // Validate complete form
  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Clear form
  const clearForm = () => {
    const now = new Date();
    const timeString = now.toTimeString().slice(0, 5);
    
    setFormData({
      plate: '',
      vehicleType: 'car',
      entryTime: timeString,
      registrationValue: '5000',
      invoiceNumber: generateInvoiceNumber()
    });
    
    setErrors({});
    setIsSubmitting(false);
  };

  // Handle add vehicle
  const handleAddVehicle = async () => {
    if (!validateForm()) {
      onError?.('Por favor, complete todos los campos correctamente');
      return;
    }

    if (!addVehicle) {
      console.error('addVehicle function not provided');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = addVehicle(formData);
      
      if (result.success) {
        clearForm();
        onSuccess?.(result.message, result.vehicle);
      } else {
        onError?.(result.message);
      }
    } catch (error) {
      console.error('Error adding vehicle:', error);
      onError?.('Error al ingresar el vehículo');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle remove vehicle
  const handleRemoveVehicle = async () => {
    if (!formData.plate) {
      onError?.('Por favor, ingrese la placa del vehículo a retirar');
      return;
    }

    if (!removeVehicle) {
      console.error('removeVehicle function not provided');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = removeVehicle(formData.plate);
      
      if (result.success) {
        clearForm();
        onSuccess?.(result.message, result.vehicle);
      } else {
        onError?.(result.message);
      }
    } catch (error) {
      console.error('Error removing vehicle:', error);
      onError?.('Error al retirar el vehículo');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // Form state
    formData,
    errors,
    isSubmitting,

    // Methods
    handleInputChange,
    handleAddVehicle,
    handleRemoveVehicle,
    clearForm,
    validateForm
  };
};

export default useVehicleForm;
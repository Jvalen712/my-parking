import { useState, useEffect } from 'react';

/**
 * Hook personalizado para manejar el formulario de vehículos
 * @param {Object} options - Opciones de configuración
 * @returns {Object} - Estado y métodos del formulario
 */
export const useVehicleForm = ({ 
  ingresarVehiculo, 
  sacarVehiculo,
  onSuccess,
  onError 
} = {}) => {
  // Estado inicial del formulario
  const initialFormState = {
    placa: '',
    tipoVehiculo: 'carro',
    horaIngreso: '',
    valorMatricula: '',
    numeroFactura: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inicializar hora actual al montar
  useEffect(() => {
    const now = new Date();
    const timeString = now.toTimeString().slice(0, 5);
    setFormData(prev => ({ ...prev, horaIngreso: timeString }));
  }, []);

  // Actualizar hora cada minuto (opcional)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toTimeString().slice(0, 5);
      setFormData(prev => ({ ...prev, horaIngreso: timeString }));
    }, 60000); // Actualizar cada minuto

    return () => clearInterval(interval);
  }, []);

  // Manejar cambios en inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error del campo si existe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validar campo individual
  const validateField = (name, value) => {
    switch (name) {
      case 'placa':
        if (!value) return 'La placa es requerida';
        if (value.length < 5) return 'La placa debe tener al menos 5 caracteres';
        return '';
      
      case 'valorMatricula':
        if (!value) return 'El valor es requerido';
        if (Number(value) <= 0) return 'El valor debe ser mayor a 0';
        return '';
      
      case 'numeroFactura':
        if (!value) return 'El número de factura es requerido';
        return '';
      
      case 'horaIngreso':
        if (!value) return 'La hora es requerida';
        return '';
      
      default:
        return '';
    }
  };

  // Validar formulario completo
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

  // Limpiar formulario
  const limpiarCasillas = () => {
    const now = new Date();
    const timeString = now.toTimeString().slice(0, 5);
    
    setFormData({
      ...initialFormState,
      horaIngreso: timeString
    });
    
    setErrors({});
    setIsSubmitting(false);
  };

  // Manejar ingreso de vehículo
  const handleIngresarVehiculo = async () => {
    if (!validateForm()) {
      onError?.('Por favor, complete todos los campos correctamente');
      return;
    }

    if (!ingresarVehiculo) {
      console.error('ingresarVehiculo function not provided');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = ingresarVehiculo(formData);
      
      if (result.success) {
        limpiarCasillas();
        onSuccess?.(result.message, result.vehiculo);
      } else {
        onError?.(result.message);
      }
    } catch (error) {
      console.error('Error al ingresar vehículo:', error);
      onError?.('Error al ingresar el vehículo');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Manejar salida de vehículo
  const handleSacarVehiculo = async () => {
    if (!formData.placa) {
      onError?.('Por favor, ingrese la placa del vehículo a retirar');
      return;
    }

    if (!sacarVehiculo) {
      console.error('sacarVehiculo function not provided');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = sacarVehiculo(formData.placa);
      
      if (result.success) {
        limpiarCasillas();
        onSuccess?.(result.message, result.vehiculo);
      } else {
        onError?.(result.message);
      }
    } catch (error) {
      console.error('Error al sacar vehículo:', error);
      onError?.('Error al retirar el vehículo');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resetear formulario a estado inicial
  const resetForm = () => {
    limpiarCasillas();
  };

  // Setear datos del formulario manualmente
  const setFormValues = (values) => {
    setFormData(prev => ({
      ...prev,
      ...values
    }));
  };

  return {
    // Estado del formulario
    formData,
    errors,
    isSubmitting,

    // Métodos de manejo
    handleInputChange,
    handleIngresarVehiculo,
    handleSacarVehiculo,
    limpiarCasillas,
    resetForm,
    setFormValues,
    validateForm
  };
};

export default useVehicleForm;
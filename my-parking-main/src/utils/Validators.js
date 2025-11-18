/**
 * Valida una placa de vehículo colombiana
 * @param {string} plate - Placa a validar
 * @returns {Object} { valid: boolean, message: string }
 */
export const validatePlate = (plate) => {
  if (!plate || plate.trim() === '') {
    return { valid: false, message: 'La placa es requerida' };
  }
  
  const cleanPlate = plate.trim();
  
  if (cleanPlate.length < 5) {
    return { valid: false, message: 'La placa debe tener al menos 5 caracteres' };
  }
  
  if (cleanPlate.length > 7) {
    return { valid: false, message: 'La placa no puede tener más de 7 caracteres' };
  }
  
  // Formato básico: letras y números
  const plateRegex = /^[A-Za-z0-9]+$/;
  if (!plateRegex.test(cleanPlate)) {
    return { valid: false, message: 'La placa solo puede contener letras y números' };
  }
  
  return { valid: true, message: '' };
};

/**
 * Valida un valor de matrícula
 * @param {string|number} value - Valor a validar
 * @returns {Object} { valid: boolean, message: string }
 */
export const validateAmount = (value) => {
  if (!value || value === '') {
    return { valid: false, message: 'El valor es requerido' };
  }
  
  const numValue = Number(value);
  
  if (isNaN(numValue)) {
    return { valid: false, message: 'El valor debe ser un número' };
  }
  
  if (numValue <= 0) {
    return { valid: false, message: 'El valor debe ser mayor a 0' };
  }
  
  if (numValue > 1000000) {
    return { valid: false, message: 'El valor no puede ser mayor a $1.000.000' };
  }
  
  return { valid: true, message: '' };
};

/**
 * Valida un número de factura
 * @param {string} invoiceNumber - Número de factura a validar
 * @returns {Object} { valid: boolean, message: string }
 */
export const validateInvoiceNumber = (invoiceNumber) => {
  if (!invoiceNumber || invoiceNumber.trim() === '') {
    return { valid: false, message: 'El número de factura es requerido' };
  }
  
  if (invoiceNumber.trim().length < 3) {
    return { valid: false, message: 'El número de factura debe tener al menos 3 caracteres' };
  }
  
  return { valid: true, message: '' };
};

/**
 * Valida una hora en formato HH:MM
 * @param {string} time - Hora a validar
 * @returns {Object} { valid: boolean, message: string }
 */
export const validateTime = (time) => {
  if (!time || time.trim() === '') {
    return { valid: false, message: 'La hora es requerida' };
  }
  
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(time)) {
    return { valid: false, message: 'Formato de hora inválido (HH:MM)' };
  }
  
  return { valid: true, message: '' };
};

/**
 * Valida un tipo de vehículo
 * @param {string} type - Tipo de vehículo
 * @returns {Object} { valid: boolean, message: string }
 */
export const validatevehicle_type = (type) => {
  const validTypes = ['carro', 'moto'];
  
  if (!type || !validTypes.includes(type.toLowerCase())) {
    return { valid: false, message: 'Tipo de vehículo inválido' };
  }
  
  return { valid: true, message: '' };
};

/**
 * Valida todos los datos del formulario de vehículo
 * @param {Object} formData - Datos del formulario
 * @returns {Object} { valid: boolean, errors: Object }
 */
export const validateVehicleForm = (formData) => {
  const errors = {};
  
  const plateValidation = validatePlate(formData.placa);
  if (!plateValidation.valid) {
    errors.placa = plateValidation.message;
  }
  
  const typeValidation = validatevehicle_type(formData.tipoVehiculo);
  if (!typeValidation.valid) {
    errors.tipoVehiculo = typeValidation.message;
  }
  
  const timeValidation = validateTime(formData.horaIngreso);
  if (!timeValidation.valid) {
    errors.horaIngreso = timeValidation.message;
  }
  
  const amountValidation = validateAmount(formData.valorMatricula);
  if (!amountValidation.valid) {
    errors.valorMatricula = amountValidation.message;
  }
  
  const invoiceValidation = validateInvoiceNumber(formData.numeroFactura);
  if (!invoiceValidation.valid) {
    errors.numeroFactura = invoiceValidation.message;
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Valida si un email es válido
 * @param {string} email - Email a validar
 * @returns {boolean} True si es válido
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida si un string no está vacío
 * @param {string} value - Valor a validar
 * @returns {boolean} True si no está vacío
 */
export const isNotEmpty = (value) => {
  return value && value.trim() !== '';
};
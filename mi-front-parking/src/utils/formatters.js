/**
 * Formatea un número como moneda colombiana (COP)
 * @param {number|string} amount - Cantidad a formatear
 * @returns {string} Cantidad formateada (ej: "$5.000")
 */
export const formatCurrency = (amount) => {
  const number = Number(amount) || 0;
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number);
};

/**
 * Formatea un número con separadores de miles
 * @param {number|string} number - Número a formatear
 * @returns {string} Número formateado (ej: "1.234.567")
 */
export const formatNumber = (number) => {
  const num = Number(number) || 0;
  return num.toLocaleString('es-CO');
};

/**
 * Formatea una placa de vehículo en mayúsculas
 * @param {string} plate - Placa del vehículo
 * @returns {string} Placa en mayúsculas sin espacios
 */
export const formatPlate = (plate) => {
  if (!plate) return '';
  return plate.trim().toUpperCase();
};

/**
 * Capitaliza la primera letra de una cadena
 * @param {string} text - Texto a capitalizar
 * @returns {string} Texto capitalizado
 */
export const capitalize = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Formatea un tipo de vehículo
 * @param {string} type - Tipo de vehículo ('carro' o 'moto')
 * @returns {string} Tipo formateado y capitalizado
 */
export const formatVehicleType = (type) => {
  if (!type) return '';
  return capitalize(type);
};

/**
 * Formatea un estado de vehículo
 * @param {string} status - Estado ('activo' o 'retirado')
 * @returns {string} Estado formateado
 */
export const formatStatus = (status) => {
  const statusMap = {
    'activo': 'En Parqueadero',
    'retirado': 'Retirado',
    'en parqueadero': 'En Parqueadero'
  };
  
  return statusMap[status?.toLowerCase()] || status;
};

/**
 * Trunca un texto a una longitud máxima
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} Texto truncado con "..."
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Formatea un número de factura
 * @param {string} invoiceNumber - Número de factura
 * @returns {string} Número formateado en mayúsculas
 */
export const formatInvoiceNumber = (invoiceNumber) => {
  if (!invoiceNumber) return '';
  return invoiceNumber.trim().toUpperCase();
};

/**
 * Formatea un porcentaje
 * @param {number} value - Valor decimal (ej: 0.75)
 * @param {number} decimals - Decimales a mostrar
 * @returns {string} Porcentaje formateado (ej: "75%")
 */
export const formatPercentage = (value, decimals = 0) => {
  const percentage = (Number(value) || 0) * 100;
  return `${percentage.toFixed(decimals)}%`;
};

/**
 * Limpia y formatea un string
 * @param {string} text - Texto a limpiar
 * @returns {string} Texto sin espacios extra
 */
export const cleanString = (text) => {
  if (!text) return '';
  return text.trim().replace(/\s+/g, ' ');
};
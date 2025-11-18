/**
 * Genera un ID único basado en timestamp y random
 * @returns {string} ID único
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Obtiene la hora actual en formato HH:MM
 * @returns {string} Hora en formato HH:MM
 */
export const getCurrentTime = () => {
  const now = new Date();
  return now.toTimeString().slice(0, 5);
};

/**
 * Obtiene la fecha actual en formato locale español
 * @returns {string} Fecha en formato dd/mm/aaaa
 */
export const getCurrentDate = () => {
  return new Date().toLocaleDateString('es-CO');
};

/**
 * Obtiene fecha y hora actual en formato locale español
 * @returns {string} Fecha y hora completa
 */
export const getCurrentDateTime = () => {
  return new Date().toLocaleString('es-CO');
};

/**
 * Formatea una fecha en formato personalizado
 * @param {Date|string} date - Fecha a formatear
 * @param {Object} options - Opciones de formato
 * @returns {string} Fecha formateada
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('es-CO', defaultOptions);
};

/**
 * Formatea una hora en formato personalizado
 * @param {Date|string} time - Hora a formatear
 * @returns {string} Hora formateada HH:MM
 */
export const formatTime = (time) => {
  const timeObj = typeof time === 'string' ? new Date(time) : time;
  return timeObj.toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Calcula la diferencia en horas entre dos fechas
 * @param {Date|string} startDate - Fecha inicial
 * @param {Date|string} endDate - Fecha final (opcional, default: ahora)
 * @returns {number} Diferencia en horas
 */
export const calcularHorasTranscurridas = (startDate, endDate = new Date()) => {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  
  const diffMs = end - start;
  return Math.floor(diffMs / (1000 * 60 * 60));
};

/**
 * Calcula la diferencia en minutos entre dos fechas
 * @param {Date|string} startDate - Fecha inicial
 * @param {Date|string} endDate - Fecha final (opcional, default: ahora)
 * @returns {number} Diferencia en minutos
 */
export const calcularMinutosTranscurridos = (startDate, endDate = new Date()) => {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  
  const diffMs = end - start;
  return Math.floor(diffMs / (1000 * 60));
};

/**
 * Verifica si una fecha es hoy
 * @param {Date|string} date - Fecha a verificar
 * @returns {boolean} True si es hoy
 */
export const isToday = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  
  return dateObj.getDate() === today.getDate() &&
         dateObj.getMonth() === today.getMonth() &&
         dateObj.getFullYear() === today.getFullYear();
};

/**
 * Obtiene el nombre del día de la semana
 * @param {Date|string} date - Fecha
 * @returns {string} Nombre del día (ej: "lunes")
 */
export const getDayName = (date = new Date()) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('es-CO', { weekday: 'long' });
};

/**
 * Obtiene el nombre del mes
 * @param {Date|string} date - Fecha
 * @returns {string} Nombre del mes (ej: "enero")
 */
export const getMonthName = (date = new Date()) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('es-CO', { month: 'long' });
};
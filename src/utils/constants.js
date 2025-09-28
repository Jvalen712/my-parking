/**
 * Tipos de vehículos disponibles
 */
export const VEHICLE_TYPES = {
  CARRO: 'carro',
  MOTO: 'moto'
};

/**
 * Estados de vehículos
 */
export const VEHICLE_STATUS = {
  ACTIVO: 'activo',
  RETIRADO: 'retirado',
  EN_PARQUEADERO: 'en parqueadero'
};

/**
 * Variantes de color para componentes
 */
export const COLOR_VARIANTS = {
  PRIMARY: 'primary',
  SUCCESS: 'success',
  DANGER: 'danger',
  WARNING: 'warning',
  SECONDARY: 'secondary',
  INFO: 'info',
  BLUE: 'blue',
  GREEN: 'green',
  PURPLE: 'purple',
  ORANGE: 'orange',
  RED: 'red'
};

/**
 * Tamaños de componentes
 */
export const SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
};

/**
 * Mensajes de validación
 */
export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: 'Este campo es requerido',
  INVALID_PLATE: 'Placa inválida',
  INVALID_AMOUNT: 'Valor inválido',
  INVALID_TIME: 'Hora inválida',
  PLATE_EXISTS: 'Esta placa ya se encuentra en el parqueadero',
  PLATE_NOT_FOUND: 'No se encontró un vehículo con esta placa',
  MIN_VALUE: 'El valor debe ser mayor a 0',
  MAX_VALUE: 'El valor supera el máximo permitido'
};

/**
 * Mensajes de éxito
 */
export const SUCCESS_MESSAGES = {
  VEHICLE_ADDED: 'Vehículo ingresado exitosamente',
  VEHICLE_REMOVED: 'Vehículo retirado exitosamente',
  FORM_CLEARED: 'Formulario limpiado',
  DATA_SAVED: 'Datos guardados correctamente'
};

/**
 * Configuración de moneda
 */
export const CURRENCY_CONFIG = {
  LOCALE: 'es-CO',
  CURRENCY: 'COP',
  MIN_VALUE: 0,
  MAX_VALUE: 1000000
};

/**
 * Configuración de fechas
 */
export const DATE_CONFIG = {
  LOCALE: 'es-CO',
  TIMEZONE: 'America/Bogota'
};

/**
 * Límites de la aplicación
 */
export const LIMITS = {
  MAX_VEHICLES: 100,
  MAX_HISTORY: 1000,
  PLATE_MIN_LENGTH: 5,
  PLATE_MAX_LENGTH: 7,
  INVOICE_MIN_LENGTH: 3
};

/**
 * Claves para localStorage
 */
export const STORAGE_KEYS = {
  VEHICLES_ACTIVE: 'parking_vehicles_active',
  VEHICLES_HISTORY: 'parking_vehicles_history',
  USER_PREFERENCES: 'parking_user_preferences'
};

/**
 * Rutas de la aplicación (para futuras expansiones)
 */
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  HISTORY: '/history',
  STATS: '/stats'
};

/**
 * Iconos por tipo de vehículo
 */
export const VEHICLE_ICONS = {
  [VEHICLE_TYPES.CARRO]: '🚗',
  [VEHICLE_TYPES.MOTO]: '🏍️'
};

/**
 * Colores por tipo de vehículo
 */
export const VEHICLE_COLORS = {
  [VEHICLE_TYPES.CARRO]: '#2563eb',
  [VEHICLE_TYPES.MOTO]: '#16a34a'
};
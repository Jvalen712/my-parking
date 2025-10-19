import { useState } from 'react';

/**
 * Custom hook to manage parking lot logic
 * @returns {Object} - Methods and states for vehicle management
 */
export const useParkingData = () => {
  const [activeVehicles, setActiveVehicles] = useState([]);
  const [vehicleHistory, setVehicleHistory] = useState([]);

  // Generate unique ID
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  // Get current date
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('es-CO');
  };

  // Get current date and time
  const getCurrentDateTime = () => {
    return new Date().toLocaleString('es-CO');
  };

  // Validate form data
  const validateFormData = (formData) => {
    if (!formData.plate) {
      return { valid: false, message: 'La placa es requerida' };
    }
    if (!formData.entryTime) {
      return { valid: false, message: 'La hora de ingreso es requerida' };
    }
    if (!formData.registrationValue || Number(formData.registrationValue) <= 0) {
      return { valid: false, message: 'El valor de la matrícula debe ser mayor a 0' };
    }
    if (!formData.invoiceNumber) {
      return { valid: false, message: 'El número de factura es requerido' };
    }
    return { valid: true };
  };

  // Check if vehicle exists
  const vehicleExists = (plate) => {
    return activeVehicles.some(
      v => v.plate.toLowerCase() === plate.toLowerCase()
    );
  };

  // Add vehicle
  const addVehicle = (formData) => {
    // Validate data
    const validation = validateFormData(formData);
    if (!validation.valid) {
      return { success: false, message: validation.message };
    }

    // Check if plate already exists
    if (vehicleExists(formData.plate)) {
      return { 
        success: false, 
        message: 'Esta placa ya se encuentra en el parqueadero' 
      };
    }

    // Create new vehicle
    const newVehicle = {
      id: generateId(),
      plate: formData.plate,
      vehicleType: formData.vehicleType,
      entryTime: formData.entryTime,
      registrationValue: formData.registrationValue,
      invoiceNumber: formData.invoiceNumber,
      entryDate: getCurrentDate(),
      fullEntryDateTime: getCurrentDateTime(),
      status: 'active'
    };

    // Add to active vehicles
    setActiveVehicles(prev => [...prev, newVehicle]);

    return { 
      success: true, 
      message: 'Vehículo ingresado exitosamente',
      vehicle: newVehicle
    };
  };

  // Remove vehicle
  const removeVehicle = (plate) => {
    if (!plate) {
      return { 
        success: false, 
        message: 'Por favor, ingrese la placa del vehículo a retirar' 
      };
    }

    // Find vehicle
    const vehicleIndex = activeVehicles.findIndex(
      v => v.plate.toLowerCase() === plate.toLowerCase()
    );

    if (vehicleIndex === -1) {
      return { 
        success: false, 
        message: 'No se encontró un vehículo con esta placa en el parqueadero' 
      };
    }

    const vehicle = activeVehicles[vehicleIndex];

    // Create exit record
    const exitVehicle = {
      ...vehicle,
      exitTime: getCurrentDateTime(),
      status: 'removed'
    };

    // Move to history
    setVehicleHistory(prev => [exitVehicle, ...prev]);

    // Remove from active vehicles
    setActiveVehicles(prev => 
      prev.filter((_, index) => index !== vehicleIndex)
    );

    return { 
      success: true, 
      message: 'Vehículo retirado exitosamente',
      vehicle: exitVehicle
    };
  };

  // Search vehicle by plate
  const findVehicle = (plate) => {
    return activeVehicles.find(
      v => v.plate.toLowerCase() === plate.toLowerCase()
    );
  };

  // Get today's vehicles
  const getTodaysVehicles = () => {
    const today = getCurrentDate();
    return activeVehicles.filter(v => v.entryDate === today);
  };

  // Get statistics
  const getStatistics = () => {
    const todaysVehicles = getTodaysVehicles();
    const totalActive = activeVehicles.length;
    const totalToday = todaysVehicles.length;
    const totalHistory = vehicleHistory.length;
    
    const activeCars = activeVehicles.filter(v => v.vehicleType === 'car').length;
    const activeMotorcycles = activeVehicles.filter(v => v.vehicleType === 'motorcycle').length;

    const todaysRevenue = todaysVehicles.reduce((total, v) => 
      total + Number(v.registrationValue || 0), 0
    );

    return {
      totalActive,
      totalToday,
      totalHistory,
      activeCars,
      activeMotorcycles,
      todaysRevenue
    };
  };

  // Clear all data
  const clearData = () => {
    setActiveVehicles([]);
    setVehicleHistory([]);
  };

  return {
    // States
    activeVehicles,
    vehicleHistory,
    
    // Main methods
    addVehicle,
    removeVehicle,
    findVehicle,
    
    // Auxiliary methods
    getTodaysVehicles,
    getStatistics,
    clearData,
    vehicleExists
  };
};

export default useParkingData;
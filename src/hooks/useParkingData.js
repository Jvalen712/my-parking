import { useState } from 'react';

/**
 * Hook personalizado para manejar la lógica del parqueadero
 * @returns {Object} - Métodos y estados para gestión de vehículos
 */
export const useParkingData = () => {
  const [vehiculosActivos, setVehiculosActivos] = useState([]);
  const [historialVehiculos, setHistorialVehiculos] = useState([]);

  // Generar ID único
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  // Obtener fecha actual
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('es-CO');
  };

  // Obtener fecha y hora actual
  const getCurrentDateTime = () => {
    return new Date().toLocaleString('es-CO');
  };

  // Validar datos del formulario
  const validarFormData = (formData) => {
    if (!formData.placa) {
      return { valid: false, message: 'La placa es requerida' };
    }
    if (!formData.horaIngreso) {
      return { valid: false, message: 'La hora de ingreso es requerida' };
    }
    if (!formData.valorMatricula || Number(formData.valorMatricula) <= 0) {
      return { valid: false, message: 'El valor de la matrícula debe ser mayor a 0' };
    }
    if (!formData.numeroFactura) {
      return { valid: false, message: 'El número de factura es requerido' };
    }
    return { valid: true };
  };

  // Verificar si una placa ya existe
  const vehiculoExiste = (placa) => {
    return vehiculosActivos.some(
      v => v.placa.toLowerCase() === placa.toLowerCase()
    );
  };

  // Ingresar vehículo
  const ingresarVehiculo = (formData) => {
    // Validar datos
    const validacion = validarFormData(formData);
    if (!validacion.valid) {
      return { success: false, message: validacion.message };
    }

    // Verificar si la placa ya existe
    if (vehiculoExiste(formData.placa)) {
      return { 
        success: false, 
        message: 'Esta placa ya se encuentra en el parqueadero' 
      };
    }

    // Crear nuevo vehículo
    const nuevoVehiculo = {
      id: generateId(),
      ...formData,
      fechaIngreso: getCurrentDate(),
      horaIngresoCompleta: getCurrentDateTime(),
      estado: 'activo'
    };

    // Agregar a vehículos activos
    setVehiculosActivos(prev => [...prev, nuevoVehiculo]);

    return { 
      success: true, 
      message: 'Vehículo ingresado exitosamente',
      vehiculo: nuevoVehiculo
    };
  };

  // Sacar vehículo
  const sacarVehiculo = (placa) => {
    if (!placa) {
      return { 
        success: false, 
        message: 'Por favor, ingrese la placa del vehículo a retirar' 
      };
    }

    // Buscar vehículo
    const vehiculoIndex = vehiculosActivos.findIndex(
      v => v.placa.toLowerCase() === placa.toLowerCase()
    );

    if (vehiculoIndex === -1) {
      return { 
        success: false, 
        message: 'No se encontró un vehículo con esta placa en el parqueadero' 
      };
    }

    const vehiculo = vehiculosActivos[vehiculoIndex];

    // Crear registro de salida
    const vehiculoSalida = {
      ...vehiculo,
      horaSalida: getCurrentDateTime(),
      estado: 'retirado'
    };

    // Mover al historial
    setHistorialVehiculos(prev => [vehiculoSalida, ...prev]);

    // Remover de vehículos activos
    setVehiculosActivos(prev => 
      prev.filter((_, index) => index !== vehiculoIndex)
    );

    return { 
      success: true, 
      message: 'Vehículo retirado exitosamente',
      vehiculo: vehiculoSalida
    };
  };

  // Buscar vehículo por placa
  const buscarVehiculo = (placa) => {
    return vehiculosActivos.find(
      v => v.placa.toLowerCase() === placa.toLowerCase()
    );
  };

  // Obtener vehículos del día
  const getVehiculosHoy = () => {
    const hoy = getCurrentDate();
    return vehiculosActivos.filter(v => v.fechaIngreso === hoy);
  };

  // Obtener estadísticas
  const getEstadisticas = () => {
    const vehiculosHoy = getVehiculosHoy();
    const totalActivos = vehiculosActivos.length;
    const totalHoy = vehiculosHoy.length;
    const totalHistorial = historialVehiculos.length;
    
    const carrosActivos = vehiculosActivos.filter(v => v.tipoVehiculo === 'carro').length;
    const motosActivas = vehiculosActivos.filter(v => v.tipoVehiculo === 'moto').length;

    const ingresosHoy = vehiculosHoy.reduce((total, v) => 
      total + Number(v.valorMatricula || 0), 0
    );

    return {
      totalActivos,
      totalHoy,
      totalHistorial,
      carrosActivos,
      motosActivas,
      ingresosHoy
    };
  };

  // Limpiar todos los datos
  const limpiarDatos = () => {
    setVehiculosActivos([]);
    setHistorialVehiculos([]);
  };

  return {
    // Estados
    vehiculosActivos,
    historialVehiculos,
    
    // Métodos principales
    ingresarVehiculo,
    sacarVehiculo,
    buscarVehiculo,
    
    // Métodos auxiliares
    getVehiculosHoy,
    getEstadisticas,
    limpiarDatos,
    vehiculoExiste
  };
};

export default useParkingData;
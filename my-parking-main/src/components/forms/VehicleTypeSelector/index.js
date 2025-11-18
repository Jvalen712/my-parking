// Este archivo permite importar el componente de manera más limpia
// En lugar de: import vehicle_typeSelector from './components/forms/vehicle_typeSelector/vehicle_typeSelector'
// Podemos usar: import vehicle_typeSelector from './components/forms/vehicle_typeSelector'

export { default } from './vehicle_typeSelector';

// Si en el futuro agregamos más selectores especializados,
// podemos exportarlos desde aquí también:
// export { default as VehicleBrandSelector } from './VehicleBrandSelector';
// export { default as VehicleColorSelector } from './VehicleColorSelector';
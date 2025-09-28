// Este archivo permite importar el componente de manera más limpia
// En lugar de: import VehicleTypeSelector from './components/forms/VehicleTypeSelector/VehicleTypeSelector'
// Podemos usar: import VehicleTypeSelector from './components/forms/VehicleTypeSelector'

export { default } from './VehicleTypeSelector';

// Si en el futuro agregamos más selectores especializados,
// podemos exportarlos desde aquí también:
// export { default as VehicleBrandSelector } from './VehicleBrandSelector';
// export { default as VehicleColorSelector } from './VehicleColorSelector';
// Este archivo permite importar el componente de manera más limpia
// En lugar de: import VehicleForm from './components/forms/VehicleForm/VehicleForm'
// Podemos usar: import VehicleForm from './components/forms/VehicleForm'

export { default } from './VehicleForm';

// Si en el futuro agregamos más formularios relacionados,
// podemos exportarlos desde aquí también:
// export { default as VehicleEditForm } from './VehicleEditForm';
// export { default as VehicleSearchForm } from './VehicleSearchForm';
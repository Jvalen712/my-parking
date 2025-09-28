// Este archivo permite importar el componente de manera más limpia
// En lugar de: import VehicleTable from './components/tables/VehicleTable/VehicleTable'
// Podemos usar: import VehicleTable from './components/tables/VehicleTable'

export { default } from './VehicleTable';

// Si en el futuro agregamos más componentes de tablas,
// podemos exportarlos desde aquí también:
// export { default as VehicleTableCompact } from './VehicleTableCompact';
// export { default as VehicleTableExpandable } from './VehicleTableExpandable';
// Este archivo permite importar el componente de manera más limpia
// En lugar de: import StatCard from './components/stats/StatCard/StatCard'
// Podemos usar: import StatCard from './components/stats/StatCard'

export { default } from './StatCard';

// Si en el futuro agregamos más componentes de estadísticas,
// podemos exportarlos desde aquí también:
// export { default as StatGrid } from './StatGrid';
// export { default as MiniStatCard } from './MiniStatCard';
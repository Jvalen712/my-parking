// Este archivo permite importar el componente de manera más limpia
// En lugar de: import SummarySection from './components/stats/SummarySection/SummarySection'
// Podemos usar: import SummarySection from './components/stats/SummarySection'

export { default } from './SummarySection';

// Si en el futuro agregamos más componentes de resumen,
// podemos exportarlos desde aquí también:
// export { default as WeeklySummary } from './WeeklySummary';
// export { default as MonthlySummary } from './MonthlySummary';
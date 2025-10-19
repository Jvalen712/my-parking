// Este archivo permite importar el componente de manera más limpia
// En lugar de: import StatusBadge from './components/common/StatusBadge/StatusBadge'
// Podemos usar: import StatusBadge from './components/common/StatusBadge'

export { default } from './StatusBadge';

// Si en el futuro agregamos más componentes relacionados con badges,
// podemos exportarlos desde aquí también:
// export { default as Badge } from './Badge';
// export { default as IconBadge } from './IconBadge';
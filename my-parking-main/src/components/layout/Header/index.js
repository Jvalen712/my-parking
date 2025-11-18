// Este archivo permite importar el componente de manera más limpia
// En lugar de: import Header from './components/layout/Header/Header'
// Podemos usar: import Header from './components/layout/Header'

export { default } from './Header';

// Si en el futuro agregamos más componentes de header,
// podemos exportarlos desde aquí también:
// export { default as HeaderMinimal } from './HeaderMinimal';
// export { default as HeaderWithNavigation } from './HeaderWithNavigation';
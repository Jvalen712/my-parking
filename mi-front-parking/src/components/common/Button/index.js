// Este archivo permite importar el componente de manera más limpia
// En lugar de: import Button from './components/common/Button/Button'
// Podemos usar: import Button from './components/common/Button'

export { default } from './Button';

// Si en el futuro agregamos más componentes relacionados con botones,
// podemos exportarlos desde aquí también:
// export { default as IconButton } from './IconButton';
// export { default as ButtonGroup } from './ButtonGroup';
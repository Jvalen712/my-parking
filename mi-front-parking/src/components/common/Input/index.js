// Este archivo permite importar el componente de manera más limpia
// En lugar de: import Input from './components/common/Input/Input'
// Podemos usar: import Input from './components/common/Input'

export { default } from './Input';

// Si en el futuro agregamos más componentes relacionados con inputs,
// podemos exportarlos desde aquí también:
// export { default as TextArea } from './TextArea';
// export { default as Select } from './Select';
// export { default as InputGroup } from './InputGroup';
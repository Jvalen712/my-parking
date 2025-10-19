// Este archivo permite importar el componente de manera más limpia
// En lugar de: import Sidebar from './components/layout/Sidebar/Sidebar'
// Podemos usar: import Sidebar from './components/layout/Sidebar'

export { default } from './Sidebar';

// Si en el futuro agregamos más componentes de sidebar,
// podemos exportarlos desde aquí también:
// export { default as SidebarNav } from './SidebarNav';
// export { default as SidebarMenu } from './SidebarMenu';
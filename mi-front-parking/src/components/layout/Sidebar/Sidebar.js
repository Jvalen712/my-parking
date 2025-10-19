import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar = ({
  children,
  position = 'left',
  sticky = true,
  collapsible = false,
  isCollapsed = false,
  onToggleCollapse,
  className = '',
  ...props
}) => {
  return (
    <aside
      className={`
        ${styles.sidebar} 
        ${sticky ? styles.sidebarSticky : ''} 
        ${position === 'right' ? styles.sidebarRight : styles.sidebarLeft}
        ${collapsible && isCollapsed ? styles.sidebarCollapsed : ''}
        ${className}
      `.trim()}
      {...props}
    >
      {/* Botón de colapso (opcional) */}
      {collapsible && (
        <button
          className={styles.collapseButton}
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
        >
          <span className={styles.collapseIcon}>
            {isCollapsed ? '→' : '←'}
          </span>
        </button>
      )}

      {/* Contenido del sidebar */}
      <div className={styles.sidebarContent}>
        {children}
      </div>
    </aside>
  );
};

export default Sidebar;
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
// Importa la imagen
import backgroundImage from '../Image/parqueadero.jpg';

function Login() {
  const [formData, setFormData] = useState({
    text: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Lógica de autenticación simple
    if (formData.text && formData.password) {
      setIsAuthenticated(true);
    }
  };

  // Estilos para el contenedor principal con background
  const containerStyle = {
    minHeight: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  // Estilos para el formulario con overlay semi-transparente
  const formContainerStyle = {
    maxWidth: '400px',
    padding: '30px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fondo blanco semi-transparente
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)' // Efecto de desenfoque
  };

  if (isAuthenticated) {
    return (
      <div style={containerStyle}>
        <div style={formContainerStyle}>
          <div style={{ textAlign: 'center' }}>
            <h2>Welcome mr.Juan Varco</h2>
            <button 
              onClick={() => setIsAuthenticated(false)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Sistema de Parqueadero</h1>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label>User:</label>
            <input
              type="text"
              name="text"
              value={formData.text}
              onChange={handleChange}
              required
              style={{ 
                width: '100%', 
                padding: '10px', 
                marginTop: '5px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Password:</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  marginTop: '5px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                  paddingRight: '40px'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ 
                  position: 'absolute', 
                  right: '10px', 
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            style={{ 
              width: '100%', 
              padding: '12px', 
              backgroundColor: '#007bff', 
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Start
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
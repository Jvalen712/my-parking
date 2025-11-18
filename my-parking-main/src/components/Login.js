import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import backgroundImage from '../Image/parqueadero.jpg';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // 🔹 Manejo de cambios en inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  // 🔹 Manejo de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("✅ Botón presionado");

    if (!formData.username || !formData.password) {
      setError('Por favor complete todos los campos');
      return;
    }

    try {
      const result = await onLogin(formData.username, formData.password);
      console.log("Respuesta del backend:", result);

      if (result && result.token) {
        window.location.href = '/dashboard';
      } else {
        setError('Credenciales inválidas');
      }
    } catch (err) {
      console.error('Error completo:', err);
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  // 🔹 Estilos en objetos para mantener limpio el JSX
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

  const formContainerStyle = {
    maxWidth: '400px',
    padding: '30px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#000000ff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Sistema de Parqueadero</h1>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>

        <form onSubmit={handleSubmit}>
          {/* Usuario */}
          <div style={{ marginBottom: '15px' }}>
            <label>Usuario:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* Contraseña */}
          <div style={{ marginBottom: '15px' }}>
            <label>Contraseña:</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{ ...inputStyle, paddingRight: '40px' }}
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

          {/* Error */}
          {error && (
            <div style={{
              padding: '10px',
              marginBottom: '15px',
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              borderRadius: '4px',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          {/* Botón */}
          <button type="submit" style={buttonStyle}>
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

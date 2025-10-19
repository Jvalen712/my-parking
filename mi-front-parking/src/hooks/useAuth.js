javascript// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { authAPI } from '../services/parqueaderoAPI';

export const useAuth = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Verificar si hay token guardado al cargar la app
    const tokenGuardado = localStorage.getItem('authToken');
    if (tokenGuardado) {
      verificarToken(tokenGuardado);
    } else {
      setLoading(false);
    }
  }, []);

  const verificarToken = async (token) => {
    try {
      const usuario = await authAPI.verificarToken(token);
      setUsuario(usuario);
      setToken(token);
    } catch (error) {
      localStorage.removeItem('authToken');
      setToken(null);
      setUsuario(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const respuesta = await authAPI.login(email, password);
      const { access_token, user } = respuesta; // Ajusta según tu API
      
      localStorage.setItem('authToken', access_token);
      setToken(access_token);
      setUsuario(user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUsuario(null);
  };

  return {
    usuario,
    token,
    loading,
    login,
    logout,
    estaLogueado: !!usuario
  };
};

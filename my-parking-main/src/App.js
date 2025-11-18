import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import ParkingDashboard from './pages/ParkingDashboard';
import { login as loginService, getUser, getToken } from './services/authService';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Persistencia de sesión
  useEffect(() => {
    const token = getToken();
    const userData = getUser();
    if (token && userData) {
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

const handleLogin = async (username, password) => {
  try {
    const result = await loginService(username, password);
    if (result && result.token) {
      setUser(result.user);
      setIsAuthenticated(true);
      return result;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error de login:", error.message);
    return null;
  }
};
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <ParkingDashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;

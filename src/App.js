import React, { useState } from 'react';
import Login from './components/Login';
import ParkingDashboard from './pages/ParkingDashboard';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Handle login
  const handleLogin = (credentials) => {
    // Aquí puedes agregar validación de usuarios específicos
    // Por ejemplo:
    // if (credentials.username === 'admin' && credentials.password === '1234') {
    
    // Por ahora acepta cualquier usuario y contraseña
    if (credentials.username && credentials.password) {
      setUser({ 
        username: credentials.username 
      });
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
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
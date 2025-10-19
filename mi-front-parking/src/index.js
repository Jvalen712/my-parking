import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ParkingDashboard from './pages/ParkingDashboard';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ParkingDashboard />
  </React.StrictMode>
);

reportWebVitals();

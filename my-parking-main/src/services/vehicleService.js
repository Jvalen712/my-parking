const BASE_URL = "http://127.0.0.1:8000/api/v1/vehicles";

// 🛠️ Manejo robusto de errores y respuestas
const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data?.detail || data?.message || "Error en la petición";
      return { success: false, message: errorMessage };
    }

    return { success: true, ...data };
  } catch (error) {
    console.error("❌ API Error:", error);
    return { success: false, message: error.message };
  }
};

// 🚗 Registrar entrada
export const registerVehicleEntry = async (formData) => {
  const plate = formData.license_plate?.trim().toUpperCase();

  const payload = {
    vehicle_type: formData.vehicle_type, // 👈 siempre "carro" o "moto"
    owner_name: formData.owner_name || null,
    phone: formData.phone || null
    // registration_value y status los calcula el backend
  };

  console.log("📡 Enviando al backend:", plate, payload);

  return apiRequest(`${BASE_URL}/entry/${plate}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

// 🚙 Registrar salida
export const registerVehicleExit = async (plate) =>
  apiRequest(`${BASE_URL}/exit/${plate}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" }
  });

// 🚦 Listar vehículos activos
export const getActiveVehicles = async () => apiRequest(`${BASE_URL}/active`);

// 📅 Listar vehículos de hoy
export const getTodayVehicles = async () => apiRequest(`${BASE_URL}/today`);

// 📜 Historial de vehículos
export const getVehicleHistory = async () => apiRequest(`${BASE_URL}/history`);

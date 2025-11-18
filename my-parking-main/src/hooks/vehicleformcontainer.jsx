const API_URL = "http://127.0.0.1:8000/api/v1/vehicles";


// 🚗 Obtener vehículos activos
export async function getActiveVehicles() {
  try {
    const response = await fetch(`${API_URL}/active`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Error al obtener vehículos activos");
    }
    return await response.json();
  } catch (err) {
    throw new Error("No se pudo conectar con el servidor");
  }
}

// 🚗 Registrar ingreso de vehículo
export async function registerEntry(plate, vehicle_type, ownerName, phone) {
  try {
    const response = await fetch(`${API_URL}/entry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        license_plate: plate,
        vehicle_type: vehicle_type,
        owner_name: ownerName,
        phone: phone
      }),
    });

    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      if (contentType && contentType.includes("application/json")) {
        const error = await response.json();
        throw new Error(error.detail || "Error al registrar vehículo");
      } else {
        throw new Error("Error inesperado del servidor");
      }
    }

    return await response.json();
  } catch (err) {
    throw new Error("No se pudo registrar el vehículo");
  }
}

// 🚪 Registrar salida de vehículo
export async function registerExit(plate) {
  try {
    const response = await fetch(`${API_URL}/exit/${plate}`, {
      method: "PUT",
    });

    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      if (contentType && contentType.includes("application/json")) {
        const error = await response.json();
        throw new Error(error.detail || "Error al registrar salida");
      } else {
        throw new Error("Error inesperado del servidor");
      }
    }

    return await response.json();
  } catch (err) {
    throw new Error("No se pudo registrar la salida");
  }
}

import { getToken } from "./authService";

const API_URL = "http://127.0.0.1:8000/invoices/invoices"; 

// 🔐 Encabezados con token de autenticación
function getHeaders() {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

/**
 * 🧾 Crear una nueva factura
 * Endpoint: POST /invoices/create
 * @param {Object} data - Datos de la factura:
 *   - vehicle_id: ID del vehículo
 *   - user_id: ID del usuario
 *   - total_amount: Valor total
 *   - parking_time: Tiempo de parqueo (en minutos, horas, etc.)
 * @returns {Object} - Factura generada
 */
export async function createInvoice(data) {
  const response = await fetch(`${API_URL}/create`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    console.error("Error al crear factura:", response.statusText);
    throw new Error("Error al crear factura");
  }

  return await response.json();
}

/**
 * 📚 Obtener todas las facturas registradas
 * Endpoint: GET /invoices/
 * @returns {Array} - Lista completa de facturas
 */
export async function getAllInvoices() {
  const response = await fetch(`${API_URL}/`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    console.error("Error al obtener facturas:", response.statusText);
    throw new Error("Error al obtener facturas");
  }

  return await response.json();
}

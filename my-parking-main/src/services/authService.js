const API_URL = "http://127.0.0.1:8000/api/v1/auth/auth/login";

export async function login(username, password) {
  try {
    console.log("Enviando credenciales:", username, password);

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: username,   // 👈 aseguramos que coincidan con OAuth2PasswordRequestForm
        password: password,
      }),
    });

    if (!response.ok) {
      let errorMessage = "Error al iniciar sesión";
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorMessage;
      } catch (_) {}
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log("Datos recibidos del backend:", data);

    // Adaptamos la respuesta al frontend
    const result = {
      token: data.access_token,
      user: data.user_info,
    };

    // Guardamos en localStorage
    localStorage.setItem("token", result.token);
    localStorage.setItem("user", JSON.stringify(result.user));

    return result;
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
}

// 🔹 Funciones auxiliares exportadas
export function getToken() {
  return localStorage.getItem("token");
}

export function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

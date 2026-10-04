const API = "https://hemolink-backend-qzon.onrender.com";

async function request(method, path, body, useAuth = false) {
  const headers = { "Content-Type": "application/json" };
  if (useAuth) {
    const token = localStorage.getItem("token");
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${API}${path}`, {
    method,
    headers,
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}

export const registerUser = (name, email, password) =>
  request("POST", "/api/auth/register", { name, email, password });

export const loginUser = (email, password) =>
  request("POST", "/api/auth/login", { email, password });

export const setRole = (role) =>
  request("PUT", "/api/auth/role", { role }, true);
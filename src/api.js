const API = "https://hemolink-backend-qzon.onrender.com";

async function post(path, body) {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}

export const registerUser = (name, email, password) =>
  post("/api/auth/register", { name, email, password });

export const loginUser = (email, password) =>
  post("/api/auth/login", { email, password });
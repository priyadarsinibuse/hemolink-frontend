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
    body: body === undefined ? undefined : JSON.stringify(body),
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

export const saveDonorProfile = (data) =>
  request("PUT", "/api/auth/donor-profile", data, true);

export const getMe = () => request("GET", "/api/auth/me", undefined, true);
export const createRequest = (data) => request("POST", "/api/requests", data, true);

export const getMyRequests = () => request("GET", "/api/requests/mine", undefined, true);

export const getRequests = () => request("GET", "/api/requests", undefined, true);
export const getDonorRequests = () =>
  request("GET", "/api/requests/donor", undefined, true);

export const respondToRequest = (id, decision) =>
  request("PUT", `/api/requests/${id}/respond`, { decision }, true);
export const searchDonors = (bloodGroup, city) =>
  request(
    "GET",
    "/api/donors?bloodGroup=" + encodeURIComponent(bloodGroup || "") + "&city=" + encodeURIComponent(city || ""),
    undefined,
    true
  );
     export const saveReceiverProfile = (data) =>
     request("PUT", "/api/auth/receiver-profile", data, true);
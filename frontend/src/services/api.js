const API_BASE_URL = "http://localhost:4000";

export async function fetchData(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || `Erro HTTP: ${response.status}`);
  }

  return data;
}

export async function loginUser(email, password) {
  return fetchData("/auth", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function getCharacters() {
  return fetchData("/persons");
}

export async function getPlanets() {
  return fetchData("/planets");
}

export async function getSpecies() {
  return fetchData("/species");
}

export async function getFilms() {
  return fetchData("/films");
}

export async function getVehicles() {
  return fetchData("/vehicles");
}

export async function getStarships() {
  return fetchData("/starships");
}
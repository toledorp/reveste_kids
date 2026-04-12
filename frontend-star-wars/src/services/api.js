const API_BASE_URL = "http://localhost:4000";

export async function fetchData(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
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
  const token = localStorage.getItem("token");

  return fetchData("/persons", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getPlanets() {
  const token = localStorage.getItem("token");

  return fetchData("/planets", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getSpecies() {
  const token = localStorage.getItem("token");

  return fetchData("/species", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getFilms() {
  const token = localStorage.getItem("token");

  return fetchData("/films", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}


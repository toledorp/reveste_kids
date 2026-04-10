const API_BASE_URL = "http://localhost:4000";

export async function fetchData(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Erro HTTP: ${response.status}`);
  }

  return response.json();
}

export async function loginUser(email, password) {
  return fetchData("/auth", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
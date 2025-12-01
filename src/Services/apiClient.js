// src/Services/apiClient.js  (یا هر مسیری که واقعاً داری)

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:31000/api";

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;

  const headers = options.headers || {};
  if (options.token) {
    headers["Authorization"] = `Bearer ${options.token}`;
  }
  if (options.body && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(url, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText || "Request failed");
  }

  return res.json();
}

export function apiGet(path, token) {
  return request(path, { method: "GET", token });
}

export function apiPut(path, body, token) {
  return request(path, { method: "PUT", body, token });
}

export function apiPost(path, body, token) {
  return request(path, { method: "POST", body, token });
}

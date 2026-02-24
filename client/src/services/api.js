
// src/services/apiClient.js

const request = async (url, options = {}) => {
  try {
    const response = await fetch(`${url}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });

    const data = await response.json();


    if (!response.ok) throw new Error(data.message || 'Error en la comunicación con el servidor');

    return { data, error: null }; 


  } catch (err) {
    console.error("API Error:", err.message);
    return { data: null, error: err.message };
  }
};


export const api = {
  get: (url) => request(url, { method: 'GET' }),
  post: (url, body) => request(url, { method: 'POST', body: JSON.stringify(body) }),
  delete: (url) => request(url, { method: 'DELETE' }),
};
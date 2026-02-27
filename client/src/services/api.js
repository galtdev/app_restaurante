const request = async (url, options = {}) => {
  try {
  
    const isFormData = options.body instanceof FormData;

    const fetchOptions = {
      ...options,
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...options.headers,
      },
    };

    const response = await fetch(url, fetchOptions);
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Error en la comunicación');

    return { data, error: null };
  } catch (err) {
    console.error("API Error:", err.message);
    return { data: null, error: err.message };
  }
};

export const api = {
  get: (url) => request(url, { method: 'GET' }),
  
  
  post: (url, body) => {
    const finalBody = body instanceof FormData ? body : JSON.stringify(body);
    return request(url, { method: 'POST', body: finalBody });
  },
  
  delete: (url) => request(url, { method: 'DELETE' }),
};
const BASE = 'http://localhost:3000/api';

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string | null
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  auth: {
    register: (body: object) =>
      request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
    login: (body: object) =>
      request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  },
  products: {
    list: (search?: string) =>
      request(`/products${search ? `?search=${encodeURIComponent(search)}` : ''}`),
    get: (id: number) => request(`/products/${id}`),
  },
  orders: {
    create: (body: object, token: string) =>
      request('/orders', { method: 'POST', body: JSON.stringify(body) }, token),
    list: (token: string) => request('/orders', {}, token),
    get: (id: number, token: string) => request(`/orders/${id}`, {}, token),
  },
};

// Utilitários para requisições à API

const API_URL = process.env.NEXT_PUBLIC_VARIAVEL_API_URL || 'http://localhost:3001';

/**
 * Obtém o token JWT do localStorage
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('anacli-token');
}

/**
 * Cria headers autenticados para requisições
 */
export function getAuthHeaders(): HeadersInit {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
}

/**
 * Faz uma requisição autenticada à API
 */
export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const url = `${API_URL}${endpoint}`;
  const headers = getAuthHeaders();
  
  return fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });
}

/**
 * Faz uma requisição GET autenticada
 */
export async function apiGet<T>(endpoint: string): Promise<T> {
  const response = await fetchWithAuth(endpoint, { method: 'GET' });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  return response.json();
}

/**
 * Faz uma requisição POST autenticada
 */
export async function apiPost<T>(endpoint: string, data: any): Promise<T> {
  const response = await fetchWithAuth(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  return response.json();
}

/**
 * Faz uma requisição PUT autenticada
 */
export async function apiPut<T>(endpoint: string, data: any): Promise<T> {
  const response = await fetchWithAuth(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  return response.json();
}

/**
 * Faz uma requisição DELETE autenticada
 */
export async function apiDelete<T>(endpoint: string): Promise<T> {
  const response = await fetchWithAuth(endpoint, { method: 'DELETE' });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  return response.json();
}

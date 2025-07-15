// src/utils/api.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

// Create axios instance with base configuration
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com',
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getAuthToken(); // Implement your token getter
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          handleUnauthorized();
          break;
        case 403:
          handleForbidden();
          break;
        case 429:
          handleRateLimit();
          break;
        default:
          console.error('API Error:', error.message);
      }
    }
    return Promise.reject(error);
  }
);

// Helper function to get auth token
function getAuthToken(): string | null {
  // Check for token in cookies/localStorage
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken') || null;
  }
  return null;
}

// Error handlers
function handleUnauthorized() {
  // Redirect to login or refresh token
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
}

function handleForbidden() {
  console.error('Access forbidden');
  // Implement your forbidden logic
}

function handleRateLimit() {
  console.error('Rate limit exceeded');
  // Implement retry logic or show user message
}

// API methods
export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await api.get<T>(url, config);
  return response.data;
};

export const post = async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
  const response = await api.post<T>(url, data, config);
  return response.data;
};

export const put = async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
  const response = await api.put<T>(url, data, config);
  return response.data;
};

export const del = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await api.delete<T>(url, config);
  return response.data;
};

export default api;
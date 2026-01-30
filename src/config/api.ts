/**
 * API Configuration for SigAuth Backend
 * 
 * Set the VITE_API_URL environment variable to your backend URL.
 * For Colab with ngrok: Copy the ngrok URL and set it in .env.local
 * 
 * Example .env.local:
 * VITE_API_URL=https://xxxx-xx-xx-xxx-xxx.ngrok.io
 */

// Default to localhost for development, can be overridden with env variable
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  HEALTH: `${API_BASE_URL}/health`,
  VERIFY: `${API_BASE_URL}/verify`,
};

// Check if backend is configured
export const isBackendConfigured = (): boolean => {
  return !!import.meta.env.VITE_API_URL;
};

// Check backend health
export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(API_ENDPOINTS.HEALTH, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.ok;
  } catch {
    return false;
  }
};

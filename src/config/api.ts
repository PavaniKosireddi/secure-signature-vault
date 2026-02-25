/**
 * API Configuration for SigAuth Backend
 * 
 * Set the VITE_API_URL environment variable to your backend URL.
 * For Colab with ngrok: Copy the ngrok URL and set it in .env.local
 * 
 * Example .env.local:
 * VITE_API_URL=https://xxxx-xx-xx-xxx-xxx.ngrok.io
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  HEALTH: `${API_BASE_URL}/health`,
  VERIFY: `${API_BASE_URL}/verify`,
  PERSONS: `${API_BASE_URL}/persons`,
  AUTH_LOGIN: `${API_BASE_URL}/auth/login`,
  AUTH_SIGNUP: `${API_BASE_URL}/auth/signup`,
  AUTH_PROFILE: `${API_BASE_URL}/auth/profile`,
  ADMIN_LOGS: `${API_BASE_URL}/admin/logs`,
  ADMIN_SIGNATURES: `${API_BASE_URL}/admin/signatures`,
  ADMIN_SIGNATURES_ADD: `${API_BASE_URL}/admin/signatures/add`,
};

export const isBackendConfigured = (): boolean => {
  return !!import.meta.env.VITE_API_URL;
};

export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(API_ENDPOINTS.HEALTH, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
    });
    return response.ok;
  } catch {
    return false;
  }
};

import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed in the future
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle common errors
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    
    // Log error for debugging
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: message
    });

    return Promise.reject({
      message,
      status: error.response?.status,
      errors: error.response?.data?.errors
    });
  }
);

// API endpoints
export const memberAPI = {
  // Join the club
  join: (memberData: any) => api.post('/members/join', memberData),
  
  // Check if email exists
  checkEmail: (email: string) => api.get(`/members/check-email/${email}`),
  
  // Get member statistics
  getStats: () => api.get('/members/stats'),
};

export const newsletterAPI = {
  // Subscribe to newsletter
  subscribe: (data: { email: string; name?: string; source?: string }) => 
    api.post('/newsletter/subscribe', data),
  
  // Unsubscribe from newsletter
  unsubscribe: (email: string) => api.post('/newsletter/unsubscribe', { email }),
  
  // Get newsletter statistics
  getStats: () => api.get('/newsletter/stats'),
};

export const contactAPI = {
  // Submit contact form
  submit: (contactData: any) => api.post('/contact', contactData),
  
  // Get contact statistics
  getStats: () => api.get('/contact/stats'),
};

export const eventAPI = {
  // Get all events
  getAll: (params?: { type?: string; limit?: number; page?: number }) => 
    api.get('/events', { params }),
  
  // Get single event
  getById: (id: string) => api.get(`/events/${id}`),
  
  // Register for event
  register: (eventId: string, data: { name: string; email: string }) => 
    api.post(`/events/${eventId}/register`, data),
  
  // Get event statistics
  getStats: () => api.get('/events/stats/overview'),
};

// Utility functions
export const handleApiError = (error: any) => {
  if (error.errors && Array.isArray(error.errors)) {
    return error.errors.map((err: any) => err.msg).join(', ');
  }
  return error.message || 'An unexpected error occurred';
};

export const isEmailValid = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default api;
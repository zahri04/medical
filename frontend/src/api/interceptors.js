import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/";

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const response = await axios.post(`${API_URL}api/token/refresh/`, {
          refresh: localStorage.getItem('refresh_token')
        });
        
        localStorage.setItem('access_token', response.data.access);
        return axios(originalRequest);
      } catch (err) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);
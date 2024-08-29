import axios from 'axios';
import { server } from '../config';

// Crea un'istanza di Axios con configurazione predefinita
const axiosUserApi = axios.create({
  baseURL: server.baseUrl,
});

//Add token to every request
axiosUserApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

export default axiosUserApi;

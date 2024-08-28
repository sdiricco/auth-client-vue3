import axios from 'axios';
import { server } from '../config';

// Crea un'istanza di Axios con configurazione predefinita
const axiosInstance = axios.create({
  baseURL: server.baseUrl,
  auth: {
    username: server.auth.username,
    password: server.auth.password
  }
});

export default axiosInstance;

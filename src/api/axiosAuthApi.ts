import axios from 'axios';
import { server } from '../config';

// Crea un'istanza di Axios con configurazione predefinita
const axiosAuthApi = axios.create({
  baseURL: server.baseUrl,
});

export default axiosAuthApi;

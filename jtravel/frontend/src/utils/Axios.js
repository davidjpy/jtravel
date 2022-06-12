import axios from 'axios';

const baseURL = 'http://localhost:8000/';

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});

export default axiosInstance;

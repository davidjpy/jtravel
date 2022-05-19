import axios from 'axios';

const baseURL = 'http://localhost:8000/';

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem('access_token')
        ? 'JWT ' + localStorage.getItem('access_token')
        : null,
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

export const axiosPrivate = axios.create({
  baseURL: baseURL,
  headers: { 'Content-Tpye': 'application/json' },
    withCredentials: true
});

export default axiosInstance




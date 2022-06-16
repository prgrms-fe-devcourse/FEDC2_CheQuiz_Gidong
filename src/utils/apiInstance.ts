import axios, { AxiosInstance } from 'axios';
import { API_ENDPOINT } from '@/utils/apiBaseUrl';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_ENDPOINT, // baseURL 미리세팅
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => Promise.reject(error),
);

export default axiosInstance;

import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.API_ENDPOINT, // baseURL 미리세팅
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

export default axiosInstance;

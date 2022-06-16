import axios, { AxiosInstance } from 'axios';

const host = process.env.REACT_APP_API_HOST ?? 'localhost';
const port = process.env.REACT_APP_API_PORT ?? 3000;

const API_ENDPOINT = `${host}:${port}`;

const apiInstance: AxiosInstance = axios.create({
  baseURL: API_ENDPOINT, // baseURL 미리세팅
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiInstance.interceptors.response.use(
  (response) => Promise.resolve(response),
  (err) => Promise.reject(err.response),
);

export default apiInstance;

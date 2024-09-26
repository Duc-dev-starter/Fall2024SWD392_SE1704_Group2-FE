import axios from "axios";
import config from "@/secret";

export const axiosInstance = axios.create({
    baseURL: config.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 300000,
    timeoutErrorMessage: `Connection is timeout exceeded`
})

axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

axiosInstance.interceptors.response.use((response) => {
  console.log(response);
  if (response.status === 200 || response.status === 201) {
    return response.data;
  }
  return response.data;
}, (error) => {
    if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login'; 
      }
      return Promise.reject(error);
})
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,  // Set the base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

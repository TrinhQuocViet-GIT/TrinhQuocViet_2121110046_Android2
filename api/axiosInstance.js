import axios from 'axios';
import AppUrl from './AppUrl';

const axiosInstance = axios.create({
  baseURL: AppUrl.BaseURL,
  timeout: 5000, // Timeout after 5 seconds
  headers: {
    Authorization: `Bearer ${AppUrl.token}`,
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
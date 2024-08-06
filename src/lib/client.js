import axios from "axios";

const BASE_URL = "http://13.124.253.134:8080";

const client = axios.create({
  baseURL: BASE_URL,
});

client.interceptors.request.use(
  async (config) => {
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

export default client;

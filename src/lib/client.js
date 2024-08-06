import axios from "axios";

const BASE_URL = "http://13.124.253.134:8080";

const client = axios.create({
  baseURL: BASE_URL,
});

export default client;

import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8000/.netlify/functions/api",
  timeout: 10000,
});

const api = {
  post: {
    signIn: (body) => http.post("/auth/pro/signin", body),
  },
  get: {},
};

export default api;

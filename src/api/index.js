import axios from "axios";

const http = axios.create({
  baseURL: "https://tell-lk.netlify.app/.netlify/functions/api",
  timeout: 10000,
});

// Request interceptor to add the auth token header to requests
http.interceptors.request.use(
  (config) => {
    const signToken = localStorage.getItem("signToken");
    if (signToken) {
      config.headers["Authorization"] = `Bearer ${signToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to refresh token on token expired error
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalReq = error.config;
    const refToken = localStorage.getItem("refToken");

    if (refToken && error.response.status === 401 && !originalReq._retry) {
      originalReq._retry = true;
      const res = await http.post("/auth/refresh", {
        refreshToken: refToken,
      });
      if (res.status === 200) {
        localStorage.setItem("signToken", res.data.result.signToken);
        localStorage.setItem("refToken", res.data.result.refToken);
        return http(originalReq);
      }
    }
    return Promise.reject(error);
  }
);

const api = {
  post: {
    signIn: (body) => http.post("/auth/pro/signin", body),
    newAuthorityAccount: (body) => http.post("/auth/pro/new", body),
  },
  get: {
    allComplaints: () => http.get(`/complaints/get/all/admin`),
    complaintsByFilter: (status, category, authority, date) =>
      http.get(
        `/complaints/get/admin?stat=${status}&cat=${category}&auth=${authority}&date=${date}`
      ),
    complaintById: (complaintId) =>
      http.get(`/complaints/get/one/${complaintId}`),
    complaintByCategory: (categoryId) =>
      http.get(`/complaints/get/cat/${categoryId}`),
    profile: (userId) => http.get(`/profile/pro/${userId}`),
    filterData: () => http.get("/complaints/meta"),
    report: () => http.get("/complaints/report"),
  },
  patch: {
    complaintStatusAsDone: (body) =>
      http.patch("/complaints/update/status", body),
  },
  delete: {
    complaintById: (complaintId) =>
      http.delete(`/complaints/rm/${complaintId}`),
  },
};

export default api;

import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:9000/.netlify/functions/api",
  timeout: 10000,
});

// Request interceptor to add the auth token header to requests
http.interceptors.request.use(
  (config) => {
    const signToken = localStorage.getItem("signToken");
    if (signToken) {
      // console.log("SignToken at request interceptor:", signToken);
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
    // console.log("Error at response interceptor:", error);
    const originalReq = error.config;
    const refToken = localStorage.getItem("refToken");
    // console.log("refToken at response interceptor:", refToken);

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
    allComplaints: () => http.get("/complaints/get/admin"),
    complaintsByStatus: (status) =>
      http.get(`/complaints/get/admin/status?q=${status}`),
    complaintById: (complaintId) =>
      http.get(`/complaints/get/one/${complaintId}`),
    complaintByCategory: (categoryId) =>
      http.get(`/complaints/get/cat/${categoryId}`),
    profile: (userId) => http.get(`/profile/pro/${userId}`),
  },
  delete: {
    complaintById: (complaintId) =>
      http.delete(`/complaints/rm/${complaintId}`),
  },
};

export default api;

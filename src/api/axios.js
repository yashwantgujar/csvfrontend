import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});


API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    
    if (error.response) {
      const status = error.response.status;
      const message =
        error.response.data?.message || "Something went wrong";

     
      if (status === 401) {
        localStorage.removeItem("token");

      
        window.location.href = "/";
      }

      return Promise.reject(message);
    }

    
    if (error.request) {
      return Promise.reject("Server not responding");
    }

   
    return Promise.reject(error.message);
  }
);

export default API;
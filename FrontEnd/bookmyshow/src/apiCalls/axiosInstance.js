import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8081/api/",
  headers: {
    credentials: "include",
    method: "post",
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default axiosInstance;

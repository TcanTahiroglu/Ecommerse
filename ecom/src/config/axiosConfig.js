import axios from "axios";

// Axios instance oluşturuyoruz
const axiosInstance = axios.create({
  baseURL: "http://localhost:5174", // Backend API URL
});

// Eğer localStorage'da token varsa, axios header'ına ekliyoruz
const token = localStorage.getItem("token");

if (token) {
  axiosInstance.defaults.headers["Authorization"] = token;
}

export default axiosInstance;

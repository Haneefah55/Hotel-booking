import axios from 'axios'

 
const apiUrl= import.meta.env.MODE === "development" ? "http://localhost:5500/api" : "/api"

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
  timeout: 120000,
})


export default axiosInstance
import axios from 'axios'

 
const apiUrl= import.meta.env.VITE_API_URL

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
import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "https://laptopbackend.onrender.com/api"
})
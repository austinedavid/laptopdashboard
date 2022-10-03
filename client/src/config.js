import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "https://laptopdashboard.herokuapp.com/api/"
})
import axios from "axios";
import { Access_Token } from "./constants";


const apiUrl = "/choreo-apis/django-notes/django-notes/v1"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL: apiUrl,
})

api.interceptors.request.use(
    (config) => {
        const token= localStorage.getItem(Access_Token)
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api
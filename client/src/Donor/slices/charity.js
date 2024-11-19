import axios from "axios";

const api =axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": 'application/json',
    },
})

api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem('token')
        if (token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

export const postDonation = (donationData) => api.post('/donations', donationData)
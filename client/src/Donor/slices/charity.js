import axios from "axios";

// Create an axios instance with the hardcoded baseURL
const api = axios.create({
    baseURL: 'https://hosting-33ri.onrender.com/api', // Use the hardcoded baseURL
    headers: {
        "Content-Type": 'application/json',
    },
});

// Set up an interceptor to add the authorization token to requests if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (token) {
            // Attach token to the Authorization header for authenticated requests
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error) // Handle request errors
);

// Define the function to post a donation
export const postDonation = (donationData) => api.post('/donations', donationData);

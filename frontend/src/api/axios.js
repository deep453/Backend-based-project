import axios from "axios";

const api = axios.create({
    baseURL: process.env.NODE_ENV === "production" 
        ? "https://onrender.com" // Make sure this matches your exact backend link
        : "http://localhost:8000/api/v1",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;

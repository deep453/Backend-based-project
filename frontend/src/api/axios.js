import axios from "axios";

const api = axios.create({
    baseURL: process.env.NODE_ENV === "production" 
        ? "https://onrender.com" 
        : "http://localhost:8000/api/v1",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;

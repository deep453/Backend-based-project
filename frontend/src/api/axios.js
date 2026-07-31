import axios from "axios";

// Vite uses import.meta.env.MODE instead of process.env.NODE_ENV
const isProduction = import.meta.env.MODE === "production";

const api = axios.create({
    baseURL: isProduction 
        ? "https://onrender.com" 
        : "http://localhost:8000/api/v1",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;

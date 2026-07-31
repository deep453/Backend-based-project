import axios from "axios";

const api = axios.create({
    // Hardcoded production URL ensures it connects to your specific server instance
    baseURL: "https://skill-nova-1.onrender.com",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;

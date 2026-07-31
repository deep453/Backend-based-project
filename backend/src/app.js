import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// A completely bulletproof array of every domain allowed to touch your backend
const allowedOrigins = [
    "https://deep453.github.io",
    "http://localhost:5173",
    "http://localhost:8000"
];

app.use(cors({
    origin: function (origin, callback) {
        // Allows tools like Postman or simple internal system triggers
        if (!origin) return callback(null, true);
        
        // Checks if the incoming site is in our allowed list
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        } else {
            return callback(new Error("Blocked by Skill_Nova CORS Policy"));
        }
    },
    credentials: true, // Crucial for cookie transmission
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
}));

// Express Configuration Middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Router Imports
import userRouter from "./routes/user.routes.js";
import videoRouter from "./routes/video.routes.js";

// Full-Stack Production Endpoints
app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", videoRouter);

export { app };

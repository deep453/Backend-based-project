import api from "../api/axios";

/**
 * Upload a new video (multipart: videoFile, thumbnail + text fields like title/description)
 */
export const uploadVideo = async (formData) => {
    const response = await api.post("/videos/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

/**
 * Get all published videos
 */
export const getAllVideos = async () => {
    const response = await api.get("/videos");

    return response.data;
};

/**
 * NOTE: your backend's video.routes.js doesn't yet expose a single-video route
 * (e.g. GET /videos/:videoId), nor likes/comments/subscribe endpoints.
 * Once you add a controller + route like:
 *
 *   router.route("/:videoId").get(getVideoById)
 *
 * you can add:
 *
 *   export const getVideoById = async (videoId) => {
 *       const response = await api.get(`/videos/${videoId}`);
 *       return response.data;
 *   };
 *
 * Until then, Watch.jsx finds the video client-side from getAllVideos().
 */

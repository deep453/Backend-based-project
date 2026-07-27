import api from "../api/axios";

/**
 * Register a new user
 */
export const registerUser = async (formData) => {
    const response = await api.post("/users/register", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

/**
 * Login existing user
 */
export const loginUser = async (data) => {
    const response = await api.post("/users/login", data);

    return response.data;
};

/**
 * Logout current user
 */
export const logoutUser = async () => {
    const response = await api.post("/users/logout");

    return response.data;
};

/**
 * Refresh access token using the refresh token cookie
 */
export const refreshAccessToken = async () => {
    const response = await api.post("/users/refresh-token");

    return response.data;
};

/**
 * Get logged-in user's details
 */
export const getCurrentUser = async () => {
    const response = await api.get("/users/current-user");

    return response.data;
};

/**
 * Change current user's password
 */
export const changeCurrentPassword = async (data) => {
    const response = await api.post("/users/change-password", data);

    return response.data;
};

/**
 * Update account details (fullName, email, etc.)
 */
export const updateAccountDetails = async (data) => {
    const response = await api.patch("/users/update-account", data);

    return response.data;
};

/**
 * Update avatar image
 */
export const updateUserAvatar = async (formData) => {
    const response = await api.patch("/users/avatar", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

/**
 * Update cover image
 */
export const updateUserCoverImage = async (formData) => {
    const response = await api.patch("/users/cover-image", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

/**
 * Get a channel's public profile by username
 */
export const getUserChannelProfile = async (username) => {
    const response = await api.get(`/users/c/${username}`);

    return response.data;
};

/**
 * Get logged-in user's watch history
 */
export const getWatchHistory = async () => {
    const response = await api.get("/users/history");

    return response.data;
};

import api from "../api/axios";

export const uploadVideo = async (formData) => {

    const response = await api.post(
        "/videos",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};
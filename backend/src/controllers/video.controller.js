import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const uploadVideo = asyncHandler(async (req, res) => {

    const { title, description } = req.body;

    // Validate input
    if (
        !title?.trim() ||
        !description?.trim()
    ) {
        throw new ApiError(400, "Title and Description are required");
    }

    console.log("Body:", req.body);
    console.log("Files:", req.files);

    // Get uploaded files from multer
    const videoLocalPath = req.files?.videoFile?.[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

    if (!videoLocalPath) {
        throw new ApiError(400, "Video file is required");
    }

    if (!thumbnailLocalPath) {
        throw new ApiError(400, "Thumbnail is required");
    }

    // Upload to Cloudinary
    const uploadedVideo = await uploadOnCloudinary(videoLocalPath);
    const uploadedThumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    if (!uploadedVideo) {
        throw new ApiError(500, "Video upload failed");
    }

    if (!uploadedThumbnail) {
        throw new ApiError(500, "Thumbnail upload failed");
    }

    // Cloudinary returns duration for videos
    const duration = uploadedVideo.duration || 0;

    // Save to MongoDB
    const video = await Video.create({
        videoFile: uploadedVideo.secure_url,
        thumbnail: uploadedThumbnail.secure_url,
        title,
        description,
        duration,
        owner: req.user._id,
    });

    const createdVideo = await Video.findById(video._id)
        .populate("owner", "-password -refreshToken");

    if (!createdVideo) {
        throw new ApiError(500, "Something went wrong while uploading video");
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            createdVideo,
            "Video uploaded successfully"
        )
    );
});
const getAllVideos = asyncHandler(async (req, res) => {
    const videos = await Video.find({ isPublished: true })
        .populate("owner", "username fullName avatar")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            videos,
            "Videos fetched successfully"
        )
    );
});

export {
    uploadVideo,
    getAllVideos
};

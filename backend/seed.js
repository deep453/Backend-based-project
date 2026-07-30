// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./src/models/user.model.js";
import { Video } from "./src/models/video.model.js";

dotenv.config({ path: "./.env" });

// Updated working video URLs (bypasses Google Cloud Storage 403 access issues)
const SAMPLE_VIDEOS = [
  {
    title: "Big Buck Bunny - Open Source Animation",
    description: "A large and lovable rabbit deals with bullying forest creatures in this classic open-source 3D short film.",
    videoFile: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800",
    duration: 10,
    views: 1240,
    isPublished: true,
  },
  {
    title: "Blooming Flower - Nature Time-lapse",
    description: "A beautiful time-lapse demonstration of natural plant motion and floral development.",
    videoFile: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
    duration: 5,
    views: 856,
    isPublished: true,
  },
  {
    title: "HTML5 Video Sample",
    description: "Standard web video stream test asset for testing media player synchronization and buffering.",
    videoFile: "https://vjs.zencdn.net/v/oceans.mp4",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    duration: 46,
    views: 3410,
    isPublished: true,
  },
];

const seedDatabase = async () => {
  try {
    console.log("Connecting to MongoDB...");
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ Connected to MongoDB Database: "${connectionInstance.connection.name}"`);

    console.log("🧹 Clearing old data...");
    await User.deleteMany({});
    await Video.deleteMany({});

    console.log("👤 Creating mock creators...");
    const creator = await User.create({
      username: "skillnova_creator",
      email: "creator@skillnova.com",
      fullName: "SkillNova Master Class",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
      password: "password123", // Will be hashed if model pre-save hook exists
    });

    console.log("📹 Creating mock videos...");
    const videosToInsert = SAMPLE_VIDEOS.map((vid) => ({
      ...vid,
      owner: creator._id,
    }));

    await Video.insertMany(videosToInsert);
    console.log("🚀 Database seeded successfully!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();
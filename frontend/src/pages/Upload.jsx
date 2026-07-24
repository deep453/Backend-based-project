import { useState } from "react";
import { uploadVideo } from "../services/videoService";
function Upload() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [videoFile, setVideoFile] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);

    const [loading, setLoading] = useState(false);

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white rounded-lg shadow-md p-8">

            <h1 className="text-3xl font-bold mb-8">
                Upload Video
            </h1>

            <form>

                <div className="mb-6">

                    <label className="block mb-2 font-semibold">
                        Video File
                    </label>

                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e)=>setVideoFile(e.target.files[0])}
                    />

                </div>

                <div className="mb-6">

                    <label className="block mb-2 font-semibold">
                        Thumbnail
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e)=>setThumbnail(e.target.files[0])}
                    />

                </div>

                <div className="mb-6">

                    <label className="block mb-2 font-semibold">
                        Title
                    </label>

                    <input
                        type="text"
                        className="border w-full rounded p-2"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                    />

                </div>

                <div className="mb-6">

                    <label className="block mb-2 font-semibold">
                        Description
                    </label>

                    <textarea
                        rows="5"
                        className="border w-full rounded p-2"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                    />

                </div>

                <button
                    className="bg-red-600 text-white px-6 py-2 rounded"
                >
                    Upload
                </button>

            </form>

        </div>
    );
}

export default Upload;
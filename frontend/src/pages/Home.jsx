import { useEffect, useState } from "react";
import VideoGrid from "../components/video/VideoGrid";
import { getAllVideos } from "../services/videoService";

const CATEGORIES = ["All", "Tech", "Science", "DIY", "Business", "Music", "Design", "Gaming"];

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cat, setCat] = useState("All");

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllVideos();
        setVideos(res.data?.videos || res.data || []);
      } catch (err) {
        setError("Couldn't load videos. Is the backend running?");
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // NOTE: category isn't a field on your Video model yet — this filters by
  // matching against the title as a placeholder. Replace with a real
  // `video.category` field + query param once the backend supports it.
  const filtered =
    cat === "All"
      ? videos
      : videos.filter((v) => v.title?.toLowerCase().includes(cat.toLowerCase()));

  return (
    <div className="p-5 md:p-7">
      <div className="flex items-center gap-2.5 overflow-x-auto scrollbar-none pb-6 -mx-1 px-1">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold font-body border transition-colors ${
              cat === c
                ? "bg-zinc-100 text-zinc-900 border-zinc-100"
                : "bg-zinc-800/80 text-zinc-200 border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {error ? (
        <p className="text-sm text-rose-400 font-body">{error}</p>
      ) : (
        <VideoGrid videos={filtered} loading={loading} emptyLabel="No videos published yet." />
      )}
    </div>
  );
}

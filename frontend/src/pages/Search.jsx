import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import VideoCard from "../components/video/VideoCard";
import Loader from "../components/ui/Loader";
import { getAllVideos } from "../services/videoService";

/**
 * NOTE: this filters the full video list client-side by title/description.
 * Once your backend supports a real query, e.g. GET /videos?search=term,
 * swap the client-side `.filter()` below for a query param passed to getAllVideos.
 */
export default function Search() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllVideos();
        setVideos(res.data?.videos || res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const results = useMemo(() => {
    if (!query) return videos;
    const q = query.toLowerCase();
    return videos.filter(
      (v) =>
        v.title?.toLowerCase().includes(q) ||
        v.description?.toLowerCase().includes(q) ||
        (typeof v.owner === "object" && v.owner?.username?.toLowerCase().includes(q))
    );
  }, [query, videos]);

  if (loading) return <Loader full label="Searching" />;

  return (
    <div className="p-5 md:p-7 max-w-4xl">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-1">
        <h1 className="font-display font-bold text-xl text-zinc-50">
          {query ? (
            <>
              Results for "<span className="text-violet-300">{query}</span>"
            </>
          ) : (
            "Search"
          )}
        </h1>
        <span className="text-xs text-zinc-500 font-mono">{results.length} results</span>
      </div>

      <div className="divide-y divide-zinc-800/60 mt-4">
        {results.map((v) => (
          <div key={v._id} className="py-4">
            <VideoCard video={v} />
          </div>
        ))}
        {results.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-zinc-400 font-body">No results match that search.</p>
            <p className="text-xs text-zinc-600 font-body mt-1">Try a different keyword.</p>
          </div>
        )}
      </div>
    </div>
  );
}

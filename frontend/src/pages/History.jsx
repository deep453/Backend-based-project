import { useEffect, useState } from "react";
import VideoGrid from "../components/video/VideoGrid";
import Loader from "../components/ui/Loader";
import { getWatchHistory } from "../services/authService";

export default function History() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getWatchHistory();
        setVideos(res.data || []);
      } catch (err) {
        setError("Couldn't load watch history.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="p-5 md:p-7">
      <h1 className="font-display font-bold text-2xl text-zinc-50 mb-5">Watch history</h1>
      {error ? (
        <p className="text-sm text-rose-400 font-body">{error}</p>
      ) : (
        <VideoGrid videos={videos} loading={loading} emptyLabel="You haven't watched anything yet." />
      )}
    </div>
  );
}

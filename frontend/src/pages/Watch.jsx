import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/video/VideoPlayer";
import CommentSection from "../components/video/CommentSection";
import VideoCard from "../components/video/VideoCard";
import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import { getAllVideos } from "../services/videoService";
import { ThumbsUp, ThumbsDown, Share2, Bookmark, MoreVertical } from "lucide-react";

export default function Watch() {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        // TODO: replace with `getVideoById(id)` once GET /videos/:videoId exists.
        // Fetching the whole list to find one video is wasteful long-term.
        const res = await getAllVideos();
        setVideos(res.data?.videos || res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <Loader full label="Loading video" />;

  const video = videos.find((v) => v._id === id) || videos[0];
  if (!video) {
    return (
      <div className="p-8 text-center text-zinc-400 font-body">
        Video not found. It may have been removed, or the backend has no videos yet.
      </div>
    );
  }

  const owner = video.owner && typeof video.owner === "object" ? video.owner : null;
  const upNext = videos.filter((v) => v._id !== video._id).slice(0, 8);

  return (
    <div className="p-5 md:p-7 grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-7 max-w-[1600px]">
      <div>
        <VideoPlayer video={video} />

        <h1 className="font-display font-bold text-xl md:text-2xl text-zinc-50 mt-4 leading-tight">
          {video.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
          <div className="flex items-center gap-3">
            <Avatar src={owner?.avatar} name={owner?.fullName || owner?.username} size="lg" />
            <div>
              <p className="font-body font-semibold text-sm text-zinc-100">
                {owner?.username || "Unknown creator"}
              </p>
              {/* TODO: real subscriber count needs getUserChannelProfile(owner.username) */}
              <p className="text-xs text-zinc-500 font-mono">—</p>
            </div>
            <Button
              variant={subscribed ? "secondary" : "primary"}
              size="sm"
              className="ml-3"
              onClick={() => setSubscribed((s) => !s)}
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden">
              <button className="flex items-center gap-1.5 px-3.5 h-9 text-sm text-zinc-200 hover:bg-zinc-800 font-body">
                <ThumbsUp size={15} /> Like
              </button>
              <div className="w-px h-5 bg-zinc-800" />
              <button className="px-3.5 h-9 text-zinc-200 hover:bg-zinc-800">
                <ThumbsDown size={15} />
              </button>
            </div>
            <button className="flex items-center gap-1.5 px-3.5 h-9 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 hover:bg-zinc-800 font-body">
              <Share2 size={15} /> Share
            </button>
            <button className="flex items-center gap-1.5 px-3.5 h-9 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 hover:bg-zinc-800 font-body">
              <Bookmark size={15} /> Save
            </button>
            <button className="w-9 h-9 grid place-items-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        <div className="mt-5 bg-zinc-900/60 rounded-xl p-4 border border-zinc-800">
          <p className="text-sm text-zinc-400 font-mono">{video.views || 0} views</p>
          <p className="text-sm text-zinc-300 mt-3 leading-relaxed font-body whitespace-pre-wrap">
            {video.description || "No description provided."}
          </p>
        </div>

        <div className="mt-6">
          <CommentSection videoId={video._id} />
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-display font-semibold text-zinc-300 mb-1">Up next</p>
        {upNext.length === 0 ? (
          <p className="text-xs text-zinc-600 font-body">Nothing else to show yet.</p>
        ) : (
          upNext.map((n) => <VideoCard key={n._id} video={n} />)
        )}
      </div>
    </div>
  );
}

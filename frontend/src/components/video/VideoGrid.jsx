import VideoCard from "./VideoCard";
import Loader from "../ui/Loader";

export default function VideoGrid({ videos, loading, emptyLabel = "No videos yet." }) {
  if (loading) return <Loader full label="Loading videos" />;

  if (!videos || videos.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-zinc-400 font-body">{emptyLabel}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8">
      {videos.map((v) => (
        <VideoCard key={v._id} video={v} />
      ))}
    </div>
  );
}

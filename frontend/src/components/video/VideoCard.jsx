import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { randomGradient } from "../../constants/theme";

function formatViews(views = 0) {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K`;
  return `${views}`;
}

function formatDuration(seconds) {
  if (seconds === undefined || seconds === null || isNaN(seconds)) return null;
  const total = Math.round(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

function timeAgo(dateStr) {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins || 1}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export function Thumb({ video }) {
  return (
    <div className="thumb-hover group relative w-full aspect-video overflow-hidden rounded-xl bg-zinc-900">
      {video.thumbnail ? (
        <img
          src={video.thumbnail}
          alt={video.title}
          className="thumb-scale absolute inset-0 w-full h-full object-cover transition-transform duration-300"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${randomGradient(video._id?.length || 0)}`} />
      )}
      <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
        <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur grid place-items-center">
          <Play size={16} className="text-white fill-white ml-0.5" />
        </div>
      </div>
      {formatDuration(video.duration) && (
        <span className="absolute bottom-1.5 right-1.5 bg-black/75 text-white text-[11px] font-mono px-1.5 py-0.5 rounded">
          {formatDuration(video.duration)}
        </span>
      )}
    </div>
  );
}

export default function VideoCard({ video }) {
  const owner = video.owner && typeof video.owner === "object" ? video.owner : null;
  return (
    <Link to={`/watch/${video._id}`} className="group text-left w-full block">
      <Thumb video={video} />
      <div className="flex gap-2.5 mt-3">
        <div
          className={`w-9 h-9 rounded-full bg-gradient-to-br shrink-0 mt-0.5 bg-cover bg-center`}
          style={
            owner?.avatar
              ? { backgroundImage: `url(${owner.avatar})` }
              : undefined
          }
        >
          {!owner?.avatar && (
            <div className={`w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600`} />
          )}
        </div>
        <div className="min-w-0">
          <h3 className="font-body font-semibold text-[13.5px] text-zinc-100 leading-snug line-clamp-2 group-hover:text-violet-300 transition-colors">
            {video.title}
          </h3>
          <p className="text-xs text-zinc-500 mt-1 font-body">
            {owner?.username || owner?.fullName || "Unknown creator"}
          </p>
          <p className="text-xs text-zinc-500 font-body font-mono">
            {formatViews(video.views)} views · {timeAgo(video.createdAt)}
          </p>
        </div>
      </div>
    </Link>
  );
}

import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

/**
 * `commentMarkers` is optional: an array of { pos /* 0-100 *\/, label } used to show
 * dots on the scrubber. Wire this up once your backend exposes comment timestamps
 * (e.g. GET /videos/:videoId/comments returning a `timestamp` field per comment).
 */
export default function VideoPlayer({ video, commentMarkers = [] }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) videoRef.current.pause();
    else videoRef.current.play();
    setPlaying(!playing);
  };

  const onTimeUpdate = () => {
    const el = videoRef.current;
    if (!el || !el.duration) return;
    setProgress((el.currentTime / el.duration) * 100);
  };

  const seekTo = (pct) => {
    const el = videoRef.current;
    if (!el || !el.duration) return;
    el.currentTime = (pct / 100) * el.duration;
    setProgress(pct);
  };

  if (!video?.videoFile) {
    return (
      <div className="w-full aspect-video rounded-2xl bg-zinc-900 grid place-items-center text-zinc-600 text-sm font-body">
        Video unavailable
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black group">
      <video
        ref={videoRef}
        src={video.videoFile}
        poster={video.thumbnail}
        className="w-full h-full object-contain bg-black"
        onTimeUpdate={onTimeUpdate}
        onClick={togglePlay}
        onEnded={() => setPlaying(false)}
      />

      <button
        onClick={togglePlay}
        className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <div className="w-16 h-16 rounded-full bg-black/35 backdrop-blur grid place-items-center">
          {playing ? (
            <Pause size={24} className="text-white" />
          ) : (
            <Play size={26} className="text-white fill-white ml-1" />
          )}
        </div>
      </button>

      <div
        className="absolute bottom-0 left-0 right-0 h-2 bg-black/30 cursor-pointer"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          seekTo(((e.clientX - rect.left) / rect.width) * 100);
        }}
      >
        <div className="h-full bg-violet-400 pointer-events-none" style={{ width: `${progress}%` }} />
        {commentMarkers.map((m, i) => (
          <button
            key={i}
            title={m.label}
            onClick={(e) => { e.stopPropagation(); seekTo(m.pos); }}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-teal-300 border border-black hover:scale-125 transition-transform"
            style={{ left: `${m.pos}%` }}
          />
        ))}
      </div>
    </div>
  );
}

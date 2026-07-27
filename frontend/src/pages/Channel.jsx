import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import VideoGrid from "../components/video/VideoGrid";
import { getUserChannelProfile } from "../services/authService";
import { getAllVideos } from "../services/videoService";
import { useAuth } from "../context/AuthContext";

export default function Channel() {
  const { username } = useParams();
  const { user: me } = useAuth();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      try {
        const [channelRes, videosRes] = await Promise.all([
          getUserChannelProfile(username),
          getAllVideos(),
        ]);
        const channelData = channelRes.data;
        setChannel(channelData);
        setSubscribed(!!channelData?.isSubscribed);

        // NOTE: getAllVideos() isn't filtered by owner on the backend yet.
        // Once video.routes.js supports something like GET /videos?owner=:id,
        // swap this client-side filter for a real query param.
        const all = videosRes.data?.videos || videosRes.data || [];
        setVideos(
          all.filter((v) => {
            const ownerId = typeof v.owner === "object" ? v.owner?._id : v.owner;
            return ownerId === channelData?._id;
          })
        );
      } catch (err) {
        setError("Couldn't load this channel.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [username]);

  if (loading) return <Loader full label="Loading channel" />;
  if (error || !channel) {
    return <div className="p-8 text-center text-zinc-400 font-body">{error || "Channel not found."}</div>;
  }

  const isOwnChannel = me?.username === channel.username;

  return (
    <div>
      <div className="h-36 md:h-48 bg-gradient-to-br from-violet-700 via-indigo-700 to-fuchsia-700 relative">
        {channel.coverImage && (
          <img src={channel.coverImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
        )}
        <Avatar
          src={channel.avatar}
          name={channel.fullName || channel.username}
          size="xl"
          className="absolute -bottom-9 left-6 md:left-8 border-4 border-zinc-950"
        />
      </div>

      <div className="pt-12 px-6 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-2xl text-zinc-50">
              {channel.fullName || channel.username}
            </h1>
            <p className="text-sm text-zinc-500 font-mono mt-1">
              @{channel.username} · {channel.subscribersCount ?? 0} subscribers · {videos.length} videos
            </p>
          </div>
          {!isOwnChannel && (
            <Button
              variant={subscribed ? "secondary" : "primary"}
              onClick={() => setSubscribed((s) => !s)}
              // TODO: wire to a real POST /subscriptions/:channelId toggle once that route exists
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </Button>
          )}
        </div>

        <div className="mt-6 pb-8">
          <VideoGrid videos={videos} emptyLabel="This channel hasn't uploaded anything yet." />
        </div>
      </div>
    </div>
  );
}

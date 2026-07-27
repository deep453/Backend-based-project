import { useEffect, useState } from "react";
import { Eye, Clock, Users, DollarSign, Flame } from "lucide-react";
import Loader from "../components/ui/Loader";
import { getAllVideos } from "../services/videoService";
import { useAuth } from "../context/AuthContext";

/**
 * Your backend doesn't have dashboard/analytics endpoints yet (watch time,
 * revenue, subscriber deltas, retention). Views + video count below are REAL,
 * computed from GET /videos filtered to the logged-in user. Everything marked
 * "mock" is a placeholder UI so the layout is ready — replace it once you add
 * something like GET /dashboard/stats and GET /dashboard/videos.
 */
function StatCard({ label, value, icon: Icon, accent, mock }) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold font-body text-zinc-500">{label}</span>
        <Icon size={15} className={accent} />
      </div>
      <p className="font-display font-bold text-2xl text-zinc-50 mt-2">{value}</p>
      {mock && <p className="text-[10px] text-zinc-600 font-mono mt-1">mock data</p>}
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const [myVideos, setMyVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllVideos();
        const all = res.data?.videos || res.data || [];
        setMyVideos(
          all.filter((v) => {
            const ownerId = typeof v.owner === "object" ? v.owner?._id : v.owner;
            return ownerId === user?._id;
          })
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (loading) return <Loader full label="Loading dashboard" />;

  const totalViews = myVideos.reduce((sum, v) => sum + (v.views || 0), 0);

  return (
    <div className="p-5 md:p-7 space-y-6 max-w-[1200px]">
      <div>
        <h1 className="font-display font-bold text-2xl text-zinc-50">Creator Dashboard</h1>
        <p className="text-sm text-zinc-500 font-body mt-1">{user?.username}'s channel</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Videos" value={myVideos.length} icon={Eye} accent="text-violet-400" />
        <StatCard label="Total views" value={totalViews.toLocaleString()} icon={Eye} accent="text-violet-400" />
        <StatCard label="Watch time (hrs)" value="—" icon={Clock} accent="text-teal-400" mock />
        <StatCard label="Est. revenue" value="—" icon={DollarSign} accent="text-amber-400" mock />
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
        <p className="font-display font-semibold text-zinc-200 p-4 pb-2">Your uploads</p>
        {myVideos.length === 0 ? (
          <p className="text-sm text-zinc-500 font-body px-4 pb-4">
            You haven't uploaded anything yet — head to Upload Studio to publish your first video.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-zinc-500 font-body border-y border-zinc-800">
                <th className="font-medium px-4 py-2">Video</th>
                <th className="font-medium px-4 py-2">Views</th>
                <th className="font-medium px-4 py-2">Published</th>
              </tr>
            </thead>
            <tbody>
              {myVideos.map((v) => (
                <tr key={v._id} className="border-b border-zinc-800/60 last:border-0 hover:bg-zinc-800/30">
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2.5 max-w-[280px]">
                      <div className="w-14 aspect-video rounded bg-zinc-800 shrink-0 overflow-hidden">
                        {v.thumbnail && <img src={v.thumbnail} alt="" className="w-full h-full object-cover" />}
                      </div>
                      <span className="text-zinc-200 font-body text-[13px] line-clamp-1">{v.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 font-mono text-zinc-300">{v.views || 0}</td>
                  <td className="px-4 py-2.5 font-mono text-zinc-500 text-xs">
                    {v.createdAt ? new Date(v.createdAt).toLocaleDateString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
        <p className="font-display font-semibold text-zinc-200 mb-2 flex items-center gap-2">
          <Flame size={15} className="text-amber-400" /> Retention & audience insights
        </p>
        <p className="text-xs text-zinc-500 font-body">
          Coming soon — this needs a backend endpoint tracking watch duration per session.
        </p>
      </div>
    </div>
  );
}

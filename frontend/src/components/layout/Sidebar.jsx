import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home, Compass, Sparkles, Bookmark, Upload, BarChart3,
  ChevronLeft, ChevronRight, Play,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function PulseMark() {
  const h = [0.5, 1, 0.65, 0.9];
  return (
    <div className="flex items-end gap-[2px]" style={{ height: 18 }}>
      {h.map((s, i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-violet-400 pulse-bar"
          style={{ height: `${s * 100}%`, animationDelay: `${i * 0.12}s` }}
        />
      ))}
    </div>
  );
}

function Logo({ collapsed }) {
  return (
    <div className="flex items-center gap-2 px-1">
      <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-950/50 shrink-0">
        <Play size={14} className="text-white fill-white ml-0.5" />
      </div>
      {!collapsed && (
        <span className="font-display font-bold text-lg text-zinc-50 tracking-tight">
          video<span className="text-violet-400">tube</span>
        </span>
      )}
    </div>
  );
}

const NAV_ITEMS = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/ai", label: "AI Hub", icon: Sparkles },
  { to: "/saved", label: "Saved", icon: Bookmark },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();

  return (
    <aside
      className={`hidden md:flex flex-col shrink-0 border-r border-zinc-800 bg-zinc-950 transition-all duration-200 ${
        collapsed ? "w-[76px]" : "w-60"
      } h-screen sticky top-0`}
    >
      <div className="h-16 flex items-center px-4 border-b border-zinc-800">
        <Logo collapsed={collapsed} />
      </div>

      <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto scrollbar-none">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `w-full group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-body transition-colors relative ${
                isActive
                  ? "bg-violet-500/10 text-violet-300"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-violet-400" />
                )}
                <item.icon size={18} strokeWidth={isActive ? 2.4 : 1.8} className="shrink-0" />
                {!collapsed && <span className="truncate font-medium">{item.label}</span>}
              </>
            )}
          </NavLink>
        ))}

        <div className="pt-3 mt-3 border-t border-zinc-800 space-y-1">
          <NavLink
            to="/upload"
            className={({ isActive }) =>
              `w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-body transition-colors ${
                isActive ? "bg-violet-500/10 text-violet-300" : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
              }`
            }
          >
            <Upload size={18} strokeWidth={1.8} className="shrink-0" />
            {!collapsed && <span className="font-medium">Upload Studio</span>}
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-body transition-colors ${
                isActive ? "bg-violet-500/10 text-violet-300" : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
              }`
            }
          >
            <BarChart3 size={18} strokeWidth={1.8} className="shrink-0" />
            {!collapsed && <span className="font-medium">Creator Dashboard</span>}
          </NavLink>
          {user && (
            <NavLink
              to={`/channel/${user.username}`}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-body transition-colors ${
                  isActive ? "bg-violet-500/10 text-violet-300" : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
                }`
              }
            >
              <PulseMark />
              {!collapsed && <span className="font-medium">My Channel</span>}
            </NavLink>
          )}
        </div>
      </nav>

      <div className="p-3 border-t border-zinc-800">
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="w-full flex items-center gap-2 justify-center rounded-lg py-2 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
        >
          {collapsed ? (
            <ChevronRight size={16} />
          ) : (
            <>
              <ChevronLeft size={16} />
              <span className="text-xs font-body">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

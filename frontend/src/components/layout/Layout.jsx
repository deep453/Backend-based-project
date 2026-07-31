import { Outlet, NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Home, Compass, Sparkles, Upload, User } from "lucide-react";

const MOBILE_NAV = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/upload", label: "Upload", icon: Upload },
  { to: "/ai", label: "AI Hub", icon: Sparkles },
  { to: "/profile", label: "Profile", icon: User },
];

export default function Layout() {
  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-100 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 pb-16 md:pb-0">
          <Outlet />
        </main>
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-zinc-950 border-t border-zinc-800 flex items-center justify-around z-20">
        {MOBILE_NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${isActive ? "text-violet-300" : "text-zinc-500"}`
            }
          >
            <item.icon size={19} />
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

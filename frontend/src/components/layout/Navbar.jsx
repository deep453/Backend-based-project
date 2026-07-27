import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Bell, Menu, LogOut, User as UserIcon } from "lucide-react";
import SearchBar from "../ui/SearchBar";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../services/authService";

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error(err);
    } finally {
      logout();
      setMenuOpen(false);
      navigate("/login");
    }
  };

  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur flex items-center gap-3 px-4 md:px-6 shrink-0 sticky top-0 z-30">
      <button onClick={onMenuClick} className="md:hidden text-zinc-400">
        <Menu size={22} />
      </button>

      <div className="flex-1 max-w-xl">
        <SearchBar />
      </div>

      <div className="flex-1" />

      <Button
        variant="primary"
        icon={Upload}
        className="hidden sm:inline-flex"
        onClick={() => navigate("/upload")}
      >
        Upload
      </Button>

      <button className="relative text-zinc-400 hover:text-zinc-100 transition-colors">
        <Bell size={20} />
        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-teal-400" />
      </button>

      {user ? (
        <div className="relative">
          <button onClick={() => setMenuOpen((o) => !o)}>
            <Avatar src={user.avatar} name={user.fullName || user.username} size="md" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-11 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl overflow-hidden">
              <button
                onClick={() => { setMenuOpen(false); navigate("/profile"); }}
                className="w-full flex items-center gap-2 px-3.5 py-2.5 text-sm font-body text-zinc-200 hover:bg-zinc-800"
              >
                <UserIcon size={15} /> Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3.5 py-2.5 text-sm font-body text-rose-400 hover:bg-zinc-800"
              >
                <LogOut size={15} /> Log out
              </button>
            </div>
          )}
        </div>
      ) : (
        <Button variant="secondary" size="sm" onClick={() => navigate("/login")}>
          Log in
        </Button>
      )}
    </header>
  );
}

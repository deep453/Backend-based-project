import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchBar({ className = "" }) {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`flex items-center bg-zinc-900 border border-zinc-800 rounded-full pl-4 pr-1.5 h-10 focus-within:border-violet-500/60 transition-colors ${className}`}
    >
      <Search size={16} className="text-zinc-500 shrink-0" />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search videos, creators, topics…"
        className="flex-1 bg-transparent outline-none text-sm font-body text-zinc-100 placeholder-zinc-500 px-3"
      />
      <button
        type="submit"
        className="h-7 w-7 grid place-items-center rounded-full bg-zinc-800 hover:bg-violet-500/20 text-zinc-400 hover:text-violet-300 transition-colors"
      >
        <Search size={13} />
      </button>
    </form>
  );
}

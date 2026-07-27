export function Input({ label, error, className = "", ...props }) {
  return (
    <label className="block">
      {label && (
        <span className="text-xs font-semibold font-body text-zinc-400 mb-1.5 block">
          {label}
        </span>
      )}
      <input
        className={`w-full bg-zinc-900 border rounded-lg px-3.5 py-2.5 text-sm font-body text-zinc-100
          placeholder-zinc-500 outline-none transition-colors
          ${error ? "border-rose-500/60" : "border-zinc-800 focus:border-violet-500/60"} ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-rose-400 font-body mt-1 block">{error}</span>}
    </label>
  );
}

export function Textarea({ label, error, className = "", ...props }) {
  return (
    <label className="block">
      {label && (
        <span className="text-xs font-semibold font-body text-zinc-400 mb-1.5 block">
          {label}
        </span>
      )}
      <textarea
        className={`w-full bg-zinc-900 border rounded-lg px-3.5 py-2.5 text-sm font-body text-zinc-100
          placeholder-zinc-500 outline-none resize-none transition-colors
          ${error ? "border-rose-500/60" : "border-zinc-800 focus:border-violet-500/60"} ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-rose-400 font-body mt-1 block">{error}</span>}
    </label>
  );
}

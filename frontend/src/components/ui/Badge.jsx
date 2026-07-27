const TONES = {
  neutral: "bg-zinc-800/80 text-zinc-200 border-zinc-700",
  active: "bg-zinc-100 text-zinc-900 border-zinc-100",
  violet: "bg-violet-500/10 text-violet-300 border-violet-500/30",
  teal: "bg-teal-500/10 text-teal-300 border-teal-500/30",
  amber: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  live: "bg-rose-500 text-white border-rose-500",
};

export default function Badge({ tone = "neutral", className = "", children, ...props }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold font-body border ${TONES[tone]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

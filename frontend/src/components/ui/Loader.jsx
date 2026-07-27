export default function Loader({ full = false, label = "Loading" }) {
  const spinner = (
    <div className="flex items-center gap-2.5 text-zinc-500">
      <span className="w-4 h-4 rounded-full border-2 border-zinc-700 border-t-violet-400 animate-spin" />
      <span className="text-sm font-body">{label}…</span>
    </div>
  );
  if (!full) return spinner;
  return (
    <div className="w-full h-[60vh] grid place-items-center">{spinner}</div>
  );
}

export default function SectionTitle({ title, subtitle, action, className = "" }) {
  return (
    <div className={`flex items-center justify-between flex-wrap gap-3 ${className}`}>
      <div>
        <h1 className="font-display font-bold text-2xl text-zinc-50">{title}</h1>
        {subtitle && <p className="text-sm text-zinc-500 font-body mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

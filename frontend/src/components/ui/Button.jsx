const VARIANTS = {
  primary:
    "bg-violet-500 hover:bg-violet-400 text-white shadow-lg shadow-violet-950/40",
  secondary:
    "bg-zinc-800/80 border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800 text-zinc-200",
  ghost: "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900",
  danger: "bg-rose-500/10 text-rose-400 hover:bg-rose-500/20",
};

const SIZES = {
  sm: "h-8 px-3 text-xs",
  md: "h-9 px-4 text-sm",
  lg: "h-11 px-5 text-sm",
};

export default function Button({
  variant = "primary",
  size = "md",
  icon: Icon,
  loading = false,
  className = "",
  children,
  disabled,
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold
        transition-colors disabled:opacity-50 disabled:cursor-not-allowed
        ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
      ) : (
        Icon && <Icon size={15} />
      )}
      {children}
    </button>
  );
}

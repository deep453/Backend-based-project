import { randomGradient } from "../../constants/theme";

const SIZES = {
  xs: "w-6 h-6 text-[10px]",
  sm: "w-8 h-8 text-xs",
  md: "w-9 h-9 text-sm",
  lg: "w-11 h-11 text-base",
  xl: "w-20 h-20 text-2xl",
};

export default function Avatar({ src, name = "?", size = "md", seed = 0, className = "" }) {
  const initial = name?.charAt(0)?.toUpperCase() || "?";
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${SIZES[size]} rounded-full object-cover shrink-0 bg-zinc-800 ${className}`}
        onError={(e) => {
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "grid";
        }}
      />
    );
  }
  return (
    <div
      className={`${SIZES[size]} rounded-full bg-gradient-to-br ${randomGradient(
        seed || name?.length
      )} grid place-items-center font-display font-bold text-white shrink-0 ${className}`}
    >
      {initial}
    </div>
  );
}

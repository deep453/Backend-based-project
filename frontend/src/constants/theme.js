// Design tokens for VideoTube.
// Colors below map to Tailwind's default palette (no tailwind.config changes needed):
// bg canvas -> zinc-950 | panels -> zinc-900 | borders -> zinc-800
// accent (bold, brand) -> violet-500 / violet-400 (hover/glow)
// secondary accent (live / positive / processing) -> teal-400
// tertiary (revenue / warnings) -> amber-400
// text -> zinc-100 (primary) / zinc-400 (muted) / zinc-500 (subtle)

export const theme = {
  colors: {
    primary: "#8b5cf6", // violet-500
    primaryHover: "#a78bfa", // violet-400
    secondary: "#2dd4bf", // teal-400
    warning: "#fbbf24", // amber-400
    danger: "#f43f5e", // rose-500
    background: "#09090b", // zinc-950
    surface: "#18181b", // zinc-900
    border: "#27272a", // zinc-800
    text: "#f4f4f5", // zinc-100
    muted: "#a1a1aa", // zinc-400
    subtle: "#71717a", // zinc-500
  },
  radius: {
    md: "rounded-xl",
    lg: "rounded-2xl",
    full: "rounded-full",
  },
  font: {
    display: "font-display", // Space Grotesk — headings, logo, nav
    body: "font-body", // Inter — everything else
    mono: "font-mono", // JetBrains Mono — stats, timestamps, view counts
  },
  // Fallback gradients for thumbnails/avatars while a real image is loading
  // or if a video/user has none yet.
  gradients: [
    "from-violet-600 via-fuchsia-600 to-indigo-700",
    "from-teal-500 via-cyan-600 to-blue-700",
    "from-amber-500 via-orange-600 to-rose-600",
    "from-indigo-600 via-violet-600 to-purple-700",
    "from-emerald-500 via-teal-600 to-cyan-700",
    "from-fuchsia-600 via-pink-600 to-rose-700",
  ],
};

export const randomGradient = (seed = 0) =>
  theme.gradients[Math.abs(seed) % theme.gradients.length];

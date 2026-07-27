export default function Card({ className = "", children, ...props }) {
  return (
    <div
      className={`bg-zinc-900/50 border border-zinc-800 rounded-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

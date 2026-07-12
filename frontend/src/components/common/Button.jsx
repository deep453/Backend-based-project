const Button = ({
  children,
  type = "button",
  loading = false,
}) => {
  return (
    <button
      type={type}
      disabled={loading}
      className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold transition"
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
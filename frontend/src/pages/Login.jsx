import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Play } from "lucide-react";
import { Input } from "../components/ui/Input";
import Button from "../components/ui/Button";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await loginUser(form);
      // Backend returns { data: { user, accessToken, refreshToken } } in this tutorial's pattern
      login(res.data?.user || res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 grid place-items-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 grid place-items-center">
            <Play size={14} className="text-white fill-white ml-0.5" />
          </div>
          <span className="font-display font-bold text-lg text-zinc-50">
            video<span className="text-violet-400">tube</span>
          </span>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <h1 className="font-display font-bold text-xl text-zinc-50 mb-1">Welcome back</h1>
          <p className="text-sm text-zinc-500 font-body mb-6">Log in to keep watching and creating.</p>

          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              label="Email or username"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@example.com"
              required
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              placeholder="••••••••"
              required
            />
            {error && <p className="text-sm text-rose-400 font-body">{error}</p>}
            <Button type="submit" loading={loading} className="w-full">
              Log in
            </Button>
          </form>

          <p className="text-sm text-zinc-500 font-body mt-5 text-center">
            New here?{" "}
            <Link to="/register" className="text-violet-300 font-semibold hover:text-violet-200">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

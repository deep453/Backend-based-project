import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Play, ImagePlus } from "lucide-react";
import { Input } from "../components/ui/Input";
import Button from "../components/ui/Button";
import { registerUser } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", username: "", email: "", password: "" });
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!avatar) {
      setError("Avatar is required.");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      data.append("avatar", avatar);
      if (coverImage) data.append("coverImage", coverImage);

      await registerUser(data);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 grid place-items-center px-4 py-10">
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
          <h1 className="font-display font-bold text-xl text-zinc-50 mb-1">Create your account</h1>
          <p className="text-sm text-zinc-500 font-body mb-6">Join as a viewer or start as a creator.</p>

          <form onSubmit={onSubmit} className="space-y-4">
            <Input label="Full name" name="fullName" value={form.fullName} onChange={onChange} required />
            <Input label="Username" name="username" value={form.username} onChange={onChange} required />
            <Input label="Email" name="email" type="email" value={form.email} onChange={onChange} required />
            <Input label="Password" name="password" type="password" value={form.password} onChange={onChange} required />

            <div className="grid grid-cols-2 gap-3">
              <label className="cursor-pointer">
                <span className="text-xs font-semibold font-body text-zinc-400 mb-1.5 block">Avatar *</span>
                <div className="h-20 rounded-lg border-2 border-dashed border-zinc-700 hover:border-violet-500/60 grid place-items-center text-zinc-500 hover:text-violet-300 transition-colors text-xs font-body text-center px-2">
                  {avatar ? avatar.name : <ImagePlus size={18} />}
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => setAvatar(e.target.files[0])} />
              </label>
              <label className="cursor-pointer">
                <span className="text-xs font-semibold font-body text-zinc-400 mb-1.5 block">Cover image</span>
                <div className="h-20 rounded-lg border-2 border-dashed border-zinc-700 hover:border-violet-500/60 grid place-items-center text-zinc-500 hover:text-violet-300 transition-colors text-xs font-body text-center px-2">
                  {coverImage ? coverImage.name : <ImagePlus size={18} />}
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => setCoverImage(e.target.files[0])} />
              </label>
            </div>

            {error && <p className="text-sm text-rose-400 font-body">{error}</p>}
            <Button type="submit" loading={loading} className="w-full">
              Create account
            </Button>
          </form>

          <p className="text-sm text-zinc-500 font-body mt-5 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-violet-300 font-semibold hover:text-violet-200">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

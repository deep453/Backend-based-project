import { useState } from "react";
import { Settings } from "lucide-react";
import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";
import { updateAccountDetails, updateUserAvatar, updateUserCoverImage } from "../services/authService";

export default function Profile() {
  const { user, login } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ fullName: user?.fullName || "", email: user?.email || "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  if (!user) {
    return (
      <div className="p-8 text-center text-zinc-400 font-body">
        You need to be logged in to see your profile.
      </div>
    );
  }

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const saveDetails = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await updateAccountDetails(form);
      login(res.data);
      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't update profile.");
    } finally {
      setSaving(false);
    }
  };

  const onAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("avatar", file);
    try {
      const res = await updateUserAvatar(data);
      login(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const onCoverChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("coverImage", file);
    try {
      const res = await updateUserCoverImage(data);
      login(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="h-36 md:h-44 bg-gradient-to-br from-violet-700 via-indigo-700 to-fuchsia-700 relative">
        {user.coverImage && (
          <img src={user.coverImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
        )}
        <label className="absolute bottom-2 right-2 text-xs font-body bg-black/50 text-white px-2.5 py-1.5 rounded-full cursor-pointer hover:bg-black/70">
          Change cover
          <input type="file" accept="image/*" className="hidden" onChange={onCoverChange} />
        </label>
        <label className="absolute -bottom-9 left-6 md:left-8 cursor-pointer">
          <Avatar src={user.avatar} name={user.fullName || user.username} size="xl" className="border-4 border-zinc-950" />
          <input type="file" accept="image/*" className="hidden" onChange={onAvatarChange} />
        </label>
      </div>

      <div className="pt-12 px-6 md:px-8 pb-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-xl text-zinc-50">{user.fullName}</h1>
            <p className="text-sm text-zinc-500 font-mono mt-1">@{user.username}</p>
          </div>
          <Button variant="secondary" size="sm" icon={Settings} onClick={() => setEditing((v) => !v)}>
            {editing ? "Cancel" : "Edit profile"}
          </Button>
        </div>

        {editing && (
          <form onSubmit={saveDetails} className="mt-5 max-w-md space-y-4 bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
            <Input label="Full name" name="fullName" value={form.fullName} onChange={onChange} />
            <Input label="Email" name="email" type="email" value={form.email} onChange={onChange} />
            {error && <p className="text-sm text-rose-400 font-body">{error}</p>}
            <Button type="submit" loading={saving}>Save changes</Button>
          </form>
        )}

        <div className="mt-6 max-w-sm bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-sm font-body text-zinc-400">
          <p>Email: <span className="text-zinc-200">{user.email}</span></p>
        </div>
      </div>
    </div>
  );
}

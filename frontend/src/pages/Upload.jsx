import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload as UploadIcon, ImagePlus } from "lucide-react";
import { Input, Textarea } from "../components/ui/Input";
import Button from "../components/ui/Button";
import { uploadVideo } from "../services/videoService";

export default function Upload() {
  const navigate = useNavigate();
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [form, setForm] = useState({ title: "", description: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!videoFile) {
      setError("Please select a video file.");
      return;
    }
    if (!thumbnail) {
      setError("Please select a thumbnail.");
      return;
    }

    setLoading(true);
    setProgress(0);
    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("description", form.description);
      data.append("videoFile", videoFile);
      data.append("thumbnail", thumbnail);

      // If your axios instance supports onUploadProgress, you can pass it as a
      // 3rd arg to uploadVideo — wire that up in videoService.js if you want a
      // real progress bar instead of the indeterminate one below.
      await uploadVideo(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 md:p-7 max-w-3xl">
      <h1 className="font-display font-bold text-2xl text-zinc-50">Upload Studio</h1>
      <p className="text-sm text-zinc-500 font-body mt-1">Publish a new video to your channel.</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="cursor-pointer block">
            <span className="text-xs font-semibold font-body text-zinc-400 mb-1.5 block">Video file *</span>
            <div className="aspect-video rounded-xl border-2 border-dashed border-zinc-800 hover:border-violet-500/60 grid place-items-center text-zinc-500 hover:text-violet-300 transition-colors text-center px-3 bg-zinc-900/40">
              {videoFile ? (
                <span className="text-xs font-body">{videoFile.name}</span>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <UploadIcon size={20} />
                  <span className="text-xs font-body">Select video</span>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => setVideoFile(e.target.files[0])}
            />
          </label>

          <label className="cursor-pointer block">
            <span className="text-xs font-semibold font-body text-zinc-400 mb-1.5 block">Thumbnail *</span>
            <div className="aspect-video rounded-xl border-2 border-dashed border-zinc-800 hover:border-violet-500/60 grid place-items-center text-zinc-500 hover:text-violet-300 transition-colors text-center px-3 bg-zinc-900/40">
              {thumbnail ? (
                <span className="text-xs font-body">{thumbnail.name}</span>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <ImagePlus size={20} />
                  <span className="text-xs font-body">Select thumbnail</span>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
          </label>
        </div>

        <Input label="Title" name="title" value={form.title} onChange={onChange} required />
        <Textarea
          label="Description"
          name="description"
          rows={4}
          value={form.description}
          onChange={onChange}
        />

        {loading && (
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-4">
            <div className="flex items-center gap-2 text-xs text-teal-300 font-mono mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" /> Uploading…
            </div>
            <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
              <div className="h-full bg-teal-400 rounded-full animate-pulse w-2/3" />
            </div>
          </div>
        )}

        {error && <p className="text-sm text-rose-400 font-body">{error}</p>}

        <Button type="submit" loading={loading} className="w-full sm:w-auto">
          Publish
        </Button>
      </form>
    </div>
  );
}

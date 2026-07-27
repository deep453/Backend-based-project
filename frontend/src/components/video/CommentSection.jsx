import { useState } from "react";
import Comment from "./Comment";
import Avatar from "../ui/Avatar";
import { useAuth } from "../../context/AuthContext";

/**
 * TODO: this section currently stores comments in local component state only.
 * Once the backend exposes something like:
 *   GET  /videos/:videoId/comments
 *   POST /videos/:videoId/comments   { content }
 * replace `useState(seed)` with a fetch on mount, and `handleAdd` with a POST call.
 */
export default function CommentSection({ videoId, seed = [] }) {
  const { user } = useAuth();
  const [comments, setComments] = useState(seed);
  const [draft, setDraft] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setComments((c) => [
      { _id: Date.now().toString(), content: draft.trim(), owner: user, time: "just now", likes: 0 },
      ...c,
    ]);
    setDraft("");
  };

  return (
    <div className="space-y-4">
      <p className="text-sm font-body font-semibold text-zinc-300">Comments · {comments.length}</p>
      <form onSubmit={handleAdd} className="flex gap-3">
        <Avatar src={user?.avatar} name={user?.fullName || user?.username} size="sm" />
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={user ? "Add a comment…" : "Log in to comment"}
          disabled={!user}
          className="flex-1 bg-transparent border-b border-zinc-800 focus:border-violet-500 outline-none text-sm font-body text-zinc-200 placeholder-zinc-500 pb-2 disabled:opacity-50"
        />
      </form>
      {comments.length === 0 ? (
        <p className="text-xs text-zinc-600 font-body">No comments yet — be the first.</p>
      ) : (
        comments.map((c) => <Comment key={c._id} comment={c} />)
      )}
    </div>
  );
}

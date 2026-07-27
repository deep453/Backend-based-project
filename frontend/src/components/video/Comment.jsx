import Avatar from "../ui/Avatar";
import { ThumbsUp } from "lucide-react";

export default function Comment({ comment }) {
  return (
    <div className="flex gap-3">
      <Avatar src={comment.owner?.avatar} name={comment.owner?.username} size="sm" />
      <div>
        <p className="text-xs text-zinc-500 font-mono">
          {comment.owner?.username || "user"} · {comment.time || "just now"}
        </p>
        <p className="text-sm text-zinc-200 font-body mt-0.5">{comment.content}</p>
        <div className="flex items-center gap-3 mt-1 text-zinc-500">
          <button className="flex items-center gap-1 text-xs hover:text-zinc-200">
            <ThumbsUp size={12} /> {comment.likes || 0}
          </button>
          <button className="text-xs hover:text-zinc-200">Reply</button>
        </div>
      </div>
    </div>
  );
}

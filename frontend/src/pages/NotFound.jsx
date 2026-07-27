import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 grid place-items-center px-4 text-center">
      <div>
        <p className="font-display font-bold text-6xl text-violet-400">404</p>
        <p className="text-zinc-300 font-body mt-3">This page doesn't exist.</p>
        <Link to="/">
          <Button className="mt-6">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}

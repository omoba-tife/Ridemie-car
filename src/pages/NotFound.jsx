
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#080D14] px-6 py-20 text-white">
      <div className="max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-[5px] text-[#D9AC62]">
          RideMie Navigation
        </p>

        <h1 className="mt-8 text-8xl font-black tracking-tighter sm:text-9xl">
          404
        </h1>

        <h2 className="mt-6 text-3xl font-semibold">
          Looks like you've taken a wrong turn.
        </h2>

        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-white/50">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back on the right road.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-[#D9AC62] px-7 py-4 text-sm font-bold text-black transition hover:bg-white"
          >
            <ArrowLeft size={17} />
            Back Home
          </Link>

          <Link
            to="/fleet"
            className="flex items-center justify-center gap-2 border border-white/20 px-7 py-4 text-sm font-bold text-white transition hover:bg-white hover:text-black"
          >
            Explore Fleet
            <ArrowUpRight size={17} />
          </Link>
        </div>

        <p className="mt-20 text-xs text-white/30">
          © {new Date().getFullYear()} RideMie · Built by Tife Tech
        </p>
      </div>
    </main>
  );
}

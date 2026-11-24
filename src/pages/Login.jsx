
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CarFront,
} from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage(
      "The login interface is ready. Real account authentication will be connected when we build the backend."
    );
  };

  return (
    <main className="grid min-h-[85vh] bg-white lg:grid-cols-2">
      {/* Left panel */}
      <section className="relative hidden overflow-hidden bg-[#080D14] lg:block">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85"
          alt="Luxury sports car"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080D14] via-[#080D14]/30 to-[#080D14]/20" />

        <div className="relative flex h-full min-h-[700px] flex-col justify-between p-12 xl:p-20">
          <Link to="/" className="text-4xl font-black tracking-[-3px] text-white">
            ride<span className="text-[#D9AC62]">mie</span>
          </Link>

          <div className="max-w-lg pb-10">
            <p className="text-xs font-bold uppercase tracking-[4px] text-[#D9AC62]">
              Welcome to RideMie
            </p>
            <h1 className="mt-6 text-5xl font-semibold leading-tight text-white xl:text-6xl">
              Your journey deserves a better experience.
            </h1>
            <p className="mt-6 text-sm leading-8 text-white/60">
              Sign in to access your RideMie experience and manage your
              transportation needs.
            </p>
          </div>

          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} RideMie. All rights reserved.
          </p>
        </div>
      </section>

      {/* Login form */}
      <section className="flex items-center justify-center px-6 py-16 sm:px-12 lg:px-16">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="text-3xl font-black tracking-[-2px] text-[#080D14] lg:hidden"
          >
            ride<span className="text-[#B68A45]">mie</span>
          </Link>

          <div className="mb-10 mt-12 lg:mt-0">
            <div className="mb-7 flex h-14 w-14 items-center justify-center bg-[#D9AC62]/15 text-[#A77A32]">
              <CarFront size={27} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[4px] text-[#B68A45]">
              Customer account
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900">
              Welcome back.
            </h2>
            <p className="mt-3 text-sm leading-7 text-gray-500">
              Sign in to continue your RideMie journey.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <label className="block text-sm font-semibold text-gray-700">
              Email address
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setMessage("");
                }}
                required
                placeholder="you@example.com"
                className="mt-3 w-full border border-gray-200 px-4 py-4 text-sm font-normal outline-none transition focus:border-[#B68A45]"
              />
            </label>

            <label className="block text-sm font-semibold text-gray-700">
              Password
              <div className="relative mt-3">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setMessage("");
                  }}
                  required
                  placeholder="Enter your password"
                  className="w-full border border-gray-200 px-4 py-4 pr-12 text-sm font-normal outline-none transition focus:border-[#B68A45]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </label>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-gray-500">
                <input type="checkbox" className="accent-[#B68A45]" />
                Remember me
              </label>
              <Link
                to="/forgot-password"
                className="font-semibold text-[#A77A32] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {message && (
              <div className="border border-[#D9AC62]/40 bg-[#D9AC62]/10 p-4 text-xs leading-6 text-gray-700">
                {message}
              </div>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-between bg-[#080D14] px-6 py-5 text-sm font-bold text-white transition hover:bg-[#B68A45]"
            >
              Sign In <ArrowRight size={19} />
            </button>
          </form>

          <div className="mt-9 flex items-start gap-3 border-t border-gray-100 pt-7">
            <ShieldCheck size={20} className="shrink-0 text-[#B68A45]" />
            <p className="text-xs leading-6 text-gray-400">
              Your account security matters. Authentication and secure
              sessions will be implemented with the backend.
            </p>
          </div>

          <p className="mt-9 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-[#A77A32] hover:underline"
            >
              Create an account
            </Link>
          </p>

          <p className="mt-8 text-center text-xs text-gray-400">
            <Link to="/" className="hover:text-gray-900">
              Back to RideMie homepage
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

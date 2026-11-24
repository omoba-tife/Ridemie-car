
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, UserRound, Mail, Phone, Lock, ArrowRight } from "lucide-react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Your registration form is ready. Account creation will be available when the backend is connected.");
  };

  return (
    <main className="min-h-screen bg-[#f7f7f5] px-5 py-16">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">
        <div className="relative hidden min-h-[750px] flex-col justify-between overflow-hidden bg-[#101010] p-12 text-white lg:flex">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85"
            alt="Luxury sports car"
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/90" />

          <div className="relative z-10">
            <Link to="/" className="text-3xl font-black tracking-tight">
              Ride<span className="text-[#c8a96a]">Mie.</span>
            </Link>
          </div>

          <div className="relative z-10 max-w-md">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#d8bd88]">
              Welcome to a better journey
            </p>
            <h1 className="mb-6 text-5xl font-semibold leading-tight">
              Your next journey starts here.
            </h1>
            <p className="text-base leading-8 text-white/75">
              Create your RideMie account and discover a smarter way to
              experience premium mobility.
            </p>
          </div>

          <p className="relative z-10 text-sm text-white/50">
            © {new Date().getFullYear()} RideMie. All rights reserved.
          </p>
        </div>

        <div className="flex items-center justify-center px-6 py-12 sm:px-12 lg:px-14">
          <div className="w-full max-w-md">
            <Link to="/" className="mb-10 inline-block text-2xl font-black text-black lg:hidden">
              Ride<span className="text-[#c8a96a]">Mie.</span>
            </Link>

            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#b18c4d]">
              Create an account
            </p>
            <h2 className="mb-3 text-3xl font-bold text-[#171717]">
              Join RideMie
            </h2>
            <p className="mb-8 text-sm leading-6 text-gray-500">
              Enter your details to create your customer account.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Full name
                </label>
                <div className="flex items-center rounded-xl border border-gray-200 px-4 focus-within:border-[#b18c4d]">
                  <UserRound size={18} className="text-gray-400" />
                  <input required type="text" placeholder="Your full name" className="w-full bg-transparent px-3 py-4 text-sm outline-none" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email address
                </label>
                <div className="flex items-center rounded-xl border border-gray-200 px-4 focus-within:border-[#b18c4d]">
                  <Mail size={18} className="text-gray-400" />
                  <input required type="email" placeholder="you@example.com" className="w-full bg-transparent px-3 py-4 text-sm outline-none" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Phone number
                </label>
                <div className="flex items-center rounded-xl border border-gray-200 px-4 focus-within:border-[#b18c4d]">
                  <Phone size={18} className="text-gray-400" />
                  <input required type="tel" placeholder="+234 800 000 0000" className="w-full bg-transparent px-3 py-4 text-sm outline-none" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <div className="flex items-center rounded-xl border border-gray-200 px-4 focus-within:border-[#b18c4d]">
                  <Lock size={18} className="text-gray-400" />
                  <input required minLength={8} type={showPassword ? "text" : "password"} placeholder="At least 8 characters" className="w-full bg-transparent px-3 py-4 text-sm outline-none" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-3 text-sm leading-6 text-gray-500">
                <input required type="checkbox" className="mt-1 accent-[#b18c4d]" />
                <span>I agree to the RideMie terms of service and privacy policy.</span>
              </label>

              <button type="submit" className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#b18c4d] py-4 text-sm font-bold text-white transition hover:bg-[#9e7c43]">
                Create account <ArrowRight size={18} />
              </button>

              {message && (
                <p role="status" className="rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                  {message}
                </p>
              )}
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-[#a47f43]">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

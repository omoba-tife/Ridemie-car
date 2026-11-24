
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(
      "Password recovery will be available once the RideMie backend and email service are connected."
    );
  };

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#f7f7f5] px-5 py-20">
      <div className="w-full max-w-lg rounded-3xl bg-white p-7 shadow-xl sm:p-12">
        <Link to="/" className="mb-12 inline-block text-2xl font-black text-black">
          Ride<span className="text-[#c8a96a]">Mie.</span>
        </Link>

        <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f6f0e5] text-[#a47f43]">
          <ShieldCheck size={32} />
        </div>

        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#b18c4d]">
          Account recovery
        </p>

        <h1 className="mb-4 text-3xl font-bold text-[#171717]">
          Forgot your password?
        </h1>

        <p className="mb-8 text-sm leading-7 text-gray-500">
          Don't worry. Enter the email address associated with your account.
          We'll use it to help you recover access once account services are active.
        </p>

        <form onSubmit={handleSubmit}>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Email address
          </label>

          <div className="mb-6 flex items-center rounded-xl border border-gray-200 px-4 focus-within:border-[#b18c4d]">
            <Mail size={18} className="text-gray-400" />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-transparent px-3 py-4 text-sm outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#b18c4d] py-4 text-sm font-bold text-white transition hover:bg-[#9e7c43]"
          >
            Continue
          </button>

          {message && (
            <p role="status" className="mt-5 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-800">
              {message}
            </p>
          )}
        </form>

        <Link
          to="/login"
          className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-[#a47f43]"
        >
          <ArrowLeft size={16} /> Back to sign in
        </Link>
      </div>
    </main>
  );
}

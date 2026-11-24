
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserRound, Mail, Phone, MapPin, Lock, Save } from "lucide-react";

export default function Profile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [message, setMessage] = useState("");

  const updateField = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Profile editing is ready. Your information will be saved once the backend is connected.");
  };

  const fields = [
    { name: "name", label: "Full name", placeholder: "Enter your full name", icon: UserRound },
    { name: "email", label: "Email address", placeholder: "Enter your email", icon: Mail, type: "email" },
    { name: "phone", label: "Phone number", placeholder: "+234 800 000 0000", icon: Phone },
    { name: "address", label: "Residential address", placeholder: "Enter your address", icon: MapPin },
  ];

  return (
    <main className="min-h-screen bg-[#f7f7f5] px-5 py-14 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#ad894d]">
          Account settings
        </p>
        <h1 className="text-3xl font-bold text-[#171717] sm:text-4xl">My profile</h1>
        <p className="mt-3 text-sm text-gray-500">
          Manage your personal details and account information.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f6f0e5] text-[#a47f43]">
              <UserRound size={34} />
            </div>
            <h2 className="mt-4 text-center font-bold text-[#171717]">RideMie Customer</h2>
            <p className="mt-1 text-center text-xs text-gray-400">Customer account</p>

            <div className="mt-7 space-y-4 border-t border-gray-100 pt-6 text-sm">
              <Link to="/dashboard" className="block text-gray-600 hover:text-[#a47f43]">Dashboard</Link>
              <Link to="/my-bookings" className="block text-gray-600 hover:text-[#a47f43]">My bookings</Link>
              <Link to="/contact" className="block text-gray-600 hover:text-[#a47f43]">Customer support</Link>
            </div>
          </aside>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-9">
            <h2 className="text-xl font-bold text-[#171717]">Personal information</h2>
            <p className="mt-2 text-sm text-gray-500">
              Update the details associated with your account.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                {fields.map((field) => {
                  const Icon = field.icon;
                  return (
                    <div key={field.name}>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        {field.label}
                      </label>
                      <div className="flex items-center rounded-xl border border-gray-200 px-4 focus-within:border-[#b18c4d]">
                        <Icon size={18} className="text-gray-400" />
                        <input
                          name={field.name}
                          type={field.type || "text"}
                          value={form[field.name]}
                          onChange={updateField}
                          placeholder={field.placeholder}
                          className="w-full bg-transparent px-3 py-4 text-sm outline-none"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="mb-2 font-bold text-[#171717]">Security</h3>
                <p className="mb-5 text-sm text-gray-500">
                  Password management will be available when authentication is connected.
                </p>
                <Link to="/forgot-password" className="inline-flex items-center gap-2 text-sm font-semibold text-[#a47f43]">
                  <Lock size={16} /> Password recovery
                </Link>
              </div>

              <button type="submit" className="flex items-center justify-center gap-2 rounded-xl bg-[#b18c4d] px-7 py-4 text-sm font-bold text-white">
                <Save size={17} /> Save changes
              </button>

              {message && (
                <p role="status" className="rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                  {message}
                </p>
              )}
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

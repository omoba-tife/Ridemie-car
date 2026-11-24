
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  CarFront,
  Handshake,
  ShieldCheck,
  Wallet,
  CheckCircle2,
} from "lucide-react";

const benefits = [
  {
    icon: Wallet,
    title: "Earn from your vehicle",
    text: "Put your vehicle to work by making it available to customers looking for quality transportation.",
  },
  {
    icon: ShieldCheck,
    title: "A structured platform",
    text: "Manage your partnership through an organised platform with clear vehicle and booking information.",
  },
  {
    icon: Handshake,
    title: "Grow with RideMie",
    text: "Become part of a growing mobility network connecting customers and vehicle owners.",
  },
];

export default function Partners() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "",
    year: "",
    city: "",
    service: "Self-drive and chauffeur",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const update = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="bg-white">
      <section className="bg-[#080D14] px-6 py-24 text-white lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-[1500px] items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[5px] text-[#D9AC62]">
              The RideMie partner network
            </p>
            <h1 className="mt-7 text-5xl font-semibold leading-[1.1] sm:text-6xl lg:text-7xl">
              Your vehicle.
              <span className="block text-[#D9AC62]">More opportunity.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/50">
              Have a quality vehicle? Join the RideMie partner network and
              explore opportunities to make your vehicle available to
              customers seeking premium transportation.
            </p>
            <a
              href="#partner-form"
              className="mt-10 inline-flex items-center gap-3 bg-[#D9AC62] px-8 py-4 text-sm font-bold text-black hover:bg-white"
            >
              Apply to become a partner <ArrowUpRight size={18} />
            </a>
          </div>

          <div className="relative min-h-[340px] overflow-hidden bg-white/5 lg:min-h-[500px]">
            <img
              src="https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=1400&q=85"
              alt="Premium vehicle"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080D14]/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8">
              <p className="text-xs uppercase tracking-[3px] text-[#D9AC62]">
                Move forward with us
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">
                Become part of something bigger.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[4px] text-[#B68A45]">
              Why partner with us
            </p>
            <h2 className="mt-5 text-4xl font-semibold text-gray-900 lg:text-5xl">
              Turn vehicle ownership into opportunity.
            </h2>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, text }) => (
              <article key={title} className="border-t border-gray-200 pt-8">
                <Icon size={30} className="text-[#B68A45]" />
                <h3 className="mt-7 text-xl font-bold text-gray-900">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-gray-500">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="partner-form" className="bg-[#F8F8F6] px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[4px] text-[#B68A45]">
              Start your application
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight text-gray-900 lg:text-5xl">
              Let's get your vehicle on the road.
            </h2>
            <p className="mt-6 text-sm leading-8 text-gray-500">
              Share a few details about yourself and your vehicle. Our
              partnership team can review your information and guide you
              through the next steps.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Submit your vehicle information",
                "Complete the verification process",
                "Discuss partnership arrangements",
                "Prepare your vehicle for listing",
              ].map((item, index) => (
                <div key={item} className="flex items-center gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#080D14] text-xs font-bold text-[#D9AC62]">
                    0{index + 1}
                  </span>
                  <p className="text-sm font-medium text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-7 shadow-sm sm:p-10">
            {submitted ? (
              <div className="py-14 text-center">
                <CheckCircle2 size={48} className="mx-auto text-[#B68A45]" />
                <h3 className="mt-6 text-2xl font-bold text-gray-900">
                  Application details prepared
                </h3>
                <p className="mt-4 text-sm leading-7 text-gray-500">
                  Thank you, {form.name}. This frontend demonstration has
                  captured your form details in the current page only.
                  Nothing has been sent or saved.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 bg-[#080D14] px-7 py-4 text-sm font-bold text-white"
                >
                  Edit application
                </button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className="mb-8">
                  <CarFront size={28} className="text-[#B68A45]" />
                  <h3 className="mt-4 text-2xl font-bold text-gray-900">
                    Partner application
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Complete the details below.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {[
                    ["name", "Full name", "Your full name"],
                    ["email", "Email address", "you@example.com"],
                    ["phone", "Phone number", "+234..."],
                    ["vehicle", "Vehicle make and model", "e.g. Toyota Camry"],
                    ["year", "Vehicle year", "e.g. 2022"],
                    ["city", "Vehicle location", "e.g. Lagos"],
                  ].map(([name, label, placeholder]) => (
                    <label key={name} className="text-sm font-semibold text-gray-700">
                      {label}
                      <input
                        name={name}
                        value={form[name]}
                        onChange={update}
                        required
                        type={name === "email" ? "email" : "text"}
                        placeholder={placeholder}
                        className="mt-2 w-full border border-gray-200 px-4 py-4 text-sm font-normal outline-none focus:border-[#B68A45]"
                      />
                    </label>
                  ))}

                  <label className="text-sm font-semibold text-gray-700 sm:col-span-2">
                    Preferred service
                    <select
                      name="service"
                      value={form.service}
                      onChange={update}
                      className="mt-2 w-full border border-gray-200 bg-white px-4 py-4 text-sm font-normal outline-none focus:border-[#B68A45]"
                    >
                      <option>Self-drive and chauffeur</option>
                      <option>Self-drive only</option>
                      <option>Chauffeur only</option>
                    </select>
                  </label>

                  <label className="text-sm font-semibold text-gray-700 sm:col-span-2">
                    Additional information
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={update}
                      rows="4"
                      placeholder="Tell us more about your vehicle..."
                      className="mt-2 w-full resize-y border border-gray-200 px-4 py-4 text-sm font-normal outline-none focus:border-[#B68A45]"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="mt-7 flex w-full items-center justify-between bg-[#080D14] px-6 py-5 text-sm font-bold text-white hover:bg-[#B68A45]"
                >
                  Submit application <ArrowUpRight size={19} />
                </button>
                <p className="mt-4 text-xs leading-6 text-gray-400">
                  Demonstration form only. Your information is not transmitted
                  or stored until a backend is connected.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

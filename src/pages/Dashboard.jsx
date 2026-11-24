
import { Link } from "react-router-dom";
import {
  CalendarDays,
  CarFront,
  Clock3,
  CreditCard,
  ArrowUpRight,
  MapPin,
  ChevronRight,
  UserRound,
} from "lucide-react";

const bookings = [
  {
    id: "RM-2026-001",
    car: "Mercedes-Benz GLE",
    service: "Chauffeur service",
    date: "Awaiting booking",
    status: "Demo",
    price: "₦180,000",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=500&q=85",
  },
];

const stats = [
  { label: "Total bookings", value: "00", icon: CalendarDays },
  { label: "Upcoming trips", value: "00", icon: Clock3 },
  { label: "Completed trips", value: "00", icon: CarFront },
  { label: "Saved vehicles", value: "00", icon: CreditCard },
];

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#f7f7f5] px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#ad894d]">
              Customer portal
            </p>
            <h1 className="text-3xl font-bold text-[#171717] sm:text-4xl">
              Welcome back!
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Manage your journeys and account from one place.
            </p>
          </div>

          <Link
            to="/booking"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#b18c4d] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#98743e]"
          >
            Book a vehicle <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-2xl border border-gray-100 bg-white p-6">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-sm text-gray-500">{item.label}</span>
                  <div className="rounded-xl bg-[#f6f0e5] p-3 text-[#a47f43]">
                    <Icon size={20} />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-[#171717]">{item.value}</h2>
              </div>
            );
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">
          <section className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
            <div className="mb-7 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#171717]">Recent bookings</h2>
                <p className="mt-1 text-sm text-gray-500">Your latest reservations</p>
              </div>
              <Link to="/my-bookings" className="text-sm font-semibold text-[#a47f43]">
                View all
              </Link>
            </div>

            {bookings.map((booking) => (
              <div key={booking.id} className="overflow-hidden rounded-2xl border border-gray-100">
                <img src={booking.image} alt={booking.car} className="h-52 w-full object-cover" />
                <div className="p-5">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                      {booking.status}
                    </span>
                    <span className="text-xs text-gray-400">{booking.id}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#171717]">{booking.car}</h3>
                  <p className="mt-1 text-sm text-gray-500">{booking.service}</p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                    <span className="text-sm text-gray-500">{booking.date}</span>
                    <span className="font-bold text-[#171717]">{booking.price} / day</span>
                  </div>
                </div>
              </div>
              ))}
            <p className="mt-4 text-xs leading-5 text-gray-400">
              Sample dashboard content. Your real booking history will appear when the backend is connected.
            </p>
          </section>

          <div className="space-y-6">
            <section className="rounded-2xl bg-[#151515] p-7 text-white">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[#d8bd88]">
                <UserRound size={23} />
              </div>
              <h2 className="text-xl font-bold">Your profile</h2>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Keep your personal information and contact details up to date.
              </p>
              <Link to="/profile" className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-sm font-semibold text-[#d8bd88]">
                Manage profile <ChevronRight size={18} />
              </Link>
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white p-7">
              <h2 className="mb-5 text-lg font-bold text-[#171717]">Quick links</h2>
              <div className="space-y-4">
                <Link to="/fleet" className="flex items-center justify-between text-sm text-gray-600 hover:text-[#a47f43]">
                  <span className="flex items-center gap-3"><CarFront size={18} /> Explore vehicles</span>
                  <ChevronRight size={17} />
                </Link>
                <Link to="/my-bookings" className="flex items-center justify-between text-sm text-gray-600 hover:text-[#a47f43]">
                  <span className="flex items-center gap-3"><CalendarDays size={18} /> My bookings</span>
                  <ChevronRight size={17} />
                </Link>
                <Link to="/contact" className="flex items-center justify-between text-sm text-gray-600 hover:text-[#a47f43]">
                  <span className="flex items-center gap-3"><MapPin size={18} /> Contact support</span>
                  <ChevronRight size={17} />
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}


import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  MapPin,
  CarFront,
  Search,
  ChevronRight,
  Clock3,
} from "lucide-react";

const reservations = [
  {
    id: "RM-2026-1042",
    customer: "Sample Customer",
    vehicle: "Mercedes-Benz GLE",
    service: "Chauffeur service",
    date: "Pending confirmation",
    location: "Lagos",
    amount: "₦180,000",
    status: "Pending",
  },
  {
    id: "RM-2026-1043",
    customer: "Sample Customer",
    vehicle: "Range Rover Sport",
    service: "Self-drive",
    date: "Pending confirmation",
    location: "Abuja",
    amount: "₦220,000",
    status: "Confirmed",
  },
];

export default function PartnerBookings() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const tabs = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];

  const filtered = reservations.filter((booking) => {
    const matchesTab = activeTab === "All" || booking.status === activeTab;
    const matchesSearch =
      booking.id.toLowerCase().includes(search.toLowerCase()) ||
      booking.vehicle.toLowerCase().includes(search.toLowerCase()) ||
      booking.customer.toLowerCase().includes(search.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#f7f7f5] px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#ad894d]">
          Partner workspace
        </p>
        <h1 className="text-3xl font-bold text-[#171717] sm:text-4xl">
          Booking management
        </h1>
        <p className="mt-3 text-sm text-gray-500">
          Monitor customer reservations and manage booking requests.
        </p>

        <div className="mt-9 grid gap-4 sm:grid-cols-3">
          {[
            ["Total reservations", "02"],
            ["Awaiting confirmation", "01"],
            ["Confirmed reservations", "01"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-gray-100 bg-white p-6">
              <p className="text-sm text-gray-500">{label}</p>
              <h2 className="mt-3 text-3xl font-bold text-[#171717]">{value}</h2>
            </div>
          ))}
        </div>

        <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-xl font-bold text-[#171717]">Reservations</h2>
              <p className="mt-2 text-sm text-gray-500">
                View and filter your booking requests.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3">
              <Search size={17} className="text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search bookings..."
                className="w-full text-sm outline-none sm:w-56"
              />
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-5 py-3 text-sm font-semibold ${
                  activeTab === tab
                    ? "bg-[#171717] text-white"
                    : "border border-gray-200 text-gray-500 hover:border-[#b18c4d]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-7 space-y-4">
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-sm text-gray-500">
                No reservations match your search.
              </div>
            ) : (
              filtered.map((booking) => (
                <article key={booking.id} className="rounded-2xl border border-gray-100 p-5">
                  <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-bold text-[#171717]">{booking.vehicle}</h3>
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                          booking.status === "Confirmed"
                            ? "bg-green-50 text-green-700"
                            : "bg-amber-50 text-amber-700"
                        }`}>
                          {booking.status}
                        </span>
                      </div>

                      <p className="mt-2 text-xs text-gray-400">
                        Booking reference: {booking.id}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-5 text-xs text-gray-500">
                        <span className="flex items-center gap-2"><CalendarDays size={15} /> {booking.date}</span>
                        <span className="flex items-center gap-2"><MapPin size={15} /> {booking.location}</span>
                        <span className="flex items-center gap-2"><CarFront size={15} /> {booking.service}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-5 border-t border-gray-100 pt-4 lg:border-0 lg:pt-0">
                      <div>
                        <p className="text-xs text-gray-400">Booking amount</p>
                        <p className="mt-1 text-lg font-bold text-[#171717]">{booking.amount}</p>
                      </div>
                      <button type="button" className="flex items-center gap-1 text-sm font-semibold text-[#a47f43]">
                        Details <ChevronRight size={17} />
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        <div className="mt-7 flex items-center gap-3 rounded-2xl border border-[#eadfc9] bg-[#fbf8f2] p-5">
          <Clock3 className="shrink-0 text-[#a47f43]" size={22} />
          <p className="text-sm leading-6 text-gray-600">
            Reservation data and status changes are sample interface data until the booking API is connected.
          </p>
        </div>

        <Link to="/partner/dashboard" className="mt-7 inline-flex text-sm font-semibold text-[#a47f43]">
          Back to partner dashboard
        </Link>
      </div>
    </main>
  );
}

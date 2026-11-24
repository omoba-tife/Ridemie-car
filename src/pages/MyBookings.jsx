
import { Link } from "react-router-dom";
import { CalendarDays, CarFront, ArrowRight, Search } from "lucide-react";

export default function MyBookings() {
  return (
    <main className="min-h-screen bg-[#f7f7f5] px-5 py-14 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#ad894d]">
          Customer portal
        </p>
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-bold text-[#171717] sm:text-4xl">My bookings</h1>
            <p className="mt-3 text-sm text-gray-500">
              Track and manage all your RideMie reservations.
            </p>
          </div>
          <Link to="/booking" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#b18c4d] px-6 py-4 text-sm font-bold text-white">
            Book a vehicle <ArrowRight size={17} />
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {["All bookings", "Upcoming", "Completed", "Cancelled"].map((tab, index) => (
            <button
              key={tab}
              className={`rounded-full px-5 py-3 text-sm font-semibold ${
                index === 0
                  ? "bg-[#171717] text-white"
                  : "border border-gray-200 bg-white text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center sm:px-12">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#f6f0e5] text-[#a47f43]">
            <CalendarDays size={34} />
          </div>
          <h2 className="text-2xl font-bold text-[#171717]">Your journeys will appear here</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-gray-500">
            Once you make a reservation, you will be able to see its details,
            pickup information, payment status and booking history here.
          </p>
          <Link to="/fleet" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#171717] px-6 py-4 text-sm font-bold text-white">
            <CarFront size={18} /> Explore our fleet
          </Link>
        </div>
      </div>
    </main>
  );
}

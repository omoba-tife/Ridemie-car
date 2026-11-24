
import { Link, useParams } from "react-router-dom";
import {
  CalendarDays,
  MapPin,
  CarFront,
  Clock3,
  UserRound,
  CreditCard,
  ArrowLeft,
  Phone,
} from "lucide-react";

export default function BookingDetails() {
  const { id } = useParams();

  return (
    <main className="min-h-screen bg-[#f7f7f5] px-5 py-14 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Link to="/my-bookings" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#a47f43]">
          <ArrowLeft size={17} /> Back to bookings
        </Link>

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#ad894d]">
              Reservation overview
            </p>
            <h1 className="text-3xl font-bold text-[#171717] sm:text-4xl">
              Booking details
            </h1>
            <p className="mt-3 text-sm text-gray-500">
              Reference: {id}
            </p>
          </div>
          <span className="w-fit rounded-full bg-amber-50 px-4 py-2 text-xs font-bold text-amber-700">
            Demonstration booking
          </span>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
          <div className="space-y-7">
            <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
              <img
                src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1400&q=85"
                alt="Mercedes-Benz GLE"
                className="h-72 w-full object-cover"
              />
              <div className="p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-wider text-[#ad894d]">
                  Luxury SUV
                </p>
                <h2 className="mt-2 text-2xl font-bold text-[#171717]">
                  Mercedes-Benz GLE
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Chauffeur service · Automatic transmission
                </p>
              </div>
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
              <h2 className="mb-7 text-xl font-bold text-[#171717]">Journey information</h2>

              <div className="grid gap-7 sm:grid-cols-2">
                <div className="flex gap-4">
                  <div className="h-fit rounded-xl bg-[#f6f0e5] p-3 text-[#a47f43]">
                    <CalendarDays size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Pickup date</p>
                    <p className="mt-2 text-sm font-semibold text-[#171717]">To be confirmed</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-fit rounded-xl bg-[#f6f0e5] p-3 text-[#a47f43]">
                    <Clock3 size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Pickup time</p>
                    <p className="mt-2 text-sm font-semibold text-[#171717]">To be confirmed</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-fit rounded-xl bg-[#f6f0e5] p-3 text-[#a47f43]">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Pickup location</p>
                    <p className="mt-2 text-sm font-semibold text-[#171717]">Not provided</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-fit rounded-xl bg-[#f6f0e5] p-3 text-[#a47f43]">
                    <CarFront size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Service type</p>
                    <p className="mt-2 text-sm font-semibold text-[#171717]">Chauffeur service</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
              <h2 className="mb-5 text-xl font-bold text-[#171717]">Customer information</h2>
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-[#f6f0e5] p-3 text-[#a47f43]">
                  <UserRound size={22} />
                </div>
                <div>
                  <p className="font-semibold text-[#171717]">Customer details pending</p>
                  <p className="mt-1 text-sm text-gray-500">Your booking information will appear here.</p>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-2xl border border-gray-100 bg-white p-7">
              <h2 className="text-xl font-bold text-[#171717]">Payment summary</h2>
              <div className="mt-7 flex items-center justify-between text-sm text-gray-500">
                <span>Vehicle rental</span>
                <span>Pending</span>
              </div>
              <div className="mt-5 flex items-center justify-between text-sm text-gray-500">
                <span>Additional charges</span>
                <span>Pending</span>
              </div>
              <div className="mt-6 border-t border-gray-100 pt-6">
                <p className="text-xs text-gray-400">Estimated total</p>
                <h3 className="mt-2 text-3xl font-bold text-[#171717]">₦—</h3>
              </div>
              <div className="mt-6 flex items-center gap-2 rounded-xl bg-amber-50 p-4 text-xs leading-5 text-amber-800">
                <CreditCard size={18} />
                Payment information is not yet connected.
              </div>
            </section>

            <section className="rounded-2xl bg-[#171717] p-7 text-white">
              <h2 className="text-lg font-bold">Need assistance?</h2>
              <p className="mt-3 text-sm leading-6 text-white/60">
                Our support team will help you with booking questions and changes.
              </p>
              <Link to="/contact" className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-sm font-semibold text-[#d8bd88]">
                Contact support <Phone size={17} />
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

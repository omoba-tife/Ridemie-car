
import { Link } from "react-router-dom";
import {
  CarFront,
  Wallet,
  CalendarDays,
  TrendingUp,
  Plus,
  ArrowUpRight,
  Clock3,
  ChevronRight,
  CircleDollarSign,
} from "lucide-react";

const stats = [
  { label: "Listed vehicles", value: "00", icon: CarFront },
  { label: "Active bookings", value: "00", icon: CalendarDays },
  { label: "Total earnings", value: "₦0", icon: Wallet },
  { label: "Monthly growth", value: "0%", icon: TrendingUp },
];

export default function PartnerDashboard() {
  return (
    <main className="min-h-screen bg-[#f7f7f5] px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#ad894d]">
              Partner workspace
            </p>
            <h1 className="text-3xl font-bold text-[#171717] sm:text-4xl">
              Partner dashboard
            </h1>
            <p className="mt-3 text-sm text-gray-500">
              Manage your fleet, reservations and earnings in one place.
            </p>
          </div>

          <Link
            to="/partner/add-vehicle"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#b18c4d] px-6 py-4 text-sm font-bold text-white hover:bg-[#98743e]"
          >
            <Plus size={18} /> Add a vehicle
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-2xl border border-gray-100 bg-white p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <div className="rounded-xl bg-[#f6f0e5] p-3 text-[#a47f43]">
                    <Icon size={20} />
                  </div>
                </div>
                <h2 className="mt-6 text-3xl font-bold text-[#171717]">{stat.value}</h2>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
          <section className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#171717]">Recent reservations</h2>
                <p className="mt-2 text-sm text-gray-500">Recent activity from your vehicles</p>
              </div>
              <Link to="/partner/bookings" className="text-sm font-semibold text-[#a47f43]">
                View all
              </Link>
            </div>

            <div className="py-14 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f6f0e5] text-[#a47f43]">
                <CalendarDays size={28} />
              </div>
              <h3 className="mt-5 font-bold text-[#171717]">No reservations yet</h3>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                Once customers book your vehicles, reservation details and requests will appear here.
              </p>
            </div>
          </section>

          <div className="space-y-6">
            <section className="rounded-2xl bg-[#171717] p-7 text-white">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[#d8bd88]">
                <CircleDollarSign size={25} />
              </div>
              <p className="text-sm text-white/60">Available earnings</p>
              <h2 className="mt-2 text-3xl font-bold">₦0.00</h2>
              <p className="mt-3 text-xs leading-6 text-white/50">
                Your earnings and withdrawal balance will be calculated after completed bookings.
              </p>
              <Link to="/partner/earnings" className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-sm font-semibold text-[#d8bd88]">
                View earnings <ArrowUpRight size={18} />
              </Link>
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white p-7">
              <h2 className="mb-5 text-lg font-bold text-[#171717]">Partner shortcuts</h2>
              <div className="space-y-5">
                <Link to="/partner/vehicles" className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center gap-3"><CarFront size={18} /> My vehicles</span>
                  <ChevronRight size={17} />
                </Link>
                <Link to="/partner/bookings" className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center gap-3"><Clock3 size={18} /> Reservations</span>
                  <ChevronRight size={17} />
                </Link>
                <Link to="/partner/earnings" className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center gap-3"><Wallet size={18} /> Earnings</span>
                  <ChevronRight size={17} />
                </Link>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-[#eadfc9] bg-[#fbf8f2] p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-[#171717]">Grow your vehicle business with RideMie</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                List eligible vehicles, receive booking requests and manage your business from one workspace.
              </p>
            </div>
            <Link to="/partner/add-vehicle" className="inline-flex items-center gap-2 text-sm font-bold text-[#a47f43]">
              List your first vehicle <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          Demonstration dashboard. Live partner information will be loaded from the backend later.
        </p>
      </div>
    </main>
  );
}

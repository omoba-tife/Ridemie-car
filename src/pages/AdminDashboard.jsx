
import {
  Users,
  CarFront,
  CalendarCheck,
  Wallet,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
  Eye,
  Building2,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  {
    title: "Total Revenue",
    value: "₦18.45M",
    change: "+12.8%",
    positive: true,
    icon: Wallet,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Total Bookings",
    value: "1,284",
    change: "+8.2%",
    positive: true,
    icon: CalendarCheck,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Registered Users",
    value: "3,642",
    change: "+15.4%",
    positive: true,
    icon: Users,
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Active Vehicles",
    value: "186",
    change: "-2.4%",
    positive: false,
    icon: CarFront,
    color: "bg-amber-50 text-amber-600",
  },
];

const bookings = [
  {
    id: "RM-2048",
    customer: "Daniel Johnson",
    vehicle: "Mercedes-Benz GLE",
    amount: "₦180,000",
    status: "Confirmed",
  },
  {
    id: "RM-2047",
    customer: "Amara Williams",
    vehicle: "Range Rover Sport",
    amount: "₦220,000",
    status: "Pending",
  },
  {
    id: "RM-2046",
    customer: "Michael Ade",
    vehicle: "Porsche 911",
    amount: "₦350,000",
    status: "Completed",
  },
  {
    id: "RM-2045",
    customer: "Grace Okafor",
    vehicle: "BMW 5 Series",
    amount: "₦160,000",
    status: "Cancelled",
  },
];

const activities = [
  {
    title: "New partner registration",
    description: "A new vehicle partner joined RideMie.",
    time: "12 minutes ago",
    icon: Building2,
    color: "text-blue-600 bg-blue-50",
  },
  {
    title: "Vehicle submitted",
    description: "A Mercedes-Benz vehicle needs approval.",
    time: "35 minutes ago",
    icon: CarFront,
    color: "text-amber-600 bg-amber-50",
  },
  {
    title: "Booking completed",
    description: "Booking RM-2046 was completed successfully.",
    time: "1 hour ago",
    icon: CheckCircle2,
    color: "text-emerald-600 bg-emerald-50",
  },
];

function statusStyle(status) {
  const styles = {
    Confirmed: "bg-blue-50 text-blue-700",
    Pending: "bg-amber-50 text-amber-700",
    Completed: "bg-emerald-50 text-emerald-700",
    Cancelled: "bg-red-50 text-red-700",
  };

  return styles[status] || "bg-gray-100 text-gray-600";
}

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#F7F8FA] text-slate-900">
      <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-10">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-600">
              <ShieldCheck size={17} />
              RIDEMIE ADMINISTRATION
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Dashboard overview
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Monitor platform performance and manage your operations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
              Platform overview
            </span>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#111827] font-bold text-white">
              A
            </div>
          </div>
        </div>

        <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>
                    <h2 className="mt-3 text-2xl font-bold">{stat.value}</h2>
                  </div>
                  <div className={`rounded-xl p-3 ${stat.color}`}>
                    <Icon size={22} />
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 text-xs">
                  <span
                    className={`flex items-center gap-1 font-semibold ${
                      stat.positive ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {stat.positive ? (
                      <ArrowUpRight size={15} />
                    ) : (
                      <ArrowDownRight size={15} />
                    )}
                    {stat.change}
                  </span>
                  <span className="text-slate-400">vs last month</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mb-8 grid gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm xl:col-span-2">
            <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold">Revenue overview</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Demonstration revenue figures
                </p>
              </div>
              <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none">
                <option>Last 7 months</option>
                <option>Last 30 days</option>
                <option>This year</option>
              </select>
            </div>

            <div className="flex h-56 items-end justify-between gap-3 border-b border-slate-100 px-1">
              {[38, 55, 44, 72, 62, 86, 100].map((height, index) => (
                <div
                  key={index}
                  className="flex h-full flex-1 flex-col justify-end"
                >
                  <div
                    className="w-full rounded-t-lg bg-[#C6A66B] transition-colors hover:bg-[#A9894D]"
                    style={{ height: `${height}%` }}
                  />
                </div>
              ))}
            </div>

            <div className="mt-3 flex justify-between text-xs text-slate-400">
              {["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"].map(
                (month) => (
                  <span key={month}>{month}</span>
                )
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold">Platform activity</h2>
            <p className="mt-1 text-sm text-slate-500">
              Latest administrative updates
            </p>

            <div className="mt-6 space-y-6">
              {activities.map((activity) => {
                const Icon = activity.icon;

                return (
                  <div key={activity.title} className="flex gap-3">
                    <div className={`h-fit rounded-xl p-3 ${activity.color}`}>
                      <Icon size={19} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">
                        {activity.title}
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {activity.description}
                      </p>
                      <span className="mt-2 block text-[11px] text-slate-400">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">Recent bookings</h2>
              <p className="mt-1 text-sm text-slate-500">
                Latest customer reservations
              </p>
            </div>
            <Link
              to="/admin/bookings"
              className="text-sm font-semibold text-amber-700 hover:text-amber-800"
            >
              View all bookings →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400">
                  <th className="pb-4 font-semibold">Booking ID</th>
                  <th className="pb-4 font-semibold">Customer</th>
                  <th className="pb-4 font-semibold">Vehicle</th>
                  <th className="pb-4 font-semibold">Amount</th>
                  <th className="pb-4 font-semibold">Status</th>
                  <th className="pb-4 font-semibold">Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-slate-50 last:border-0"
                  >
                    <td className="py-5 text-sm font-semibold">
                      {booking.id}
                    </td>
                    <td className="py-5 text-sm">{booking.customer}</td>
                    <td className="py-5 text-sm text-slate-500">
                      {booking.vehicle}
                    </td>
                    <td className="py-5 text-sm font-semibold">
                      {booking.amount}
                    </td>
                    <td className="py-5">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyle(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-5">
                      <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Manage users",
              description: "Review customers and vehicle partners.",
              link: "/admin/users",
              icon: Users,
            },
            {
              title: "Review vehicles",
              description: "Manage vehicle listings and approvals.",
              link: "/admin/vehicles",
              icon: CarFront,
            },
            {
              title: "Manage bookings",
              description: "Monitor reservations and their status.",
              link: "/admin/bookings",
              icon: CalendarCheck,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                to={item.link}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:border-amber-300"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-amber-50 p-3 text-amber-700">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="text-slate-400" size={19} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

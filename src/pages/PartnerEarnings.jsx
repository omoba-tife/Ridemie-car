
import { Link } from "react-router-dom";
import {
  Wallet,
  TrendingUp,
  ArrowDownToLine,
  CalendarDays,
  CircleDollarSign,
  ArrowUpRight,
} from "lucide-react";

const monthlyData = [
  { month: "Jan", value: 35 },
  { month: "Feb", value: 55 },
  { month: "Mar", value: 42 },
  { month: "Apr", value: 75 },
  { month: "May", value: 60 },
  { month: "Jun", value: 90 },
  { month: "Jul", value: 68 },
  { month: "Aug", value: 100 },
  { month: "Sep", value: 78 },
  { month: "Oct", value: 88 },
  { month: "Nov", value: 55 },
  { month: "Dec", value: 70 },
];

export default function PartnerEarnings() {
  return (
    <main className="min-h-screen bg-[#f7f7f5] px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#ad894d]">
          Partner finances
        </p>
        <h1 className="text-3xl font-bold text-[#171717] sm:text-4xl">
          Earnings overview
        </h1>
        <p className="mt-3 text-sm text-gray-500">
          Monitor revenue, payouts and your vehicle business performance.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Total earnings", value: "₦0.00", icon: Wallet },
            { label: "Available balance", value: "₦0.00", icon: CircleDollarSign },
            { label: "Pending payouts", value: "₦0.00", icon: CalendarDays },
            { label: "Monthly growth", value: "0%", icon: TrendingUp },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-2xl border border-gray-100 bg-white p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <div className="rounded-xl bg-[#f6f0e5] p-3 text-[#a47f43]">
                    <Icon size={20} />
                  </div>
                </div>
                <h2 className="mt-6 text-3xl font-bold text-[#171717]">{item.value}</h2>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
          <section className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#171717]">Revenue overview</h2>
                <p className="mt-2 text-sm text-gray-500">Illustrative monthly performance</p>
              </div>
              <span className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-500">
                This year · Demo
              </span>
            </div>

            <div className="mt-10 flex h-64 items-end gap-2 sm:gap-4">
              {monthlyData.map((item) => (
                <div key={item.month} className="flex h-full flex-1 flex-col items-center justify-end gap-3">
                  <div className="flex w-full flex-1 items-end">
                    <div
                      style={{ height: `${item.value}%` }}
                      className="w-full rounded-t-md bg-[#b18c4d]/80 transition hover:bg-[#98743e]"
                      title={`${item.month}: illustrative`}
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 sm:text-xs">{item.month}</span>
                </div>
              ))}
            </div>

            <p className="mt-5 text-xs leading-5 text-gray-400">
              The bars are illustrative only and do not represent actual earnings.
            </p>
          </section>

          <section className="rounded-2xl bg-[#171717] p-7 text-white">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[#d8bd88]">
              <Wallet size={24} />
            </div>
            <p className="text-sm text-white/60">Available for withdrawal</p>
            <h2 className="mt-3 text-3xl font-bold">₦0.00</h2>
            <p className="mt-4 text-sm leading-6 text-white/55">
              Withdrawals will become available after verified bookings are completed and earnings are released.
            </p>
            <Link to="/partner/withdrawals" className="mt-7 flex items-center justify-between rounded-xl bg-[#b18c4d] px-5 py-4 text-sm font-bold text-white">
              Manage withdrawals <ArrowUpRight size={18} />
            </Link>
          </section>
        </div>

        <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#171717]">Recent transactions</h2>
              <p className="mt-2 text-sm text-gray-500">Your earnings and payout records.</p>
            </div>
            <ArrowDownToLine className="text-gray-400" size={22} />
          </div>

          <div className="py-12 text-center">
            <CircleDollarSign className="mx-auto text-[#b18c4d]" size={35} />
            <h3 className="mt-4 font-bold text-[#171717]">No transactions yet</h3>
            <p className="mt-2 text-sm text-gray-500">
              Your completed booking earnings will appear here.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

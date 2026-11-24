
import {
  TrendingUp,
  Users,
  CarFront,
  CalendarCheck,
  CircleDollarSign,
  Activity,
} from "lucide-react";
import AdminPageHeader from "../components/admin/AdminPageHeader";
import AdminStatCard from "../components/admin/AdminStatCard";

const monthlyPerformance = [
  { month: "Jun", bookings: 24, revenue: 3200000 },
  { month: "Jul", bookings: 32, revenue: 4500000 },
  { month: "Aug", bookings: 41, revenue: 5800000 },
  { month: "Sep", bookings: 38, revenue: 5100000 },
  { month: "Oct", bookings: 53, revenue: 7400000 },
  { month: "Nov", bookings: 61, revenue: 8900000 },
];

const categories = [
  { name: "Luxury SUVs", percentage: 42, count: 42 },
  { name: "Executive Sedans", percentage: 28, count: 28 },
  { name: "Sports Cars", percentage: 18, count: 18 },
  { name: "Other Vehicles", percentage: 12, count: 12 },
];

const money = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

export default function AdminAnalytics() {
  const maxBookings = Math.max(
    ...monthlyPerformance.map((item) => item.bookings)
  );

  const maxRevenue = Math.max(
    ...monthlyPerformance.map((item) => item.revenue)
  );

  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader
        title="Platform Analytics"
        description="Understand platform growth, vehicle demand, booking patterns and revenue performance."
      />

      <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          title="Platform Revenue"
          value={money(8900000)}
          icon={CircleDollarSign}
          change="Latest sample month"
        />
        <AdminStatCard
          title="Total Customers"
          value="193"
          icon={Users}
          change="Sample platform data"
        />
        <AdminStatCard
          title="Active Vehicles"
          value="48"
          icon={CarFront}
          description="Illustrative inventory"
        />
        <AdminStatCard
          title="Monthly Bookings"
          value="61"
          icon={CalendarCheck}
          change="November sample"
        />
      </div>

      <div className="mb-7 grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-gray-900">Booking Growth</h2>
              <p className="mt-1 text-xs text-gray-400">
                Monthly booking volume
              </p>
            </div>
            <TrendingUp className="text-[#A18450]" size={21} />
          </div>

          <div className="flex h-56 items-end justify-between gap-3 border-b border-gray-100 pb-2">
            {monthlyPerformance.map((item) => (
              <div
                key={item.month}
                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <span className="text-[10px] font-bold text-gray-500">
                  {item.bookings}
                </span>
                <div
                  className="w-full max-w-12 rounded-t-lg bg-[#C9A96E] transition-all"
                  style={{
                    height: `${(item.bookings / maxBookings) * 78}%`,
                  }}
                />
                <span className="text-xs text-gray-400">{item.month}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-gray-900">Revenue Performance</h2>
              <p className="mt-1 text-xs text-gray-400">
                Monthly revenue in naira
              </p>
            </div>
            <Activity className="text-[#A18450]" size={21} />
          </div>

          <div className="space-y-5">
            {monthlyPerformance.map((item) => (
              <div key={item.month}>
                <div className="mb-2 flex justify-between text-xs">
                  <span className="font-medium text-gray-600">{item.month}</span>
                  <span className="font-bold text-gray-800">
                    {money(item.revenue)}
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-[#171717]"
                    style={{
                      width: `${(item.revenue / maxRevenue) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6">
          <h2 className="font-bold text-gray-900">Vehicle Category Demand</h2>
          <p className="mt-1 text-xs text-gray-400">
            Illustrative distribution of booking interest
          </p>
        </div>

        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category.name}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-gray-700">
                  {category.name}
                </span>
                <span className="text-sm font-bold text-gray-800">
                  {category.percentage}%
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-[#C9A96E]"
                  style={{ width: `${category.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

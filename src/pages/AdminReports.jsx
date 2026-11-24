
import { useMemo, useState } from "react";
import {
  Download,
  FileText,
  CarFront,
  Users,
  CircleDollarSign,
  CalendarDays,
} from "lucide-react";
import AdminPageHeader from "../components/admin/AdminPageHeader";
import AdminStatCard from "../components/admin/AdminStatCard";

const reportData = [
  { month: "June", bookings: 24, revenue: 3200000, customers: 18 },
  { month: "July", bookings: 32, revenue: 4500000, customers: 25 },
  { month: "August", bookings: 41, revenue: 5800000, customers: 31 },
  { month: "September", bookings: 38, revenue: 5100000, customers: 29 },
  { month: "October", bookings: 53, revenue: 7400000, customers: 42 },
  { month: "November", bookings: 61, revenue: 8900000, customers: 48 },
];

const formatMoney = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

export default function AdminReports() {
  const [period, setPeriod] = useState("6");

  const visibleData = useMemo(() => {
    return reportData.slice(-Number(period));
  }, [period]);

  const totals = visibleData.reduce(
    (result, item) => ({
      bookings: result.bookings + item.bookings,
      revenue: result.revenue + item.revenue,
      customers: result.customers + item.customers,
    }),
    { bookings: 0, revenue: 0, customers: 0 }
  );

  const exportReport = () => {
    const header = ["Month", "Bookings", "Revenue (NGN)", "Customers"];
    const rows = visibleData.map((item) => [
      item.month,
      item.bookings,
      item.revenue,
      item.customers,
    ]);

    const csv = [header, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ridemie-platform-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const maxRevenue = Math.max(...visibleData.map((item) => item.revenue));

  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader
        title="Platform Reports"
        description="Review RideMie's business performance, bookings, customer activity and revenue."
        action={
          <button
            onClick={exportReport}
            className="inline-flex items-center gap-2 rounded-xl bg-[#171717] px-4 py-3 text-sm font-semibold text-white hover:bg-black"
          >
            <Download size={16} />
            Export Report
          </button>
        }
      />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-white p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <CalendarDays size={18} className="text-[#A18450]" />
          Reporting period
        </div>

        <select
          value={period}
          onChange={(event) => setPeriod(event.target.value)}
          className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#C9A96E]"
        >
          <option value="3">Last 3 months</option>
          <option value="6">Last 6 months</option>
        </select>
      </div>

      <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <AdminStatCard
          title="Total Bookings"
          value={totals.bookings.toLocaleString()}
          icon={CarFront}
          description="Selected reporting period"
        />
        <AdminStatCard
          title="Total Revenue"
          value={formatMoney(totals.revenue)}
          icon={CircleDollarSign}
          description="Illustrative revenue figures"
        />
        <AdminStatCard
          title="Customer Activity"
          value={totals.customers.toLocaleString()}
          icon={Users}
          description="Monthly customer counts added together"
        />
      </div>

      <section className="mb-7 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6">
          <h2 className="font-bold text-gray-900">Monthly Revenue Report</h2>
          <p className="mt-1 text-xs text-gray-400">
            Revenue comparison across the selected months
          </p>
        </div>

        <div className="space-y-5">
          {visibleData.map((item) => (
            <div key={item.month}>
              <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                <span className="font-medium text-gray-600">{item.month}</span>
                <span className="font-bold text-gray-800">
                  {formatMoney(item.revenue)}
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-[#C9A96E] transition-all"
                  style={{
                    width: `${(item.revenue / maxRevenue) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-5">
          <div className="flex items-center gap-2">
            <FileText size={19} className="text-[#A18450]" />
            <h2 className="font-bold text-gray-900">Detailed Monthly Report</h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left">
            <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-400">
              <tr>
                <th className="px-5 py-4">Month</th>
                <th className="px-5 py-4">Bookings</th>
                <th className="px-5 py-4">Revenue</th>
                <th className="px-5 py-4">Customers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {visibleData.map((item) => (
                <tr key={item.month}>
                  <td className="px-5 py-4 text-sm font-semibold text-gray-800">
                    {item.month} 2026
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {item.bookings}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-gray-800">
                    {formatMoney(item.revenue)}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {item.customers}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

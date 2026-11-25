
import { useMemo, useState } from "react";
import {
  Activity, Search, Download, CalendarDays,
  User, Car, CreditCard, ShieldCheck,
  AlertTriangle, Clock
} from "lucide-react";

const initialActivities = [
  { id: 1, actor: "Admin", action: "Approved a vehicle partner", target: "Partner #PT102", type: "Partner", date: "2026-11-25 09:30", status: "Success" },
  { id: 2, actor: "Customer", action: "Created a new booking", target: "Booking #BK1042", type: "Booking", date: "2026-11-25 09:15", status: "Success" },
  { id: 3, actor: "System", action: "Payment verification completed", target: "Transaction #TX302", type: "Payment", date: "2026-11-25 08:50", status: "Success" },
  { id: 4, actor: "Admin", action: "Updated platform settings", target: "General Settings", type: "System", date: "2026-11-24 16:20", status: "Success" },
  { id: 5, actor: "Customer", action: "Submitted a support complaint", target: "Ticket #SP091", type: "Support", date: "2026-11-24 14:10", status: "Pending" },
  { id: 6, actor: "System", action: "Failed payment attempt recorded", target: "Transaction #TX299", type: "Payment", date: "2026-11-24 12:45", status: "Failed" },
  { id: 7, actor: "Partner", action: "Submitted a new vehicle", target: "Vehicle #VH204", type: "Vehicle", date: "2026-11-24 11:30", status: "Pending" },
];

const activityIcons = {
  Booking: CalendarDays,
  Payment: CreditCard,
  Partner: User,
  Vehicle: Car,
  Support: AlertTriangle,
  System: ShieldCheck,
};

export default function AdminActivity() {
  const [activities] = useState(initialActivities);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");

  const filtered = useMemo(() => activities.filter((item) => {
    const term = `${item.actor} ${item.action} ${item.target}`.toLowerCase();
    return (
      term.includes(search.toLowerCase()) &&
      (type === "All" || item.type === type) &&
      (status === "All" || item.status === status)
    );
  }), [activities, search, type, status]);

  const exportCSV = () => {
    const headers = ["Actor", "Action", "Target", "Type", "Date", "Status"];
    const rows = filtered.map((item) => [
      item.actor, item.action, item.target, item.type, item.date, item.status
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ridemie-activity-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const successCount = activities.filter((a) => a.status === "Success").length;
  const pendingCount = activities.filter((a) => a.status === "Pending").length;
  const failedCount = activities.filter((a) => a.status === "Failed").length;

  return (
    <div className="min-h-screen space-y-7 bg-slate-100 p-4 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-amber-600">Platform monitoring</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Activity Centre</h1>
          <p className="mt-2 text-sm text-slate-500">Review recorded operational events across RideMie.</p>
        </div>

        <button onClick={exportCSV} className="flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white">
          <Download size={18} /> Export Activity
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total Activities", value: activities.length, icon: Activity },
          { label: "Successful Events", value: successCount, icon: ShieldCheck },
          { label: "Pending Events", value: pendingCount, icon: Clock },
          { label: "Failed Events", value: failedCount, icon: AlertTriangle },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">{stat.label}</p>
              <stat.icon size={20} className="text-amber-500" />
            </div>
            <p className="mt-3 text-3xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 lg:flex-row">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search activities, users or references..."
            className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-amber-500"
          />
        </div>

        <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 text-sm">
          <option>All</option>
          <option>Booking</option>
          <option>Payment</option>
          <option>Partner</option>
          <option>Vehicle</option>
          <option>Support</option>
          <option>System</option>
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 text-sm">
          <option>All</option>
          <option>Success</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5">
          <div>
            <h2 className="font-bold text-slate-900">Platform Activity Log</h2>
            <p className="mt-1 text-xs text-slate-500">{filtered.length} activities displayed</p>
          </div>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">Demo activity data</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="p-4">Activity</th>
                <th className="p-4">Actor</th>
                <th className="p-4">Reference</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => {
                const Icon = activityIcons[item.type] || Activity;

                return (
                  <tr key={item.id}>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-slate-100 p-2.5 text-slate-600">
                          <Icon size={18} />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{item.action}</p>
                          <p className="mt-1 text-xs text-slate-500">{item.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">{item.actor}</td>
                    <td className="p-4 font-medium text-slate-700">{item.target}</td>
                    <td className="p-4 text-slate-500">{item.date}</td>
                    <td className="p-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                        item.status === "Success"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-slate-500">
                    No matching activities found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

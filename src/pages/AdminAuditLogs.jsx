
import { useMemo, useState } from "react";
import {
  Search, Activity, ShieldCheck, Users,
  CarFront, CreditCard, Download
} from "lucide-react";

const logs = [
  { id: 1, user: "Admin Tife", role: "Super Admin", action: "Approved partner application", target: "Elite Auto Rentals", category: "Partners", date: "Nov 24, 2026", time: "10:42 AM", status: "Successful" },
  { id: 2, user: "Admin Tife", role: "Super Admin", action: "Updated commission rate", target: "Partner Commission", category: "Finance", date: "Nov 24, 2026", time: "09:18 AM", status: "Successful" },
  { id: 3, user: "System", role: "System", action: "Booking status updated", target: "RDM-2041", category: "Bookings", date: "Nov 23, 2026", time: "06:35 PM", status: "Successful" },
  { id: 4, user: "Admin Sarah", role: "Platform Admin", action: "Suspended vehicle listing", target: "Toyota Camry", category: "Vehicles", date: "Nov 23, 2026", time: "02:12 PM", status: "Successful" },
  { id: 5, user: "Admin Tife", role: "Super Admin", action: "Changed platform settings", target: "Booking Configuration", category: "Settings", date: "Nov 22, 2026", time: "11:05 AM", status: "Successful" },
  { id: 6, user: "System", role: "System", action: "Payment verification failed", target: "TXN-83021", category: "Finance", date: "Nov 22, 2026", time: "08:44 AM", status: "Failed" },
  { id: 7, user: "Admin Sarah", role: "Platform Admin", action: "Reviewed customer complaint", target: "DSP-1001", category: "Support", date: "Nov 21, 2026", time: "04:20 PM", status: "Successful" },
];

export default function AdminAuditLogs() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);

  const filteredLogs = useMemo(() => logs.filter((log) => {
    const query = search.toLowerCase();

    const matchesSearch =
      log.user.toLowerCase().includes(query) ||
      log.action.toLowerCase().includes(query) ||
      log.target.toLowerCase().includes(query);

    return matchesSearch && (category === "All" || log.category === category);
  }), [search, category]);

  const exportCSV = () => {
    const headers = ["User", "Role", "Action", "Target", "Category", "Date", "Time", "Status"];
    const rows = filteredLogs.map(log => [
      log.user, log.role, log.action, log.target,
      log.category, log.date, log.time, log.status
    ]);

    const csv = [
      headers,
      ...rows
    ].map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ridemie-audit-logs.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const categories = ["All", "Partners", "Finance", "Bookings", "Vehicles", "Settings", "Support"];

  const categoryIcon = {
    Partners: Users,
    Finance: CreditCard,
    Bookings: Activity,
    Vehicles: CarFront,
    Settings: ShieldCheck,
    Support: Activity,
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-7">

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">Security and accountability</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Audit Logs</h1>
            <p className="mt-2 text-sm text-slate-500">Review recorded platform activities and administrative actions.</p>
          </div>

          <button onClick={exportCSV} className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">
            <Download size={17} />
            Export CSV
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <Activity size={22} className="text-amber-600" />
            <p className="mt-4 text-sm text-slate-500">Total Activities</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">{logs.length}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <ShieldCheck size={22} className="text-green-600" />
            <p className="mt-4 text-sm text-slate-500">Successful Actions</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">{logs.filter(log => log.status === "Successful").length}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <Activity size={22} className="text-red-600" />
            <p className="mt-4 text-sm text-slate-500">Failed Actions</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">{logs.filter(log => log.status === "Failed").length}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users, actions or targets..."
                className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-amber-500"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none"
            >
              {categories.map(item => <option key={item}>{item}</option>)}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400">
                  <th className="pb-4">User</th>
                  <th className="pb-4">Activity</th>
                  <th className="pb-4">Category</th>
                  <th className="pb-4">Date & Time</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => {
                  const Icon = categoryIcon[log.category] || Activity;

                  return (
                    <tr key={log.id} className="border-b border-slate-50 last:border-0">
                      <td className="py-5">
                        <p className="font-semibold text-slate-800">{log.user}</p>
                        <p className="mt-1 text-xs text-slate-400">{log.role}</p>
                      </td>
                      <td>
                        <p className="text-sm font-medium text-slate-700">{log.action}</p>
                        <p className="mt-1 text-xs text-slate-400">Target: {log.target}</p>
                      </td>
                      <td>
                        <span className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600">
                          <Icon size={14} />
                          {log.category}
                        </span>
                      </td>
                      <td>
                        <p className="text-sm text-slate-600">{log.date}</p>
                        <p className="mt-1 text-xs text-slate-400">{log.time}</p>
                      </td>
                      <td>
                        <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${log.status === "Successful" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="text-right">
                        <button onClick={() => setSelected(log)} className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50">
                          <Search size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredLogs.length === 0 && <p className="py-10 text-center text-sm text-slate-500">No activity records found.</p>}
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          These are demonstration audit records. Real security logs must be generated and stored by the backend, not by the browser.
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Activity Details</h2>
              <button onClick={() => setSelected(null)} className="text-2xl text-slate-400">×</button>
            </div>

            <div className="mt-6 space-y-4 text-sm">
              <p><span className="text-slate-400">User:</span> <strong>{selected.user}</strong></p>
              <p><span className="text-slate-400">Role:</span> <strong>{selected.role}</strong></p>
              <p><span className="text-slate-400">Action:</span> <strong>{selected.action}</strong></p>
              <p><span className="text-slate-400">Target:</span> <strong>{selected.target}</strong></p>
              <p><span className="text-slate-400">Category:</span> <strong>{selected.category}</strong></p>
              <p><span className="text-slate-400">Date:</span> <strong>{selected.date} at {selected.time}</strong></p>
              <p><span className="text-slate-400">Result:</span> <strong>{selected.status}</strong></p>
            </div>

            <button onClick={() => setSelected(null)} className="mt-6 w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

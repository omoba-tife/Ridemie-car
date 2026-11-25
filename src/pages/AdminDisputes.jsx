
import { useMemo, useState } from "react";
import {
  Search, AlertTriangle, Clock3, CheckCircle2,
  MessageSquare, Eye
} from "lucide-react";

const initialDisputes = [
  { id: "DSP-1001", customer: "David Johnson", partner: "Elite Auto Rentals", subject: "Vehicle condition complaint", booking: "RDM-2041", date: "Nov 22, 2026", priority: "High", status: "Open", description: "The customer reported that the vehicle was not in the expected condition at pickup." },
  { id: "DSP-1002", customer: "Sarah Williams", partner: "Daniel Motors", subject: "Refund request", booking: "RDM-2038", date: "Nov 21, 2026", priority: "Medium", status: "Under Review", description: "The customer is requesting a refund following a cancelled booking." },
  { id: "DSP-1003", customer: "Michael Brown", partner: "Prime Mobility", subject: "Late vehicle delivery", booking: "RDM-2030", date: "Nov 19, 2026", priority: "High", status: "Open", description: "The partner reportedly delivered the vehicle later than the agreed pickup time." },
  { id: "DSP-1004", customer: "Grace Adams", partner: "CityDrive Rentals", subject: "Payment disagreement", booking: "RDM-2024", date: "Nov 17, 2026", priority: "Low", status: "Resolved", description: "The customer questioned an additional charge on the final payment." },
];

export default function AdminDisputes() {
  const [disputes, setDisputes] = useState(initialDisputes);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => disputes.filter((item) => {
    const query = search.toLowerCase();
    const matchesSearch =
      item.id.toLowerCase().includes(query) ||
      item.customer.toLowerCase().includes(query) ||
      item.subject.toLowerCase().includes(query);

    return matchesSearch && (filter === "All" || item.status === filter);
  }), [disputes, search, filter]);

  const updateStatus = (id, status) => {
    setDisputes((current) =>
      current.map((item) => item.id === id ? { ...item, status } : item)
    );
    setSelected((current) => current?.id === id ? { ...current, status } : current);
  };

  const stats = [
    { label: "Total Disputes", value: disputes.length, icon: MessageSquare },
    { label: "Open Cases", value: disputes.filter(d => d.status === "Open").length, icon: AlertTriangle },
    { label: "Under Review", value: disputes.filter(d => d.status === "Under Review").length, icon: Clock3 },
    { label: "Resolved", value: disputes.filter(d => d.status === "Resolved").length, icon: CheckCircle2 },
  ];

  const statusStyle = {
    Open: "bg-red-100 text-red-700",
    "Under Review": "bg-amber-100 text-amber-700",
    Resolved: "bg-green-100 text-green-700",
  };

  const priorityStyle = {
    High: "text-red-600",
    Medium: "text-amber-600",
    Low: "text-slate-500",
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-7">

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">Customer protection</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Dispute Management</h1>
          <p className="mt-2 text-sm text-slate-500">Review complaints and manage booking-related disputes.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{label}</p>
                <Icon size={20} className="text-amber-600" />
              </div>
              <p className="mt-4 text-3xl font-bold text-slate-900">{value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search dispute ID, customer or subject..."
                className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-amber-500"
              />
            </div>
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none">
              <option>All</option>
              <option>Open</option>
              <option>Under Review</option>
              <option>Resolved</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400">
                  <th className="pb-4">Dispute</th>
                  <th className="pb-4">Customer</th>
                  <th className="pb-4">Partner</th>
                  <th className="pb-4">Priority</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Date</th>
                  <th className="pb-4 text-right">View</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-b border-slate-50 last:border-0">
                    <td className="py-5">
                      <p className="font-semibold text-slate-800">{item.subject}</p>
                      <p className="mt-1 text-xs text-slate-400">{item.id} · {item.booking}</p>
                    </td>
                    <td className="text-sm text-slate-600">{item.customer}</td>
                    <td className="text-sm text-slate-600">{item.partner}</td>
                    <td className={`text-sm font-semibold ${priorityStyle[item.priority]}`}>{item.priority}</td>
                    <td>
                      <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyle[item.status]}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="text-sm text-slate-500">{item.date}</td>
                    <td className="text-right">
                      <button onClick={() => setSelected(item)} className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50">
                        <Eye size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && <p className="py-10 text-center text-sm text-slate-500">No disputes found.</p>}
          </div>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-600">{selected.id}</p>
                <h2 className="mt-2 text-xl font-bold text-slate-900">{selected.subject}</h2>
              </div>
              <button onClick={() => setSelected(null)} className="text-2xl text-slate-400">×</button>
            </div>

            <div className="my-6 space-y-3 text-sm text-slate-600">
              <p><strong>Customer:</strong> {selected.customer}</p>
              <p><strong>Partner:</strong> {selected.partner}</p>
              <p><strong>Booking reference:</strong> {selected.booking}</p>
              <p><strong>Priority:</strong> {selected.priority}</p>
              <p><strong>Description:</strong> {selected.description}</p>
            </div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">Update case status</label>
            <select
              value={selected.status}
              onChange={(e) => updateStatus(selected.id, e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-amber-500"
            >
              <option>Open</option>
              <option>Under Review</option>
              <option>Resolved</option>
            </select>

            <button onClick={() => setSelected(null)} className="mt-5 w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-slate-800">
              Close details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

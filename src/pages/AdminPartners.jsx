
import { useMemo, useState } from "react";
import {
  Search, Users, CheckCircle2, Clock3, XCircle,
  ShieldCheck, Eye, Building2
} from "lucide-react";

const initialPartners = [
  { id: 1, name: "Daniel Motors", owner: "Daniel Okafor", email: "daniel@example.com", vehicles: 8, date: "Nov 18, 2026", status: "Pending" },
  { id: 2, name: "Elite Auto Rentals", owner: "Michael James", email: "michael@example.com", vehicles: 12, date: "Nov 17, 2026", status: "Approved" },
  { id: 3, name: "Prime Mobility", owner: "Samuel Ade", email: "samuel@example.com", vehicles: 5, date: "Nov 15, 2026", status: "Approved" },
  { id: 4, name: "Luxury Wheels NG", owner: "David Bello", email: "david@example.com", vehicles: 4, date: "Nov 14, 2026", status: "Pending" },
  { id: 5, name: "CityDrive Rentals", owner: "Emeka Nwosu", email: "emeka@example.com", vehicles: 7, date: "Nov 12, 2026", status: "Suspended" },
];

export default function AdminPartners() {
  const [partners, setPartners] = useState(initialPartners);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const filteredPartners = useMemo(() => {
    return partners.filter((partner) => {
      const matchesSearch =
        partner.name.toLowerCase().includes(search.toLowerCase()) ||
        partner.owner.toLowerCase().includes(search.toLowerCase()) ||
        partner.email.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter === "All" || partner.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [partners, search, filter]);

  const updateStatus = (id, status) => {
    setPartners((current) =>
      current.map((partner) =>
        partner.id === id ? { ...partner, status } : partner
      )
    );

    setSelected((current) =>
      current?.id === id ? { ...current, status } : current
    );
  };

  const stats = [
    { label: "Total Partners", value: partners.length, icon: Users },
    { label: "Approved", value: partners.filter(p => p.status === "Approved").length, icon: CheckCircle2 },
    { label: "Pending Review", value: partners.filter(p => p.status === "Pending").length, icon: Clock3 },
    { label: "Suspended", value: partners.filter(p => p.status === "Suspended").length, icon: XCircle },
  ];

  const statusStyle = {
    Approved: "bg-green-100 text-green-700",
    Pending: "bg-amber-100 text-amber-700",
    Suspended: "bg-red-100 text-red-700",
    Rejected: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-7">

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">Platform Management</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Partners</h1>
            <p className="mt-2 text-sm text-slate-500">Manage vehicle owners and business partners.</p>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
            <ShieldCheck size={18} className="text-amber-600" />
            Partner verification centre
          </div>
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
                placeholder="Search partner, owner or email..."
                className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-amber-500"
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-amber-500"
            >
              <option>All</option>
              <option>Approved</option>
              <option>Pending</option>
              <option>Suspended</option>
              <option>Rejected</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400">
                  <th className="pb-4">Partner</th>
                  <th className="pb-4">Owner</th>
                  <th className="pb-4">Vehicles</th>
                  <th className="pb-4">Joined</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPartners.map((partner) => (
                  <tr key={partner.id} className="border-b border-slate-50 last:border-0">
                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                          <Building2 size={19} />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{partner.name}</p>
                          <p className="text-xs text-slate-400">{partner.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-sm text-slate-600">{partner.owner}</td>
                    <td className="text-sm font-semibold text-slate-700">{partner.vehicles}</td>
                    <td className="text-sm text-slate-500">{partner.date}</td>
                    <td>
                      <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyle[partner.status]}`}>
                        {partner.status}
                      </span>
                    </td>
                    <td className="text-right">
                      <button
                        onClick={() => setSelected(partner)}
                        className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                        title="View partner"
                      >
                        <Eye size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredPartners.length === 0 && (
              <p className="py-10 text-center text-sm text-slate-500">No partners found.</p>
            )}
          </div>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-600">Partner information</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">{selected.name}</h2>
              </div>
              <button onClick={() => setSelected(null)} className="text-2xl text-slate-400">×</button>
            </div>

            <div className="my-6 space-y-4 text-sm">
              <p><span className="text-slate-400">Owner:</span> <strong>{selected.owner}</strong></p>
              <p><span className="text-slate-400">Email:</span> <strong>{selected.email}</strong></p>
              <p><span className="text-slate-400">Listed vehicles:</span> <strong>{selected.vehicles}</strong></p>
              <p><span className="text-slate-400">Application date:</span> <strong>{selected.date}</strong></p>
              <p><span className="text-slate-400">Current status:</span> <strong>{selected.status}</strong></p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => updateStatus(selected.id, "Approved")} className="rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white hover:bg-green-700">Approve</button>
              <button onClick={() => updateStatus(selected.id, "Rejected")} className="rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700">Reject</button>
              <button onClick={() => updateStatus(selected.id, "Suspended")} className="col-span-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">Suspend partner</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


import { useMemo, useState } from "react";
import {
  MapPin, Plus, Search, Plane, Building2,
  Trash2, Power, X, MapPinned
} from "lucide-react";

const initialLocations = [
  { id: 1, name: "Murtala Muhammed International Airport", city: "Lagos", state: "Lagos", type: "Airport", fee: 15000, status: "Active" },
  { id: 2, name: "Victoria Island", city: "Lagos", state: "Lagos", type: "City Area", fee: 5000, status: "Active" },
  { id: 3, name: "Ikeja GRA", city: "Ikeja", state: "Lagos", type: "City Area", fee: 3000, status: "Active" },
  { id: 4, name: "Nnamdi Azikiwe International Airport", city: "Abuja", state: "FCT", type: "Airport", fee: 12000, status: "Active" },
  { id: 5, name: "Lekki Phase 1", city: "Lagos", state: "Lagos", type: "City Area", fee: 4000, status: "Inactive" },
];

export default function AdminLocations() {
  const [locations, setLocations] = useState(initialLocations);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "", city: "", state: "", type: "City Area", fee: ""
  });

  const filtered = useMemo(() => locations.filter((location) => {
    const term = `${location.name} ${location.city} ${location.state}`.toLowerCase();
    return term.includes(search.toLowerCase()) && (filter === "All" || location.type === filter);
  }), [locations, search, filter]);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.city.trim() || !form.state.trim()) return;

    setLocations((prev) => [{
      id: Date.now(),
      ...form,
      fee: Number(form.fee) || 0,
      status: "Active",
    }, ...prev]);

    setForm({ name: "", city: "", state: "", type: "City Area", fee: "" });
    setShowForm(false);
  };

  const toggleStatus = (id) => setLocations((prev) => prev.map((item) =>
    item.id === id ? { ...item, status: item.status === "Active" ? "Inactive" : "Active" } : item
  ));

  const deleteLocation = (id) => {
    if (window.confirm("Delete this service location?")) {
      setLocations((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen space-y-7 bg-slate-100 p-4 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-amber-600">Operations management</p>
          <h1 className="mt-2 text-2xl font-black text-slate-900 md:text-3xl">Service Locations</h1>
          <p className="mt-1 text-sm text-slate-500">Manage the areas where RideMie operates.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white">
          <Plus size={18} /> Add Location
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Locations", value: locations.length, icon: MapPin },
          { label: "Airport Locations", value: locations.filter((l) => l.type === "Airport").length, icon: Plane },
          { label: "Active Locations", value: locations.filter((l) => l.status === "Active").length, icon: MapPinned },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-sm">{stat.label}</span>
              <stat.icon size={20} className="text-amber-500" />
            </div>
            <p className="mt-3 text-3xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:flex-row">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search location, city or state..." className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-amber-500" />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 text-sm">
          <option>All</option><option>Airport</option><option>City Area</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 p-5">
          <h2 className="font-bold text-slate-900">Operating Locations</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="p-4">Location</th><th className="p-4">Type</th>
                <th className="p-4">Service Fee</th><th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((location) => (
                <tr key={location.id}>
                  <td className="p-4">
                    <p className="font-bold text-slate-900">{location.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{location.city}, {location.state}, Nigeria</p>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-2 text-slate-600">
                      {location.type === "Airport" ? <Plane size={15} /> : <Building2 size={15} />}
                      {location.type}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-slate-800">₦{location.fee.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${location.status === "Active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>
                      {location.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => toggleStatus(location.id)} className="rounded-lg bg-slate-100 p-2 text-slate-600 hover:bg-amber-100"><Power size={16} /></button>
                      <button onClick={() => deleteLocation(location.id)} className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan="5" className="p-10 text-center text-slate-500">No locations found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <form onSubmit={handleCreate} className="my-auto w-full max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-900">Add Service Location</h2>
              <button type="button" onClick={() => setShowForm(false)}><X /></button>
            </div>
            <input required placeholder="Location name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border p-3 text-sm" />
            <div className="grid grid-cols-2 gap-3">
              <input required placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="rounded-xl border p-3 text-sm" />
              <input required placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="rounded-xl border p-3 text-sm" />
            </div>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full rounded-xl border p-3 text-sm">
              <option>City Area</option><option>Airport</option>
            </select>
            <input type="number" min="0" placeholder="Service fee (₦)" value={form.fee} onChange={(e) => setForm({ ...form, fee: e.target.value })} className="w-full rounded-xl border p-3 text-sm" />
            <button className="w-full rounded-xl bg-slate-950 py-3 font-bold text-white">Add Location</button>
          </form>
        </div>
      )}
    </div>
  );
}

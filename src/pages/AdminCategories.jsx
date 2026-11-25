
import { useMemo, useState } from "react";
import {
  Car, Plus, Search, Trash2, Power, X,
  CarFront, Truck, Gauge, Crown
} from "lucide-react";

const initialCategories = [
  { id: 1, name: "SUV", description: "Spacious vehicles for family and executive travel.", icon: "SUV", count: 2, status: "Active" },
  { id: 2, name: "Luxury", description: "Premium executive vehicles with refined comfort.", icon: "Luxury", count: 2, status: "Active" },
  { id: 3, name: "Sports", description: "Performance-focused vehicles and sports cars.", icon: "Sports", count: 1, status: "Active" },
  { id: 4, name: "Economy", description: "Affordable and practical everyday transportation.", icon: "Economy", count: 0, status: "Active" },
];

const categoryIcons = {
  SUV: Truck,
  Luxury: Crown,
  Sports: Gauge,
  Economy: CarFront,
};

export default function AdminCategories() {
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", icon: "Economy" });

  const filtered = useMemo(() => categories.filter((item) =>
    `${item.name} ${item.description}`.toLowerCase().includes(search.toLowerCase())
  ), [categories, search]);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    setCategories((prev) => [{
      id: Date.now(),
      name: form.name.trim(),
      description: form.description.trim(),
      icon: form.icon,
      count: 0,
      status: "Active",
    }, ...prev]);

    setForm({ name: "", description: "", icon: "Economy" });
    setShowForm(false);
  };

  const toggleStatus = (id) => setCategories((prev) => prev.map((item) =>
    item.id === id ? { ...item, status: item.status === "Active" ? "Inactive" : "Active" } : item
  ));

  const deleteCategory = (category) => {
    if (category.count > 0) {
      window.alert("This category has vehicles assigned to it. Reassign those vehicles before deleting it.");
      return;
    }

    if (window.confirm(`Delete the ${category.name} category?`)) {
      setCategories((prev) => prev.filter((item) => item.id !== category.id));
    }
  };

  return (
    <div className="min-h-screen space-y-7 bg-slate-100 p-4 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-amber-600">Fleet management</p>
          <h1 className="mt-2 text-2xl font-black text-slate-900 md:text-3xl">Vehicle Categories</h1>
          <p className="mt-1 text-sm text-slate-500">Organise the RideMie fleet into manageable categories.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white">
          <Plus size={18} /> Add Category
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Categories", value: categories.length },
          { label: "Active Categories", value: categories.filter((c) => c.status === "Active").length },
          { label: "Vehicles Assigned", value: categories.reduce((sum, c) => sum + c.count, 0) },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-3 text-3xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="relative rounded-2xl border border-slate-200 bg-white p-4">
        <Search size={18} className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search categories..." className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-amber-500" />
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((category) => {
          const Icon = categoryIcons[category.icon] || Car;
          return (
            <div key={category.id} className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                  <Icon size={27} />
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${category.status === "Active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>
                  {category.status}
                </span>
              </div>

              <h2 className="mt-5 text-xl font-black text-slate-900">{category.name}</h2>
              <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">{category.description || "No description provided."}</p>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <div>
                  <p className="text-2xl font-black text-slate-900">{category.count}</p>
                  <p className="text-xs text-slate-500">Assigned vehicles</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toggleStatus(category.id)} title="Toggle status" className="rounded-lg bg-slate-100 p-2.5 text-slate-600 hover:bg-amber-100">
                    <Power size={17} />
                  </button>
                  <button onClick={() => deleteCategory(category)} title="Delete category" className="rounded-lg bg-red-50 p-2.5 text-red-600 hover:bg-red-100">
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <p className="col-span-full rounded-2xl bg-white p-10 text-center text-slate-500">No categories found.</p>}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <form onSubmit={handleCreate} className="my-auto w-full max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-900">Add Vehicle Category</h2>
              <button type="button" onClick={() => setShowForm(false)}><X /></button>
            </div>
            <input required placeholder="Category name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border p-3 text-sm" />
            <textarea rows="3" placeholder="Category description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-xl border p-3 text-sm" />
            <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="w-full rounded-xl border p-3 text-sm">
              <option value="SUV">SUV</option>
              <option value="Luxury">Luxury</option>
              <option value="Sports">Sports</option>
              <option value="Economy">Economy</option>
            </select>
            <button className="w-full rounded-xl bg-slate-950 py-3 font-bold text-white">Save Category</button>
          </form>
        </div>
      )}
    </div>
  );
}

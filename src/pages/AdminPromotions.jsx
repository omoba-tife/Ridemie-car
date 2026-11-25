
import { useMemo, useState } from "react";
import { Tag, Plus, Search, Trash2, ToggleLeft, ToggleRight } from "lucide-react";

const initialPromotions = [
  { id: 1, code: "RIDEMIE10", discount: 10, type: "Percentage", uses: 42, limit: 100, expiry: "2026-12-31", status: "Active" },
  { id: 2, code: "WELCOME5000", discount: 5000, type: "Fixed", uses: 18, limit: 50, expiry: "2026-12-15", status: "Active" },
  { id: 3, code: "BLACKFRIDAY", discount: 20, type: "Percentage", uses: 100, limit: 100, expiry: "2026-11-25", status: "Inactive" },
];

export default function AdminPromotions() {
  const [promotions, setPromotions] = useState(initialPromotions);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    code: "",
    discount: "",
    type: "Percentage",
    limit: "",
    expiry: "",
  });

  const filtered = useMemo(() => {
    return promotions.filter((promo) =>
      promo.code.toLowerCase().includes(search.toLowerCase())
    );
  }, [promotions, search]);

  const activeCount = promotions.filter(p => p.status === "Active").length;
  const totalUses = promotions.reduce((sum, p) => sum + p.uses, 0);

  const handleCreate = (e) => {
    e.preventDefault();

    const code = form.code.trim().toUpperCase();
    const discount = Number(form.discount);
    const limit = Number(form.limit);

    if (!code || discount <= 0 || limit <= 0 || !form.expiry) {
      alert("Please provide valid promotion details.");
      return;
    }

    if (promotions.some(p => p.code === code)) {
      alert("This promotion code already exists.");
      return;
    }

    if (form.type === "Percentage" && discount > 100) {
      alert("Percentage discount cannot exceed 100.");
      return;
    }

    setPromotions(current => [
      {
        id: Date.now(),
        code,
        discount,
        type: form.type,
        uses: 0,
        limit,
        expiry: form.expiry,
        status: "Active",
      },
      ...current,
    ]);

    setForm({
      code: "",
      discount: "",
      type: "Percentage",
      limit: "",
      expiry: "",
    });

    setShowForm(false);
  };

  const toggleStatus = (id) => {
    setPromotions(current =>
      current.map(p =>
        p.id === id
          ? { ...p, status: p.status === "Active" ? "Inactive" : "Active" }
          : p
      )
    );
  };

  const deletePromotion = (id) => {
    if (!window.confirm("Delete this promotion code?")) return;
    setPromotions(current => current.filter(p => p.id !== id));
  };

  const formatDiscount = (promo) =>
    promo.type === "Percentage"
      ? `${promo.discount}%`
      : `₦${promo.discount.toLocaleString("en-NG")}`;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-7">

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">
              Marketing Management
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Promotions & Discounts
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Create discount codes and manage promotional campaigns.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            <Plus size={18} />
            Create Promotion
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <Tag className="text-amber-600" size={22} />
            <p className="mt-4 text-sm text-slate-500">Total Promotions</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">{promotions.length}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <ToggleRight className="text-green-600" size={22} />
            <p className="mt-4 text-sm text-slate-500">Active Promotions</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">{activeCount}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <Tag className="text-blue-600" size={22} />
            <p className="mt-4 text-sm text-slate-500">Total Redemptions</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">{totalUses}</p>
          </div>
        </div>

        {showForm && (
          <form onSubmit={handleCreate} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Create New Promotion</h2>
              <button type="button" onClick={() => setShowForm(false)} className="text-sm text-slate-500">
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Promotion Code</label>
                <input
                  required
                  value={form.code}
                  onChange={e => setForm({ ...form, code: e.target.value })}
                  placeholder="e.g. RIDEMIE20"
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Discount Type</label>
                <select
                  value={form.type}
                  onChange={e => setForm({ ...form, type: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none"
                >
                  <option>Percentage</option>
                  <option>Fixed</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Discount {form.type === "Percentage" ? "(%)" : "(₦)"}
                </label>
                <input
                  required
                  type="number"
                  min="1"
                  max={form.type === "Percentage" ? "100" : undefined}
                  value={form.discount}
                  onChange={e => setForm({ ...form, discount: e.target.value })}
                  placeholder="Enter discount"
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Maximum Uses</label>
                <input
                  required
                  type="number"
                  min="1"
                  value={form.limit}
                  onChange={e => setForm({ ...form, limit: e.target.value })}
                  placeholder="e.g. 100"
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Expiry Date</label>
                <input
                  required
                  type="date"
                  value={form.expiry}
                  onChange={e => setForm({ ...form, expiry: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <button type="submit" className="mt-5 rounded-xl bg-amber-600 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-700">
              Save Promotion
            </button>
          </form>
        )}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="relative mb-5">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search promotion codes..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-amber-500"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400">
                  <th className="pb-4">Promotion</th>
                  <th className="pb-4">Discount</th>
                  <th className="pb-4">Redemptions</th>
                  <th className="pb-4">Expiry</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(promo => (
                  <tr key={promo.id} className="border-b border-slate-50 last:border-0">
                    <td className="py-5">
                      <p className="font-bold tracking-wide text-slate-800">{promo.code}</p>
                      <p className="mt-1 text-xs text-slate-400">{promo.type} discount</p>
                    </td>
                    <td className="font-semibold text-slate-700">{formatDiscount(promo)}</td>
                    <td className="text-sm text-slate-600">{promo.uses} / {promo.limit}</td>
                    <td className="text-sm text-slate-500">{promo.expiry}</td>
                    <td>
                      <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${promo.status === "Active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>
                        {promo.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => toggleStatus(promo.id)}
                          title="Toggle status"
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                        >
                          {promo.status === "Active" ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                        </button>
                        <button
                          onClick={() => deletePromotion(promo.id)}
                          title="Delete promotion"
                          className="rounded-lg border border-red-100 p-2 text-red-500 hover:bg-red-50"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <p className="py-10 text-center text-sm text-slate-500">No promotions found.</p>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Promotions are currently stored in page state only. Real discount validation and redemption limits must be enforced by the backend.
        </div>
      </div>
    </div>
  );
}

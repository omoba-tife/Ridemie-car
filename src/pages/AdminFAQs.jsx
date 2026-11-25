
import { useMemo, useState } from "react";
import {
  HelpCircle, Plus, Search, Trash2, Edit3, X,
  MessageCircle, ChevronDown
} from "lucide-react";

const initialFAQs = [
  { id: 1, question: "How do I book a vehicle?", answer: "Browse our available fleet, select your preferred vehicle and complete the booking form with your journey details.", category: "Bookings", status: "Published" },
  { id: 2, question: "Can I rent a vehicle without a driver?", answer: "Yes. Eligible customers can select our self-drive option when making a booking.", category: "Rentals", status: "Published" },
  { id: 3, question: "What payment methods are accepted?", answer: "RideMie plans to support approved online payment methods and cash options where available.", category: "Payments", status: "Published" },
  { id: 4, question: "How can I become a vehicle partner?", answer: "Visit our partner page and submit your vehicle partnership application for review.", category: "Partners", status: "Published" },
];

export default function AdminFAQs() {
  const [faqs, setFaqs] = useState(initialFAQs);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [form, setForm] = useState({
    question: "",
    answer: "",
    category: "Bookings",
  });

  const filtered = useMemo(() => faqs.filter((faq) => {
    const matchesSearch = `${faq.question} ${faq.answer}`.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || faq.category === category;
    return matchesSearch && matchesCategory;
  }), [faqs, search, category]);

  const openCreate = () => {
    setEditingId(null);
    setForm({ question: "", answer: "", category: "Bookings" });
    setShowForm(true);
  };

  const openEdit = (faq) => {
    setEditingId(faq.id);
    setForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
    });
    setShowForm(true);
  };

  const saveFAQ = (e) => {
    e.preventDefault();

    if (editingId) {
      setFaqs((prev) => prev.map((faq) =>
        faq.id === editingId ? { ...faq, ...form } : faq
      ));
    } else {
      setFaqs((prev) => [{
        id: Date.now(),
        ...form,
        status: "Published",
      }, ...prev]);
    }

    setShowForm(false);
    setEditingId(null);
    setForm({ question: "", answer: "", category: "Bookings" });
  };

  const deleteFAQ = (id) => {
    if (window.confirm("Delete this FAQ?")) {
      setFaqs((prev) => prev.filter((faq) => faq.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setFaqs((prev) => prev.map((faq) =>
      faq.id === id
        ? { ...faq, status: faq.status === "Published" ? "Hidden" : "Published" }
        : faq
    ));
  };

  return (
    <div className="min-h-screen space-y-7 bg-slate-100 p-4 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-amber-600">Customer experience</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Frequently Asked Questions</h1>
          <p className="mt-2 text-sm text-slate-500">Manage answers to common customer questions.</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white">
          <Plus size={18} /> Add FAQ
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Questions", value: faqs.length, icon: HelpCircle },
          { label: "Published", value: faqs.filter((f) => f.status === "Published").length, icon: MessageCircle },
          { label: "Hidden", value: faqs.filter((f) => f.status === "Hidden").length, icon: ChevronDown },
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

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:flex-row">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search questions and answers..." className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-amber-500" />
        </div>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 text-sm">
          <option>All</option>
          <option>Bookings</option>
          <option>Rentals</option>
          <option>Payments</option>
          <option>Partners</option>
          <option>Account</option>
          <option>Other</option>
        </select>
      </div>

      <div className="space-y-3">
        {filtered.map((faq) => (
          <div key={faq.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <button
              onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600">
                  <HelpCircle size={19} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{faq.question}</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{faq.category}</span>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${faq.status === "Published" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>{faq.status}</span>
                  </div>
                </div>
              </div>
              <ChevronDown size={19} className={`shrink-0 text-slate-400 transition ${expandedId === faq.id ? "rotate-180" : ""}`} />
            </button>

            {expandedId === faq.id && (
              <div className="border-t border-slate-100 px-5 pb-5 pt-4">
                <p className="text-sm leading-7 text-slate-600">{faq.answer}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button onClick={() => openEdit(faq)} className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700">
                    <Edit3 size={14} /> Edit
                  </button>
                  <button onClick={() => toggleStatus(faq.id)} className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700">
                    {faq.status === "Published" ? "Hide FAQ" : "Publish FAQ"}
                  </button>
                  <button onClick={() => deleteFAQ(faq.id)} className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600">
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <HelpCircle size={32} className="mx-auto text-slate-300" />
            <p className="mt-3 font-bold text-slate-800">No FAQs found</p>
            <p className="mt-1 text-sm text-slate-500">Try another search or create a new question.</p>
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <form onSubmit={saveFAQ} className="my-auto w-full max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-900">{editingId ? "Edit FAQ" : "Create FAQ"}</h2>
              <button type="button" onClick={() => setShowForm(false)}><X /></button>
            </div>
            <input required placeholder="Question" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} className="w-full rounded-xl border p-3 text-sm" />
            <textarea required rows="5" placeholder="Answer" value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} className="w-full rounded-xl border p-3 text-sm" />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-xl border p-3 text-sm">
              <option>Bookings</option>
              <option>Rentals</option>
              <option>Payments</option>
              <option>Partners</option>
              <option>Account</option>
              <option>Other</option>
            </select>
            <button className="w-full rounded-xl bg-slate-950 py-3 font-bold text-white">
              {editingId ? "Save Changes" : "Create FAQ"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}


import { useMemo, useState } from "react";
import {
  Search,
  MessageCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
  X,
} from "lucide-react";

const initialTickets = [
  {
    id: "SUP-1001",
    name: "Daniel Johnson",
    email: "daniel@example.com",
    subject: "Booking confirmation issue",
    category: "Booking",
    priority: "High",
    status: "Open",
    date: "Nov 25, 2026",
    message:
      "I completed a reservation but have not received my booking confirmation email.",
  },
  {
    id: "SUP-1002",
    name: "Amara Williams",
    email: "amara@example.com",
    subject: "Payment verification",
    category: "Payment",
    priority: "Urgent",
    status: "In Progress",
    date: "Nov 24, 2026",
    message:
      "My payment was deducted, but the platform still shows my booking as pending.",
  },
  {
    id: "SUP-1003",
    name: "Michael Ade",
    email: "michael@example.com",
    subject: "Partner account question",
    category: "Partnership",
    priority: "Normal",
    status: "Resolved",
    date: "Nov 22, 2026",
    message:
      "I need help understanding how vehicle partner earnings are calculated.",
  },
  {
    id: "SUP-1004",
    name: "Grace Okafor",
    email: "grace@example.com",
    subject: "Cancellation request",
    category: "Booking",
    priority: "High",
    status: "Open",
    date: "Nov 21, 2026",
    message:
      "I would like assistance with cancelling my previous reservation.",
  },
  {
    id: "SUP-1005",
    name: "Sarah Ibrahim",
    email: "sarah@example.com",
    subject: "Account access",
    category: "Account",
    priority: "Normal",
    status: "In Progress",
    date: "Nov 20, 2026",
    message:
      "I am having trouble accessing my customer account.",
  },
];

const statusStyles = {
  Open: "bg-blue-50 text-blue-700",
  "In Progress": "bg-amber-50 text-amber-700",
  Resolved: "bg-emerald-50 text-emerald-700",
};

export default function AdminSupport() {
  const [tickets, setTickets] = useState(initialTickets);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [reply, setReply] = useState("");

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const query = search.toLowerCase();

      const matchesSearch =
        ticket.id.toLowerCase().includes(query) ||
        ticket.name.toLowerCase().includes(query) ||
        ticket.subject.toLowerCase().includes(query);

      const matchesStatus =
        filter === "All" || ticket.status === filter;

      return matchesSearch && matchesStatus;
    });
  }, [tickets, search, filter]);

  const updateStatus = (id, status) => {
    setTickets((current) =>
      current.map((ticket) =>
        ticket.id === id ? { ...ticket, status } : ticket
      )
    );

    setSelectedTicket((current) =>
      current?.id === id ? { ...current, status } : current
    );
  };

  const handleReply = (e) => {
    e.preventDefault();

    if (!reply.trim()) return;

    alert(
      "Demo reply saved locally. Connect the backend and email service to send real support replies."
    );
    setReply("");
  };

  const openCount = tickets.filter((t) => t.status === "Open").length;
  const progressCount = tickets.filter(
    (t) => t.status === "In Progress"
  ).length;
  const resolvedCount = tickets.filter(
    (t) => t.status === "Resolved"
  ).length;

  return (
    <div className="min-h-screen bg-[#F7F8FA] px-4 py-8 text-slate-900 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1450px]">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-amber-600">
            ADMINISTRATION / CUSTOMER EXPERIENCE
          </p>
          <h1 className="text-3xl font-bold">Support management</h1>
          <p className="mt-2 text-sm text-slate-500">
            Review customer enquiries and manage support requests.
          </p>
        </div>

        <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Total tickets",
              value: tickets.length,
              icon: MessageCircle,
              color: "bg-blue-50 text-blue-600",
            },
            {
              title: "Open tickets",
              value: openCount,
              icon: AlertCircle,
              color: "bg-red-50 text-red-600",
            },
            {
              title: "In progress",
              value: progressCount,
              icon: Clock,
              color: "bg-amber-50 text-amber-600",
            },
            {
              title: "Resolved",
              value: resolvedCount,
              icon: CheckCircle2,
              color: "bg-emerald-50 text-emerald-600",
            },
          ].map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{stat.title}</p>
                    <h2 className="mt-3 text-3xl font-bold">{stat.value}</h2>
                  </div>
                  <div className={`rounded-xl p-3 ${stat.color}`}>
                    <Icon size={22} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-lg font-bold">Customer support tickets</h2>
              <p className="mt-1 text-sm text-slate-500">
                {filteredTickets.length} tickets found
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tickets..."
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-amber-500 sm:w-64"
                />
              </div>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-amber-500"
              >
                <option value="All">All statuses</option>
                <option value="Open">Open</option>
                <option value="In Progress">In progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-6 py-4">Ticket</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Priority</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="border-b border-slate-50 last:border-0"
                  >
                    <td className="px-6 py-5 text-sm font-bold">
                      {ticket.id}
                      <span className="mt-1 block text-xs font-normal text-slate-400">
                        {ticket.date}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <p className="text-sm font-semibold">{ticket.name}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        {ticket.email}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-sm font-medium">
                      {ticket.subject}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-500">
                      {ticket.category}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                          ticket.priority === "Urgent"
                            ? "bg-red-100 text-red-700"
                            : ticket.priority === "High"
                            ? "bg-orange-50 text-orange-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {ticket.priority}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[ticket.status]}`}
                      >
                        {ticket.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <button
                        onClick={() => setSelectedTicket(ticket)}
                        className="rounded-lg bg-slate-100 px-4 py-2 text-xs font-semibold hover:bg-amber-50 hover:text-amber-700"
                      >
                        Review ticket
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredTickets.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-12 text-center text-sm text-slate-500"
                    >
                      No support tickets found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {selectedTicket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-amber-600">
                    SUPPORT REQUEST
                  </p>
                  <h2 className="mt-2 text-xl font-bold">
                    {selectedTicket.subject}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {selectedTicket.id}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedTicket(null)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold">{selectedTicket.name}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {selectedTicket.email}
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-700">
                  {selectedTicket.message}
                </p>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold">
                  Update ticket status
                </label>
                <select
                  value={selectedTicket.status}
                  onChange={(e) =>
                    updateStatus(selectedTicket.id, e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-amber-500"
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              </div>

              <form onSubmit={handleReply} className="mt-5">
                <label className="mb-2 block text-sm font-semibold">
                  Reply to customer
                </label>
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  rows="4"
                  placeholder="Write a response..."
                  className="w-full resize-none rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-amber-500"
                />

                <button
                  type="submit"
                  className="mt-3 w-full rounded-xl bg-[#111827] px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700"
                >
                  Save demo reply
                </button>
              </form>
            </div>
          </div>
        )}

        <p className="mt-4 text-xs text-slate-400">
          Sample support tickets. Real customer replies require backend
          messaging and email integration.
        </p>
      </div>
    </div>
  );
}

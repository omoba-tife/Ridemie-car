
import { useMemo, useState } from "react";
import {
  Search,
  CalendarDays,
  Eye,
  X,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import AdminPageHeader from "../components/admin/AdminPageHeader";
import AdminStatCard from "../components/admin/AdminStatCard";

const initialBookings = [
  {
    id: "RM-2026-001",
    customer: "Daniel Okafor",
    email: "daniel@example.com",
    vehicle: "Mercedes-Benz GLE",
    type: "Chauffeur",
    pickup: "Victoria Island, Lagos",
    date: "2026-11-25",
    amount: 180000,
    status: "Confirmed",
  },
  {
    id: "RM-2026-002",
    customer: "Amara Johnson",
    email: "amara@example.com",
    vehicle: "Range Rover Sport",
    type: "Self Drive",
    pickup: "Ikeja, Lagos",
    date: "2026-11-26",
    amount: 220000,
    status: "Pending",
  },
  {
    id: "RM-2026-003",
    customer: "Michael Adeyemi",
    email: "michael@example.com",
    vehicle: "Porsche 911",
    type: "Self Drive",
    pickup: "Lekki, Lagos",
    date: "2026-11-27",
    amount: 350000,
    status: "Completed",
  },
  {
    id: "RM-2026-004",
    customer: "Grace Williams",
    email: "grace@example.com",
    vehicle: "Mercedes-Benz S-Class",
    type: "Chauffeur",
    pickup: "Airport, Lagos",
    date: "2026-11-28",
    amount: 250000,
    status: "Cancelled",
  },
];

const formatMoney = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

const statusStyles = {
  Confirmed: "bg-blue-50 text-blue-700",
  Pending: "bg-amber-50 text-amber-700",
  Completed: "bg-green-50 text-green-700",
  Cancelled: "bg-red-50 text-red-700",
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState(initialBookings);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesSearch = [
        booking.id,
        booking.customer,
        booking.vehicle,
        booking.email,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter = filter === "All" || booking.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [bookings, search, filter]);

  const updateStatus = (id, status) => {
    setBookings((current) =>
      current.map((booking) =>
        booking.id === id ? { ...booking, status } : booking
      )
    );

    setSelected((current) =>
      current?.id === id ? { ...current, status } : current
    );
  };

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;
  const completedBookings = bookings.filter(
    (booking) => booking.status === "Completed"
  ).length;
  const bookingRevenue = bookings
    .filter((booking) => booking.status === "Completed")
    .reduce((total, booking) => total + booking.amount, 0);

  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader
        title="Bookings Management"
        description="Review reservations, monitor booking activity and manage customer journeys."
      />

      <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard title="Total Bookings" value={totalBookings} />
        <AdminStatCard
          title="Pending Bookings"
          value={pendingBookings}
          positive={false}
          change="Needs review"
        />
        <AdminStatCard
          title="Completed Bookings"
          value={completedBookings}
          change="Successfully completed"
        />
        <AdminStatCard
          title="Completed Revenue"
          value={formatMoney(bookingRevenue)}
          description="From sample completed bookings"
        />
      </div>

      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-bold text-gray-900">All Reservations</h2>
            <p className="mt-1 text-xs text-gray-400">
              Review and manage booking records
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5">
              <Search size={17} className="text-gray-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search bookings..."
                className="w-full text-sm outline-none sm:w-48"
              />
            </div>

            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none"
            >
              <option>All</option>
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-gray-50 text-[11px] uppercase tracking-wider text-gray-400">
              <tr>
                <th className="px-5 py-4">Booking</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Vehicle</th>
                <th className="px-5 py-4">Pickup date</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50/70">
                  <td className="px-5 py-4 text-sm font-bold text-gray-800">
                    {booking.id}
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-gray-800">
                      {booking.customer}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {booking.email}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {booking.vehicle}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {booking.date}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-gray-800">
                    {formatMoney(booking.amount)}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[booking.status]}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => setSelected(booking)}
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100"
                    >
                      <Eye size={14} />
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-5 py-12 text-center text-sm text-gray-400">
                    No bookings match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#A18450]">
                  Booking details
                </p>
                <h2 className="mt-1 text-xl font-bold">{selected.id}</h2>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-xs text-gray-400">Customer</p>
                <p className="mt-1 font-semibold">{selected.customer}</p>
                <p className="text-gray-500">{selected.email}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400">Vehicle</p>
                  <p className="mt-1 font-semibold">{selected.vehicle}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Service type</p>
                  <p className="mt-1 font-semibold">{selected.type}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Pickup location</p>
                  <p className="mt-1 font-semibold">{selected.pickup}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Pickup date</p>
                  <p className="mt-1 font-semibold">{selected.date}</p>
                </div>
              </div>
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-400">Booking amount</p>
                <p className="mt-1 text-xl font-bold">
                  {formatMoney(selected.amount)}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-xs font-semibold text-gray-500">
                Update booking status
              </label>
              <select
                value={selected.status}
                onChange={(event) =>
                  updateStatus(selected.id, event.target.value)
                }
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#C9A96E]"
              >
                <option>Pending</option>
                <option>Confirmed</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="mt-5 w-full rounded-xl bg-[#171717] py-3 text-sm font-semibold text-white hover:bg-black"
            >
              Close details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

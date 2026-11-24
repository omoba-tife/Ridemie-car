
import { useMemo, useState } from "react";
import {
  Search,
  CarFront,
  CheckCircle2,
  Clock,
  XCircle,
  MoreHorizontal,
  MapPin,
} from "lucide-react";

const initialVehicles = [
  {
    id: "VH-1001",
    name: "Mercedes-Benz GLE",
    owner: "Michael Ade",
    location: "Victoria Island, Lagos",
    category: "SUV",
    price: "₦180,000",
    status: "Approved",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "VH-1002",
    name: "Range Rover Sport",
    owner: "Tunde Motors",
    location: "Lekki, Lagos",
    category: "SUV",
    price: "₦220,000",
    status: "Pending",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "VH-1003",
    name: "Porsche 911",
    owner: "Daniel Autos",
    location: "Ikeja, Lagos",
    category: "Sports",
    price: "₦350,000",
    status: "Approved",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "VH-1004",
    name: "BMW 5 Series",
    owner: "Prime Wheels",
    location: "Ikoyi, Lagos",
    category: "Luxury",
    price: "₦160,000",
    status: "Rejected",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "VH-1005",
    name: "Toyota Land Cruiser",
    owner: "Tunde Motors",
    location: "Ajah, Lagos",
    category: "SUV",
    price: "₦200,000",
    status: "Pending",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=700&q=80",
  },
];

export default function AdminVehicles() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [activeMenu, setActiveMenu] = useState(null);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const matchesSearch =
        vehicle.name.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.owner.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.id.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        filter === "All" || vehicle.status === filter;

      return matchesSearch && matchesStatus;
    });
  }, [vehicles, search, filter]);

  const updateStatus = (id, status) => {
    setVehicles((current) =>
      current.map((vehicle) =>
        vehicle.id === id ? { ...vehicle, status } : vehicle
      )
    );
    setActiveMenu(null);
  };

  const approved = vehicles.filter(
    (vehicle) => vehicle.status === "Approved"
  ).length;

  const pending = vehicles.filter(
    (vehicle) => vehicle.status === "Pending"
  ).length;

  const rejected = vehicles.filter(
    (vehicle) => vehicle.status === "Rejected"
  ).length;

  return (
    <div className="min-h-screen bg-[#F7F8FA] px-4 py-8 text-slate-900 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1450px]">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-amber-600">
            ADMINISTRATION / VEHICLES
          </p>
          <h1 className="text-3xl font-bold">Vehicle management</h1>
          <p className="mt-2 text-sm text-slate-500">
            Review vehicle submissions and manage marketplace listings.
          </p>
        </div>

        <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Total vehicles",
              value: vehicles.length,
              icon: CarFront,
              color: "bg-blue-50 text-blue-600",
            },
            {
              title: "Approved",
              value: approved,
              icon: CheckCircle2,
              color: "bg-emerald-50 text-emerald-600",
            },
            {
              title: "Awaiting review",
              value: pending,
              icon: Clock,
              color: "bg-amber-50 text-amber-600",
            },
            {
              title: "Rejected",
              value: rejected,
              icon: XCircle,
              color: "bg-red-50 text-red-600",
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
                    <Icon size={23} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold">Marketplace inventory</h2>
              <p className="mt-1 text-sm text-slate-500">
                {filteredVehicles.length} vehicles displayed
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
                  placeholder="Search vehicles..."
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-amber-500 sm:w-64"
                />
              </div>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-amber-500"
              >
                <option value="All">All statuses</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending review</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-semibold">Vehicle</th>
                  <th className="px-6 py-4 font-semibold">Owner</th>
                  <th className="px-6 py-4 font-semibold">Location</th>
                  <th className="px-6 py-4 font-semibold">Daily rate</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredVehicles.map((vehicle) => (
                  <tr
                    key={vehicle.id}
                    className="border-b border-slate-50 last:border-0"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="h-14 w-20 rounded-lg object-cover"
                        />
                        <div>
                          <p className="text-sm font-semibold">
                            {vehicle.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {vehicle.id} · {vehicle.category}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm font-medium">
                      {vehicle.owner}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1.5 text-sm text-slate-500">
                        <MapPin size={15} />
                        {vehicle.location}
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm font-semibold">
                      {vehicle.price}
                      <span className="block text-xs font-normal text-slate-400">
                        per day
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                          vehicle.status === "Approved"
                            ? "bg-emerald-50 text-emerald-700"
                            : vehicle.status === "Pending"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {vehicle.status}
                      </span>
                    </td>

                    <td className="relative px-6 py-5">
                      <button
                        onClick={() =>
                          setActiveMenu(
                            activeMenu === vehicle.id ? null : vehicle.id
                          )
                        }
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                      >
                        <MoreHorizontal size={20} />
                      </button>

                      {activeMenu === vehicle.id && (
                        <div className="absolute right-8 top-14 z-20 w-44 rounded-xl border border-slate-100 bg-white p-2 shadow-xl">
                          {vehicle.status !== "Approved" && (
                            <button
                              onClick={() =>
                                updateStatus(vehicle.id, "Approved")
                              }
                              className="w-full rounded-lg px-3 py-2 text-left text-sm text-emerald-700 hover:bg-emerald-50"
                            >
                              Approve vehicle
                            </button>
                          )}

                          {vehicle.status !== "Rejected" && (
                            <button
                              onClick={() =>
                                updateStatus(vehicle.id, "Rejected")
                              }
                              className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                            >
                              Reject vehicle
                            </button>
                          )}

                          {vehicle.status !== "Pending" && (
                            <button
                              onClick={() =>
                                updateStatus(vehicle.id, "Pending")
                              }
                              className="w-full rounded-lg px-3 py-2 text-left text-sm text-amber-700 hover:bg-amber-50"
                            >
                              Mark as pending
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}

                {filteredVehicles.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-sm text-slate-500"
                    >
                      No vehicles match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-400">
          Demo interface: approval changes are temporary and are not saved to a
          database.
        </p>
      </div>
    </div>
  );
}

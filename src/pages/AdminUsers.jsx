
import { useMemo, useState } from "react";
import {
  Search,
  Users,
  UserRound,
  Building2,
  ShieldCheck,
  MoreHorizontal,
  UserX,
  CheckCircle2,
} from "lucide-react";

const initialUsers = [
  {
    id: 1,
    name: "Daniel Johnson",
    email: "daniel@example.com",
    phone: "+234 801 234 5678",
    role: "Customer",
    joined: "Nov 12, 2026",
    status: "Active",
  },
  {
    id: 2,
    name: "Amara Williams",
    email: "amara@example.com",
    phone: "+234 803 456 7890",
    role: "Customer",
    joined: "Nov 14, 2026",
    status: "Active",
  },
  {
    id: 3,
    name: "Michael Ade",
    email: "michael@example.com",
    phone: "+234 805 123 4567",
    role: "Partner",
    joined: "Nov 15, 2026",
    status: "Active",
  },
  {
    id: 4,
    name: "Grace Okafor",
    email: "grace@example.com",
    phone: "+234 807 987 6543",
    role: "Customer",
    joined: "Nov 17, 2026",
    status: "Suspended",
  },
  {
    id: 5,
    name: "Tunde Motors",
    email: "tunde@example.com",
    phone: "+234 809 222 3344",
    role: "Partner",
    joined: "Nov 18, 2026",
    status: "Pending",
  },
  {
    id: 6,
    name: "Sarah Ibrahim",
    email: "sarah@example.com",
    phone: "+234 802 555 6677",
    role: "Customer",
    joined: "Nov 20, 2026",
    status: "Active",
  },
];

export default function AdminUsers() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [activeMenu, setActiveMenu] = useState(null);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.phone.includes(search);

      const matchesFilter = filter === "All" || user.role === filter;

      return matchesSearch && matchesFilter;
    });
  }, [users, search, filter]);

  const updateStatus = (id, status) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === id ? { ...user, status } : user
      )
    );
    setActiveMenu(null);
  };

  const activeCount = users.filter((user) => user.status === "Active").length;
  const partnerCount = users.filter((user) => user.role === "Partner").length;
  const customerCount = users.filter((user) => user.role === "Customer").length;

  return (
    <div className="min-h-screen bg-[#F7F8FA] px-4 py-8 text-slate-900 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1450px]">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-amber-600">
            ADMINISTRATION / USERS
          </p>
          <h1 className="text-3xl font-bold">User management</h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage customer accounts, partners and platform access.
          </p>
        </div>

        <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Total users",
              value: users.length,
              icon: Users,
              color: "bg-blue-50 text-blue-600",
            },
            {
              title: "Customers",
              value: customerCount,
              icon: UserRound,
              color: "bg-purple-50 text-purple-600",
            },
            {
              title: "Partners",
              value: partnerCount,
              icon: Building2,
              color: "bg-amber-50 text-amber-600",
            },
            {
              title: "Active accounts",
              value: activeCount,
              icon: ShieldCheck,
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
              <h2 className="text-lg font-bold">All platform users</h2>
              <p className="mt-1 text-sm text-slate-500">
                {filteredUsers.length} accounts found
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
                  placeholder="Search users..."
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-amber-500 sm:w-64"
                />
              </div>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-amber-500"
              >
                <option value="All">All roles</option>
                <option value="Customer">Customers</option>
                <option value="Partner">Partners</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-semibold">User</th>
                  <th className="px-6 py-4 font-semibold">Phone</th>
                  <th className="px-6 py-4 font-semibold">Account type</th>
                  <th className="px-6 py-4 font-semibold">Date joined</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-slate-50 last:border-0"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111827] font-bold text-white">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{user.name}</p>
                          <p className="mt-1 text-xs text-slate-400">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-600">
                      {user.phone}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                          user.role === "Partner"
                            ? "bg-purple-50 text-purple-700"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-500">
                      {user.joined}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                          user.status === "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : user.status === "Pending"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td className="relative px-6 py-5">
                      <button
                        onClick={() =>
                          setActiveMenu(
                            activeMenu === user.id ? null : user.id
                          )
                        }
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                      >
                        <MoreHorizontal size={20} />
                      </button>

                      {activeMenu === user.id && (
                        <div className="absolute right-8 top-14 z-20 w-44 rounded-xl border border-slate-100 bg-white p-2 shadow-xl">
                          {user.status !== "Active" && (
                            <button
                              onClick={() => updateStatus(user.id, "Active")}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-emerald-50"
                            >
                              <CheckCircle2 size={16} />
                              Activate account
                            </button>
                          )}

                          {user.status !== "Suspended" && (
                            <button
                              onClick={() =>
                                updateStatus(user.id, "Suspended")
                              }
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                            >
                              <UserX size={16} />
                              Suspend account
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-sm text-slate-500"
                    >
                      No users match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-400">
          Demo interface: account changes currently exist only in local page
          state.
        </p>
      </div>
    </div>
  );
}

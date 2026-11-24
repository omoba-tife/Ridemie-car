
import { useMemo, useState } from "react";
import {
  Search,
  Percent,
  Wallet,
  TrendingUp,
  Settings2,
  Save,
} from "lucide-react";

const initialCommissions = [
  {
    id: 1,
    partner: "Michael Ade",
    vehicle: "Mercedes-Benz GLE",
    booking: "RM-2048",
    bookingAmount: 180000,
    rate: 10,
    status: "Active",
  },
  {
    id: 2,
    partner: "Tunde Motors",
    vehicle: "Range Rover Sport",
    booking: "RM-2047",
    bookingAmount: 220000,
    rate: 10,
    status: "Pending",
  },
  {
    id: 3,
    partner: "Daniel Autos",
    vehicle: "Porsche 911",
    booking: "RM-2046",
    bookingAmount: 350000,
    rate: 12,
    status: "Active",
  },
  {
    id: 4,
    partner: "Prime Wheels",
    vehicle: "BMW 5 Series",
    booking: "RM-2045",
    bookingAmount: 160000,
    rate: 8,
    status: "Active",
  },
];

const money = (amount) => `₦${amount.toLocaleString("en-NG")}`;

export default function AdminCommissions() {
  const [records, setRecords] = useState(initialCommissions);
  const [defaultRate, setDefaultRate] = useState("10");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const updateRate = (id, rate) => {
    setRecords((current) =>
      current.map((record) =>
        record.id === id ? { ...record, rate: Number(rate) } : record
      )
    );
    setMessage("");
  };

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const query = search.toLowerCase();

      return (
        record.partner.toLowerCase().includes(query) ||
        record.vehicle.toLowerCase().includes(query) ||
        record.booking.toLowerCase().includes(query)
      );
    });
  }, [records, search]);

  const totalBookings = records.reduce(
    (sum, record) => sum + record.bookingAmount,
    0
  );

  const totalCommission = records.reduce(
    (sum, record) => sum + (record.bookingAmount * record.rate) / 100,
    0
  );

  const handleSave = () => {
    const data = {
      defaultRate,
      records,
    };

    localStorage.setItem("ridemie_commissions", JSON.stringify(data));
    setMessage("Commission configuration saved in this browser.");
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] px-4 py-8 text-slate-900 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1350px]">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-amber-600">
            ADMINISTRATION / FINANCE / COMMISSIONS
          </p>
          <h1 className="text-3xl font-bold">Commission management</h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage platform commission rates and partner earnings.
          </p>
        </div>

        <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[
            {
              title: "Gross booking value",
              value: money(totalBookings),
              icon: Wallet,
              color: "bg-blue-50 text-blue-600",
            },
            {
              title: "Estimated commissions",
              value: money(totalCommission),
              icon: Percent,
              color: "bg-emerald-50 text-emerald-600",
            },
            {
              title: "Partner records",
              value: records.length,
              icon: TrendingUp,
              color: "bg-purple-50 text-purple-600",
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
                    <h2 className="mt-3 text-2xl font-bold">{stat.value}</h2>
                  </div>
                  <div className={`rounded-xl p-3 ${stat.color}`}>
                    <Icon size={23} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mb-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-amber-50 p-3 text-amber-700">
              <Settings2 size={22} />
            </div>
            <div>
              <h2 className="font-bold">Default commission configuration</h2>
              <p className="text-sm text-slate-500">
                Set the default rate for new partner bookings
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <label className="max-w-xs flex-1">
              <span className="mb-2 block text-sm font-semibold">
                Default commission rate (%)
              </span>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={defaultRate}
                  onChange={(e) => {
                    setDefaultRate(e.target.value);
                    setMessage("");
                  }}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-12 text-sm outline-none focus:border-amber-500"
                />
                <Percent
                  size={18}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </label>

            <button
              onClick={handleSave}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#111827] px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700"
            >
              <Save size={17} />
              Save configuration
            </button>
          </div>

          {message && (
            <p className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
              {message}
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold">Partner commission records</h2>
              <p className="mt-1 text-sm text-slate-500">
                Configure individual partner commission rates
              </p>
            </div>

            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search partners..."
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-amber-500 sm:w-64"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-6 py-4">Partner</th>
                  <th className="px-6 py-4">Vehicle</th>
                  <th className="px-6 py-4">Booking</th>
                  <th className="px-6 py-4">Booking amount</th>
                  <th className="px-6 py-4">Commission rate</th>
                  <th className="px-6 py-4">Platform earns</th>
                </tr>
              </thead>

              <tbody>
                {filteredRecords.map((record) => {
                  const commission =
                    (record.bookingAmount * record.rate) / 100;

                  return (
                    <tr
                      key={record.id}
                      className="border-b border-slate-50 last:border-0"
                    >
                      <td className="px-6 py-5 text-sm font-semibold">
                        {record.partner}
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-500">
                        {record.vehicle}
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-500">
                        {record.booking}
                      </td>
                      <td className="px-6 py-5 text-sm font-medium">
                        {money(record.bookingAmount)}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={record.rate}
                            onChange={(e) =>
                              updateRate(record.id, e.target.value)
                            }
                            className="w-20 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-amber-500"
                          />
                          <span className="text-sm text-slate-400">%</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm font-bold text-emerald-600">
                        {money(commission)}
                      </td>
                    </tr>
                  );
                })}

                {filteredRecords.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-sm text-slate-500"
                    >
                      No commission records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-100 p-5">
            <button
              onClick={handleSave}
              className="rounded-xl bg-[#111827] px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Save commission changes
            </button>
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-400">
          Commission figures are illustrative. Actual commission rules,
          historical booking rates and partner settlements must be calculated
          and validated by the backend.
        </p>
      </div>
    </div>
  );
}

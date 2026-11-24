
import { useMemo, useState } from "react";
import {
  Search,
  CreditCard,
  Wallet,
  CircleDollarSign,
  Download,
} from "lucide-react";
import AdminPageHeader from "../components/admin/AdminPageHeader";
import AdminStatCard from "../components/admin/AdminStatCard";

const transactions = [
  {
    id: "PAY-00182",
    customer: "Daniel Okafor",
    booking: "RM-2026-001",
    method: "Paystack",
    date: "2026-11-24",
    amount: 180000,
    status: "Successful",
  },
  {
    id: "PAY-00183",
    customer: "Amara Johnson",
    booking: "RM-2026-002",
    method: "Cash",
    date: "2026-11-24",
    amount: 220000,
    status: "Pending",
  },
  {
    id: "PAY-00184",
    customer: "Michael Adeyemi",
    booking: "RM-2026-003",
    method: "Paystack",
    date: "2026-11-23",
    amount: 350000,
    status: "Successful",
  },
  {
    id: "PAY-00185",
    customer: "Grace Williams",
    booking: "RM-2026-004",
    method: "Paystack",
    date: "2026-11-22",
    amount: 250000,
    status: "Failed",
  },
  {
    id: "PAY-00186",
    customer: "Samuel James",
    booking: "RM-2026-005",
    method: "Cash",
    date: "2026-11-21",
    amount: 160000,
    status: "Successful",
  },
];

const money = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

const paymentStatus = {
  Successful: "bg-green-50 text-green-700",
  Pending: "bg-amber-50 text-amber-700",
  Failed: "bg-red-50 text-red-700",
};

export default function AdminPayments() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch = [
        transaction.id,
        transaction.customer,
        transaction.booking,
        transaction.method,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || transaction.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const successful = transactions.filter(
    (transaction) => transaction.status === "Successful"
  );

  const totalReceived = successful.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  const pending = transactions.filter(
    (transaction) => transaction.status === "Pending"
  );

  const pendingAmount = pending.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  const failed = transactions.filter(
    (transaction) => transaction.status === "Failed"
  );

  const exportCSV = () => {
    const headers = [
      "Transaction ID",
      "Customer",
      "Booking",
      "Method",
      "Date",
      "Amount",
      "Status",
    ];

    const rows = filteredTransactions.map((transaction) => [
      transaction.id,
      transaction.customer,
      transaction.booking,
      transaction.method,
      transaction.date,
      transaction.amount,
      transaction.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")
      )
      .join("\n");

    const file = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");

    link.href = url;
    link.download = "ridemie-transactions.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader
        title="Payments & Transactions"
        description="Monitor payment activity, transaction records and collection status across RideMie."
        action={
          <button
            onClick={exportCSV}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#171717] px-4 py-3 text-sm font-semibold text-white transition hover:bg-black"
          >
            <Download size={16} />
            Export CSV
          </button>
        }
      />

      <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          title="Successful Payments"
          value={successful.length}
          icon={CreditCard}
          change="Completed transactions"
        />
        <AdminStatCard
          title="Total Received"
          value={money(totalReceived)}
          icon={CircleDollarSign}
          description="Sample successful payments"
        />
        <AdminStatCard
          title="Pending Payments"
          value={money(pendingAmount)}
          icon={Wallet}
          positive={false}
          change={`${pending.length} pending`}
        />
        <AdminStatCard
          title="Failed Transactions"
          value={failed.length}
          icon={CreditCard}
          positive={false}
          change="Requires attention"
        />
      </div>

      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-bold text-gray-900">Transaction History</h2>
            <p className="mt-1 text-xs text-gray-400">
              Search and review payment records
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5">
              <Search size={17} className="text-gray-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search transactions..."
                className="w-full text-sm outline-none sm:w-48"
              />
            </div>

            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none"
            >
              <option>All</option>
              <option>Successful</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-gray-50 text-[11px] uppercase tracking-wider text-gray-400">
              <tr>
                <th className="px-5 py-4">Transaction</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Booking ID</th>
                <th className="px-5 py-4">Method</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50/70">
                  <td className="px-5 py-4 text-sm font-bold text-gray-800">
                    {transaction.id}
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-gray-700">
                    {transaction.customer}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500">
                    {transaction.booking}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {transaction.method}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500">
                    {transaction.date}
                  </td>
                  <td className="px-5 py-4 text-sm font-bold text-gray-800">
                    {money(transaction.amount)}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${paymentStatus[transaction.status]}`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredTransactions.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-12 text-center text-sm text-gray-400"
                  >
                    No transactions match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-xs text-gray-400">
          Showing {filteredTransactions.length} of {transactions.length} sample transactions
        </div>
      </section>
    </div>
  );
}

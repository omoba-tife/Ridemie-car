
import { useMemo, useState } from "react";
import {
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  TrendingUp,
  RotateCcw,
  ArrowDownToLine,
} from "lucide-react";

const initialTransactions = [
  {
    id: "TXN-9001",
    description: "Vehicle booking payment",
    reference: "RM-2048",
    customer: "Daniel Johnson",
    type: "Payment",
    amount: 180000,
    commission: 18000,
    date: "Nov 25, 2026",
    status: "Completed",
  },
  {
    id: "TXN-9002",
    description: "Vehicle booking payment",
    reference: "RM-2047",
    customer: "Amara Williams",
    type: "Payment",
    amount: 220000,
    commission: 22000,
    date: "Nov 25, 2026",
    status: "Pending",
  },
  {
    id: "TXN-9003",
    description: "Vehicle booking payment",
    reference: "RM-2046",
    customer: "Michael Ade",
    type: "Payment",
    amount: 350000,
    commission: 35000,
    date: "Nov 24, 2026",
    status: "Completed",
  },
  {
    id: "TXN-9004",
    description: "Customer booking refund",
    reference: "RM-2045",
    customer: "Grace Okafor",
    type: "Refund",
    amount: 160000,
    commission: 0,
    date: "Nov 23, 2026",
    status: "Completed",
  },
  {
    id: "TXN-9005",
    description: "Partner earnings payout",
    reference: "PT-1002",
    customer: "Tunde Motors",
    type: "Payout",
    amount: 198000,
    commission: 0,
    date: "Nov 22, 2026",
    status: "Processing",
  },
];

const money = (amount) => `₦${amount.toLocaleString("en-NG")}`;

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const query = search.toLowerCase();

      const matchesSearch =
        transaction.id.toLowerCase().includes(query) ||
        transaction.customer.toLowerCase().includes(query) ||
        transaction.reference.toLowerCase().includes(query);

      const matchesType =
        typeFilter === "All" || transaction.type === typeFilter;

      const matchesStatus =
        statusFilter === "All" || transaction.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [transactions, search, typeFilter, statusFilter]);

  const completedPayments = transactions.filter(
    (t) => t.type === "Payment" && t.status === "Completed"
  );

  const totalPayments = completedPayments.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  const totalCommission = completedPayments.reduce(
    (sum, transaction) => sum + transaction.commission,
    0
  );

  const totalRefunds = transactions
    .filter((t) => t.type === "Refund" && t.status === "Completed")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalPayouts = transactions
    .filter((t) => t.type === "Payout" && t.status === "Completed")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const updateStatus = (id, status) => {
    setTransactions((current) =>
      current.map((transaction) =>
        transaction.id === id ? { ...transaction, status } : transaction
      )
    );
  };

  const exportTransactions = () => {
    const headers = [
      "Transaction ID",
      "Description",
      "Reference",
      "Customer",
      "Type",
      "Amount",
      "Commission",
      "Date",
      "Status",
    ];

    const rows = transactions.map((t) => [
      t.id,
      t.description,
      t.reference,
      t.customer,
      t.type,
      t.amount,
      t.commission,
      t.date,
      t.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8;" })
    );

    const link = document.createElement("a");
    link.href = url;
    link.download = "ridemie-transactions.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const stats = [
    {
      title: "Completed payments",
      value: money(totalPayments),
      icon: ArrowDownLeft,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Platform commission",
      value: money(totalCommission),
      icon: TrendingUp,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Completed refunds",
      value: money(totalRefunds),
      icon: RotateCcw,
      color: "bg-red-50 text-red-600",
    },
    {
      title: "Completed payouts",
      value: money(totalPayouts),
      icon: ArrowUpRight,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FA] px-4 py-8 text-slate-900 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1450px]">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold text-amber-600">
              ADMINISTRATION / FINANCE / TRANSACTIONS
            </p>
            <h1 className="text-3xl font-bold">Transaction management</h1>
            <p className="mt-2 text-sm text-slate-500">
              Track payments, refunds, partner payouts and platform earnings.
            </p>
          </div>

          <button
            onClick={exportTransactions}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#111827] px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            <ArrowDownToLine size={17} />
            Export transactions
          </button>
        </div>

        <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm text-slate-500">{stat.title}</p>
                    <h2 className="mt-3 text-xl font-bold sm:text-2xl">
                      {stat.value}
                    </h2>
                  </div>
                  <div className={`rounded-xl p-3 ${stat.color}`}>
                    <Icon size={22} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mb-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-amber-50 p-3 text-amber-700">
              <Wallet size={23} />
            </div>
            <div>
              <h2 className="font-bold">Platform financial snapshot</h2>
              <p className="text-sm text-slate-500">
                Based on completed sample transactions
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <div>
              <p className="text-sm text-slate-500">Gross completed payments</p>
              <h3 className="mt-2 text-2xl font-bold">
                {money(totalPayments)}
              </h3>
            </div>
            <div>
              <p className="text-sm text-slate-500">Platform commission</p>
              <h3 className="mt-2 text-2xl font-bold text-emerald-600">
                {money(totalCommission)}
              </h3>
            </div>
            <div>
              <p className="text-sm text-slate-500">Completed refunds</p>
              <h3 className="mt-2 text-2xl font-bold text-red-600">
                {money(totalRefunds)}
              </h3>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5">
            <div>
              <h2 className="text-lg font-bold">All transactions</h2>
              <p className="mt-1 text-sm text-slate-500">
                {filteredTransactions.length} transaction records found
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search transactions..."
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-amber-500"
                />
              </div>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-amber-500"
              >
                <option value="All">All transaction types</option>
                <option value="Payment">Payments</option>
                <option value="Refund">Refunds</option>
                <option value="Payout">Payouts</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-amber-500"
              >
                <option value="All">All statuses</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-semibold">Transaction</th>
                  <th className="px-6 py-4 font-semibold">Description</th>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Type</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Commission</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Update</th>
                </tr>
              </thead>

              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-slate-50 last:border-0"
                  >
                    <td className="px-6 py-5">
                      <p className="text-sm font-bold">{transaction.id}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        {transaction.reference}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <p className="text-sm font-medium">
                        {transaction.description}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {transaction.date}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-600">
                      {transaction.customer}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                          transaction.type === "Payment"
                            ? "bg-blue-50 text-blue-700"
                            : transaction.type === "Refund"
                            ? "bg-red-50 text-red-700"
                            : "bg-purple-50 text-purple-700"
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-sm font-semibold">
                      {money(transaction.amount)}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-500">
                      {money(transaction.commission)}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                          transaction.status === "Completed"
                            ? "bg-emerald-50 text-emerald-700"
                            : transaction.status === "Pending"
                            ? "bg-amber-50 text-amber-700"
                            : transaction.status === "Processing"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <select
                        value={transaction.status}
                        onChange={(e) =>
                          updateStatus(transaction.id, e.target.value)
                        }
                        className="rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs outline-none"
                      >
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Completed</option>
                        <option>Failed</option>
                      </select>
                    </td>
                  </tr>
                ))}

                {filteredTransactions.length === 0 && (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-6 py-12 text-center text-sm text-slate-500"
                    >
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-400">
          Demonstration financial records. Actual payment settlement,
          commission calculations and refunds must be verified and processed
          securely by the backend.
        </p>
      </div>
    </div>
  );
}

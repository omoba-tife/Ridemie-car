
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Wallet,
  Building2,
  UserRound,
  Hash,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

export default function PartnerWithdrawals() {
  const [form, setForm] = useState({
    amount: "",
    bank: "",
    accountName: "",
    accountNumber: "",
  });

  const [message, setMessage] = useState("");

  const updateField = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(
      "This is a frontend demonstration. Withdrawal requests will be processed once partner earnings and bank verification are connected."
    );
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 px-4 py-4 text-sm outline-none focus:border-[#b18c4d]";

  return (
    <main className="min-h-screen bg-[#f7f7f5] px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <Link to="/partner/earnings" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#a47f43]">
          <ArrowLeft size={17} /> Back to earnings
        </Link>

        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#ad894d]">
          Partner finances
        </p>
        <h1 className="text-3xl font-bold text-[#171717] sm:text-4xl">
          Withdraw earnings
        </h1>
        <p className="mt-3 text-sm text-gray-500">
          Request a payout to your verified bank account.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="space-y-6">
            <section className="rounded-2xl bg-[#171717] p-7 text-white">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[#d8bd88]">
                <Wallet size={24} />
              </div>
              <p className="text-sm text-white/60">Available balance</p>
              <h2 className="mt-3 text-3xl font-bold">₦0.00</h2>
              <p className="mt-4 text-xs leading-6 text-white/50">
                Only cleared earnings from eligible completed bookings can be withdrawn.
              </p>
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white p-7">
              <div className="flex items-center gap-3">
                <ShieldCheck size={23} className="text-[#b18c4d]" />
                <h2 className="font-bold text-[#171717]">Payout security</h2>
              </div>
              <p className="mt-4 text-sm leading-7 text-gray-500">
                Bank details will require verification before any payout can be approved.
              </p>
            </section>
          </aside>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-9">
            <h2 className="text-xl font-bold text-[#171717]">Withdrawal request</h2>
            <p className="mt-2 text-sm text-gray-500">
              Enter your preferred withdrawal amount and bank details.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Withdrawal amount (₦)</label>
                <div className="flex items-center rounded-xl border border-gray-200 px-4 focus-within:border-[#b18c4d]">
                  <Wallet size={18} className="text-gray-400" />
                  <input
                    required
                    type="number"
                    min="1"
                    name="amount"
                    value={form.amount}
                    onChange={updateField}
                    placeholder="Enter amount"
                    className="w-full bg-transparent px-3 py-4 text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Bank name</label>
                <div className="flex items-center rounded-xl border border-gray-200 px-4 focus-within:border-[#b18c4d]">
                  <Building2 size={18} className="text-gray-400" />
                  <select
                    required
                    name="bank"
                    value={form.bank}
                    onChange={updateField}
                    className="w-full bg-transparent px-3 py-4 text-sm outline-none"
                  >
                    <option value="">Select your bank</option>
                    <option>Access Bank</option>
                    <option>Ecobank</option>
                    <option>Fidelity Bank</option>
                    <option>First Bank</option>
                    <option>GTBank</option>
                    <option>Moniepoint</option>
                    <option>OPay</option>
                    <option>Palmpay</option>
                    <option>Stanbic IBTC</option>
                    <option>Sterling Bank</option>
                    <option>UBA</option>
                    <option>Union Bank</option>
                    <option>Wema Bank</option>
                    <option>Zenith Bank</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Account name</label>
                <div className="flex items-center rounded-xl border border-gray-200 px-4 focus-within:border-[#b18c4d]">
                  <UserRound size={18} className="text-gray-400" />
                  <input
                    required
                    name="accountName"
                    value={form.accountName}
                    onChange={updateField}
                    placeholder="Name on bank account"
                    className="w-full bg-transparent px-3 py-4 text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Account number</label>
                <div className="flex items-center rounded-xl border border-gray-200 px-4 focus-within:border-[#b18c4d]">
                  <Hash size={18} className="text-gray-400" />
                  <input
                    required
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    name="accountNumber"
                    value={form.accountNumber}
                    onChange={updateField}
                    placeholder="10-digit account number"
                    className="w-full bg-transparent px-3 py-4 text-sm outline-none"
                  />
                </div>
              </div>

              <button type="submit" className="w-full rounded-xl bg-[#b18c4d] py-4 text-sm font-bold text-white transition hover:bg-[#98743e]">
                Submit withdrawal request
              </button>

              {message && (
                <p role="status" className="rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                  {message}
                </p>
              )}
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

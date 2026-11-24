
import { useState } from "react";
import {
  CreditCard,
  Wallet,
  Banknote,
  ShieldCheck,
  ArrowDownToLine,
  Plus,
} from "lucide-react";

export default function Payments() {
  const [method, setMethod] = useState("online");
  const [notice, setNotice] = useState("");

  const handleContinue = () => {
    setNotice(
      method === "online"
        ? "Online payment will be available after the payment gateway is connected."
        : "Cash payment selection will be available when booking processing is connected."
    );
  };

  return (
    <main className="min-h-screen bg-[#f7f7f5] px-5 py-14 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#ad894d]">
          Account finance
        </p>
        <h1 className="text-3xl font-bold text-[#171717] sm:text-4xl">Payments</h1>
        <p className="mt-3 text-sm text-gray-500">
          Manage payment preferences and review your transaction history.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <section className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#171717]">Payment methods</h2>
                <p className="mt-2 text-sm text-gray-500">Choose how you prefer to pay for your bookings.</p>
              </div>
              <CreditCard size={25} className="text-[#b18c4d]" />
            </div>

            <div className="space-y-4">
              <button
                type="button"
                onClick={() => { setMethod("online"); setNotice(""); }}
                className={`flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition ${
                  method === "online" ? "border-[#b18c4d] bg-[#fbf8f2]" : "border-gray-200"
                }`}
              >
                <div className="rounded-xl bg-white p-3 text-[#a47f43]">
                  <CreditCard size={23} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#171717]">Online payment</h3>
                  <p className="mt-1 text-xs text-gray-500">Pay securely through a supported payment gateway.</p>
                </div>
                <span className={`h-5 w-5 rounded-full border-2 ${method === "online" ? "border-[#b18c4d] bg-[#b18c4d] shadow-[inset_0_0_0_4px_white]" : "border-gray-300"}`} />
              </button>

              <button
                type="button"
                onClick={() => { setMethod("cash"); setNotice(""); }}
                className={`flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition ${
                  method === "cash" ? "border-[#b18c4d] bg-[#fbf8f2]" : "border-gray-200"
                }`}
              >
                <div className="rounded-xl bg-white p-3 text-[#a47f43]">
                  <Banknote size={23} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#171717]">Cash payment</h3>
                  <p className="mt-1 text-xs text-gray-500">Pay in cash according to your booking arrangement.</p>
                </div>
                <span className={`h-5 w-5 rounded-full border-2 ${method === "cash" ? "border-[#b18c4d] bg-[#b18c4d] shadow-[inset_0_0_0_4px_white]" : "border-gray-300"}`} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleContinue}
              className="mt-7 w-full rounded-xl bg-[#b18c4d] py-4 text-sm font-bold text-white transition hover:bg-[#98743e]"
            >
              Continue with selected method
            </button>

            {notice && (
              <p role="status" className="mt-4 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                {notice}
              </p>
            )}
          </section>

          <div className="space-y-6">
            <section className="rounded-2xl bg-[#171717] p-7 text-white">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[#d8bd88]">
                <Wallet size={24} />
              </div>
              <p className="text-sm text-white/60">Outstanding balance</p>
              <h2 className="mt-2 text-3xl font-bold">₦0.00</h2>
              <p className="mt-4 text-xs leading-6 text-white/50">
                Your actual account balance and outstanding invoices will appear here once payment services are connected.
              </p>
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white p-7">
              <div className="mb-4 flex items-center gap-3">
                <ShieldCheck className="text-[#b18c4d]" size={23} />
                <h2 className="font-bold text-[#171717]">Secure payments</h2>
              </div>
              <p className="text-sm leading-7 text-gray-500">
                Payment processing will use a secure gateway. RideMie will not store your full card details.
              </p>
            </section>
          </div>
        </div>

        <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#171717]">Transaction history</h2>
              <p className="mt-1 text-sm text-gray-500">Your recent payment activity</p>
            </div>
            <ArrowDownToLine size={22} className="text-gray-400" />
          </div>

          <div className="py-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f6f0e5] text-[#a47f43]">
              <CreditCard size={28} />
            </div>
            <h3 className="mt-5 font-bold text-[#171717]">No transactions yet</h3>
            <p className="mt-2 text-sm text-gray-500">
              Completed payments will appear here.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

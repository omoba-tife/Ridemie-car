
import { useState } from "react";
import {
  Settings,
  Globe,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Bell,
  Save,
  CreditCard,
  Clock,
} from "lucide-react";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    platformName: "RideMie",
    email: "support@ridemie.com",
    phone: "+234 800 000 0000",
    location: "Lagos, Nigeria",
    currency: "NGN",
    timezone: "Africa/Lagos",
    commission: "10",
    bookingApproval: true,
    partnerRegistration: true,
    emailNotifications: true,
    maintenanceMode: false,
  });

  const [message, setMessage] = useState("");

  const updateField = (field, value) => {
    setSettings((current) => ({ ...current, [field]: value }));
    setMessage("");
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("ridemie_admin_settings", JSON.stringify(settings));
    setMessage("Settings saved in this browser.");
  };

  const toggleItems = [
    {
      field: "bookingApproval",
      title: "Booking approval",
      description: "Require administrator review for selected bookings.",
    },
    {
      field: "partnerRegistration",
      title: "Partner registration",
      description: "Allow new vehicle owners to register on RideMie.",
    },
    {
      field: "emailNotifications",
      title: "Email notifications",
      description: "Enable platform email notification preferences.",
    },
    {
      field: "maintenanceMode",
      title: "Maintenance mode",
      description: "Flag the platform as temporarily unavailable.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FA] px-4 py-8 text-slate-900 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-amber-600">
            ADMINISTRATION / CONFIGURATION
          </p>
          <h1 className="text-3xl font-bold">Platform settings</h1>
          <p className="mt-2 text-sm text-slate-500">
            Configure general platform information and operational preferences.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-amber-50 p-3 text-amber-700">
                <Globe size={22} />
              </div>
              <div>
                <h2 className="font-bold">General information</h2>
                <p className="text-sm text-slate-500">
                  Basic RideMie platform details
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                {
                  label: "Platform name",
                  field: "platformName",
                  icon: Settings,
                },
                {
                  label: "Support email",
                  field: "email",
                  icon: Mail,
                },
                {
                  label: "Contact phone",
                  field: "phone",
                  icon: Phone,
                },
                {
                  label: "Business location",
                  field: "location",
                  icon: MapPin,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <label key={item.field}>
                    <span className="mb-2 block text-sm font-semibold">
                      {item.label}
                    </span>
                    <div className="relative">
                      <Icon
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        value={settings[item.field]}
                        onChange={(e) =>
                          updateField(item.field, e.target.value)
                        }
                        className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-amber-500"
                      />
                    </div>
                  </label>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <CreditCard size={22} />
              </div>
              <div>
                <h2 className="font-bold">Regional and financial settings</h2>
                <p className="text-sm text-slate-500">
                  Currency, time zone and default commission
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label>
                <span className="mb-2 block text-sm font-semibold">
                  Platform currency
                </span>
                <select
                  value={settings.currency}
                  onChange={(e) => updateField("currency", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-amber-500"
                >
                  <option value="NGN">NGN - Nigerian Naira</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="GBP">GBP - British Pound</option>
                </select>
              </label>

              <label>
                <span className="mb-2 block text-sm font-semibold">
                  Time zone
                </span>
                <div className="relative">
                  <Clock
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    value={settings.timezone}
                    onChange={(e) => updateField("timezone", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-amber-500"
                  />
                </div>
              </label>

              <label>
                <span className="mb-2 block text-sm font-semibold">
                  Default partner commission (%)
                </span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.commission}
                  onChange={(e) => updateField("commission", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-amber-500"
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                <Bell size={22} />
              </div>
              <div>
                <h2 className="font-bold">Platform operations</h2>
                <p className="text-sm text-slate-500">
                  Configure platform behaviour
                </p>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {toggleItems.map((item) => (
                <div
                  key={item.field}
                  className="flex items-center justify-between gap-4 py-5"
                >
                  <div>
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={settings[item.field]}
                    onClick={() =>
                      updateField(item.field, !settings[item.field])
                    }
                    className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                      settings[item.field] ? "bg-emerald-600" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                        settings[item.field] ? "left-6" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {message && (
            <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              {message}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-[#111827] px-6 py-3 font-semibold text-white transition hover:bg-slate-700"
            >
              <Save size={18} />
              Save settings
            </button>
          </div>
        </form>

        <div className="mt-6 flex gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber-800">
          <ShieldCheck size={20} className="shrink-0" />
          These settings are currently stored in this browser only. Critical
          platform controls must be enforced by the backend.
        </div>
      </div>
    </div>
  );
}


import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Users,
  Car,
  CalendarDays,
  CreditCard,
  Receipt,
  Percent,
  Star,
  Bell,
  MessageSquare,
  Settings,
  Handshake,
  AlertTriangle,
  ClipboardList,
  Tag,
  Menu,
  X,
  Search,
  LogOut,
  ShieldCheck,
  MapPin,
  Layers,
  HelpCircle,
  Activity,
  Image,
} from "lucide-react";

const navigation = [
  {
    title: "OVERVIEW",
    links: [
      { label: "Dashboard", path: "/admin", icon: LayoutDashboard, end: true },
      { label: "Analytics", path: "/admin/analytics", icon: BarChart3 },
      { label: "Reports", path: "/admin/reports", icon: FileText },
      { label: "Activity Centre", path: "/admin/activity", icon: Activity },
    ],
  },
  {
    title: "MANAGEMENT",
    links: [
      { label: "Users", path: "/admin/users", icon: Users },
      { label: "Partners", path: "/admin/partners", icon: Handshake },
      { label: "Vehicles", path: "/admin/vehicles", icon: Car },
      { label: "Bookings", path: "/admin/bookings", icon: CalendarDays },
      { label: "Disputes", path: "/admin/disputes", icon: AlertTriangle },
      { label: "Locations", path: "/admin/locations", icon: MapPin },
    ],
  },
  {
    title: "FLEET CONFIGURATION",
    links: [
      { label: "Categories", path: "/admin/categories", icon: Layers },
    ],
  },
  {
    title: "FINANCE",
    links: [
      { label: "Payments", path: "/admin/payments", icon: CreditCard },
      { label: "Transactions", path: "/admin/transactions", icon: Receipt },
      { label: "Commissions", path: "/admin/commissions", icon: Percent },
      { label: "Promotions", path: "/admin/promotions", icon: Tag },
    ],
  },
  {
    title: "WEBSITE MANAGEMENT",
    links: [
      { label: "Website Content", path: "/admin/content", icon: Image },
    ],
  },
  {
    title: "ENGAGEMENT",
    links: [
      { label: "Reviews", path: "/admin/reviews", icon: Star },
      { label: "FAQs", path: "/admin/faqs", icon: HelpCircle },
      { label: "Notifications", path: "/admin/notifications", icon: Bell },
      { label: "Support", path: "/admin/support", icon: MessageSquare },
    ],
  },
  {
    title: "SYSTEM",
    links: [
      { label: "Audit Logs", path: "/admin/audit-logs", icon: ClipboardList },
      { label: "Settings", path: "/admin/settings", icon: Settings },
    ],
  },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {sidebarOpen && (
        <button
          aria-label="Close sidebar overlay"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-slate-950 text-white transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <Link
            to="/admin"
            onClick={closeSidebar}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-slate-950">
              <Car size={22} />
            </div>

            <div>
              <p className="text-xl font-black tracking-wide">RideMie</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-amber-400">
                Administration
              </p>
            </div>
          </Link>

          <button
            onClick={closeSidebar}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/10 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5">
          {navigation.map((section) => (
            <div key={section.title} className="mb-7">
              <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.2em] text-slate-500">
                {section.title}
              </p>

              <div className="space-y-1">
                {section.links.map(({ label, path, icon: Icon, end }) => (
                  <NavLink
                    key={path}
                    to={path}
                    end={end}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                        isActive
                          ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/10"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`
                    }
                  >
                    <Icon size={18} />
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 font-bold text-slate-950">
              TT
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                Tife Tech
              </p>
              <p className="text-xs text-slate-400">Super Admin</p>
            </div>

            <ShieldCheck size={18} className="text-amber-400" />
          </div>

          <Link
            to="/"
            onClick={closeSidebar}
            className="mt-3 flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
          >
            <LogOut size={18} />
            Back to website
          </Link>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl border border-slate-200 p-2 text-slate-700 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={21} />
            </button>

            <div>
              <p className="text-sm font-bold text-slate-900">
                Admin Control Centre
              </p>
              <p className="hidden text-xs text-slate-500 sm:block">
                Manage the RideMie platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 md:flex">
              <Search size={16} className="text-slate-400" />
              <span className="text-xs text-slate-400">
                Platform administration
              </span>
            </div>

            <Link
              to="/admin/notifications"
              className="relative rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50"
              aria-label="Notifications"
            >
              <Bell size={19} />
            </Link>

            <div className="hidden h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white sm:flex">
              TT
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-80px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

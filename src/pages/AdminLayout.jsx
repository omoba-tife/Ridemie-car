
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CarFront,
  Settings,
  Percent,
  Headset,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  ExternalLink,
} from "lucide-react";

const navigation = [
  {
    title: "OVERVIEW",
    links: [
      { name: "Dashboard", path: "/admin", icon: LayoutDashboard, end: true },
    ],
  },
  {
    title: "MANAGEMENT",
    links: [
      { name: "Users", path: "/admin/users", icon: Users },
      { name: "Vehicles", path: "/admin/vehicles", icon: CarFront },
      { name: "Commissions", path: "/admin/commissions", icon: Percent },
    ],
  },
  {
    title: "PLATFORM",
    links: [
      { name: "Support", path: "/admin/support", icon: Headset },
      { name: "Settings", path: "/admin/settings", icon: Settings },
    ],
  },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F6F8] text-[#171717]">
      {sidebarOpen && (
        <button
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[265px] flex-col bg-[#101114] text-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[78px] items-center justify-between border-b border-white/10 px-6">
          <div>
            <h1 className="text-2xl font-black tracking-tight">
              Ride<span className="text-[#C9A96E]">Mie</span>
            </h1>
            <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[3px] text-gray-500">
              Administration
            </p>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-gray-400 hover:bg-white/10 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-7">
          {navigation.map((group) => (
            <div key={group.title} className="mb-8">
              <p className="mb-3 px-3 text-[10px] font-bold tracking-[2px] text-gray-500">
                {group.title}
              </p>

              <div className="space-y-1">
                {group.links.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.end}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                          isActive
                            ? "bg-[#C9A96E] text-[#171717]"
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                        }`
                      }
                    >
                      <Icon size={18} />
                      {item.name}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 p-4">
          <button
            onClick={() => navigate("/")}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
          >
            <ExternalLink size={18} />
            View RideMie Website
          </button>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-[265px]">
        <header className="sticky top-0 z-30 flex h-[78px] items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-7">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              <Menu size={22} />
            </button>

            <div className="hidden items-center gap-3 rounded-xl bg-gray-100 px-4 py-2.5 sm:flex">
              <Search size={17} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search administration..."
                className="w-48 bg-transparent text-sm outline-none placeholder:text-gray-400"
              />
            </div>

            <span className="text-sm font-semibold text-gray-700 sm:hidden">
              Admin Panel
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <button
              aria-label="Notifications"
              className="relative rounded-xl p-2 text-gray-500 hover:bg-gray-100"
            >
              <Bell size={20} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#C9A96E]" />
            </button>

            <div className="hidden h-8 w-px bg-gray-200 sm:block" />

            <button className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#171717] text-xs font-bold text-[#C9A96E]">
                TT
              </div>
              <div className="hidden text-left sm:block">
                <p className="text-xs font-bold text-gray-900">Administrator</p>
                <p className="text-[10px] text-gray-500">Platform owner</p>
              </div>
              <ChevronDown size={15} className="hidden text-gray-400 sm:block" />
            </button>
          </div>
        </header>

        <main className="min-h-[calc(100vh-78px)] p-4 sm:p-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


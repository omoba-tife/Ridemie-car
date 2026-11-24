
import { useMemo, useState } from "react";
import {
  Bell,
  CheckCheck,
  Check,
  Trash2,
  CalendarCheck,
  CreditCard,
  CarFront,
  UserPlus,
  AlertTriangle,
  Info,
} from "lucide-react";
import AdminPageHeader from "../components/admin/AdminPageHeader";

const initialNotifications = [
  {
    id: 1,
    title: "New booking received",
    message: "A new reservation has been submitted for a Mercedes-Benz GLE.",
    type: "booking",
    time: "10 minutes ago",
    read: false,
  },
  {
    id: 2,
    title: "Payment requires attention",
    message: "A transaction is currently marked as pending.",
    type: "payment",
    time: "35 minutes ago",
    read: false,
  },
  {
    id: 3,
    title: "New partner registration",
    message: "A vehicle owner has submitted a partnership application.",
    type: "user",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 4,
    title: "Vehicle awaiting review",
    message: "A newly submitted vehicle listing needs administrator approval.",
    type: "vehicle",
    time: "Yesterday",
    read: true,
  },
  {
    id: 5,
    title: "Platform information",
    message: "Remember to review your platform settings and commission rates.",
    type: "system",
    time: "Yesterday",
    read: true,
  },
];

const iconMap = {
  booking: CalendarCheck,
  payment: CreditCard,
  user: UserPlus,
  vehicle: CarFront,
  system: Info,
};

const iconColors = {
  booking: "bg-blue-50 text-blue-600",
  payment: "bg-amber-50 text-amber-600",
  user: "bg-purple-50 text-purple-600",
  vehicle: "bg-green-50 text-green-600",
  system: "bg-gray-100 text-gray-600",
};

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("All");

  const unreadCount = notifications.filter((item) => !item.read).length;

  const visibleNotifications = useMemo(() => {
    if (filter === "Unread") {
      return notifications.filter((item) => !item.read);
    }

    if (filter === "Read") {
      return notifications.filter((item) => item.read);
    }

    return notifications;
  }, [notifications, filter]);

  const markRead = (id) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const markAllRead = () => {
    setNotifications((current) =>
      current.map((item) => ({ ...item, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="mx-auto max-w-5xl">
      <AdminPageHeader
        title="Notifications"
        description="Keep track of bookings, payments, vehicle submissions and platform activity."
        action={
          <button
            onClick={markAllRead}
            disabled={unreadCount === 0}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <CheckCheck size={16} />
            Mark all read
          </button>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total notifications</p>
              <h3 className="mt-2 text-3xl font-bold text-gray-900">
                {notifications.length}
              </h3>
            </div>
            <div className="rounded-xl bg-[#F7F2E9] p-3 text-[#A18450]">
              <Bell size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Unread notifications</p>
              <h3 className="mt-2 text-3xl font-bold text-gray-900">
                {unreadCount}
              </h3>
            </div>
            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
              <AlertTriangle size={22} />
            </div>
          </div>
        </div>
      </div>

      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-bold text-gray-900">Recent Activity</h2>
            <p className="mt-1 text-xs text-gray-400">
              Your latest platform alerts
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none"
            >
              <option>All</option>
              <option>Unread</option>
              <option>Read</option>
            </select>

            <button
              onClick={clearAll}
              disabled={notifications.length === 0}
              className="inline-flex items-center gap-2 rounded-xl border border-red-100 px-3 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-40"
            >
              <Trash2 size={14} />
              Clear all
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {visibleNotifications.map((item) => {
            const Icon = iconMap[item.type] || Info;

            return (
              <div
                key={item.id}
                className={`flex gap-4 p-5 transition hover:bg-gray-50 ${
                  !item.read ? "bg-[#FCFAF6]" : "bg-white"
                }`}
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    iconColors[item.type]
                  }`}
                >
                  <Icon size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-bold text-gray-900">
                      {item.title}
                    </h3>
                    {!item.read && (
                      <span className="h-2 w-2 rounded-full bg-[#C9A96E]" />
                    )}
                  </div>

                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    {item.message}
                  </p>

                  <p className="mt-2 text-xs text-gray-400">{item.time}</p>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-2">
                  {!item.read && (
                    <button
                      onClick={() => markRead(item.id)}
                      title="Mark as read"
                      className="rounded-lg p-2 text-gray-400 hover:bg-green-50 hover:text-green-600"
                    >
                      <Check size={17} />
                    </button>
                  )}

                  <button
                    onClick={() => deleteNotification(item.id)}
                    title="Delete notification"
                    className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}

          {visibleNotifications.length === 0 && (
            <div className="px-5 py-16 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <Bell size={25} />
              </div>
              <h3 className="font-bold text-gray-800">
                No notifications here
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                There are no notifications matching this filter.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}


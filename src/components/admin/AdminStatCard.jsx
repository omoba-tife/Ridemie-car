
import {
  ArrowDownRight,
  ArrowUpRight,
  Wallet,
} from "lucide-react";

export default function AdminStatCard({
  title,
  value,
  change,
  positive = true,
  icon: Icon = Wallet,
  description,
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-[#171717] sm:text-3xl">
            {value}
          </h3>
        </div>

        <div className="rounded-xl bg-[#F7F2E9] p-3 text-[#A18450]">
          <Icon size={21} />
        </div>
      </div>

      {(change || description) && (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {change && (
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                positive
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {positive ? (
                <ArrowUpRight size={13} />
              ) : (
                <ArrowDownRight size={13} />
              )}
              {change}
            </span>
          )}

          {description && (
            <span className="text-xs text-gray-400">{description}</span>
          )}
        </div>
      )}
    </div>
  );
}

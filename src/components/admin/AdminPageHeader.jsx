
import { ChevronRight } from "lucide-react";

export default function AdminPageHeader({
  title,
  description,
  breadcrumb = "Administration",
  action,
}) {
  return (
    <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <div className="mb-3 flex items-center gap-2 text-xs font-medium text-gray-400">
          <span>{breadcrumb}</span>
          <ChevronRight size={13} />
          <span className="text-[#A18450]">{title}</span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-[#171717] sm:text-3xl">
          {title}
        </h1>

        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
            {description}
          </p>
        )}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}

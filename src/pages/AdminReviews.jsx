
import { useMemo, useState } from "react";
import {
  Search,
  Star,
  MessageSquare,
  Trash2,
  Eye,
  X,
  CheckCircle2,
  Flag,
} from "lucide-react";
import AdminPageHeader from "../components/admin/AdminPageHeader";
import AdminStatCard from "../components/admin/AdminStatCard";

const initialReviews = [
  {
    id: 1,
    customer: "Daniel Okafor",
    vehicle: "Mercedes-Benz GLE",
    rating: 5,
    date: "2026-11-22",
    comment:
      "Excellent vehicle and outstanding service. The entire booking process was smooth.",
    status: "Published",
  },
  {
    id: 2,
    customer: "Amara Johnson",
    vehicle: "Range Rover Sport",
    rating: 4,
    date: "2026-11-20",
    comment:
      "Beautiful car and comfortable experience. Delivery could have been a little faster.",
    status: "Published",
  },
  {
    id: 3,
    customer: "Michael Adeyemi",
    vehicle: "Porsche 911",
    rating: 5,
    date: "2026-11-18",
    comment:
      "Amazing driving experience. I will definitely use RideMie again.",
    status: "Published",
  },
  {
    id: 4,
    customer: "Grace Williams",
    vehicle: "Mercedes-Benz S-Class",
    rating: 2,
    date: "2026-11-15",
    comment:
      "The vehicle was not ready at the agreed pickup time. The experience was disappointing.",
    status: "Pending",
  },
  {
    id: 5,
    customer: "Samuel James",
    vehicle: "BMW 5 Series",
    rating: 1,
    date: "2026-11-12",
    comment:
      "This review is awaiting moderation.",
    status: "Pending",
  },
];

export default function AdminReviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const averageRating = reviews.length
    ? (
        reviews.reduce((total, review) => total + review.rating, 0) /
        reviews.length
      ).toFixed(1)
    : "0.0";

  const published = reviews.filter(
    (review) => review.status === "Published"
  );

  const pending = reviews.filter(
    (review) => review.status === "Pending"
  );

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const matchesSearch = [
        review.customer,
        review.vehicle,
        review.comment,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || review.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [reviews, search, filter]);

  const updateStatus = (id, status) => {
    setReviews((current) =>
      current.map((review) =>
        review.id === id ? { ...review, status } : review
      )
    );

    setSelected((current) =>
      current?.id === id ? { ...current, status } : current
    );
  };

  const deleteReview = (id) => {
    setReviews((current) =>
      current.filter((review) => review.id !== id)
    );

    setSelected(null);
  };

  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader
        title="Reviews & Ratings"
        description="Monitor customer experiences, review vehicle feedback and manage published reviews."
      />

      <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          title="Total Reviews"
          value={reviews.length}
          icon={MessageSquare}
        />

        <AdminStatCard
          title="Average Rating"
          value={`${averageRating}/5`}
          icon={Star}
          description="Across all sample reviews"
        />

        <AdminStatCard
          title="Published Reviews"
          value={published.length}
          icon={CheckCircle2}
        />

        <AdminStatCard
          title="Awaiting Moderation"
          value={pending.length}
          icon={Flag}
          positive={false}
          change="Needs review"
        />
      </div>

      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-bold text-gray-900">Customer Reviews</h2>
            <p className="mt-1 text-xs text-gray-400">
              Review customer feedback and moderation status
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5">
              <Search size={17} className="text-gray-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search reviews..."
                className="w-full text-sm outline-none sm:w-48"
              />
            </div>

            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none"
            >
              <option>All</option>
              <option>Published</option>
              <option>Pending</option>
              <option>Hidden</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col gap-4 p-5 transition hover:bg-gray-50/70 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="flex min-w-0 gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F7F2E9] text-sm font-bold text-[#A18450]">
                  {review.customer
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-bold text-gray-900">
                      {review.customer}
                    </h3>

                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                        review.status === "Published"
                          ? "bg-green-50 text-green-700"
                          : review.status === "Pending"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {review.status}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-gray-400">
                    {review.vehicle} · {review.date}
                  </p>

                  <div className="mt-2 flex items-center gap-1 text-[#C9A96E]">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        size={14}
                        fill={index < review.rating ? "currentColor" : "none"}
                      />
                    ))}
                    <span className="ml-1 text-xs font-semibold text-gray-600">
                      {review.rating}.0
                    </span>
                  </div>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
                    {review.comment}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 sm:justify-end">
                <button
                  onClick={() => setSelected(review)}
                  title="View review"
                  className="rounded-lg border border-gray-200 p-2.5 text-gray-500 hover:bg-gray-100"
                >
                  <Eye size={16} />
                </button>

                {review.status !== "Published" && (
                  <button
                    onClick={() => updateStatus(review.id, "Published")}
                    title="Publish review"
                    className="rounded-lg border border-green-100 p-2.5 text-green-600 hover:bg-green-50"
                  >
                    <CheckCircle2 size={16} />
                  </button>
                )}

                {review.status === "Published" && (
                  <button
                    onClick={() => updateStatus(review.id, "Hidden")}
                    title="Hide review"
                    className="rounded-lg border border-amber-100 p-2.5 text-amber-600 hover:bg-amber-50"
                  >
                    <Flag size={16} />
                  </button>
                )}

                <button
                  onClick={() => deleteReview(review.id)}
                  title="Delete review"
                  className="rounded-lg border border-red-100 p-2.5 text-red-500 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {filteredReviews.length === 0 && (
            <div className="px-5 py-16 text-center">
              <MessageSquare
                size={28}
                className="mx-auto mb-3 text-gray-300"
              />
              <h3 className="font-bold text-gray-800">No reviews found</h3>
              <p className="mt-2 text-sm text-gray-400">
                Try changing your search or filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#A18450]">
                  Review details
                </p>
                <h2 className="mt-1 text-xl font-bold text-gray-900">
                  {selected.customer}
                </h2>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400">Vehicle</p>
                <p className="mt-1 text-sm font-semibold text-gray-800">
                  {selected.vehicle}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Rating</p>
                <div className="mt-2 flex items-center gap-1 text-[#C9A96E]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={18}
                      fill={index < selected.rating ? "currentColor" : "none"}
                    />
                  ))}
                  <span className="ml-2 text-sm font-bold text-gray-700">
                    {selected.rating}/5
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400">Customer feedback</p>
                <p className="mt-2 rounded-xl bg-gray-50 p-4 text-sm leading-7 text-gray-600">
                  {selected.comment}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Moderation status</p>
                <select
                  value={selected.status}
                  onChange={(event) =>
                    updateStatus(selected.id, event.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#C9A96E]"
                >
                  <option>Pending</option>
                  <option>Published</option>
                  <option>Hidden</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="mt-6 w-full rounded-xl bg-[#171717] py-3 text-sm font-semibold text-white hover:bg-black"
            >
              Close details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

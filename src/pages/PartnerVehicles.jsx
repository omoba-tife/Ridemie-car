
import { Link } from "react-router-dom";
import {
  CarFront,
  Plus,
  Search,
  MapPin,
  Users,
  Eye,
  Pencil,
  MoreHorizontal,
} from "lucide-react";

const partnerVehicles = [
  {
    id: 1,
    name: "Mercedes-Benz GLE",
    category: "Luxury SUV",
    location: "Lagos",
    price: "₦180,000",
    status: "Available",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 2,
    name: "Range Rover Sport",
    category: "Premium SUV",
    location: "Abuja",
    price: "₦220,000",
    status: "Under review",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=600&q=85",
  },
];

export default function PartnerVehicles() {
  return (
    <main className="min-h-screen bg-[#f7f7f5] px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#ad894d]">
          Fleet management
        </p>

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-bold text-[#171717] sm:text-4xl">
              My vehicles
            </h1>
            <p className="mt-3 text-sm text-gray-500">
              Manage your listed vehicles and their availability.
            </p>
          </div>

          <Link to="/partner/add-vehicle" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#b18c4d] px-6 py-4 text-sm font-bold text-white">
            <Plus size={18} /> Add vehicle
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-6">
            <p className="text-sm text-gray-500">Total vehicles</p>
            <h2 className="mt-3 text-3xl font-bold text-[#171717]">02</h2>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6">
            <p className="text-sm text-gray-500">Available</p>
            <h2 className="mt-3 text-3xl font-bold text-green-700">01</h2>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6">
            <p className="text-sm text-gray-500">Under review</p>
            <h2 className="mt-3 text-3xl font-bold text-amber-600">01</h2>
          </div>
        </div>

        <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-[#171717]">Your listings</h2>
              <p className="mt-1 text-sm text-gray-500">Review your submitted vehicles.</p>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3">
              <Search size={17} className="text-gray-400" />
              <input placeholder="Search vehicles..." className="w-full text-sm outline-none sm:w-48" />
            </div>
          </div>

          <div className="space-y-5">
            {partnerVehicles.map((car) => (
              <article key={car.id} className="flex flex-col gap-5 rounded-2xl border border-gray-100 p-4 sm:flex-row sm:items-center">
                <img src={car.image} alt={car.name} className="h-48 w-full rounded-xl object-cover sm:h-32 sm:w-48" />

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-bold text-[#171717]">{car.name}</h3>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                      car.status === "Available"
                        ? "bg-green-50 text-green-700"
                        : "bg-amber-50 text-amber-700"
                    }`}>
                      {car.status}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-gray-500">{car.category}</p>

                  <div className="mt-4 flex flex-wrap gap-5 text-xs text-gray-500">
                    <span className="flex items-center gap-2"><MapPin size={15} /> {car.location}</span>
                    <span className="flex items-center gap-2"><Users size={15} /> Vehicle listing</span>
                  </div>

                  <p className="mt-4 font-bold text-[#171717]">
                    {car.price}<span className="text-xs font-normal text-gray-400"> / day</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 sm:flex-col">
                  <button type="button" title="View vehicle" className="rounded-xl border border-gray-200 p-3 text-gray-500 hover:text-[#a47f43]">
                    <Eye size={18} />
                  </button>
                  <button type="button" title="Edit vehicle" className="rounded-xl border border-gray-200 p-3 text-gray-500 hover:text-[#a47f43]">
                    <Pencil size={18} />
                  </button>
                  <button type="button" title="More options" className="rounded-xl border border-gray-200 p-3 text-gray-500 hover:text-[#a47f43]">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-6 text-xs leading-5 text-gray-400">
            These are sample listings for the interface preview. Your actual submitted vehicles will be displayed here after backend integration.
          </p>
        </section>
      </div>
    </main>
  );
}

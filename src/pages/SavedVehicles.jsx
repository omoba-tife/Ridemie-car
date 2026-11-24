
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Users, BriefcaseBusiness, ArrowRight, Trash2 } from "lucide-react";
import { vehicles } from "../data/vehicles";

export default function SavedVehicles() {
  const [saved, setSaved] = useState([
    "mercedes-gle",
    "range-rover-sport",
    "porsche-911",
  ]);

  const savedVehicles = vehicles.filter((car) => saved.includes(car.id));

  const removeVehicle = (id) => {
    setSaved((current) => current.filter((item) => item !== id));
  };

  return (
    <main className="min-h-screen bg-[#f7f7f5] px-5 py-14 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#ad894d]">
          Your collection
        </p>
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-bold text-[#171717] sm:text-4xl">
              Saved vehicles
            </h1>
            <p className="mt-3 text-sm text-gray-500">
              Keep your favourite vehicles close and book when you're ready.
            </p>
          </div>
          <Link
            to="/fleet"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#171717] px-6 py-4 text-sm font-bold text-white"
          >
            Explore fleet <ArrowRight size={17} />
          </Link>
        </div>

        {savedVehicles.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-gray-100 bg-white px-6 py-20 text-center">
            <Heart size={38} className="mx-auto text-[#b18c4d]" />
            <h2 className="mt-5 text-2xl font-bold text-[#171717]">
              No saved vehicles yet
            </h2>
            <p className="mt-3 text-sm text-gray-500">
              Explore our fleet and keep the vehicles you love in one place.
            </p>
            <Link to="/fleet" className="mt-7 inline-flex rounded-xl bg-[#b18c4d] px-6 py-4 text-sm font-bold text-white">
              Browse vehicles
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {savedVehicles.map((car) => (
              <article key={car.id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
                <div className="relative">
                  <img src={car.image} alt={car.name} className="h-64 w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeVehicle(car.id)}
                    aria-label={`Remove ${car.name} from saved vehicles`}
                    className="absolute right-4 top-4 rounded-full bg-white p-3 text-red-500 shadow-lg transition hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#ad894d]">
                    {car.type}
                  </p>
                  <h2 className="mt-2 text-xl font-bold text-[#171717]">{car.name}</h2>

                  <div className="mt-5 flex items-center gap-5 text-sm text-gray-500">
                    <span className="flex items-center gap-2"><Users size={16} /> {car.seats} seats</span>
                    <span className="flex items-center gap-2"><BriefcaseBusiness size={16} /> {car.luggage} bags</span>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
                    <div>
                      <p className="text-xs text-gray-400">Starting from</p>
                      <p className="mt-1 text-lg font-bold text-[#171717]">
                        ₦{car.price.toLocaleString("en-NG")}
                        <span className="text-xs font-normal text-gray-400"> / day</span>
                      </p>
                    </div>
                    <Link to={`/fleet/${car.id}`} className="rounded-xl bg-[#b18c4d] px-5 py-3 text-sm font-bold text-white">
                      View car
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <p className="mt-8 text-xs leading-5 text-gray-400">
          Your saved list currently uses temporary frontend state. It will be stored in your account when the backend is connected.
        </p>
      </div>
    </main>
  );
}

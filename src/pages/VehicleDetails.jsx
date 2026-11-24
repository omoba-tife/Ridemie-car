
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Users,
  Fuel,
  Settings2,
  BriefcaseBusiness,
  ShieldCheck,
  CheckCircle2,
  CalendarDays,
  Headphones,
} from "lucide-react";
import { vehicles } from "../data/vehicles";

export default function VehicleDetails() {
  const { id } = useParams();
  const car = vehicles.find((vehicle) => vehicle.id === id);

  if (!car) {
    return (
      <section className="flex min-h-[65vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-bold">Vehicle not found</h1>
        <p className="mt-4 text-gray-500">
          This vehicle may no longer be available.
        </p>
        <Link
          to="/fleet"
          className="mt-8 bg-[#080D14] px-8 py-4 text-sm font-bold text-white"
        >
          Explore Our Fleet
        </Link>
      </section>
    );
  }

  const specifications = [
    { icon: Users, label: "Passengers", value: `${car.seats} Seats` },
    { icon: Fuel, label: "Fuel Type", value: car.fuel },
    { icon: Settings2, label: "Transmission", value: car.transmission },
    { icon: BriefcaseBusiness, label: "Luggage", value: `${car.luggage} Bags` },
  ];

  return (
    <main className="bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100 px-6 py-6 lg:px-12">
        <div className="mx-auto flex max-w-[1500px] items-center gap-3 text-sm">
          <Link to="/fleet" className="flex items-center gap-2 text-gray-500 hover:text-black">
            <ArrowLeft size={16} />
            Our Fleet
          </Link>
          <span className="text-gray-300">/</span>
          <span className="font-semibold text-gray-900">{car.name}</span>
        </div>
      </div>

      {/* Vehicle Hero */}
      <section className="px-6 pb-16 pt-10 lg:px-12 lg:pb-24">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[4px] text-[#B68A45]">
                {car.brand} · {car.category}
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-[#111827] sm:text-5xl lg:text-6xl">
                {car.name}
              </h1>
              <p className="mt-3 text-gray-500">{car.type}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400">
                Starting from
              </p>
              <p className="mt-2 text-3xl font-bold text-[#111827]">
                ₦{car.price.toLocaleString("en-NG")}
                <span className="text-sm font-normal text-gray-400"> / day</span>
              </p>
            </div>
          </div>

          <div className="relative h-[350px] overflow-hidden bg-gray-100 sm:h-[480px] lg:h-[650px]">
            <img
              src={car.image}
              alt={car.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-6 left-6 bg-[#080D14] px-5 py-3 text-xs font-bold uppercase tracking-widest text-white">
              {car.category} Collection
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Information */}
      <section className="bg-[#F8F8F6] px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-[1.5fr_0.8fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[4px] text-[#B68A45]">
              Discover the experience
            </p>

            <h2 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight text-[#111827] lg:text-4xl">
              Designed to make every journey exceptional.
            </h2>

            <p className="mt-7 max-w-2xl text-base leading-8 text-gray-500">
              {car.description}
            </p>

            <h3 className="mt-14 text-xl font-bold text-[#111827]">
              Vehicle specifications
            </h3>

            <div className="mt-7 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {specifications.map(({ icon: Icon, label, value }) => (
                <div key={label} className="border border-gray-200 bg-white p-5">
                  <Icon size={22} className="text-[#B68A45]" />
                  <p className="mt-5 text-xs text-gray-400">{label}</p>
                  <p className="mt-2 text-sm font-bold text-gray-900">{value}</p>
                </div>
              ))}
            </div>

            <h3 className="mt-14 text-xl font-bold text-[#111827]">
              Features and amenities
            </h3>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {car.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle2 size={18} className="text-[#B68A45]" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Booking Card */}
          <aside className="h-fit border border-gray-200 bg-white p-7 lg:p-9">
            <p className="text-xs font-bold uppercase tracking-[3px] text-[#B68A45]">
              Reserve your vehicle
            </p>

            <h3 className="mt-4 text-2xl font-bold text-gray-900">
              Your next journey starts here.
            </h3>

            <div className="my-8 border-y border-gray-100 py-7">
              <p className="text-xs text-gray-400">Daily rental rate</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                ₦{car.price.toLocaleString("en-NG")}
                <span className="text-sm font-normal text-gray-400"> / day</span>
              </p>
            </div>

            <Link
              to={`/booking?vehicle=${car.id}`}
              className="flex items-center justify-between bg-[#D9AC62] px-6 py-5 text-sm font-bold text-[#080D14] transition hover:bg-[#080D14] hover:text-white"
            >
              Book This Vehicle
              <ArrowUpRight size={20} />
            </Link>

            <Link
              to="/contact"
              className="mt-4 flex items-center justify-center gap-2 border border-gray-200 px-6 py-4 text-sm font-semibold text-gray-800 transition hover:border-black"
            >
              <Headphones size={17} />
              Speak to our team
            </Link>

            <div className="mt-8 space-y-5 border-t border-gray-100 pt-7">
              <div className="flex gap-3">
                <ShieldCheck className="shrink-0 text-[#B68A45]" size={21} />
                <div>
                  <p className="text-sm font-bold text-gray-900">Secure reservations</p>
                  <p className="mt-1 text-xs leading-5 text-gray-400">
                    Booking confirmation and support.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CalendarDays className="shrink-0 text-[#B68A45]" size={21} />
                <div>
                  <p className="text-sm font-bold text-gray-900">Flexible booking</p>
                  <p className="mt-1 text-xs leading-5 text-gray-400">
                    Choose your preferred rental dates.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#080D14] px-6 py-20 text-center text-white lg:px-12">
        <p className="text-xs font-bold uppercase tracking-[4px] text-[#D9AC62]">
          The RideMie experience
        </p>
        <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-semibold leading-tight lg:text-5xl">
          Not quite your perfect match?
        </h2>
        <p className="mt-5 text-sm text-white/50">
          Explore our complete collection and find your ideal vehicle.
        </p>
        <Link
          to="/fleet"
          className="mt-9 inline-flex items-center gap-3 bg-[#D9AC62] px-8 py-4 text-sm font-bold text-black transition hover:bg-white"
        >
          Explore All Vehicles
          <ArrowUpRight size={18} />
        </Link>
      </section>
    </main>
  );
}

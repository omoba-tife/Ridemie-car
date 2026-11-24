
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ArrowUpRight,
  SlidersHorizontal,
  Users,
  BriefcaseBusiness,
  Fuel,
  Settings2,
} from "lucide-react";
import { vehicles } from "../data/vehicles";

export default function Fleet() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Vehicles");
  const [sort, setSort] = useState("Featured");

  const categories = ["All Vehicles", "SUV", "Luxury", "Sports"];

  const filteredVehicles = useMemo(() => {
    let result = vehicles.filter((car) => {
      const matchesSearch =
        car.name.toLowerCase().includes(search.toLowerCase()) ||
        car.brand.toLowerCase().includes(search.toLowerCase()) ||
        car.type.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All Vehicles" || car.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "Name A-Z") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "Featured") {
      result.sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    return result;
  }, [search, category, sort]);

  const formatPrice = (price) =>
    `₦${price.toLocaleString("en-NG")}`;

  return (
    <main className="bg-white">
      {/* Fleet Hero */}
      <section className="relative overflow-hidden bg-[#080D14] px-6 py-24 text-white lg:px-12 lg:py-32">
        <div className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-[#D9AC62]/10 blur-[120px]" />

        <div className="relative mx-auto max-w-[1500px]">
          <p className="mb-6 text-xs font-bold uppercase tracking-[5px] text-[#D9AC62]">
            The RideMie Collection
          </p>

          <div className="grid items-end gap-10 lg:grid-cols-2">
            <div>
              <h1 className="max-w-3xl text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                Find the car that
                <span className="block text-[#D9AC62]">
                  moves you.
                </span>
              </h1>
            </div>

            <p className="max-w-lg text-base leading-8 text-white/55 lg:justify-self-end">
              From executive sedans to exceptional luxury SUVs and
              performance machines, discover a vehicle that makes
              every journey worth remembering.
            </p>
          </div>

          <div className="mt-16 flex flex-wrap gap-10 border-t border-white/10 pt-8">
            <div>
              <p className="text-3xl font-semibold">{vehicles.length}+</p>
              <p className="mt-2 text-xs uppercase tracking-widest text-white/40">
                Vehicle options
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold">Premium</p>
              <p className="mt-2 text-xs uppercase tracking-widest text-white/40">
                Vehicle experience
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold">Flexible</p>
              <p className="mt-2 text-xs uppercase tracking-widest text-white/40">
                Rental options
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Collection */}
      <section className="px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[4px] text-[#B68A45]">
                Explore the collection
              </p>
              <h2 className="text-4xl font-semibold tracking-tight text-[#111827] lg:text-5xl">
                Our Fleet
              </h2>
              <p className="mt-4 text-sm text-gray-500">
                Discover your next driving experience.
              </p>
            </div>

            <div className="flex w-full items-center gap-3 border border-gray-200 px-4 py-4 lg:max-w-md">
              <Search size={19} className="text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search vehicles, brands or categories..."
                className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="mt-12 flex flex-col justify-between gap-6 border-y border-gray-200 py-6 md:flex-row md:items-center">
            <div className="flex flex-wrap gap-3">
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`px-5 py-3 text-xs font-semibold transition ${
                    category === item
                      ? "bg-[#080D14] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <SlidersHorizontal size={17} className="text-gray-500" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-transparent text-sm font-medium text-gray-700 outline-none"
              >
                <option>Featured</option>
                <option>Name A-Z</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Results */}
          <div className="mb-8 mt-10 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-bold text-gray-900">
                {filteredVehicles.length}
              </span>{" "}
              vehicles
            </p>
            <p className="text-xs uppercase tracking-widest text-gray-400">
              Premium collection
            </p>
          </div>

          {/* Vehicle Cards */}
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredVehicles.map((car) => (
              <article
                key={car.id}
                className="group overflow-hidden border border-gray-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <Link
                  to={`/fleet/${car.id}`}
                  className="relative block h-64 overflow-hidden bg-gray-100"
                >
                  <img
                    src={car.image}
                    alt={car.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute left-5 top-5 bg-[#080D14] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white">
                    {car.category}
                  </div>

                  <div className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition group-hover:bg-[#D9AC62]">
                    <ArrowUpRight size={19} />
                  </div>
                </Link>

                <div className="p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#B68A45]">
                        {car.brand}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-[#111827]">
                        {car.name}
                      </h3>
                      <p className="mt-2 text-sm text-gray-400">
                        {car.type}
                      </p>
                    </div>

                    <p className="text-sm font-bold text-[#111827]">
                      {formatPrice(car.price)}
                      <span className="block text-right text-[10px] font-normal text-gray-400">
                        / day
                      </span>
                    </p>
                  </div>

                  <div className="mt-7 grid grid-cols-3 border-y border-gray-100 py-5">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Users size={15} />
                      {car.seats} Seats
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Fuel size={15} />
                      {car.fuel}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Settings2 size={15} />
                      Auto
                    </div>
                  </div>

                  <Link
                    to={`/fleet/${car.id}`}
                    className="mt-6 flex items-center justify-between text-sm font-bold text-[#111827] transition hover:text-[#B68A45]"
                  >
                    Explore Vehicle
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredVehicles.length === 0 && (
            <div className="py-24 text-center">
              <BriefcaseBusiness
                size={40}
                className="mx-auto text-gray-300"
              />
              <h3 className="mt-5 text-xl font-semibold text-gray-900">
                No vehicles found
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Try another search or select a different category.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All Vehicles");
                }}
                className="mt-6 bg-[#080D14] px-6 py-3 text-sm font-semibold text-white"
              >
                Clear filters
              </button>
            </div>
          )}

          <p className="mt-12 text-xs leading-6 text-gray-400">
            Displayed vehicles, availability and prices are demonstration
            data for the frontend. Actual inventory and rental rates will
            be confirmed when the booking system is connected.
          </p>
        </div>
      </section>
    </main>
  );
}

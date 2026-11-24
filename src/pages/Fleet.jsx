
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  ArrowUpRight,
  Users,
  Fuel,
  Settings2,
  CarFront,
  ChevronDown,
} from "lucide-react";

const vehicles = [
  {
    id: 1,
    name: "Mercedes-Benz GLE",
    category: "SUV",
    type: "Luxury SUV",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    price: "₦180,000",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85",
    featured: true,
  },
  {
    id: 2,
    name: "Range Rover Sport",
    category: "SUV",
    type: "Premium SUV",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    price: "₦250,000",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85",
    featured: true,
  },
  {
    id: 3,
    name: "Porsche 911",
    category: "Sports",
    type: "Sports Car",
    seats: 2,
    transmission: "Automatic",
    fuel: "Petrol",
    price: "₦350,000",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85",
    featured: true,
  },
  {
    id: 4,
    name: "Mercedes-Benz S-Class",
    category: "Luxury",
    type: "Executive Sedan",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    price: "₦220,000",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=85",
    featured: false,
  },
  {
    id: 5,
    name: "BMW 5 Series",
    category: "Luxury",
    type: "Luxury Sedan",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    price: "₦160,000",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=85",
    featured: false,
  },
  {
    id: 6,
    name: "Toyota Land Cruiser",
    category: "SUV",
    type: "Premium SUV",
    seats: 7,
    transmission: "Automatic",
    fuel: "Diesel",
    price: "₦280,000",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=85",
    featured: false,
  },
];

const categories = ["All Vehicles", "SUV", "Luxury", "Sports"];

export default function Fleet() {
  const [activeCategory, setActiveCategory] = useState("All Vehicles");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");

  const filteredVehicles = useMemo(() => {
    let result = vehicles.filter((car) => {
      const matchesCategory =
        activeCategory === "All Vehicles" ||
        car.category === activeCategory;

      const matchesSearch =
        car.name.toLowerCase().includes(search.toLowerCase()) ||
        car.type.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    if (sort === "name") {
      result = [...result].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    if (sort === "featured") {
      result = [...result].sort(
        (a, b) => Number(b.featured) - Number(a.featured)
      );
    }

    return result;
  }, [activeCategory, search, sort]);

  return (
    <main className="min-h-screen bg-white">

      {/* PAGE HERO */}
      <section className="relative overflow-hidden bg-[#10151D] px-6 py-28 text-white lg:px-12 lg:py-36">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2000&q=85"
            alt="Premium vehicle collection"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080D14] via-[#080D14]/90 to-[#080D14]/30" />
        </div>

        <div className="relative mx-auto max-w-[1500px]">
          <p className="text-xs font-bold uppercase tracking-[5px] text-[#D9AC62]">
            The RideMie collection
          </p>

          <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-tight tracking-[-3px] sm:text-6xl lg:text-8xl">
            Find the car
            <br />
            that moves you.
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-white/60 sm:text-lg">
            Explore a collection of premium vehicles designed
            for every journey, occasion and driving experience.
          </p>

          <div className="mt-10 flex items-center gap-3 text-sm text-white/60">
            <Link to="/" className="hover:text-[#D9AC62]">Home</Link>
            <span>/</span>
            <span className="text-[#D9AC62]">Our Fleet</span>
          </div>
        </div>
      </section>

      {/* VEHICLE COLLECTION */}
      <section className="mx-auto max-w-[1500px] px-6 py-20 lg:px-12 lg:py-28">

        {/* SECTION HEADER */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[4px] text-[#B18A4A]">
              Discover your options
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-2px] sm:text-5xl">
              Explore our vehicles.
            </h2>
            <p className="mt-4 text-gray-500">
              Find the right vehicle for your next journey.
            </p>
          </div>

          <div className="text-sm text-gray-500">
            <span className="font-bold text-[#111827]">
              {filteredVehicles.length}
            </span>{" "}
            vehicles available in this collection
          </div>
        </div>

        {/* SEARCH AND FILTERS */}
        <div className="mt-12 border border-gray-200 bg-white p-5 sm:p-7">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex min-h-14 flex-1 items-center gap-3 border border-gray-200 px-4">
              <Search size={20} className="text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by vehicle name or type..."
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <SlidersHorizontal size={19} className="text-[#B18A4A]" />
              <span className="text-sm font-semibold">Sort by</span>

              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none border border-gray-200 bg-white py-4 pl-4 pr-10 text-sm outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="name">Name A–Z</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                />
              </div>
            </div>
          </div>

          {/* CATEGORY FILTER */}
          <div className="mt-7 flex flex-wrap gap-3 border-t border-gray-100 pt-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-3 text-xs font-bold transition ${
                  activeCategory === category
                    ? "bg-[#111827] text-white"
                    : "border border-gray-200 text-gray-500 hover:border-[#D9AC62] hover:text-black"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* VEHICLE CARDS */}
        <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">

          {filteredVehicles.map((car) => (
            <article
              key={car.id}
              className="group overflow-hidden border border-gray-200 bg-white transition hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            >
              <div className="relative overflow-hidden bg-[#F4F4F4]">
                <img
                  src={car.image}
                  alt={car.name}
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {car.featured && (
                  <span className="absolute left-5 top-5 bg-[#D9AC62] px-4 py-2 text-[10px] font-bold uppercase tracking-[2px] text-black">
                    Featured
                  </span>
                )}

                <span className="absolute bottom-4 right-4 bg-white px-3 py-2 text-xs font-bold text-[#111827]">
                  {car.type}
                </span>
              </div>

              <div className="p-7">

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[2px] text-[#B18A4A]">
                      {car.category}
                    </p>
                    <h3 className="mt-3 text-xl font-bold">{car.name}</h3>
                  </div>

                  <CarFront size={22} className="text-gray-300" />
                </div>

                <div className="mt-7 grid grid-cols-3 gap-2 border-y border-gray-100 py-5">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Users size={16} />
                    {car.seats} seats
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Settings2 size={16} />
                    {car.transmission}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Fuel size={16} />
                    {car.fuel}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Indicative daily rate
                    </p>
                    <p className="mt-2 text-lg font-bold">{car.price}</p>
                  </div>

                  <Link
                    to={`/fleet/${car.id}`}
                    className="flex h-12 w-12 items-center justify-center bg-[#111827] text-white transition hover:bg-[#D9AC62] hover:text-black"
                    aria-label={`View ${car.name}`}
                  >
                    <ArrowUpRight size={21} />
                  </Link>
                </div>
              </div>
            </article>
          ))}

        </div>

        {filteredVehicles.length === 0 && (
          <div className="py-24 text-center">
            <CarFront size={42} className="mx-auto text-gray-300" />
            <h3 className="mt-5 text-2xl font-bold">No vehicles found</h3>
            <p className="mt-3 text-sm text-gray-500">
              Try another search or category.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All Vehicles");
              }}
              className="mt-6 bg-[#111827] px-7 py-4 text-sm font-bold text-white"
            >
              Clear filters
            </button>
          </div>
        )}

      </section>

      {/* BOOKING CTA */}
      <section className="bg-[#111827] px-6 py-20 text-white lg:px-12">
        <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[4px] text-[#D9AC62]">
              Your next journey awaits
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Found your perfect vehicle?
            </h2>
            <p className="mt-4 text-sm text-white/50">
              Let's get your journey started with RideMie.
            </p>
          </div>

          <Link
            to="/booking"
            className="inline-flex items-center justify-center gap-3 bg-[#D9AC62] px-8 py-5 text-sm font-bold text-black transition hover:bg-white"
          >
            Book your vehicle <ArrowUpRight size={19} />
          </Link>
        </div>
      </section>

    </main>
  );
}

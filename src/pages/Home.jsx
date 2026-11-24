
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CarFront,
  MapPin,
  CalendarDays,
  ShieldCheck,
  Headset,
  Star,
} from "lucide-react";

const services = [
  {
    number: "01",
    title: "Self-drive rentals",
    description:
      "Choose your vehicle and enjoy the freedom to explore at your own pace.",
    image:
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=85",
  },
  {
    number: "02",
    title: "Chauffeur services",
    description:
      "Professional drivers and comfortable journeys for business and personal travel.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85",
  },
  {
    number: "03",
    title: "Airport transfers",
    description:
      "Enjoy a smoother arrival and departure with reliable scheduled transportation.",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1000&q=85",
  },
];

const featuredCars = [
  {
    name: "Mercedes-Benz GLE",
    category: "Luxury SUV",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Range Rover Sport",
    category: "Premium SUV",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Porsche 911",
    category: "Sports car",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=85",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden">

      {/* HERO */}
      <section className="relative flex min-h-[720px] items-center bg-[#10151D] lg:min-h-[820px]">

        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=90"
          alt="Premium Porsche sports car"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#080D14]/95 via-[#080D14]/65 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080D14]/60 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 py-32 lg:px-12">

          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-12 bg-[#D9AC62]" />
            <span className="text-xs font-bold uppercase tracking-[5px] text-[#D9AC62]">
              The art of arriving
            </span>
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-[-3px] text-white sm:text-6xl lg:text-[88px]">
            Every journey
            <br />
            deserves a
            <br />
            <span className="font-serif italic font-normal text-[#D9AC62]">
              better drive.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-8 text-white/70 sm:text-lg">
            Discover exceptional vehicles, effortless bookings and
            premium mobility experiences. Wherever life takes you,
            arrive with RideMie.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/fleet"
              className="flex items-center justify-center gap-3 bg-[#D9AC62] px-8 py-5 text-sm font-bold text-[#111827] transition hover:bg-white"
            >
              Explore our fleet <ArrowRight size={18} />
            </Link>

            <Link
              to="/experience"
              className="flex items-center justify-center gap-3 border border-white/50 px-8 py-5 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
            >
              Discover RideMie
            </Link>
          </div>

          <div className="mt-16 flex flex-wrap gap-8 border-t border-white/20 pt-8 text-sm text-white/70">
            <span className="flex items-center gap-2">
              <ShieldCheck className="text-[#D9AC62]" size={18} />
              Trusted vehicle partners
            </span>
            <span className="flex items-center gap-2">
              <CarFront className="text-[#D9AC62]" size={18} />
              Premium vehicle collection
            </span>
            <span className="flex items-center gap-2">
              <Headset className="text-[#D9AC62]" size={18} />
              Dedicated support
            </span>
          </div>

        </div>
      </section>

      {/* BOOKING INTRO */}
      <section className="mx-auto max-w-[1500px] px-6 py-12 lg:px-12">
        <div className="border border-gray-200 bg-white p-7 shadow-[0_20px_70px_rgba(0,0,0,0.07)] lg:p-10">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[3px] text-[#B18A4A]">
                Your next journey starts here
              </p>
              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                Ready to find your perfect ride?
              </h2>
              <p className="mt-3 text-sm leading-7 text-gray-500">
                Choose your travel experience and let RideMie take care of the rest.
              </p>
            </div>

            <Link
              to="/booking"
              className="inline-flex shrink-0 items-center justify-center gap-3 bg-[#111827] px-8 py-5 text-sm font-bold text-white transition hover:bg-[#D9AC62] hover:text-black"
            >
              Start a booking <ArrowUpRight size={18} />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 border-t border-gray-100 pt-7 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <MapPin className="text-[#B18A4A]" />
              <span className="text-sm font-semibold">Choose your destination</span>
            </div>
            <div className="flex items-center gap-3">
              <CalendarDays className="text-[#B18A4A]" />
              <span className="text-sm font-semibold">Select your travel dates</span>
            </div>
            <div className="flex items-center gap-3">
              <CarFront className="text-[#B18A4A]" />
              <span className="text-sm font-semibold">Find your ideal vehicle</span>
            </div>
          </div>

        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="mx-auto max-w-[1500px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          <div>
            <p className="text-xs font-bold uppercase tracking-[4px] text-[#B18A4A]">
              Welcome to RideMie
            </p>

            <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-2px] sm:text-5xl lg:text-6xl">
              More than a ride.
              <br />
              <span className="font-serif italic font-normal text-[#B18A4A]">
                It's an experience.
              </span>
            </h2>

            <p className="mt-8 max-w-xl leading-8 text-gray-500">
              From everyday journeys to extraordinary occasions,
              RideMie connects you with quality vehicles and dependable
              mobility services. Choose the freedom of self-drive or
              enjoy the comfort of a professional chauffeur.
            </p>

            <Link
              to="/experience"
              className="mt-9 inline-flex items-center gap-3 border-b border-[#B18A4A] pb-3 text-sm font-bold"
            >
              Discover our story <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=85"
              alt="Luxury vehicle experience"
              className="h-[430px] w-full object-cover"
            />

            <div className="absolute -bottom-8 -left-5 bg-[#111827] p-7 text-white sm:-left-8">
              <p className="text-3xl font-bold text-[#D9AC62]">01</p>
              <p className="mt-2 text-xs uppercase tracking-[3px]">
                Your journey, elevated
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="bg-[#F6F5F2] px-6 py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1500px]">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[4px] text-[#B18A4A]">
                Made for your lifestyle
              </p>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-2px] sm:text-5xl">
                The way you want to travel.
              </h2>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center gap-3 text-sm font-bold"
            >
              Explore all services <ArrowUpRight size={18} />
            </Link>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {services.map((service) => (
              <article key={service.number} className="bg-white">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-64 w-full object-cover"
                />

                <div className="p-8">
                  <p className="text-xs font-bold uppercase tracking-[3px] text-[#B18A4A]">
                    {service.number}
                  </p>

                  <h3 className="mt-4 text-2xl font-bold">
                    {service.title}
                  </h3>

                  <p className="mt-4 leading-7 text-gray-500">
                    {service.description}
                  </p>

                  <Link
                    to="/services"
                    className="mt-7 inline-flex items-center gap-2 text-sm font-bold"
                  >
                    Learn more <ArrowRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED FLEET */}
      <section className="mx-auto max-w-[1500px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[4px] text-[#B18A4A]">
              The RideMie collection
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-2px] sm:text-5xl">
              Find your perfect drive.
            </h2>
          </div>

          <Link
            to="/fleet"
            className="inline-flex items-center gap-3 text-sm font-bold"
          >
            View all vehicles <ArrowUpRight size={18} />
          </Link>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {featuredCars.map((car) => (
            <article key={car.name} className="border border-gray-200 bg-white">
              <div className="overflow-hidden bg-[#F4F4F4]">
                <img
                  src={car.image}
                  alt={car.name}
                  className="h-64 w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              <div className="p-7">
                <p className="text-xs font-bold uppercase tracking-[2px] text-[#B18A4A]">
                  {car.category}
                </p>

                <h3 className="mt-3 text-2xl font-bold">{car.name}</h3>

                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
                  <span className="text-sm text-gray-500">
                    Explore vehicle
                  </span>

                  <Link
                    to="/fleet"
                    aria-label={`Explore ${car.name}`}
                    className="flex h-11 w-11 items-center justify-center bg-[#111827] text-white transition hover:bg-[#D9AC62] hover:text-black"
                  >
                    <ArrowUpRight size={19} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* WHY RIDEMIE */}
      <section className="bg-[#111827] px-6 py-24 text-white lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1500px]">

          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[4px] text-[#D9AC62]">
              The RideMie difference
            </p>

            <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-2px] sm:text-5xl">
              Every detail matters.
              <br />
              <span className="font-serif italic font-normal text-[#D9AC62]">
                Especially yours.
              </span>
            </h2>
          </div>

          <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: ShieldCheck,
                title: "Quality & trust",
                text: "A focus on vehicle quality, dependable partners and a better rental experience.",
              },
              {
                icon: Star,
                title: "Premium selection",
                text: "A carefully presented collection for different journeys and occasions.",
              },
              {
                icon: Headset,
                title: "Dedicated support",
                text: "Assistance throughout your booking and travel experience.",
              },
              {
                icon: CarFront,
                title: "Flexible mobility",
                text: "Self-drive and chauffeur options designed around your needs.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title}>
                  <Icon size={30} className="text-[#D9AC62]" />
                  <h3 className="mt-7 text-xl font-bold">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/55">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PARTNER CTA */}
      <section className="bg-[#D9AC62] px-6 py-24 lg:px-12 lg:py-28">
        <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-10 lg:flex-row lg:items-center">

          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[4px] text-black/60">
              Grow with RideMie
            </p>

            <h2 className="mt-6 text-4xl font-bold leading-tight tracking-[-2px] sm:text-6xl">
              Own a vehicle?
              <br />
              Put it to work.
            </h2>

            <p className="mt-6 max-w-xl leading-8 text-black/65">
              Join the RideMie partner network and connect your vehicle
              with people looking for quality mobility experiences.
            </p>
          </div>

          <Link
            to="/partners"
            className="inline-flex items-center justify-center gap-4 bg-[#111827] px-9 py-6 text-sm font-bold text-white transition hover:bg-white hover:text-black"
          >
            Become a partner <ArrowUpRight size={20} />
          </Link>

        </div>
      </section>

    </main>
  );
}

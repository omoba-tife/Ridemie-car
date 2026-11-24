
import { Link } from "react-router-dom";
import {
  CarFront,
  UserRound,
  Plane,
  ArrowUpRight,
  ShieldCheck,
  Clock3,
  MapPin,
  BriefcaseBusiness,
} from "lucide-react";

const services = [
  {
    number: "01",
    icon: CarFront,
    title: "Self-Drive Rentals",
    subtitle: "Your car. Your schedule. Your freedom.",
    description:
      "Choose from our collection of premium vehicles and enjoy the freedom to explore at your own pace. Ideal for personal trips, business engagements and special occasions.",
    features: ["Flexible rental periods", "Premium vehicle selection", "Convenient pickup arrangements"],
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "02",
    icon: UserRound,
    title: "Chauffeur Services",
    subtitle: "Travel comfortably. Arrive confidently.",
    description:
      "Experience professional, comfortable transportation with a dedicated driver. Perfect for executive travel, meetings, events and everyday journeys.",
    features: ["Professional drivers", "Comfortable premium vehicles", "Point-to-point transportation"],
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "03",
    icon: Plane,
    title: "Airport Transfers",
    subtitle: "A smoother start and finish to every trip.",
    description:
      "Take the stress out of airport transportation. Arrange a comfortable ride to or from your airport with a service designed around your travel plans.",
    features: ["Airport pickup arrangements", "Comfortable luggage space", "Scheduled transfers"],
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=85",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Quality-focused service",
    text: "A premium experience built around comfort, care and reliability.",
  },
  {
    icon: Clock3,
    title: "Flexible arrangements",
    text: "Choose a service and schedule that suits your journey.",
  },
  {
    icon: MapPin,
    title: "Convenient journeys",
    text: "Plan transportation around your pickup and destination.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Personal and business",
    text: "Travel solutions for individuals, families and professionals.",
  },
];

export default function Services() {
  return (
    <main className="bg-white">
      <section className="bg-[#080D14] px-6 py-24 text-white lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-xs font-bold uppercase tracking-[5px] text-[#D9AC62]">
            More than getting there
          </p>
          <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[1.1] sm:text-6xl lg:text-7xl">
            Every journey has
            <span className="block text-[#D9AC62]">its own standard.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-white/50">
            From the freedom of self-drive to the comfort of a professional
            chauffeur, discover transportation designed around you.
          </p>
          <Link
            to="/booking"
            className="mt-10 inline-flex items-center gap-4 bg-[#D9AC62] px-8 py-4 text-sm font-bold text-black hover:bg-white"
          >
            Make a Reservation <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-14 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[4px] text-[#B68A45]">
              What we offer
            </p>
            <h2 className="mt-5 text-4xl font-semibold text-gray-900 lg:text-5xl">
              Mobility that fits your lifestyle.
            </h2>
            <p className="mt-5 text-sm leading-7 text-gray-500">
              Choose the service that matches your plans. We'll help you
              arrange the right vehicle and experience.
            </p>
          </div>

          <div className="space-y-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.number}
                  className={`grid overflow-hidden border border-gray-100 lg:grid-cols-2 ${
                    index % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
                  }`}
                >
                  <div className="min-h-[300px] bg-gray-100 lg:min-h-[480px]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full min-h-[300px] w-full object-cover lg:min-h-[480px]"
                    />
                  </div>

                  <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
                    <div className="flex items-center justify-between">
                      <Icon size={30} className="text-[#B68A45]" />
                      <span className="text-sm font-bold tracking-widest text-gray-300">
                        {service.number}
                      </span>
                    </div>
                    <p className="mt-8 text-xs font-bold uppercase tracking-[3px] text-[#B68A45]">
                      {service.subtitle}
                    </p>
                    <h3 className="mt-4 text-3xl font-semibold text-gray-900 lg:text-4xl">
                      {service.title}
                    </h3>
                    <p className="mt-5 text-sm leading-8 text-gray-500">
                      {service.description}
                    </p>
                    <ul className="mt-7 space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm text-gray-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#B68A45]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/booking"
                      className="mt-9 inline-flex items-center gap-3 text-sm font-bold text-gray-900 hover:text-[#B68A45]"
                    >
                      Book this service <ArrowUpRight size={18} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#F8F8F6] px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-xs font-bold uppercase tracking-[4px] text-[#B68A45]">
            The RideMie difference
          </p>
          <h2 className="mt-5 max-w-2xl text-4xl font-semibold text-gray-900">
            The details matter. So does the journey.
          </h2>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, text }) => (
              <div key={title} className="border-t border-gray-200 pt-7">
                <Icon size={26} className="text-[#B68A45]" />
                <h3 className="mt-6 font-bold text-gray-900">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#080D14] px-6 py-20 text-center text-white lg:px-12">
        <h2 className="mx-auto max-w-3xl text-4xl font-semibold lg:text-5xl">
          Ready to make your next journey different?
        </h2>
        <Link
          to="/booking"
          className="mt-9 inline-flex items-center gap-3 bg-[#D9AC62] px-8 py-4 text-sm font-bold text-black hover:bg-white"
        >
          Book Your Ride <ArrowUpRight size={18} />
        </Link>
      </section>
    </main>
  );
}

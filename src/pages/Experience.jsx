
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Target,
  HeartHandshake,
  ShieldCheck,
  Gem,
  CarFront,
  Users,
} from "lucide-react";

const values = [
  {
    icon: Gem,
    title: "Excellence",
    text: "We believe every part of a journey should reflect care, quality and attention to detail.",
  },
  {
    icon: ShieldCheck,
    title: "Trust",
    text: "Clear communication and dependable service are central to the relationships we build.",
  },
  {
    icon: HeartHandshake,
    title: "Customer first",
    text: "We put the needs of our customers at the centre of every experience.",
  },
  {
    icon: Target,
    title: "Purpose",
    text: "We are building a more convenient way for people to access the vehicles they need.",
  },
];

export default function Experience() {
  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-[#080D14] px-6 py-28 text-white lg:px-12 lg:py-40">
        <div className="absolute -right-20 top-10 h-96 w-96 rounded-full bg-[#D9AC62]/10 blur-[120px]" />
        <div className="relative mx-auto max-w-[1500px]">
          <p className="text-xs font-bold uppercase tracking-[5px] text-[#D9AC62]">
            The story behind RideMie
          </p>
          <h1 className="mt-7 max-w-5xl text-5xl font-semibold leading-[1.1] sm:text-6xl lg:text-8xl">
            Movement is easy.
            <span className="block text-[#D9AC62]">
              The experience matters.
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-white/50">
            RideMie is built around a simple idea: accessing quality
            transportation should feel straightforward, comfortable and
            dependable.
          </p>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-[1500px] items-center gap-14 lg:grid-cols-2">
          <div className="min-h-[350px] overflow-hidden bg-gray-100 lg:min-h-[580px]">
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=85"
              alt="Premium car on the road"
              className="h-full min-h-[350px] w-full object-cover lg:min-h-[580px]"
            />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[4px] text-[#B68A45]">
              Who we are
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight text-gray-900 lg:text-5xl">
              A better relationship with the road.
            </h2>
            <p className="mt-7 text-sm leading-8 text-gray-500">
              RideMie is a mobility and vehicle rental platform designed to
              connect people with transportation that suits their needs.
              Whether someone needs a vehicle for a personal trip, an
              executive journey or an airport transfer, we want the process
              to be easier to understand and arrange.
            </p>
            <p className="mt-5 text-sm leading-8 text-gray-500">
              Our vision is to bring customers, vehicle owners and service
              providers together through one organised experience, with
              quality and convenience at the heart of what we do.
            </p>
            <Link
              to="/fleet"
              className="mt-9 inline-flex items-center gap-3 bg-[#080D14] px-7 py-4 text-sm font-bold text-white hover:bg-[#B68A45]"
            >
              Discover Our Fleet <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#F8F8F6] px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-xs font-bold uppercase tracking-[4px] text-[#B68A45]">
            What drives us
          </p>
          <h2 className="mt-5 max-w-2xl text-4xl font-semibold text-gray-900 lg:text-5xl">
            More than a service. A standard.
          </h2>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }) => (
              <article key={title} className="bg-white p-8">
                <Icon size={29} className="text-[#B68A45]" />
                <h3 className="mt-8 text-lg font-bold text-gray-900">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-gray-500">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-3">
          <div>
            <CarFront size={30} className="text-[#B68A45]" />
            <h3 className="mt-6 text-xl font-bold text-gray-900">
              A considered collection
            </h3>
            <p className="mt-4 text-sm leading-7 text-gray-500">
              A growing selection of vehicles for different preferences,
              occasions and journeys.
            </p>
          </div>
          <div>
            <Users size={30} className="text-[#B68A45]" />
            <h3 className="mt-6 text-xl font-bold text-gray-900">
              A connected community
            </h3>
            <p className="mt-4 text-sm leading-7 text-gray-500">
              A platform designed to bring customers and trusted vehicle
              partners together.
            </p>
          </div>
          <div>
            <HeartHandshake size={30} className="text-[#B68A45]" />
            <h3 className="mt-6 text-xl font-bold text-gray-900">
              A personal approach
            </h3>
            <p className="mt-4 text-sm leading-7 text-gray-500">
              Service that recognises every customer and every journey is
              different.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#080D14] px-6 py-24 text-center text-white lg:px-12">
        <p className="text-xs font-bold uppercase tracking-[4px] text-[#D9AC62]">
          Your journey. Your standard.
        </p>
        <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-tight lg:text-5xl">
          Experience a better way to move.
        </h2>
        <p className="mt-5 text-sm text-white/50">
          Discover the RideMie collection and find your next ride.
        </p>
        <Link
          to="/fleet"
          className="mt-9 inline-flex items-center gap-3 bg-[#D9AC62] px-8 py-4 text-sm font-bold text-black hover:bg-white"
        >
          Explore the Fleet <ArrowUpRight size={18} />
        </Link>
      </section>
    </main>
  );
}

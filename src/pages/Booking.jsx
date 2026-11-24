
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  CalendarDays,
  MapPin,
  CarFront,
  ArrowRight,
  ShieldCheck,
  Headphones,
} from "lucide-react";
import { vehicles } from "../data/vehicles";

export default function Booking() {
  const [searchParams] = useSearchParams();
  const selectedId = searchParams.get("vehicle");

  const selectedVehicle = useMemo(
    () => vehicles.find((car) => car.id === selectedId),
    [selectedId]
  );

  const [vehicleId, setVehicleId] = useState(selectedVehicle?.id || "");
  const [rentalType, setRentalType] = useState("Chauffeur-driven");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const car = vehicles.find((item) => item.id === vehicleId);

  const rentalDays = useMemo(() => {
    if (!pickupDate || !returnDate) return 0;
    const start = new Date(`${pickupDate}T00:00:00`);
    const end = new Date(`${returnDate}T00:00:00`);
    const difference = Math.ceil((end - start) / 86400000);
    return difference > 0 ? difference : 0;
  }, [pickupDate, returnDate]);

  const estimatedTotal = car ? car.price * rentalDays : 0;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!car || !rentalDays) return;

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-[#F8F8F6] px-6 py-20">
        <div className="w-full max-w-xl border border-gray-200 bg-white p-8 text-center sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#D9AC62]/15 text-[#A77A32]">
            <ShieldCheck size={32} />
          </div>
          <p className="mt-7 text-xs font-bold uppercase tracking-[4px] text-[#B68A45]">
            Request prepared
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-gray-900">
            Thank you, {fullName.split(" ")[0]}.
          </h1>
          <p className="mt-4 text-sm leading-7 text-gray-500">
            Your booking request has been prepared for {car.name}. This is a
            frontend demonstration only; no reservation has been sent or
            confirmed yet.
          </p>
          <div className="my-8 border-y border-gray-100 py-6 text-left">
            <p className="text-sm text-gray-500">Selected vehicle</p>
            <p className="mt-1 font-bold text-gray-900">{car.name}</p>
            <p className="mt-4 text-sm text-gray-500">Estimated rental total</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              ₦{estimatedTotal.toLocaleString("en-NG")}
            </p>
          </div>
          <Link
            to="/fleet"
            className="inline-flex items-center gap-3 bg-[#080D14] px-7 py-4 text-sm font-bold text-white"
          >
            Explore More Vehicles <ArrowRight size={17} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white">
      <section className="bg-[#080D14] px-6 py-20 text-white lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-xs font-bold uppercase tracking-[5px] text-[#D9AC62]">
            Your journey begins here
          </p>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-tight sm:text-6xl">
            Reserve your next
            <span className="block text-[#D9AC62]">RideMie experience.</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/50">
            Tell us where you're going, choose your vehicle and let us help
            make your journey exceptional.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[1.5fr_0.8fr]">
          <form onSubmit={handleSubmit} className="space-y-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[3px] text-[#B68A45]">
                01 — Choose your vehicle
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-gray-900">
                What would you like to drive?
              </h2>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {vehicles.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setVehicleId(item.id)}
                    className={`overflow-hidden border text-left transition ${
                      vehicleId === item.id
                        ? "border-[#B68A45] ring-1 ring-[#B68A45]"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-36 w-full object-cover"
                    />
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          {item.name}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          {item.type}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-gray-900">
                        ₦{item.price.toLocaleString("en-NG")}
                        <span className="block text-right font-normal text-gray-400">
                          /day
                        </span>
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[3px] text-[#B68A45]">
                02 — Rental preference
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-gray-900">
                How would you like to travel?
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {["Chauffeur-driven", "Self-drive"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setRentalType(type)}
                    className={`border p-6 text-left ${
                      rentalType === type
                        ? "border-[#B68A45] bg-[#D9AC62]/10"
                        : "border-gray-200"
                    }`}
                  >
                    <CarFront
                      className={rentalType === type ? "text-[#A77A32]" : "text-gray-400"}
                      size={24}
                    />
                    <p className="mt-4 font-bold text-gray-900">{type}</p>
                    <p className="mt-2 text-xs leading-5 text-gray-500">
                      {type === "Self-drive"
                        ? "Enjoy the freedom of driving yourself."
                        : "Sit back and travel with a professional driver."}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[3px] text-[#B68A45]">
                03 — Journey details
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-gray-900">
                When and where?
              </h2>

              <div className="mt-7 grid gap-6 sm:grid-cols-2">
                <label className="text-sm font-semibold text-gray-700">
                  Pickup date
                  <input
                    type="date"
                    required
                    min={new Date().toLocaleDateString("en-CA")}
                    value={pickupDate}
                    onChange={(e) => {
                      setPickupDate(e.target.value);
                      if (returnDate && e.target.value >= returnDate) {
                        setReturnDate("");
                      }
                    }}
                    className="mt-3 w-full border border-gray-200 px-4 py-4 text-sm font-normal outline-none focus:border-[#B68A45]"
                  />
                </label>
                <label className="text-sm font-semibold text-gray-700">
                  Return date
                  <input
                    type="date"
                    required
                    min={pickupDate || new Date().toLocaleDateString("en-CA")}
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="mt-3 w-full border border-gray-200 px-4 py-4 text-sm font-normal outline-none focus:border-[#B68A45]"
                  />
                </label>
                <label className="text-sm font-semibold text-gray-700">
                  Pickup location
                  <span className="relative mt-3 block">
                    <MapPin className="absolute left-4 top-4 text-gray-400" size={18} />
                    <input
                      required
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      placeholder="Enter pickup address"
                      className="w-full border border-gray-200 py-4 pl-11 pr-4 text-sm font-normal outline-none focus:border-[#B68A45]"
                    />
                  </span>
                </label>
                <label className="text-sm font-semibold text-gray-700">
                  Destination / return location
                  <span className="relative mt-3 block">
                    <MapPin className="absolute left-4 top-4 text-gray-400" size={18} />
                    <input
                      required
                      value={dropoffLocation}
                      onChange={(e) => setDropoffLocation(e.target.value)}
                      placeholder="Enter destination"
                      className="w-full border border-gray-200 py-4 pl-11 pr-4 text-sm font-normal outline-none focus:border-[#B68A45]"
                    />
                  </span>
                </label>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[3px] text-[#B68A45]">
                04 — Your information
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-gray-900">
                Who are we booking for?
              </h2>
              <div className="mt-7 grid gap-6 sm:grid-cols-2">
                <label className="text-sm font-semibold text-gray-700">
                  Full name
                  <input
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    className="mt-3 w-full border border-gray-200 px-4 py-4 text-sm font-normal outline-none focus:border-[#B68A45]"
                  />
                </label>
                <label className="text-sm font-semibold text-gray-700">
                  Email address
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-3 w-full border border-gray-200 px-4 py-4 text-sm font-normal outline-none focus:border-[#B68A45]"
                  />
                </label>
                <label className="text-sm font-semibold text-gray-700 sm:col-span-2">
                  Phone number
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234..."
                    className="mt-3 w-full border border-gray-200 px-4 py-4 text-sm font-normal outline-none focus:border-[#B68A45]"
                  />
                </label>
                <label className="text-sm font-semibold text-gray-700 sm:col-span-2">
                  Additional notes (optional)
                  <textarea
                    rows="4"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special requests or details..."
                    className="mt-3 w-full resize-y border border-gray-200 px-4 py-4 text-sm font-normal outline-none focus:border-[#B68A45]"
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={!car || !rentalDays}
              className="flex w-full items-center justify-between bg-[#080D14] px-7 py-5 text-sm font-bold text-white transition hover:bg-[#B68A45] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Submit Booking Request
              <ArrowRight size={19} />
            </button>
            <p className="text-xs leading-6 text-gray-400">
              This is a frontend demo. Your details are not transmitted or
              stored, and submitting does not confirm a reservation.
            </p>
          </form>

          <aside className="h-fit border border-gray-200 bg-[#F8F8F6] p-7 lg:sticky lg:top-8">
            <p className="text-xs font-bold uppercase tracking-[3px] text-[#B68A45]">
              Booking summary
            </p>
            <h3 className="mt-4 text-2xl font-semibold text-gray-900">
              Your reservation
            </h3>

            {car ? (
              <>
                <img
                  src={car.image}
                  alt={car.name}
                  className="mt-7 h-48 w-full object-cover"
                />
                <p className="mt-5 text-lg font-bold text-gray-900">{car.name}</p>
                <p className="mt-1 text-sm text-gray-500">{rentalType}</p>
                <div className="mt-6 space-y-4 border-t border-gray-200 pt-6 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Daily rate</span>
                    <span className="font-semibold text-gray-900">
                      ₦{car.price.toLocaleString("en-NG")}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Rental duration</span>
                    <span className="font-semibold text-gray-900">
                      {rentalDays ? `${rentalDays} day(s)` : "Select dates"}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Estimated total</span>
                    <span className="font-bold text-gray-900">
                      ₦{estimatedTotal.toLocaleString("en-NG")}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="mt-7 border border-dashed border-gray-300 p-8 text-center">
                <CalendarDays className="mx-auto text-gray-400" size={30} />
                <p className="mt-4 text-sm text-gray-500">
                  Select a vehicle to see your booking summary.
                </p>
              </div>
            )}

            <div className="mt-8 space-y-4 border-t border-gray-200 pt-6">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <ShieldCheck size={18} className="text-[#B68A45]" />
                Secure booking process
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <Headphones size={18} className="text-[#B68A45]" />
                Customer support available
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

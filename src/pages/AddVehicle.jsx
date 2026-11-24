
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CarFront,
  Upload,
  MapPin,
  Gauge,
  Users,
  Fuel,
  Settings2,
} from "lucide-react";

export default function AddVehicle() {
  const [form, setForm] = useState({
    brand: "",
    model: "",
    year: "",
    category: "SUV",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: "5",
    price: "",
    location: "",
    description: "",
  });

  const [imageName, setImageName] = useState("");
  const [message, setMessage] = useState("");

  const updateField = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(
      "Your vehicle submission has been captured in this demo. Backend submission and document verification will be added later."
    );
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-4 text-sm outline-none transition focus:border-[#b18c4d]";

  return (
    <main className="min-h-screen bg-[#f7f7f5] px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <Link to="/partner/dashboard" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#a47f43]">
          <ArrowLeft size={17} /> Back to dashboard
        </Link>

        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#ad894d]">
          Partner vehicle registration
        </p>
        <h1 className="text-3xl font-bold text-[#171717] sm:text-4xl">
          List your vehicle
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500">
          Provide accurate information about your vehicle. Submitted vehicles will go through a review process before publication.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-8">
          <section className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-9">
            <div className="mb-7 flex items-center gap-3">
              <div className="rounded-xl bg-[#f6f0e5] p-3 text-[#a47f43]">
                <CarFront size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#171717]">Vehicle information</h2>
                <p className="mt-1 text-sm text-gray-500">Tell us about your car.</p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Vehicle brand</label>
                <input required name="brand" value={form.brand} onChange={updateField} placeholder="e.g. Mercedes-Benz" className={inputClass} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Vehicle model</label>
                <input required name="model" value={form.model} onChange={updateField} placeholder="e.g. GLE 450" className={inputClass} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Manufacturing year</label>
                <input required type="number" min="1990" max={new Date().getFullYear() + 1} name="year" value={form.year} onChange={updateField} placeholder="2023" className={inputClass} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Vehicle category</label>
                <select name="category" value={form.category} onChange={updateField} className={inputClass}>
                  <option>SUV</option>
                  <option>Luxury</option>
                  <option>Sports</option>
                  <option>Executive Sedan</option>
                  <option>Economy</option>
                  <option>Van</option>
                </select>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-9">
            <h2 className="mb-7 text-xl font-bold text-[#171717]">Vehicle specifications</h2>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Settings2 size={16} /> Transmission
                </label>
                <select name="transmission" value={form.transmission} onChange={updateField} className={inputClass}>
                  <option>Automatic</option>
                  <option>Manual</option>
                </select>
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Fuel size={16} /> Fuel type
                </label>
                <select name="fuel" value={form.fuel} onChange={updateField} className={inputClass}>
                  <option>Petrol</option>
                  <option>Diesel</option>
                  <option>Hybrid</option>
                  <option>Electric</option>
                </select>
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Users size={16} /> Passenger seats
                </label>
                <input required type="number" min="1" max="30" name="seats" value={form.seats} onChange={updateField} className={inputClass} />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Gauge size={16} /> Daily rental price (₦)
                </label>
                <input required type="number" min="1" name="price" value={form.price} onChange={updateField} placeholder="180000" className={inputClass} />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-9">
            <h2 className="mb-7 text-xl font-bold text-[#171717]">Location and description</h2>

            <div className="mb-6">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <MapPin size={16} /> Vehicle location
              </label>
              <input required name="location" value={form.location} onChange={updateField} placeholder="e.g. Ikeja, Lagos" className={inputClass} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">Vehicle description</label>
              <textarea required rows="5" name="description" value={form.description} onChange={updateField} placeholder="Describe your vehicle, condition, features and availability..." className={`${inputClass} resize-y`} />
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-9">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-[#f6f0e5] p-3 text-[#a47f43]">
                <Upload size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#171717]">Vehicle photos</h2>
                <p className="mt-1 text-sm text-gray-500">Choose a clear photo of your vehicle.</p>
              </div>
            </div>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 px-5 py-12 text-center transition hover:border-[#b18c4d]">
              <Upload size={30} className="text-[#b18c4d]" />
              <span className="mt-4 text-sm font-bold text-[#171717]">Click to upload vehicle photos</span>
              <span className="mt-2 text-xs text-gray-400">Select JPG, PNG or WEBP image files</span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={(e) => setImageName(Array.from(e.target.files || []).map((file) => file.name).join(", "))}
                className="hidden"
              />
            </label>

            {imageName && (
              <p className="mt-4 break-words text-sm text-gray-500">{imageName}</p>
            )}
          </section>

          <button type="submit" className="w-full rounded-xl bg-[#b18c4d] py-5 text-sm font-bold text-white transition hover:bg-[#98743e]">
            Submit vehicle for review
          </button>

          {message && (
            <p role="status" className="rounded-xl bg-amber-50 p-5 text-sm leading-6 text-amber-800">
              {message}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}

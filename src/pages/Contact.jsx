
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Clock3,
  ArrowUpRight,
  MessageCircle,
  ChevronDown,
} from "lucide-react";

const faqs = [
  {
    question: "How do I book a vehicle?",
    answer:
      "Visit our Fleet page, select a vehicle and choose Book This Vehicle. Complete the booking form with your preferred dates and journey details.",
  },
  {
    question: "Does RideMie offer self-drive rentals?",
    answer:
      "Yes. RideMie is designed to support both self-drive rentals and chauffeur-driven transportation, subject to vehicle availability and applicable requirements.",
  },
  {
    question: "Can I become a vehicle partner?",
    answer:
      "Yes. Vehicle owners can visit our Become a Partner page and submit their vehicle details for partnership review.",
  },
  {
    question: "Can I pay online or in cash?",
    answer:
      "RideMie is planned to support online and cash payment options. Available payment methods and terms will be displayed when the payment system is connected.",
  },
  {
    question: "Is my booking confirmed immediately?",
    answer:
      "A booking request is not the same as a confirmed reservation. Confirmation will depend on availability and the final booking process.",
  },
];

export default function Contact() {
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General enquiry",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const update = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <main className="bg-white">
      <section className="bg-[#080D14] px-6 py-24 text-white lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-xs font-bold uppercase tracking-[5px] text-[#D9AC62]">
            We're here to help
          </p>
          <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
            Let's make things
            <span className="block text-[#D9AC62]">easier for you.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-white/50">
            Have a question about a vehicle, a booking or a partnership?
            Reach out and let us know how we can help.
          </p>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Mail,
                title: "Email",
                value: "Support contact coming soon",
                detail: "Official support email will be added.",
              },
              {
                icon: Phone,
                title: "Phone",
                value: "Contact number coming soon",
                detail: "Our official phone line will be added.",
              },
              {
                icon: MapPin,
                title: "Location",
                value: "Lagos, Nigeria",
                detail: "Service coverage will be confirmed.",
              },
              {
                icon: Clock3,
                title: "Availability",
                value: "Support hours to be confirmed",
                detail: "Contact hours will be published soon.",
              },
            ].map(({ icon: Icon, title, value, detail }) => (
              <div key={title} className="border border-gray-200 p-7">
                <Icon size={25} className="text-[#B68A45]" />
                <h3 className="mt-6 font-bold text-gray-900">{title}</h3>
                <p className="mt-3 text-sm font-semibold text-gray-800">{value}</p>
                <p className="mt-2 text-xs leading-6 text-gray-400">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F8F8F6] px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[4px] text-[#B68A45]">
              Send us a message
            </p>
            <h2 className="mt-5 text-4xl font-semibold text-gray-900 lg:text-5xl">
              We'd love to hear from you.
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-8 text-gray-500">
              Tell us what you need help with. Whether you're planning a
              journey or interested in joining our partner network, we're
              happy to hear from you.
            </p>

            <div className="mt-12 flex items-start gap-4">
              <div className="bg-[#D9AC62]/15 p-4 text-[#A77A32]">
                <MessageCircle size={23} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Every enquiry matters</h3>
                <p className="mt-2 max-w-sm text-sm leading-7 text-gray-500">
                  We aim to make communication clear and helpful throughout
                  your RideMie experience.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-7 sm:p-10">
            {sent ? (
              <div className="py-14 text-center">
                <Mail size={42} className="mx-auto text-[#B68A45]" />
                <h3 className="mt-6 text-2xl font-bold text-gray-900">
                  Message prepared
                </h3>
                <p className="mt-4 text-sm leading-7 text-gray-500">
                  Thank you, {form.name}. This is a frontend demonstration.
                  Your message has not been sent to RideMie.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-8 bg-[#080D14] px-7 py-4 text-sm font-bold text-white"
                >
                  Write another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setSent(true);
                }}
                className="space-y-6"
              >
                <label className="block text-sm font-semibold text-gray-700">
                  Full name
                  <input
                    name="name"
                    value={form.name}
                    onChange={update}
                    required
                    placeholder="Your name"
                    className="mt-3 w-full border border-gray-200 px-4 py-4 text-sm font-normal outline-none focus:border-[#B68A45]"
                  />
                </label>

                <label className="block text-sm font-semibold text-gray-700">
                  Email address
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={update}
                    required
                    placeholder="you@example.com"
                    className="mt-3 w-full border border-gray-200 px-4 py-4 text-sm font-normal outline-none focus:border-[#B68A45]"
                  />
                </label>

                <label className="block text-sm font-semibold text-gray-700">
                  Subject
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={update}
                    className="mt-3 w-full border border-gray-200 bg-white px-4 py-4 text-sm font-normal outline-none focus:border-[#B68A45]"
                  >
                    <option>General enquiry</option>
                    <option>Booking assistance</option>
                    <option>Vehicle information</option>
                    <option>Partnership enquiry</option>
                    <option>Feedback or complaint</option>
                  </select>
                </label>

                <label className="block text-sm font-semibold text-gray-700">
                  Your message
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={update}
                    required
                    rows="5"
                    placeholder="How can we help?"
                    className="mt-3 w-full resize-y border border-gray-200 px-4 py-4 text-sm font-normal outline-none focus:border-[#B68A45]"
                  />
                </label>

                <button
                  type="submit"
                  className="flex w-full items-center justify-between bg-[#080D14] px-6 py-5 text-sm font-bold text-white hover:bg-[#B68A45]"
                >
                  Submit message <ArrowUpRight size={19} />
                </button>
                <p className="text-xs leading-6 text-gray-400">
                  Demonstration form only. Messages are not transmitted or
                  stored until backend services are connected.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-xs font-bold uppercase tracking-[4px] text-[#B68A45]">
            Frequently asked questions
          </p>
          <h2 className="mt-5 text-center text-4xl font-semibold text-gray-900">
            Need a quick answer?
          </h2>

          <div className="mt-12 divide-y divide-gray-200 border-y border-gray-200">
            {faqs.map((faq, index) => (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-sm font-bold text-gray-900 sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-[#B68A45] transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <p className="max-w-3xl pb-7 text-sm leading-7 text-gray-500">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              Still have questions?
            </p>
            <Link
              to="/booking"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-[#B68A45]"
            >
              Explore booking <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

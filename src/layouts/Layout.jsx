
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Our Fleet", path: "/fleet" },
    { name: "Services", path: "/services" },
    { name: "Experience", path: "/experience" },
    { name: "Become a Partner", path: "/partners" },
  ];

  const linkClass = ({ isActive }) =>
    `transition hover:text-[#D9AC62] ${
      isActive ? "text-[#D9AC62]" : "text-white/80"
    }`;

  return (
    <div className="min-h-screen bg-white text-[#111827]">

      {/* HEADER */}
      <header className="relative z-50 bg-[#080D14]">
        <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-6 lg:px-12">

          <Link to="/" className="text-3xl font-black tracking-[-2px] text-white">
            ride<span className="text-[#D9AC62]">mie</span>
            <span className="ml-1 text-xs text-white/50">®</span>
          </Link>

          <div className="hidden items-center gap-9 text-sm font-medium lg:flex">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={linkClass}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-5 lg:flex">
            <Link to="/login" className="text-sm font-semibold text-white">
              Sign In
            </Link>

            <Link
              to="/booking"
              className="bg-[#D9AC62] px-6 py-3 text-sm font-bold text-[#111827] transition hover:bg-white"
            >
              Book a Car <ArrowUpRight className="ml-2 inline" size={16} />
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white lg:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={27} /> : <Menu size={27} />}
          </button>

        </nav>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="absolute left-0 top-full w-full border-t border-white/10 bg-[#080D14] p-6 shadow-xl lg:hidden">
            <div className="flex flex-col gap-6">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  onClick={() => setMenuOpen(false)}
                  className={linkClass}
                >
                  {link.name}
                </NavLink>
              ))}

              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-white"
              >
                Sign In
              </Link>

              <Link
                to="/booking"
                onClick={() => setMenuOpen(false)}
                className="bg-[#D9AC62] px-6 py-4 text-center font-bold text-black"
              >
                Book a Car
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* PAGE CONTENT */}
      <Outlet />

      {/* FOOTER */}
      <footer className="bg-[#080D14] px-6 pb-8 pt-20 text-white lg:px-12">
        <div className="mx-auto max-w-[1500px]">

          <div className="grid gap-12 border-b border-white/10 pb-16 sm:grid-cols-2 lg:grid-cols-4">

            <div className="lg:col-span-2">
              <Link to="/" className="text-4xl font-black tracking-[-3px]">
                ride<span className="text-[#D9AC62]">mie</span>
              </Link>

              <p className="mt-6 max-w-sm text-sm leading-7 text-white/50">
                A better way to move. Discover premium vehicles,
                flexible rentals and mobility experiences with RideMie.
              </p>
            </div>

            <div>
              <h4 className="font-bold">Explore</h4>
              <div className="mt-6 flex flex-col gap-4 text-sm text-white/50">
                <Link to="/fleet">Our Fleet</Link>
                <Link to="/services">Our Services</Link>
                <Link to="/experience">About RideMie</Link>
                <Link to="/partners">Become a Partner</Link>
              </div>
            </div>

            <div>
              <h4 className="font-bold">Get in touch</h4>
              <div className="mt-6 flex flex-col gap-4 text-sm text-white/50">
                <Link to="/booking">Make a Booking</Link>
                <Link to="/contact">Customer Support</Link>
                <Link to="/contact">FAQs</Link>
                <Link to="/contact">Terms & Privacy</Link>
              </div>
            </div>

          </div>

          <div className="flex flex-col justify-between gap-4 pt-8 text-xs text-white/40 sm:flex-row">
            <p>© {new Date().getFullYear()} RideMie. All rights reserved.</p>
            <p>Built with purpose by Tife Tech.</p>
          </div>

        </div>
      </footer>

    </div>
  );
}

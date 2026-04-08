import React, { useState, useEffect } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'Home', to: '/' },
    { label: 'Browse Fundis', to: '/fundis' },
    { label: 'How it Works', to: '/how-it-works' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b  border-accent-subtle
          ${scrolled
            ? 'bg-background-dark/90 backdrop-blur-xl shadow-lg shadow-black/20'
            : 'bg-background-dark/70 backdrop-blur-md'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none">
            <span className="text-xl font-bold text-text-inverse tracking-tight">
              <span className="text-primary-light">Fundi</span>Connect
            </span>
            <span className="text-[10px] text-text-inverse/50 uppercase tracking-widest font-normal">
              Trusted Service Providers
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-150
                    ${location.pathname === to
                      ? 'text-primary-light bg-primary/20'
                      : 'text-text-inverse/75 hover:text-text-inverse hover:bg-white/10'
                    }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/login"
              className="px-4 py-1.5 rounded-xl text-sm font-medium
                text-text-inverse/85 border border-text-inverse/25
                hover:bg-white/10 transition-all duration-150"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="px-4 py-1.5 rounded-xl text-sm font-semibold
                text-text-inverse bg-primary
                hover:bg-primary-dark shadow-teal
                transition-all duration-150"
            >
              Sign up
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setNav(!nav)}
            className="md:hidden text-text-inverse p-1"
            aria-label="Toggle menu"
          >
            {nav ? <IoCloseSharp size={22} /> : <GiHamburgerMenu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[70%] max-w-xs z-40
          bg-background-dark/95 backdrop-blur-xl border-r border-accent-subtle
          transition-transform duration-300 ease-in-out
          ${nav ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="pt-24 px-6">
          <ul className="flex flex-col gap-1">
            {links.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={() => setNav(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all
                    border-b border-accent-subtle/20
                    ${location.pathname === to
                      ? 'text-primary-light bg-primary/20'
                      : 'text-text-inverse/75 hover:text-text-inverse hover:bg-white/10'
                    }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              to="/login"
              onClick={() => setNav(false)}
              className="text-center px-4 py-2.5 rounded-xl text-sm font-medium
                text-text-inverse border border-text-inverse/25
                hover:bg-white/10 transition-all"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              onClick={() => setNav(false)}
              className="text-center px-4 py-2.5 rounded-xl text-sm font-semibold
                text-text-inverse bg-primary hover:bg-primary-dark
                shadow-teal transition-all"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {nav && (
        <div
          onClick={() => setNav(false)}
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
        />
      )}
    </>
  );
};

export default Navbar;
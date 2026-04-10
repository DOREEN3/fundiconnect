import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

const Footer = () => {
  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Browse Fundis', to: '/fundis' },
    { label: 'How it Works', to: '/how-it-works' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  const serviceLinks = [
    { label: 'Plumbing', to: '/fundis?category=plumbing' },
    { label: 'Electrical', to: '/fundis?category=electrical' },
    { label: 'Carpentry', to: '/fundis?category=carpentry' },
    { label: 'Painting', to: '/fundis?category=painting' },
    { label: 'Cleaning', to: '/fundis?category=cleaning' },
  ];

  const socials = [
    { icon: <FaFacebookF size={14} />, href: '#', label: 'Facebook' },
    { icon: <FaTwitter size={14} />, href: '#', label: 'Twitter' },
    { icon: <FaInstagram size={14} />, href: '#', label: 'Instagram' },
    { icon: <FaWhatsapp size={14} />, href: '#', label: 'WhatsApp' },
  ];

  return (
    <footer className="w-full bg-background-dark text-text-inverse/70 font-sans">

      {/* Top teal accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-primary-dark via-primary-light to-primary-glow" />

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Col 1 — Brand */}
        <div className="flex flex-col gap-5">
         
        <div className="grid md:grid-cols-2 gap-2">
  <Link to="/" className="flex flex-col leading-none">
    <div className="flex items-center gap-2">
      <img src="assets/logo.png" alt="fundi connect logo" className='w-6 h-6' />
      <div>
        <span className="text-xl font-bold text-text-inverse tracking-tight">
          <span className="text-primary-light">Fundi</span>Connect
        </span>
        <div className="text-[10px] text-text-inverse/50 uppercase tracking-widest font-normal">
          Trusted Service Providers
        </div>
      </div>
    </div>
  </Link>
</div>
        
          <p className="text-sm leading-relaxed text-text-inverse/55 max-w-[220px]">
            Connecting Kenyan homes and businesses with skilled, vetted fundis — fast, safe, and reliable.
          </p>
          {/* Socials */}
          <div className="flex items-center gap-2 mt-1">
            {socials.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10
                  flex items-center justify-center text-text-inverse/50
                  hover:bg-primary/30 hover:border-primary-light/40 hover:text-primary-light
                  transition-all duration-200"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Col 2 — Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-text-inverse text-xs font-semibold uppercase tracking-widest
            pb-2 border-b border-white/10">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-2.5">
            {navLinks.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-sm text-text-inverse/55 hover:text-primary-light
                    flex items-center gap-2 group transition-all duration-150"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary-light
                    group-hover:scale-150 transition-all duration-150" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Services */}
        <div className="flex flex-col gap-4">
          <h4 className="text-text-inverse text-xs font-semibold uppercase tracking-widest
            pb-2 border-b border-white/10">
            Services
          </h4>
          <ul className="flex flex-col gap-2.5">
            {serviceLinks.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-sm text-text-inverse/55 hover:text-primary-light
                    flex items-center gap-2 group transition-all duration-150"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary-light
                    group-hover:scale-150 transition-all duration-150" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Contact */}
        <div className="flex flex-col gap-4">
          <h4 className="text-text-inverse text-xs font-semibold uppercase tracking-widest
            pb-2 border-b border-white/10">
            Get in Touch
          </h4>
          <ul className="flex flex-col gap-3">
            <li>
              <a href="tel:+254700000000"
                className="flex items-start gap-3 text-sm text-text-inverse/55
                  hover:text-primary-light transition-colors duration-150 group">
                <MdPhone size={16} className="mt-0.5 shrink-0 text-primary-light/60
                  group-hover:text-primary-light transition-colors" />
                +254 700 000 000
              </a>
            </li>
            <li>
              <a href="mailto:hello@fundiconnect.co.ke"
                className="flex items-start gap-3 text-sm text-text-inverse/55
                  hover:text-primary-light transition-colors duration-150 group">
                <MdEmail size={16} className="mt-0.5 shrink-0 text-primary-light/60
                  group-hover:text-primary-light transition-colors" />
                hello@fundiconnect.co.ke
              </a>
            </li>
            <li>
              <span className="flex items-start gap-3 text-sm text-text-inverse/55">
                <MdLocationOn size={16} className="mt-0.5 shrink-0 text-primary-light/60" />
                Nairobi, Kenya
              </span>
            </li>
          </ul>

          {/* CTA */}
          <Link
            to="/signup"
            className="mt-2 inline-flex items-center justify-center px-4 py-2.5
              rounded-xl text-sm font-semibold bg-primary hover:bg-primary-dark
              text-text-inverse shadow-teal transition-all duration-200 w-full text-center"
          >
            Join as a Fundi →
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row
          items-center justify-between gap-2 text-xs text-text-inverse/35">
          <span>© {new Date().getFullYear()} FundiConnect. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-primary-light transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary-light transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
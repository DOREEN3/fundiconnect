import { useState, useEffect } from "react";

/* ─── data ──────────────────────────────────────────────── */
const services = [
  { icon: "🔧", name: "Plumbing",     count: "340+", tag: "Most Booked",    desc: "Leaks, pipes, drainage & full installations." },
  { icon: "⚡", name: "Electrical",   count: "280+", tag: "",               desc: "Wiring, DB boards, fault-finding & solar." },
  { icon: "🪚", name: "Carpentry",    count: "190+", tag: "",               desc: "Furniture, cabinets, doors & custom builds." },
  { icon: "🎨", name: "Painting",     count: "220+", tag: "",               desc: "Interior, exterior, texture & colour consult." },
  { icon: "🏠", name: "Masonry",      count: "150+", tag: "",               desc: "Brickwork, plastering, tiling & screeding." },
  { icon: "❄️", name: "AC & Cooling", count: "120+", tag: "Fast Response",  desc: "Installation, gas top-up, cleaning & repairs." },
];

const stats = [
  { value: "12,000+", label: "Jobs Completed",  icon: "✦", color: "from-primary-glow to-primary-light" },
  { value: "1,200+",  label: "Vetted Fundis",   icon: "🛡", color: "from-accent-info to-blue-400" },
  { value: "47",      label: "Counties Covered", icon: "📍", color: "from-accent-warm to-yellow-400" },
  { value: "4.9 ★",   label: "Average Rating",  icon: "★",  color: "from-primary-light to-primary-glow" },
];

const steps = [
  {
    n: "01", title: "Describe your job",
    desc: "Tell us what needs fixing — big or small. Add photos if you have them.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    n: "02", title: "Get matched instantly",
    desc: "We connect you with a vetted fundi near you. Usually confirmed within minutes.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    n: "03", title: "Approve & pay via M-Pesa",
    desc: "See the quote upfront. Pay securely only after you confirm the job is done.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

const testimonials = [
  { initials: "WM", name: "Wanjiku M.",  role: "Homeowner, Westlands",  text: "Plumber arrived in under an hour. Paid via M-Pesa, zero stress. Will definitely use again!", stars: 5 },
  { initials: "BO", name: "Brian O.",    role: "Landlord, Kilimani",    text: "I manage 12 units. FundiConnect handles all my repairs. Background checks = total peace of mind.", stars: 5 },
  { initials: "AH", name: "Amina H.",   role: "Business Owner, CBD",   text: "Certified electrician same day. Professional, fast, and surprisingly affordable.", stars: 5 },
];

const faqs = [
  { q: "How are fundis vetted?",          a: "Every fundi undergoes ID verification, license checks, and reference calls before joining our platform." },
  { q: "How does M-Pesa payment work?",   a: "You approve the quote first. An STK push is sent and payment releases to the fundi only after you confirm completion." },
  { q: "What if I'm not satisfied?",      a: "We offer a 7-day satisfaction guarantee — we'll send another fundi at no extra cost." },
  { q: "Which counties do you cover?",    a: "Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, and 42 more counties across Kenya." },
];

const innerTools = [
  { icon: "🔧", label: "Plumber" },
  { icon: "⚡", label: "Electrician" },
  { icon: "🪚", label: "Carpenter" },
  { icon: "🎨", label: "Painter" },
];
const outerTools = [
  { icon: "🏠", label: "Mason" },
  { icon: "❄️", label: "AC Repair" },
  { icon: "🚰", label: "Drains" },
  { icon: "🔑", label: "Locksmith" },
  { icon: "🪟", label: "Windows" },
  { icon: "🔩", label: "Welding" },
];

/* ─── sub-components ────────────────────────────────────── */
function Stars({ n }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 14 14"
          fill={i < n ? "#F59E0B" : "none"} stroke="#F59E0B" strokeWidth="1.3">
          <polygon points="7,1 9,5 13,5.5 10,8.5 10.5,13 7,11 3.5,13 4,8.5 1,5.5 5,5" />
        </svg>
      ))}
    </div>
  );
}

function OrbitRing({ radius, items, orbitClass, counterClass }) {
  return (
    <div
      className={`absolute top-1/2 left-1/2 rounded-full pointer-events-none ${orbitClass}`}
      style={{ width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius }}
    >
      {items.map((item, i) => {
        const angle = (i / items.length) * 360;
        return (
          <div key={i} className="absolute top-1/2 left-1/2"
            style={{ transformOrigin: "0 0", transform: `rotate(${angle}deg) translateX(${radius}px)` }}>
            <div
              className={`flex items-center gap-1.5 text-xs font-medium text-text-inverse
                          px-3 py-1.5 rounded-xl whitespace-nowrap
                          bg-surface-overlay/20 border border-surface-border/30 backdrop-blur-sm
                          ${counterClass}`}
              style={{ transform: `rotate(-${angle}deg)` }}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── page ──────────────────────────────────────────────── */
export default function Home() {
  const [search,  setSearch]  = useState("");
  const [county,  setCounty]  = useState("Nairobi");
  const [active,  setActive]  = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.remove("opacity-0", "translate-y-7");
          e.target.classList.add("opacity-100", "translate-y-0");
        }
      }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* ══ HERO ═════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden bg-background-dark min-h-screen
                   grid grid-cols-1 lg:grid-cols-2 items-center
                   gap-12 px-[5%] pt-28 pb-20"
        aria-label="Hero"
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(45,212,191,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(45,212,191,0.04) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at 65% 45%,black 25%,transparent 75%)",
        }} />
        <div className="absolute top-[5%] left-[35%] w-[520px] h-[520px] rounded-full bg-primary/10 blur-[60px] pointer-events-none" />
        <div className="absolute bottom-[12%] right-[5%] w-[280px] h-[280px] rounded-full bg-accent-info/10 blur-[50px] pointer-events-none" />

        <div className="relative z-10">
          <div className="animate-fade-up inline-flex items-center gap-2 bg-primary-glow/10 border border-primary-glow/20 rounded-full px-3.5 py-1.5 text-xs font-medium text-primary-glow mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-light animate-blink" />
            🇰🇪 Kenya's #1 Trusted Home Repair Platform
          </div>
          <h1 className="animate-fade-up-1 font-display font-extrabold leading-[1.1] text-[clamp(34px,4.2vw,56px)] text-text-inverse mb-5">
            Find a Vetted<br />
            <span className="animate-shimmer-text" style={{
              background: "linear-gradient(120deg,#2DD4BF,#818cf8,#2DD4BF)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Fundi Near You</span>
            <br />in Minutes
          </h1>
          <p className="animate-fade-up-2 text-base leading-[1.72] text-text-muted max-w-[460px] mb-8">
            Background-checked plumbers, electricians, carpenters & more across Nairobi and 47 counties.
            Transparent pricing — pay via <strong className="text-primary-glow font-semibold">M-Pesa</strong> only when the job is done.
          </p>
          <div className="animate-fade-up-3 flex items-center gap-2 bg-surface-overlay/20 border border-surface-border/30 rounded-2xl px-4 py-1.5 max-w-[540px] mb-6 focus-within:border-primary-glow/45 transition-colors">
            <span className="text-base shrink-0">🔍</span>
            <input
              className="flex-1 bg-transparent border-none outline-none text-text-inverse text-sm font-sans placeholder:text-text-muted"
              placeholder="What do you need? e.g. 'fix leaking pipe'"
              value={search} onChange={(e) => setSearch(e.target.value)}
              aria-label="Search for a fundi"
            />
            <div className="w-px h-6 bg-surface-border/30 shrink-0" />
            <select
              className="bg-background-dark border-none outline-none text-text-muted text-xs font-sans cursor-pointer px-2"
              value={county} onChange={(e) => setCounty(e.target.value)}
            >
              {["Nairobi","Mombasa","Kisumu","Nakuru","Eldoret"].map(c => <option key={c}>{c}</option>)}
            </select>
            <button className="bg-gradient-to-br from-primary to-primary-light text-text-inverse font-semibold text-xs rounded-xl px-4 py-2.5 border-none cursor-pointer whitespace-nowrap hover:-translate-y-0.5 hover:shadow-teal-glow transition-all">
              Find Fundi
            </button>
          </div>
          <div className="animate-fade-up-4 flex flex-wrap gap-5">
            {["✅ Background Checked","✅ M-Pesa Ready","✅ Insured Pros","✅ Satisfaction Guarantee"].map(b => (
              <span key={b} className="text-xs text-text-muted font-medium">{b}</span>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center relative h-[520px]" aria-hidden="true">
          {[196, 308].map((r, i) => (
            <div key={i} className="absolute top-1/2 left-1/2 rounded-full border border-dashed border-primary-glow/10"
              style={{ width: r*2, height: r*2, marginLeft: -r, marginTop: -r }} />
          ))}
          {[170, 220, 278].map((s, i) => (
            <div key={i} className="absolute rounded-full border border-primary-glow/20 animate-pulse-ring"
              style={{ width: s, height: s, animationDelay: `${i * 0.8}s` }} />
          ))}
          <OrbitRing radius={196} items={innerTools} orbitClass="animate-orbit-f [--orbit-dur:18s]" counterClass="animate-counter-f [--orbit-dur:18s]" />
          <OrbitRing radius={308} items={outerTools} orbitClass="animate-orbit-r [--orbit-dur:30s]" counterClass="animate-counter-r [--orbit-dur:30s]" />
          <div className="relative z-10 flex flex-col items-center justify-center w-[136px] h-[136px] rounded-full bg-gradient-to-br from-background-dark to-surface-overlay border border-primary-glow/30 shadow-orb animate-float-orb">
            <span className="text-4xl mb-1">🏠</span>
            <span className="text-[10px] text-primary-glow font-bold tracking-[1.5px]">FUNDI</span>
            <span className="text-[9px] text-text-muted tracking-[1.5px]">CONNECT</span>
          </div>
        </div>
      </section>

      {/* ══ STATS — redesigned ═══════════════════════════════ */}
      <div className="relative px-[5%] py-0 -mt-6 z-10">
        <div
          className="relative grid grid-cols-2 lg:grid-cols-4 gap-px rounded-3xl overflow-hidden
                     opacity-0 translate-y-7 transition-all duration-[0.65s]"
          data-reveal
          role="region"
          aria-label="Platform statistics"
          style={{ background: "linear-gradient(135deg,rgba(45,212,191,0.15),rgba(129,140,248,0.1))" }}
        >
          {/* inner glass bg */}
          <div className="absolute inset-[1px] rounded-3xl pointer-events-none"
            style={{ background: "linear-gradient(135deg,#0e1a28,#0a1420)" }} />

          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`relative group px-8 py-10 text-center flex flex-col items-center gap-3
                          transition-all duration-300 hover:bg-white/[0.03]
                          ${i < stats.length - 1 ? "border-r border-white/[0.06]" : ""}
                          ${i < 2 ? "border-b border-white/[0.06] lg:border-b-0" : ""}`}
            >
              {/* ambient glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(circle at 50% 80%,rgba(45,212,191,0.05),transparent 70%)" }} />

              {/* value */}
              <div className={`font-display font-extrabold text-[40px] leading-none bg-gradient-to-br ${s.color} bg-clip-text text-transparent
                               group-hover:scale-105 transition-transform duration-300`}>
                {s.value}
              </div>

              {/* divider */}
              <div className={`w-8 h-[2px] rounded-full bg-gradient-to-r ${s.color} opacity-40`} />

              {/* label */}
              <div className="text-xs uppercase tracking-[2px] text-text-muted font-semibold">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ SERVICES — redesigned ════════════════════════════ */}
      <section className="relative px-[5%] py-28 overflow-hidden" id="services" aria-label="Our services">
        {/* background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-[15%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute bottom-0 left-[5%] w-[300px] h-[300px] rounded-full bg-accent-info/5 blur-[80px]" />
        </div>

        <div className="relative z-10">
          <div className="opacity-0 translate-y-7 transition-all duration-[0.65s]" data-reveal>
            <div className="inline-flex items-center gap-2 bg-primary-glow/10 border border-primary-glow/20 rounded-full px-4 py-1.5 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-primary-glow animate-pulse" />
              <span className="text-[10px] tracking-[3px] uppercase text-primary-glow font-bold">What We Cover</span>
            </div>
            <h2 className="font-display font-extrabold text-[clamp(28px,3.5vw,44px)] leading-[1.15] text-text-inverse mb-4">
              Every home repair,<br />
              <span className="bg-gradient-to-r from-primary-light to-primary-glow bg-clip-text text-transparent">
                covered.
              </span>
            </h2>
            <p className="text-[15px] text-text-muted max-w-[480px] leading-[1.7] mb-14">
              Skilled professionals for any job — from a leaking tap to a full electrical rewire. Click a service to book.
            </p>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5
                       opacity-0 translate-y-7 transition-all duration-[0.65s]"
            data-reveal
          >
            {services.map((s, i) => (
              <div
                key={i}
                onClick={() => setActive(i === active ? null : i)}
                onKeyDown={(e) => e.key === "Enter" && setActive(i === active ? null : i)}
                tabIndex={0} role="button"
                aria-expanded={active === i}
                aria-label={`${s.name}, ${s.count} available`}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer
                           transition-all duration-300 border
                           ${active === i
                             ? "bg-[#0e1e1a] border-primary-glow/40 shadow-[0_0_40px_-10px_rgba(45,212,191,0.25)] -translate-y-1"
                             : "bg-[#0d1520] border-white/[0.06] hover:bg-[#0e1e1a] hover:border-primary-glow/30 hover:-translate-y-1 hover:shadow-[0_0_40px_-10px_rgba(45,212,191,0.15)]"
                           }`}
              >
                {/* top glow line */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-glow to-transparent
                                transition-opacity duration-300
                                ${active === i ? "opacity-100" : "opacity-0 group-hover:opacity-70"}`} />

                {/* number watermark */}
                <div className="absolute bottom-4 right-5 font-display font-extrabold text-[64px] leading-none text-white/[0.025] select-none pointer-events-none">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="p-7">
                  {/* tag */}
                  {s.tag && (
                    <span className="inline-block bg-primary-glow/10 border border-primary-glow/25 text-primary-glow text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full mb-4">
                      {s.tag}
                    </span>
                  )}

                  {/* icon in floating box */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5
                                  bg-white/[0.04] border border-white/[0.08]
                                  group-hover:bg-primary-glow/10 group-hover:border-primary-glow/25
                                  transition-all duration-300`}>
                    <span className="text-2xl">{s.icon}</span>
                  </div>

                  <div className="font-display font-bold text-[17px] text-text-inverse mb-1.5">{s.name}</div>
                  <p className="text-xs text-text-muted leading-[1.6] mb-4">{s.desc}</p>

                  {/* count pill */}
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-primary-light font-medium">
                    <span className="w-1 h-1 rounded-full bg-primary-glow" />
                    {s.count} fundis near you
                  </span>

                  {/* expanded CTA */}
                  {active === i && (
                    <div className="mt-5 pt-5 border-t border-white/[0.06]">
                      <button className="w-full bg-gradient-to-r from-primary to-primary-light text-text-inverse font-semibold text-sm rounded-xl py-3 border-none cursor-pointer hover:-translate-y-0.5 hover:shadow-teal transition-all">
                        Book a {s.name} Fundi →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS — redesigned ════════════════════════ */}
      <section
        className="relative px-[5%] py-28 overflow-hidden"
        id="how-it-works"
        aria-label="How FundiConnect works"
        style={{ background: "linear-gradient(180deg,#0a1220 0%,#0B0F1A 100%)" }}
      >
        {/* mesh bg */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.07]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #2DD4BF 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-primary-glow/30 to-transparent" />
        <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] rounded-full bg-primary/6 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] rounded-full bg-accent-info/5 blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="opacity-0 translate-y-7 transition-all duration-[0.65s]" data-reveal>
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-primary-glow animate-pulse" />
              <span className="text-[10px] tracking-[3px] uppercase text-primary-glow font-bold">How It Works</span>
            </div>
            <h2 className="font-display font-extrabold text-[clamp(28px,3.5vw,44px)] text-text-inverse mb-4">
              Fixed in{" "}
              <span className="bg-gradient-to-r from-primary-glow to-primary-light bg-clip-text text-transparent">
                3 simple steps
              </span>
            </h2>
            <p className="text-[15px] text-text-muted max-w-[460px] leading-[1.7] mb-16">
              From request to repair — fast, fair, and fully transparent. No hidden fees, ever.
            </p>
          </div>

          <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6
                       opacity-0 translate-y-7 transition-all duration-[0.65s]"
            data-reveal
          >
            {steps.map((s, i) => (
              <div key={i} className="relative group">

                {/* connector line between cards */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-[52px] left-full w-6 items-center z-10">
                    <div className="w-full h-px bg-gradient-to-r from-primary-glow/40 to-transparent" />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-glow/40 shrink-0 -ml-0.5" />
                  </div>
                )}

                <div className="relative h-full rounded-2xl border border-white/[0.07] overflow-hidden
                               bg-[#0d1520] transition-all duration-300
                               group-hover:border-primary-glow/30 group-hover:-translate-y-1
                               group-hover:shadow-[0_0_50px_-15px_rgba(45,212,191,0.2)]">

                  {/* top edge glow */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-glow/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="p-8">
                    {/* step header */}
                    <div className="flex items-center gap-4 mb-7">
                      {/* numbered circle */}
                      <div className="relative shrink-0">
                        <div className="absolute inset-0 rounded-full bg-primary-glow/20 blur-md group-hover:bg-primary-glow/30 transition-all duration-300" />
                        <div className="relative w-11 h-11 rounded-full border border-primary-glow/30 bg-[#0a1a20]
                                       flex items-center justify-center font-display font-bold text-sm text-primary-glow
                                       group-hover:border-primary-glow/60 transition-all duration-300">
                          {s.n}
                        </div>
                      </div>

                      {/* icon */}
                      <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08]
                                     flex items-center justify-center text-primary-glow/70
                                     group-hover:bg-primary-glow/10 group-hover:border-primary-glow/25
                                     group-hover:text-primary-glow transition-all duration-300">
                        {s.icon}
                      </div>
                    </div>

                    <div className="font-display font-bold text-[18px] text-text-inverse mb-3 leading-[1.3]">
                      {s.title}
                    </div>
                    <p className="text-sm text-text-muted leading-[1.7]">{s.desc}</p>

                    {/* bottom accent */}
                    <div className="mt-8 pt-5 border-t border-white/[0.05] flex items-center gap-2">
                      <div className="w-5 h-[1px] bg-gradient-to-r from-primary-glow/50 to-transparent rounded-full" />
                      <span className="text-[10px] uppercase tracking-[2px] text-text-muted font-semibold">
                        Step {s.n}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA nudge below steps */}
          <div className="mt-12 flex justify-center opacity-0 translate-y-7 transition-all duration-[0.65s]" data-reveal>
            <div className="inline-flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-6 py-3.5 text-sm text-text-muted">
              <span className="text-lg">⚡</span>
              Average booking confirmed in under <strong className="text-primary-glow font-semibold mx-1">4 minutes</strong>
              <span className="text-text-muted">across Nairobi</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS (existing premium version) ══════════ */}
      <section className="px-[5%] py-24 relative overflow-hidden" id="testimonials" aria-label="Customer testimonials">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-primary/5 blur-[80px]" />
          <div className="absolute bottom-20 right-[10%] w-96 h-96 rounded-full bg-primary/5 blur-[100px]" />
        </div>
        <div className="relative z-10">
          <div className="opacity-0 translate-y-7 transition-all duration-[0.65s]" data-reveal>
            <div className="inline-flex items-center gap-2 bg-primary-glow/10 border border-primary-glow/20 rounded-full px-4 py-1.5 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-light opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-light" />
              </span>
              <span className="text-[10px] tracking-[2px] uppercase text-primary-glow font-bold">Testimonials</span>
            </div>
            <h2 className="font-display font-extrabold text-[clamp(28px,3.5vw,44px)] text-text-secondary mb-4 leading-[1.2]">
              Trusted by thousands<br />
              <span className="bg-gradient-to-r from-primary-light to-primary-glow bg-clip-text text-transparent">of Kenyans</span>
            </h2>
            <p className="text-[15px] text-text-secondary max-w-[480px] leading-[1.7] mb-14">
              Here's what homeowners and landlords across Kenya say about their experience with FundiConnect.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 opacity-0 translate-y-7 transition-all duration-[0.65s]" data-reveal>
            {testimonials.map((t, i) => (
              <div key={i}
                className="group relative bg-gradient-to-br from-surface-overlay/30 to-surface-overlay/10
                           backdrop-blur-sm border border-surface-border/30 rounded-2xl p-7
                           hover:border-primary-glow/40 transition-all duration-500 hover:-translate-y-2
                           hover:shadow-2xl hover:shadow-primary/10 overflow-hidden"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="absolute -inset-full group-hover:inset-0 transition-all duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:translate-x-full -skew-x-12" />
                <div className="absolute top-6 right-6 text-6xl font-serif text-primary-glow/10 group-hover:text-primary-glow/20 transition-all duration-500 group-hover:scale-110">"</div>
                <div className="relative mb-5"><Stars n={t.stars} /></div>
                <p className="relative text-[15px] leading-[1.65] text-text-secondary mb-6 min-h-[100px] line-clamp-4 group-hover:text-text-primary transition-colors duration-300">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-surface-border/20 group-hover:border-primary-glow/20 transition-colors duration-300">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
                    <div className="relative w-11 h-11 rounded-full shrink-0 bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-[14px] font-bold text-text-inverse shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {t.initials}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-text-inverse group-hover:text-primary-glow transition-colors duration-300">{t.name}</div>
                    <div className="text-xs text-text-muted flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {t.role}
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-glow/0 to-transparent group-hover:via-primary-glow/50 transition-all duration-700" />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-12 opacity-0 translate-y-7 transition-all duration-[0.65s] delay-200" data-reveal>
            <button className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent border border-primary-glow/30 text-primary-glow text-sm font-semibold hover:bg-primary-glow/10 hover:border-primary-glow/50 transition-all duration-300 overflow-hidden">
              <span className="relative z-10">Read All Reviews</span>
              <svg className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </section>

      {/* ══ FAQ (existing luxury dark version) ═══════════════ */}
      <section className="relative px-[5%] py-28 overflow-hidden bg-[#0B0F1A]" id="faq" aria-label="Frequently asked questions" itemScope itemType="https://schema.org/FAQPage">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full bg-primary/10 blur-[140px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent-info/8 blur-[120px] animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] rounded-full bg-primary-glow/5 blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #2DD4BF 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-16 opacity-0 translate-y-7 transition-all duration-[0.65s]" data-reveal>
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-5 py-2 mb-6 shadow-2xl hover:border-primary-glow/30 transition-all duration-300">
              <div className="w-1.5 h-1.5 rounded-full bg-primary-glow animate-pulse" />
              <span className="text-[10px] tracking-[4px] uppercase text-primary-glow font-bold">Inquiry Hub</span>
            </div>
            <h2 className="font-display font-extrabold text-[clamp(32px,4vw,48px)] mb-5">
              <span className="text-white">Your Questions,</span><br />
              <span className="bg-gradient-to-r from-primary-glow via-primary-light to-primary-glow bg-clip-text text-transparent animate-shimmer-text">Answered</span>
            </h2>
            <p className="text-slate-400 max-w-[540px] mx-auto leading-relaxed">Quick insights into how FundiConnect ensures quality and safety for your home.</p>
            <div className="flex justify-center mt-6">
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-primary-glow/50 to-transparent rounded-full" />
            </div>
          </div>
          <div className="max-w-[740px] mx-auto opacity-0 translate-y-7 transition-all duration-[0.65s] delay-100" data-reveal>
            {faqs.map((item, i) => (
              <div key={i} className="group mb-4" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <div className={`relative rounded-2xl transition-all duration-500 bg-[#151B28] border ${openFaq === i ? "border-primary-glow/50 shadow-[0_0_50px_-15px_rgba(45,212,191,0.25)]" : "border-white/5 hover:border-white/15"}`}>
                  <div className={`absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-transparent via-primary-glow to-transparent transition-opacity duration-500 ${openFaq === i ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`} />
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full bg-gradient-to-b from-primary-glow to-primary transition-all duration-500 ${openFaq === i ? "h-12" : "h-0 group-hover:h-8"}`} />
                  <button
                    className="w-full text-left flex justify-between items-center py-6 px-7 cursor-pointer bg-transparent border-none group/btn"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i} itemProp="name"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`hidden sm:flex items-center justify-center w-8 h-8 rounded-lg font-mono font-bold text-xs transition-all duration-500 ${openFaq === i ? "bg-gradient-to-br from-primary-glow to-primary text-[#0B0F1A] shadow-lg shadow-primary-glow/30" : "bg-white/5 text-slate-500 group-hover/btn:bg-white/10 group-hover/btn:text-primary-glow"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <span className={`text-[15px] font-medium transition-all duration-300 ${openFaq === i ? "text-primary-glow" : "text-slate-200 group-hover/btn:text-white"}`}>{item.q}</span>
                    </div>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-500 ${openFaq === i ? "bg-primary-glow text-[#0B0F1A] rotate-180 shadow-lg shadow-primary-glow/30" : "bg-white/5 text-slate-400 group-hover/btn:bg-white/10 group-hover/btn:text-primary-glow"}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === i ? "max-h-64" : "max-h-0"}`} itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <div className="px-7 pb-7 pt-2 border-t border-white/5">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-[1px] bg-gradient-to-r from-primary-glow to-transparent rounded-full" />
                        <svg className="w-3 h-3 text-primary-glow/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed" itemProp="text">{item.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════ */}
      <div
        className="mx-[5%] mb-16 border border-primary-glow/15 rounded-4xl p-20 text-center relative overflow-hidden opacity-0 translate-y-7 transition-all duration-[0.65s]"
        style={{ background: "linear-gradient(135deg,#071a2c 0%,#0a1929 60%,#0e0c22 100%)" }}
        data-reveal role="region" aria-label="Get started with FundiConnect"
      >
        <div className="absolute w-[480px] h-[480px] rounded-full pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ background: "radial-gradient(circle,rgba(15,118,110,0.14),transparent 70%)" }} />
        <h2 className="relative font-display font-extrabold text-[clamp(26px,3.8vw,44px)] text-text-inverse mb-4">
          Ready to get your home fixed?
        </h2>
        <p className="relative text-base text-text-secondary mb-10">Join over 12,000 Kenyans who've found reliable fundis through FundiConnect.</p>
        <div className="relative flex gap-4 justify-center flex-wrap">
          <button className="bg-gradient-to-br from-primary to-primary-light text-text-inverse font-semibold text-[15px] rounded-xl px-9 py-4 border-none cursor-pointer hover:-translate-y-0.5 hover:shadow-teal-glow transition-all">
            Find a Fundi Now →
          </button>
          <button className="bg-transparent text-text-inverse border border-surface-border/40 rounded-xl px-9 py-4 text-[15px] font-medium cursor-pointer font-sans hover:bg-surface-overlay/10 hover:border-surface-border/60 transition-all">
            Register as a Fundi
          </button>
        </div>
        <div className="relative flex justify-center mt-6">
          <span className="inline-flex items-center gap-2 bg-accent-success/10 border border-accent-success/20 rounded-xl px-4 py-1.5 text-xs text-accent-success">
            ✅ M-Pesa accepted · No upfront payment · Book in 60 seconds
          </span>
        </div>
      </div>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "LocalBusiness",
        name: "FundiConnect",
        description: "Kenya's #1 marketplace for vetted home repair professionals across all 47 counties.",
        url: "https://fundiconnect.co.ke",
        areaServed: { "@type": "Country", name: "Kenya" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "12000" },
        hasOfferCatalog: { "@type": "OfferCatalog", name: "Home Repair Services",
          itemListElement: services.map(s => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name } })) },
      })}} />
    </>
  );
}

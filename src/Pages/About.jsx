import React from 'react'

const values = [
  {
    title: 'Integrity',
    desc: 'We prioritize honesty and transparency in every connection made on our platform.',
    icon: '🤝',
  },
  {
    title: 'Quality',
    desc: 'We champion excellence, encouraging our fundis to provide top-tier service that lasts.',
    icon: '⭐',
  },
  {
    title: 'Innovation',
    desc: 'Using technology to simplify local logistics and improve the livelihoods of Kenyan artisans.',
    icon: '💡',
  },
  {
    title: 'Safety',
    desc: 'Your peace of mind is our priority, which is why we emphasize verification and community feedback.',
    icon: '🛡️',
  },
]

const ownerBenefits = [
  { title: 'Vetted Talent', desc: 'No more guesswork. Access a network of verified technicians.' },
  { title: 'Transparent Reviews', desc: 'Hear from other customers before you hire.' },
  { title: 'Fast Turnaround', desc: 'Find a professional near you in minutes, not days.' },
]

const fundiBenefits = [
  { title: 'Digital Presence', desc: 'A professional profile to showcase your portfolio and skills.' },
  { title: 'Consistent Leads', desc: 'Connect with clients actively searching for your expertise.' },
  { title: 'Business Growth', desc: 'Build a reputation that helps you scale your income.' },
]

const About = () => {
  return (
    <section className="w-full bg-background text-text-primary">

      {/* Hero */}
      <div className="bg-background-dark py-20 px-6 text-center">
        <p className="text-primary-glow text-sm font-semibold uppercase tracking-widest mb-3">
          About Fundi Connect
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-text-inverse mb-4">
          Empowering Skills,<br className="hidden md:block" /> Connecting Communities
        </h2>
        <p className="text-text-muted max-w-2xl mx-auto text-base leading-relaxed">
          At Fundi Connect, we believe that finding a reliable technician shouldn't be a game of chance.
          Whether you're dealing with a leaking pipe, a faulty electrical circuit, or planning a major
          home renovation, we are here to bridge the gap between quality craftsmanship and those who need it most.
        </p>
      </div>

      {/* Our Story */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="rounded-2xl overflow-hidden shadow-teal">
          <img
            src="/assets/fundi.png"
            alt="Professional fundis at Fundi Connect"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Our Story</p>
          <h3 className="text-2xl font-bold text-text-primary mb-4">Born from a real problem</h3>
          <p className="text-text-secondary leading-relaxed mb-4">
            Fundi Connect was born from a simple observation: Nairobi is full of incredible talent,
            yet many homeowners struggle to find fundis they can trust, while skilled professionals
            often find it hard to market their services beyond word-of-mouth.
          </p>
          <p className="text-text-secondary leading-relaxed">
            We set out to create a digital marketplace that professionalizes the local service industry.
            By providing a platform for verification, reviews, and seamless connection, we are transforming
            the way Kenyans maintain their homes and businesses.
          </p>
        </div>
      </div>

      {/* What We Solve */}
      <div className="bg-background-section py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">What We Solve</p>
            <h3 className="text-2xl font-bold text-text-primary">Built for both sides of the equation</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Owners column */}
            <div className="bg-white rounded-2xl shadow-card p-6 border border-surface-border">
              <h4 className="text-base font-semibold text-text-primary mb-4 pb-3 border-b border-surface-border">
                🏠 For Home & Business Owners
              </h4>
              <ul className="flex flex-col gap-4">
                {ownerBenefits.map((item) => (
                  <li key={item.title} className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-text-primary">{item.title}</span>
                    <span className="text-sm text-text-secondary">{item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fundis column */}
            <div className="bg-white rounded-2xl shadow-card p-6 border border-surface-border">
              <h4 className="text-base font-semibold text-text-primary mb-4 pb-3 border-b border-surface-border">
                🔧 For Skilled Professionals (Fundis)
              </h4>
              <ul className="flex flex-col gap-4">
                {fundiBenefits.map((item) => (
                  <li key={item.title} className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-text-primary">{item.title}</span>
                    <span className="text-sm text-text-secondary">{item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Our Values</p>
          <h3 className="text-2xl font-bold text-text-primary">What we stand for</h3>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-white rounded-2xl border border-surface-border shadow-card p-6 flex flex-col gap-3 hover:shadow-teal transition-shadow duration-200"
            >
              <span className="text-3xl">{v.icon}</span>
              <h4 className="text-base font-semibold text-text-primary">{v.title}</h4>
              <p className="text-sm text-text-secondary leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary py-16 px-6 text-center">
        <h3 className="text-2xl font-bold text-white mb-3">Join the Movement</h3>
        <p className="text-primary-subtle max-w-xl mx-auto mb-8 text-sm leading-relaxed">
          Whether you are a seasoned plumber, an expert electrician, or a homeowner looking for a job
          well done — you belong here.
        </p>
        <button className="bg-white text-primary font-semibold px-8 py-3 rounded-xl shadow-teal-lg hover:bg-primary-subtle transition-colors duration-200 text-sm">
          Find a Fundi
        </button>
      </div>

    </section>
  )
}

export default About
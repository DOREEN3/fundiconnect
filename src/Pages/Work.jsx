import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { GrSecure } from "react-icons/gr";
import { FaMapPin } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FaTools } from "react-icons/fa";

// HowTo Schema for Google Rich Snippets
const HowToSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        "name": "How to Find a Fundi (Technician) in Nairobi",
        "description": "Find and book a verified local technician in Nairobi using Fundi Connect.",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Post a Task or Search",
            "text": "Describe what you need or browse verified Fundis near you in Nairobi."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Review Matches",
            "text": "See profiles, ratings, and reviews of verified Fundis in your area."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Secure Booking",
            "text": "Chat and agree on a price securely within the platform."
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Join Fundi Connect as a Professional",
        "description": "Create a profile, get verified, and start receiving job leads in Nairobi.",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Create Your Profile",
            "text": "Sign up and upload your ID and certifications to get started."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Get Verified",
            "text": "Our team reviews your skills and awards you a Verified badge."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Receive Job Leads",
            "text": "Start getting notified about jobs that match your skills in your area."
          }
        ]
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

const ownerSteps = [
  {
    number: '01',
    icon: <FaMapPin />,
    title: 'Post a Task or Search',
    desc: 'Describe what you need — "Leaking sink in Westlands" — or browse verified Fundis near you.',
  },
  {
    number: '02',
    icon: '👤',
    title: 'Review Matches',
    desc: 'See profiles, ratings, and verified reviews from real customers in your area.',
  },
  {
    number: '03',
    icon: <GrSecure />,
    title: 'Secure Booking',
    desc: 'Chat, agree on a price, and book — all within the platform. No cash upfront.',
  },
]

const fundiSteps = [
  {
    number: '01',
    icon: '📋',
    title: 'Create Your Profile',
    desc: 'Sign up and upload your ID and certifications. Takes less than 10 minutes.',
  },
  {
    number: '02',
    icon: '🛡️',
    title: 'Get Verified',
    desc: 'Our team reviews your skills and awards you a Verified badge clients can trust.',
  },
  {
    number: '03',
    icon: '📲',
    title: 'Receive Job Leads',
    desc: 'Get notified about jobs matching your skills and location. Grow your income.',
  },
]

const Work = () => {
  const [audience, setAudience] = useState('owner')
  const isOwner = audience === 'owner'
  const steps = isOwner ? ownerSteps : fundiSteps

  return (
    <section className="w-full bg-background text-text-primary">
      <HowToSchema />

      {/* Hero */}
      <div className="bg-background-dark py-20 px-6 text-center">
        <p className="text-primary-glow text-sm font-semibold uppercase tracking-widest mb-3">
          How It Works
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-text-inverse mb-4">
          Professional Services, Simplified
        </h2>
        <p className="text-text-muted max-w-xl mx-auto text-base leading-relaxed mb-8">
          Whether you need a job done or you're a professional looking for work,
          Fundi Connect makes the process seamless and secure.
        </p>
        <div className="flex flex-row justify-center gap-3">
          <Link
            to="/fundis"
            className="bg-primary hover:bg-primary-dark text-white font-medium py-2.5 px-6 rounded-xl shadow-teal transition-colors duration-200 text-sm"
          >
            Find a Professional
          </Link>
          <Link
            to="/fundi-sign-up"
            className="bg-transparent border border-primary-glow text-primary-glow hover:bg-primary/10 font-medium py-2.5 px-6 rounded-xl transition-colors duration-200 text-sm"
          >
            Join as a Fundi
          </Link>
        </div>
      </div>

      {/* Location trust bar */}
    <div className="bg-primary/10 border-y border-primary/20 py-3 px-6">
  <p className="text-center text-sm text-primary font-medium flex items-center justify-center gap-2">
    <FaMapPin className="inline-block" />
    <span>Currently serving Nairobi — find verified Fundis in your area today</span>
  </p>
</div>

      {/* Audience toggle */}
      <div className="max-w-4xl mx-auto px-6 pt-14 pb-4 text-center">
        <p className="text-text-secondary text-sm mb-4">I am a...</p>
        <div className="inline-flex bg-background-section border border-surface-border rounded-xl p-1 gap-1">
          <button
            onClick={() => setAudience('owner')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isOwner
                ? 'bg-primary text-white shadow-teal'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <IoHome className='inline-block' /> Homeowner / Business
          </button>
          <button
            onClick={() => setAudience('fundi')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              !isOwner
                ? 'bg-primary text-white shadow-teal'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <FaTools className='inline-block' /> Skilled Professional
          </button>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative bg-white rounded-2xl border border-surface-border shadow-card p-6 flex flex-col gap-3 hover:shadow-teal transition-shadow duration-200"
            >
              {/* Connector line between cards (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 -right-3 w-6 h-px bg-primary/30 z-10" />
              )}
              <span className="text-2xl">{step.icon}</span>
              <span className="text-xs font-bold text-primary tracking-widest">{step.number}</span>
              <h4 className="text-base font-semibold text-text-primary">{step.title}</h4>
              <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-6 pb-16 text-center">
        <div className="bg-primary rounded-2xl p-10 shadow-teal-lg">
          <h3 className="text-xl font-bold text-white mb-2">
            {isOwner ? 'Ready to find your Fundi?' : 'Ready to grow your business?'}
          </h3>
          <p className="text-primary-subtle text-sm mb-6">
            {isOwner
              ? 'Join hundreds of Nairobi homeowners who trust Fundi Connect.'
              : 'Join a network of verified professionals earning more, consistently.'}
          </p>
          <Link
            to={isOwner ? '/fundis' : '/fundi-sign-up'}
            className="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-xl shadow-teal hover:bg-primary-subtle transition-colors duration-200 text-sm"
          >
            {isOwner ? 'Find a Fundi Now' : 'Create My Profile'}
          </Link>
        </div>
      </div>

    </section>
  )
}

export default Work
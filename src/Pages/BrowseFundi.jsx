import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaMapPin } from "react-icons/fa";

const categories = ['All', 'Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Cleaning']

const fundis = [
  {
    id: 1,
    initials: 'JM',
    name: 'James Mwangi',
    role: 'Master Plumber',
    category: 'Plumbing',
    rating: 4.9,
    reviews: 127,
    experience: '12 yrs',
    price: 'From KShs 800/hr',
    location: 'Westlands',
    tags: ['Pipe repair', 'Drainage', 'Water systems'],
    verified: true,
    isNew: false,
    color: 'teal',
  },
  {
    id: 2,
    initials: 'AO',
    name: 'Aisha Otieno',
    role: 'Plumber',
    category: 'Plumbing',
    rating: 4.7,
    reviews: 84,
    experience: '7 yrs',
    price: 'From KShs 700/hr',
    location: 'Kilimani',
    tags: ['Leak detection', 'Bathroom fitting'],
    verified: true,
    isNew: false,
    color: 'teal',
  },
  {
    id: 3,
    initials: 'PK',
    name: 'Peter Kamau',
    role: 'Licensed Electrician',
    category: 'Electrical',
    rating: 5.0,
    reviews: 203,
    experience: '15 yrs',
    price: 'From KShs 1,200/hr',
    location: 'Karen',
    tags: ['Wiring', 'DB boards', 'Solar install'],
    verified: true,
    isNew: false,
    color: 'blue',
  },
  {
    id: 4,
    initials: 'GN',
    name: 'Grace Njeri',
    role: 'Electrician',
    category: 'Electrical',
    rating: 4.5,
    reviews: 19,
    experience: '4 yrs',
    price: 'From KShs 900/hr',
    location: 'Parklands',
    tags: ['Fault finding', 'Lighting'],
    verified: true,
    isNew: true,
    color: 'blue',
  },
  {
    id: 5,
    initials: 'SM',
    name: 'Samuel Mutua',
    role: 'Master Carpenter',
    category: 'Carpentry',
    rating: 4.8,
    reviews: 156,
    experience: '18 yrs',
    price: 'From KShs 1,500/day',
    location: 'Lavington',
    tags: ['Custom furniture', 'Kitchen cabinets'],
    verified: true,
    isNew: false,
    color: 'amber',
  },
  {
    id: 6,
    initials: 'FW',
    name: 'Fatuma Wanjiku',
    role: 'Carpenter & Fitter',
    category: 'Carpentry',
    rating: 4.6,
    reviews: 62,
    experience: '9 yrs',
    price: 'From KShs 1,200/day',
    location: 'Upperhill',
    tags: ['Door fitting', 'Wardrobes'],
    verified: true,
    isNew: false,
    color: 'amber',
  },
  {
    id: 7,
    initials: 'DN',
    name: 'David Njoroge',
    role: 'Painting Specialist',
    category: 'Painting',
    rating: 4.9,
    reviews: 98,
    experience: '11 yrs',
    price: 'From KShs 35/sq ft',
    location: 'Runda',
    tags: ['Interior', 'Exterior', 'Texture finish'],
    verified: true,
    isNew: false,
    color: 'purple',
  },
  {
    id: 8,
    initials: 'RK',
    name: 'Rose Kariuki',
    role: 'Painter',
    category: 'Painting',
    rating: 4.4,
    reviews: 41,
    experience: '5 yrs',
    price: 'From KShs 28/sq ft',
    location: 'Ngong Road',
    tags: ['Wall painting', 'Colour consult'],
    verified: true,
    isNew: false,
    color: 'purple',
  },
  {
    id: 9,
    initials: 'LO',
    name: 'Lucy Omondi',
    role: 'Cleaning Professional',
    category: 'Cleaning',
    rating: 5.0,
    reviews: 312,
    experience: '6 yrs',
    price: 'From KShs 2,500/session',
    location: 'CBD',
    tags: ['Deep clean', 'Move-in/out', 'Office clean'],
    verified: true,
    isNew: false,
    color: 'coral',
  },
  {
    id: 10,
    initials: 'BM',
    name: 'Brian Maina',
    role: 'Cleaning Specialist',
    category: 'Cleaning',
    rating: 4.7,
    reviews: 77,
    experience: '3 yrs',
    price: 'From KShs 1,800/session',
    location: 'Kileleshwa',
    tags: ['Carpet cleaning', 'Upholstery'],
    verified: true,
    isNew: false,
    color: 'coral',
  },
]

const avatarColors = {
  teal:   'bg-primary-subtle text-primary',
  blue:   'bg-accent-info/10 text-accent-info',
  amber:  'bg-accent-warm/10 text-accent-warm',
  purple: 'bg-purple-100 text-purple-800',
  coral:  'bg-red-50 text-red-700',
}

const StarRating = ({ rating }) => {
  const full = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  return (
    <span className="text-accent-warm text-sm">
      {'★'.repeat(full)}{hasHalf ? '½' : ''}{'☆'.repeat(5 - full - (hasHalf ? 1 : 0))}
    </span>
  )
}

const FundiCard = ({ fundi }) => (
  <div className="bg-white rounded-2xl border border-surface-border shadow-card p-5 flex flex-col gap-3 hover:shadow-teal transition-shadow duration-200">
    <div className="flex items-center gap-3">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0 ${avatarColors[fundi.color]}`}>
        {fundi.initials}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-text-primary">{fundi.name}</p>
          {fundi.isNew && (
            <span className="text-xs bg-accent-info/10 text-accent-info px-2 py-0.5 rounded-full">New</span>
          )}
        </div>
        <p className="text-xs text-text-secondary">{fundi.role}</p>
        {fundi.verified && (
          <span className="inline-flex items-center gap-1 text-xs bg-primary-subtle text-primary px-2 py-0.5 rounded-full mt-1">
            ✓ Verified
          </span>
        )}
      </div>
    </div>

    <div className="flex items-center gap-2">
      <StarRating rating={fundi.rating} />
      <span className="text-sm font-medium text-text-primary">{fundi.rating.toFixed(1)}</span>
      <span className="text-xs text-text-muted">({fundi.reviews} reviews)</span>
    </div>

    <div className="flex flex-wrap gap-1.5">
      {fundi.tags.map(tag => (
        <span key={tag} className="text-xs bg-background-section text-text-secondary border border-surface-border px-2.5 py-1 rounded-full">
          {tag}
        </span>
      ))}
      <span className="text-xs bg-background-section text-text-secondary border border-surface-border px-2.5 py-1 rounded-full">
        <FaMapPin size={7} /> {fundi.location}
      </span>
    </div>

    <div className="flex justify-between items-center text-xs text-text-muted border-t border-surface-border pt-3">
      <span>{fundi.experience} experience</span>
      <span className="text-primary font-medium text-sm">{fundi.price}</span>
    </div>

    <Link
      to={`/fundi/${fundi.id}`}
      className="block text-center bg-primary hover:bg-primary-dark text-white text-sm font-medium py-2.5 rounded-xl shadow-teal transition-colors duration-200"
    >
      Book {fundi.name.split(' ')[0]}
    </Link>
  </div>
)

const BrowseFundi = () => {
  // Pagination state
  const [visible, setVisible] = useState(6);
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = fundis.filter(f => {
    const matchCat = activeCategory === 'All' || f.category === activeCategory
    const matchSearch =
      search === '' ||
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.role.toLowerCase().includes(search.toLowerCase()) ||
      f.location.toLowerCase().includes(search.toLowerCase()) ||
      f.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    return matchCat && matchSearch
  })

  // Get current items to display based on pagination
  const displayedFundis = filtered.slice(0, visible)
  const hasMore = visible < filtered.length

  // Load more function
  const loadMore = () => {
    setVisible(prev => prev + 6)
  }

  // Reset pagination when category or search changes
  useEffect(() => {
    setVisible(6)
  }, [activeCategory, search])

  return (
    <section className="w-full bg-background-alt min-h-screen text-text-primary">

      {/* Hero */}
      <div className="bg-background-dark py-16 px-6 text-center">
        <p className="text-primary-glow text-sm font-semibold uppercase tracking-widest mb-2">
          Browse Fundis
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-text-inverse mb-3">
          Verified professionals in Nairobi
        </h2>
        <p className="text-text-muted max-w-lg mx-auto text-sm mb-8">
          Trusted talent, real reviews, and transparent pricing — find the right fundi in minutes.
        </p>
        <div className="flex gap-2 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Search by name, skill, or location..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200">
            Search
          </button>
        </div>
      </div>

      {/* Location bar */}
      <div className="bg-primary/10 border-y border-primary/20 py-2.5 px-6 text-center">
        <p className="text-sm text-primary font-medium">
          <FaMapPin className='inline-block'/> Showing fundis across Nairobi — Westlands, Karen, CBD, Kilimani & more
        </p>
      </div>

      {/* Category filter */}
      <div className="max-w-5xl mx-auto px-6 pt-6 pb-2">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium border transition-all duration-150 ${
                activeCategory === cat
                  ? 'bg-primary text-white border-primary shadow-teal'
                  : 'bg-white text-text-secondary border-surface-border hover:border-primary hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="max-w-5xl mx-auto px-6 py-3">
        <p className="text-sm text-text-muted">
          Showing {displayedFundis.length} out of {filtered.length} fundi{filtered.length !== 1 ? 's' : ''}
          {activeCategory !== 'All' ? ` in ${activeCategory}` : ' across all categories'}
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        {filtered.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayedFundis.map(fundi => (
                <FundiCard key={fundi.id} fundi={fundi} />
              ))}
            </div>

            {/* Load More button */}
            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={loadMore}
                  className="px-6 py-2.5 bg-white border border-primary text-primary hover:bg-primary hover:text-white rounded-xl text-sm font-medium transition-all duration-200"
                >
                  Load More ({filtered.length - visible} remaining)
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-text-primary font-medium mb-1">No fundis found</p>
            <p className="text-text-muted text-sm">Try a different search or category</p>
          </div>
        )}
      </div>

    </section>
  )
}

export default BrowseFundi
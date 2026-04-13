import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiPhone, FiBriefcase, FiArrowRight } from 'react-icons/fi';

const UnifiedSignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    role: 'customer', // Default role
    password: '',
    password2: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing again
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store tokens from your RegisterView response
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);

        // Logic-based redirect
        if (data.user.role === 'fundi') {
          navigate('/fundi/onboarding'); // Send to complete profile
        } else {
          navigate('/fundis'); // Send to browse
        }
      } else {
        setErrors(data); // Django returns errors like { "email": ["Already exists"] }
      }
    } catch (err) {
      setErrors({ non_field_errors: ["Server connection failed. Try again later."] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white/[0.03] border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-text-inverse">Join FundiConnect</h2>
          <p className="mt-2 text-text-muted">Create an account to get started</p>
        </div>

        {/* Role Switcher */}
        <div className="flex bg-black/20 p-1 rounded-2xl border border-white/5">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: 'customer' })}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              formData.role === 'customer' ? 'bg-primary-glow text-background-dark shadow-lg' : 'text-text-muted hover:text-text-inverse'
            }`}
          >
            I need a Service
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: 'fundi' })}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              formData.role === 'fundi' ? 'bg-primary-glow text-background-dark shadow-lg' : 'text-text-muted hover:text-text-inverse'
            }`}
          >
            I am a Fundi
          </button>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {/* Name Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-text-muted ml-1">First Name</label>
              <input name="first_name" type="text" required className="input-style" placeholder="John" onChange={handleChange} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-text-muted ml-1">Last Name</label>
              <input name="last_name" type="text" required className="input-style" placeholder="Doe" onChange={handleChange} />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-text-muted ml-1">Email Address</label>
              <input name="email" type="email" required className="input-style rounded-md" placeholder="john@example.com" onChange={handleChange} />
              {errors.email && <p className="text-accent-danger text-[10px] mt-1">{errors.email[0]}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-text-muted ml-1">Phone Number (M-Pesa)</label>
              <input name="phone" type="tel" required className="input-style" placeholder="0712345678" onChange={handleChange} />
              {errors.phone && <p className="text-accent-danger text-[10px] mt-1">{errors.phone[0]}</p>}
            </div>
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-text-muted ml-1">Password</label>
              <input name="password" type="password" required className="input-style" placeholder="••••••••" onChange={handleChange} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-text-muted ml-1">Confirm</label>
              <input name="password2" type="password" required className="input-style" placeholder="••••••••" onChange={handleChange} />
            </div>
          </div>
          {errors.password && <p className="text-accent-danger text-[10px]">{errors.password[0]}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary-glow to-primary-light text-background-dark font-bold hover:shadow-teal-lg transition-all flex items-center justify-center gap-2"
          >
            {loading ? "Creating Account..." : "Create Account"}
            <FiArrowRight />
          </button>
        </form>

        <p className="text-center text-sm text-text-muted">
          Already have an account? <Link to="/login" className="text-primary-light font-semibold">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default UnifiedSignUp;
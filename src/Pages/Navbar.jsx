import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoCloseSharp } from 'react-icons/io5';
import {
  FiBell, FiMessageSquare, FiChevronDown, FiLogOut,
  FiSettings, FiUser, FiBookOpen, FiDollarSign,
  FiShield, FiUsers, FiActivity, FiCheckSquare,
  FiHome, FiSearch, FiGrid,
} from 'react-icons/fi';
import { BsToggleOn, BsToggleOff } from 'react-icons/bs';
import { NAV_LINKS, DROPDOWNS, ROLE_THEMES } from '../components/NavConstants';
import { ProfileDropdown, AdminBadge, NotifBell } from '../components/NavComponents';
import { MobileBottomNav } from '../components/MobileBottomNav';

/* ─────────────────────────────────────────────────────────
   MOCK AUTH CONTEXT
   In production replace with: import { useAuth } from '@/context/AuthContext'
   Shape: { user: null | { name, initials, role:'guest'|'user'|'fundi'|'admin', avatar?, wallet? } }
───────────────────────────────────────────────────────── */
const MOCK_USERS = {
  guest:  null,
  user:   { name: 'Wanjiku M.', initials: 'WM', role: 'user',  wallet: 'KShs 2,450', notifications: 3, messages: 1, online: false },
  fundi:  { name: 'James Mwangi', initials: 'JM', role: 'fundi', wallet: 'KShs 14,800', notifications: 5, messages: 2, online: true },
  admin:  { name: 'Admin', initials: 'AD', role: 'admin', notifications: 12, online: false },
};

/* ── role badge colours ── */
const ROLE_BADGE = {
  user:  'bg-accent-info/15 text-accent-info border-accent-info/25',
  fundi: 'bg-primary/15 text-primary-glow border-primary-glow/25',
  admin: 'bg-accent-danger/15 text-accent-danger border-accent-danger/25',
};
const ROLE_AVATAR = {
  user:  'from-accent-info to-blue-400',
  fundi: 'from-primary to-primary-light',
  admin: 'from-accent-danger to-rose-400',
};

/* ════════════════════════════════════════════════════════
   MAIN NAVBAR
════════════════════════════════════════════════════════ */
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const location = useLocation();

  /* ── DEMO: swap this with real auth context ── */
  const [mockRole, setMockRole] = useState('guest'); // 'guest' | 'user' | 'fundi' | 'admin'
  const [user, setUser]         = useState(MOCK_USERS['guest']);
  const [fundiOnline, setFundiOnline] = useState(true);

  const switchRole = (role) => {
    const u = MOCK_USERS[role];
    setMockRole(role);
    setUser(u ? { ...u, online: role === 'fundi' ? fundiOnline : false } : null);
  };

  const links   = NAV_LINKS[mockRole] ?? NAV_LINKS.guest;
  const dropItems = mockRole === 'fundi' ? DROPDOWNS.fundi : mockRole === 'admin' ? DROPDOWNS.admin : DROPDOWNS.user;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    setUser(null);
    setMockRole('guest');
  };

  const toggleFundiOnline = async () => {
    if (!user) return;
    const newStatus = !user.online;
    
    try {
      const token = localStorage.getItem('access');
      
      const response = await fetch('http://127.0.0.1:8000/api/fundi/online/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ is_online: newStatus })
      });

      if (response.ok) {
        setUser(prev => ({ ...prev, online: newStatus }));
        setFundiOnline(newStatus);
      } else {
        console.error('Failed to update online status');
      }
    } catch (error) {
      console.error('Error updating online status:', error);
    }
  };

  return (
    <>
      {/* ── demo role switcher (remove in production) ── */}
      <div className="fixed bottom-4 right-4 z-[999] md:flex hidden items-center gap-2 bg-background-dark/90 border border-white/10 backdrop-blur-xl rounded-2xl px-4 py-2.5 shadow-2xl">
        <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold mr-1">Preview as:</span>
        {['guest','user','fundi','admin'].map(r => (
          <button
            key={r}
            onClick={() => switchRole(r)}
            className={`px-3 py-1 rounded-xl text-[11px] font-semibold transition-all capitalize ${
              mockRole === r
                ? 'bg-primary-glow text-[#0B0F1A]'
                : 'text-text-muted hover:text-text-inverse hover:bg-white/10'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* ════ DESKTOP NAVBAR ════ */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
          ${scrolled
            ? 'bg-background-dark/92 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/[0.06]'
            : 'bg-background-dark/70 backdrop-blur-md border-b border-white/[0.04]'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <img src="/assets/logo.png" alt="FundiConnect logo" className="w-7 h-7" onError={e => e.target.style.display='none'} />
            <div className="leading-none">
              <div className="text-[17px] font-bold text-text-inverse tracking-tight">
                <span className="text-primary-light">Fundi</span>Connect
              </div>
              <div className="text-[9px] text-text-inverse/35 uppercase tracking-[0.2em] font-normal">
                Trusted Service Providers
              </div>
            </div>
          </Link>

          {/* ── Centre Links ── */}
          <ul className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {links.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-150
                    ${location.pathname === to
                      ? 'text-primary-light bg-primary/20 border border-primary/30'
                      : 'text-text-inverse/65 hover:text-text-inverse hover:bg-white/[0.08]'
                    }`}
                >
                  {label}
                </Link>
              </li>
            ))}
            {/* Admin: show pending approvals count inline */}
            {mockRole === 'admin' && <li><AdminBadge count={3} /></li>}
          </ul>

          {/* ── Right Action Area ── */}
          <div className="hidden md:flex items-center gap-2 shrink-0">

            {/* GUEST */}
            {!user && (
              <>
                <Link to="/login"
                  className="px-4 py-1.5 rounded-xl text-sm font-medium text-text-inverse/75 border border-white/15 hover:bg-white/10 hover:border-white/25 transition-all duration-150">
                  Log in
                </Link>
                <Link to="/signup"
                  className="px-4 py-1.5 rounded-xl text-sm font-medium text-text-inverse/75 hover:text-text-inverse hover:bg-white/[0.08] transition-all duration-150">
                  Sign up
                </Link>
                <Link to="/become-a-fundi"
                  className="px-4 py-1.5 rounded-xl text-sm font-semibold text-background-dark bg-gradient-to-r from-primary-glow to-primary-light hover:from-primary-light hover:to-primary-glow shadow-teal transition-all duration-150 hover:-translate-y-0.5 hover:shadow-teal-lg">
                  Become a Fundi ✦
                </Link>
              </>
            )}

            {/* LOGGED USER */}
            {user?.role === 'user' && (
              <>
                <NotifBell count={user.notifications} />
                <button className="relative p-2 rounded-xl text-text-inverse/60 hover:text-text-inverse hover:bg-white/10 transition-all duration-150" aria-label="Messages">
                  <FiMessageSquare size={18} />
                  {user.messages > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary-glow text-[9px] font-bold text-background-dark flex items-center justify-center">{user.messages}</span>
                  )}
                </button>
                {/* upsell hook — logged users can still see this */}
                <Link to="/become-a-fundi"
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-primary-glow border border-primary-glow/25 hover:bg-primary-glow/10 transition-all duration-150">
                  Become a Fundi
                </Link>
                <ProfileDropdown user={user} items={DROPDOWNS.user} onLogout={handleLogout} ROLE_AVATAR={ROLE_AVATAR} ROLE_BADGE={ROLE_BADGE} />
              </>
            )}

            {/* LOGGED FUNDI */}
            {user?.role === 'fundi' && (
              <>
                <NotifBell count={user.notifications} />
                <button className="relative p-2 rounded-xl text-text-inverse/60 hover:text-text-inverse hover:bg-white/10 transition-all duration-150" aria-label="Messages">
                  <FiMessageSquare size={18} />
                  {user.messages > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary-glow text-[9px] font-bold text-background-dark flex items-center justify-center">{user.messages}</span>
                  )}
                </button>
                {/* inline online toggle in nav */}
                <button
                  onClick={toggleFundiOnline}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                    user.online
                      ? 'bg-accent-success/10 border-accent-success/25 text-accent-success hover:bg-accent-success/15'
                      : 'bg-white/[0.05] border-white/10 text-text-muted hover:border-white/20'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${user.online ? 'bg-accent-success animate-pulse' : 'bg-text-muted'}`} />
                  {user.online ? 'Online' : 'Go Online'}
                </button>
                <ProfileDropdown user={user} items={DROPDOWNS.fundi} onLogout={handleLogout} fundiOnlineToggle={toggleFundiOnline} ROLE_AVATAR={ROLE_AVATAR} ROLE_BADGE={ROLE_BADGE} />
              </>
            )}

            {/* ADMIN */}
            {user?.role === 'admin' && (
              <>
                <NotifBell count={user.notifications} />
                <Link to="/admin/logs"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-text-muted border border-white/10 hover:border-white/20 hover:text-text-inverse transition-all">
                  <FiActivity size={12} /> Logs
                </Link>
                <ProfileDropdown user={user} items={DROPDOWNS.admin} onLogout={handleLogout} ROLE_AVATAR={ROLE_AVATAR} ROLE_BADGE={ROLE_BADGE} />
              </>
            )}
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="md:hidden p-2 rounded-xl text-text-inverse/70 hover:text-text-inverse hover:bg-white/10 transition-all"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <IoCloseSharp size={22} /> : <GiHamburgerMenu size={22} />}
          </button>
        </div>
      </nav>

      {/* ════ MOBILE DRAWER ════ */}
      <div
        className={`fixed top-0 left-0 h-full w-[72%] max-w-[300px] z-40
          bg-background-dark/97 backdrop-blur-2xl border-r border-white/[0.07]
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="pt-20 px-5 pb-6 h-full flex flex-col">

          {/* user header in drawer */}
          {user ? (
            <div className="flex items-center gap-3 mb-6 p-3 rounded-2xl bg-white/[0.04] border border-white/[0.07]">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${ROLE_AVATAR[user.role]} flex items-center justify-center text-sm font-bold text-white shrink-0`}>
                {user.initials}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-text-inverse truncate">{user.name}</p>
                <span className={`inline-block text-[9px] font-bold uppercase tracking-wide border px-1.5 py-0.5 rounded-full ${ROLE_BADGE[user.role]}`}>
                  {user.role}
                </span>
              </div>
              {user.wallet && (
                <div className="ml-auto text-right shrink-0">
                  <p className="text-[9px] text-text-muted">Balance</p>
                  <p className="text-xs font-bold text-primary-glow">{user.wallet}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="mb-6 flex flex-col gap-2">
              <Link to="/login" onClick={() => setMobileOpen(false)}
                className="text-center py-2.5 rounded-xl text-sm font-medium text-text-inverse border border-white/15 hover:bg-white/10 transition-all">
                Log in
              </Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)}
                className="text-center py-2.5 rounded-xl text-sm font-semibold text-background-dark bg-gradient-to-r from-primary-glow to-primary-light shadow-teal transition-all">
                Sign up free
              </Link>
              <Link to="/become-a-fundi" onClick={() => setMobileOpen(false)}
                className="text-center py-2 rounded-xl text-xs font-semibold text-primary-glow border border-primary-glow/25 hover:bg-primary-glow/10 transition-all">
                Become a Fundi ✦
              </Link>
            </div>
          )}

          {/* fundi online toggle in mobile drawer */}
          {user?.role === 'fundi' && (
            <button onClick={toggleFundiOnline}
              className={`flex items-center justify-between mb-4 w-full px-4 py-3 rounded-xl border transition-all ${
                user.online ? 'bg-accent-success/10 border-accent-success/25' : 'bg-white/[0.04] border-white/[0.07]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${user.online ? 'bg-accent-success animate-pulse' : 'bg-text-muted'}`} />
                <span className={`text-sm font-semibold ${user.online ? 'text-accent-success' : 'text-text-muted'}`}>
                  {user.online ? 'You are Online' : 'You are Offline'}
                </span>
              </div>
              {user.online ? <BsToggleOn size={24} className="text-accent-success" /> : <BsToggleOff size={24} className="text-text-muted" />}
            </button>
          )}

          {/* nav links */}
          <ul className="flex flex-col gap-1 flex-1">
            {links.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all
                    ${location.pathname === to
                      ? 'text-primary-light bg-primary/20 border border-primary/25'
                      : 'text-text-inverse/65 hover:text-text-inverse hover:bg-white/[0.07]'
                    }`}
                >
                  {label}
                </Link>
              </li>
            ))}

            {/* extra items for logged users */}
            {user && dropItems && dropItems.map(item => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-text-inverse/55 hover:text-text-inverse hover:bg-white/[0.07] transition-all"
                >
                  <span className="text-text-inverse/30">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* bottom of drawer — logout */}
          {user && (
            <button
              onClick={() => { handleLogout(); setMobileOpen(false); }}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-accent-danger/70 hover:text-accent-danger hover:bg-accent-danger/[0.07] transition-all mt-4 border-t border-white/[0.06] pt-4"
            >
              <FiLogOut size={15} /> Sign out
            </button>
          )}
        </div>
      </div>

      {/* backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
        />
      )}

      {/* ════ MOBILE BOTTOM TAB BAR (user + fundi only) ════ */}
      <MobileBottomNav user={user} />
    </>
  );
};

export default Navbar;
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoCloseSharp } from 'react-icons/io5';
import { FiMessageSquare, FiLogOut, FiActivity } from 'react-icons/fi';
import { BsToggleOn, BsToggleOff } from 'react-icons/bs';
import { NAV_LINKS, DROPDOWNS } from '../components/NavConstants';
import { ProfileDropdown, AdminBadge, NotifBell } from '../components/NavComponents';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { useAuth } from '../Context/AuthContext'; 
import api from "../api/axios";
import logo from '../assets/logo.png';

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

const Navbar = () => {
  const { user, logoutUser } = useAuth(); 
  const location = useLocation();
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [liveData, setLiveData] = useState({
    wallet: '...',
    notifications: 0,
    messages: 0,
    online: user?.online || false
  });

  /* ── DEMO: role switcher (keep for preview) ── */
  const [mockRole, setMockRole] = useState('guest');
  const [mockUser, setMockUser] = useState(null);
  const [fundiOnline, setFundiOnline] = useState(true);

  // Sync real auth user with component state
  useEffect(() => {
    if (user) {
      const fetchNavbarData = async () => {
        try {
          const response = await api.get('user/nav-stats/');
          setLiveData({
            wallet: response.data.wallet_balance,
            notifications: response.data.unread_notifications,
            messages: response.data.unread_messages,
            online: response.data.is_online
          });
        } catch (err) {
          console.error("Could not fetch nav stats", err);
        }
      };
      fetchNavbarData();
    }
  }, [user]);

  // Handle Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchRole = (role) => {
    setMockRole(role);
    if (role === 'guest') {
      setMockUser(null);
    } else if (!user) {
      const mockUserData = {
        name: role === 'user' ? 'Wanjiku M.' : role === 'fundi' ? 'James Mwangi' : 'Admin',
        initials: role === 'user' ? 'WM' : role === 'fundi' ? 'JM' : 'AD',
        role: role,
        wallet: role === 'user' ? 'KShs 2,450' : role === 'fundi' ? 'KShs 14,800' : null,
        notifications: role === 'user' ? 3 : role === 'fundi' ? 5 : 12,
        messages: role === 'user' ? 1 : role === 'fundi' ? 2 : 0,
        online: role === 'fundi' ? fundiOnline : false,
      };
      setMockUser(mockUserData);
    }
  };

  const currentRole = user?.role || mockRole || 'guest';
  const displayUser = user || mockUser;
  const links = NAV_LINKS[currentRole] ?? NAV_LINKS.guest;
  const dropItems = DROPDOWNS[currentRole];

  const toggleFundiOnline = async () => {
    if (currentRole !== 'fundi') return;
    
    if (user) {
      // Real user - use API
      try {
        const newStatus = !liveData.online;
        await api.patch('fundi/online/', { is_online: newStatus });
        setLiveData(prev => ({ ...prev, online: newStatus }));
      } catch (error) {
        console.error('Status update failed', error);
      }
    } else {
      // Mock user
      const newStatus = !fundiOnline;
      setFundiOnline(newStatus);
      if (mockUser) {
        setMockUser(prev => ({ ...prev, online: newStatus }));
      }
    }
  };

  const handleLogout = () => {
    if (logoutUser) {
      logoutUser();
    }
    setMockUser(null);
    setMockRole('guest');
  };

  // Get display values (real or mock)
  const displayNotifications = user ? liveData.notifications : (displayUser?.notifications || 0);
  const displayMessages = user ? liveData.messages : (displayUser?.messages || 0);
  const displayWallet = user ? liveData.wallet : (displayUser?.wallet);
  const displayOnline = user ? liveData.online : (displayUser?.online || false);

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
              mockRole === r && !user
                ? 'bg-primary-glow text-[#0B0F1A]'
                : 'text-text-muted hover:text-text-inverse hover:bg-white/10'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* ════ DESKTOP NAVBAR ════ */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background-dark/92 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/[0.06]' 
          : 'bg-background-dark/70 backdrop-blur-md border-b border-white/[0.04]'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <img src={logo} alt="FundiConnect" className="w-7 h-7" onError={e => e.target.style.display='none'} />
            <div className="leading-none">
              <div className="text-[17px] font-bold text-text-inverse tracking-tight">
                <span className="text-primary-light">Fundi</span>Connect
              </div>
              <div className="text-[9px] text-text-inverse/35 uppercase tracking-[0.2em] font-normal">
                Trusted Service Providers
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {links && links.map(({ label, to }) => (
              <li key={to}>
                <Link to={to} className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  location.pathname === to 
                    ? 'text-primary-light bg-primary/20 border border-primary/30' 
                    : 'text-text-inverse/65 hover:text-text-inverse hover:bg-white/[0.08]'
                }`}>
                  {label}
                </Link>
              </li>
            ))}
            {currentRole === 'admin' && <li><AdminBadge count={3} /></li>}
          </ul>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {!displayUser ? (
              <>
                <Link to="/login" className="px-4 py-1.5 rounded-xl text-sm font-medium text-text-inverse/75 border border-white/15 hover:bg-white/10 hover:border-white/25 transition-all duration-150">
                  Log in
                </Link>
                <Link to="/signup" className="px-4 py-1.5 rounded-xl text-sm font-medium text-text-inverse/75 hover:text-text-inverse hover:bg-white/[0.08] transition-all duration-150">
                  Sign up
                </Link>
                <Link to="/become-a-fundi" className="px-4 py-1.5 rounded-xl text-sm font-semibold text-background-dark bg-gradient-to-r from-primary-glow to-primary-light hover:from-primary-light hover:to-primary-glow shadow-teal transition-all duration-150 hover:-translate-y-0.5 hover:shadow-teal-lg">
                  Become a Fundi ✦
                </Link>
              </>
            ) : (
              <>
                <NotifBell count={displayNotifications} />
                <button className="relative p-2 rounded-xl text-text-inverse/60 hover:text-text-inverse hover:bg-white/10 transition-all duration-150" aria-label="Messages">
                  <FiMessageSquare size={18} />
                  {displayMessages > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary-glow text-[9px] font-bold text-background-dark flex items-center justify-center">{displayMessages}</span>
                  )}
                </button>

                {currentRole === 'fundi' && (
                  <button onClick={toggleFundiOnline} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                    displayOnline 
                      ? 'bg-accent-success/10 border-accent-success/25 text-accent-success hover:bg-accent-success/15' 
                      : 'bg-white/[0.05] border-white/10 text-text-muted hover:border-white/20'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${displayOnline ? 'bg-accent-success animate-pulse' : 'bg-text-muted'}`} />
                    {displayOnline ? 'Online' : 'Go Online'}
                  </button>
                )}

                {currentRole === 'user' && (
                  <Link to="/become-a-fundi" className="px-3 py-1.5 rounded-xl text-xs font-semibold text-primary-glow border border-primary-glow/25 hover:bg-primary-glow/10 transition-all duration-150">
                    Become a Fundi
                  </Link>
                )}

                {currentRole === 'admin' && (
                  <Link to="/admin/logs" className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-text-muted border border-white/10 hover:border-white/20 hover:text-text-inverse transition-all">
                    <FiActivity size={12} /> Logs
                  </Link>
                )}

                <ProfileDropdown 
                  user={{
                    ...displayUser,
                    wallet: displayWallet,
                    notifications: displayNotifications,
                    messages: displayMessages,
                    online: displayOnline
                  }} 
                  items={dropItems} 
                  onLogout={handleLogout}
                  fundiOnlineToggle={currentRole === 'fundi' ? toggleFundiOnline : null}
                  ROLE_AVATAR={ROLE_AVATAR} 
                  ROLE_BADGE={ROLE_BADGE} 
                />
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-xl text-text-inverse/70 hover:text-text-inverse hover:bg-white/10 transition-all" aria-label="Toggle menu">
            {mobileOpen ? <IoCloseSharp size={22} /> : <GiHamburgerMenu size={22} />}
          </button>
        </div>
      </nav>

      {/* ════ MOBILE DRAWER ════ */}
      <div className={`fixed top-0 left-0 h-full w-[72%] max-w-[300px] z-40 bg-background-dark/97 backdrop-blur-2xl border-r border-white/[0.07] transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="pt-20 px-5 pb-6 h-full flex flex-col">

          {/* user header in drawer */}
          {displayUser ? (
            <div className="flex items-center gap-3 mb-6 p-3 rounded-2xl bg-white/[0.04] border border-white/[0.07]">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${ROLE_AVATAR[displayUser.role]} flex items-center justify-center text-sm font-bold text-white shrink-0`}>
                {displayUser.initials || displayUser.name?.charAt(0) || 'U'}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-text-inverse truncate">{displayUser.name}</p>
                <span className={`inline-block text-[9px] font-bold uppercase tracking-wide border px-1.5 py-0.5 rounded-full ${ROLE_BADGE[displayUser.role]}`}>
                  {displayUser.role}
                </span>
              </div>
              {displayWallet && (
                <div className="ml-auto text-right shrink-0">
                  <p className="text-[9px] text-text-muted">Balance</p>
                  <p className="text-xs font-bold text-primary-glow">{displayWallet}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="mb-6 flex flex-col gap-2">
              <Link to="/login" onClick={() => setMobileOpen(false)} className="text-center py-2.5 rounded-xl text-sm font-medium text-text-inverse border border-white/15 hover:bg-white/10 transition-all">
                Log in
              </Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)} className="text-center py-2.5 rounded-xl text-sm font-semibold text-background-dark bg-gradient-to-r from-primary-glow to-primary-light shadow-teal transition-all">
                Sign up free
              </Link>
              <Link to="/become-a-fundi" onClick={() => setMobileOpen(false)} className="text-center py-2 rounded-xl text-xs font-semibold text-primary-glow border border-primary-glow/25 hover:bg-primary-glow/10 transition-all">
                Become a Fundi ✦
              </Link>
            </div>
          )}

          {/* fundi online toggle in mobile drawer */}
          {currentRole === 'fundi' && (
            <button onClick={toggleFundiOnline} className={`flex items-center justify-between mb-4 w-full px-4 py-3 rounded-xl border transition-all ${
              displayOnline ? 'bg-accent-success/10 border-accent-success/25' : 'bg-white/[0.04] border-white/[0.07]'
            }`}>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${displayOnline ? 'bg-accent-success animate-pulse' : 'bg-text-muted'}`} />
                <span className={`text-sm font-semibold ${displayOnline ? 'text-accent-success' : 'text-text-muted'}`}>
                  {displayOnline ? 'You are Online' : 'You are Offline'}
                </span>
              </div>
              {displayOnline ? <BsToggleOn size={24} className="text-accent-success" /> : <BsToggleOff size={24} className="text-text-muted" />}
            </button>
          )}

          {/* nav links */}
          <ul className="flex flex-col gap-1 flex-1">
            {links && links.map(({ label, to }) => (
              <li key={to}>
                <Link to={to} onClick={() => setMobileOpen(false)} className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  location.pathname === to 
                    ? 'text-primary-light bg-primary/20 border border-primary/25' 
                    : 'text-text-inverse/65 hover:text-text-inverse hover:bg-white/[0.07]'
                }`}>
                  {label}
                </Link>
              </li>
            ))}

            {/* extra items for logged users */}
            {displayUser && dropItems && dropItems.map(item => (
              <li key={item.to}>
                <Link to={item.to} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-text-inverse/55 hover:text-text-inverse hover:bg-white/[0.07] transition-all">
                  <span className="text-text-inverse/30">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* bottom of drawer — logout */}
          {displayUser && (
            <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-accent-danger/70 hover:text-accent-danger hover:bg-accent-danger/[0.07] transition-all mt-4 border-t border-white/[0.06] pt-4">
              <FiLogOut size={15} /> Sign out
            </button>
          )}
        </div>
      </div>

      {/* backdrop */}
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)} className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden" />
      )}

      {/* ════ MOBILE BOTTOM TAB BAR (user + fundi only) ════ */}
      <MobileBottomNav user={displayUser} />
    </>
  );
};

export default Navbar;
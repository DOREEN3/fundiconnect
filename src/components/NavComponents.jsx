import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiLogOut } from 'react-icons/fi';
import { BsToggleOn, BsToggleOff } from 'react-icons/bs';
import { FiCheckSquare, FiBell } from 'react-icons/fi';

/* ════════════════════════════════════════════════════════
   PROFILE DROPDOWN
════════════════════════════════════════════════════════ */
export function ProfileDropdown({ user, items, onLogout, fundiOnlineToggle, ROLE_AVATAR, ROLE_BADGE }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-150 group"
        aria-haspopup="true" aria-expanded={open}
      >
        {/* avatar */}
        <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${ROLE_AVATAR[user.role]} flex items-center justify-center text-[11px] font-bold text-white shrink-0`}>
          {user.initials}
        </div>
        <span className="text-sm font-medium text-text-inverse/85 max-w-[100px] truncate hidden lg:block">
          {user.name.split(' ')[0]}
        </span>
        <FiChevronDown size={13} className={`text-text-inverse/40 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* dropdown panel */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-background-dark/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden z-50 animate-fade-up">

          {/* header */}
          <div className="px-4 py-4 border-b border-white/[0.07]">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${ROLE_AVATAR[user.role]} flex items-center justify-center text-sm font-bold text-white shrink-0`}>
                {user.initials}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-text-inverse truncate">{user.name}</p>
                <span className={`inline-block text-[10px] font-bold uppercase tracking-wide border px-2 py-0.5 rounded-full mt-0.5 ${ROLE_BADGE[user.role]}`}>
                  {user.role}
                </span>
              </div>
            </div>

            {/* wallet balance — trust builder for Kenyan market */}
            {user.wallet && (
              <div className="mt-3 flex items-center justify-between bg-white/[0.04] border border-white/[0.07] rounded-xl px-3 py-2">
                <span className="text-[11px] text-text-muted font-medium">
                  {user.role === 'fundi' ? 'Earnings Balance' : 'Wallet'}
                </span>
                <span className="text-sm font-bold text-primary-glow">{user.wallet}</span>
              </div>
            )}

            {/* fundi online toggle */}
            {user.role === 'fundi' && fundiOnlineToggle && (
              <button
                onClick={fundiOnlineToggle}
                className="mt-2 w-full flex items-center justify-between bg-white/[0.04] border border-white/[0.07] rounded-xl px-3 py-2 hover:border-primary-glow/30 transition-all"
              >
                <span className="text-[11px] text-text-muted font-medium">Availability</span>
                <div className="flex items-center gap-1.5">
                  <span className={`text-[11px] font-bold ${user.online ? 'text-accent-success' : 'text-text-muted'}`}>
                    {user.online ? 'Online' : 'Offline'}
                  </span>
                  {user.online
                    ? <BsToggleOn size={22} className="text-accent-success" />
                    : <BsToggleOff size={22} className="text-text-muted" />
                  }
                </div>
              </button>
            )}
          </div>

          {/* links */}
          <div className="py-2">
            {items && items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-inverse/70 hover:text-text-inverse hover:bg-white/[0.06] transition-all duration-150"
              >
                <span className="text-text-inverse/40">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>

          {/* logout */}
          <div className="border-t border-white/[0.07] py-2">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-accent-danger/80 hover:text-accent-danger hover:bg-accent-danger/[0.06] transition-all duration-150"
            >
              <FiLogOut size={14} />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   ADMIN APPROVAL BADGE (shows pending count)
════════════════════════════════════════════════════════ */
export function AdminBadge({ count }) {
  return (
    <Link to="/admin/approvals"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent-danger/10 border border-accent-danger/20 text-accent-danger text-xs font-semibold hover:bg-accent-danger/15 transition-all"
    >
      <FiCheckSquare size={13} />
      {count} Pending
    </Link>
  );
}

/* ════════════════════════════════════════════════════════
   NOTIFICATION BELL
════════════════════════════════════════════════════════ */
export function NotifBell({ count }) {
  return (
    <button className="relative p-2 rounded-xl text-text-inverse/60 hover:text-text-inverse hover:bg-white/10 transition-all duration-150" aria-label="Notifications">
      <FiBell size={18} />
      {count > 0 && (
        <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-accent-danger text-[9px] font-bold text-white flex items-center justify-center leading-none">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </button>
  );
}


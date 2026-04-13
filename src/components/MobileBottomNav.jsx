import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiBookOpen, FiDollarSign, FiUser, FiSearch } from 'react-icons/fi';

export function MobileBottomNav({ user }) {
  const location = useLocation();
  if (!user || user.role === 'admin') return null;

  const tabs = user.role === 'fundi'
    ? [
        { icon: <FiHome size={20}/>,    label: 'Home',     to: '/' },
        { icon: <FiBookOpen size={20}/>,label: 'My Jobs',  to: '/fundi/jobs' },
        { icon: <FiDollarSign size={20}/>,label:'Earnings', to: '/fundi/earnings' },
        { icon: <FiUser size={20}/>,    label: 'Profile',  to: '/fundi/profile' },
      ]
    : [
        { icon: <FiHome size={20}/>,    label: 'Home',     to: '/' },
        { icon: <FiSearch size={20}/>,  label: 'Browse',   to: '/fundis' },
        { icon: <FiBookOpen size={20}/>,label: 'Bookings', to: '/bookings' },
        { icon: <FiUser size={20}/>,    label: 'Profile',  to: '/profile' },
      ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background-dark/95 backdrop-blur-xl border-t border-white/[0.08] safe-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map(tab => {
          const active = location.pathname === tab.to;
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all duration-150 ${
                active
                  ? 'text-primary-glow'
                  : 'text-text-inverse/40 hover:text-text-inverse/70'
              }`}
            >
              <div className={`relative ${active ? 'scale-110' : ''} transition-transform duration-150`}>
                {tab.icon}
                {active && (
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-glow" />
                )}
              </div>
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
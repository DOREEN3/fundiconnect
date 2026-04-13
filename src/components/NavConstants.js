// src/components/layout/Navbar/NavConstants.js
import { 
  FiUser, FiBookOpen, FiDollarSign, FiSettings, 
  FiGrid, FiUsers, FiActivity, FiCheckSquare 
} from 'react-icons/fi';

export const NAV_LINKS = {
  guest: [
    { label: 'Browse Fundis', to: '/fundis' },
    { label: 'How it Works', to: '/how-it-works' },
    { label: 'Pricing', to: '/pricing' },
  ],
  user: [
    { label: 'Browse Fundis', to: '/fundis' },
    { label: 'My Bookings', to: '/bookings' },
    { label: 'How it Works', to: '/how-it-works' },
  ],
  fundi: [
    { label: 'Dashboard', to: '/fundi/dashboard' },
    { label: 'My Jobs', to: '/fundi/jobs' },
    { label: 'Reviews', to: '/fundi/reviews' },
  ],
  admin: [
    { label: 'Overview', to: '/admin' },
    { label: 'Users', to: '/admin/users' },
    { label: 'Fundis', to: '/admin/fundis' },
    { label: 'Approvals', to: '/admin/approvals' },
  ],
};

export const DROPDOWNS = {
  user: [
    { icon: <FiUser size={14}/>, label: 'My Profile', to: '/profile' },
    { icon: <FiBookOpen size={14}/>, label: 'My Bookings', to: '/bookings' },
    { icon: <FiSettings size={14}/>, label: 'Settings', to: '/settings' },
  ],
  fundi: [
    { icon: <FiUser size={14}/>, label: 'My Profile', to: '/fundi/profile' },
    { icon: <FiDollarSign size={14}/>, label: 'Earnings', to: '/fundi/earnings' },
    { icon: <FiSettings size={14}/>, label: 'Pro Settings', to: '/fundi/settings' },
  ],
  admin: [
    { icon: <FiGrid size={14}/>, label: 'Dashboard', to: '/admin' },
    { icon: <FiUsers size={14}/>, label: 'User Management', to: '/admin/users' },
    { icon: <FiCheckSquare size={14}/>, label: 'Approvals', to: '/admin/approvals' },
  ],
};

export const ROLE_THEMES = {
  user: { badge: 'bg-accent-info/15 text-accent-info border-accent-info/25', avatar: 'from-accent-info to-blue-400' },
  fundi: { badge: 'bg-primary/15 text-primary-glow border-primary-glow/25', avatar: 'from-primary to-primary-light' },
  admin: { badge: 'bg-accent-danger/15 text-accent-danger border-accent-danger/25', avatar: 'from-accent-danger to-rose-400' },
};
import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { MaxfiitButton } from '../common/MaxfiitButton';
import { 
  Building2, 
  MapPin, 
  Shield, 
  Bell, 
  Check, 
  ChevronDown, 
  QrCode,
  ArrowRight,
  Menu,
  X,
  ExternalLink,
  Instagram,
  ArrowLeft
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenQRKiosk: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, onOpenQRKiosk }) => {
  const { 
    activeBranchId, 
    setActiveBranchId, 
    activeRole, 
    setActiveRole, 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead 
  } = useGym();

  const [showBranchMenu, setShowBranchMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const roles = [
    { name: 'Owner', desc: 'Consolidated access for all locations and finances' },
    { name: 'Branch Manager', desc: 'Local branch shift scheduling and approvals' },
    { name: 'Receptionist', desc: 'Front desk enrollment and access turnstiles' },
    { name: 'Trainer', desc: 'Personal training sessions and client logs' },
    { name: 'Doctor', desc: 'Sports physician and medical assessments' },
    { name: 'Accountant', desc: 'Expense tracking, payouts and ledgers' },
  ];

  const operationalNavItems = [
    { id: 'overview', label: 'Dashboard', icon: '📊' },
    { id: 'members', label: 'Members', icon: '👥' },
    { id: 'workforce', label: 'Workforce', icon: '💼' },
    { id: 'attendance', label: 'Turnstiles & Gates', icon: '⏱️' },
    { id: 'shifts', label: 'Shifts & Leaves', icon: '📅' },
    { id: 'professionals', label: 'Trainers & Doctors', icon: '🩺' },
    { id: 'finance', label: 'Finances & P&L', icon: '💰' },
    { id: 'branches', label: 'Locations', icon: '📍' },
    { id: 'reports', label: 'Reports', icon: '📈' },
    { id: 'admin', label: 'Settings', icon: '⚙️' },
  ];

  const customerNavLinks = [
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Disciplines', href: '#disciplines' },
    { label: '3D Anatomy', href: '#anatomy' },
    { label: 'Sanctuaries', href: '#sanctuaries' },
    { label: 'Lookbook', href: '#lookbook' },
    { label: 'Membership', href: '#membership' },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    if (currentTab !== 'customer') {
      setCurrentTab('customer');
      setTimeout(() => {
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // --------------------------------------------------------------------------
  // 1. CUSTOMER BRAND NAVBAR (Ultra Luxury, Editorial, Inspired by Anovi)
  // --------------------------------------------------------------------------
  if (currentTab === 'customer') {
    return (
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#e4e7eb] select-none transition-all duration-300">
        
        {/* Subtle Luxury Top Bar */}
        <div className="bg-[#131313] text-white text-[10px] sm:text-[11px] font-montserrat tracking-widest px-4 py-1.5 uppercase">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ddca24] animate-pulse" />
              <span className="font-semibold text-white">MOVEMENTOR</span>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-300 hidden sm:inline">MUMBAI’S ATHLETIC PERFORMANCE & SPORTS SCIENCE SANCTUARY</span>
              <span className="text-neutral-300 sm:hidden">MUMBAI SANCTUARY</span>
            </div>

            <a
              href="https://www.instagram.com/official_movementor?rpxt=MzByeG9heGIxZGhw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 text-[#ddca24] hover:text-white transition-colors"
            >
              <Instagram className="w-3 h-3" />
              <span>@OFFICIAL_MOVEMENTOR</span>
            </a>
          </div>
        </div>

        {/* Main Customer Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Left: Clean Editorial Nav Links (Desktop) */}
            <nav className="hidden lg:flex items-center space-x-7">
              {customerNavLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="font-montserrat text-xs tracking-wider uppercase text-neutral-600 hover:text-[#131313] transition-colors relative py-1 group"
                >
                  <span>{link.label}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#ddca24] group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </nav>

            {/* Center: Iconic Luxury Brandmark */}
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="flex items-center space-x-2">
                <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-normal text-[#131313] group-hover:text-[#ddca24] transition-colors">
                  MOVEMENTOR
                </span>
              </div>
              <span className="font-montserrat text-[8px] sm:text-[9px] tracking-[0.3em] uppercase text-neutral-500 -mt-0.5">
                Strength & Conditioning Academy
              </span>
            </div>

            {/* Right: Operations Switcher & Book CTA */}
            <div className="flex items-center space-x-3">
              
              {/* Subtle Operations Portal Switcher */}
              <button
                onClick={() => setCurrentTab('overview')}
                className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-[2px] border border-neutral-300 hover:border-[#131313] text-neutral-700 hover:text-[#131313] text-xs font-montserrat tracking-wider uppercase transition-colors"
                title="Open Management & Operations Portal"
              >
                <span>Operations</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              {/* Book Assessment Gold Button */}
              <button
                onClick={() => {
                  const event = new CustomEvent('open-inquiry-modal', { detail: { plan: 'Complimentary Movement Assessment' } });
                  window.dispatchEvent(event);
                }}
                className="px-4 sm:px-5 py-2 sm:py-2.5 bg-[#ddca24] hover:bg-[#131313] text-[#131313] hover:text-white font-montserrat font-bold text-xs tracking-wider uppercase rounded-[2px] transition-all duration-300 shadow-sm"
              >
                Book Visit
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-neutral-800 hover:text-black rounded"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200 bg-white px-4 py-6 space-y-4 shadow-xl">
            <div className="space-y-3">
              {customerNavLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="block w-full text-left font-montserrat text-sm tracking-wider uppercase text-neutral-800 py-1.5 border-b border-neutral-100"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-4 space-y-2.5">
              <button
                onClick={() => {
                  setCurrentTab('overview');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 text-center bg-neutral-900 text-white text-xs font-montserrat uppercase tracking-wider rounded-[2px]"
              >
                Enter Operations & Management Portal →
              </button>
              <a
                href="https://www.instagram.com/official_movementor?rpxt=MzByeG9heGIxZGhw"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 text-center border border-neutral-300 text-neutral-800 text-xs font-montserrat uppercase tracking-wider rounded-[2px] flex items-center justify-center space-x-2"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Visit Instagram @official_movementor</span>
              </a>
            </div>
          </div>
        )}

      </header>
    );
  }

  // --------------------------------------------------------------------------
  // 2. OPERATIONS & OWNER MANAGEMENT NAVBAR
  // --------------------------------------------------------------------------
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#e4e7eb] shadow-sm select-none">
      
      {/* Top Operations Header */}
      <div className="bg-[#131313] text-white text-[11px] px-4 py-1.5 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCurrentTab('customer')}
              className="inline-flex items-center space-x-1.5 text-[#ddca24] hover:text-white font-montserrat font-bold uppercase tracking-wider text-[10px] bg-neutral-800 px-2 py-0.5 rounded-[2px] transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>← Back to Customer Website</span>
            </button>
            <span className="text-neutral-500 hidden sm:inline">•</span>
            <span className="text-neutral-300 font-mono text-[10px] hidden sm:inline">
              Operations Hub: <strong>Bandra & Worli Seaface</strong>
            </span>
          </div>

          <div className="flex items-center space-x-3 text-neutral-400 font-mono text-[10px]">
            <span>Role: <strong className="text-white uppercase">{activeRole}</strong></span>
          </div>
        </div>
      </div>

      {/* Main Operations Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          <div className="flex items-center space-x-4">
            <div 
              onClick={() => setCurrentTab('customer')}
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <div className="w-7 h-7 rounded-[2px] bg-[#131313] text-[#ddca24] flex items-center justify-center font-heading font-black text-xs">
                MV
              </div>
              <span className="font-heading font-black text-lg text-[#131313] uppercase tracking-wide">
                MOVEMENTOR OPERATIONS
              </span>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* QR Turnstile */}
            <MaxfiitButton
              onClick={onOpenQRKiosk}
              variant="primary"
              className="py-1.5 px-3 text-xs"
            >
              <span className="flex items-center space-x-1.5">
                <QrCode className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Simulate Gate Pass</span>
              </span>
            </MaxfiitButton>

            {/* Branch Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowBranchMenu(!showBranchMenu);
                  setShowRoleMenu(false);
                }}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-[#e4e7eb] rounded-[2px] text-xs font-semibold text-[#131313]"
              >
                <MapPin className="w-3.5 h-3.5 text-[#131313]" />
                <span>
                  {activeBranchId === 'all' ? 'All Mumbai' : activeBranchId === 'gym-a' ? 'Bandra' : 'Worli'}
                </span>
                <ChevronDown className="w-3 h-3 text-[#667085]" />
              </button>

              {showBranchMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-[#e4e7eb] rounded-[3px] shadow-2xl p-1 z-50 text-xs">
                  {[
                    { id: 'all', name: 'All Mumbai Network' },
                    { id: 'gym-a', name: 'Bandra West Flagship' },
                    { id: 'gym-b', name: 'Worli Seaface Club' },
                  ].map(b => (
                    <button
                      key={b.id}
                      onClick={() => {
                        setActiveBranchId(b.id as any);
                        setShowBranchMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-[2px] ${
                        activeBranchId === b.id ? 'bg-[#131313] text-[#ddca24] font-bold' : 'hover:bg-neutral-50'
                      }`}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Role Selector */}
            <div className="relative hidden md:block">
              <button
                onClick={() => {
                  setShowRoleMenu(!showRoleMenu);
                  setShowBranchMenu(false);
                }}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-[#e4e7eb] rounded-[2px] text-xs font-semibold text-[#131313]"
              >
                <Shield className="w-3.5 h-3.5 text-[#667085]" />
                <span>{activeRole}</span>
                <ChevronDown className="w-3 h-3 text-[#667085]" />
              </button>

              {showRoleMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-[#e4e7eb] rounded-[3px] shadow-2xl p-1 z-50 text-xs">
                  {roles.map(r => (
                    <button
                      key={r.name}
                      onClick={() => {
                        setActiveRole(r.name as any);
                        setShowRoleMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-[2px] ${
                        activeRole === r.name ? 'bg-[#131313] text-[#ddca24] font-bold' : 'hover:bg-neutral-50'
                      }`}
                    >
                      {r.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Operational Module Tabs */}
      <div className="border-t border-neutral-200 bg-neutral-50 px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center space-x-1 py-1 min-w-max">
          {operationalNavItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-1.5 rounded-[2px] text-xs font-heading font-black tracking-wide uppercase transition-colors flex items-center space-x-1.5 ${
                currentTab === item.id
                  ? 'bg-[#131313] text-[#ddca24]'
                  : 'text-[#667085] hover:text-[#131313]'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

    </header>
  );
};

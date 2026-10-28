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
  Globe,
  Flame,
  ArrowRight,
  Menu,
  X,
  Sparkles,
  ExternalLink
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

  const navItems = [
    { id: 'customer', label: '⭐ Customer Home (3D Skeleton)', icon: '⭐' },
    { id: 'overview', label: 'Owner Dashboard', icon: '📊' },
    { id: 'members', label: 'Members', icon: '👥' },
    { id: 'workforce', label: 'Workforce', icon: '💼' },
    { id: 'attendance', label: 'Attendance & Gates', icon: '⏱️' },
    { id: 'shifts', label: 'Shifts & Leaves', icon: '📅' },
    { id: 'professionals', label: 'Trainers & Doctors', icon: '🩺' },
    { id: 'finance', label: 'Finances & P&L', icon: '💰' },
    { id: 'branches', label: 'Locations', icon: '📍' },
    { id: 'reports', label: 'Reports', icon: '📈' },
    { id: 'privacy', label: 'Privacy & Terms', icon: '🛡️' },
    { id: 'admin', label: 'Settings & Audit', icon: '⚙️' },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#e4e7eb] shadow-sm select-none">
      
      {/* Top Telemetry / Status Bar */}
      <div className="bg-[#131313] text-white text-[11px] px-4 py-1.5 hidden md:block border-b border-neutral-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5 font-bold font-heading uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#ddca24] animate-pulse" />
              <span className="text-[#ddca24]">MOVEMENTOR MUMBAI:</span>
              <span className="text-white">Bandra West & Worli Seaface</span>
            </span>
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-300 font-mono text-[10px]">
              Connected Domain: <strong className="text-white">app.movementor.in</strong>
            </span>
          </div>
          
          <div className="flex items-center space-x-3 text-neutral-400 font-mono text-[10px]">
            <span>Hardware Turnstiles: <strong className="text-[#ddca24]">Active (12ms latency)</strong></span>
            <span>•</span>
            <span>Role: <strong className="text-white uppercase">{activeRole}</strong></span>
          </div>
        </div>
      </div>

      {/* Primary Brand & Global Action Controls Row */}
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-1.5 sm:gap-3 min-w-0">
          
          {/* Left: Brand Identity & Customer View Switcher */}
          <div className="flex items-center space-x-2 sm:space-x-5 min-w-0">
            <div 
              onClick={() => setCurrentTab('customer')}
              className="flex items-center space-x-2 cursor-pointer group min-w-0"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-[3px] bg-[#131313] text-[#ddca24] flex items-center justify-center font-heading font-black text-xs sm:text-sm shadow-sm group-hover:bg-[#ddca24] group-hover:text-[#131313] transition-colors shrink-0">
                MV
              </div>
              <div className="min-w-0">
                <span className="font-heading font-black text-base sm:text-2xl tracking-tight text-[#131313] block leading-none truncate">
                  MOVEMENTOR
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#667085] font-bold hidden sm:block">
                  ATHLETIC PERFORMANCE & CLINICAL LAB
                </span>
              </div>
            </div>

            {/* Quick Customer vs Operations Switcher Pill */}
            <div className="hidden lg:flex items-center p-0.5 bg-neutral-100 rounded-[3px] text-[11px] font-heading font-black uppercase tracking-wider shrink-0">
              <button
                onClick={() => setCurrentTab('customer')}
                className={`px-2.5 py-1 rounded-[2px] transition-all ${
                  currentTab === 'customer'
                    ? 'bg-[#131313] text-[#ddca24] shadow-sm'
                    : 'text-[#667085] hover:text-[#131313]'
                }`}
              >
                ★ Customer Website (3D)
              </button>
              <button
                onClick={() => setCurrentTab('overview')}
                className={`px-2.5 py-1 rounded-[2px] transition-all ${
                  currentTab !== 'customer'
                    ? 'bg-[#131313] text-[#ddca24] shadow-sm'
                    : 'text-[#667085] hover:text-[#131313]'
                }`}
              >
                ⚡ Operations Portal
              </button>
            </div>
          </div>

          {/* Right: Operational Controls (Never collides because navigation tabs are in Row 2 below!) */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
            
            {/* QR Turnstile Optical Scanner Button */}
            <MaxfiitButton
              onClick={onOpenQRKiosk}
              variant="primary"
              className="py-1.5 px-2 sm:py-2 sm:px-3 text-xs shrink-0"
            >
              <span className="flex items-center space-x-1 sm:space-x-1.5">
                <QrCode className="w-3.5 h-3.5" />
                <span className="hidden md:inline">QR Turnstile</span>
                <span className="hidden xs:inline md:hidden">Gate</span>
              </span>
            </MaxfiitButton>

            {/* Branch Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowBranchMenu(!showBranchMenu);
                  setShowRoleMenu(false);
                  setShowNotifPanel(false);
                }}
                className="flex items-center space-x-1 sm:space-x-1.5 px-2 sm:px-3 py-1.5 sm:py-2 bg-white border border-[#e4e7eb] rounded-[3px] text-xs text-[#131313] hover:border-[#131313] transition-colors shadow-sm"
              >
                <MapPin className="w-3.5 h-3.5 text-[#131313] shrink-0" />
                <span className="font-bold text-xs truncate max-w-[65px] sm:max-w-[130px]">
                  {activeBranchId === 'all'
                    ? 'Mumbai'
                    : activeBranchId === 'gym-a'
                    ? 'Bandra'
                    : 'Worli'}
                </span>
                <ChevronDown className="w-3 h-3 text-[#667085] shrink-0" />
              </button>

              {showBranchMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-[#e4e7eb] rounded-[4px] shadow-2xl p-1 z-50">
                  <div className="px-3 py-2 text-[10px] uppercase font-bold tracking-wider text-[#667085] border-b border-neutral-100 font-mono">
                    Select Operating Facility
                  </div>
                  {[
                    { id: 'all', name: 'All Locations (Mumbai Network)', note: 'Bandra West & Worli Seaface' },
                    { id: 'gym-a', name: 'Bandra West Flagship', note: 'Plot 42, Waterfield Road' },
                    { id: 'gym-b', name: 'Worli Seaface Club', note: 'Horizon Commercial, Level 14' },
                  ].map(b => (
                    <button
                      key={b.id}
                      onClick={() => {
                        setActiveBranchId(b.id as any);
                        setShowBranchMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 text-left text-xs transition-colors rounded-[2px] ${
                        activeBranchId === b.id
                          ? 'bg-[#131313] text-[#ddca24] font-bold'
                          : 'text-[#131313] hover:bg-neutral-50'
                      }`}
                    >
                      <div>
                        <div className="font-heading font-black uppercase text-xs">{b.name}</div>
                        <div className="text-[10px] text-neutral-400">{b.note}</div>
                      </div>
                      {activeBranchId === b.id && <Check className="w-4 h-4 text-[#ddca24]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Persona Switcher Dropdown */}
            <div className="relative hidden md:block">
              <button
                onClick={() => {
                  setShowRoleMenu(!showRoleMenu);
                  setShowBranchMenu(false);
                  setShowNotifPanel(false);
                }}
                className="flex items-center space-x-1.5 px-3 py-2 bg-white border border-[#e4e7eb] rounded-[3px] text-xs text-[#131313] hover:border-[#131313] transition-colors shadow-sm"
              >
                <Shield className="w-3.5 h-3.5 text-[#667085]" />
                <span className="font-semibold text-xs">{activeRole}</span>
                <ChevronDown className="w-3 h-3 text-[#667085]" />
              </button>

              {showRoleMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-[#e4e7eb] rounded-[4px] shadow-2xl p-1 z-50">
                  <div className="px-3 py-2 text-[10px] uppercase font-bold tracking-wider text-[#667085] border-b border-neutral-100 font-mono">
                    Switch Access Role
                  </div>
                  {roles.map(r => (
                    <button
                      key={r.name}
                      onClick={() => {
                        setActiveRole(r.name as any);
                        setShowRoleMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 text-left text-xs transition-colors rounded-[2px] ${
                        activeRole === r.name
                          ? 'bg-[#131313] text-[#ddca24] font-bold'
                          : 'text-[#131313] hover:bg-neutral-50'
                      }`}
                    >
                      <div>
                        <div className="font-heading font-black uppercase text-xs">{r.name}</div>
                        <div className="text-[10px] text-neutral-400">{r.desc}</div>
                      </div>
                      {activeRole === r.name && <Check className="w-4 h-4 text-[#ddca24]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifPanel(!showNotifPanel);
                  setShowBranchMenu(false);
                  setShowRoleMenu(false);
                }}
                className="relative p-2 bg-white border border-[#e4e7eb] rounded-[3px] text-[#667085] hover:text-[#131313] shadow-sm hover:border-[#131313] transition-colors"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#131313] text-[#ddca24] rounded-full text-[9px] font-bold flex items-center justify-center border border-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifPanel && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-[#e4e7eb] rounded-[4px] shadow-2xl p-3.5 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-100 mb-2">
                    <span className="text-xs font-heading font-black uppercase tracking-wider text-[#131313]">
                      Operational Alerts ({unreadCount})
                    </span>
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[11px] text-[#131313] font-bold hover:underline font-mono"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto space-y-2">
                    {notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-2.5 border rounded-[3px] text-xs cursor-pointer ${
                          n.read
                            ? 'bg-neutral-50 border-neutral-200 text-neutral-500'
                            : 'bg-[#ddca24]/10 border-[#ddca24] text-[#131313]'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-neutral-500 font-mono font-normal">{n.timestamp}</span>
                        </div>
                        <p className="mt-1 text-neutral-600 text-[11px]">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Drawer Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 bg-neutral-100 text-[#131313] rounded-[3px] hover:bg-neutral-200 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Row 2: Dedicated Module Navigation Bar (Zero Chance of Overlapping!) */}
      <div className="bg-[#f7f8f6] border-t border-[#e4e7eb] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto overflow-x-auto scrollbar-none py-2 flex items-center space-x-1.5">
          {navItems.map(item => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 text-xs font-heading font-black uppercase tracking-wider rounded-[3px] whitespace-nowrap transition-all duration-200 shrink-0 select-none ${
                  isActive
                    ? 'bg-[#131313] text-[#ddca24] shadow-sm scale-[1.02]'
                    : 'text-[#667085] hover:text-[#131313] hover:bg-neutral-200/80 bg-white/70 border border-[#e4e7eb]/80'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Full Slide-Down Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-b border-neutral-300 px-4 py-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
          
          {/* Mobile Switcher */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-100 rounded-[3px] text-xs font-heading font-black uppercase text-center">
            <button
              onClick={() => handleNavClick('customer')}
              className={`py-2 rounded-[2px] ${
                currentTab === 'customer' ? 'bg-[#131313] text-[#ddca24]' : 'text-[#667085]'
              }`}
            >
              ★ Customer Website (3D)
            </button>
            <button
              onClick={() => handleNavClick('overview')}
              className={`py-2 rounded-[2px] ${
                currentTab !== 'customer' ? 'bg-[#131313] text-[#ddca24]' : 'text-[#667085]'
              }`}
            >
              ⚡ Operations Portal
            </button>
          </div>

          {/* Module Links */}
          <div className="space-y-1 pt-2">
            <div className="text-[10px] font-mono font-bold uppercase text-[#667085] px-2 mb-1">
              Select Application Module
            </div>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-[3px] text-xs font-heading font-black uppercase tracking-wider flex items-center justify-between ${
                  currentTab === item.id
                    ? 'bg-[#131313] text-[#ddca24]'
                    : 'text-[#131313] hover:bg-neutral-100'
                }`}
              >
                <span>{item.label}</span>
                {currentTab === item.id && <Check className="w-4 h-4 text-[#ddca24]" />}
              </button>
            ))}
          </div>

          {/* Mobile Role Picker */}
          <div className="pt-3 border-t border-neutral-200">
            <div className="text-[10px] font-mono font-bold uppercase text-[#667085] px-2 mb-2">
              Active User Persona
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {roles.map(r => (
                <button
                  key={r.name}
                  onClick={() => {
                    setActiveRole(r.name as any);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2 rounded-[3px] text-left border ${
                    activeRole === r.name
                      ? 'bg-[#131313] text-[#ddca24] border-[#131313] font-bold'
                      : 'bg-neutral-50 text-[#131313] border-neutral-200'
                  }`}
                >
                  <div className="font-heading uppercase">{r.name}</div>
                </button>
              ))}
            </div>
          </div>

        </div>
      )}

    </header>
  );
};

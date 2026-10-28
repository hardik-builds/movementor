import React, { useState } from 'react';
import { useGym } from './context/GymContext';
import { Navbar } from './components/layout/Navbar';
import { QRKioskModal } from './components/modals/QRKioskModal';

// Customer Facing Experience with 3D Skeleton & Muscle Explorer
import { CustomerHomePage } from './components/customer/CustomerHomePage';

// Operational modules
import { OwnerDashboard } from './components/dashboard/OwnerDashboard';
import { MembersModule } from './components/modules/MembersModule';
import { WorkforceModule } from './components/modules/WorkforceModule';
import { ShiftsAndLeavesModule } from './components/modules/ShiftsAndLeavesModule';
import { ProfessionalsModule } from './components/modules/ProfessionalsModule';
import { FinanceModule } from './components/modules/FinanceModule';
import { BranchesModule } from './components/modules/BranchesModule';
import { ReportsModule } from './components/modules/ReportsModule';
import { SettingsAndAuditModule } from './components/modules/SettingsAndAuditModule';
import { LegalAndPrivacyModule } from './components/modules/LegalAndPrivacyModule';

export const App: React.FC = () => {
  const { activeBranchId } = useGym();
  // Default to the breathtaking Customer Home Page with 3D Skeleton!
  const [currentTab, setCurrentTab] = useState<string>('customer');
  const [showQRKiosk, setShowQRKiosk] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f8f6] text-[#131313] flex flex-col font-sans selection:bg-[#ddca24] selection:text-[#131313] w-full max-w-full">
      
      {/* Top Navbar with Non-Overlapping Layout */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenQRKiosk={() => setShowQRKiosk(true)}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-2.5 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8 min-w-0">
        
        {/* Customer Public Experience with 3D Skeleton */}
        {currentTab === 'customer' && (
          <CustomerHomePage
            onNavigatePortal={setCurrentTab}
            onOpenQRTurnstile={() => setShowQRKiosk(true)}
          />
        )}

        {/* Central Owner Operations Dashboard */}
        {currentTab === 'overview' && (
          <OwnerDashboard
            onNavigateTab={setCurrentTab}
            onOpenQR={() => setShowQRKiosk(true)}
          />
        )}

        {/* Operational Modules */}
        {currentTab === 'members' && <MembersModule />}
        {currentTab === 'workforce' && <WorkforceModule />}
        {currentTab === 'attendance' && (
          <OwnerDashboard onNavigateTab={setCurrentTab} onOpenQR={() => setShowQRKiosk(true)} />
        )}
        {currentTab === 'shifts' && <ShiftsAndLeavesModule />}
        {currentTab === 'professionals' && <ProfessionalsModule />}
        {currentTab === 'finance' && <FinanceModule />}
        {currentTab === 'branches' && <BranchesModule />}
        {currentTab === 'reports' && <ReportsModule />}
        {currentTab === 'privacy' && <LegalAndPrivacyModule />}
        {currentTab === 'admin' && <SettingsAndAuditModule />}

      </main>

      {/* QR Optical Turnstile Kiosk Simulator Modal */}
      <QRKioskModal
        isOpen={showQRKiosk}
        onClose={() => setShowQRKiosk(false)}
      />

      {/* MOVEMENTOR Authentic Brand Footer */}
      <footer className="mt-16 bg-[#131313] text-white text-xs border-t border-neutral-800 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 bg-[#ddca24] text-[#131313] flex items-center justify-center font-heading font-black text-sm rounded-[3px]">
                  MV
                </div>
                <span className="font-heading font-black text-2xl tracking-wide text-white">
                  MOVEMENTOR
                </span>
              </div>
              <p className="text-xs leading-relaxed text-neutral-400">
                Multi-branch athletic conditioning & clinical movement operations system for Mumbai facilities. Custom domain connected with 256-bit SSL encryption.
              </p>
              <div className="text-[11px] font-mono text-neutral-300">
                Production Domain: <strong className="text-[#ddca24]">app.movementor.in</strong>
              </div>
            </div>

            <div>
              <div className="text-[#ddca24] font-heading font-black uppercase tracking-wider text-sm mb-3">
                Experience & Portals
              </div>
              <ul className="space-y-2 text-xs text-neutral-300">
                <li><button onClick={() => setCurrentTab('customer')} className="hover:text-white text-[#ddca24] font-bold">★ Customer Home & 3D Skeleton</button></li>
                <li><button onClick={() => setCurrentTab('overview')} className="hover:text-white">Owner Operations Dashboard</button></li>
                <li><button onClick={() => setCurrentTab('members')} className="hover:text-white">Member Roster Directory</button></li>
                <li><button onClick={() => setCurrentTab('workforce')} className="hover:text-white">Workforce & Coaches</button></li>
                <li><button onClick={() => setCurrentTab('finance')} className="hover:text-white">Unit Economics & P&L</button></li>
              </ul>
            </div>

            <div>
              <div className="text-[#ddca24] font-heading font-black uppercase tracking-wider text-sm mb-3">
                Mumbai Facilities
              </div>
              <ul className="space-y-2 text-xs text-neutral-300">
                <li><strong className="text-white">Bandra West Flagship:</strong> Plot 42, Waterfield Road</li>
                <li><strong className="text-white">Worli Seaface Club:</strong> Horizon Commercial, Level 14</li>
                <li><span className="text-neutral-400 font-mono">Hours: 05:30 to 23:00 (Daily)</span></li>
                <li><span className="text-[#ddca24] font-mono">Turnstile Gates: Online (12ms)</span></li>
              </ul>
            </div>

            <div>
              <div className="text-[#ddca24] font-heading font-black uppercase tracking-wider text-sm mb-3">
                Compliance & Legal
              </div>
              <ul className="space-y-2 text-xs text-neutral-300">
                <li><button onClick={() => setCurrentTab('privacy')} className="hover:text-white text-[#ddca24] font-bold">Privacy Policy</button></li>
                <li><button onClick={() => setCurrentTab('privacy')} className="hover:text-white text-[#ddca24] font-bold">Terms & Conditions</button></li>
                <li><button onClick={() => setCurrentTab('admin')} className="hover:text-white">Hardware Device Logs</button></li>
                <li><span className="text-emerald-400 font-mono font-bold">SSL 256-bit Active</span></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-400">
            <div>
              © 2026 MOVEMENTOR Athletic Systems Private Limited. All rights reserved.
            </div>
            <div className="flex items-center space-x-4 mt-2 sm:mt-0 font-mono">
              <span className="text-white">Mumbai Network</span>
              <span>•</span>
              <span className="text-[#ddca24]">Optical Gates Active</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

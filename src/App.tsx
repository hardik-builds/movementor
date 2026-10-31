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

      {/* MOVEMENTOR Luxury Brand Footer (Anovi Haute Atelier Aesthetic) */}
      <footer className="mt-24 bg-[#131313] text-white text-xs border-t border-neutral-800 select-none font-montserrat">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="font-serif text-2xl tracking-[0.2em] font-normal text-white block">
                  MOVEMENTOR
                </span>
                <span className="text-[9px] tracking-[0.25em] uppercase text-neutral-400 block">
                  Strength & Conditioning Academy
                </span>
              </div>
              <p className="text-xs leading-relaxed text-neutral-400 font-light">
                Mumbai’s premier multi-branch sanctuary for progressive strength conditioning, Olympic lifting platforms, and orthopedic sports medicine.
              </p>
              <a
                href="https://www.instagram.com/official_movementor?rpxt=MzByeG9heGIxZGhw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-[#ddca24] hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider"
              >
                <span>Instagram: @official_movementor</span>
                <span className="text-xs">↗</span>
              </a>
            </div>

            <div className="space-y-3">
              <div className="font-montserrat font-bold uppercase tracking-widest text-xs text-[#ddca24]">
                Sanctuaries
              </div>
              <ul className="space-y-2.5 text-xs text-neutral-300 font-light">
                <li><strong className="text-white font-medium">Bandra West Flagship:</strong> Plot 42, Waterfield Road</li>
                <li><strong className="text-white font-medium">Worli Seaface Club:</strong> Horizon Commercial, Level 14</li>
                <li><strong className="text-white font-medium">Chembur Academy:</strong> Functional Mobility Studio</li>
                <li className="text-[#ddca24] font-mono text-[11px]">Hours: 05:30 — 23:00 Daily</li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-montserrat font-bold uppercase tracking-widest text-xs text-[#ddca24]">
                Disciplines
              </div>
              <ul className="space-y-2 text-xs text-neutral-300 font-light">
                <li>Biomechanical Strength & Eleiko Platforms</li>
                <li>Olympic Weightlifting (IWF Calibrated)</li>
                <li>High-Velocity Turf Sprinting</li>
                <li>Finnish Cedar Infrared Sauna & Plunge</li>
                <li>Sports Physician Spinal Assessments</li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-montserrat font-bold uppercase tracking-widest text-xs text-[#ddca24]">
                Management
              </div>
              <ul className="space-y-2 text-xs text-neutral-300 font-light">
                <li><button onClick={() => setCurrentTab('overview')} className="hover:text-[#ddca24] transition-colors text-left">Operations & Owner Portal →</button></li>
                <li><button onClick={() => setCurrentTab('members')} className="hover:text-[#ddca24] transition-colors text-left">Members Roster</button></li>
                <li><button onClick={() => setCurrentTab('finance')} className="hover:text-[#ddca24] transition-colors text-left">Unit Economics & P&L</button></li>
                <li><button onClick={() => setCurrentTab('privacy')} className="hover:text-[#ddca24] transition-colors text-left">Privacy & Compliance</button></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-400 font-light">
            <div>
              © 2026 MOVEMENTOR Athletic Systems. Handcrafted for Mumbai Movers.
            </div>
            <div className="flex items-center space-x-4 mt-3 sm:mt-0 font-mono text-[10px]">
              <span>Bandra</span>
              <span>•</span>
              <span>Worli</span>
              <span>•</span>
              <span>Chembur</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { 
  QrCode, 
  X, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  ShieldCheck
} from 'lucide-react';

interface QRKioskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRKioskModal: React.FC<QRKioskModalProps> = ({ isOpen, onClose }) => {
  const { members, staff, simulateMemberQRScan, simulateStaffQRScan } = useGym();
  
  const [selectedBranch, setSelectedBranch] = useState<'gym-a' | 'gym-b'>('gym-a');
  const [kioskMode, setKioskMode] = useState<'member' | 'staff'>('member');
  const [selectedTargetId, setSelectedTargetId] = useState<string>('');
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    message: string;
    type: 'checkin' | 'checkout' | 'rejected';
    timestamp: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    if (!selectedTargetId) return;

    if (kioskMode === 'member') {
      const res = simulateMemberQRScan(selectedTargetId, selectedBranch);
      setScanResult({
        ...res,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      });
    } else {
      const res = simulateStaffQRScan(selectedTargetId, selectedBranch);
      setScanResult({
        ...res,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-white border border-[#e4e7eb] rounded-lg shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#e4e7eb] bg-[#131313] text-white">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#ddca24] text-[#131313] rounded">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-black uppercase tracking-wide text-white">
                Optical Turnstile Kiosk Simulator
              </h3>
              <p className="text-xs text-neutral-400">
                Live optical barcode scanner for member access gates and staff duty clock-in
              </p>
            </div>
          </div>
          <button 
            onClick={() => {
              setScanResult(null);
              onClose();
            }}
            className="p-1.5 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-heading font-black text-[#131313] mb-2 tracking-wider">
                1. Select Turnstile Terminal
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedBranch('gym-a')}
                  className={`px-3 py-2 text-xs font-bold border rounded text-left uppercase transition-all ${
                    selectedBranch === 'gym-a'
                      ? 'bg-[#131313] border-[#131313] text-[#ddca24]'
                      : 'bg-white border-[#e4e7eb] text-[#667085] hover:border-[#131313]'
                  }`}
                >
                  <div className="font-heading font-black">Bandra West</div>
                  <div className="text-[10px] opacity-75 font-normal">Gate 01</div>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedBranch('gym-b')}
                  className={`px-3 py-2 text-xs font-bold border rounded text-left uppercase transition-all ${
                    selectedBranch === 'gym-b'
                      ? 'bg-[#131313] border-[#131313] text-[#ddca24]'
                      : 'bg-white border-[#e4e7eb] text-[#667085] hover:border-[#131313]'
                  }`}
                >
                  <div className="font-heading font-black">Worli Seaface</div>
                  <div className="text-[10px] opacity-75 font-normal">Gate A</div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-heading font-black text-[#131313] mb-2 tracking-wider">
                2. Optical Target Mode
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setKioskMode('member');
                    setSelectedTargetId('');
                    setScanResult(null);
                  }}
                  className={`px-3 py-2 text-xs font-heading font-black border rounded text-center uppercase transition-all ${
                    kioskMode === 'member'
                      ? 'bg-[#131313] border-[#131313] text-[#ddca24]'
                      : 'bg-white border-[#e4e7eb] text-[#667085] hover:border-[#131313]'
                  }`}
                >
                  Member Pass
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setKioskMode('staff');
                    setSelectedTargetId('');
                    setScanResult(null);
                  }}
                  className={`px-3 py-2 text-xs font-heading font-black border rounded text-center uppercase transition-all ${
                    kioskMode === 'staff'
                      ? 'bg-[#131313] border-[#131313] text-[#ddca24]'
                      : 'bg-white border-[#e4e7eb] text-[#667085] hover:border-[#131313]'
                  }`}
                >
                  Staff Duty
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-heading font-black text-[#131313] mb-2 tracking-wider">
              3. Present Simulated Pass
            </label>
            <select
              value={selectedTargetId}
              onChange={e => {
                setSelectedTargetId(e.target.value);
                setScanResult(null);
              }}
              className="w-full px-3 py-2.5 bg-neutral-50 border border-[#e4e7eb] rounded text-xs text-[#131313] font-medium focus:outline-none focus:border-[#131313]"
            >
              <option value="">-- Choose individual to present pass --</option>
              {kioskMode === 'member'
                ? members.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.memberCode}) — {m.planName} [{m.status}]
                    </option>
                  ))
                : staff.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.staffCode}) — {s.role} [{s.attendanceStatus}]
                    </option>
                  ))}
            </select>
          </div>

          <button
            type="button"
            disabled={!selectedTargetId}
            onClick={handleSimulateScan}
            className="w-full btn-primary-yellow py-3.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Trigger Optical Scan
          </button>

          {/* Scanner Feedback Box */}
          {scanResult && (
            <div
              className={`p-4 border rounded text-xs transition-all ${
                scanResult.type === 'checkin'
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                  : scanResult.type === 'checkout'
                  ? 'bg-blue-50 border-blue-500 text-blue-900'
                  : 'bg-red-50 border-red-500 text-red-900'
              }`}
            >
              <div className="flex items-start space-x-3">
                {scanResult.type === 'checkin' && <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />}
                {scanResult.type === 'checkout' && <Clock className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />}
                {scanResult.type === 'rejected' && <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />}
                <div>
                  <div className="font-heading font-black text-sm uppercase tracking-wider">
                    {scanResult.type === 'checkin'
                      ? 'TURNSTILE UNLOCKED • CHECK-IN LOGGED'
                      : scanResult.type === 'checkout'
                      ? 'TURNSTILE UNLOCKED • CHECK-OUT RECORDED'
                      : 'GATE LOCKED • MEMBERSHIP EXPIRED OR FROZEN'}
                    <span className="ml-2 font-mono text-xs opacity-75 font-normal">[{scanResult.timestamp}]</span>
                  </div>
                  <p className="mt-1 font-sans text-xs leading-relaxed">
                    {scanResult.message}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2 text-[11px] text-[#667085] pt-2 border-t border-neutral-100">
            <ShieldCheck className="w-4 h-4 text-[#131313] shrink-0" />
            <span>Turnstile logic enforces duplicate prevention, visit calculation and instant database sync.</span>
          </div>

        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useGym } from '../../context/GymContext';
import { 
  Shield, 
  Cpu, 
  History
} from 'lucide-react';

export const SettingsAndAuditModule: React.FC = () => {
  const { auditLogs } = useGym();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white border border-[#e4e7eb] rounded-lg shadow-sm">
        <div>
          <div className="text-[#131313] bg-[#ddca24] px-2 py-0.5 rounded text-[11px] font-heading font-black uppercase tracking-wider inline-block mb-1">
            SECURITY & ADMINISTRATION
          </div>
          <h2 className="font-heading text-3xl font-black text-[#131313] tracking-wide uppercase">
            Hardware Devices & Audit Ledger
          </h2>
          <p className="text-xs text-[#667085] mt-0.5">
            Turnstile optical device status, anti-passback policies and immutable administrative event logs
          </p>
        </div>
      </div>

      {/* Hardware Devices */}
      <div className="maxfiit-card-light p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#e4e7eb]">
          <div className="flex items-center space-x-3">
            <Cpu className="w-5 h-5 text-[#131313]" />
            <div>
              <h3 className="font-heading text-xl font-black text-[#131313] uppercase">Turnstile Access Hardware</h3>
              <p className="text-xs text-[#667085]">Connected optical readers at facility entry turnstiles</p>
            </div>
          </div>
          <span className="text-[10px] uppercase font-heading font-black px-2 py-1 bg-emerald-100 text-emerald-800 rounded">
            2 Terminals Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-neutral-50 border border-neutral-200 rounded space-y-2">
            <div className="flex justify-between font-bold text-[#131313]">
              <span>Bandra West — Gate Terminal 01</span>
              <span className="text-emerald-700 font-mono font-bold">Status: Connected</span>
            </div>
            <div className="text-[#667085]">
              Hardware: <strong className="text-[#131313]">Optical 2D QR Turnstile Kiosk</strong> • Latency: 12ms
            </div>
            <div className="text-[11px] text-[#667085]">
              Anti-passback delay: 15 minutes. Automatic barrier release enabled on verified pass.
            </div>
          </div>

          <div className="p-4 bg-neutral-50 border border-neutral-200 rounded space-y-2">
            <div className="flex justify-between font-bold text-[#131313]">
              <span>Worli Seaface — Gate Terminal A</span>
              <span className="text-emerald-700 font-mono font-bold">Status: Connected</span>
            </div>
            <div className="text-[#667085]">
              Hardware: <strong className="text-[#131313]">Optical 2D QR Turnstile Kiosk</strong> • Latency: 14ms
            </div>
            <div className="text-[11px] text-[#667085]">
              Integrated barrier controller with instant attendance synchronization.
            </div>
          </div>
        </div>
      </div>

      {/* Audit Log */}
      <div className="maxfiit-card-light p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#e4e7eb]">
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-[#131313]" />
            <h3 className="font-heading text-xl font-black text-[#131313] uppercase">
              System Audit Trail
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-[#667085]">{auditLogs.length} Events Recorded</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] uppercase tracking-wider text-[#667085] bg-neutral-50 border-b border-[#e4e7eb] pb-2">
              <tr>
                <th className="py-2.5 px-3 font-bold">Timestamp</th>
                <th className="py-2.5 px-3 font-bold">User</th>
                <th className="py-2.5 px-3 font-bold">Action</th>
                <th className="py-2.5 px-3 font-bold">Target</th>
                <th className="py-2.5 px-3 font-bold">Branch</th>
                <th className="py-2.5 px-3 font-bold">Summary</th>
                <th className="py-2.5 px-3 font-bold">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="py-3 px-3 text-[#667085] font-mono">{log.timestamp}</td>
                  <td className="py-3 px-3 font-bold text-[#131313]">
                    <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-200 rounded text-[10px]">
                      {log.actor}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#131313] font-mono font-bold text-[11px]">{log.action}</td>
                  <td className="py-3 px-3 font-bold text-[#131313]">{log.affectedRecord}</td>
                  <td className="py-3 px-3 text-[#667085]">
                    {log.branchId === 'gym-a' ? 'Bandra West' : 'Worli Seaface'}
                  </td>
                  <td className="py-3 px-3 text-[#667085] max-w-sm truncate">{log.summary}</td>
                  <td className="py-3 px-3 text-[#667085] font-mono text-[10px]">{log.referenceNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

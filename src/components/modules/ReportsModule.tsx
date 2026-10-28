import React from 'react';
import { useGym } from '../../context/GymContext';
import { 
  FileText, 
  Download, 
  Printer
} from 'lucide-react';

export const ReportsModule: React.FC = () => {
  const { members, staff, attendance, expenses, branches, activeBranchId } = useGym();

  const handleSimulateExport = (type: string) => {
    alert(`[Report Export] Generating ${type} for MOVEMENTOR Mumbai operations.`);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white border border-[#e4e7eb] rounded-lg shadow-sm">
        <div>
          <div className="text-[#131313] bg-[#ddca24] px-2 py-0.5 rounded text-[11px] font-heading font-black uppercase tracking-wider inline-block mb-1">
            EXECUTIVE AUDIT
          </div>
          <h2 className="font-heading text-3xl font-black text-[#131313] tracking-wide uppercase">
            Operational & Financial Reports
          </h2>
          <p className="text-xs text-[#667085] mt-0.5">
            Real-time compliance reports, payroll data, turnstile throughput and membership renewals
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleSimulateExport('Full CSV Roster')}
            className="btn-outline-light py-2 px-4 text-xs"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => handleSimulateExport('Financial Summary PDF')}
            className="btn-primary-yellow py-2 px-4 text-xs"
          >
            <Printer className="w-3.5 h-3.5 mr-1.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        <div className="maxfiit-card-light p-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <h3 className="font-heading text-xl font-black text-[#131313] uppercase">Monthly P&L Ledger</h3>
            <span className="text-[10px] font-mono text-[#667085] bg-neutral-100 px-2 py-0.5 rounded">October 2026</span>
          </div>
          <p className="text-xs text-[#667085] leading-relaxed">
            Consolidated statement of membership collections, facility lease expenses, utility invoices, and coach commission disbursements.
          </p>
          <div className="p-3 bg-neutral-50 border border-neutral-200 rounded text-xs flex justify-between">
            <span className="text-[#667085]">Consolidated Revenue:</span>
            <span className="font-heading font-black text-emerald-700 text-sm">₹53,00,000</span>
          </div>
          <button
            onClick={() => handleSimulateExport('P&L Statement')}
            className="w-full btn-outline-light py-2 text-xs"
          >
            Download P&L Statement (CSV)
          </button>
        </div>

        <div className="maxfiit-card-light p-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <h3 className="font-heading text-xl font-black text-[#131313] uppercase">Workforce Payroll & Payouts</h3>
            <span className="text-[10px] font-mono text-[#667085] bg-neutral-100 px-2 py-0.5 rounded">Current Cycle</span>
          </div>
          <p className="text-xs text-[#667085] leading-relaxed">
            Attendance working hours summary, lunch break deductions, trainer personal session fees, and doctor consultation retainers.
          </p>
          <div className="p-3 bg-neutral-50 border border-neutral-200 rounded text-xs flex justify-between">
            <span className="text-[#667085]">Approved Payouts:</span>
            <span className="font-heading font-black text-[#131313] text-sm">₹6,88,600</span>
          </div>
          <button
            onClick={() => handleSimulateExport('Payroll Ledger')}
            className="w-full btn-outline-light py-2 text-xs"
          >
            Download Payroll Sheet (Excel)
          </button>
        </div>

        <div className="maxfiit-card-light p-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <h3 className="font-heading text-xl font-black text-[#131313] uppercase">Turnstile Throughput & Hours</h3>
            <span className="text-[10px] font-mono text-[#667085] bg-neutral-100 px-2 py-0.5 rounded">Live Month</span>
          </div>
          <p className="text-xs text-[#667085] leading-relaxed">
            Hourly member footfall density, average workout duration (1 hour 18 minutes), and cross-branch facility visits.
          </p>
          <div className="p-3 bg-neutral-50 border border-neutral-200 rounded text-xs flex justify-between">
            <span className="text-[#667085]">Peak Hours:</span>
            <span className="font-heading font-black text-[#131313] text-sm">07:00 to 09:30</span>
          </div>
          <button
            onClick={() => handleSimulateExport('Throughput Logs')}
            className="w-full btn-outline-light py-2 text-xs"
          >
            Export Attendance Logs
          </button>
        </div>

        <div className="maxfiit-card-light p-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <h3 className="font-heading text-xl font-black text-[#131313] uppercase">Membership Renewals</h3>
            <span className="text-[10px] font-mono text-[#667085] bg-neutral-100 px-2 py-0.5 rounded">30-Day Forecast</span>
          </div>
          <p className="text-xs text-[#667085] leading-relaxed">
            Roster of memberships expiring within the next 30 days and automated renewal notice dispatch records.
          </p>
          <div className="p-3 bg-neutral-50 border border-neutral-200 rounded text-xs flex justify-between">
            <span className="text-[#667085]">Expiring Members:</span>
            <span className="font-heading font-black text-red-600 text-sm">18 Members</span>
          </div>
          <button
            onClick={() => handleSimulateExport('Renewal Roster')}
            className="w-full btn-outline-light py-2 text-xs"
          >
            Export Renewal List
          </button>
        </div>

      </div>

    </div>
  );
};

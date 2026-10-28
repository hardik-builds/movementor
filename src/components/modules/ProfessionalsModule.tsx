import React, { useState, useMemo } from 'react';
import { useGym } from '../../context/GymContext';
import { 
  Stethoscope, 
  Dumbbell, 
  Clock, 
  IndianRupee, 
  CheckCircle,
  MapPin
} from 'lucide-react';

export const ProfessionalsModule: React.FC = () => {
  const { 
    sessions, 
    staff, 
    members, 
    activeBranchId, 
    completeSession, 
    approveSessionPayout 
  } = useGym();

  const [filterCategory, setFilterCategory] = useState<'all' | 'doctor' | 'trainer'>('all');

  const filteredSessions = useMemo(() => {
    return sessions.filter(s => {
      const matchBranch = activeBranchId === 'all' || s.branchId === activeBranchId;
      const matchCat = filterCategory === 'all' 
        ? true 
        : filterCategory === 'doctor' 
        ? s.category === 'Medical & Visiting Professional' 
        : s.category === 'Fitness Professional';
      return matchBranch && matchCat;
    });
  }, [sessions, activeBranchId, filterCategory]);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white border border-[#e4e7eb] rounded-lg shadow-sm">
        <div>
          <div className="text-[#131313] bg-[#ddca24] px-2 py-0.5 rounded text-[11px] font-heading font-black uppercase tracking-wider inline-block mb-1">
            APPOINTMENTS & SESSIONS
          </div>
          <h2 className="font-heading text-3xl font-black text-[#131313] tracking-wide uppercase">
            Personal Trainers & Visiting Doctors
          </h2>
          <p className="text-xs text-[#667085] mt-0.5">
            Cross-branch scheduling, completed session verification, and automated commission/retainer payouts
          </p>
        </div>

        <div className="flex items-center space-x-1.5">
          {['all', 'trainer', 'doctor'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat as any)}
              className={`px-3 py-1.5 text-xs font-heading font-black uppercase rounded border transition-colors ${
                filterCategory === cat
                  ? 'bg-[#131313] border-[#131313] text-[#ddca24]'
                  : 'bg-white border-[#e4e7eb] text-[#667085] hover:border-[#131313]'
              }`}
            >
              {cat === 'all' ? 'All Sessions' : cat === 'trainer' ? 'Trainers' : 'Physicians & Doctors'}
            </button>
          ))}
        </div>
      </div>

      {/* Case Study Callout */}
      <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-[#131313] font-bold">
            <Stethoscope className="w-5 h-5 text-[#131313]" />
            <span className="font-heading font-black text-base uppercase">Cross-Branch Medical Retainer: Dr Farokh Mehta (Sports Physician)</span>
          </div>
          <span className="text-xs font-mono font-bold text-[#131313] px-2 py-0.5 bg-[#ddca24] rounded">
            ₹3,500 / Hour
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-[#667085]">
          <div className="p-3 bg-white border border-neutral-200 rounded">
            <strong className="text-[#131313]">Bandra West Branch:</strong> 10:00 to 14:00 (Tuesdays, Thursdays, Saturdays). Joint assessments and orthopedic clearances.
          </div>
          <div className="p-3 bg-white border border-neutral-200 rounded">
            <strong className="text-[#131313]">Worli Seaface Branch:</strong> 16:00 to 19:00. Spinal biomechanics audits and injury rehabilitation.
          </div>
        </div>
      </div>

      {/* Sessions Table */}
      <div className="maxfiit-card-light overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="text-[11px] uppercase tracking-wider text-[#667085] bg-neutral-50 border-b border-[#e4e7eb]">
            <tr>
              <th className="py-3 px-4 font-bold">Professional</th>
              <th className="py-3 px-4 font-bold">Service Type</th>
              <th className="py-3 px-4 font-bold">Member</th>
              <th className="py-3 px-4 font-bold">Location</th>
              <th className="py-3 px-4 font-bold">Time Slot</th>
              <th className="py-3 px-4 font-bold">Agreed Fee</th>
              <th className="py-3 px-4 font-bold">Session Status</th>
              <th className="py-3 px-4 font-bold text-right">Workflow</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {filteredSessions.map(ses => (
              <tr key={ses.id} className="hover:bg-neutral-50 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-[#131313]">{ses.professionalName}</div>
                  <div className="text-[10px] text-[#667085]">{ses.category}</div>
                </td>
                <td className="py-3.5 px-4 text-[#131313] font-bold">{ses.serviceType}</td>
                <td className="py-3.5 px-4 text-[#667085]">{ses.memberName}</td>
                <td className="py-3.5 px-4 text-[#667085]">
                  {ses.branchId === 'gym-a' ? 'Bandra West' : 'Worli Seaface'}
                </td>
                <td className="py-3.5 px-4 font-mono font-bold text-[#131313]">{ses.timeSlot}</td>
                <td className="py-3.5 px-4 font-mono font-bold text-[#131313]">
                  ₹{ses.rateINR.toLocaleString('en-IN')}
                </td>
                <td className="py-3.5 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-heading font-black uppercase tracking-wider ${
                    ses.status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}>
                    {ses.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  {ses.status !== 'Completed' ? (
                    <button
                      onClick={() => completeSession(ses.id)}
                      className="px-3 py-1 bg-white border border-[#e4e7eb] hover:border-[#131313] text-[#131313] text-[10px] font-heading font-bold uppercase rounded"
                    >
                      Log Completed
                    </button>
                  ) : ses.payableStatus === 'Submitted' ? (
                    <button
                      onClick={() => approveSessionPayout(ses.id)}
                      className="px-3 py-1 bg-[#ddca24] text-[#131313] hover:bg-[#c8b51d] text-[10px] font-heading font-black uppercase rounded shadow-sm"
                    >
                      Approve Payout
                    </button>
                  ) : (
                    <span className="text-[10px] font-heading font-black text-emerald-700 uppercase">
                      ✓ Approved
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

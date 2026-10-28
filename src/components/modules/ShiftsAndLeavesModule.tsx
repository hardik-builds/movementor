import React, { useState, useMemo } from 'react';
import { useGym } from '../../context/GymContext';
import { AnimatedReveal } from '../common/AnimatedReveal';
import { MaxfiitButton } from '../common/MaxfiitButton';
import { 
  Clock, 
  Calendar, 
  Plus, 
  Search, 
  X
} from 'lucide-react';

export const ShiftsAndLeavesModule: React.FC = () => {
  const { 
    shifts, 
    leaves, 
    staff, 
    activeBranchId, 
    createShift, 
    requestLeave, 
    updateLeaveStatus 
  } = useGym();

  const [activeSubTab, setActiveSubTab] = useState<'shifts' | 'leaves'>('shifts');
  const [showShiftModal, setShowShiftModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  const [newShift, setNewShift] = useState({
    staffId: '',
    branchId: 'gym-a' as 'gym-a' | 'gym-b',
    date: new Date().toISOString().substring(0, 10),
    startTime: '07:00',
    endTime: '15:00',
    breakPolicy: '45m Lunch Break',
    shiftType: 'Morning Shift' as any,
  });

  const [newLeave, setNewLeave] = useState({
    staffId: '',
    branchId: 'gym-a' as 'gym-a' | 'gym-b',
    leaveType: 'Paid Annual' as any,
    startDate: new Date().toISOString().substring(0, 10),
    endDate: new Date(Date.now() + 2*24*60*60*1000).toISOString().substring(0, 10),
    daysCount: 2,
    reason: ''
  });

  const filteredShifts = useMemo(() => {
    return shifts.filter(s => activeBranchId === 'all' || s.branchId === activeBranchId);
  }, [shifts, activeBranchId]);

  const filteredLeaves = useMemo(() => {
    return leaves.filter(l => activeBranchId === 'all' || l.branchId === activeBranchId);
  }, [leaves, activeBranchId]);

  const handleCreateShift = (e: React.FormEvent) => {
    e.preventDefault();
    const stf = staff.find(s => s.id === newShift.staffId);
    if (!stf) return;

    createShift({
      staffId: stf.id,
      staffName: stf.name,
      role: stf.role,
      branchId: newShift.branchId,
      date: newShift.date,
      startTime: newShift.startTime,
      endTime: newShift.endTime,
      breakPolicy: newShift.breakPolicy,
      shiftType: newShift.shiftType,
      status: 'Scheduled'
    });

    setShowShiftModal(false);
  };

  const handleCreateLeave = (e: React.FormEvent) => {
    e.preventDefault();
    const stf = staff.find(s => s.id === newLeave.staffId);
    if (!stf) return;

    requestLeave({
      staffId: stf.id,
      staffName: stf.name,
      role: stf.role,
      branchId: newLeave.branchId,
      leaveType: newLeave.leaveType,
      startDate: newLeave.startDate,
      endDate: newLeave.endDate,
      daysCount: Number(newLeave.daysCount),
      reason: newLeave.reason || 'Personal leave request'
    });

    setShowLeaveModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <AnimatedReveal animation="fade-up" delayMs={0}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white border border-[#e4e7eb] rounded-[4px] shadow-sm">
          <div>
            <div className="text-[#131313] bg-[#ddca24] px-2 py-0.5 rounded-[2px] text-[10px] font-mono font-bold uppercase tracking-wider inline-block mb-1">
              [// ROSTERS & TIME OFF //]
            </div>
            <h2 className="font-heading text-3xl font-black text-[#131313] tracking-wide uppercase">
              Shift Schedules & Leave Requests
            </h2>
            <p className="text-xs text-[#667085] mt-0.5">
              Cross-branch scheduling, overlapping shift alerts, break deductions, and leave approval workflows
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex bg-neutral-100 p-1 rounded-[3px]">
              <button
                onClick={() => setActiveSubTab('shifts')}
                className={`px-3 py-1.5 text-xs font-heading font-black uppercase tracking-wider rounded-[2px] transition-colors ${
                  activeSubTab === 'shifts' ? 'bg-[#131313] text-[#ddca24]' : 'text-[#667085] hover:text-[#131313]'
                }`}
              >
                Shifts ({filteredShifts.length})
              </button>
              <button
                onClick={() => setActiveSubTab('leaves')}
                className={`px-3 py-1.5 text-xs font-heading font-black uppercase tracking-wider rounded-[2px] transition-colors ${
                  activeSubTab === 'leaves' ? 'bg-[#131313] text-[#ddca24]' : 'text-[#667085] hover:text-[#131313]'
                }`}
              >
                Leaves ({filteredLeaves.length})
              </button>
            </div>

            <MaxfiitButton
              onClick={() => activeSubTab === 'shifts' ? setShowShiftModal(true) : setShowLeaveModal(true)}
              variant="primary"
              className="py-2.5 px-4"
            >
              {activeSubTab === 'shifts' ? 'Assign Shift' : 'Submit Leave'}
            </MaxfiitButton>
          </div>
        </div>
      </AnimatedReveal>

      {/* Shifts Table */}
      {activeSubTab === 'shifts' && (
        <div className="maxfiit-card-light overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] uppercase tracking-wider text-[#667085] bg-neutral-50 border-b border-[#e4e7eb]">
              <tr>
                <th className="py-3 px-4 font-bold">Staff Member</th>
                <th className="py-3 px-4 font-bold">Role</th>
                <th className="py-3 px-4 font-bold">Location</th>
                <th className="py-3 px-4 font-bold">Shift Timing</th>
                <th className="py-3 px-4 font-bold">Type</th>
                <th className="py-3 px-4 font-bold">Break Policy</th>
                <th className="py-3 px-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredShifts.map(shf => (
                <tr key={shf.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#131313]">{shf.staffName}</td>
                  <td className="py-3.5 px-4 text-[#667085]">{shf.role}</td>
                  <td className="py-3.5 px-4 text-[#667085]">
                    {shf.branchId === 'gym-a' ? 'Bandra West' : 'Worli Seaface'}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#131313]">
                    {shf.startTime} to {shf.endTime}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[#131313]">{shf.shiftType}</td>
                  <td className="py-3.5 px-4 text-[#667085]">{shf.breakPolicy}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-heading font-black uppercase tracking-wider ${
                      shf.status === 'In Progress'
                        ? 'bg-emerald-100 text-emerald-800'
                        : shf.status === 'Conflict Warning'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      {shf.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Leaves Table */}
      {activeSubTab === 'leaves' && (
        <div className="maxfiit-card-light overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] uppercase tracking-wider text-[#667085] bg-neutral-50 border-b border-[#e4e7eb]">
              <tr>
                <th className="py-3 px-4 font-bold">Staff Member</th>
                <th className="py-3 px-4 font-bold">Leave Type</th>
                <th className="py-3 px-4 font-bold">Duration</th>
                <th className="py-3 px-4 font-bold">Reason</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Approval Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredLeaves.map(lev => (
                <tr key={lev.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#131313]">{lev.staffName}</div>
                    <div className="text-[10px] text-[#667085]">{lev.role}</div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#131313]">{lev.leaveType}</td>
                  <td className="py-3.5 px-4 font-mono text-[#667085]">
                    {lev.startDate} to {lev.endDate} ({lev.daysCount} days)
                  </td>
                  <td className="py-3.5 px-4 text-[#667085] max-w-xs truncate">{lev.reason}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-heading font-black uppercase tracking-wider ${
                      lev.status === 'Approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : lev.status === 'Rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {lev.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {lev.status === 'Pending' ? (
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => updateLeaveStatus(lev.id, 'Approved')}
                          className="px-2.5 py-1 bg-emerald-600 text-white font-heading font-bold text-[10px] uppercase rounded"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateLeaveStatus(lev.id, 'Rejected')}
                          className="px-2.5 py-1 bg-red-600 text-white font-heading font-bold text-[10px] uppercase rounded"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] text-[#667085]">
                        Reviewed by {lev.reviewerName || 'Operations'}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal: Assign Shift */}
      {showShiftModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white border border-[#e4e7eb] rounded-lg p-6 shadow-2xl text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="font-heading text-xl font-black text-[#131313] uppercase">Assign Shift</h3>
              <button onClick={() => setShowShiftModal(false)} className="text-[#667085] hover:text-[#131313]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateShift} className="space-y-3">
              <div>
                <label className="block text-[#667085] uppercase font-bold mb-1">Staff Member</label>
                <select
                  required
                  value={newShift.staffId}
                  onChange={e => setNewShift({ ...newShift, staffId: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-[#e4e7eb] rounded text-[#131313] font-medium"
                >
                  <option value="">-- Choose individual --</option>
                  {staff.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.role})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#667085] uppercase font-bold mb-1">Location</label>
                  <select
                    value={newShift.branchId}
                    onChange={e => setNewShift({ ...newShift, branchId: e.target.value as any })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-[#e4e7eb] rounded text-[#131313] font-medium"
                  >
                    <option value="gym-a">Bandra West</option>
                    <option value="gym-b">Worli Seaface</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#667085] uppercase font-bold mb-1">Shift Type</label>
                  <select
                    value={newShift.shiftType}
                    onChange={e => setNewShift({ ...newShift, shiftType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-[#e4e7eb] rounded text-[#131313] font-medium"
                  >
                    <option value="Morning Shift">Morning Shift</option>
                    <option value="Evening Shift">Evening Shift</option>
                    <option value="Split Shift">Split Shift</option>
                    <option value="Visiting Clinic">Visiting Clinic</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#667085] uppercase font-bold mb-1">Start Time</label>
                  <input
                    type="text"
                    value={newShift.startTime}
                    onChange={e => setNewShift({ ...newShift, startTime: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-[#e4e7eb] rounded text-[#131313] font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[#667085] uppercase font-bold mb-1">End Time</label>
                  <input
                    type="text"
                    value={newShift.endTime}
                    onChange={e => setNewShift({ ...newShift, endTime: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-[#e4e7eb] rounded text-[#131313] font-mono font-bold"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setShowShiftModal(false)}
                  className="px-4 py-2 bg-neutral-100 text-[#131313] font-heading font-bold uppercase rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary-yellow py-2 px-5"
                >
                  Confirm Shift
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Apply Leave */}
      {showLeaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white border border-[#e4e7eb] rounded-lg p-6 shadow-2xl text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="font-heading text-xl font-black text-[#131313] uppercase">Apply For Leave</h3>
              <button onClick={() => setShowLeaveModal(false)} className="text-[#667085] hover:text-[#131313]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateLeave} className="space-y-3">
              <div>
                <label className="block text-[#667085] uppercase font-bold mb-1">Staff Member</label>
                <select
                  required
                  value={newLeave.staffId}
                  onChange={e => setNewLeave({ ...newLeave, staffId: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-[#e4e7eb] rounded text-[#131313] font-medium"
                >
                  <option value="">-- Choose individual --</option>
                  {staff.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.role})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#667085] uppercase font-bold mb-1">Leave Type</label>
                  <select
                    value={newLeave.leaveType}
                    onChange={e => setNewLeave({ ...newLeave, leaveType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-[#e4e7eb] rounded text-[#131313] font-medium"
                  >
                    <option value="Paid Annual">Paid Annual</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Casual Off">Casual Off</option>
                    <option value="Unpaid Sabbatical">Unpaid Sabbatical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#667085] uppercase font-bold mb-1">Days Count</label>
                  <input
                    type="number"
                    value={newLeave.daysCount}
                    onChange={e => setNewLeave({ ...newLeave, daysCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-[#e4e7eb] rounded text-[#131313] font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#667085] uppercase font-bold mb-1">Reason and Coverage</label>
                <textarea
                  rows={2}
                  required
                  value={newLeave.reason}
                  onChange={e => setNewLeave({ ...newLeave, reason: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-[#e4e7eb] rounded text-[#131313]"
                  placeholder="Detail reason and designated shift cover..."
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setShowLeaveModal(false)}
                  className="px-4 py-2 bg-neutral-100 text-[#131313] font-heading font-bold uppercase rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary-yellow py-2 px-5"
                >
                  Submit For Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

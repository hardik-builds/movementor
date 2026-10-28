import React, { useState, useMemo } from 'react';
import { useGym } from '../../context/GymContext';
import { Staff } from '../../types/gym';
import { AnimatedReveal } from '../common/AnimatedReveal';
import { MaxfiitButton } from '../common/MaxfiitButton';
import { 
  Users, 
  Briefcase, 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  X,
  Clock,
  Dumbbell,
  Stethoscope
} from 'lucide-react';

export const WorkforceModule: React.FC = () => {
  const { staff, activeBranchId, addStaff, updateStaff } = useGym();

  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);

  const [newStaffForm, setNewStaffForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Senior Strength Trainer' as any,
    category: 'Fitness Professional' as any,
    primaryBranch: 'gym-a' as 'gym-a' | 'gym-b',
    engagementType: 'Per-Session Commission' as any,
    rateINR: 1500,
    rateUnit: 'per session' as any,
    specialization: 'Strength & Conditioning'
  });

  const filteredStaff = useMemo(() => {
    return staff.filter(s => {
      const matchBranch = activeBranchId === 'all' || s.primaryBranch === activeBranchId || s.secondaryBranch === activeBranchId;
      const matchCategory = categoryFilter === 'All' || s.category === categoryFilter;
      const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.staffCode.toLowerCase().includes(searchQuery.toLowerCase());
      return matchBranch && matchCategory && matchSearch;
    });
  }, [staff, activeBranchId, categoryFilter, searchQuery]);

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffForm.name) return;

    addStaff({
      name: newStaffForm.name,
      email: newStaffForm.email || `${newStaffForm.name.toLowerCase().replace(/\s+/g, '.')}@movementor.in`,
      phone: newStaffForm.phone || '+91 98200 44556',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: newStaffForm.role,
      category: newStaffForm.category,
      primaryBranch: newStaffForm.primaryBranch,
      engagementType: newStaffForm.engagementType,
      attendanceStatus: 'Checked Out',
      rateINR: Number(newStaffForm.rateINR),
      rateUnit: newStaffForm.rateUnit,
      monthlyBaseSalary: newStaffForm.engagementType === 'Full-time Salaried' ? Number(newStaffForm.rateINR) : 25000,
      sessionsCompletedThisMonth: 0,
      payableDueINR: 0,
      joinDate: new Date().toISOString().substring(0, 10),
      specialization: newStaffForm.specialization
    });

    setShowAddStaffModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <AnimatedReveal animation="fade-up" delayMs={0}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white border border-[#e4e7eb] rounded-[4px] shadow-sm">
          <div>
            <div className="text-[#131313] bg-[#ddca24] px-2 py-0.5 rounded-[2px] text-[10px] font-mono font-bold uppercase tracking-wider inline-block mb-1">
              [// WORKFORCE & CLINICIANS //]
            </div>
            <h2 className="font-heading text-3xl font-black text-[#131313] tracking-wide uppercase">
              Employees, Coaches & Visiting Clinicians
            </h2>
            <p className="text-xs text-[#667085] mt-0.5">
              Full-time salaried staff, commission fitness trainers, and visiting sports medicine doctors across Mumbai
            </p>
          </div>

          <MaxfiitButton
            onClick={() => setShowAddStaffModal(true)}
            variant="primary"
            className="self-start sm:self-auto py-2.5 px-5"
          >
            Add Workforce Profile
          </MaxfiitButton>
        </div>
      </AnimatedReveal>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#667085]" />
          <input
            type="text"
            placeholder="Search by staff name, role, specialization, or ID..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e4e7eb] rounded text-xs text-[#131313] placeholder-[#667085] focus:outline-none focus:border-[#131313] shadow-sm font-medium"
          />
        </div>

        <div className="flex items-center space-x-1.5 w-full sm:w-auto">
          {['All', 'Employee', 'Fitness Professional', 'Medical & Visiting Professional'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-2 text-xs font-heading font-black uppercase tracking-wider rounded border transition-colors ${
                categoryFilter === cat
                  ? 'bg-[#131313] border-[#131313] text-[#ddca24]'
                  : 'bg-white border-[#e4e7eb] text-[#667085] hover:border-[#131313]'
              }`}
            >
              {cat === 'Fitness Professional' ? 'Trainers' : cat === 'Medical & Visiting Professional' ? 'Doctors & Specialists' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Workforce Cards Grid */}
      <AnimatedReveal animation="fade-up" delayMs={100}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStaff.map(st => (
            <div
              key={st.id}
              onClick={() => setSelectedStaff(st)}
              className="bg-white border border-[#e4e7eb] rounded-[4px] p-5 cursor-pointer space-y-4 hover:border-[#131313] hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={st.avatar}
                    alt={st.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#131313] shrink-0"
                  />
                  <div>
                    <h3 className="font-heading font-black text-lg text-[#131313] uppercase leading-tight">
                      {st.name}
                    </h3>
                    <div className="text-xs text-[#667085] font-medium">{st.role}</div>
                    <span className="text-[10px] text-[#131313] font-mono font-bold bg-neutral-100 px-1 py-0.5 rounded-[2px]">{st.staffCode}</span>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded-[2px] text-[10px] font-heading font-black uppercase tracking-wider ${
                  st.attendanceStatus === 'Present' || st.attendanceStatus === 'On Duty'
                    ? 'bg-emerald-100 text-emerald-800'
                    : st.attendanceStatus === 'On Leave'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-neutral-100 text-neutral-600'
                }`}>
                  {st.attendanceStatus}
                </span>
              </div>

              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-[3px] text-xs space-y-1.5">
                <div className="flex justify-between text-[#667085]">
                  <span>Engagement Model:</span>
                  <span className="font-bold text-[#131313]">{st.engagementType}</span>
                </div>
                <div className="flex justify-between text-[#667085]">
                  <span>Primary Location:</span>
                  <span className="font-bold text-[#131313]">
                    {st.primaryBranch === 'gym-a' ? 'Bandra West' : 'Worli Seaface'}
                  </span>
                </div>
                {st.secondaryBranch && (
                  <div className="flex justify-between text-[#667085]">
                    <span>Cross-Branch:</span>
                    <span className="font-bold text-[#ddca24] bg-[#131313] px-1 rounded-[2px]">
                      {st.secondaryBranch === 'gym-a' ? 'Bandra West' : 'Worli Seaface'}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-neutral-100">
                <div>
                  <span className="text-[10px] text-[#667085] uppercase font-mono font-bold">Agreed Rate</span>
                  <div className="font-heading font-black text-base text-[#131313]">
                    ₹{st.rateINR.toLocaleString('en-IN')} <span className="text-[10px] font-sans font-normal text-[#667085]">/{st.rateUnit}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#667085] uppercase font-mono font-bold">Month Sessions</span>
                  <div className="font-heading font-black text-base text-[#131313]">
                    {st.sessionsCompletedThisMonth} sessions
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </AnimatedReveal>

      {/* Staff Profile Drawer */}
      {selectedStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-xl bg-white border border-[#e4e7eb] rounded-lg p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            
            <div className="flex items-start justify-between pb-4 border-b border-[#e4e7eb]">
              <div className="flex items-center space-x-4">
                <img 
                  src={selectedStaff.avatar} 
                  alt={selectedStaff.name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#131313]" 
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-heading text-2xl font-black text-[#131313] uppercase">{selectedStaff.name}</h3>
                    <span className="font-mono text-xs text-[#131313] bg-[#ddca24] px-1.5 py-0.5 rounded font-bold">[{selectedStaff.staffCode}]</span>
                  </div>
                  <p className="text-xs text-[#667085]">{selectedStaff.role} • {selectedStaff.category}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedStaff(null)}
                className="p-1 text-[#667085] hover:text-[#131313]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-neutral-50 border border-neutral-200 rounded text-center">
                <div>
                  <div className="text-[10px] text-[#667085] uppercase font-bold">Duty Status</div>
                  <div className="font-heading font-black text-emerald-700 mt-0.5">{selectedStaff.attendanceStatus}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#667085] uppercase font-bold">Engagement</div>
                  <div className="font-heading font-black text-[#131313] mt-0.5">{selectedStaff.engagementType}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#667085] uppercase font-bold">Agreed Rate</div>
                  <div className="font-mono font-bold text-[#131313] mt-0.5">
                    ₹{selectedStaff.rateINR.toLocaleString('en-IN')}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-[#667085] uppercase font-bold">Payable Due</div>
                  <div className="font-mono font-bold text-[#131313] mt-0.5">
                    ₹{selectedStaff.payableDueINR.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded space-y-1.5">
                <div className="text-[10px] uppercase font-bold text-[#667085]">Specialization & Scope</div>
                <div className="text-[#131313] font-medium">
                  {selectedStaff.specialization || 'Comprehensive training, recovery and athlete management'}
                </div>
                {selectedStaff.availableHours && (
                  <>
                    <div className="text-[10px] uppercase font-bold text-[#667085] pt-1">Cross-Branch Clinical Hours</div>
                    <div className="text-[#131313] font-mono font-bold">{selectedStaff.availableHours}</div>
                  </>
                )}
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <span className="text-[#667085]">Manual Duty State:</span>
                {['Present', 'Checked Out', 'On Duty'].map(st => (
                  <button
                    key={st}
                    onClick={() => {
                      updateStaff(selectedStaff.id, { attendanceStatus: st as any });
                      setSelectedStaff({ ...selectedStaff, attendanceStatus: st as any });
                    }}
                    className={`px-3 py-1.5 text-xs font-heading font-bold uppercase rounded border transition-colors ${
                      selectedStaff.attendanceStatus === st
                        ? 'bg-[#131313] border-[#131313] text-[#ddca24]'
                        : 'bg-white border-neutral-200 text-[#667085] hover:text-[#131313]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Add Staff Modal */}
      {showAddStaffModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white border border-[#e4e7eb] rounded-lg p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#e4e7eb]">
              <h3 className="font-heading text-xl font-black text-[#131313] uppercase">Add Workforce Member</h3>
              <button onClick={() => setShowAddStaffModal(false)} className="text-[#667085] hover:text-[#131313]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStaff} className="mt-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#667085] uppercase font-bold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samar Patel"
                    value={newStaffForm.name}
                    onChange={e => setNewStaffForm({ ...newStaffForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-[#e4e7eb] rounded text-[#131313] font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[#667085] uppercase font-bold mb-1">Phone</label>
                  <input
                    type="text"
                    placeholder="+91 98200..."
                    value={newStaffForm.phone}
                    onChange={e => setNewStaffForm({ ...newStaffForm, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-[#e4e7eb] rounded text-[#131313] font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#667085] uppercase font-bold mb-1">Role Title</label>
                  <input
                    type="text"
                    required
                    value={newStaffForm.role}
                    onChange={e => setNewStaffForm({ ...newStaffForm, role: e.target.value as any })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-[#e4e7eb] rounded text-[#131313] font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[#667085] uppercase font-bold mb-1">Category</label>
                  <select
                    value={newStaffForm.category}
                    onChange={e => setNewStaffForm({ ...newStaffForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-[#e4e7eb] rounded text-[#131313] font-medium"
                  >
                    <option value="Employee">Employee (Salaried)</option>
                    <option value="Fitness Professional">Fitness Professional (PT)</option>
                    <option value="Medical & Visiting Professional">Medical & Specialist (Doctor)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#667085] uppercase font-bold mb-1">Primary Location</label>
                  <select
                    value={newStaffForm.primaryBranch}
                    onChange={e => setNewStaffForm({ ...newStaffForm, primaryBranch: e.target.value as any })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-[#e4e7eb] rounded text-[#131313] font-medium"
                  >
                    <option value="gym-a">Bandra West</option>
                    <option value="gym-b">Worli Seaface</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#667085] uppercase font-bold mb-1">Rate (INR)</label>
                  <input
                    type="number"
                    value={newStaffForm.rateINR}
                    onChange={e => setNewStaffForm({ ...newStaffForm, rateINR: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-[#e4e7eb] rounded text-[#131313] font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#667085] uppercase font-bold mb-1">Specialization & Credentials</label>
                <input
                  type="text"
                  value={newStaffForm.specialization}
                  onChange={e => setNewStaffForm({ ...newStaffForm, specialization: e.target.value })}
                  placeholder="e.g. Strength conditioning, Olympic lifting"
                  className="w-full px-3 py-2 bg-neutral-50 border border-[#e4e7eb] rounded text-[#131313]"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-[#e4e7eb]">
                <button
                  type="button"
                  onClick={() => setShowAddStaffModal(false)}
                  className="px-4 py-2 bg-neutral-100 text-[#131313] font-heading font-bold uppercase rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary-yellow py-2 px-5"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

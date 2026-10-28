import React, { useState, useMemo } from 'react';
import { useGym } from '../../context/GymContext';
import { Member } from '../../types/gym';
import { AnimatedReveal } from '../common/AnimatedReveal';
import { MaxfiitButton } from '../common/MaxfiitButton';
import { ApproachLiner } from '../common/ApproachLiner';
import { 
  Users, 
  Search, 
  Plus, 
  QrCode, 
  Phone, 
  Mail, 
  X,
  CreditCard,
  Calendar,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export const MembersModule: React.FC = () => {
  const { members, activeBranchId, addMember, updateMember, plans } = useGym();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newMemberForm, setNewMemberForm] = useState({
    name: '',
    email: '',
    phone: '',
    branchId: 'gym-a' as 'gym-a' | 'gym-b',
    planId: 'plan-1',
    planName: 'Annual All-Access',
    startDate: new Date().toISOString().substring(0, 10),
    expiryDate: new Date(Date.now() + 365*24*60*60*1000).toISOString().substring(0, 10),
    status: 'Active' as const,
    outstandingDues: 0,
    emergencyName: '',
    emergencyRelationship: 'Spouse',
    emergencyPhone: '',
    notes: '',
  });

  const filteredMembers = useMemo(() => {
    return members.filter(m => {
      const matchBranch = activeBranchId === 'all' || m.branchId === activeBranchId;
      const matchSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.memberCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.phone.includes(searchQuery);
      const matchStatus = statusFilter === 'All' || m.status === statusFilter;
      return matchBranch && matchSearch && matchStatus;
    });
  }, [members, activeBranchId, searchQuery, statusFilter]);

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberForm.name) return;

    const chosenPlan = plans.find(p => p.id === newMemberForm.planId);

    addMember({
      name: newMemberForm.name,
      email: newMemberForm.email || `${newMemberForm.name.toLowerCase().replace(/\s+/g, '.')}@client.in`,
      phone: newMemberForm.phone || '+91 98200 12345',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      branchId: newMemberForm.branchId,
      planId: newMemberForm.planId,
      planName: chosenPlan ? chosenPlan.name : newMemberForm.planName,
      startDate: newMemberForm.startDate,
      expiryDate: newMemberForm.expiryDate,
      status: newMemberForm.status,
      outstandingDues: Number(newMemberForm.outstandingDues),
      lastVisit: 'Never',
      emergencyContact: {
        name: newMemberForm.emergencyName || 'Emergency Contact',
        relationship: newMemberForm.emergencyRelationship,
        phone: newMemberForm.emergencyPhone || '+91 98200 99999'
      },
      notes: newMemberForm.notes || 'Enrolled in strength conditioning.'
    });

    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <AnimatedReveal animation="fade-up" delayMs={0}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white border border-[#e4e7eb] rounded-[4px] shadow-sm">
          <div>
            <div className="text-[#131313] bg-[#ddca24] px-2 py-0.5 rounded-[2px] text-[10px] font-mono font-bold uppercase tracking-wider inline-block mb-1">
              [// MEMBER ROSTER //]
            </div>
            <h2 className="font-heading text-3xl font-black text-[#131313] tracking-wide uppercase">
              All Members Directory
            </h2>
            <p className="text-xs text-[#667085] mt-0.5">
              Cross-branch access permissions, membership status, payment dues, and biometric turnstile token assignment
            </p>
          </div>

          <MaxfiitButton
            onClick={() => setShowAddModal(true)}
            variant="primary"
            className="self-start sm:self-auto py-2.5 px-5"
          >
            Enroll New Member
          </MaxfiitButton>
        </div>
      </AnimatedReveal>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#667085]" />
          <input
            type="text"
            placeholder="Search by name, ID (e.g. MF-101), or mobile..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e4e7eb] rounded text-xs text-[#131313] placeholder-[#667085] focus:outline-none focus:border-[#131313] shadow-sm font-medium"
          />
        </div>

        <div className="flex items-center space-x-1.5 w-full sm:w-auto">
          {['All', 'Active', 'Expiring Soon', 'Expired', 'Frozen'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-2 text-xs font-heading font-black uppercase tracking-wider rounded border transition-colors ${
                statusFilter === st
                  ? 'bg-[#131313] border-[#131313] text-[#ddca24]'
                  : 'bg-white border-[#e4e7eb] text-[#667085] hover:border-[#131313]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Roster Table */}
      <AnimatedReveal animation="fade-up" delayMs={100}>
        <div className="bg-white border border-[#e4e7eb] rounded-[4px] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] font-mono uppercase tracking-wider text-[#667085] bg-neutral-50 border-b border-[#e4e7eb]">
                <tr>
                  <th className="py-3 px-4 font-bold">Member</th>
                  <th className="py-3 px-4 font-bold">Home Location</th>
                  <th className="py-3 px-4 font-bold">Plan</th>
                  <th className="py-3 px-4 font-bold">Expiry Date</th>
                  <th className="py-3 px-4 font-bold">Dues</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold text-right">Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-sans">
                {filteredMembers.map(m => (
                  <tr 
                    key={m.id} 
                    onClick={() => setSelectedMember(m)}
                    className="hover:bg-neutral-50 cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={m.avatar} 
                          alt={m.name} 
                          className="w-9 h-9 rounded-full object-cover border border-[#e4e7eb] shrink-0"
                        />
                        <div>
                          <div className="font-bold text-[#131313] flex items-center space-x-2">
                            <span>{m.name}</span>
                            <span className="text-[10px] text-[#131313] font-mono font-normal bg-neutral-100 px-1.5 py-0.2 rounded-[2px]">[{m.memberCode}]</span>
                          </div>
                          <div className="text-[11px] text-[#667085]">{m.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[#131313] font-medium">
                      {m.branchId === 'gym-a' ? 'Bandra West' : 'Worli Seaface'}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#131313]">{m.planName}</div>
                      <div className="text-[10px] text-[#667085]">{m.totalVisits} recorded check-ins</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#667085]">
                      {m.expiryDate}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold">
                      {m.outstandingDues > 0 ? (
                        <span className="text-red-600">₹{m.outstandingDues.toLocaleString('en-IN')}</span>
                      ) : (
                        <span className="text-emerald-600">Clear</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-[2px] text-[10px] font-heading font-black uppercase tracking-wider ${
                        m.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : m.status === 'Expiring Soon'
                          ? 'bg-amber-100 text-amber-800 animate-pulse'
                          : m.status === 'Frozen'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMember(m);
                        }}
                        className="px-3 py-1 bg-white hover:bg-[#131313] hover:text-[#ddca24] text-[#131313] text-[11px] font-heading font-black uppercase rounded-[2px] border border-[#e4e7eb] transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AnimatedReveal>

      {/* Member Profile Drawer */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-xl bg-white border border-[#e4e7eb] rounded-lg p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            
            <div className="flex items-start justify-between pb-4 border-b border-[#e4e7eb]">
              <div className="flex items-center space-x-4">
                <img 
                  src={selectedMember.avatar} 
                  alt={selectedMember.name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#131313]" 
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-heading text-2xl font-black text-[#131313] uppercase">{selectedMember.name}</h3>
                    <span className="font-mono text-xs text-[#131313] bg-[#ddca24] px-1.5 py-0.5 rounded font-bold">[{selectedMember.memberCode}]</span>
                  </div>
                  <p className="text-xs text-[#667085]">{selectedMember.email} • {selectedMember.phone}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedMember(null)}
                className="p-1 text-[#667085] hover:text-[#131313]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-neutral-50 border border-neutral-200 rounded text-center">
                <div>
                  <div className="text-[10px] text-[#667085] uppercase font-bold">Plan</div>
                  <div className="font-heading font-black text-[#131313] mt-0.5">{selectedMember.planName}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#667085] uppercase font-bold">Valid Until</div>
                  <div className="font-mono font-bold text-[#131313] mt-0.5">{selectedMember.expiryDate}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#667085] uppercase font-bold">Total Visits</div>
                  <div className="font-heading font-black text-[#131313] mt-0.5">{selectedMember.totalVisits} sessions</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#667085] uppercase font-bold">Balance Due</div>
                  <div className="font-mono font-black text-[#131313] mt-0.5">
                    ₹{selectedMember.outstandingDues.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <button
                  onClick={() => {
                    updateMember(selectedMember.id, { 
                      status: 'Active',
                      expiryDate: new Date(Date.now() + 365*24*60*60*1000).toISOString().substring(0, 10)
                    });
                    setSelectedMember({ ...selectedMember, status: 'Active' });
                  }}
                  className="px-3.5 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-heading font-black uppercase rounded text-xs"
                >
                  Renew 1 Year
                </button>

                <button
                  onClick={() => {
                    const newStatus = selectedMember.status === 'Frozen' ? 'Active' : 'Frozen';
                    updateMember(selectedMember.id, { status: newStatus });
                    setSelectedMember({ ...selectedMember, status: newStatus });
                  }}
                  className="px-3.5 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-900 font-heading font-black uppercase rounded text-xs"
                >
                  {selectedMember.status === 'Frozen' ? 'Unfreeze Access' : 'Freeze 30 Days'}
                </button>

                <button
                  onClick={() => {
                    const newBranch = selectedMember.branchId === 'gym-a' ? 'gym-b' : 'gym-a';
                    updateMember(selectedMember.id, { branchId: newBranch });
                    setSelectedMember({ ...selectedMember, branchId: newBranch });
                  }}
                  className="px-3.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-[#131313] font-heading font-black uppercase rounded text-xs"
                >
                  Switch Branch ({selectedMember.branchId === 'gym-a' ? 'To Worli' : 'To Bandra'})
                </button>
              </div>

              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded space-y-1.5">
                <div className="text-[10px] uppercase font-bold text-[#667085]">Emergency Contact</div>
                <div className="text-[#131313] font-medium">
                  {selectedMember.emergencyContact.name} ({selectedMember.emergencyContact.relationship}) — {selectedMember.emergencyContact.phone}
                </div>
                <div className="text-[10px] uppercase font-bold text-[#667085] pt-1">Trainer & Clinical Notes</div>
                <div className="text-[#667085] italic">
                  "{selectedMember.notes}"
                </div>
              </div>

              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded flex items-center justify-between">
                <div>
                  <div className="font-heading font-black text-[#131313] uppercase">Optical Turnstile QR Token</div>
                  <div className="text-[11px] text-[#667085] font-mono">{selectedMember.qrToken}</div>
                </div>
                <QrCode className="w-8 h-8 text-[#131313]" />
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white border border-[#e4e7eb] rounded-lg p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#e4e7eb]">
              <h3 className="font-heading text-xl font-black text-[#131313] uppercase">Enroll New Member</h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#667085] hover:text-[#131313]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMember} className="mt-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#667085] uppercase font-bold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={newMemberForm.name}
                    onChange={e => setNewMemberForm({ ...newMemberForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-[#e4e7eb] rounded text-[#131313] font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[#667085] uppercase font-bold mb-1">Mobile Phone</label>
                  <input
                    type="text"
                    placeholder="+91 98200..."
                    value={newMemberForm.phone}
                    onChange={e => setNewMemberForm({ ...newMemberForm, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-[#e4e7eb] rounded text-[#131313] font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#667085] uppercase font-bold mb-1">Home Location</label>
                  <select
                    value={newMemberForm.branchId}
                    onChange={e => setNewMemberForm({ ...newMemberForm, branchId: e.target.value as any })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-[#e4e7eb] rounded text-[#131313] font-medium"
                  >
                    <option value="gym-a">Bandra West</option>
                    <option value="gym-b">Worli Seaface</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#667085] uppercase font-bold mb-1">Plan Package</label>
                  <select
                    value={newMemberForm.planId}
                    onChange={e => {
                      const p = plans.find(pl => pl.id === e.target.value);
                      setNewMemberForm({
                        ...newMemberForm,
                        planId: e.target.value,
                        planName: p ? p.name : ''
                      });
                    }}
                    className="w-full px-3 py-2 bg-neutral-50 border border-[#e4e7eb] rounded text-[#131313] font-medium"
                  >
                    {plans.map(p => (
                      <option key={p.id} value={p.id}>{p.name} (₹{p.priceINR.toLocaleString('en-IN')})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#667085] uppercase font-bold mb-1">Health & Coaching Notes</label>
                <textarea
                  rows={2}
                  placeholder="Injuries, medical clearance, or specific workout goals..."
                  value={newMemberForm.notes}
                  onChange={e => setNewMemberForm({ ...newMemberForm, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-[#e4e7eb] rounded text-[#131313]"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-[#e4e7eb]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-neutral-100 text-[#131313] font-heading font-bold uppercase rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary-yellow py-2 px-5"
                >
                  Confirm Enrollment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { useGym } from '../../context/GymContext';
import { 
  IndianRupee, 
  TrendingUp, 
  Plus, 
  X,
  Activity
} from 'lucide-react';

export const FinanceModule: React.FC = () => {
  const { 
    branches, 
    activeBranchId, 
    expenses, 
    addExpense 
  } = useGym();

  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [newExp, setNewExp] = useState({
    category: 'TechnoGym Maintenance' as any,
    amountINR: 25000,
    branchId: 'gym-a' as 'gym-a' | 'gym-b',
    payee: '',
    notes: ''
  });

  const totalRevenue = useMemo(() => {
    if (activeBranchId === 'all') {
      return branches.reduce((acc, b) => acc + b.monthlyRevenue, 0);
    }
    const target = branches.find(b => b.id === activeBranchId);
    return target ? target.monthlyRevenue : 0;
  }, [branches, activeBranchId]);

  const totalExpenses = useMemo(() => {
    if (activeBranchId === 'all') {
      return branches.reduce((acc, b) => acc + b.monthlyExpenses, 0);
    }
    const target = branches.find(b => b.id === activeBranchId);
    return target ? target.monthlyExpenses : 0;
  }, [branches, activeBranchId]);

  const operatingProfit = totalRevenue - totalExpenses;

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExp.amountINR) return;

    addExpense({
      category: newExp.category,
      amountINR: Number(newExp.amountINR),
      branchId: newExp.branchId,
      date: new Date().toISOString().substring(0, 10),
      payee: newExp.payee || 'Vendor / Contractor',
      status: 'Paid',
      notes: newExp.notes || 'Operating facility expense'
    });

    setShowAddExpenseModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white border border-[#e4e7eb] rounded-lg shadow-sm">
        <div>
          <div className="text-[#131313] bg-[#ddca24] px-2 py-0.5 rounded text-[11px] font-heading font-black uppercase tracking-wider inline-block mb-1">
            FINANCIAL PERFORMANCE
          </div>
          <h2 className="font-heading text-3xl font-black text-[#131313] tracking-wide uppercase">
            Revenue Collections & Operating Expenses
          </h2>
          <p className="text-xs text-[#667085] mt-0.5">
            Clear segregation between membership revenue, facility leases, electricity utilities and coach payouts
          </p>
        </div>

        <button
          onClick={() => setShowAddExpenseModal(true)}
          className="btn-primary-yellow"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Record Expense</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="maxfiit-card-light p-6 space-y-1 border-t-4 border-t-[#ddca24]">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#667085]">Monthly Revenue</span>
          <div className="text-3xl font-black font-heading text-[#131313]">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-emerald-600 font-semibold">
            Membership dues and PT packages
          </div>
        </div>

        <div className="maxfiit-card-light p-6 space-y-1 border-t-4 border-t-[#131313]">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#667085]">Operating Expenses</span>
          <div className="text-3xl font-black font-heading text-[#131313]">
            ₹{totalExpenses.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-[#667085]">
            Lease rent, staff payroll and maintenance
          </div>
        </div>

        <div className="maxfiit-card-light p-6 space-y-1 border-t-4 border-t-emerald-500">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#667085]">Operating Profit (EBITDA)</span>
          <div className="text-3xl font-black font-heading text-emerald-700">
            ₹{operatingProfit.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-emerald-700 font-bold">
            Positive branch cash flow
          </div>
        </div>
      </div>

      {/* Expense Ledger */}
      <div className="maxfiit-card-light p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#e4e7eb]">
          <h3 className="font-heading text-xl font-black text-[#131313] uppercase tracking-wide">
            Facility Expense Ledger
          </h3>
          <span className="text-xs font-mono text-[#667085]">Mumbai Facilities</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] uppercase tracking-wider text-[#667085] bg-neutral-50 border-b border-[#e4e7eb]">
              <tr>
                <th className="py-2.5 px-3 font-bold">Category</th>
                <th className="py-2.5 px-3 font-bold">Payee / Vendor</th>
                <th className="py-2.5 px-3 font-bold">Branch</th>
                <th className="py-2.5 px-3 font-bold">Date</th>
                <th className="py-2.5 px-3 font-bold">Amount</th>
                <th className="py-2.5 px-3 font-bold">Status</th>
                <th className="py-2.5 px-3 font-bold">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {expenses.map(exp => (
                <tr key={exp.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="py-3 px-3 font-bold text-[#131313]">{exp.category}</td>
                  <td className="py-3 px-3 text-[#667085]">{exp.payee}</td>
                  <td className="py-3 px-3 text-[#667085]">
                    {exp.branchId === 'gym-a' ? 'Bandra West' : 'Worli Seaface'}
                  </td>
                  <td className="py-3 px-3 text-[#667085] font-mono">{exp.date}</td>
                  <td className="py-3 px-3 font-mono font-bold text-[#131313]">
                    ₹{exp.amountINR.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-heading font-black uppercase bg-emerald-100 text-emerald-800">
                      {exp.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#667085] max-w-xs truncate">{exp.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Expense Modal */}
      {showAddExpenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white border border-[#e4e7eb] rounded-lg p-6 shadow-2xl text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="font-heading text-xl font-black text-[#131313] uppercase">Record Operating Expense</h3>
              <button onClick={() => setShowAddExpenseModal(false)} className="text-[#667085] hover:text-[#131313]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddExpense} className="space-y-3">
              <div>
                <label className="block text-[#667085] uppercase font-bold mb-1">Expense Category</label>
                <select
                  value={newExp.category}
                  onChange={e => setNewExp({ ...newExp, category: e.target.value as any })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-[#e4e7eb] rounded text-[#131313] font-medium"
                >
                  <option value="Facility Rent">Facility Rent</option>
                  <option value="Electricity & HVAC">Electricity & HVAC</option>
                  <option value="TechnoGym Maintenance">TechnoGym Maintenance</option>
                  <option value="Trainer Commissions">Trainer Commissions</option>
                  <option value="Medical Retainers">Medical Retainers</option>
                  <option value="Luxury Amenities & Towel Service">Amenities & Towel Service</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#667085] uppercase font-bold mb-1">Branch</label>
                  <select
                    value={newExp.branchId}
                    onChange={e => setNewExp({ ...newExp, branchId: e.target.value as any })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-[#e4e7eb] rounded text-[#131313] font-medium"
                  >
                    <option value="gym-a">Bandra West</option>
                    <option value="gym-b">Worli Seaface</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#667085] uppercase font-bold mb-1">Amount (INR)</label>
                  <input
                    type="number"
                    required
                    value={newExp.amountINR}
                    onChange={e => setNewExp({ ...newExp, amountINR: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-[#e4e7eb] rounded text-[#131313] font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#667085] uppercase font-bold mb-1">Payee / Vendor</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Adani Electricity Mumbai"
                  value={newExp.payee}
                  onChange={e => setNewExp({ ...newExp, payee: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-[#e4e7eb] rounded text-[#131313] font-medium"
                />
              </div>

              <div>
                <label className="block text-[#667085] uppercase font-bold mb-1">Invoice Notes</label>
                <textarea
                  rows={2}
                  value={newExp.notes}
                  onChange={e => setNewExp({ ...newExp, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-[#e4e7eb] rounded text-[#131313]"
                  placeholder="Invoice number and payment reference..."
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setShowAddExpenseModal(false)}
                  className="px-4 py-2 bg-neutral-100 text-[#131313] font-heading font-bold uppercase rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary-yellow py-2 px-5"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

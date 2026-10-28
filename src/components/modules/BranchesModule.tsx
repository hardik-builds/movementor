import React from 'react';
import { useGym } from '../../context/GymContext';
import { 
  Building2, 
  MapPin, 
  Clock, 
  User, 
  ArrowRight
} from 'lucide-react';

export const BranchesModule: React.FC = () => {
  const { branches, setActiveBranchId } = useGym();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white border border-[#e4e7eb] rounded-lg shadow-sm">
        <div>
          <div className="text-[#131313] bg-[#ddca24] px-2 py-0.5 rounded text-[11px] font-heading font-black uppercase tracking-wider inline-block mb-1">
            LOCATIONS
          </div>
          <h2 className="font-heading text-3xl font-black text-[#131313] tracking-wide uppercase">
            Branch Operations: Bandra West & Worli Seaface
          </h2>
          <p className="text-xs text-[#667085] mt-0.5">
            Individual branch performance, facilities, local management and membership count
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {branches.map(b => (
          <div
            key={b.id}
            className="maxfiit-card-light p-6 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] text-[#131313] bg-[#ddca24] px-1.5 py-0.5 rounded font-heading font-black uppercase tracking-wider">
                  LOCATION CODE: {b.code}
                </span>
                <h3 className="font-heading text-2xl font-black text-[#131313] uppercase tracking-wide mt-1">
                  {b.name}
                </h3>
                <p className="text-xs text-[#667085] mt-0.5">{b.tagline}</p>
              </div>

              <span className="px-2.5 py-1 bg-white border border-[#e4e7eb] text-[#131313] text-xs font-mono font-bold rounded shadow-sm">
                Rating {b.rating} / 5.0
              </span>
            </div>

            <div className="p-3.5 bg-neutral-50 border border-neutral-200 rounded text-xs space-y-2">
              <div className="flex items-center space-x-2 text-[#667085]">
                <MapPin className="w-4 h-4 text-[#131313] shrink-0" />
                <span className="text-[#131313] font-medium">{b.address}, {b.area}, {b.city}</span>
              </div>
              <div className="flex items-center space-x-2 text-[#667085]">
                <Clock className="w-4 h-4 text-[#131313] shrink-0" />
                <span>{b.operatingHours}</span>
              </div>
              <div className="flex items-center space-x-2 text-[#667085]">
                <User className="w-4 h-4 text-[#131313] shrink-0" />
                <span>General Manager: <strong className="text-[#131313]">{b.manager}</strong></span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center p-3.5 bg-white border border-neutral-200 rounded">
              <div>
                <div className="text-[10px] text-[#667085] uppercase font-bold">Active Members</div>
                <div className="text-lg font-heading font-black text-[#131313] mt-0.5">{b.activeMembers}</div>
              </div>
              <div>
                <div className="text-[10px] text-[#667085] uppercase font-bold">Monthly Revenue</div>
                <div className="text-lg font-heading font-black text-emerald-600 mt-0.5">₹{(b.monthlyRevenue / 100000).toFixed(1)}L</div>
              </div>
              <div>
                <div className="text-[10px] text-[#667085] uppercase font-bold">Operating Net</div>
                <div className="text-lg font-heading font-black text-[#131313] mt-0.5">₹{(b.operatingProfit / 100000).toFixed(1)}L</div>
              </div>
            </div>

            <button
              onClick={() => setActiveBranchId(b.id)}
              className="w-full btn-outline-light py-2 text-xs"
            >
              <span>Filter Entire Operations To {b.name}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

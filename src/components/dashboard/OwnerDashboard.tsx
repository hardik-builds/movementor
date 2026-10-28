import React, { useMemo, useState } from 'react';
import { useGym } from '../../context/GymContext';
import { AnimatedReveal } from '../common/AnimatedReveal';
import { TextReveal } from '../common/TextReveal';
import { ImageReveal } from '../common/ImageReveal';
import { MaxfiitButton } from '../common/MaxfiitButton';
import { ApproachLiner } from '../common/ApproachLiner';
import { InteractiveServiceCard } from '../common/InteractiveServiceCard';
import { ScheduleSection } from '../common/ScheduleSection';
import { GalleryMarquee } from '../common/GalleryMarquee';
import { 
  Users, 
  TrendingUp, 
  IndianRupee, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert, 
  ArrowUpRight, 
  Activity,
  ChevronRight,
  Stethoscope,
  Dumbbell,
  MapPin,
  Building2,
  Sparkles,
  QrCode,
  ShieldCheck
} from 'lucide-react';

interface OwnerDashboardProps {
  onNavigateTab: (tab: string) => void;
  onOpenQR: () => void;
}

export const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ onNavigateTab, onOpenQR }) => {
  const { 
    activeBranchId, 
    branches, 
    members, 
    staff, 
    attendance, 
    shifts, 
    leaves, 
    sessions, 
    expenses 
  } = useGym();

  const [activeServiceTab, setActiveServiceTab] = useState<number>(0);

  const filteredMembers = useMemo(() => {
    return activeBranchId === 'all' ? members : members.filter(m => m.branchId === activeBranchId);
  }, [members, activeBranchId]);

  const filteredStaff = useMemo(() => {
    return activeBranchId === 'all' ? staff : staff.filter(s => s.primaryBranch === activeBranchId || s.secondaryBranch === activeBranchId);
  }, [staff, activeBranchId]);

  const filteredAttendance = useMemo(() => {
    return activeBranchId === 'all' ? attendance : attendance.filter(a => a.branchId === activeBranchId);
  }, [attendance, activeBranchId]);

  const filteredExpenses = useMemo(() => {
    return activeBranchId === 'all' ? expenses : expenses.filter(e => e.branchId === activeBranchId);
  }, [expenses, activeBranchId]);

  const filteredSessions = useMemo(() => {
    return activeBranchId === 'all' ? sessions : sessions.filter(s => s.branchId === activeBranchId);
  }, [sessions, activeBranchId]);

  // Financial calculations
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
  const profitMargin = totalRevenue > 0 ? ((operatingProfit / totalRevenue) * 100).toFixed(1) : '0';

  const scheduledToday = filteredStaff.length;
  const presentToday = filteredStaff.filter(s => s.attendanceStatus === 'Present' || s.attendanceStatus === 'On Duty').length;
  const pendingLeaves = leaves.filter(l => l.status === 'Pending').length;
  const pendingPayouts = filteredSessions.filter(s => s.payableStatus === 'Submitted').length;
  const activeVisitsNow = filteredAttendance.filter(a => a.status === 'Active Session' && a.targetType === 'member').length;

  return (
    <div className="space-y-12">
      
      {/* =========================================================================
          SECTION 1: HERO SECTION (Exact Maxfiit Webflow Design Language)
         ========================================================================= */}
      <section className="relative bg-white border border-[#e4e7eb] rounded-[4px] p-4 sm:p-8 lg:p-12 shadow-sm overflow-hidden min-w-0">
        
        {/* Subtle background grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e4e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center min-w-0">
          
          {/* Left Column: Heading, Subtitle & Interactive Action Buttons */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 min-w-0">
            
            {/* Top Subtitle Badge */}
            <AnimatedReveal animation="fade-up" delayMs={0}>
              <div className="inline-flex items-center space-x-2 px-2.5 sm:px-3 py-1 bg-[#131313] text-[#ddca24] rounded-[2px] text-[10px] sm:text-xs font-heading font-black tracking-wider uppercase max-w-full">
                <span className="w-2 h-2 rounded-full bg-[#ddca24] animate-ping shrink-0" />
                <span className="truncate">// MOVEMENTOR • MUMBAI CENTRAL OPERATIONS //</span>
              </div>
            </AnimatedReveal>

            {/* Headline with Authentic Curtain Text Reveal */}
            <div className="space-y-1 min-w-0">
              <div className="min-w-0">
                <TextReveal delayMs={100} as="h1" className="font-heading text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#131313] uppercase tracking-tight leading-[0.94] break-words">
                  BUILD STRENGTH.
                </TextReveal>
              </div>
              <div className="min-w-0">
                <TextReveal delayMs={250} as="h1" className="font-heading text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#131313] uppercase tracking-tight leading-[0.94] break-words">
                  <span className="bg-[#ddca24] text-[#131313] px-2 sm:px-3 py-0.5 inline-block transform hover:-rotate-1 transition-transform duration-300 max-w-full break-words">
                    SCALE OPERATIONS.
                  </span>
                </TextReveal>
              </div>
            </div>

            {/* Description */}
            <AnimatedReveal animation="fade-up" delayMs={350}>
              <p className="text-xs sm:text-sm md:text-base text-[#667085] max-w-xl font-normal leading-relaxed break-words">
                Centralized multi-branch gym workforce, optical turnstile telemetry, attendance tracking, trainer commissions, and unit P&L for Bandra West & Worli Seaface facilities.
              </p>
            </AnimatedReveal>

            {/* CTA Buttons with Authentic Maxfiit Dual-Sliding Arrows */}
            <AnimatedReveal animation="fade-up" delayMs={450}>
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2 w-full">
                <MaxfiitButton
                  onClick={onOpenQR}
                  variant="primary"
                  className="py-3 px-4 sm:px-6 text-xs sm:text-sm w-full sm:w-auto"
                >
                  Simulate QR Turnstile
                </MaxfiitButton>

                <MaxfiitButton
                  onClick={() => onNavigateTab('branches')}
                  variant="dark"
                  className="py-3 px-4 sm:px-6 text-xs sm:text-sm w-full sm:w-auto"
                >
                  Branch Economics
                </MaxfiitButton>

                <MaxfiitButton
                  onClick={() => onNavigateTab('members')}
                  variant="outline"
                  className="py-3 px-4 sm:px-5 text-xs sm:text-sm w-full sm:w-auto"
                >
                  Member Roster
                </MaxfiitButton>
              </div>
            </AnimatedReveal>

            {/* Live Operational Counters */}
            <AnimatedReveal animation="fade-up" delayMs={550}>
              <div className="pt-4 sm:pt-6 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 border-t border-neutral-100">
                <div className="group cursor-default p-2.5 bg-neutral-50 sm:bg-transparent rounded-[3px] sm:rounded-none">
                  <div className="text-[10px] font-mono font-bold text-[#667085] uppercase tracking-wider group-hover:text-[#131313] transition-colors">
                    Active Members
                  </div>
                  <div className="text-2xl sm:text-3xl font-black font-heading text-[#131313]">
                    {filteredMembers.length}
                  </div>
                </div>

                <div className="group cursor-default">
                  <div className="text-[10px] font-mono font-bold text-[#667085] uppercase tracking-wider group-hover:text-[#131313] transition-colors">
                    Floor Check-Ins
                  </div>
                  <div className="text-2xl sm:text-3xl font-black font-heading text-[#131313]">
                    {activeVisitsNow} Live
                  </div>
                </div>

                <div className="group cursor-default">
                  <div className="text-[10px] font-mono font-bold text-[#667085] uppercase tracking-wider group-hover:text-[#131313] transition-colors">
                    Workforce On Duty
                  </div>
                  <div className="text-2xl sm:text-3xl font-black font-heading text-[#131313]">
                    {presentToday} / {scheduledToday}
                  </div>
                </div>
              </div>
            </AnimatedReveal>

          </div>

          {/* Right Column: Hero Image with Maxfiit Unveil & Floating Badges */}
          <div className="lg:col-span-5 relative">
            <AnimatedReveal animation="scale-in" delayMs={200}>
              <div className="relative group">
                {/* Official Maxfiit Athlete Hero Image with Parallax */}
                <ImageReveal
                  src="https://cdn.prod.website-files.com/682c50a8fd5c0f71c753acb4/682d9b0e63404703dda88379_Hero%20Image.webp"
                  alt="Maxfiit High Performance Athlete"
                  aspectRatio="aspect-[4/5]"
                  delayMs={300}
                  className="shadow-2xl border border-neutral-300"
                />

                {/* Floating Top Badge */}
                <div className="absolute -top-3 -right-3 bg-[#131313] text-[#ddca24] px-3.5 py-1.5 rounded-[3px] border border-[#ddca24] text-[11px] font-heading font-black tracking-wider uppercase shadow-xl transform group-hover:scale-105 transition-transform duration-300">
                  ★ BANDRA & WORLI LIVE
                </div>

                {/* Floating Bottom Card: Telemetry status */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 border border-[#e4e7eb] rounded-[3px] shadow-xl flex items-center justify-between transform group-hover:-translate-y-1 transition-transform duration-400">
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-mono uppercase text-[#667085] font-bold">
                      Optical Turnstiles Connected
                    </div>
                    <div className="font-heading font-black text-sm text-[#131313] uppercase flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Mumbai Gate Latency: 12ms</span>
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-[3px] bg-[#ddca24] text-[#131313] flex items-center justify-center font-heading font-black text-sm shadow-sm shrink-0">
                    MV
                  </div>
                </div>

              </div>
            </AnimatedReveal>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: CONTINUOUS RUNNING MARQUEE TICKER (Brand Signature)
         ========================================================================= */}
      <div className="bg-[#131313] text-[#ddca24] py-3.5 overflow-hidden rounded-[3px] shadow-sm select-none">
        <div className="animate-marquee whitespace-nowrap text-xs sm:text-sm font-heading font-black tracking-widest uppercase flex items-center space-x-8">
          <span>• BANDRA WEST FLAGSHIP FACILITY</span>
          <span className="text-white">• WORLI SEAFACE ATHLETIC CLUB</span>
          <span>• REAL-TIME OPTICAL TURNSTILE TELEMETRY</span>
          <span className="text-white">• CROSS-BRANCH SPORTS PHYSICIAN CONSULTATIONS</span>
          <span>• AUTOMATED COACH PAYOUT CALCULATIONS</span>
          <span className="text-white">• CONFLICT-FREE SHIFT SCHEDULING</span>
          <span>• BANDRA WEST FLAGSHIP FACILITY</span>
          <span className="text-white">• WORLI SEAFACE ATHLETIC CLUB</span>
          <span>• REAL-TIME OPTICAL TURNSTILE TELEMETRY</span>
          <span className="text-white">• CROSS-BRANCH SPORTS PHYSICIAN CONSULTATIONS</span>
        </div>
      </div>

      {/* =========================================================================
          SECTION 3: KEY FINANCIAL & OPERATIONAL METRICS (Staggered Cards)
         ========================================================================= */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[10px] font-mono font-bold text-[#667085] uppercase tracking-wider">
              [// EXECUTIVE METRICS //]
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-[#131313] uppercase">
              Financial & Operational Snapshot
            </h2>
          </div>
          <ApproachLiner className="w-32 hidden sm:block" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Revenue */}
          <AnimatedReveal animation="fade-up" delayMs={50}>
            <div className="bg-white border border-[#e4e7eb] rounded-[4px] p-6 space-y-2 border-t-4 border-t-[#ddca24] hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="flex items-center justify-between text-[#667085]">
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Monthly Collections</span>
                <div className="w-8 h-8 rounded-[3px] bg-[#ddca24]/20 flex items-center justify-center text-[#131313]">
                  <IndianRupee className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black font-heading text-[#131313] tracking-tight">
                ₹{totalRevenue.toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-emerald-600 font-semibold flex items-center space-x-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+18.4% vs last billing cycle</span>
              </div>
            </div>
          </AnimatedReveal>

          {/* Card 2: Operating Expenses */}
          <AnimatedReveal animation="fade-up" delayMs={150}>
            <div className="bg-white border border-[#e4e7eb] rounded-[4px] p-6 space-y-2 border-t-4 border-t-[#131313] hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="flex items-center justify-between text-[#667085]">
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Operating Expenses</span>
                <div className="w-8 h-8 rounded-[3px] bg-neutral-100 flex items-center justify-center text-[#131313]">
                  <Activity className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black font-heading text-[#131313] tracking-tight">
                ₹{totalExpenses.toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-[#667085]">
                Rent, utilities, trainer commissions & payroll
              </div>
            </div>
          </AnimatedReveal>

          {/* Card 3: Operating Profit */}
          <AnimatedReveal animation="fade-up" delayMs={250}>
            <div className="bg-white border border-[#e4e7eb] rounded-[4px] p-6 space-y-2 border-t-4 border-t-emerald-500 hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="flex items-center justify-between text-[#667085]">
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Operating Profit (EBITDA)</span>
                <div className="w-8 h-8 rounded-[3px] bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black font-heading text-emerald-700 tracking-tight">
                ₹{operatingProfit.toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-emerald-700 font-bold">
                {profitMargin}% net operating profit margin
              </div>
            </div>
          </AnimatedReveal>

          {/* Card 4: Pending Approvals */}
          <AnimatedReveal animation="fade-up" delayMs={350}>
            <div className="bg-white border border-[#e4e7eb] rounded-[4px] p-6 space-y-2 border-t-4 border-t-amber-500 hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="flex items-center justify-between text-[#667085]">
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Pending Sign-Offs</span>
                <div className="w-8 h-8 rounded-[3px] bg-amber-50 flex items-center justify-center text-amber-700">
                  <ShieldAlert className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black font-heading text-[#131313] tracking-tight">
                {pendingLeaves + pendingPayouts} Items
              </div>
              <div className="text-xs text-[#131313] font-bold">
                {pendingLeaves} leaves • {pendingPayouts} coach payouts pending
              </div>
            </div>
          </AnimatedReveal>

        </div>
      </div>

      {/* =========================================================================
          SECTION 4: INTERACTIVE TRAINING SERVICES & DISCIPLINES (Maxfiit Card Expand)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono font-bold text-[#667085] uppercase tracking-wider">
              [// DISCIPLINE PROGRAMMING //]
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-[#131313] uppercase tracking-tight">
              ATHLETIC TRAINING DISCIPLINES
            </h2>
            <p className="text-xs sm:text-sm text-[#667085] max-w-xl">
              Equipped with Eleiko Olympic barbells, Keiser pneumatic resistance, and sports medicine assessment consultation rooms.
            </p>
          </div>

          <MaxfiitButton
            onClick={() => onNavigateTab('professionals')}
            variant="outline"
            className="self-start md:self-auto py-2 px-4"
          >
            Manage Specialist Roster
          </MaxfiitButton>
        </div>

        <ApproachLiner delayMs={100} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatedReveal animation="fade-up" delayMs={50}>
            <InteractiveServiceCard
              number="[01]"
              category="Strength & Power"
              title="Power Lifting & Compound Mechanics"
              description="Heavy squat, bench press, deadlift and clean & jerk periodization coached by Samar Patel with calibrated competition plates."
              capacity="20 Athletes / Bay"
              image="https://cdn.prod.website-files.com/682c50a8fd5c0f71c753acb4/68381f633b3c7e2666d0cf8f_Service%20Image-p-500.webp"
              coaches={['Samar Patel', 'Vikram Sen']}
              onSelect={() => onNavigateTab('attendance')}
            />
          </AnimatedReveal>

          <AnimatedReveal animation="fade-up" delayMs={150}>
            <InteractiveServiceCard
              number="[02]"
              category="Conditioning"
              title="Athletic Strength & Conditioning"
              description="Sled pushes, functional plyometrics, agility ladders and metabolic intervals to optimize aerobic recovery and explosive power."
              capacity="25 Athletes / Bay"
              image="https://cdn.prod.website-files.com/682c50a8fd5c0f71c753acb4/684e532dbfe55d27a0d808d3_Service%20Image%202-p-500.webp"
              coaches={['Kavita Sundaram']}
              onSelect={() => onNavigateTab('attendance')}
            />
          </AnimatedReveal>

          <AnimatedReveal animation="fade-up" delayMs={250}>
            <InteractiveServiceCard
              number="[03]"
              category="Sports Medicine"
              title="Sports Rehabilitation & Joint Health"
              description="Clinical movement screens, spine decompression, kinetic assessment, and dry needling overseen by Dr. Farokh Mehta & Dr. Ananya."
              capacity="8 Consultations / Day"
              image="https://cdn.prod.website-files.com/682c50a8fd5c0f71c753acb4/684e532cdec63d121bf2e2a3_Service%20Image%203-p-500.webp"
              coaches={['Dr. Farokh Mehta', 'Dr. Ananya Deshmukh']}
              onSelect={() => onNavigateTab('professionals')}
            />
          </AnimatedReveal>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: LIVE TURNSTILE TELEMETRY & ATTENTION REQUIRED ACTION CENTER
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Turnstile Check-Ins Feed with Reveal */}
        <AnimatedReveal animation="fade-up" delayMs={100} className="lg:col-span-2">
          <div className="bg-white border border-[#e4e7eb] rounded-[4px] p-6 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#e4e7eb] gap-2">
              <div>
                <div className="text-[10px] font-mono font-bold text-[#667085] uppercase tracking-wider">
                  [// TURNSTILE ACCESS //]
                </div>
                <h3 className="font-heading text-xl font-black text-[#131313] uppercase tracking-wide">
                  Live Mumbai Turnstile Telemetry Feed
                </h3>
              </div>
              <MaxfiitButton
                onClick={() => onNavigateTab('attendance')}
                variant="outline"
                className="py-1.5 px-3 text-[11px] self-start sm:self-auto"
              >
                Full Access Logs
              </MaxfiitButton>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[11px] font-mono uppercase tracking-wider text-[#667085] bg-neutral-50 border-b border-[#e4e7eb]">
                  <tr>
                    <th className="py-2.5 px-3 font-bold">Individual</th>
                    <th className="py-2.5 px-3 font-bold">Plan / Category</th>
                    <th className="py-2.5 px-3 font-bold">Facility</th>
                    <th className="py-2.5 px-3 font-bold">Check-In</th>
                    <th className="py-2.5 px-3 font-bold">Access Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 font-sans">
                  {filteredAttendance.map(att => (
                    <tr key={att.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="py-3 px-3 font-bold text-[#131313] flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${att.status === 'Active Session' ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-400'}`} />
                        <span className="truncate">{att.targetName}</span>
                      </td>
                      <td className="py-3 px-3 text-[#667085]">{att.roleOrPlan}</td>
                      <td className="py-3 px-3 text-[#667085]">
                        {att.branchId === 'gym-a' ? 'Bandra West' : 'Worli Seaface'}
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-[#131313]">{att.checkInTime}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-[2px] text-[10px] font-heading font-black uppercase tracking-wider ${
                          att.status === 'Active Session'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-neutral-100 text-neutral-600'
                        }`}>
                          {att.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedReveal>

        {/* Right Column: Attention Required Action Center */}
        <AnimatedReveal animation="fade-up" delayMs={200}>
          <div className="bg-white border border-[#e4e7eb] rounded-[4px] p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#e4e7eb]">
              <div>
                <div className="text-[10px] font-mono font-bold text-[#667085] uppercase tracking-wider">
                  [// WORKFLOW QUEUE //]
                </div>
                <h3 className="font-heading text-xl font-black text-[#131313] uppercase tracking-wide">
                  Attention Required
                </h3>
              </div>
              <span className="text-[10px] font-heading font-black uppercase px-2 py-0.5 rounded-[2px] bg-[#131313] text-[#ddca24]">
                {pendingLeaves + pendingPayouts} Urgent
              </span>
            </div>

            <div className="space-y-3">
              {/* Pending Leaves */}
              {leaves.filter(l => l.status === 'Pending').map(lev => (
                <div key={lev.id} className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-[3px] text-xs space-y-2 hover:border-[#131313] transition-colors">
                  <div className="flex items-center justify-between font-bold text-[#131313]">
                    <span>Staff Leave Request</span>
                    <span className="font-mono text-neutral-500">{lev.daysCount} Days</span>
                  </div>
                  <p className="text-[#667085]">
                    <strong className="text-[#131313]">{lev.staffName}</strong> ({lev.role}) applied for {lev.leaveType}. Reason: {lev.reason}
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-neutral-400 font-mono">{lev.startDate}</span>
                    <button
                      onClick={() => onNavigateTab('shifts')}
                      className="px-3 py-1 bg-[#131313] text-[#ddca24] hover:bg-neutral-800 font-heading font-bold text-[10px] uppercase rounded-[2px] transition-transform active:scale-95"
                    >
                      Review Decision
                    </button>
                  </div>
                </div>
              ))}

              {/* Pending Professional Payouts */}
              {sessions.filter(s => s.payableStatus === 'Submitted').map(ses => (
                <div key={ses.id} className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-[3px] text-xs space-y-2 hover:border-[#131313] transition-colors">
                  <div className="flex items-center justify-between font-bold text-[#131313]">
                    <span>Coach Payout Due</span>
                    <span className="font-mono font-bold text-[#131313]">₹{ses.rateINR.toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-[#667085]">
                    <strong className="text-[#131313]">{ses.professionalName}</strong> completed {ses.serviceType} with {ses.memberName}.
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-neutral-400 font-mono">{ses.timeSlot}</span>
                    <button
                      onClick={() => onNavigateTab('finance')}
                      className="px-3 py-1 bg-[#ddca24] text-[#131313] hover:bg-[#c8b51d] font-heading font-black text-[10px] uppercase rounded-[2px] shadow-sm transition-transform active:scale-95"
                    >
                      Approve Payout
                    </button>
                  </div>
                </div>
              ))}

              {/* Expiring memberships */}
              {members.filter(m => m.status === 'Expiring Soon').slice(0, 2).map(mem => (
                <div key={mem.id} className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-[3px] text-xs space-y-2 hover:border-[#131313] transition-colors">
                  <div className="flex items-center justify-between font-bold text-[#131313]">
                    <span>Membership Renewal</span>
                    <span className="text-[10px] font-bold text-red-600 uppercase">Expires in 3 days</span>
                  </div>
                  <p className="text-[#667085]">
                    <strong className="text-[#131313]">{mem.name}</strong> ({mem.memberCode}) • {mem.planName}
                  </p>
                  <button
                    onClick={() => onNavigateTab('members')}
                    className="w-full py-1.5 text-center bg-white border border-neutral-300 hover:bg-neutral-100 text-[#131313] text-[10px] font-heading font-bold uppercase rounded-[2px] transition-colors"
                  >
                    Send Renewal WhatsApp
                  </button>
                </div>
              ))}
            </div>
          </div>
        </AnimatedReveal>

      </div>

      {/* =========================================================================
          SECTION 6: WEEKLY TIMETABLE & TURNSTILE BOOKING (Schedule Section)
         ========================================================================= */}
      <AnimatedReveal animation="fade-up" delayMs={100}>
        <ScheduleSection onBookTurnstile={onOpenQR} />
      </AnimatedReveal>

      {/* =========================================================================
          SECTION 7: INFINITE ATHLETE & TURNTILE GALLERY MARQUEE (Webflow Assets)
         ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono font-bold text-[#667085] uppercase tracking-wider">
              [// MUMBAI PHYSICAL ASSETS //]
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-[#131313] uppercase">
              Facility & Performance Gallery
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-400">Hover to freeze scroll</span>
        </div>

        <ApproachLiner delayMs={100} />

        <GalleryMarquee />
      </section>

      {/* =========================================================================
          SECTION 8: DUAL BRANCH COMPARISON CARDS
         ========================================================================= */}
      <AnimatedReveal animation="fade-up" delayMs={150}>
        <div className="bg-white border border-[#e4e7eb] rounded-[4px] p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-100 gap-2">
            <div>
              <div className="text-[10px] font-mono font-bold text-[#667085] uppercase tracking-wider">
                [// PHYSICAL HUBS //]
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-black text-[#131313] uppercase tracking-wide">
                Mumbai Facility Economics & Capacity
              </h3>
            </div>
            <MaxfiitButton
              onClick={() => onNavigateTab('branches')}
              variant="dark"
              className="py-2 px-4 text-xs self-start sm:self-auto"
            >
              All Locations View
            </MaxfiitButton>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {branches.map(b => (
              <div key={b.id} className="p-6 bg-neutral-50 border border-neutral-200 rounded-[4px] space-y-5 hover:-translate-y-1 transition-all duration-300 hover:border-[#131313] hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-heading font-black uppercase text-[#131313] bg-[#ddca24] px-2 py-0.5 rounded-[2px]">
                      {b.code} Flagship
                    </span>
                    <h4 className="font-heading text-2xl font-black text-[#131313] uppercase mt-1">{b.name}</h4>
                    <p className="text-xs text-[#667085]">{b.address}</p>
                  </div>
                  <span className="px-3 py-1 bg-white border border-neutral-300 rounded-[2px] font-heading font-black text-xs shadow-sm">
                    ★ {b.rating} / 5.0
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center p-3.5 bg-white border border-neutral-200 rounded-[3px]">
                  <div>
                    <div className="text-[10px] text-[#667085] uppercase font-bold font-mono">Members</div>
                    <div className="text-xl font-heading font-black text-[#131313]">{b.activeMembers}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#667085] uppercase font-bold font-mono">Collections</div>
                    <div className="text-xl font-heading font-black text-emerald-600">₹{(b.monthlyRevenue / 100000).toFixed(1)}L</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#667085] uppercase font-bold font-mono">EBITDA</div>
                    <div className="text-xl font-heading font-black text-[#131313]">₹{(b.operatingProfit / 100000).toFixed(1)}L</div>
                  </div>
                </div>

                <MaxfiitButton
                  onClick={() => onNavigateTab('branches')}
                  variant="outline"
                  className="w-full py-2.5 text-xs"
                >
                  Inspect Branch Ledger & Turnstiles
                </MaxfiitButton>
              </div>
            ))}
          </div>
        </div>
      </AnimatedReveal>

    </div>
  );
};

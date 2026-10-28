export type BranchId = 'all' | 'gym-a' | 'gym-b';

export interface Branch {
  id: 'gym-a' | 'gym-b';
  name: string;
  code: string;
  tagline: string;
  address: string;
  area: string;
  city: string;
  manager: string;
  phone: string;
  operatingHours: string;
  activeMembers: number;
  staffCount: number;
  activeVisitsNow: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  operatingProfit: number;
  rating: number;
}

export interface Member {
  id: string;
  memberCode: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  branchId: 'gym-a' | 'gym-b';
  planId: string;
  planName: string;
  startDate: string;
  expiryDate: string;
  status: 'Active' | 'Expiring Soon' | 'Expired' | 'Frozen';
  outstandingDues: number;
  lastVisit: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  totalVisits: number;
  ptTrainer?: string;
  qrToken: string;
  notes: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  durationMonths: number;
  priceINR: number;
  applicableBranches: ('gym-a' | 'gym-b')[];
  benefits: string[];
  accessRestrictions: string;
  status: 'Active' | 'Archived';
  enrolledCount: number;
}

export interface Staff {
  id: string;
  staffCode: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: 'General Manager' | 'Receptionist' | 'Senior Strength Trainer' | 'Yoga Specialist' | 'Sports Physician' | 'Nutritionist Consultant' | 'Housekeeping Lead';
  category: 'Employee' | 'Fitness Professional' | 'Medical & Visiting Professional';
  primaryBranch: 'gym-a' | 'gym-b';
  secondaryBranch?: 'gym-a' | 'gym-b';
  engagementType: 'Full-time Salaried' | 'Per-Session Commission' | 'Hourly Consultation' | 'Monthly Retainer';
  attendanceStatus: 'Present' | 'On Duty' | 'Checked Out' | 'Scheduled Absence' | 'Unexpected Absence' | 'On Leave';
  rateINR: number;
  rateUnit: 'per month' | 'per session' | 'per hour';
  monthlyBaseSalary?: number;
  commissionPerSession?: number;
  sessionsCompletedThisMonth: number;
  payableDueINR: number;
  joinDate: string;
  specialization?: string;
  availableDays?: string[];
  availableHours?: string;
}

export interface AttendanceRecord {
  id: string;
  targetId: string;
  targetName: string;
  targetType: 'member' | 'staff';
  roleOrPlan: string;
  branchId: 'gym-a' | 'gym-b';
  date: string;
  checkInTime: string;
  checkOutTime?: string;
  breakDurationMinutes?: number;
  netWorkingHours?: string;
  status: 'Active Session' | 'Completed' | 'Late Arrival' | 'Missing Check-out' | 'Flagged Overtime';
  method: 'QR Kiosk' | 'Biometric (Mock)' | 'RFID Card';
  notes?: string;
}

export interface ShiftSchedule {
  id: string;
  staffId: string;
  staffName: string;
  role: string;
  branchId: 'gym-a' | 'gym-b';
  date: string;
  startTime: string;
  endTime: string;
  breakPolicy: string;
  shiftType: 'Morning Shift' | 'Evening Shift' | 'Split Shift' | 'Visiting Clinic';
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Conflict Warning';
}

export interface LeaveRequest {
  id: string;
  staffId: string;
  staffName: string;
  role: string;
  branchId: 'gym-a' | 'gym-b';
  leaveType: 'Paid Annual' | 'Sick Leave' | 'Casual Off' | 'Unpaid Sabbatical';
  startDate: string;
  endDate: string;
  daysCount: number;
  reason: string;
  requestDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  reviewerName?: string;
  reviewNotes?: string;
}

export interface ProfessionalSession {
  id: string;
  professionalId: string;
  professionalName: string;
  category: 'Fitness Professional' | 'Medical & Visiting Professional';
  branchId: 'gym-a' | 'gym-b';
  memberId: string;
  memberName: string;
  serviceType: '1-on-1 VIP PT' | 'Spine & Biomechanics Assessment' | 'Sports Diet Consultation' | 'H.I.I.T Group Masterclass';
  date: string;
  timeSlot: string;
  status: 'Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled' | 'Awaiting Approval';
  rateINR: number;
  payableStatus: 'Eligible' | 'Submitted' | 'Approved' | 'Paid';
}

export interface ExpenseRecord {
  id: string;
  category: 'Facility Rent' | 'Electricity & HVAC' | 'TechnoGym Maintenance' | 'Staff Salaries' | 'Trainer Commissions' | 'Medical Retainers' | 'Marketing & PR' | 'Luxury Amenities & Towel Service';
  amountINR: number;
  branchId: 'gym-a' | 'gym-b';
  date: string;
  payee: string;
  status: 'Paid' | 'Pending Approval' | 'Scheduled';
  notes: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  category: 'attendance' | 'approval' | 'membership' | 'finance' | 'system';
  message: string;
  timestamp: string;
  branchId?: 'gym-a' | 'gym-b';
  read: boolean;
  actionUrl?: string;
  requiresAction?: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  affectedRecord: string;
  branchId: 'gym-a' | 'gym-b';
  summary: string;
  referenceNo: string;
}

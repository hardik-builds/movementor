import React, { createContext, useContext, useState, useMemo } from 'react';
import { 
  BranchId, 
  Branch, 
  Member, 
  MembershipPlan, 
  Staff, 
  AttendanceRecord, 
  ShiftSchedule, 
  LeaveRequest, 
  ProfessionalSession, 
  ExpenseRecord, 
  NotificationItem, 
  AuditLog 
} from '../types/gym';
import {
  INITIAL_BRANCHES,
  INITIAL_PLANS,
  INITIAL_MEMBERS,
  INITIAL_STAFF,
  INITIAL_ATTENDANCE,
  INITIAL_SHIFTS,
  INITIAL_LEAVES,
  INITIAL_SESSIONS,
  INITIAL_EXPENSES,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS
} from '../data/mockGymData';

interface GymContextType {
  activeBranchId: BranchId;
  setActiveBranchId: (id: BranchId) => void;
  activeRole: 'Owner' | 'Branch Manager' | 'Receptionist' | 'Trainer' | 'Doctor' | 'Accountant';
  setActiveRole: (role: any) => void;
  
  // Data entities
  branches: Branch[];
  plans: MembershipPlan[];
  members: Member[];
  staff: Staff[];
  attendance: AttendanceRecord[];
  shifts: ShiftSchedule[];
  leaves: LeaveRequest[];
  sessions: ProfessionalSession[];
  expenses: ExpenseRecord[];
  notifications: NotificationItem[];
  auditLogs: AuditLog[];

  // Mutators & actions
  addMember: (member: Omit<Member, 'id' | 'memberCode' | 'qrToken' | 'totalVisits'>) => void;
  updateMember: (id: string, updates: Partial<Member>) => void;
  addStaff: (staffData: Omit<Staff, 'id' | 'staffCode'>) => void;
  updateStaff: (id: string, updates: Partial<Staff>) => void;
  simulateMemberQRScan: (memberId: string, branchId: 'gym-a' | 'gym-b') => { success: boolean; message: string; type: 'checkin' | 'checkout' | 'rejected' };
  simulateStaffQRScan: (staffId: string, branchId: 'gym-a' | 'gym-b') => { success: boolean; message: string; type: 'checkin' | 'checkout' };
  createShift: (shift: Omit<ShiftSchedule, 'id'>) => void;
  requestLeave: (leave: Omit<LeaveRequest, 'id' | 'requestDate' | 'status'>) => void;
  updateLeaveStatus: (leaveId: string, status: 'Approved' | 'Rejected', reviewerNotes?: string) => void;
  completeSession: (sessionId: string) => void;
  approveSessionPayout: (sessionId: string) => void;
  addExpense: (expense: Omit<ExpenseRecord, 'id'>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const GymContext = createContext<GymContextType | null>(null);

export const GymProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeBranchId, setActiveBranchId] = useState<BranchId>('all');
  const [activeRole, setActiveRole] = useState<'Owner' | 'Branch Manager' | 'Receptionist' | 'Trainer' | 'Doctor' | 'Accountant'>('Owner');

  const [branches, setBranches] = useState<Branch[]>(INITIAL_BRANCHES);
  const [plans, setPlans] = useState<MembershipPlan[]>(INITIAL_PLANS);
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [staff, setStaff] = useState<Staff[]>(INITIAL_STAFF);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [shifts, setShifts] = useState<ShiftSchedule[]>(INITIAL_SHIFTS);
  const [leaves, setLeaves] = useState<LeaveRequest[]>(INITIAL_LEAVES);
  const [sessions, setSessions] = useState<ProfessionalSession[]>(INITIAL_SESSIONS);
  const [expenses, setExpenses] = useState<ExpenseRecord[]>(INITIAL_EXPENSES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  const addAuditLog = (action: string, affected: string, summary: string, branchId: 'gym-a' | 'gym-b') => {
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actor: activeRole,
      role: activeRole,
      action,
      affectedRecord: affected,
      branchId,
      summary,
      referenceNo: `LOG-${Math.floor(1000 + Math.random() * 9000)}`
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const addMember = (memberData: Omit<Member, 'id' | 'memberCode' | 'qrToken' | 'totalVisits'>) => {
    const newCodeNum = members.length + 101;
    const newMember: Member = {
      ...memberData,
      id: `mem-${newCodeNum}`,
      memberCode: `VLM-${newCodeNum}`,
      qrToken: `QR-VLM-${newCodeNum}-SECURE-AUTO`,
      totalVisits: 0,
    };
    setMembers(prev => [newMember, ...prev]);
    addAuditLog('CREATE_MEMBER', newMember.name, `Added new member ${newMember.memberCode} enrolled in ${newMember.planName}`, newMember.branchId);
  };

  const updateMember = (id: string, updates: Partial<Member>) => {
    setMembers(prev => prev.map(m => (m.id === id ? { ...m, ...updates } : m)));
    const target = members.find(m => m.id === id);
    if (target) {
      addAuditLog('UPDATE_MEMBER', target.name, `Updated profile / membership attributes`, target.branchId);
    }
  };

  const addStaff = (staffData: Omit<Staff, 'id' | 'staffCode'>) => {
    const num = staff.length + 1;
    const newStaff: Staff = {
      ...staffData,
      id: `stf-0${num}`,
      staffCode: `STF-00${num}`
    };
    setStaff(prev => [newStaff, ...prev]);
    addAuditLog('CREATE_STAFF', newStaff.name, `Registered new ${newStaff.role} (${newStaff.category})`, newStaff.primaryBranch);
  };

  const updateStaff = (id: string, updates: Partial<Staff>) => {
    setStaff(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)));
    const target = staff.find(s => s.id === id);
    if (target) {
      addAuditLog('UPDATE_STAFF', target.name, `Modified staff record`, target.primaryBranch);
    }
  };

  const simulateMemberQRScan = (memberId: string, branchId: 'gym-a' | 'gym-b') => {
    const member = members.find(m => m.id === memberId);
    if (!member) {
      return { success: false, message: 'Member not recognized in system directory.', type: 'rejected' as const };
    }

    if (member.status === 'Expired' || member.status === 'Frozen') {
      return { 
        success: false, 
        message: `Access Denied: Member status is currently '${member.status}'. Renewal or unfreezing required.`, 
        type: 'rejected' as const 
      };
    }

    // Check if there is an active session
    const activeIndex = attendance.findIndex(a => a.targetId === member.id && a.status === 'Active Session');
    const nowTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    if (activeIndex !== -1) {
      // Check-out
      const updatedAttendance = [...attendance];
      updatedAttendance[activeIndex] = {
        ...updatedAttendance[activeIndex],
        checkOutTime: nowTime,
        status: 'Completed',
        netWorkingHours: '1h 15m'
      };
      setAttendance(updatedAttendance);
      addAuditLog('MEMBER_CHECKOUT', member.name, `Turnstile check-out recorded at ${nowTime}`, branchId);
      return { success: true, message: `Check-Out Confirmed! Good session, ${member.name}.`, type: 'checkout' as const };
    } else {
      // Check-in
      const newRecord: AttendanceRecord = {
        id: `att-${Date.now()}`,
        targetId: member.id,
        targetName: member.name,
        targetType: 'member',
        roleOrPlan: member.planName,
        branchId,
        date: new Date().toISOString().substring(0, 10),
        checkInTime: nowTime,
        status: 'Active Session',
        method: 'QR Kiosk'
      };
      setAttendance(prev => [newRecord, ...prev]);
      // Update member visit count
      updateMember(member.id, { lastVisit: `Today, ${nowTime}`, totalVisits: member.totalVisits + 1 });
      addAuditLog('MEMBER_CHECKIN', member.name, `Scanned QR at turnstile kiosk. Membership valid.`, branchId);
      return { success: true, message: `Welcome to VALMORA, ${member.name}! Access granted.`, type: 'checkin' as const };
    }
  };

  const simulateStaffQRScan = (staffId: string, branchId: 'gym-a' | 'gym-b') => {
    const targetStaff = staff.find(s => s.id === staffId);
    if (!targetStaff) {
      return { success: false, message: 'Staff identity could not be verified.', type: 'checkout' as const };
    }

    const activeIndex = attendance.findIndex(a => a.targetId === targetStaff.id && a.status === 'Active Session');
    const nowTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    if (activeIndex !== -1) {
      // Check-out
      const updatedAttendance = [...attendance];
      updatedAttendance[activeIndex] = {
        ...updatedAttendance[activeIndex],
        checkOutTime: nowTime,
        breakDurationMinutes: 30,
        status: 'Completed',
        netWorkingHours: '8h 05m'
      };
      setAttendance(updatedAttendance);
      updateStaff(targetStaff.id, { attendanceStatus: 'Checked Out' });
      addAuditLog('STAFF_CHECKOUT', targetStaff.name, `Staff scanned departure. Net working hours recorded.`, branchId);
      return { success: true, message: `Duty completed for ${targetStaff.name}. Shift checkout logged at ${nowTime}.`, type: 'checkout' as const };
    } else {
      // Check-in
      const newRecord: AttendanceRecord = {
        id: `att-stf-${Date.now()}`,
        targetId: targetStaff.id,
        targetName: targetStaff.name,
        targetType: 'staff',
        roleOrPlan: targetStaff.role,
        branchId,
        date: new Date().toISOString().substring(0, 10),
        checkInTime: nowTime,
        status: 'Active Session',
        method: 'QR Kiosk'
      };
      setAttendance(prev => [newRecord, ...prev]);
      updateStaff(targetStaff.id, { attendanceStatus: 'Present' });
      addAuditLog('STAFF_CHECKIN', targetStaff.name, `Staff clocked in at ${branchId === 'gym-a' ? 'Bandra Flagship' : 'Worli Seaface'}`, branchId);
      return { success: true, message: `Duty check-in registered for ${targetStaff.name} (${targetStaff.role}).`, type: 'checkin' as const };
    }
  };

  const createShift = (shiftData: Omit<ShiftSchedule, 'id'>) => {
    // Check if overlap exists at different branch
    const conflict = shifts.some(
      s => s.staffId === shiftData.staffId &&
           s.date === shiftData.date &&
           s.branchId !== shiftData.branchId
    );

    const newShift: ShiftSchedule = {
      ...shiftData,
      id: `shf-${Date.now()}`,
      status: conflict ? 'Conflict Warning' : 'Scheduled'
    };
    setShifts(prev => [newShift, ...prev]);
    addAuditLog('CREATE_SHIFT', shiftData.staffName, `Assigned ${shiftData.shiftType} at ${shiftData.branchId}`, shiftData.branchId);
  };

  const requestLeave = (leaveData: Omit<LeaveRequest, 'id' | 'requestDate' | 'status'>) => {
    const newLeave: LeaveRequest = {
      ...leaveData,
      id: `lev-${Date.now()}`,
      requestDate: new Date().toISOString().substring(0, 10),
      status: 'Pending'
    };
    setLeaves(prev => [newLeave, ...prev]);
    
    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Leave Request: ${newLeave.staffName}`,
      category: 'approval',
      message: `${newLeave.staffName} (${newLeave.role}) requested ${newLeave.daysCount} days of ${newLeave.leaveType}.`,
      timestamp: 'Just now',
      branchId: newLeave.branchId,
      read: false,
      requiresAction: true
    };
    setNotifications(prev => [newNotif, ...prev]);
    addAuditLog('REQUEST_LEAVE', newLeave.staffName, `Submitted leave application for ${newLeave.daysCount} days`, newLeave.branchId);
  };

  const updateLeaveStatus = (leaveId: string, status: 'Approved' | 'Rejected', reviewerNotes?: string) => {
    setLeaves(prev => prev.map(l => {
      if (l.id === leaveId) {
        return {
          ...l,
          status,
          reviewerName: activeRole,
          reviewNotes: reviewerNotes || (status === 'Approved' ? 'Approved by operations lead' : 'Declined due to staffing requirements')
        };
      }
      return l;
    }));

    const targetLeave = leaves.find(l => l.id === leaveId);
    if (targetLeave) {
      if (status === 'Approved') {
        updateStaff(targetLeave.staffId, { attendanceStatus: 'On Leave' });
      }
      addAuditLog('LEAVE_DECISION', targetLeave.staffName, `Status updated to ${status}. Notes: ${reviewerNotes || 'Standard action'}`, targetLeave.branchId);
    }
  };

  const completeSession = (sessionId: string) => {
    setSessions(prev => prev.map(s => {
      if (s.id === sessionId) {
        return { ...s, status: 'Completed', payableStatus: 'Submitted' };
      }
      return s;
    }));
    const targetSession = sessions.find(s => s.id === sessionId);
    if (targetSession) {
      // Increment staff count
      const staffMember = staff.find(st => st.id === targetSession.professionalId);
      if (staffMember) {
        updateStaff(staffMember.id, {
          sessionsCompletedThisMonth: staffMember.sessionsCompletedThisMonth + 1,
          payableDueINR: staffMember.payableDueINR + targetSession.rateINR
        });
      }
      addAuditLog('COMPLETE_SESSION', targetSession.professionalName, `Completed ${targetSession.serviceType} with ${targetSession.memberName}`, targetSession.branchId);
    }
  };

  const approveSessionPayout = (sessionId: string) => {
    setSessions(prev => prev.map(s => (s.id === sessionId ? { ...s, payableStatus: 'Approved' } : s)));
    const target = sessions.find(s => s.id === sessionId);
    if (target) {
      addAuditLog('APPROVE_PAYOUT', target.professionalName, `Approved payout of ₹${target.rateINR.toLocaleString('en-IN')} for ${target.serviceType}`, target.branchId);
    }
  };

  const addExpense = (expenseData: Omit<ExpenseRecord, 'id'>) => {
    const newExp: ExpenseRecord = {
      ...expenseData,
      id: `exp-${Date.now()}`
    };
    setExpenses(prev => [newExp, ...prev]);
    addAuditLog('RECORD_EXPENSE', expenseData.category, `₹${expenseData.amountINR.toLocaleString('en-IN')} recorded for ${expenseData.payee}`, expenseData.branchId);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <GymContext.Provider value={{
      activeBranchId,
      setActiveBranchId,
      activeRole,
      setActiveRole,
      branches,
      plans,
      members,
      staff,
      attendance,
      shifts,
      leaves,
      sessions,
      expenses,
      notifications,
      auditLogs,
      addMember,
      updateMember,
      addStaff,
      updateStaff,
      simulateMemberQRScan,
      simulateStaffQRScan,
      createShift,
      requestLeave,
      updateLeaveStatus,
      completeSession,
      approveSessionPayout,
      addExpense,
      markNotificationRead,
      markAllNotificationsRead
    }}>
      {children}
    </GymContext.Provider>
  );
};

export const useGym = () => {
  const context = useContext(GymContext);
  if (!context) {
    throw new Error('useGym must be used within a GymProvider');
  }
  return context;
};

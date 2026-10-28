import React, { useState } from 'react';
import { MaxfiitButton } from './MaxfiitButton';
import { Clock, MapPin, Users, Dumbbell } from 'lucide-react';

const scheduleData = {
  Monday: [
    { time: '06:00 - 07:30', name: 'Power Lifting & Compound Mechanics', branch: 'Bandra West Flagship', coach: 'Samar Patel', slots: '18 / 20 Enrolled', type: 'Strength' },
    { time: '08:30 - 09:45', name: 'Athletic Conditioning & Agility', branch: 'Worli Seaface Club', coach: 'Kavita Sundaram', slots: '15 / 15 Full', type: 'Cardio' },
    { time: '17:00 - 18:30', name: 'Sports Physician Spine & Joint Clinic', branch: 'Bandra West Flagship', coach: 'Dr. Farokh Mehta', slots: '6 / 8 Appts', type: 'Medical' },
    { time: '19:00 - 20:30', name: 'HIIT Fusion & Metabolic Burn', branch: 'Worli Seaface Club', coach: 'Samar Patel', slots: '22 / 25 Enrolled', type: 'HIIT' },
  ],
  Tuesday: [
    { time: '06:30 - 07:45', name: 'Hypertrophy Foundations: Chest & Delts', branch: 'Worli Seaface Club', coach: 'Samar Patel', slots: '14 / 20 Enrolled', type: 'Hypertrophy' },
    { time: '09:00 - 10:15', name: 'Orthopedic Kinetic Rehab & Mobility', branch: 'Bandra West Flagship', coach: 'Dr. Ananya Deshmukh', slots: '7 / 8 Appts', type: 'Medical' },
    { time: '18:00 - 19:30', name: 'Olympic Weightlifting Technique', branch: 'Bandra West Flagship', coach: 'Samar Patel', slots: '12 / 12 Full', type: 'Strength' },
    { time: '20:00 - 21:00', name: 'Core Stabilization & Recovery Sauna', branch: 'Worli Seaface Club', coach: 'Kavita Sundaram', slots: '19 / 20 Enrolled', type: 'Recovery' },
  ],
  Wednesday: [
    { time: '06:00 - 07:30', name: 'Back & Deadlift Density Protocol', branch: 'Bandra West Flagship', coach: 'Samar Patel', slots: '20 / 20 Full', type: 'Strength' },
    { time: '09:30 - 10:45', name: 'Functional Kettlebell Conditioning', branch: 'Worli Seaface Club', coach: 'Kavita Sundaram', slots: '16 / 20 Enrolled', type: 'HIIT' },
    { time: '17:30 - 18:45', name: 'Sports Physiotherapy Assessment', branch: 'Worli Seaface Club', coach: 'Dr. Farokh Mehta', slots: '8 / 8 Appts', type: 'Medical' },
    { time: '19:30 - 21:00', name: 'Athletic Conditioning & Agility', branch: 'Bandra West Flagship', coach: 'Samar Patel', slots: '17 / 20 Enrolled', type: 'Cardio' },
  ],
  Thursday: [
    { time: '07:00 - 08:15', name: 'Leg Drive & Squat Periodization', branch: 'Worli Seaface Club', coach: 'Samar Patel', slots: '15 / 15 Full', type: 'Strength' },
    { time: '10:00 - 11:15', name: 'Post-Injury Joint Restoration', branch: 'Bandra West Flagship', coach: 'Dr. Ananya Deshmukh', slots: '5 / 8 Appts', type: 'Medical' },
    { time: '18:00 - 19:30', name: 'HIIT Fusion Sprint Intervals', branch: 'Bandra West Flagship', coach: 'Kavita Sundaram', slots: '21 / 25 Enrolled', type: 'HIIT' },
    { time: '20:00 - 21:15', name: 'Mobility & Myofascial Release', branch: 'Worli Seaface Club', coach: 'Dr. Farokh Mehta', slots: '12 / 15 Enrolled', type: 'Recovery' },
  ],
  Friday: [
    { time: '06:00 - 07:30', name: 'Power Lifting & Compound Mechanics', branch: 'Bandra West Flagship', coach: 'Samar Patel', slots: '18 / 20 Enrolled', type: 'Strength' },
    { time: '08:30 - 09:45', name: 'Upper Body Athletic Sculpting', branch: 'Worli Seaface Club', coach: 'Kavita Sundaram', slots: '18 / 20 Enrolled', type: 'Hypertrophy' },
    { time: '17:00 - 18:30', name: 'Sports Physician Spine Clinic', branch: 'Worli Seaface Club', coach: 'Dr. Farokh Mehta', slots: '8 / 8 Appts', type: 'Medical' },
    { time: '19:00 - 20:30', name: 'Weekend Warrior Strongman Circuit', branch: 'Bandra West Flagship', coach: 'Samar Patel', slots: '24 / 25 Enrolled', type: 'Strength' },
  ],
  Saturday: [
    { time: '07:30 - 09:00', name: 'Flagship Team Endurance Challenge', branch: 'Bandra West Flagship', coach: 'Samar Patel & Kavita', slots: '30 / 30 Full', type: 'Cardio' },
    { time: '10:00 - 11:30', name: 'Olympic Lifting Mastery Workshop', branch: 'Worli Seaface Club', coach: 'Samar Patel', slots: '15 / 15 Full', type: 'Strength' },
    { time: '16:00 - 17:30', name: 'Biomechanics & Movement Screening', branch: 'Bandra West Flagship', coach: 'Dr. Farokh Mehta', slots: '8 / 8 Full', type: 'Medical' },
  ],
  Sunday: [
    { time: '08:00 - 09:30', name: 'Active Recovery & Breathwork Workshop', branch: 'Worli Seaface Club', coach: 'Dr. Ananya Deshmukh', slots: '22 / 25 Enrolled', type: 'Recovery' },
    { time: '10:00 - 11:30', name: 'Open Gym Supervised Lifting Protocol', branch: 'Bandra West Flagship', coach: 'Samar Patel', slots: 'Floor Open', type: 'Open' },
  ]
};

type DayKey = keyof typeof scheduleData;

export const ScheduleSection: React.FC<{ onBookTurnstile?: () => void }> = ({ onBookTurnstile }) => {
  const [activeDay, setActiveDay] = useState<DayKey>('Monday');
  const days: DayKey[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="bg-white border border-[#e4e7eb] rounded-[4px] p-6 sm:p-8 space-y-6 shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-neutral-100">
        <div className="space-y-1">
          <div className="text-xs font-mono font-bold text-[#667085] uppercase tracking-wider">
            [// FACILITY TIMETABLE & TURNSTILE BOOKING //]
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-[#131313] uppercase tracking-tight">
            WEEKLY WORKOUT & MEDICAL ROSTER
          </h2>
          <p className="text-xs sm:text-sm text-[#667085] max-w-xl">
            Live turnstile synchronization for Mumbai group fitness classes, Olympic lifting bays, and specialized orthopedic medical sessions.
          </p>
        </div>

        {/* Day selection tabs with Maxfiit design language */}
        <div className="flex flex-wrap gap-1 p-1 bg-neutral-100 rounded-[3px] self-start md:self-auto">
          {days.map(day => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-3 py-1.5 text-xs font-heading font-black uppercase tracking-wider rounded-[2px] transition-all duration-300 ${
                activeDay === day
                  ? 'bg-[#131313] text-[#ddca24] shadow-sm'
                  : 'text-[#667085] hover:text-[#131313] hover:bg-neutral-200'
              }`}
            >
              {day.slice(0, 3)}
            </button>
          ))}
        </div>
      </div>

      {/* Timetable Rows */}
      <div className="space-y-3">
        {scheduleData[activeDay].map((slot, idx) => (
          <div
            key={idx}
            className="group p-4 bg-neutral-50 hover:bg-[#131313] border border-neutral-200 hover:border-[#131313] rounded-[4px] transition-all duration-400 ease-[cubic-bezier(0.165,0.84,0.44,1)] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            {/* Left: Time and Title */}
            <div className="flex items-start sm:items-center space-x-4">
              <div className="p-2.5 bg-white group-hover:bg-[#ddca24] border border-neutral-200 group-hover:border-[#ddca24] rounded-[3px] text-[#131313] transition-colors shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold text-[#131313] group-hover:text-[#ddca24] transition-colors">
                    {slot.time}
                  </span>
                  <span className="text-[10px] uppercase font-heading font-black px-1.5 py-0.2 bg-neutral-200 group-hover:bg-neutral-800 text-[#131313] group-hover:text-white rounded-[2px] transition-colors">
                    {slot.type}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-black uppercase text-[#131313] group-hover:text-white transition-colors">
                  {slot.name}
                </h3>
                <div className="flex items-center space-x-3 text-xs text-[#667085] group-hover:text-neutral-400 transition-colors">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-[#ddca24]" />
                    <span>{slot.branch}</span>
                  </span>
                  <span>•</span>
                  <span>Coach: <strong className="text-[#131313] group-hover:text-white">{slot.coach}</strong></span>
                </div>
              </div>
            </div>

            {/* Right: Capacity & Action */}
            <div className="flex items-center justify-between sm:justify-end space-x-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-neutral-200 group-hover:border-neutral-800">
              <div className="text-right">
                <div className="text-[11px] font-mono font-bold text-[#131313] group-hover:text-white transition-colors">
                  {slot.slots}
                </div>
                <div className="text-[10px] text-emerald-600 group-hover:text-[#ddca24] font-semibold transition-colors">
                  Turnstile Sync Active
                </div>
              </div>

              <MaxfiitButton
                onClick={onBookTurnstile}
                variant="primary"
                className="py-1.5 px-3 text-[11px]"
              >
                Book Gate
              </MaxfiitButton>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

import React from 'react';
import { Shield, FileCheck, ArrowRight } from 'lucide-react';

export const LegalAndPrivacyModule: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Top Banner */}
      <div className="p-6 bg-white border border-[#e4e7eb] rounded-lg shadow-sm">
        <div className="text-[#131313] bg-[#ddca24] px-2 py-0.5 rounded text-[11px] font-heading font-black uppercase tracking-wider inline-block mb-1">
          LEGAL & COMPLIANCE
        </div>
        <h1 className="font-heading text-3xl font-black text-[#131313] tracking-wide uppercase">
          Privacy Policy and Terms of Service
        </h1>
        <p className="text-xs text-[#667085] mt-1">
          Official compliance documentation for MOVEMENTOR India operations covering data security, turnstile biometric access logs, and membership policies across Bandra and Worli facilities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Privacy Policy */}
        <div className="maxfiit-card-light p-6 space-y-4">
          <div className="flex items-center space-x-2 text-[#131313] font-heading text-xl font-black uppercase">
            <Shield className="w-5 h-5 text-[#131313]" />
            <span>Privacy Policy</span>
          </div>
          <div className="text-xs text-[#667085] space-y-3 leading-relaxed">
            <p>
              <strong className="text-[#131313]">1. Data Collection:</strong> MOVEMENTOR collects personal identification details (name, contact phone, email, emergency contacts) and attendance logs exclusively for facility safety, access authorization, and membership billing.
            </p>
            <p>
              <strong className="text-[#131313]">2. Access Control and Optical Logs:</strong> Check-in timestamps recorded at turnstile gates are retained on secure local servers for a maximum of 365 days to verify billing cycles and emergency headcount. Biometric credentials, if utilized, are stored as non-reversible mathematical hashes and never shared with third parties.
            </p>
            <p>
              <strong className="text-[#131313]">3. Medical and Consultation Notes:</strong> Physical therapy assessments and consultation records recorded by sports physicians are strictly confidential between the specialist and the member, isolated from general operational access.
            </p>
            <p>
              <strong className="text-[#131313]">4. Data Subject Rights:</strong> Members may request an export or deletion of personal contact records by submitting a written request to compliance@movementor.in.
            </p>
          </div>
        </div>

        {/* Terms of Service */}
        <div className="maxfiit-card-light p-6 space-y-4">
          <div className="flex items-center space-x-2 text-[#131313] font-heading text-xl font-black uppercase">
            <FileCheck className="w-5 h-5 text-[#131313]" />
            <span>Terms & Conditions</span>
          </div>
          <div className="text-xs text-[#667085] space-y-3 leading-relaxed">
            <p>
              <strong className="text-[#131313]">1. Membership Usage:</strong> All memberships are personal and non-transferable unless approved under official cross-branch transfer protocols. Sharing of QR access credentials will result in immediate suspension of facility access.
            </p>
            <p>
              <strong className="text-[#131313]">2. Dual-Branch Access:</strong> Members enrolled under Annual All-Access and Semi-Annual plans are entitled to train at both Bandra West and Worli Seaface locations without additional daily entry fees.
            </p>
            <p>
              <strong className="text-[#131313]">3. Personal Training and Session Expiry:</strong> Personal training packages must be scheduled in advance with assigned coaches. Sessions not cancelled at least 6 hours in advance will be logged as completed.
            </p>
            <p>
              <strong className="text-[#131313]">4. Freezing Policy:</strong> Members on annual plans may pause their membership for up to 30 cumulative days per calendar year for documented travel or medical recovery.
            </p>
          </div>
        </div>

      </div>

      {/* Production Verification Card */}
      <div className="p-4 bg-white border border-[#e4e7eb] rounded-lg shadow-sm flex flex-col sm:flex-row items-center justify-between text-xs text-[#667085] gap-3">
        <div>
          <span className="font-bold text-[#131313] uppercase">Domain Verification:</span> Production SSL active at <code className="text-[#131313] font-bold bg-[#ddca24] px-1.5 py-0.5 rounded font-mono">https://app.movementor.in</code> with automated 256-bit encryption.
        </div>
        <span className="text-[11px] font-mono text-emerald-700 font-bold">
          COMPLIANCE VERIFIED
        </span>
      </div>

    </div>
  );
};

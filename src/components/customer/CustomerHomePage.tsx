import React, { useState, useEffect, useRef } from 'react';
import { AnimatedReveal } from '../common/AnimatedReveal';
import { TextReveal } from '../common/TextReveal';
import { ImageReveal } from '../common/ImageReveal';
import { MaxfiitButton } from '../common/MaxfiitButton';
import { ApproachLiner } from '../common/ApproachLiner';
import { ScheduleSection } from '../common/ScheduleSection';
import { GalleryMarquee } from '../common/GalleryMarquee';
import { SkeletonMuscleCanvas, MuscleHighlightTarget } from '../3d/SkeletonMuscleCanvas';
import { OlympicPlateCanvas } from '../3d/OlympicPlateCanvas';
import { BiometricKeycardCanvas } from '../3d/BiometricKeycardCanvas';
import { KineticOrbCanvas } from '../3d/KineticOrbCanvas';
import { 
  Dumbbell, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Users, 
  Check, 
  Sparkles, 
  Activity, 
  Calendar,
  Stethoscope,
  ChevronRight,
  Flame,
  ArrowRight,
  PhoneCall,
  QrCode
} from 'lucide-react';

interface CustomerHomePageProps {
  onNavigatePortal: (tab: string) => void;
  onOpenQRTurnstile: () => void;
}

export const CustomerHomePage: React.FC<CustomerHomePageProps> = ({
  onNavigatePortal,
  onOpenQRTurnstile
}) => {
  const [activeMuscleFocus, setActiveMuscleFocus] = useState<'chest' | 'back' | 'shoulders' | 'core' | 'legs' | 'full'>('chest');
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [selectedPlanName, setSelectedPlanName] = useState('Annual All-Access Pass');

  // Interactive scroll observer to trigger muscle highlight as user scrolls down the kinetic journey
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const phase3Ref = useRef<HTMLDivElement>(null);
  const phase4Ref = useRef<HTMLDivElement>(null);
  const phase5Ref = useRef<HTMLDivElement>(null);
  const phase6Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const focus = entry.target.getAttribute('data-focus') as any;
          if (focus) {
            setActiveMuscleFocus(focus);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: [0.1, 0.3, 0.6],
      rootMargin: '-5% 0px -15% 0px'
    });

    const phaseRefs = [phase1Ref, phase2Ref, phase3Ref, phase4Ref, phase5Ref, phase6Ref];
    phaseRefs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    // Touch & fast scroll fallback for smartphones & PCs
    const handleScrollCheck = () => {
      // On mobile, the sticky 3D canvas sits at top ~330px, so reading zone is centered below it
      const isMobile = window.innerWidth < 1024;
      const targetY = isMobile ? 320 + (window.innerHeight - 320) * 0.35 : window.innerHeight * 0.45;
      
      let closestRef: HTMLDivElement | null = null;
      let minDistance = Infinity;

      for (const ref of phaseRefs) {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const cardCenter = (rect.top + rect.bottom) / 2;
          const dist = Math.abs(cardCenter - targetY);
          if (rect.top < window.innerHeight && rect.bottom > (isMobile ? 260 : 0)) {
            if (dist < minDistance) {
              minDistance = dist;
              closestRef = ref.current;
            }
          }
        }
      }

      if (closestRef) {
        const focus = closestRef.getAttribute('data-focus') as any;
        if (focus) setActiveMuscleFocus(focus);
      }
    };
    window.addEventListener('scroll', handleScrollCheck, { passive: true });
    window.addEventListener('touchmove', handleScrollCheck, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollCheck);
      window.removeEventListener('touchmove', handleScrollCheck);
    };
  }, []);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setShowInquiryModal(false);
      setInquirySent(false);
    }, 2000);
  };

  return (
    <div className="space-y-16">
      
      {/* =========================================================================
          SECTION 1: CUSTOMER HERO (Athletic Grandeur, Curtain Text, Real Photos)
         ========================================================================= */}
      <section className="relative bg-white border border-[#e4e7eb] rounded-[4px] p-4 sm:p-8 lg:p-12 shadow-sm overflow-hidden min-w-0">
        
        {/* Subtle architectural background texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#e4e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center min-w-0">
          
          {/* Left Column: Heading, Subtitle & Interactive CTAs */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 min-w-0">
            
            {/* Top Subtitle Badge */}
            <AnimatedReveal animation="fade-up" delayMs={0}>
              <div className="inline-flex items-center space-x-2 px-2.5 sm:px-3 py-1 bg-[#131313] text-[#ddca24] rounded-[2px] text-[10px] sm:text-xs font-heading font-black tracking-wider uppercase max-w-full">
                <span className="w-2 h-2 rounded-full bg-[#ddca24] animate-ping shrink-0" />
                <span className="truncate">// MOVEMENTOR • ATHLETIC PERFORMANCE LAB //</span>
              </div>
            </AnimatedReveal>

            {/* Headline with Curtain Text Reveal */}
            <div className="space-y-1 min-w-0">
              <div className="min-w-0">
                <TextReveal delayMs={100} as="h1" className="font-heading text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#131313] uppercase tracking-tight leading-[0.94] break-words">
                  REDEFINE MOVEMENT.
                </TextReveal>
              </div>
              <div className="min-w-0">
                <TextReveal delayMs={250} as="h1" className="font-heading text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#131313] uppercase tracking-tight leading-[0.94] break-words">
                  <span className="bg-[#ddca24] text-[#131313] px-2 sm:px-3 py-0.5 inline-block transform hover:-rotate-1 transition-transform duration-300 max-w-full break-words">
                    ELEVATE HUMAN MASTERY.
                  </span>
                </TextReveal>
              </div>
            </div>

            {/* Description */}
            <AnimatedReveal animation="fade-up" delayMs={350}>
              <p className="text-xs sm:text-sm md:text-base text-[#667085] max-w-xl font-normal leading-relaxed break-words">
                Mumbai’s premier multi-branch strength conditioning sanctuary and orthopedic sports science laboratory. Flagship facilities in Bandra West & Worli Seaface equipped with Eleiko calibrated steel, Keiser pneumatic resistance, and sports physician assessments.
              </p>
            </AnimatedReveal>

            {/* Action Buttons with Maxfiit Dual-Sliding Arrows */}
            <AnimatedReveal animation="fade-up" delayMs={450}>
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2 w-full">
                <MaxfiitButton
                  onClick={() => {
                    setSelectedPlanName('Complimentary Movement Assessment');
                    setShowInquiryModal(true);
                  }}
                  variant="primary"
                  className="py-3 px-4 sm:px-6 text-xs sm:text-sm w-full sm:w-auto"
                >
                  Book Free Assessment
                </MaxfiitButton>

                <MaxfiitButton
                  onClick={onOpenQRTurnstile}
                  variant="dark"
                  className="py-3 px-4 sm:px-6 text-xs sm:text-sm w-full sm:w-auto"
                >
                  Simulate QR Turnstile Pass
                </MaxfiitButton>

                <MaxfiitButton
                  onClick={() => onNavigatePortal('overview')}
                  variant="outline"
                  className="py-3 px-4 sm:px-5 text-xs sm:text-sm w-full sm:w-auto"
                >
                  Operations Portal →
                </MaxfiitButton>
              </div>
            </AnimatedReveal>

            {/* Facility Highlights Strip */}
            <AnimatedReveal animation="fade-up" delayMs={550}>
              <div className="pt-4 sm:pt-6 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 border-t border-neutral-100">
                <div className="group cursor-default p-2.5 bg-neutral-50 sm:bg-transparent rounded-[3px] sm:rounded-none">
                  <div className="text-[10px] font-mono font-bold text-[#667085] uppercase tracking-wider group-hover:text-[#131313] transition-colors">
                    Mumbai Facilities
                  </div>
                  <div className="text-lg sm:text-2xl font-black font-heading text-[#131313]">
                    2 Flagships
                  </div>
                  <div className="text-[11px] text-[#667085]">Bandra & Worli</div>
                </div>

                <div className="group cursor-default p-2.5 bg-neutral-50 sm:bg-transparent rounded-[3px] sm:rounded-none">
                  <div className="text-[10px] font-mono font-bold text-[#667085] uppercase tracking-wider group-hover:text-[#131313] transition-colors">
                    Access Hours
                  </div>
                  <div className="text-lg sm:text-2xl font-black font-heading text-[#131313]">
                    05:30 - 23:00
                  </div>
                  <div className="text-[11px] text-emerald-600 font-semibold">365 Days / Year</div>
                </div>

                <div className="group cursor-default p-2.5 bg-neutral-50 sm:bg-transparent rounded-[3px] sm:rounded-none">
                  <div className="text-[10px] font-mono font-bold text-[#667085] uppercase tracking-wider group-hover:text-[#131313] transition-colors">
                    Sports Physicians
                  </div>
                  <div className="text-lg sm:text-2xl font-black font-heading text-[#131313]">
                    On-Floor Daily
                  </div>
                  <div className="text-[11px] text-[#ddca24] font-bold">Injury Prevention</div>
                </div>
              </div>
            </AnimatedReveal>

          </div>

          {/* Right Column: Hero Athlete Image & Interactive 3D Biometric Pass */}
          <div className="lg:col-span-5 space-y-4 min-w-0">
            <AnimatedReveal animation="scale-in" delayMs={200}>
              <div className="relative group">
                <ImageReveal
                  src="https://cdn.prod.website-files.com/682c50a8fd5c0f71c753acb4/682d9b0e63404703dda88379_Hero%20Image.webp"
                  alt="MOVEMENTOR Elite Athlete Training"
                  aspectRatio="aspect-[4/3] sm:aspect-[4/5]"
                  delayMs={300}
                  className="shadow-2xl border border-neutral-300"
                />

                {/* Floating Top Pill */}
                <div className="absolute -top-3 -right-3 bg-[#131313] text-[#ddca24] px-4 py-1.5 rounded-[3px] border border-[#ddca24] text-[11px] font-heading font-black tracking-wider uppercase shadow-xl transform group-hover:scale-105 transition-transform duration-300">
                  ★ ELEIKO CERTIFIED FACILITY
                </div>

                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 border border-[#e4e7eb] rounded-[3px] shadow-xl flex items-center justify-between transform group-hover:-translate-y-1 transition-transform duration-400">
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-mono uppercase text-[#667085] font-bold">
                      Real-Time Turnstile Verification
                    </div>
                    <div className="font-heading font-black text-xs sm:text-sm text-[#131313] uppercase flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Optical RFID Gate Active</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-[3px] bg-[#ddca24] text-[#131313] flex items-center justify-center font-heading font-black text-sm shadow-sm shrink-0">
                    MV
                  </div>
                </div>
              </div>
            </AnimatedReveal>

            {/* Interactive 3D Biometric RFID Turnstile Pass */}
            <AnimatedReveal animation="fade-up" delayMs={350}>
              <BiometricKeycardCanvas onScanPass={onOpenQRTurnstile} />
            </AnimatedReveal>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: CONTINUOUS ATHLETIC RUNNING MARQUEE
         ========================================================================= */}
      <div className="bg-[#131313] text-[#ddca24] py-3.5 overflow-hidden rounded-[3px] shadow-sm select-none">
        <div className="animate-marquee whitespace-nowrap text-xs sm:text-sm font-heading font-black tracking-widest uppercase flex items-center space-x-8">
          <span>• BANDRA WEST FLAGSHIP AT WATERFIELD ROAD</span>
          <span className="text-white">• WORLI SEAFACE ATHLETIC CLUB AT HORIZON COMMERCIAL</span>
          <span>• CLINICAL SPORTS PHYSICIAN SPINAL ASSESSMENTS</span>
          <span className="text-white">• ELEIKO OLYMPIC CALIBRATED WEIGHTLIFTING BAYS</span>
          <span>• KEISER PNEUMATIC RESISTANCE TECHNOLOGY</span>
          <span className="text-white">• INFRARED SAUNA & RECOVERY MOBILITY LOUNGE</span>
          <span>• BANDRA WEST FLAGSHIP AT WATERFIELD ROAD</span>
          <span className="text-white">• WORLI SEAFACE ATHLETIC CLUB AT HORIZON COMMERCIAL</span>
        </div>
      </div>

      {/* =========================================================================
          SECTION 3: THE 3D STICKY SKELETON & MUSCLE EXPLORER (Requested Feature!)
         ========================================================================= */}
      <section className="space-y-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono font-bold text-[#667085] uppercase tracking-wider">
              [// INTERACTIVE 3D ANATOMY ENGINE //]
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-black text-[#131313] uppercase tracking-tight">
              SCROLL THROUGH THE KINETIC MUSCLE CHAIN
            </h2>
            <p className="text-xs sm:text-sm text-[#667085] max-w-2xl leading-relaxed">
              As you scroll down, our 3D anatomical model sticks on the screen, automatically rotating, focusing, and highlighting each target muscle group, its clinical compound movement, and the specialist coach overseeing your form.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-neutral-500 bg-white border border-[#e4e7eb] px-3 py-1.5 rounded-[3px]">
            <span className="w-2 h-2 rounded-full bg-[#ddca24] animate-ping" />
            <span>Scroll Down to Orbit 3D Muscular Layers</span>
          </div>
        </div>

        <ApproachLiner delayMs={100} />

        {/* The Two-Column Sticky Container */}
        <div className="block lg:grid lg:grid-cols-12 gap-6 lg:gap-8 items-start relative min-w-0">
          
          {/* LEFT COLUMN: Pure Sticky 3D Anatomy Canvas (Locked in place, never shifts upwards!) */}
          <div className="lg:col-span-5 sticky top-14 sm:top-20 lg:top-24 z-30 mb-6 lg:mb-0 min-w-0">
            <SkeletonMuscleCanvas
              activeFocus={activeMuscleFocus}
              onSelectMuscle={(target: MuscleHighlightTarget) => setActiveMuscleFocus(target.focusArea)}
              className="w-full"
            />
          </div>

          {/* RIGHT COLUMN: Scrolling Kinetic Phase Cards */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 min-w-0">
            
            {/* Phase 1: Chest & Pectorals */}
            <div
              ref={phase1Ref}
              data-focus="chest"
              onClick={() => setActiveMuscleFocus('chest')}
              className={`p-6 sm:p-8 rounded-[4px] border transition-all duration-500 cursor-pointer ${
                activeMuscleFocus === 'chest'
                  ? 'bg-white border-[#ddca24] ring-2 ring-[#ddca24]/20 shadow-xl'
                  : 'bg-white/80 border-[#e4e7eb] hover:border-neutral-400'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-[#131313] bg-[#ddca24] px-2 py-0.5 rounded-[2px]">
                    STAGE 01 // UPPER BODY ANTERIOR
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-black text-[#131313] uppercase mt-2">
                    Pectoralis Major & Compound Push Mechanics
                  </h3>
                  <p className="text-xs font-mono text-[#667085] mt-0.5">
                    Clavicular and sternocostal heads trained for maximum torque transfer.
                  </p>
                </div>
                <span className="text-xl font-heading font-black text-[#ddca24]">01</span>
              </div>

              <p className="text-xs sm:text-sm text-[#667085] mt-4 leading-relaxed">
                Our Bandra and Worli facilities utilize calibrated Eleiko competition benches with laser-aligned bar catchers. Samar Patel coaches elbow tracking, scapular retraction, and pectoral activation to avoid anterior shoulder impingement.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 p-3 bg-neutral-50 rounded-[3px] border border-neutral-200 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-mono text-neutral-400 block">Primary Exercises</span>
                  <span className="font-bold text-[#131313]">Incline Barbell Bench • Weighted Dips</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-neutral-400 block">Floor Specialist</span>
                  <span className="font-bold text-[#131313]">Samar Patel (Senior Strength)</span>
                </div>
              </div>
            </div>

            {/* Phase 2: Back & Latissimus Dorsi */}
            <div
              ref={phase2Ref}
              data-focus="back"
              onClick={() => setActiveMuscleFocus('back')}
              className={`p-6 sm:p-8 rounded-[4px] border transition-all duration-500 cursor-pointer ${
                activeMuscleFocus === 'back'
                  ? 'bg-white border-[#ddca24] ring-2 ring-[#ddca24]/20 shadow-xl'
                  : 'bg-white/80 border-[#e4e7eb] hover:border-neutral-400'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-[#131313] bg-[#ddca24] px-2 py-0.5 rounded-[2px]">
                    STAGE 02 // POSTERIOR CHAIN & LATS
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-black text-[#131313] uppercase mt-2">
                    Latissimus Dorsi & Spinal Erectors
                  </h3>
                  <p className="text-xs font-mono text-[#667085] mt-0.5">
                    Thoracolumbar fascia stabilization and broad vertical pull strength.
                  </p>
                </div>
                <span className="text-xl font-heading font-black text-[#ddca24]">02</span>
              </div>

              <p className="text-xs sm:text-sm text-[#667085] mt-4 leading-relaxed">
                Posterior chain density is the bedrock of athletic durability. Deadlift platforms equipped with oak inserts protect your joints, while Pendlay rows and chest-supported T-bars build impenetrable mid-back thickness.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 p-3 bg-neutral-50 rounded-[3px] border border-neutral-200 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-mono text-neutral-400 block">Primary Exercises</span>
                  <span className="font-bold text-[#131313]">Deadlift • Pendlay Row • Neutral Pull-Ups</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-neutral-400 block">Orthopedic Review</span>
                  <span className="font-bold text-[#131313]">Dr. Farokh Mehta (Sports Physician)</span>
                </div>
              </div>
            </div>

            {/* Phase 3: Shoulders & Deltoid Complex */}
            <div
              ref={phase3Ref}
              data-focus="shoulders"
              onClick={() => setActiveMuscleFocus('shoulders')}
              className={`p-6 sm:p-8 rounded-[4px] border transition-all duration-500 cursor-pointer ${
                activeMuscleFocus === 'shoulders'
                  ? 'bg-white border-[#ddca24] ring-2 ring-[#ddca24]/20 shadow-xl'
                  : 'bg-white/80 border-[#e4e7eb] hover:border-neutral-400'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-[#131313] bg-[#ddca24] px-2 py-0.5 rounded-[2px]">
                    STAGE 03 // 3D DELTOID & ROTATOR CUFF
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-black text-[#131313] uppercase mt-2">
                    Deltoid Architecture & Rotator Health
                  </h3>
                  <p className="text-xs font-mono text-[#667085] mt-0.5">
                    Anterior, lateral, and posterior heads balanced with infraspinatus stability.
                  </p>
                </div>
                <span className="text-xl font-heading font-black text-[#ddca24]">03</span>
              </div>

              <p className="text-xs sm:text-sm text-[#667085] mt-4 leading-relaxed">
                Pneumatic Keiser cable towers provide smooth, inertia-free resistance throughout lateral abduction, while strict overhead presses build bulletproof thoracic extension under certified supervision.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 p-3 bg-neutral-50 rounded-[3px] border border-neutral-200 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-mono text-neutral-400 block">Primary Exercises</span>
                  <span className="font-bold text-[#131313]">Strict Overhead Press • Face Pulls</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-neutral-400 block">Floor Specialist</span>
                  <span className="font-bold text-[#131313]">Kavita Sundaram (Conditioning Lead)</span>
                </div>
              </div>
            </div>

            {/* Phase 4: Core & Kinetic Transverse */}
            <div
              ref={phase4Ref}
              data-focus="core"
              onClick={() => setActiveMuscleFocus('core')}
              className={`p-6 sm:p-8 rounded-[4px] border transition-all duration-500 cursor-pointer ${
                activeMuscleFocus === 'core'
                  ? 'bg-white border-[#ddca24] ring-2 ring-[#ddca24]/20 shadow-xl'
                  : 'bg-white/80 border-[#e4e7eb] hover:border-neutral-400'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-[#131313] bg-[#ddca24] px-2 py-0.5 rounded-[2px]">
                    STAGE 04 // CORE ENGINE & ROTATION
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-black text-[#131313] uppercase mt-2">
                    Rectus Abdominis & Transverse Power
                  </h3>
                  <p className="text-xs font-mono text-[#667085] mt-0.5">
                    Bracing, anti-extension, anti-lateral flexion, and multi-planar power transfer.
                  </p>
                </div>
                <span className="text-xl font-heading font-black text-[#ddca24]">04</span>
              </div>

              <p className="text-xs sm:text-sm text-[#667085] mt-4 leading-relaxed">
                A strong core is an anti-movement shield that preserves spinal integrity. Our clinical physiotherapists screen intra-abdominal pressure mechanics before advancing athletes to heavy loaded carries and rotational throws.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 p-3 bg-neutral-50 rounded-[3px] border border-neutral-200 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-mono text-neutral-400 block">Primary Exercises</span>
                  <span className="font-bold text-[#131313]">Ab Wheel Rollouts • Hanging Leg Raises</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-neutral-400 block">Physiotherapy Specialist</span>
                  <span className="font-bold text-[#131313]">Dr. Ananya Deshmukh (Sports Physio)</span>
                </div>
              </div>
            </div>

            {/* Phase 5: Lower Body Quadriceps & Posterior Drive */}
            <div
              ref={phase5Ref}
              data-focus="legs"
              onClick={() => setActiveMuscleFocus('legs')}
              className={`p-6 sm:p-8 rounded-[4px] border transition-all duration-500 cursor-pointer ${
                activeMuscleFocus === 'legs'
                  ? 'bg-white border-[#ddca24] ring-2 ring-[#ddca24]/20 shadow-xl'
                  : 'bg-white/80 border-[#e4e7eb] hover:border-neutral-400'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-[#131313] bg-[#ddca24] px-2 py-0.5 rounded-[2px]">
                    STAGE 05 // LOWER BODY ENGINE
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-black text-[#131313] uppercase mt-2">
                    Quadriceps, Hamstrings & Gluteal Drive
                  </h3>
                  <p className="text-xs font-mono text-[#667085] mt-0.5">
                    Knee flexion, hip hinge mechanics, and high-velocity ground reaction force.
                  </p>
                </div>
                <span className="text-xl font-heading font-black text-[#ddca24]">05</span>
              </div>

              <p className="text-xs sm:text-sm text-[#667085] mt-4 leading-relaxed">
                From Olympic squat depth to heavy sled sprints across our 30-meter high-density turf track, your lower body will achieve symmetrical strength, knee ligament resilience, and rapid deceleration power.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 p-3 bg-neutral-50 rounded-[3px] border border-neutral-200 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-mono text-neutral-400 block">Primary Exercises</span>
                  <span className="font-bold text-[#131313]">Barbell Back Squat • Romanian Deadlift • Sled</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-neutral-400 block">Floor Specialist</span>
                  <span className="font-bold text-[#131313]">Vikram Sen (Biomechanics Coach)</span>
                </div>
              </div>
            </div>

            {/* Phase 6: Full Kinetic Integration */}
            <div
              ref={phase6Ref}
              data-focus="full"
              onClick={() => setActiveMuscleFocus('full')}
              className={`p-6 sm:p-8 rounded-[4px] border transition-all duration-500 cursor-pointer ${
                activeMuscleFocus === 'full'
                  ? 'bg-[#131313] text-white border-[#ddca24] ring-2 ring-[#ddca24]/40 shadow-2xl'
                  : 'bg-neutral-900 text-white border-neutral-800 hover:border-neutral-600'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-[#131313] bg-[#ddca24] px-2 py-0.5 rounded-[2px]">
                    STAGE 06 // INTEGRATED MASTERY
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-black text-white uppercase mt-2">
                    Complete Biomechanical Symphony
                  </h3>
                  <p className="text-xs font-mono text-neutral-400 mt-0.5">
                    Every joint, ligament, and muscle fiber firing in synchrony.
                  </p>
                </div>
                <span className="text-xl font-heading font-black text-[#ddca24]">06</span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 mt-4 leading-relaxed">
                When you train at MOVEMENTOR, you don’t just move weights — you optimize the kinetic human organism. Turnstile biometric tracking, heart rate variability, and doctor consultations ensure progressive overload without chronic overuse.
              </p>

              {/* 3D Kinetic Biomechanical HRV Orb */}
              <div className="mt-5">
                <KineticOrbCanvas />
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <MaxfiitButton
                  onClick={() => {
                    setSelectedPlanName('Complimentary Movement Assessment');
                    setShowInquiryModal(true);
                  }}
                  variant="primary"
                  className="py-2.5 px-5"
                >
                  Book Assessment With Dr. Mehta
                </MaxfiitButton>

                <MaxfiitButton
                  onClick={onOpenQRTurnstile}
                  variant="outline"
                  className="py-2.5 px-5 text-white border-neutral-700 bg-neutral-800 hover:bg-neutral-700"
                >
                  Test Turnstile Access
                </MaxfiitButton>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: MUMBAI FLAGSHIP LOCATIONS SHOWCASE (Bandra & Worli)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono font-bold text-[#667085] uppercase tracking-wider">
              [// TWO MUMBAI SANCTUARIES //]
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-[#131313] uppercase tracking-tight">
              WORLD-CLASS ATHLETIC CLUBS
            </h2>
            <p className="text-xs sm:text-sm text-[#667085] max-w-xl">
              Equipped with Eleiko Olympic certified barbells, competition racks, sprint turf bays, and Finnish infrared recovery saunas.
            </p>
          </div>

          <div className="text-xs font-mono text-[#131313] bg-[#ddca24] px-3 py-1.5 rounded-[2px] font-bold self-start md:self-auto">
            All-Access Pass: Train at Both Facilities
          </div>
        </div>

        <ApproachLiner delayMs={100} />

        {/* Interactive 3D Eleiko Olympic Calibrated Equipment Showcase */}
        <AnimatedReveal animation="fade-up" delayMs={120}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-[#131313] text-white p-5 sm:p-7 rounded-[4px] border border-neutral-800 shadow-2xl">
            <div className="lg:col-span-5 space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase text-[#131313] bg-[#ddca24] px-2.5 py-0.5 rounded-[2px] inline-block">
                3D ELEIKO CALIBRATED STEEL
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white">
                Olympic Calibrated Competition Plates
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Both Bandra West and Worli Seaface clubs feature authentic IWF-calibrated Swedish Eleiko steel plates certified to within ±10 grams. Touch and rotate the 3D plate or switch weights below.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-[#ddca24]">
                <span>✓ 50.4mm Olympic Center Hub</span>
                <span>•</span>
                <span>✓ Zero-Bounce Disc Steel</span>
                <span>•</span>
                <span>✓ Precision Weight Bay</span>
              </div>
            </div>

            <div className="lg:col-span-7">
              <OlympicPlateCanvas />
            </div>
          </div>
        </AnimatedReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Location 1: Bandra West */}
          <AnimatedReveal animation="fade-up" delayMs={50}>
            <div className="bg-white border border-[#e4e7eb] rounded-[4px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="h-64 overflow-hidden relative bg-neutral-900">
                <img
                  src="https://cdn.prod.website-files.com/682c50a8fd5c0f71c753acb4/682da493bea7b21e5ee15cbf_About%20Image-p-800.webp"
                  alt="MOVEMENTOR Bandra West Flagship Facility"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 bg-[#131313] text-[#ddca24] font-heading font-black text-xs px-2.5 py-1 rounded-[2px]">
                  BANDRA WEST FLAGSHIP
                </div>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <div className="text-sm font-heading font-black uppercase">Plot 42, Waterfield Road</div>
                    <div className="text-[11px] text-neutral-300">Off Linking Road, Bandra West, Mumbai 400050</div>
                  </div>
                  <span className="font-heading font-black text-xs bg-white text-[#131313] px-2 py-0.5 rounded-[2px]">
                    ★ 4.9 / 5.0
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-4 min-w-0">
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center text-xs p-2.5 sm:p-3 bg-neutral-50 rounded-[3px] border border-neutral-200 min-w-0">
                  <div className="min-w-0">
                    <span className="text-[9px] sm:text-[10px] uppercase font-mono text-[#667085] block truncate">Area</span>
                    <span className="font-heading font-black text-xs sm:text-base text-[#131313] block truncate">12,500 Sq Ft</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] sm:text-[10px] uppercase font-mono text-[#667085] block truncate">Racks</span>
                    <span className="font-heading font-black text-xs sm:text-base text-[#131313] block truncate">8 Eleiko</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] sm:text-[10px] uppercase font-mono text-[#667085] block truncate">Clinic</span>
                    <span className="font-heading font-black text-xs sm:text-base text-emerald-600 block truncate">On-Site</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#667085]">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#ddca24]" />
                    <span>Olympic Weightlifting platforms with Eleiko calibrated competition steel plates</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#ddca24]" />
                    <span>Sports physician consulting suite headed by Dr. Farokh Mehta</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#ddca24]" />
                    <span>Optical QR turnstile gates with 12ms instantaneous biometric unlock</span>
                  </div>
                </div>

                <MaxfiitButton
                  onClick={() => {
                    setSelectedPlanName('Tour Bandra West Facility');
                    setShowInquiryModal(true);
                  }}
                  variant="dark"
                  className="w-full py-2.5 text-xs"
                >
                  Schedule Bandra Facility Walkthrough
                </MaxfiitButton>
              </div>
            </div>
          </AnimatedReveal>

          {/* Location 2: Worli Seaface */}
          <AnimatedReveal animation="fade-up" delayMs={150}>
            <div className="bg-white border border-[#e4e7eb] rounded-[4px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="h-64 overflow-hidden relative bg-neutral-900">
                <img
                  src="https://cdn.prod.website-files.com/682c50a8fd5c0f71c753acb4/68381747e03303cd5ab4e92f_CTA%20Image-p-800.webp"
                  alt="MOVEMENTOR Worli Seaface Athletic Club"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 bg-[#131313] text-[#ddca24] font-heading font-black text-xs px-2.5 py-1 rounded-[2px]">
                  WORLI SEAFACE ATHLETIC CLUB
                </div>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <div className="text-sm font-heading font-black uppercase">Horizon Commercial, Level 14</div>
                    <div className="text-[11px] text-neutral-300">Dr Annie Besant Road, Worli, Mumbai 400018</div>
                  </div>
                  <span className="font-heading font-black text-xs bg-white text-[#131313] px-2 py-0.5 rounded-[2px]">
                    ★ 4.95 / 5.0
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-4 min-w-0">
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center text-xs p-2.5 sm:p-3 bg-neutral-50 rounded-[3px] border border-neutral-200 min-w-0">
                  <div className="min-w-0">
                    <span className="text-[9px] sm:text-[10px] uppercase font-mono text-[#667085] block truncate">Area</span>
                    <span className="font-heading font-black text-xs sm:text-base text-[#131313] block truncate">15,000 Sq Ft</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] sm:text-[10px] uppercase font-mono text-[#667085] block truncate">Sprint</span>
                    <span className="font-heading font-black text-xs sm:text-base text-[#131313] block truncate">30m Turf</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] sm:text-[10px] uppercase font-mono text-[#667085] block truncate">View</span>
                    <span className="font-heading font-black text-xs sm:text-base text-emerald-600 block truncate">Seaface</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#667085]">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#ddca24]" />
                    <span>Panoramic Arabian Sea vista with ceiling-to-floor acoustic soundproofing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#ddca24]" />
                    <span>Keiser pneumatic resistance cables & Woodway curved sprint treadmills</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#ddca24]" />
                    <span>Finnish cedar infrared sauna & contrast hydrotherapy plunge pools</span>
                  </div>
                </div>

                <MaxfiitButton
                  onClick={() => {
                    setSelectedPlanName('Tour Worli Seaface Facility');
                    setShowInquiryModal(true);
                  }}
                  variant="dark"
                  className="w-full py-2.5 text-xs"
                >
                  Schedule Worli Facility Walkthrough
                </MaxfiitButton>
              </div>
            </div>
          </AnimatedReveal>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: WEEKLY TIMETABLE & TURNSTILE BOOKING (ScheduleSection)
         ========================================================================= */}
      <AnimatedReveal animation="fade-up" delayMs={100}>
        <ScheduleSection onBookTurnstile={onOpenQRTurnstile} />
      </AnimatedReveal>

      {/* =========================================================================
          SECTION 6: MEMBERSHIP PLANS (Maxfiit Clean Pricing Cards)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-mono font-bold text-[#667085] uppercase tracking-wider">
            [// INVEST IN HUMAN LONGEVITY //]
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-black text-[#131313] uppercase tracking-tight">
            MEMBERSHIP TIERS
          </h2>
          <p className="text-xs sm:text-sm text-[#667085]">
            Dual-branch access to Bandra West & Worli Seaface facilities. Biometric optical turnstile check-in, physician assessments, and elite coaching included.
          </p>
        </div>

        <ApproachLiner delayMs={100} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Plan 1 */}
          <AnimatedReveal animation="fade-up" delayMs={50}>
            <div className="bg-white border border-[#e4e7eb] rounded-[4px] p-6 sm:p-8 space-y-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-neutral-100 rounded-[2px] text-neutral-600 inline-block">
                  Quarterly Tier
                </span>
                <h3 className="font-heading text-2xl font-black text-[#131313] uppercase">Quarterly Single Club</h3>
                <div className="font-mono text-3xl sm:text-4xl font-black text-[#131313]">
                  ₹22,000 <span className="text-xs font-normal text-[#667085]">/ 90 days</span>
                </div>
                <p className="text-xs text-[#667085] leading-relaxed">
                  Dedicated access to your preferred home facility (Bandra or Worli) with optical turnstile access.
                </p>

                <div className="pt-4 border-t border-neutral-100 space-y-2.5 text-xs text-[#667085]">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#131313]" />
                    <span>Full floor equipment & lifting bay access</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#131313]" />
                    <span>Locker and shower facility privileges</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#131313]" />
                    <span>1 Complimentary movement screen</span>
                  </div>
                </div>
              </div>

              <MaxfiitButton
                onClick={() => {
                  setSelectedPlanName('Quarterly Single Club (₹22,000)');
                  setShowInquiryModal(true);
                }}
                variant="outline"
                className="w-full py-3 text-xs"
              >
                Select Quarterly Plan
              </MaxfiitButton>
            </div>
          </AnimatedReveal>

          {/* Plan 2: Most Popular */}
          <AnimatedReveal animation="fade-up" delayMs={150}>
            <div className="bg-white border-2 border-[#131313] rounded-[4px] p-6 sm:p-8 space-y-6 shadow-xl relative flex flex-col justify-between transform md:-translate-y-2">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#ddca24] text-[#131313] px-3 py-0.5 rounded-[2px] font-heading font-black text-xs uppercase tracking-wider shadow-sm">
                MOST POPULAR IN MUMBAI
              </div>

              <div className="space-y-4 pt-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-[#131313] text-[#ddca24] rounded-[2px] inline-block">
                  Annual All-Access Pass
                </span>
                <h3 className="font-heading text-2xl font-black text-[#131313] uppercase">Annual Mumbai Network</h3>
                <div className="font-mono text-3xl sm:text-4xl font-black text-[#131313]">
                  ₹65,000 <span className="text-xs font-normal text-[#667085]">/ 365 days</span>
                </div>
                <p className="text-xs text-[#667085] leading-relaxed">
                  Seamless dual-facility turnstile access to both Bandra West and Worli Seaface clubs 365 days a year.
                </p>

                <div className="pt-4 border-t border-neutral-100 space-y-2.5 text-xs text-[#131313] font-medium">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#ddca24]" />
                    <span>Unlimited cross-branch check-ins</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#ddca24]" />
                    <span>4 Sports physician clinical reviews / year</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#ddca24]" />
                    <span>Infrared cedar sauna & contrast plunge pools</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#ddca24]" />
                    <span>30-Day membership freeze privilege</span>
                  </div>
                </div>
              </div>

              <MaxfiitButton
                onClick={() => {
                  setSelectedPlanName('Annual Mumbai Network (₹65,000)');
                  setShowInquiryModal(true);
                }}
                variant="primary"
                className="w-full py-3 text-xs"
              >
                Join Annual Network
              </MaxfiitButton>
            </div>
          </AnimatedReveal>

          {/* Plan 3 */}
          <AnimatedReveal animation="fade-up" delayMs={250}>
            <div className="bg-white border border-[#e4e7eb] rounded-[4px] p-6 sm:p-8 space-y-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-neutral-100 rounded-[2px] text-neutral-600 inline-block">
                  Elite VIP Clinical Tier
                </span>
                <h3 className="font-heading text-2xl font-black text-[#131313] uppercase">Athlete VIP Concierge</h3>
                <div className="font-mono text-3xl sm:text-4xl font-black text-[#131313]">
                  ₹1,20,000 <span className="text-xs font-normal text-[#667085]">/ 365 days</span>
                </div>
                <p className="text-xs text-[#667085] leading-relaxed">
                  Tailored for competitive lifters, executives, and athletes requiring dedicated 1-on-1 coaching & medical assessment.
                </p>

                <div className="pt-4 border-t border-neutral-100 space-y-2.5 text-xs text-[#667085]">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#131313]" />
                    <span>24 Personal training sessions included</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#131313]" />
                    <span>Monthly orthopedic screening with Dr. Mehta</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#131313]" />
                    <span>Dedicated permanent locker & valet parking</span>
                  </div>
                </div>
              </div>

              <MaxfiitButton
                onClick={() => {
                  setSelectedPlanName('Athlete VIP Concierge (₹1,20,000)');
                  setShowInquiryModal(true);
                }}
                variant="dark"
                className="w-full py-3 text-xs"
              >
                Apply for VIP Tier
              </MaxfiitButton>
            </div>
          </AnimatedReveal>

        </div>
      </section>

      {/* =========================================================================
          SECTION 7: FACILITY PERFORMANCE GALLERY MARQUEE
         ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono font-bold text-[#667085] uppercase tracking-wider">
              [// HIGH PERFORMANCE GALLERY //]
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-[#131313] uppercase">
              Mumbai Training Grounds
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-400">Continuous 60FPS Scroll</span>
        </div>

        <ApproachLiner delayMs={100} />

        <GalleryMarquee />
      </section>

      {/* =========================================================================
          INQUIRY & MOVEMENT ASSESSMENT MODAL
         ========================================================================= */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white border border-[#e4e7eb] rounded-[4px] p-6 sm:p-8 shadow-2xl space-y-6">
            
            <div className="flex items-start justify-between pb-4 border-b border-[#e4e7eb]">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#131313] bg-[#ddca24] px-2 py-0.5 rounded-[2px]">
                  MUMBAI ADMISSIONS
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-black text-[#131313] uppercase mt-1">
                  Begin Your Journey
                </h3>
                <p className="text-xs text-[#667085]">
                  Plan Selected: <strong className="text-[#131313]">{selectedPlanName}</strong>
                </p>
              </div>

              <button
                onClick={() => setShowInquiryModal(false)}
                className="p-1.5 text-neutral-400 hover:text-[#131313] rounded"
              >
                ✕
              </button>
            </div>

            {inquirySent ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h4 className="font-heading text-2xl font-black text-[#131313] uppercase">
                  Assessment Scheduled!
                </h4>
                <p className="text-xs text-[#667085]">
                  Our Head of Admissions will contact you via WhatsApp to finalize your turnstile gate credentials and time slot.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#131313] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aryan Malhotra"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-[#e4e7eb] rounded-[2px] text-xs text-[#131313] focus:border-[#131313] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#131313] mb-1">Mobile / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98200 12345"
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-[#e4e7eb] rounded-[2px] text-xs text-[#131313] focus:border-[#131313] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#131313] mb-1">Preferred Facility</label>
                    <select
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-[#e4e7eb] rounded-[2px] text-xs text-[#131313] focus:border-[#131313] focus:outline-none"
                    >
                      <option>Bandra West Flagship</option>
                      <option>Worli Seaface Club</option>
                      <option>Both (Dual Access)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#131313] mb-1">Athletic Background & Goals</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Prior powerlifting experience, rehabilitation from ACL reconstruction..."
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-[#e4e7eb] rounded-[2px] text-xs text-[#131313] focus:border-[#131313] focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowInquiryModal(false)}
                    className="px-4 py-2.5 text-xs font-heading font-black uppercase text-[#667085] hover:text-[#131313]"
                  >
                    Cancel
                  </button>
                  <MaxfiitButton
                    type="submit"
                    variant="primary"
                    className="py-2.5 px-6 text-xs"
                  >
                    Confirm Registration
                  </MaxfiitButton>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

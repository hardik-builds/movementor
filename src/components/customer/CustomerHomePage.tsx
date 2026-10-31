import React, { useState, useEffect, useRef } from 'react';
import { AnimatedReveal } from '../common/AnimatedReveal';
import { TextReveal } from '../common/TextReveal';
import { ImageReveal } from '../common/ImageReveal';
import { MaxfiitButton } from '../common/MaxfiitButton';
import { ApproachLiner } from '../common/ApproachLiner';
import { GalleryMarquee } from '../common/GalleryMarquee';
import { InstagramLookbook } from './InstagramLookbook';
import { SkeletonMuscleCanvas, MuscleHighlightTarget } from '../3d/SkeletonMuscleCanvas';
import { OlympicPlateCanvas } from '../3d/OlympicPlateCanvas';
import { BiometricKeycardCanvas } from '../3d/BiometricKeycardCanvas';
import { KineticOrbCanvas } from '../3d/KineticOrbCanvas';
import { 
  Check, 
  ArrowRight,
  MapPin, 
  Clock, 
  ShieldCheck, 
  Instagram, 
  ExternalLink,
  ChevronRight,
  Flame,
  Sparkles,
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
  const [selectedPlanName, setSelectedPlanName] = useState('Annual Mumbai Network Pass');

  // Interactive scroll observer to trigger muscle highlight as user scrolls down
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const phase3Ref = useRef<HTMLDivElement>(null);
  const phase4Ref = useRef<HTMLDivElement>(null);
  const phase5Ref = useRef<HTMLDivElement>(null);
  const phase6Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpenModal = (e: any) => {
      if (e.detail?.plan) setSelectedPlanName(e.detail.plan);
      setShowInquiryModal(true);
    };
    window.addEventListener('open-inquiry-modal', handleOpenModal);

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const focus = entry.target.getAttribute('data-focus') as any;
          if (focus) setActiveMuscleFocus(focus);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: [0.15, 0.4, 0.7],
      rootMargin: '-5% 0px -15% 0px'
    });

    const phaseRefs = [phase1Ref, phase2Ref, phase3Ref, phase4Ref, phase5Ref, phase6Ref];
    phaseRefs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    const handleScrollCheck = () => {
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
      window.removeEventListener('open-inquiry-modal', handleOpenModal);
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
    <div className="space-y-24 sm:space-y-32">
      
      {/* =========================================================================
          SECTION 1: EDITORIAL HERO (Photo-Dominant, Luxury Minimal, Anovi Style)
         ========================================================================= */}
      <section className="relative overflow-hidden pt-4 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Refined Luxury Typography */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Minimal Brand Identifier */}
            <div className="inline-flex items-center space-x-2.5 px-3 py-1 bg-[#131313] text-[#ddca24] text-[10px] sm:text-[11px] font-montserrat font-bold tracking-[0.25em] uppercase rounded-[2px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ddca24] animate-ping" />
              <span>EST. MUMBAI // BANDRA • WORLI • CHEMBUR</span>
            </div>

            {/* Headline with Serif & Bold Athletic Hybrid (Anovi Haute Feel) */}
            <div className="space-y-1">
              <span className="block font-serif text-3xl sm:text-5xl lg:text-6xl font-light italic text-neutral-600 tracking-wide">
                The Science of
              </span>
              <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-black text-[#131313] uppercase tracking-tight leading-[0.92]">
                PEAK HUMAN MOVEMENT.
              </h1>
            </div>

            {/* Concise Editorial Copy */}
            <p className="text-sm sm:text-base text-neutral-600 font-montserrat font-light leading-relaxed max-w-xl">
              Movementor is Mumbai’s sanctuary for progressive strength conditioning, Olympic barbell mechanics, and orthopedic sports science. Engineered for athletes, founders, and discerning movers.
            </p>

            {/* High-End Action Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedPlanName('Complimentary Movement Assessment');
                  setShowInquiryModal(true);
                }}
                className="px-6 py-3.5 bg-[#ddca24] hover:bg-[#131313] text-[#131313] hover:text-white font-montserrat font-bold text-xs tracking-widest uppercase transition-all duration-300 rounded-[2px] shadow-sm flex items-center justify-center space-x-2 group"
              >
                <span>Book Assessment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  const el = document.querySelector('#disciplines');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 border border-neutral-300 hover:border-[#131313] text-neutral-800 hover:text-[#131313] font-montserrat font-semibold text-xs tracking-widest uppercase transition-all duration-300 rounded-[2px] text-center"
              >
                Explore Disciplines
              </button>

              <button
                onClick={onOpenQRTurnstile}
                className="px-5 py-3.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-montserrat text-xs tracking-wider uppercase rounded-[2px] transition-colors flex items-center justify-center space-x-1.5"
                title="Test Optical Turnstile Simulator"
              >
                <QrCode className="w-3.5 h-3.5 text-[#131313]" />
                <span className="hidden sm:inline">Turnstile Gate</span>
              </button>
            </div>

            {/* Minimal Stat Strip */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-neutral-200">
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-light text-[#131313] block">12,500</span>
                <span className="text-[10px] font-montserrat tracking-widest uppercase text-neutral-500 block">Sq Ft Facilities</span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-light text-[#131313] block">100%</span>
                <span className="text-[10px] font-montserrat tracking-widest uppercase text-neutral-500 block">Eleiko Certified</span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-light text-[#ddca24] block">05:30</span>
                <span className="text-[10px] font-montserrat tracking-widest uppercase text-neutral-500 block">Daily Access</span>
              </div>
            </div>

          </div>

          {/* Right Column: Full-Bleed High-Definition Athletic Photography */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative group rounded-[3px] overflow-hidden shadow-2xl bg-neutral-900 border border-neutral-200">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1600"
                  alt="Movementor Athlete Training with Calibrated Steel"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)]"
                />
              </div>

              {/* Minimalist Floating Corner Badges */}
              <div className="absolute top-4 left-4 bg-[#131313]/90 backdrop-blur-md text-[#ddca24] px-3 py-1 text-[10px] font-mono tracking-widest uppercase rounded-[2px] border border-[#ddca24]/30">
                // ELEIKO SANCTUARY
              </div>

              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-[2px] border border-neutral-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">Mumbai Flagship</span>
                  <span className="font-heading font-black text-sm text-[#131313] uppercase block">Bandra West & Worli Seaface</span>
                </div>
                <div className="w-8 h-8 rounded-[2px] bg-[#ddca24] text-[#131313] flex items-center justify-center font-heading font-black text-xs">
                  MV
                </div>
              </div>
            </div>

            {/* Interactive 3D Biometric Pass (Clean & Compact) */}
            <div className="p-3 bg-white border border-neutral-200 rounded-[3px] shadow-sm">
              <BiometricKeycardCanvas onScanPass={onOpenQRTurnstile} />
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: EDITORIAL PHILOSOPHY (Anovi Haute Atelier Quote & Photo Story)
         ========================================================================= */}
      <section id="philosophy" className="relative border-y border-neutral-200 py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-6 px-4">
          <span className="text-[11px] font-montserrat font-bold tracking-[0.3em] uppercase text-neutral-400 block">
            — THE MOVEMENTOR PHILOSOPHY —
          </span>
          <blockquote className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-[#131313] leading-relaxed tracking-tight">
            “Strength is neither accidental nor brute force. It is the uncompromising calibration of structural integrity, joint longevity, and neurological intent.”
          </blockquote>
          <div className="pt-4 flex flex-col items-center space-y-1">
            <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-[#131313]">
              Faculty of Sports Medicine & Biomechanics
            </span>
            <span className="text-xs font-montserrat text-neutral-500 font-light">
              Movementor Strength & Conditioning Academy • Mumbai
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: PHOTO-DOMINANT DISCIPLINES (Anovi Collection Style)
         ========================================================================= */}
      <section id="disciplines" className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 pb-4">
          <div className="space-y-1">
            <span className="text-[11px] font-montserrat font-bold tracking-[0.25em] uppercase text-neutral-400 block">
              01 // CURATED DISCIPLINES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#131313] tracking-tight">
              Performance Pillars
            </h2>
          </div>
          <p className="text-xs font-montserrat font-light text-neutral-500 max-w-md">
            Each discipline is overseen by accredited sports physicians and competitive strength coaches.
          </p>
        </div>

        {/* 4 Large Editorial Photo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="group relative bg-white border border-neutral-200 rounded-[3px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="aspect-[3/4] overflow-hidden bg-neutral-900 relative">
              <img
                src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=1200"
                alt="Olympic Calibrated Steel"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)]"
              />
              <div className="absolute top-3 left-3 bg-[#131313]/90 text-[#ddca24] text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-[2px]">
                01 // STRENGTH
              </div>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="font-heading font-black text-xl text-[#131313] uppercase tracking-wide group-hover:text-[#ddca24] transition-colors">
                Biomechanical Strength
              </h3>
              <p className="text-xs font-montserrat font-light text-neutral-600 leading-relaxed">
                Swedish Eleiko competition platforms, calibrated steel, and coached compound lifting mechanics.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative bg-white border border-neutral-200 rounded-[3px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="aspect-[3/4] overflow-hidden bg-neutral-900 relative">
              <img
                src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=1200"
                alt="High-Velocity Conditioning Turf"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)]"
              />
              <div className="absolute top-3 left-3 bg-[#131313]/90 text-[#ddca24] text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-[2px]">
                02 // SPRINT & TURF
              </div>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="font-heading font-black text-xl text-[#131313] uppercase tracking-wide group-hover:text-[#ddca24] transition-colors">
                Athletic Conditioning
              </h3>
              <p className="text-xs font-montserrat font-light text-neutral-600 leading-relaxed">
                30-meter high-density sprint turf, heavy dog sleds, and Woodway curved motorless treadmills.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative bg-white border border-neutral-200 rounded-[3px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="aspect-[3/4] overflow-hidden bg-neutral-900 relative">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1200"
                alt="Physician-Led Rehabilitation"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)]"
              />
              <div className="absolute top-3 left-3 bg-[#131313]/90 text-[#ddca24] text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-[2px]">
                03 // CLINICAL
              </div>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="font-heading font-black text-xl text-[#131313] uppercase tracking-wide group-hover:text-[#ddca24] transition-colors">
                Spine & Orthopedics
              </h3>
              <p className="text-xs font-montserrat font-light text-neutral-600 leading-relaxed">
                On-floor sports physicians screen pelvic alignment and range of motion to eliminate chronic pain.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="group relative bg-white border border-neutral-200 rounded-[3px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="aspect-[3/4] overflow-hidden bg-neutral-900 relative">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200"
                alt="Infrared Cedar Sauna & Recovery"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)]"
              />
              <div className="absolute top-3 left-3 bg-[#131313]/90 text-[#ddca24] text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-[2px]">
                04 // RECOVERY
              </div>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="font-heading font-black text-xl text-[#131313] uppercase tracking-wide group-hover:text-[#ddca24] transition-colors">
                Infrared & Hydrotherapy
              </h3>
              <p className="text-xs font-montserrat font-light text-neutral-600 leading-relaxed">
                Finnish cedar infrared saunas and contrast cold plunge pools for autonomic nervous system reset.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: THE 3D MUSCULAR ANATOMY ENGINE (Interactive & Sticky)
         ========================================================================= */}
      <section id="anatomy" className="space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 pb-4">
          <div className="space-y-1">
            <span className="text-[11px] font-montserrat font-bold tracking-[0.25em] uppercase text-neutral-400 block">
              02 // INTERACTIVE 3D ANATOMY ENGINE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#131313] tracking-tight">
              The Kinetic Muscle Chain
            </h2>
          </div>
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-neutral-600 bg-white border border-neutral-200 px-3 py-1.5 rounded-[2px] self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#ddca24] animate-ping" />
            <span>Scroll or Touch to Orbit 3D Anatomy</span>
          </div>
        </div>

        {/* Two-Column Sticky Container */}
        <div className="block lg:grid lg:grid-cols-12 gap-8 items-start relative">
          
          {/* LEFT: Pure Sticky 3D Anatomy Canvas (Anchored, never jumping) */}
          <div className="lg:col-span-5 sticky top-20 sm:top-24 z-30 mb-6 lg:mb-0">
            <div className="bg-white p-3 rounded-[3px] border border-neutral-200 shadow-xl">
              <SkeletonMuscleCanvas
                activeFocus={activeMuscleFocus}
                onSelectMuscle={(target: MuscleHighlightTarget) => setActiveMuscleFocus(target.focusArea)}
                className="w-full"
              />
            </div>
          </div>

          {/* RIGHT: Minimalist, Photo-Accented Stage Cards */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Stage 1: Chest */}
            <div
              ref={phase1Ref}
              data-focus="chest"
              onClick={() => setActiveMuscleFocus('chest')}
              className={`p-6 rounded-[3px] border transition-all duration-300 cursor-pointer ${
                activeMuscleFocus === 'chest'
                  ? 'bg-white border-[#ddca24] ring-2 ring-[#ddca24]/20 shadow-xl'
                  : 'bg-white/90 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">Stage 01 // Anterior</span>
                  <h3 className="font-heading font-black text-2xl text-[#131313] uppercase mt-1">
                    Pectoralis Major & Compound Push
                  </h3>
                </div>
                <span className="font-serif text-2xl font-light text-[#ddca24]">01</span>
              </div>
              <p className="text-xs sm:text-sm font-montserrat text-neutral-600 mt-2 font-light leading-relaxed">
                Coached clavicular and sternocostal recruitment with calibrated Eleiko competition benches.
              </p>
            </div>

            {/* Stage 2: Back */}
            <div
              ref={phase2Ref}
              data-focus="back"
              onClick={() => setActiveMuscleFocus('back')}
              className={`p-6 rounded-[3px] border transition-all duration-300 cursor-pointer ${
                activeMuscleFocus === 'back'
                  ? 'bg-white border-[#ddca24] ring-2 ring-[#ddca24]/20 shadow-xl'
                  : 'bg-white/90 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">Stage 02 // Posterior</span>
                  <h3 className="font-heading font-black text-2xl text-[#131313] uppercase mt-1">
                    Latissimus Dorsi & Spinal Erectors
                  </h3>
                </div>
                <span className="font-serif text-2xl font-light text-[#ddca24]">02</span>
              </div>
              <p className="text-xs sm:text-sm font-montserrat text-neutral-600 mt-2 font-light leading-relaxed">
                Oak-insert deadlift platforms protect the joints while Pendlay rows develop impenetrable mid-back thickness.
              </p>
            </div>

            {/* Stage 3: Shoulders */}
            <div
              ref={phase3Ref}
              data-focus="shoulders"
              onClick={() => setActiveMuscleFocus('shoulders')}
              className={`p-6 rounded-[3px] border transition-all duration-300 cursor-pointer ${
                activeMuscleFocus === 'shoulders'
                  ? 'bg-white border-[#ddca24] ring-2 ring-[#ddca24]/20 shadow-xl'
                  : 'bg-white/90 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">Stage 03 // Deltoids</span>
                  <h3 className="font-heading font-black text-2xl text-[#131313] uppercase mt-1">
                    Deltoid Architecture & Rotator Health
                  </h3>
                </div>
                <span className="font-serif text-2xl font-light text-[#ddca24]">03</span>
              </div>
              <p className="text-xs sm:text-sm font-montserrat text-neutral-600 mt-2 font-light leading-relaxed">
                Pneumatic Keiser cable towers provide smooth, inertia-free resistance to balance shoulder capsule stability.
              </p>
            </div>

            {/* Stage 4: Core */}
            <div
              ref={phase4Ref}
              data-focus="core"
              onClick={() => setActiveMuscleFocus('core')}
              className={`p-6 rounded-[3px] border transition-all duration-300 cursor-pointer ${
                activeMuscleFocus === 'core'
                  ? 'bg-white border-[#ddca24] ring-2 ring-[#ddca24]/20 shadow-xl'
                  : 'bg-white/90 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">Stage 04 // Core Engine</span>
                  <h3 className="font-heading font-black text-2xl text-[#131313] uppercase mt-1">
                    Rectus Abdominis & Transverse Torque
                  </h3>
                </div>
                <span className="font-serif text-2xl font-light text-[#ddca24]">04</span>
              </div>
              <p className="text-xs sm:text-sm font-montserrat text-neutral-600 mt-2 font-light leading-relaxed">
                Anti-extension bracing and rotational force transmission evaluated by sports physiotherapists.
              </p>
            </div>

            {/* Stage 5: Legs */}
            <div
              ref={phase5Ref}
              data-focus="legs"
              onClick={() => setActiveMuscleFocus('legs')}
              className={`p-6 rounded-[3px] border transition-all duration-300 cursor-pointer ${
                activeMuscleFocus === 'legs'
                  ? 'bg-white border-[#ddca24] ring-2 ring-[#ddca24]/20 shadow-xl'
                  : 'bg-white/90 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">Stage 05 // Lower Engine</span>
                  <h3 className="font-heading font-black text-2xl text-[#131313] uppercase mt-1">
                    Quadriceps, Hamstrings & Gluteal Drive
                  </h3>
                </div>
                <span className="font-serif text-2xl font-light text-[#ddca24]">05</span>
              </div>
              <p className="text-xs sm:text-sm font-montserrat text-neutral-600 mt-2 font-light leading-relaxed">
                Full-depth Olympic squats and high-velocity sled propulsion across 30-meter high-density turf.
              </p>
            </div>

            {/* Stage 6: Integrated Biomechanical Symphony */}
            <div
              ref={phase6Ref}
              data-focus="full"
              onClick={() => setActiveMuscleFocus('full')}
              className={`p-6 rounded-[3px] border transition-all duration-300 cursor-pointer ${
                activeMuscleFocus === 'full'
                  ? 'bg-[#131313] text-white border-[#ddca24] ring-2 ring-[#ddca24]/30 shadow-2xl'
                  : 'bg-neutral-900 text-white border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#ddca24] block">Stage 06 // Mastery</span>
                  <h3 className="font-heading font-black text-2xl text-white uppercase mt-1">
                    Integrated Kinetic Mastery
                  </h3>
                </div>
                <span className="font-serif text-2xl font-light text-[#ddca24]">06</span>
              </div>
              <p className="text-xs sm:text-sm font-montserrat text-neutral-300 mt-2 font-light leading-relaxed">
                Complete kinetic integration: every joint, fascia, and neural pathway synchronized with real-time biometric tracking.
              </p>

              {/* 3D Kinetic HRV Orb */}
              <div className="mt-4">
                <KineticOrbCanvas />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: 3D ELEIKO OLYMPIC CALIBRATED STEEL SHOWCASE
         ========================================================================= */}
      <section className="bg-[#131313] text-white p-6 sm:p-10 lg:p-12 rounded-[4px] border border-neutral-800 shadow-2xl select-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#ddca24] bg-neutral-800 px-3 py-1 rounded-[2px] inline-block">
              // 3D INTERACTIVE ELEIKO STEEL //
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight">
              Swedish Olympic Competition Steel
            </h3>
            <p className="text-xs sm:text-sm font-montserrat font-light text-neutral-400 leading-relaxed">
              Touch, rotate, and swipe the 3D calibrated plate. Calibrated to within ±10 grams for true kinetic balance in both Bandra and Worli.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-[#ddca24]">
              <span>✓ IWF Certified</span>
              <span>•</span>
              <span>✓ 50.4mm Hub</span>
              <span>•</span>
              <span>✓ Zero Bounce</span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <OlympicPlateCanvas />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: MUMBAI SANCTUARIES (Bandra & Worli Seaface)
         ========================================================================= */}
      <section id="sanctuaries" className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 pb-4">
          <div className="space-y-1">
            <span className="text-[11px] font-montserrat font-bold tracking-[0.25em] uppercase text-neutral-400 block">
              03 // MUMBAI LOCATIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#131313] tracking-tight">
              Flagship Sanctuaries
            </h2>
          </div>
          <span className="text-xs font-montserrat font-semibold text-[#131313] bg-[#ddca24] px-3 py-1 rounded-[2px] self-start sm:self-auto">
            Dual Facility Access Included
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Facility 1: Bandra West */}
          <div className="group bg-white border border-neutral-200 rounded-[3px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
            <div className="aspect-[16/10] overflow-hidden bg-neutral-900 relative">
              <img
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200"
                alt="Movementor Bandra West Facility"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)]"
              />
              <div className="absolute top-4 left-4 bg-[#131313] text-[#ddca24] font-montserrat font-bold text-xs px-3 py-1 rounded-[2px] uppercase tracking-wider">
                Bandra West Flagship
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div>
                <h3 className="font-heading font-black text-2xl text-[#131313] uppercase">
                  Plot 42, Waterfield Road
                </h3>
                <p className="text-xs font-montserrat text-neutral-500 font-light mt-0.5">
                  Off Linking Road, Bandra West, Mumbai 400050
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 p-3 bg-neutral-50 rounded-[2px] border border-neutral-100 text-center">
                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block">Area</span>
                  <span className="font-heading font-black text-sm text-[#131313]">12,500 Sq Ft</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block">Racks</span>
                  <span className="font-heading font-black text-sm text-[#131313]">8 Eleiko</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block">Hours</span>
                  <span className="font-heading font-black text-sm text-[#ddca24]">05:30 - 23:00</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedPlanName('Bandra West Facility Tour');
                  setShowInquiryModal(true);
                }}
                className="w-full py-3 bg-[#131313] hover:bg-[#ddca24] hover:text-[#131313] text-white font-montserrat font-semibold text-xs tracking-wider uppercase rounded-[2px] transition-colors"
              >
                Schedule Bandra Walkthrough
              </button>
            </div>
          </div>

          {/* Facility 2: Worli Seaface */}
          <div className="group bg-white border border-neutral-200 rounded-[3px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
            <div className="aspect-[16/10] overflow-hidden bg-neutral-900 relative">
              <img
                src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=1200"
                alt="Movementor Worli Seaface Athletic Club"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)]"
              />
              <div className="absolute top-4 left-4 bg-[#131313] text-[#ddca24] font-montserrat font-bold text-xs px-3 py-1 rounded-[2px] uppercase tracking-wider">
                Worli Seaface Athletic Club
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div>
                <h3 className="font-heading font-black text-2xl text-[#131313] uppercase">
                  Horizon Commercial, Level 14
                </h3>
                <p className="text-xs font-montserrat text-neutral-500 font-light mt-0.5">
                  Dr Annie Besant Road, Worli Seaface, Mumbai 400018
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 p-3 bg-neutral-50 rounded-[2px] border border-neutral-100 text-center">
                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block">Area</span>
                  <span className="font-heading font-black text-sm text-[#131313]">15,000 Sq Ft</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block">Turf</span>
                  <span className="font-heading font-black text-sm text-[#131313]">30m Sprint</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block">Hours</span>
                  <span className="font-heading font-black text-sm text-[#ddca24]">05:30 - 23:00</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedPlanName('Worli Seaface Facility Tour');
                  setShowInquiryModal(true);
                }}
                className="w-full py-3 bg-[#131313] hover:bg-[#ddca24] hover:text-[#131313] text-white font-montserrat font-semibold text-xs tracking-wider uppercase rounded-[2px] transition-colors"
              >
                Schedule Worli Walkthrough
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 7: INSTAGRAM LOOKBOOK & SOCIAL JOURNAL (@official_movementor)
         ========================================================================= */}
      <section id="lookbook">
        <InstagramLookbook />
      </section>

      {/* =========================================================================
          SECTION 8: MEMBERSHIP TIERS (Minimalist Luxury Cards, Anovi Aesthetic)
         ========================================================================= */}
      <section id="membership" className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-montserrat font-bold tracking-[0.3em] uppercase text-neutral-400 block">
            04 // PRIVATE ADMISSIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#131313] tracking-tight">
            Membership Privileges
          </h2>
          <p className="text-xs sm:text-sm font-montserrat font-light text-neutral-500">
            Full dual-branch turnstile credentials to Bandra West & Worli Seaface clubs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          
          {/* Tier 1 */}
          <div className="bg-white border border-neutral-200 rounded-[3px] p-6 sm:p-8 space-y-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 px-2 py-0.5 bg-neutral-100 rounded-[2px] inline-block">
                Quarterly
              </span>
              <h3 className="font-serif text-2xl font-light text-[#131313]">Single Club Pass</h3>
              <div className="font-serif text-3xl sm:text-4xl font-light text-[#131313]">
                ₹22,000 <span className="text-xs font-montserrat font-light text-neutral-500">/ 90 days</span>
              </div>
              <p className="text-xs font-montserrat font-light text-neutral-600 leading-relaxed">
                Dedicated turnstile access to your preferred home facility (Bandra or Worli).
              </p>
              <div className="pt-4 border-t border-neutral-100 space-y-2 text-xs font-montserrat font-light text-neutral-600">
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#131313]" />
                  <span>Eleiko platform & floor equipment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#131313]" />
                  <span>1 Sports physician movement assessment</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedPlanName('Quarterly Single Club Pass (₹22,000)');
                setShowInquiryModal(true);
              }}
              className="w-full py-3 border border-neutral-300 hover:border-[#131313] text-neutral-800 hover:text-[#131313] font-montserrat font-semibold text-xs tracking-wider uppercase rounded-[2px] transition-colors"
            >
              Select Quarterly Tier
            </button>
          </div>

          {/* Tier 2: Most Popular */}
          <div className="bg-white border-2 border-[#131313] rounded-[3px] p-6 sm:p-8 space-y-6 shadow-xl relative flex flex-col justify-between transform md:-translate-y-2">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ddca24] text-[#131313] px-3 py-0.5 rounded-[2px] font-montserrat font-bold text-[10px] uppercase tracking-widest shadow-sm">
              MOST COVETED
            </div>

            <div className="space-y-4 pt-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#ddca24] bg-[#131313] px-2 py-0.5 rounded-[2px] inline-block">
                Annual All-Access
              </span>
              <h3 className="font-serif text-2xl font-light text-[#131313]">Annual Mumbai Network</h3>
              <div className="font-serif text-3xl sm:text-4xl font-light text-[#131313]">
                ₹65,000 <span className="text-xs font-montserrat font-light text-neutral-500">/ 365 days</span>
              </div>
              <p className="text-xs font-montserrat font-light text-neutral-600 leading-relaxed">
                Seamless dual-facility turnstile credentials for both Bandra West and Worli Seaface sanctuaries.
              </p>
              <div className="pt-4 border-t border-neutral-100 space-y-2 text-xs font-montserrat font-light text-neutral-800">
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#ddca24]" />
                  <span>Unlimited cross-branch check-ins</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#ddca24]" />
                  <span>4 Sports physician clinical reviews / year</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#ddca24]" />
                  <span>Finnish cedar infrared sauna & cold plunge</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedPlanName('Annual Mumbai Network Pass (₹65,000)');
                setShowInquiryModal(true);
              }}
              className="w-full py-3 bg-[#ddca24] hover:bg-[#131313] text-[#131313] hover:text-white font-montserrat font-bold text-xs tracking-wider uppercase rounded-[2px] transition-colors"
            >
              Apply For Network Pass
            </button>
          </div>

          {/* Tier 3 */}
          <div className="bg-white border border-neutral-200 rounded-[3px] p-6 sm:p-8 space-y-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 px-2 py-0.5 bg-neutral-100 rounded-[2px] inline-block">
                VIP Clinical
              </span>
              <h3 className="font-serif text-2xl font-light text-[#131313]">Athlete VIP Concierge</h3>
              <div className="font-serif text-3xl sm:text-4xl font-light text-[#131313]">
                ₹1,20,000 <span className="text-xs font-montserrat font-light text-neutral-500">/ 365 days</span>
              </div>
              <p className="text-xs font-montserrat font-light text-neutral-600 leading-relaxed">
                For competitive lifters and executives requiring dedicated 1-on-1 coaching & medical protocol.
              </p>
              <div className="pt-4 border-t border-neutral-100 space-y-2 text-xs font-montserrat font-light text-neutral-600">
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#131313]" />
                  <span>24 Private coaching sessions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#131313]" />
                  <span>Permanent locker & valet parking</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedPlanName('Athlete VIP Concierge (₹1,20,000)');
                setShowInquiryModal(true);
              }}
              className="w-full py-3 bg-[#131313] hover:bg-[#ddca24] hover:text-[#131313] text-white font-montserrat font-semibold text-xs tracking-wider uppercase rounded-[2px] transition-colors"
            >
              Apply For VIP Concierge
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 9: INFINITE GALLERY MARQUEE (High-Speed Visual Strip)
         ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
          <span className="text-[11px] font-montserrat font-bold tracking-[0.25em] uppercase text-neutral-400">
            05 // FACILITY GALLERY
          </span>
          <span className="text-xs font-mono text-neutral-400">60FPS Infinite Motion</span>
        </div>
        <GalleryMarquee />
      </section>

      {/* =========================================================================
          INQUIRY & ADMISSION MODAL
         ========================================================================= */}
      {showInquiryModal && (
        <div 
          onClick={() => setShowInquiryModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-white rounded-[4px] p-6 sm:p-8 shadow-2xl space-y-6 border border-neutral-200"
          >
            <div className="flex items-start justify-between pb-4 border-b border-neutral-100">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#131313] bg-[#ddca24] px-2 py-0.5 rounded-[2px]">
                  MUMBAI ADMISSIONS
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#131313] mt-1">
                  Schedule Private Visit
                </h3>
                <p className="text-xs font-montserrat font-light text-neutral-500">
                  Plan: <strong className="text-[#131313]">{selectedPlanName}</strong>
                </p>
              </div>

              <button
                onClick={() => setShowInquiryModal(false)}
                className="p-1 text-neutral-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            {inquirySent ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h4 className="font-serif text-2xl font-light text-[#131313]">
                  Assessment Confirmed
                </h4>
                <p className="text-xs font-montserrat font-light text-neutral-600">
                  Our Head of Admissions will message you on WhatsApp to confirm your optical turnstile pass.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-montserrat font-semibold uppercase text-neutral-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kabir Mehra"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-[2px] text-xs text-[#131313] focus:border-[#131313] focus:outline-none font-montserrat"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-montserrat font-semibold uppercase text-neutral-700 mb-1">WhatsApp Mobile</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98200 12345"
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-[2px] text-xs text-[#131313] focus:border-[#131313] focus:outline-none font-montserrat"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-montserrat font-semibold uppercase text-neutral-700 mb-1">Sanctuary</label>
                    <select
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-[2px] text-xs text-[#131313] focus:border-[#131313] focus:outline-none font-montserrat"
                    >
                      <option>Bandra West Flagship</option>
                      <option>Worli Seaface Club</option>
                      <option>Both (Dual Access)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-montserrat font-semibold uppercase text-neutral-700 mb-1">Athletic Experience / Goals</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Powerlifting experience, post-rehabilitation conditioning..."
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-[2px] text-xs text-[#131313] focus:border-[#131313] focus:outline-none font-montserrat"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowInquiryModal(false)}
                    className="px-4 py-2.5 text-xs font-montserrat uppercase text-neutral-500 hover:text-black"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#ddca24] hover:bg-[#131313] text-[#131313] hover:text-white text-xs font-montserrat font-bold uppercase tracking-wider rounded-[2px] transition-colors"
                  >
                    Confirm Registration
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

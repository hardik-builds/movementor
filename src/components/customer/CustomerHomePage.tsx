import React, { useState, useEffect, useRef } from 'react';
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
  Instagram, 
  ExternalLink,
  ChevronRight,
  Flame,
  Sparkles,
  QrCode,
  ShieldCheck,
  Eye
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
    <div className="space-y-24 sm:space-y-36 relative">
      
      {/* Background Liquid Ambient Glow Orbs */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[90vw] max-w-7xl h-[600px] bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(221,202,36,0.18),transparent_70%)] pointer-events-none -z-10" />
      <div className="absolute top-[1400px] -left-20 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(221,202,36,0.08),transparent_70%)] pointer-events-none -z-10" />
      <div className="absolute top-[2800px] -right-20 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(221,202,36,0.10),transparent_70%)] pointer-events-none -z-10" />

      {/* =========================================================================
          SECTION 1: MASSIVE EDITORIAL HERO (Liquid Glass + Giant Visual Focus)
         ========================================================================= */}
      <section className="relative pt-2 sm:pt-6">
        
        {/* Full-Bleed Liquid Glass Hero Wrapper */}
        <div className="liquid-glass rounded-3xl p-6 sm:p-10 lg:p-14 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Left Side: Editorial Typography & Liquid Glass Badges */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              
              {/* Floating Translucent Liquid Pill Badge */}
              <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 liquid-glass-pill rounded-full text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-[#131313]">
                <span className="w-2 h-2 rounded-full bg-[#ddca24] animate-ping" />
                <span>MUMBAI ATHLETIC ACADEMY // EST. CHEMBUR • BANDRA • WORLI</span>
              </div>

              {/* Headline with Haute Serif & Athletic Contrast */}
              <div className="space-y-2">
                <span className="block font-serif text-3xl sm:text-5xl lg:text-6xl font-light italic text-neutral-600 tracking-wide">
                  The Art of
                </span>
                <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-black text-[#131313] uppercase tracking-tight leading-[0.92]">
                  PEAK HUMAN MASTERY.
                </h1>
              </div>

              {/* Minimalist Editorial Description */}
              <p className="text-sm sm:text-base text-neutral-600 font-montserrat font-light leading-relaxed max-w-lg">
                Movementor is Mumbai’s sanctuary for progressive strength conditioning, Olympic barbell mechanics, and orthopedic sports science. Where lifelong joint resilience replaces guesswork.
              </p>

              {/* Liquid Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  onClick={() => {
                    setSelectedPlanName('Complimentary Movement Assessment');
                    setShowInquiryModal(true);
                  }}
                  className="px-7 py-4 bg-[#ddca24] hover:bg-[#131313] text-[#131313] hover:text-white font-montserrat font-bold text-xs tracking-widest uppercase transition-all duration-300 rounded-full shadow-[0_8px_25px_rgba(221,202,36,0.35)] flex items-center justify-center space-x-2 group"
                >
                  <span>Book Private Assessment</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    const el = document.querySelector('#disciplines');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-4 liquid-glass-pill hover:bg-white text-neutral-800 font-montserrat font-semibold text-xs tracking-widest uppercase transition-all duration-300 rounded-full text-center"
                >
                  Explore Disciplines
                </button>

                <button
                  onClick={onOpenQRTurnstile}
                  className="px-4 py-4 liquid-glass-pill-dark text-white hover:text-[#ddca24] font-montserrat text-xs tracking-wider uppercase rounded-full transition-colors flex items-center justify-center space-x-1.5"
                  title="Test Turnstile Simulator"
                >
                  <QrCode className="w-3.5 h-3.5 text-[#ddca24]" />
                  <span className="hidden sm:inline">Gate Simulator</span>
                </button>
              </div>

              {/* Ambient Liquid Stats Strip */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-black/5">
                <div>
                  <span className="font-serif text-3xl sm:text-4xl font-light text-[#131313] block">12,500</span>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block">Sq Ft Facilities</span>
                </div>
                <div>
                  <span className="font-serif text-3xl sm:text-4xl font-light text-[#131313] block">100%</span>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block">Eleiko Certified</span>
                </div>
                <div>
                  <span className="font-serif text-3xl sm:text-4xl font-light text-[#ddca24] block">05:30</span>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block">Daily Access</span>
                </div>
              </div>

            </div>

            {/* Right Side: GIANT Visual Photo Focus (Anovi Style, Huge Aspect Ratio) */}
            <div className="lg:col-span-6 space-y-4">
              
              <div className="relative group rounded-3xl overflow-hidden shadow-2xl bg-neutral-900 border border-white/40 liquid-shimmer">
                
                {/* Big Photo Container: h-[480px] to h-[580px] */}
                <div className="h-[420px] xs:h-[480px] sm:h-[540px] lg:h-[580px] w-full overflow-hidden">
                  <img
                    src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=1919,fit=crop/3ynRmEZudyGvnpaM/czetli-TXrkDQMOStPrkmZw.png"
                    alt="Movementor Head Coach & Athlete Training"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)]"
                  />
                </div>

                {/* Floating Liquid Glass Top Badge */}
                <div className="absolute top-4 left-4 liquid-glass-pill-dark px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase text-[#ddca24] flex items-center space-x-2">
                  <Sparkles className="w-3 h-3 text-[#ddca24]" />
                  <span>AUTHENTIC MOVEMENTOR ACADEMY</span>
                </div>

                {/* Floating Liquid Glass Card on Bottom */}
                <div className="absolute bottom-4 left-4 right-4 liquid-glass p-4 rounded-2xl flex items-center justify-between border border-white/80">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                      Mumbai Sanctuaries
                    </span>
                    <span className="font-heading font-black text-sm text-[#131313] uppercase block">
                      Bandra West • Worli Seaface • Chembur
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#131313] text-[#ddca24] flex items-center justify-center font-heading font-black text-xs shadow-md">
                    MV
                  </div>
                </div>

              </div>

              {/* Compact Liquid Glass Biometric Turnstile Pass */}
              <div className="liquid-glass-subtle p-3 rounded-2xl">
                <BiometricKeycardCanvas onScanPass={onOpenQRTurnstile} />
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 2: EDITORIAL PHILOSOPHY (Liquid Glass Quote Box, Anovi Style)
         ========================================================================= */}
      <section id="philosophy" className="relative">
        <div className="max-w-4xl mx-auto liquid-glass rounded-3xl p-8 sm:p-14 lg:p-16 text-center space-y-6 shadow-xl border border-white/60">
          <div className="inline-flex items-center space-x-2 px-3 py-1 liquid-glass-pill rounded-full text-[10px] font-mono tracking-widest uppercase text-neutral-500">
            <span>— THE MOVEMENTOR STANDARD —</span>
          </div>
          
          <blockquote className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-[#131313] leading-relaxed tracking-tight">
            “Strength is neither accidental nor brute force. It is the deliberate calibration of structural integrity, joint longevity, and neurological intent.”
          </blockquote>

          <div className="pt-2 flex flex-col items-center space-y-1">
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
          SECTION 3: GIANT PHOTO-FOCUSED DISCIPLINES (Authentic Movementor Media)
         ========================================================================= */}
      <section id="disciplines" className="space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/5">
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold tracking-[0.25em] uppercase text-neutral-400 block">
              01 // PILLARS OF MASTERY
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#131313] tracking-tight">
              Curated Disciplines
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-montserrat font-light text-neutral-500 max-w-md">
            Directly coached across our Bandra West, Worli Seaface, and Chembur studios.
          </p>
        </div>

        {/* 4 Large Editorial Photo Cards with Liquid Glass Overlays */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          
          {/* Card 1: Authentic Barbell Mechanics */}
          <div className="group liquid-glass rounded-3xl p-4 sm:p-5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl overflow-hidden liquid-shimmer">
            <div className="relative h-[380px] xs:h-[440px] sm:h-[480px] rounded-2xl overflow-hidden bg-neutral-900">
              <img
                src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=1080,fit=crop/3ynRmEZudyGvnpaM/fbtknj-EH2X8FWWwceNjjsw.png"
                alt="Movementor Barbell Mechanics Training"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)]"
              />
              <div className="absolute top-4 left-4 liquid-glass-pill px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-[#131313]">
                01 // BIOMECHANICAL STRENGTH
              </div>

              {/* Bottom Liquid Glass Card */}
              <div className="absolute bottom-4 left-4 right-4 liquid-glass-dark p-5 rounded-2xl border border-white/10 text-white space-y-1.5">
                <h3 className="font-heading font-black text-2xl uppercase tracking-wide group-hover:text-[#ddca24] transition-colors">
                  Olympic & Powerlifting Platforms
                </h3>
                <p className="text-xs font-montserrat font-light text-neutral-200 leading-relaxed">
                  Swedish Eleiko calibrated competition steel plates, precision barbell mechanics, and 1-on-1 supervised posture.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Authentic Functional Movement Bay */}
          <div className="group liquid-glass rounded-3xl p-4 sm:p-5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl overflow-hidden liquid-shimmer">
            <div className="relative h-[380px] xs:h-[440px] sm:h-[480px] rounded-2xl overflow-hidden bg-neutral-900">
              <img
                src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=1080,fit=crop/3ynRmEZudyGvnpaM/tyvwy5-ccXfOJf5ElM9oKrS.png"
                alt="Movementor Functional Bay with Kettlebells"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)]"
              />
              <div className="absolute top-4 left-4 liquid-glass-pill px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-[#131313]">
                02 // SPRINT TURF & KETTLEBELLS
              </div>

              <div className="absolute bottom-4 left-4 right-4 liquid-glass-dark p-5 rounded-2xl border border-white/10 text-white space-y-1.5">
                <h3 className="font-heading font-black text-2xl uppercase tracking-wide group-hover:text-[#ddca24] transition-colors">
                  Athletic Conditioning & Sled Turf
                </h3>
                <p className="text-xs font-montserrat font-light text-neutral-200 leading-relaxed">
                  30-meter high-density turf intervals, heavy dog sleds, and high-velocity deceleration power.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Dynamic Mobility & Rehab */}
          <div className="group liquid-glass rounded-3xl p-4 sm:p-5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl overflow-hidden liquid-shimmer">
            <div className="relative h-[380px] xs:h-[440px] sm:h-[480px] rounded-2xl overflow-hidden bg-neutral-900">
              <img
                src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=1080,fit=crop/3ynRmEZudyGvnpaM/gm7ezo-5pqdenr60ajLh5hx.png"
                alt="Movementor Mobility & Joint Preparation"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)]"
              />
              <div className="absolute top-4 left-4 liquid-glass-pill px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-[#131313]">
                03 // CLINICAL ORTHOPEDICS
              </div>

              <div className="absolute bottom-4 left-4 right-4 liquid-glass-dark p-5 rounded-2xl border border-white/10 text-white space-y-1.5">
                <h3 className="font-heading font-black text-2xl uppercase tracking-wide group-hover:text-[#ddca24] transition-colors">
                  Spine Restoration & Range of Motion
                </h3>
                <p className="text-xs font-montserrat font-light text-neutral-200 leading-relaxed">
                  Physician-led assessments screening pelvic tilt, thoracic mobility, and rotator cuff integrity to eliminate chronic pain.
                </p>
              </div>
            </div>
          </div>

          {/* Card 4: Balance Space & Autonomic Reset */}
          <div className="group liquid-glass rounded-3xl p-4 sm:p-5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl overflow-hidden liquid-shimmer">
            <div className="relative h-[380px] xs:h-[440px] sm:h-[480px] rounded-2xl overflow-hidden bg-neutral-900">
              <img
                src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=1692,fit=crop/3ynRmEZudyGvnpaM/whatsapp-image-2026-10-03-at-12.47.12-am-zTLtrjoBnmEMbDGs.jpeg"
                alt="Movementor Balance Space and Core"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)]"
              />
              <div className="absolute top-4 left-4 liquid-glass-pill px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-[#131313]">
                04 // BALANCE SPACE & RECOVERY
              </div>

              <div className="absolute bottom-4 left-4 right-4 liquid-glass-dark p-5 rounded-2xl border border-white/10 text-white space-y-1.5">
                <h3 className="font-heading font-black text-2xl uppercase tracking-wide group-hover:text-[#ddca24] transition-colors">
                  Balance Space & Sauna Lounge
                </h3>
                <p className="text-xs font-montserrat font-light text-neutral-200 leading-relaxed">
                  Finnish cedar infrared saunas and contrast cold hydrotherapy to reset your autonomic nervous system.
                </p>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 4: THE 3D MUSCULAR ANATOMY ENGINE (Liquid Glass Frame)
         ========================================================================= */}
      <section id="anatomy" className="space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/5">
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold tracking-[0.25em] uppercase text-neutral-400 block">
              02 // INTERACTIVE 3D ANATOMY ENGINE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#131313] tracking-tight">
              The Kinetic Muscle Chain
            </h2>
          </div>
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#131313] liquid-glass-pill px-4 py-2 rounded-full self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#ddca24] animate-ping" />
            <span>Scroll or Touch to Orbit 3D Muscular Chain</span>
          </div>
        </div>

        {/* Two-Column Sticky Container with Liquid Glass Frame */}
        <div className="block lg:grid lg:grid-cols-12 gap-8 lg:gap-10 items-start relative">
          
          {/* LEFT: Pure Sticky 3D Anatomy Canvas (Anchored, never shifts upwards!) */}
          <div className="lg:col-span-5 sticky top-20 sm:top-24 z-30 mb-6 lg:mb-0">
            <div className="liquid-glass p-4 rounded-3xl shadow-2xl border border-white/80">
              <SkeletonMuscleCanvas
                activeFocus={activeMuscleFocus}
                onSelectMuscle={(target: MuscleHighlightTarget) => setActiveMuscleFocus(target.focusArea)}
                className="w-full"
              />
            </div>
          </div>

          {/* RIGHT: Minimalist Liquid Glass Stage Cards */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Stage 1: Chest */}
            <div
              ref={phase1Ref}
              data-focus="chest"
              onClick={() => setActiveMuscleFocus('chest')}
              className={`p-6 sm:p-7 rounded-2xl transition-all duration-400 cursor-pointer ${
                activeMuscleFocus === 'chest'
                  ? 'liquid-glass border-[#ddca24] ring-2 ring-[#ddca24]/30 shadow-2xl scale-[1.01]'
                  : 'liquid-glass-subtle hover:bg-white/80'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">Stage 01 // Anterior</span>
                  <h3 className="font-heading font-black text-2xl text-[#131313] uppercase mt-1">
                    Pectoralis Major & Compound Push
                  </h3>
                </div>
                <span className="font-serif text-3xl font-light text-[#ddca24]">01</span>
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
              className={`p-6 sm:p-7 rounded-2xl transition-all duration-400 cursor-pointer ${
                activeMuscleFocus === 'back'
                  ? 'liquid-glass border-[#ddca24] ring-2 ring-[#ddca24]/30 shadow-2xl scale-[1.01]'
                  : 'liquid-glass-subtle hover:bg-white/80'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">Stage 02 // Posterior</span>
                  <h3 className="font-heading font-black text-2xl text-[#131313] uppercase mt-1">
                    Latissimus Dorsi & Spinal Erectors
                  </h3>
                </div>
                <span className="font-serif text-3xl font-light text-[#ddca24]">02</span>
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
              className={`p-6 sm:p-7 rounded-2xl transition-all duration-400 cursor-pointer ${
                activeMuscleFocus === 'shoulders'
                  ? 'liquid-glass border-[#ddca24] ring-2 ring-[#ddca24]/30 shadow-2xl scale-[1.01]'
                  : 'liquid-glass-subtle hover:bg-white/80'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">Stage 03 // Deltoids</span>
                  <h3 className="font-heading font-black text-2xl text-[#131313] uppercase mt-1">
                    Deltoid Architecture & Rotator Health
                  </h3>
                </div>
                <span className="font-serif text-3xl font-light text-[#ddca24]">03</span>
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
              className={`p-6 sm:p-7 rounded-2xl transition-all duration-400 cursor-pointer ${
                activeMuscleFocus === 'core'
                  ? 'liquid-glass border-[#ddca24] ring-2 ring-[#ddca24]/30 shadow-2xl scale-[1.01]'
                  : 'liquid-glass-subtle hover:bg-white/80'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">Stage 04 // Core Engine</span>
                  <h3 className="font-heading font-black text-2xl text-[#131313] uppercase mt-1">
                    Rectus Abdominis & Transverse Torque
                  </h3>
                </div>
                <span className="font-serif text-3xl font-light text-[#ddca24]">04</span>
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
              className={`p-6 sm:p-7 rounded-2xl transition-all duration-400 cursor-pointer ${
                activeMuscleFocus === 'legs'
                  ? 'liquid-glass border-[#ddca24] ring-2 ring-[#ddca24]/30 shadow-2xl scale-[1.01]'
                  : 'liquid-glass-subtle hover:bg-white/80'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">Stage 05 // Lower Engine</span>
                  <h3 className="font-heading font-black text-2xl text-[#131313] uppercase mt-1">
                    Quadriceps, Hamstrings & Gluteal Drive
                  </h3>
                </div>
                <span className="font-serif text-3xl font-light text-[#ddca24]">05</span>
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
              className={`p-6 sm:p-7 rounded-2xl transition-all duration-400 cursor-pointer ${
                activeMuscleFocus === 'full'
                  ? 'liquid-glass-dark border-[#ddca24] ring-2 ring-[#ddca24]/40 shadow-2xl text-white scale-[1.01]'
                  : 'liquid-glass-dark text-white/90'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#ddca24] block">Stage 06 // Mastery</span>
                  <h3 className="font-heading font-black text-2xl text-white uppercase mt-1">
                    Integrated Kinetic Mastery
                  </h3>
                </div>
                <span className="font-serif text-3xl font-light text-[#ddca24]">06</span>
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
          SECTION 5: 3D ELEIKO CALIBRATED STEEL (Liquid Glass Dark Showcase)
         ========================================================================= */}
      <section className="liquid-glass-dark text-white p-6 sm:p-10 lg:p-14 rounded-3xl shadow-2xl border border-white/10 select-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#ddca24] liquid-glass-pill-dark px-3.5 py-1 rounded-full inline-block">
              // 3D INTERACTIVE ELEIKO STEEL //
            </span>
            <h3 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
              Swedish Olympic Competition Steel
            </h3>
            <p className="text-xs sm:text-sm font-montserrat font-light text-neutral-400 leading-relaxed">
              Touch, swipe, and rotate the 3D calibrated plate. Calibrated to within ±10 grams for true kinetic balance in both Bandra and Worli.
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
          SECTION 6: MUMBAI SANCTUARIES (Liquid Glass Architectural Cards)
         ========================================================================= */}
      <section id="sanctuaries" className="space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/5">
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold tracking-[0.25em] uppercase text-neutral-400 block">
              03 // MUMBAI LOCATIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#131313] tracking-tight">
              Flagship Sanctuaries
            </h2>
          </div>
          <span className="text-xs font-montserrat font-semibold text-[#131313] liquid-glass-gold px-4 py-1.5 rounded-full self-start sm:self-auto">
            Dual Facility Access Included
          </span>
        </div>

        {/* 2 Massive Architectural Pavilion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          
          {/* Sanctuary 1: Bandra West */}
          <div className="group liquid-glass rounded-3xl p-4 sm:p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl overflow-hidden liquid-shimmer">
            <div className="relative h-[360px] xs:h-[420px] rounded-2xl overflow-hidden bg-neutral-900">
              <img
                src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=1042,fit=crop/3ynRmEZudyGvnpaM/img-20260604-wa0018-g7VPJYzvhxh0svo5.jpg"
                alt="Movementor Bandra West Facility"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)]"
              />
              <div className="absolute top-4 left-4 liquid-glass-pill px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-[#131313]">
                Bandra West Flagship
              </div>
            </div>

            <div className="pt-6 space-y-4">
              <div>
                <h3 className="font-heading font-black text-2xl text-[#131313] uppercase">
                  Plot 42, Waterfield Road
                </h3>
                <p className="text-xs font-montserrat text-neutral-500 font-light mt-0.5">
                  Off Linking Road, Bandra West, Mumbai 400050
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2.5 p-3.5 liquid-glass-subtle rounded-xl text-center">
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
                className="w-full py-3.5 liquid-glass-dark text-white hover:text-[#ddca24] font-montserrat font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md"
              >
                Schedule Bandra Walkthrough
              </button>
            </div>
          </div>

          {/* Sanctuary 2: Worli Seaface */}
          <div className="group liquid-glass rounded-3xl p-4 sm:p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl overflow-hidden liquid-shimmer">
            <div className="relative h-[360px] xs:h-[420px] rounded-2xl overflow-hidden bg-neutral-900">
              <img
                src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=982,fit=crop/3ynRmEZudyGvnpaM/img-20260604-wa0014-XvjojPron4ZimOa3.jpg"
                alt="Movementor Worli Seaface Athletic Club"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)]"
              />
              <div className="absolute top-4 left-4 liquid-glass-pill px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-[#131313]">
                Worli Seaface Athletic Club
              </div>
            </div>

            <div className="pt-6 space-y-4">
              <div>
                <h3 className="font-heading font-black text-2xl text-[#131313] uppercase">
                  Horizon Commercial, Level 14
                </h3>
                <p className="text-xs font-montserrat text-neutral-500 font-light mt-0.5">
                  Dr Annie Besant Road, Worli Seaface, Mumbai 400018
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2.5 p-3.5 liquid-glass-subtle rounded-xl text-center">
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
                className="w-full py-3.5 liquid-glass-dark text-white hover:text-[#ddca24] font-montserrat font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md"
              >
                Schedule Worli Walkthrough
              </button>
            </div>
          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 7: AUTHENTIC INSTAGRAM LOOKBOOK (@official_movementor)
         ========================================================================= */}
      <section id="lookbook">
        <InstagramLookbook />
      </section>

      {/* =========================================================================
          SECTION 8: MEMBERSHIP TIERS (Liquid Glass Luxury Cards)
         ========================================================================= */}
      <section id="membership" className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-mono font-bold tracking-[0.3em] uppercase text-neutral-400 block">
            04 // PRIVATE ADMISSIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#131313] tracking-tight">
            Membership Privileges
          </h2>
          <p className="text-xs sm:text-sm font-montserrat font-light text-neutral-500">
            Full dual-branch turnstile credentials to Bandra West & Worli Seaface clubs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          
          {/* Tier 1: Quarterly */}
          <div className="liquid-glass rounded-3xl p-7 sm:p-8 space-y-6 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 px-3 py-1 liquid-glass-pill rounded-full inline-block">
                Quarterly
              </span>
              <h3 className="font-serif text-2xl font-light text-[#131313]">Single Club Pass</h3>
              <div className="font-serif text-3xl sm:text-4xl font-light text-[#131313]">
                ₹22,000 <span className="text-xs font-montserrat font-light text-neutral-500">/ 90 days</span>
              </div>
              <p className="text-xs font-montserrat font-light text-neutral-600 leading-relaxed">
                Dedicated turnstile access to your preferred home facility (Bandra or Worli).
              </p>
              <div className="pt-4 border-t border-black/5 space-y-2.5 text-xs font-montserrat font-light text-neutral-600">
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
              className="w-full py-3.5 liquid-glass-pill hover:bg-white text-neutral-800 font-montserrat font-semibold text-xs tracking-wider uppercase rounded-full transition-colors"
            >
              Select Quarterly Tier
            </button>
          </div>

          {/* Tier 2: Annual All-Access (Liquid Gold Glass Card) */}
          <div className="liquid-glass rounded-3xl p-7 sm:p-8 space-y-6 shadow-2xl relative flex flex-col justify-between transform md:-translate-y-3 border-2 border-[#ddca24]/60">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#ddca24] text-[#131313] px-4 py-1 rounded-full font-montserrat font-bold text-[10px] uppercase tracking-widest shadow-md">
              MOST COVETED
            </div>

            <div className="space-y-4 pt-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#ddca24] liquid-glass-pill-dark px-3 py-1 rounded-full inline-block">
                Annual All-Access
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#131313]">Annual Mumbai Network</h3>
              <div className="font-serif text-3xl sm:text-4xl font-light text-[#131313]">
                ₹65,000 <span className="text-xs font-montserrat font-light text-neutral-500">/ 365 days</span>
              </div>
              <p className="text-xs font-montserrat font-light text-neutral-600 leading-relaxed">
                Seamless dual-facility turnstile credentials for both Bandra West and Worli Seaface sanctuaries.
              </p>
              <div className="pt-4 border-t border-black/5 space-y-2.5 text-xs font-montserrat font-light text-neutral-800">
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
                  <span>Finnish cedar infrared sauna & plunge</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedPlanName('Annual Mumbai Network Pass (₹65,000)');
                setShowInquiryModal(true);
              }}
              className="w-full py-3.5 bg-[#ddca24] hover:bg-[#131313] text-[#131313] hover:text-white font-montserrat font-bold text-xs tracking-wider uppercase rounded-full transition-all shadow-[0_4px_20px_rgba(221,202,36,0.35)]"
            >
              Apply For Network Pass
            </button>
          </div>

          {/* Tier 3: VIP Concierge */}
          <div className="liquid-glass rounded-3xl p-7 sm:p-8 space-y-6 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 px-3 py-1 liquid-glass-pill rounded-full inline-block">
                VIP Clinical
              </span>
              <h3 className="font-serif text-2xl font-light text-[#131313]">Athlete VIP Concierge</h3>
              <div className="font-serif text-3xl sm:text-4xl font-light text-[#131313]">
                ₹1,20,000 <span className="text-xs font-montserrat font-light text-neutral-500">/ 365 days</span>
              </div>
              <p className="text-xs font-montserrat font-light text-neutral-600 leading-relaxed">
                For competitive lifters and executives requiring dedicated 1-on-1 coaching & medical protocol.
              </p>
              <div className="pt-4 border-t border-black/5 space-y-2.5 text-xs font-montserrat font-light text-neutral-600">
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
              className="w-full py-3.5 liquid-glass-dark text-white hover:text-[#ddca24] font-montserrat font-semibold text-xs tracking-wider uppercase rounded-full transition-colors"
            >
              Apply For VIP Concierge
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 9: INFINITE GALLERY MARQUEE (60FPS Authentic Strip)
         ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-black/5">
          <span className="text-[11px] font-mono font-bold tracking-[0.25em] uppercase text-neutral-400">
            05 // FACILITY GALLERY
          </span>
          <span className="text-xs font-mono text-neutral-400">60FPS Motion</span>
        </div>
        <GalleryMarquee />
      </section>

      {/* =========================================================================
          INQUIRY & ADMISSION MODAL (Translucent Liquid Glass Modal)
         ========================================================================= */}
      {showInquiryModal && (
        <div 
          onClick={() => setShowInquiryModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-2xl"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg liquid-glass rounded-3xl p-7 sm:p-10 shadow-2xl space-y-6 border border-white/60"
          >
            <div className="flex items-start justify-between pb-4 border-b border-black/5">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#131313] bg-[#ddca24] px-2.5 py-1 rounded-full">
                  MUMBAI ADMISSIONS
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#131313] mt-2">
                  Schedule Private Visit
                </h3>
                <p className="text-xs font-montserrat font-light text-neutral-500">
                  Plan: <strong className="text-[#131313]">{selectedPlanName}</strong>
                </p>
              </div>

              <button
                onClick={() => setShowInquiryModal(false)}
                className="w-7 h-7 rounded-full liquid-glass-pill flex items-center justify-center text-neutral-500 hover:text-black transition-colors"
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
                    className="w-full px-4 py-3 liquid-glass-subtle rounded-xl text-xs text-[#131313] focus:border-[#131313] focus:outline-none font-montserrat border border-white/80"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-montserrat font-semibold uppercase text-neutral-700 mb-1">WhatsApp Mobile</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98200 12345"
                      className="w-full px-4 py-3 liquid-glass-subtle rounded-xl text-xs text-[#131313] focus:border-[#131313] focus:outline-none font-montserrat border border-white/80"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-montserrat font-semibold uppercase text-neutral-700 mb-1">Sanctuary</label>
                    <select
                      className="w-full px-4 py-3 liquid-glass-subtle rounded-xl text-xs text-[#131313] focus:border-[#131313] focus:outline-none font-montserrat border border-white/80"
                    >
                      <option>Bandra West Flagship</option>
                      <option>Worli Seaface Club</option>
                      <option>Chembur Academy</option>
                      <option>All Mumbai (Dual Access)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-montserrat font-semibold uppercase text-neutral-700 mb-1">Athletic Experience / Goals</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Powerlifting experience, post-rehabilitation conditioning..."
                    className="w-full px-4 py-3 liquid-glass-subtle rounded-xl text-xs text-[#131313] focus:border-[#131313] focus:outline-none font-montserrat border border-white/80"
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
                    className="px-7 py-3.5 bg-[#ddca24] hover:bg-[#131313] text-[#131313] hover:text-white text-xs font-montserrat font-bold uppercase tracking-wider rounded-full transition-all shadow-[0_4px_20px_rgba(221,202,36,0.35)]"
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

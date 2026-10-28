import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export interface MuscleHighlightTarget {
  id: string;
  name: string;
  latinName: string;
  focusArea: 'chest' | 'back' | 'shoulders' | 'core' | 'legs' | 'full';
  primaryExercises: string[];
  equipment: string;
  activationPct: number;
  coach: string;
  muscleKeywords: string[];
}

interface SkeletonMuscleCanvasProps {
  activeFocus: 'chest' | 'back' | 'shoulders' | 'core' | 'legs' | 'full';
  onSelectMuscle?: (muscle: MuscleHighlightTarget) => void;
  className?: string;
}

export const SkeletonMuscleCanvas: React.FC<SkeletonMuscleCanvasProps> = ({
  activeFocus,
  onSelectMuscle,
  className = ''
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const masterGroupRef = useRef<THREE.Group | null>(null);
  const muscleMeshesRef = useRef<Map<string, THREE.Mesh>>(new Map());

  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [shaderStyle, setShaderStyle] = useState<'athletic' | 'cyber' | 'xray'>('athletic');

  // Drag orbit references
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const targetCameraZRef = useRef(5.6);
  const targetCameraYRef = useRef(0.1);

  // Clinical muscle and skeletal mapping data
  const muscleData: Record<string, MuscleHighlightTarget> = {
    chest: {
      id: 'chest',
      name: 'Pectoralis Major & Pectoralis Minor',
      latinName: 'Musculus pectoralis major et minor',
      focusArea: 'chest',
      primaryExercises: ['Incline Barbell Bench Press', 'Weighted Chest Dips', 'Dumbbell Flye'],
      equipment: 'Eleiko Competition Bench & Calibrated Steel',
      activationPct: 96,
      coach: 'Samar Patel (Senior Strength Coach)',
      muscleKeywords: ['pectoral', 'subclavius']
    },
    back: {
      id: 'back',
      name: 'Latissimus Dorsi, Trapezius & Rhomboids',
      latinName: 'Musculus latissimus dorsi, trapezius et rhomboideus',
      focusArea: 'back',
      primaryExercises: ['Conventional Deadlift', 'Pendlay Barbell Row', 'Weighted Pull-Ups'],
      equipment: 'Texas Power Bar & Olympic Lifting Platform',
      activationPct: 98,
      coach: 'Dr. Farokh Mehta & Samar Patel',
      muscleKeywords: ['latiss', 'trapez', 'rhomboid', 'infraspinatus', 'teres', 'spinae', 'serratus-posterior']
    },
    shoulders: {
      id: 'shoulders',
      name: 'Deltoid Complex, Biceps & Triceps',
      latinName: 'Musculus deltoideus, biceps et triceps brachii',
      focusArea: 'shoulders',
      primaryExercises: ['Strict Overhead Barbell Press', 'Keiser Cable Lateral Raise', 'Heavy Face Pulls'],
      equipment: 'Keiser Pneumatic Cable Station',
      activationPct: 92,
      coach: 'Kavita Sundaram (Conditioning Lead)',
      muscleKeywords: ['deltoid', 'biceps-brachii', 'triceps-brachii', 'brachialis', 'coracobrachialis', 'brachioradialis', 'supraspinatus']
    },
    core: {
      id: 'core',
      name: 'Rectus Abdominis & External Obliques',
      latinName: 'Musculus rectus abdominis et obliquus externus',
      focusArea: 'core',
      primaryExercises: ['Ab Wheel Rollout', 'Hanging Leg Raise', 'Rotational Landmine'],
      equipment: 'Custom Multi-Grip Rig & Turf Bay',
      activationPct: 94,
      coach: 'Dr. Ananya Deshmukh (Sports Physio)',
      muscleKeywords: ['rectus-abdominis', 'oblique', 'transversus-abdominis', 'pyramidalis']
    },
    legs: {
      id: 'legs',
      name: 'Quadriceps, Hamstrings & Gluteus Maximus',
      latinName: 'Musculus quadriceps femoris, biceps femoris et gluteus',
      focusArea: 'legs',
      primaryExercises: ['Barbell Back Squat', 'Romanian Deadlift', '30m Sled Drive'],
      equipment: 'Eleiko Power Racks & Sprint Turf Lane',
      activationPct: 99,
      coach: 'Vikram Sen & Samar Patel',
      muscleKeywords: ['glute', 'vastus', 'rectus-femoris', 'biceps-femoris', 'semitendinosus', 'semimembranosus', 'gastrocnemius', 'soleus', 'tibialis']
    },
    full: {
      id: 'full',
      name: 'Complete 177-Muscle Human Muscular System',
      latinName: 'Systema musculare humanum (177 Musculi)',
      focusArea: 'full',
      primaryExercises: ['Olympic Clean & Jerk', 'Snatch', 'Kinetic Movement Screening'],
      equipment: 'Full MOVEMENTOR Mumbai Performance Hub',
      activationPct: 100,
      coach: 'MOVEMENTOR Senior Performance & Medical Team',
      muscleKeywords: []
    }
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. SCENE SETUP
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.1, 5.6);
    cameraRef.current = camera;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. STUDIO ATHLETIC LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Warm Sun Key Light
    const keyLight = new THREE.DirectionalLight(0xfff7ea, 3.2);
    keyLight.position.set(4, 7, 5);
    scene.add(keyLight);

    // Intense Cyber-Yellow (#ddca24) Athletic Rim Light
    const yellowRimLight = new THREE.DirectionalLight(0xddca24, 4.5);
    yellowRimLight.position.set(-6, 4, -4);
    scene.add(yellowRimLight);

    // Subtle Cool Fill Light
    const coolFillLight = new THREE.DirectionalLight(0xcde6ff, 1.5);
    coolFillLight.position.set(5, -2, -3);
    scene.add(coolFillLight);

    // Master Model Transform Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);
    masterGroupRef.current = masterGroup;

    // Ground Platform
    const platformGeom = new THREE.CylinderGeometry(1.6, 1.7, 0.05, 48);
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0x111315,
      roughness: 0.3,
      metalness: 0.8
    });
    const platform = new THREE.Mesh(platformGeom, platformMat);
    platform.position.y = -2.15;
    masterGroup.add(platform);

    const platformRingGeom = new THREE.TorusGeometry(1.65, 0.02, 8, 48);
    const platformRingMat = new THREE.MeshBasicMaterial({ color: 0xddca24 });
    const platformRing = new THREE.Mesh(platformRingGeom, platformRingMat);
    platformRing.rotation.x = Math.PI / 2;
    platformRing.position.y = -2.12;
    masterGroup.add(platformRing);

    // 3. LOAD THE REAL 177-MUSCLE HUMAN ANATOMY GLB
    const muscleMeshes = new Map<string, THREE.Mesh>();
    const loader = new GLTFLoader();

    loader.load(
      '/models/muscles.glb',
      (gltf) => {
        const root = gltf.scene;

        // Auto-center and normalize size using Box3
        const initialBox = new THREE.Box3().setFromObject(root);
        const size = initialBox.getSize(new THREE.Vector3());
        const center = initialBox.getCenter(new THREE.Vector3());
        
        // Target height ~3.8 units in Three.js world space
        const targetH = 3.8;
        const scale = targetH / (size.y || 1);
        root.scale.set(scale, scale, scale);

        // Center root so center is exactly at (0, 0, 0)
        root.position.x = -center.x * scale;
        root.position.y = -center.y * scale;
        root.position.z = -center.z * scale;

        // Update platform to sit right under the feet
        platform.position.y = -targetH / 2 - 0.05;
        platformRing.position.y = -targetH / 2 - 0.03;

        // Traverse and assign authentic anatomical muscle materials & centroids
        root.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const muscleName = (mesh.name || child.parent?.name || `muscle_${muscleMeshes.size}`).toLowerCase();

            // Compute local center for spatial zone fallback
            mesh.geometry.computeBoundingBox();
            const meshCenter = mesh.geometry.boundingBox ? mesh.geometry.boundingBox.getCenter(new THREE.Vector3()) : new THREE.Vector3();
            // Scale by root scale
            meshCenter.multiplyScalar(scale);
            meshCenter.sub(center.clone().multiplyScalar(scale));

            mesh.userData.centroid = meshCenter;
            mesh.userData.anatomicalName = muscleName;

            // Anatomical muscle fiber material: Realistic athletic deep crimson with muscle fiber sheen
            const muscleMat = new THREE.MeshStandardMaterial({
              color: 0x8b2e2b, // Deep muscular crimson tone
              roughness: 0.32,
              metalness: 0.25,
              emissive: 0x220505,
              emissiveIntensity: 0.2
            });
            mesh.material = muscleMat;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            muscleMeshes.set(muscleName, mesh);
          }
        });

        muscleMeshesRef.current = muscleMeshes;
        masterGroup.add(root);
        setLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (error) => {
        console.error('Error loading muscles.glb:', error);
        setLoading(false);
      }
    );

    // 4. MOUSE & TOUCH ORBIT CONTROLS
    const handleStart = (clientX: number, clientY: number) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: clientX, y: clientY };
    };

    const handleMove = (clientX: number, clientY: number) => {
      if (!isDraggingRef.current || !masterGroupRef.current) return;
      const deltaX = clientX - previousMousePositionRef.current.x;
      const deltaY = clientY - previousMousePositionRef.current.y;

      targetRotationRef.current.y += deltaX * 0.008;
      targetRotationRef.current.x = Math.max(
        -0.5,
        Math.min(0.5, targetRotationRef.current.x + deltaY * 0.008)
      );

      previousMousePositionRef.current = { x: clientX, y: clientY };
    };

    const handleEnd = () => {
      isDraggingRef.current = false;
    };

    const domElem = renderer.domElement;
    const onMouseDown = (e: MouseEvent) => handleStart(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onMouseUp = () => handleEnd();

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handleStart(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => handleEnd();

    domElem.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    domElem.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Zoom on wheel
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetCameraZRef.current = Math.max(3.0, Math.min(8.5, targetCameraZRef.current + e.deltaY * 0.004));
    };
    domElem.addEventListener('wheel', onWheel, { passive: false });

    // Window Resize
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 5. ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Gentle ambient drift if not being dragged
      if (!isDraggingRef.current && targetRotationRef.current.y === 0) {
        targetRotationRef.current.y = Math.sin(elapsed * 0.4) * 0.15;
      }

      // Smooth damping interpolation
      if (masterGroupRef.current) {
        masterGroupRef.current.rotation.y += (targetRotationRef.current.y - masterGroupRef.current.rotation.y) * 0.07;
        masterGroupRef.current.rotation.x += (targetRotationRef.current.x - masterGroupRef.current.rotation.x) * 0.07;
      }

      if (cameraRef.current) {
        cameraRef.current.position.z += (targetCameraZRef.current - cameraRef.current.position.z) * 0.07;
        cameraRef.current.position.y += (targetCameraYRef.current - cameraRef.current.position.y) * 0.07;
      }

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElem.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElem.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      domElem.removeEventListener('wheel', onWheel);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // UPDATE ACTIVE MUSCLE HIGHLIGHT & CAMERA FRAMING ON SCROLL OR SELECTION
  useEffect(() => {
    const muscleMap = muscleMeshesRef.current;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const zOffset = isMobile ? 1.0 : 0;

    // 1. Camera Framing & Rotation for Each Anatomical Muscle Group (Stable Y-Axis so model never jumps up or down)
    switch (activeFocus) {
      case 'chest':
        // Front view focused on Pectoralis Major & Minor
        targetRotationRef.current = { x: 0.0, y: 0.05 };
        targetCameraZRef.current = 4.6 + zOffset;
        targetCameraYRef.current = 0.0;
        break;
      case 'back':
        // Spin 180 degrees to expose Latissimus Dorsi & Trapezius
        targetRotationRef.current = { x: 0.0, y: Math.PI };
        targetCameraZRef.current = 4.6 + zOffset;
        targetCameraYRef.current = 0.0;
        break;
      case 'shoulders':
        // 45-degree angle for Deltoid and Arm musculature
        targetRotationRef.current = { x: 0.0, y: 0.55 };
        targetCameraZRef.current = 4.6 + zOffset;
        targetCameraYRef.current = 0.0;
        break;
      case 'core':
        // Front view for Rectus Abdominis & Obliques
        targetRotationRef.current = { x: 0.0, y: 0.0 };
        targetCameraZRef.current = 4.6 + zOffset;
        targetCameraYRef.current = 0.0;
        break;
      case 'legs':
        // Slight downward tilt for Quadriceps, Hamstrings & Calves
        targetRotationRef.current = { x: 0.05, y: 0.2 };
        targetCameraZRef.current = 4.8 + zOffset;
        targetCameraYRef.current = 0.0;
        break;
      case 'full':
      default:
        // Full-body 177-muscle anatomical overview
        targetRotationRef.current = { x: 0.0, y: 0.25 };
        targetCameraZRef.current = 5.0 + zOffset;
        targetCameraYRef.current = 0.0;
        break;
    }

    // 2. High-Precision Muscle Highlighting with Spatial Zone Matching
    const targetKeywords = muscleData[activeFocus]?.muscleKeywords || [];

    muscleMap.forEach((mesh, muscleName) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      const centroid = mesh.userData.centroid as THREE.Vector3 || new THREE.Vector3();
      const cy = centroid.y;
      const cz = centroid.z;
      const cx = Math.abs(centroid.x);

      // 1. Precise Name keyword match
      const nameMatch = targetKeywords.some(kw => muscleName.includes(kw));

      // 2. Calibrated Spatial Anatomical Zone (Strict boundaries so Chest ONLY shows chest, not full front!)
      let spatialMatch = false;
      switch (activeFocus) {
        case 'chest':
          // Strict Pectoralis Major & Minor (Anterior upper chest plate only, NOT shoulders, NOT arms, NOT neck, NOT abs)
          spatialMatch = cy >= 0.38 && cy <= 0.82 && cz >= 0.08 && cx <= 0.36;
          break;
        case 'back':
          // Strict Latissimus Dorsi & Trapezius (Posterior chain only)
          spatialMatch = cy >= 0.12 && cy <= 1.25 && cz <= -0.06;
          break;
        case 'shoulders':
          // Deltoid complex & lateral arm rotators
          spatialMatch = (cx >= 0.34 && cy >= 0.18 && cy <= 1.15) || (cy >= 0.82 && cx >= 0.28);
          break;
        case 'core':
          // Rectus Abdominis & Obliques (Anterior midriff only)
          spatialMatch = cy >= -0.22 && cy <= 0.36 && cz >= 0.08 && cx <= 0.32;
          break;
        case 'legs':
          // Quadriceps, Hamstrings, Gluteals & Calves (Lower limbs below pelvis)
          spatialMatch = cy <= -0.15;
          break;
        case 'full':
        default:
          spatialMatch = true;
          break;
      }

      // Isolate strictly: for chest, back, core, shoulders, legs, require precise match
      const isTarget = activeFocus === 'full' 
        ? true 
        : (nameMatch || spatialMatch);

      if (isTarget) {
        // High-energy electric cyber-yellow (#ddca24) with intense golden muscular glow
        mat.color.setHex(0xddca24);
        mat.emissive.setHex(0x6b5a04);
        mat.emissiveIntensity = 0.8;
        mat.roughness = 0.2;
        mat.metalness = 0.6;
        mat.opacity = 1.0;
      } else {
        if (shaderStyle === 'athletic') {
          // Deep anatomical muscle fiber crimson
          mat.color.setHex(0x5a1e1d);
          mat.emissive.setHex(0x110303);
          mat.emissiveIntensity = 0.1;
          mat.roughness = 0.45;
          mat.metalness = 0.15;
          mat.opacity = 0.8;
        } else if (shaderStyle === 'cyber') {
          // Obsidian metallic dark écorché
          mat.color.setHex(0x23272b);
          mat.emissive.setHex(0x000000);
          mat.emissiveIntensity = 0;
          mat.roughness = 0.35;
          mat.metalness = 0.7;
          mat.opacity = 0.55;
        } else {
          // Translucent X-Ray diagnostic scan
          mat.color.setHex(0x19303d);
          mat.emissive.setHex(0x05131a);
          mat.emissiveIntensity = 0.3;
          mat.roughness = 0.2;
          mat.metalness = 0.1;
          mat.opacity = 0.35;
        }
      }
    });

    if (onSelectMuscle && muscleData[activeFocus]) {
      onSelectMuscle(muscleData[activeFocus]);
    }
  }, [activeFocus, shaderStyle, loading]);

  const activeData = muscleData[activeFocus] || muscleData.full;

  return (
    <div className={`relative w-full h-[280px] xs:h-[320px] sm:h-[400px] lg:h-[calc(100vh-160px)] lg:max-h-[580px] bg-gradient-to-b from-[#0a0c0b] via-[#111413] to-[#070908] rounded-[6px] overflow-hidden border border-neutral-800/80 shadow-2xl ${className}`}>
      
      {/* 3D Canvas Mount */}
      <div
        ref={mountRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none select-none"
      />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-[#0a0c0b] z-30 flex flex-col items-center justify-center p-6 space-y-3">
          <div className="w-10 h-10 rounded-full border-2 border-neutral-800 border-t-[#ddca24] animate-spin" />
          <div className="text-[11px] font-mono text-[#ddca24] tracking-wider uppercase">
            Loading Anatomy: {loadProgress}%
          </div>
        </div>
      )}

      {/* Discreet Ultra-Premium Floating Indicator (Minimal, Elegant, Non-Intrusive) */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-neutral-400 pointer-events-none select-none z-10">
        <span className="flex items-center space-x-1.5 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-[2px] border border-neutral-800/60">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ddca24] animate-pulse" />
          <span className="text-neutral-300">360° Drag & Orbit</span>
        </span>
        <span className="text-[#ddca24] font-bold uppercase tracking-wider bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-[2px] border border-neutral-800/60">
          {activeFocus === 'full' ? 'All Muscles' : activeFocus}
        </span>
      </div>

    </div>
  );
};

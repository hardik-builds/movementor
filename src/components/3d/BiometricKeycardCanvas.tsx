import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface BiometricKeycardProps {
  className?: string;
  onScanPass?: () => void;
}

export const BiometricKeycardCanvas: React.FC<BiometricKeycardProps> = ({
  className = '',
  onScanPass
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const cardGroupRef = useRef<THREE.Group | null>(null);

  const targetRotationRef = useRef({ x: 0.1, y: -0.2 });
  const isDraggingRef = useRef(false);
  const prevPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      mount.clientWidth / mount.clientHeight,
      0.1,
      50
    );
    camera.position.set(0, 0, 4.0);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    mount.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const yellowRim = new THREE.DirectionalLight(0xddca24, 4.0);
    yellowRim.position.set(-5, -2, -3);
    scene.add(yellowRim);

    // 4. Construct 3D RFID Smart Card
    const cardGroup = new THREE.Group();
    scene.add(cardGroup);
    cardGroupRef.current = cardGroup;

    // Card Body (Credit card ratio: ~85mm x 54mm -> 2.2 x 1.4 units)
    const cardGeom = new THREE.BoxGeometry(2.35, 1.48, 0.05);
    const cardMat = new THREE.MeshStandardMaterial({
      color: 0x141716,
      roughness: 0.25,
      metalness: 0.8
    });
    const cardMesh = new THREE.Mesh(cardGeom, cardMat);
    cardGroup.add(cardMesh);

    // Cyber-Yellow Edge Bevel Strip
    const edgeBevelGeom = new THREE.BoxGeometry(2.38, 0.04, 0.06);
    const yellowMat = new THREE.MeshStandardMaterial({
      color: 0xddca24,
      emissive: 0x4a4002,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.7
    });
    const topEdge = new THREE.Mesh(edgeBevelGeom, yellowMat);
    topEdge.position.y = 0.72;
    cardGroup.add(topEdge);

    const bottomEdge = new THREE.Mesh(edgeBevelGeom, yellowMat);
    bottomEdge.position.y = -0.72;
    cardGroup.add(bottomEdge);

    // Metallic MV Chip Hub
    const chipGeom = new THREE.BoxGeometry(0.42, 0.36, 0.06);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xddca24,
      metalness: 0.95,
      roughness: 0.15
    });
    const chip = new THREE.Mesh(chipGeom, goldMat);
    chip.position.set(-0.65, 0.25, 0.01);
    cardGroup.add(chip);

    // RFID Holographic Stripe
    const stripeGeom = new THREE.BoxGeometry(2.35, 0.32, 0.052);
    const stripeMat = new THREE.MeshStandardMaterial({
      color: 0x222628,
      roughness: 0.1,
      metalness: 0.9
    });
    const stripe = new THREE.Mesh(stripeGeom, stripeMat);
    stripe.position.set(0, -0.28, 0.005);
    cardGroup.add(stripe);

    // 5. Touch & Mouse Movement
    const handleStart = (clientX: number, clientY: number) => {
      isDraggingRef.current = true;
      prevPosRef.current = { x: clientX, y: clientY };
    };

    const handleMove = (clientX: number, clientY: number) => {
      if (!mount) return;
      const rect = mount.getBoundingClientRect();
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((clientY - rect.top) / rect.height) * 2 - 1);

      if (isDraggingRef.current) {
        const dx = clientX - prevPosRef.current.x;
        const dy = clientY - prevPosRef.current.y;
        targetRotationRef.current.y += dx * 0.015;
        targetRotationRef.current.x += dy * 0.015;
        prevPosRef.current = { x: clientX, y: clientY };
      } else {
        // Natural parallax tilt
        targetRotationRef.current.y = nx * 0.45;
        targetRotationRef.current.x = -ny * 0.35;
      }
    };

    const handleEnd = () => {
      isDraggingRef.current = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', (e) => handleStart(e.clientX, e.clientY));
    window.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', handleEnd);

    dom.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) handleStart(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    window.addEventListener('touchend', handleEnd);

    const handleResize = () => {
      if (!mount || !renderer) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // 6. Animation
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!isDraggingRef.current) {
        // Gentle athletic float
        cardGroup.position.y = Math.sin(elapsed * 1.5) * 0.06;
      }

      cardGroup.rotation.y += (targetRotationRef.current.y - cardGroup.rotation.y) * 0.08;
      cardGroup.rotation.x += (targetRotationRef.current.x - cardGroup.rotation.x) * 0.08;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchend', handleEnd);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleCardTap = () => {
    setIsScanning(true);
    if (onScanPass) onScanPass();
    setTimeout(() => setIsScanning(false), 1800);
  };

  return (
    <div
      onClick={handleCardTap}
      className={`relative bg-neutral-900 border border-neutral-800 rounded-[4px] overflow-hidden group cursor-pointer select-none ${className}`}
    >
      {/* 3D Canvas Mount */}
      <div
        ref={mountRef}
        className="w-full h-full min-h-[200px] sm:min-h-[250px] touch-none"
      />

      {/* Floating Status Header */}
      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10 text-[10px]">
        <span className="flex items-center space-x-1 px-2 py-0.5 bg-black/70 backdrop-blur-md rounded-[2px] border border-neutral-700/60 font-heading font-black text-white uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>3D Biometric RFID Pass</span>
        </span>
        <span className="font-mono text-neutral-400 bg-black/60 px-1.5 py-0.5 rounded-[2px]">
          Tap to Scan
        </span>
      </div>

      {/* Interactive Scan Effect */}
      {isScanning && (
        <div className="absolute inset-0 bg-[#ddca24]/10 backdrop-blur-[1px] z-20 flex items-center justify-center pointer-events-none transition-all duration-300">
          <div className="bg-[#131313] text-[#ddca24] border border-[#ddca24] px-4 py-2 rounded-[3px] text-xs font-heading font-black tracking-widest uppercase shadow-2xl flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#ddca24] animate-ping" />
            <span>OPTICAL TURNSTILE VERIFIED // ACCESS GRANTED</span>
          </div>
        </div>
      )}

      {/* Card Detail Bottom Strip */}
      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono text-neutral-400 pointer-events-none z-10 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-[2px] border border-neutral-800">
        <span className="text-[#ddca24] font-bold">MEMBER ID // MV-8849-BANDRA</span>
        <span>Tilt / Touch 3D</span>
      </div>
    </div>
  );
};

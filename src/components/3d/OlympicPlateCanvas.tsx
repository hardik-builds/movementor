import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface OlympicPlateProps {
  className?: string;
  initialWeight?: 25 | 20 | 15 | 10;
}

export const OlympicPlateCanvas: React.FC<OlympicPlateProps> = ({
  className = '',
  initialWeight = 25
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [weight, setWeight] = useState<25 | 20 | 15 | 10>(initialWeight);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const plateGroupRef = useRef<THREE.Group | null>(null);
  const plateMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const ringMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  // Drag interaction
  const isDraggingRef = useRef(false);
  const prevPositionRef = useRef({ x: 0, y: 0 });
  const rotationVelocityRef = useRef({ x: 0, y: 0.015 });
  const targetRotationRef = useRef({ x: 0.2, y: 0.4 });

  const plateColors = {
    25: { hex: 0xb91c1c, name: '25 KG COMPETITION RED', spec: 'IWF Calibrated ±10g' },
    20: { hex: 0x1d4ed8, name: '20 KG OLYMPIC BLUE', spec: 'Eleiko Competition Steel' },
    15: { hex: 0xddca24, name: '15 KG CYBER YELLOW', spec: 'Championship Training Bay' },
    10: { hex: 0x15803d, name: '10 KG ATHLETIC GREEN', spec: 'Precision Technique Bay' }
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      40,
      mount.clientWidth / mount.clientHeight,
      0.1,
      50
    );
    camera.position.set(0, 0, 4.4);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    mount.appendChild(renderer.domElement);

    // 3. Studio Athletic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5ea, 3.5);
    keyLight.position.set(5, 6, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xddca24, 3.8);
    rimLight.position.set(-6, -2, -3);
    scene.add(rimLight);

    const metallicBackLight = new THREE.DirectionalLight(0xa5c4ff, 2.0);
    metallicBackLight.position.set(0, -5, -4);
    scene.add(metallicBackLight);

    // 4. Construct Calibrated Olympic Plate Group
    const plateGroup = new THREE.Group();
    scene.add(plateGroup);
    plateGroupRef.current = plateGroup;

    // Outer Main Disc
    const outerDiscGeom = new THREE.CylinderGeometry(1.65, 1.65, 0.22, 64);
    const currentColor = plateColors[weight].hex;
    const plateMat = new THREE.MeshStandardMaterial({
      color: currentColor,
      roughness: 0.28,
      metalness: 0.72
    });
    plateMaterialRef.current = plateMat;
    const outerDisc = new THREE.Mesh(outerDiscGeom, plateMat);
    outerDisc.rotation.x = Math.PI / 2;
    plateGroup.add(outerDisc);

    // Outer Chrome Rim Chamfer
    const rimGeom = new THREE.TorusGeometry(1.64, 0.035, 16, 64);
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xe5e7eb,
      roughness: 0.15,
      metalness: 0.95
    });
    ringMaterialRef.current = chromeMat;
    const outerRim = new THREE.Mesh(rimGeom, chromeMat);
    plateGroup.add(outerRim);

    // Inner Recessed Disc Hub
    const innerRecessGeom = new THREE.CylinderGeometry(1.22, 1.22, 0.26, 48);
    const innerRecessMat = new THREE.MeshStandardMaterial({
      color: 0x111315,
      roughness: 0.4,
      metalness: 0.8
    });
    const innerRecess = new THREE.Mesh(innerRecessGeom, innerRecessMat);
    innerRecess.rotation.x = Math.PI / 2;
    plateGroup.add(innerRecess);

    // Center Steel Bore (50.4mm Olympic standard sleeve hub)
    const steelHubGeom = new THREE.CylinderGeometry(0.48, 0.48, 0.32, 48);
    const steelHub = new THREE.Mesh(steelHubGeom, chromeMat);
    steelHub.rotation.x = Math.PI / 2;
    plateGroup.add(steelHub);

    // Center Hole
    const centerHoleGeom = new THREE.CylinderGeometry(0.24, 0.24, 0.36, 32);
    const darkHoleMat = new THREE.MeshBasicMaterial({ color: 0x070908 });
    const centerHole = new THREE.Mesh(centerHoleGeom, darkHoleMat);
    centerHole.rotation.x = Math.PI / 2;
    plateGroup.add(centerHole);

    // Raised Circular Ring Details
    const innerGrooveGeom = new THREE.TorusGeometry(1.22, 0.02, 12, 48);
    const innerGroove = new THREE.Mesh(innerGrooveGeom, chromeMat);
    plateGroup.add(innerGroove);

    // 5. Touch & Mouse Interaction
    const handleStart = (clientX: number, clientY: number) => {
      isDraggingRef.current = true;
      prevPositionRef.current = { x: clientX, y: clientY };
    };

    const handleMove = (clientX: number, clientY: number) => {
      if (!isDraggingRef.current || !plateGroupRef.current) return;
      const dx = clientX - prevPositionRef.current.x;
      const dy = clientY - prevPositionRef.current.y;

      targetRotationRef.current.y += dx * 0.012;
      targetRotationRef.current.x = Math.max(-0.6, Math.min(0.6, targetRotationRef.current.x + dy * 0.01));
      rotationVelocityRef.current.y = dx * 0.003;

      prevPositionRef.current = { x: clientX, y: clientY };
    };

    const handleEnd = () => {
      isDraggingRef.current = false;
    };

    const dom = renderer.domElement;
    const onMouseDown = (e: MouseEvent) => handleStart(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onMouseUp = () => handleEnd();

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) handleStart(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd = () => handleEnd();

    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 6. Resize Observer
    const handleResize = () => {
      if (!mount || !renderer) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 7. Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isDraggingRef.current && plateGroupRef.current) {
        // Continuous gentle spin
        targetRotationRef.current.y += rotationVelocityRef.current.y;
        rotationVelocityRef.current.y *= 0.96;
        if (Math.abs(rotationVelocityRef.current.y) < 0.006) {
          rotationVelocityRef.current.y = 0.008;
        }
      }

      if (plateGroupRef.current) {
        plateGroupRef.current.rotation.y += (targetRotationRef.current.y - plateGroupRef.current.rotation.y) * 0.1;
        plateGroupRef.current.rotation.x += (targetRotationRef.current.x - plateGroupRef.current.rotation.x) * 0.1;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update color on weight change
  useEffect(() => {
    if (plateMaterialRef.current) {
      plateMaterialRef.current.color.setHex(plateColors[weight].hex);
    }
  }, [weight]);

  return (
    <div className={`relative bg-neutral-900 border border-neutral-800 rounded-[4px] overflow-hidden group select-none ${className}`}>
      
      {/* 3D Canvas Mount */}
      <div
        ref={mountRef}
        className="w-full h-full min-h-[260px] sm:min-h-[320px] cursor-grab active:cursor-grabbing touch-none"
      />

      {/* Top Header Badge */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center space-x-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-[2px] border border-neutral-700/60">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ddca24] animate-pulse" />
          <span className="font-heading font-black text-[10px] text-white uppercase tracking-wider">
            3D OLYMPIC CALIBRATED STEEL
          </span>
        </div>
        <span className="text-[10px] font-mono text-neutral-400 bg-black/60 px-2 py-0.5 rounded-[2px]">
          Swipe to spin
        </span>
      </div>

      {/* Bottom Weight Toggles */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-auto">
        <div className="flex items-center space-x-1 p-0.5 bg-black/80 backdrop-blur-md rounded-[3px] border border-neutral-800 text-[10px] font-heading font-black">
          {([25, 20, 15, 10] as const).map(w => (
            <button
              key={w}
              onClick={() => setWeight(w)}
              className={`px-2 py-0.5 rounded-[2px] transition-all ${
                weight === w
                  ? 'bg-[#ddca24] text-[#131313] shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {w}KG
            </button>
          ))}
        </div>

        <div className="text-[11px] font-mono font-bold text-white bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-[2px] border border-neutral-800">
          <span className="text-[#ddca24]">{plateColors[weight].spec}</span>
        </div>
      </div>

    </div>
  );
};

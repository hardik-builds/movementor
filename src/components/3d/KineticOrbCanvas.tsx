import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface KineticOrbProps {
  className?: string;
}

export const KineticOrbCanvas: React.FC<KineticOrbProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const targetRotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      50
    );
    camera.position.set(0, 0, 4.2);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const yellowLight = new THREE.DirectionalLight(0xddca24, 4.0);
    yellowLight.position.set(4, 4, 3);
    scene.add(yellowLight);

    const tealLight = new THREE.DirectionalLight(0x06b6d4, 3.0);
    tealLight.position.set(-4, -3, -3);
    scene.add(tealLight);

    // 4. Kinetic Icosahedron Wireframe & Points Core
    const orbGroup = new THREE.Group();
    scene.add(orbGroup);

    // Outer Wireframe Cage
    const outerGeom = new THREE.IcosahedronGeometry(1.4, 2);
    const wireMat = new THREE.MeshStandardMaterial({
      color: 0xddca24,
      wireframe: true,
      emissive: 0x4a4002,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8
    });
    const outerMesh = new THREE.Mesh(outerGeom, wireMat);
    orbGroup.add(outerMesh);

    // Inner Glowing Core Sphere
    const coreGeom = new THREE.SphereGeometry(0.85, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x111413,
      emissive: 0xddca24,
      emissiveIntensity: 0.35,
      roughness: 0.3,
      metalness: 0.7
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    orbGroup.add(coreMesh);

    // Floating Orbiting Ring
    const ringGeom = new THREE.TorusGeometry(1.65, 0.02, 12, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
    const ringMesh = new THREE.Mesh(ringGeom, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    orbGroup.add(ringMesh);

    // 5. Interaction
    const handleMove = (clientX: number, clientY: number) => {
      const rect = mount.getBoundingClientRect();
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationRef.current.y = nx * 0.8;
      targetRotationRef.current.x = -ny * 0.8;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
    dom.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    const handleResize = () => {
      if (!mount || !renderer) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix;
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // 6. Animation
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Continuous subtle kinetic pulsation & rotation
      outerMesh.rotation.y += 0.008;
      outerMesh.rotation.x += 0.004;
      ringMesh.rotation.z += 0.012;

      const pulse = 1 + Math.sin(t * 2.5) * 0.05;
      coreMesh.scale.set(pulse, pulse, pulse);

      orbGroup.rotation.y += (targetRotationRef.current.y - orbGroup.rotation.y) * 0.08;
      orbGroup.rotation.x += (targetRotationRef.current.x - orbGroup.rotation.x) * 0.08;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative bg-neutral-900 border border-neutral-800 rounded-[4px] overflow-hidden select-none ${className}`}>
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full min-h-[220px] sm:min-h-[260px] touch-none" />

      {/* Subtle telemetry */}
      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] pointer-events-none z-10">
        <span className="flex items-center space-x-1.5 px-2 py-0.5 bg-black/70 backdrop-blur-md rounded-[2px] border border-neutral-700/60 font-heading font-black text-white uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ddca24] animate-ping" />
          <span>3D Biomechanical HRV Core</span>
        </span>
        <span className="font-mono text-neutral-400 bg-black/60 px-1.5 py-0.5 rounded-[2px]">
          98.4ms Kinetic Readiness
        </span>
      </div>

      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono text-neutral-400 pointer-events-none z-10 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-[2px] border border-neutral-800">
        <span className="text-[#ddca24]">Orthopedic Kinetic Feedback</span>
        <span>Tilt / Move</span>
      </div>
    </div>
  );
};

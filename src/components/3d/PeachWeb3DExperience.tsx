import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface PeachWeb3DExperienceProps {
  scrollProgress: number; // 0 to 1
  mouseX: number;
  mouseY: number;
  accentMode?: 'bioluminescent' | 'iridescent' | 'cyber';
}

export const PeachWeb3DExperience: React.FC<PeachWeb3DExperienceProps> = ({
  scrollProgress,
  mouseX,
  mouseY,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Mesh & Creature references
  const mainFishGroupRef = useRef<THREE.Group | null>(null);
  const fishBonesRef = useRef<THREE.Mesh[]>([]);
  const schoolGroupRef = useRef<THREE.Group | null>(null);
  const dumbbellGroupRef = useRef<THREE.Group | null>(null);
  const kettlebellRef = useRef<THREE.Mesh | null>(null);
  const bubbleParticlesRef = useRef<THREE.Points | null>(null);
  const liquidRingsRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene with PeachWeb ethereal mist & deep abyss gradient
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x060810, 0.038);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 8.5);
    cameraRef.current = camera;

    // 3. Renderer with high dynamic range & antialiasing
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting Rig (Bioluminescent PeachWeb lighting)
    const ambientLight = new THREE.AmbientLight(0x0a1020, 1.8);
    scene.add(ambientLight);

    // Bioluminescent cyan rim light (Aquatic glow)
    const cyanLight = new THREE.DirectionalLight(0x00f0ff, 4.0);
    cyanLight.position.set(6, 5, 4);
    scene.add(cyanLight);

    // Electric magenta / peach accent light (PeachWeb trademark)
    const magentaLight = new THREE.DirectionalLight(0xff0077, 4.5);
    magentaLight.position.set(-6, -2, -3);
    scene.add(magentaLight);

    // Deep gold underwater caustics light
    const goldLight = new THREE.PointLight(0xffb347, 3.5, 15);
    goldLight.position.set(0, 6, 2);
    scene.add(goldLight);

    // 5. PeachWeb Hero: 3D Bioluminescent Glass Beta / Koi Fish (Swimming through space)
    const mainFish = new THREE.Group();
    scene.add(mainFish);
    mainFishGroupRef.current = mainFish;

    // Iridescent Translucent Glass Shader Material for the Fish Body
    const fishGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x00d9ff,
      emissive: 0x082535,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.88,
      thickness: 1.2,
      ior: 1.45,
      transparent: true,
      opacity: 0.85,
      reflectivity: 0.9,
    });

    const finMat = new THREE.MeshPhysicalMaterial({
      color: 0xff0077,
      emissive: 0x330018,
      roughness: 0.1,
      transmission: 0.95,
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide
    });

    // Anatomical fish body segments to allow fluid spine undulating wave
    const segmentCount = 9;
    const fishSegments: THREE.Mesh[] = [];

    for (let i = 0; i < segmentCount; i++) {
      const radius = Math.sin((i / segmentCount) * Math.PI) * 0.55 + 0.08;
      const geo = new THREE.CylinderGeometry(radius * 0.85, radius, 0.45, 24);
      geo.rotateX(Math.PI / 2);
      const segMesh = new THREE.Mesh(geo, fishGlassMat);
      segMesh.position.z = -i * 0.42 + 1.2;
      mainFish.add(segMesh);
      fishSegments.push(segMesh);
    }
    fishBonesRef.current = fishSegments;

    // Fluid Dorsal & Beta Tail Fins
    const tailFinGeo = new THREE.PlaneGeometry(1.6, 2.2, 16, 16);
    const tailFin = new THREE.Mesh(tailFinGeo, finMat);
    tailFin.position.set(0, 0.2, -2.5);
    tailFin.rotation.y = Math.PI / 2;
    mainFish.add(tailFin);

    // Pectoral Fins (Left & Right)
    const pectoralGeo = new THREE.PlaneGeometry(1.2, 0.8, 12, 12);
    
    const leftPectoral = new THREE.Mesh(pectoralGeo, finMat);
    leftPectoral.position.set(-0.65, -0.1, 0.6);
    leftPectoral.rotation.set(0.3, 0.6, -0.4);
    mainFish.add(leftPectoral);

    const rightPectoral = new THREE.Mesh(pectoralGeo, finMat);
    rightPectoral.position.set(0.65, -0.1, 0.6);
    rightPectoral.rotation.set(0.3, -0.6, 0.4);
    mainFish.add(rightPectoral);

    // Bioluminescent Internal Energy Core (Glowing spine lights)
    const coreLight = new THREE.PointLight(0x00ffff, 3.5, 4);
    coreLight.position.set(0, 0, 0.5);
    mainFish.add(coreLight);

    // 6. Floating 3D Sculptural Gym & Performance Artifacts
    // Chrome Biomechanical Dumbbell orbiting near the fish
    const dumbbellGroup = new THREE.Group();
    scene.add(dumbbellGroup);
    dumbbellGroupRef.current = dumbbellGroup;

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.12,
      metalness: 0.95,
      envMapIntensity: 2.0
    });

    const rubberMat = new THREE.MeshStandardMaterial({
      color: 0x111118,
      roughness: 0.65,
      metalness: 0.3
    });

    // Dumbbell central knurled bar
    const barGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.4, 24);
    barGeo.rotateZ(Math.PI / 2);
    const bar = new THREE.Mesh(barGeo, chromeMat);
    dumbbellGroup.add(bar);

    // Dumbbell hexagonal weight plates
    [-0.6, -0.75, 0.6, 0.75].forEach((x, idx) => {
      const plateGeo = new THREE.CylinderGeometry(0.42 - (idx % 2) * 0.05, 0.42 - (idx % 2) * 0.05, 0.12, 6);
      plateGeo.rotateZ(Math.PI / 2);
      const plate = new THREE.Mesh(plateGeo, (idx % 2 === 0) ? rubberMat : chromeMat);
      plate.position.x = x;
      dumbbellGroup.add(plate);
    });

    dumbbellGroup.position.set(2.8, -0.8, -1.0);
    dumbbellGroup.scale.set(1.2, 1.2, 1.2);

    // Metallic Kettlebell floating with Peach glow
    const kettlebellGeo = new THREE.SphereGeometry(0.65, 32, 32);
    const kettlebellMat = new THREE.MeshPhysicalMaterial({
      color: 0x24121a,
      emissive: 0x400515,
      metalness: 0.9,
      roughness: 0.15,
      clearcoat: 1.0
    });
    const kettlebell = new THREE.Mesh(kettlebellGeo, kettlebellMat);
    
    // Kettlebell handle
    const handleGeo = new THREE.TorusGeometry(0.38, 0.08, 16, 32, Math.PI);
    const handle = new THREE.Mesh(handleGeo, chromeMat);
    handle.position.set(0, 0.65, 0);
    kettlebell.add(handle);

    kettlebell.position.set(-3.2, 1.2, -1.5);
    scene.add(kettlebell);
    kettlebellRef.current = kettlebell;

    // 7. Ambient Micro-Organisms / School of Tiny Luminescent Fish
    const schoolGroup = new THREE.Group();
    scene.add(schoolGroup);
    schoolGroupRef.current = schoolGroup;

    const miniFishGeo = new THREE.ConeGeometry(0.04, 0.22, 8);
    miniFishGeo.rotateX(Math.PI / 2);
    const miniFishMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });

    const schoolMembers: { mesh: THREE.Mesh; speed: number; radius: number; angle: number; y: number }[] = [];
    for (let i = 0; i < 28; i++) {
      const mesh = new THREE.Mesh(miniFishGeo, miniFishMat);
      const radius = 2.5 + Math.random() * 3.5;
      const angle = Math.random() * Math.PI * 2;
      const y = -1.5 + Math.random() * 3.0;
      mesh.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      schoolGroup.add(mesh);
      schoolMembers.push({ mesh, speed: 0.6 + Math.random() * 0.8, radius, angle, y });
    }

    // 8. Ethereal Liquid Caustic Bubbles & Particle Swarm
    const bubbleGeo = new THREE.BufferGeometry();
    const bubbleCount = 200;
    const bubblePositions = new Float32Array(bubbleCount * 3);

    for (let i = 0; i < bubbleCount * 3; i += 3) {
      bubblePositions[i] = (Math.random() - 0.5) * 16;
      bubblePositions[i + 1] = (Math.random() - 0.5) * 10;
      bubblePositions[i + 2] = (Math.random() - 0.5) * 12;
    }
    bubbleGeo.setAttribute('position', new THREE.BufferAttribute(bubblePositions, 3));

    const bubbleMat = new THREE.PointsMaterial({
      size: 0.06,
      color: 0x00ffff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const bubbleParticles = new THREE.Points(bubbleGeo, bubbleMat);
    scene.add(bubbleParticles);
    bubbleParticlesRef.current = bubbleParticles;

    // 9. Concentric Liquid Torus Ripples (PeachWeb style)
    const liquidRings = new THREE.Group();
    scene.add(liquidRings);
    liquidRingsRef.current = liquidRings;

    for (let i = 0; i < 3; i++) {
      const ringG = new THREE.TorusGeometry(3.2 + i * 0.8, 0.015, 16, 100);
      const ringM = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xff0077 : 0x00f0ff,
        transparent: true,
        opacity: 0.25 - i * 0.06
      });
      const tMesh = new THREE.Mesh(ringG, ringM);
      tMesh.rotation.x = Math.PI / 2;
      liquidRings.add(tMesh);
    }

    // 10. Responsive resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 11. Smooth Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Fluid sinusoidal spine undulation (Real fish swimming mechanics)
      fishSegments.forEach((seg, idx) => {
        const wave = Math.sin(time * 3.8 - idx * 0.45) * 0.18;
        seg.position.x = wave * (idx / segmentCount);
        seg.rotation.y = Math.cos(time * 3.8 - idx * 0.45) * 0.22;
      });

      // Tail fin natural whip
      tailFin.rotation.z = Math.sin(time * 4.0) * 0.35;
      leftPectoral.rotation.z = Math.sin(time * 2.5) * 0.2 - 0.4;
      rightPectoral.rotation.z = -Math.sin(time * 2.5) * 0.2 + 0.4;

      // School of mini fish circular orbit
      schoolMembers.forEach(item => {
        item.angle += item.speed * 0.012;
        item.mesh.position.x = Math.cos(item.angle) * item.radius;
        item.mesh.position.z = Math.sin(item.angle) * item.radius;
        item.mesh.position.y = item.y + Math.sin(time * item.speed + item.angle) * 0.3;
        item.mesh.rotation.y = -item.angle + Math.PI / 2;
      });

      // Gentle floating of gym artifacts
      if (dumbbellGroupRef.current) {
        dumbbellGroupRef.current.rotation.x = time * 0.4;
        dumbbellGroupRef.current.rotation.y = time * 0.3;
        dumbbellGroupRef.current.position.y = -0.8 + Math.sin(time * 1.5) * 0.25;
      }

      if (kettlebellRef.current) {
        kettlebellRef.current.rotation.y = time * 0.5;
        kettlebellRef.current.rotation.z = Math.sin(time * 1.2) * 0.15;
        kettlebellRef.current.position.y = 1.2 + Math.cos(time * 1.3) * 0.2;
      }

      // Bubbles ascending
      if (bubbleParticlesRef.current) {
        const pos = bubbleParticlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 1; i < pos.length; i += 3) {
          pos[i] += 0.015;
          if (pos[i] > 6) pos[i] = -6;
        }
        bubbleParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Rotating liquid ripples
      if (liquidRingsRef.current) {
        liquidRingsRef.current.rotation.z = time * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update dynamic camera position, fish pathing, and zoom based on scroll & mouse
  useEffect(() => {
    if (!mainFishGroupRef.current || !cameraRef.current) return;

    // Scroll drives the cinematic path of the bioluminescent fish
    // As user scrolls, the fish glides through 3D space, turns smoothly, and dives
    const scrollAngle = scrollProgress * Math.PI * 1.8;
    const fishX = Math.sin(scrollAngle) * 3.5 + (mouseX * 0.8);
    const fishY = Math.cos(scrollProgress * Math.PI) * 1.2 - (mouseY * 0.6);
    const fishZ = Math.cos(scrollAngle) * 2.2 - scrollProgress * 2.0;

    // Smooth lerp for fish location
    mainFishGroupRef.current.position.x += (fishX - mainFishGroupRef.current.position.x) * 0.08;
    mainFishGroupRef.current.position.y += (fishY - mainFishGroupRef.current.position.y) * 0.08;
    mainFishGroupRef.current.position.z += (fishZ - mainFishGroupRef.current.position.z) * 0.08;

    // Fish dynamically faces its trajectory
    mainFishGroupRef.current.rotation.y = scrollAngle + Math.PI / 2 + (mouseX * 0.4);
    mainFishGroupRef.current.rotation.z = -(mouseX * 0.3);
    mainFishGroupRef.current.rotation.x = -(mouseY * 0.25);

    // Camera dynamic depth zoom
    const camZ = 8.5 - scrollProgress * 3.0;
    const camY = 1.5 + Math.sin(scrollProgress * Math.PI) * 0.8;
    cameraRef.current.position.z += (camZ - cameraRef.current.position.z) * 0.08;
    cameraRef.current.position.y += (camY - cameraRef.current.position.y) * 0.08;
    cameraRef.current.position.x += ((mouseX * 1.2) - cameraRef.current.position.x) * 0.08;
    cameraRef.current.lookAt(0, 0, 0);

  }, [scrollProgress, mouseX, mouseY]);

  return (
    <div className="relative w-full h-full pointer-events-none select-none">
      <div ref={mountRef} className="w-full h-full" />
      
      {/* PeachWeb Atmospheric Ambient Glow Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060810] via-transparent to-[#060810]/70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#060810]/60 via-transparent to-[#060810]/60 pointer-events-none" />
      
      {/* Bioluminescent aura pulses */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[140px] pointer-events-none" />
    </div>
  );
};

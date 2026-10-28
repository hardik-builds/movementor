import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Luxury3DStudioProps {
  scrollProgress: number; // 0 to 1
  mouseX: number;
  mouseY: number;
  highlightCategory?: string;
}

export const Luxury3DStudio: React.FC<Luxury3DStudioProps> = ({
  scrollProgress,
  mouseX,
  mouseY,
  highlightCategory
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  
  // Meshes references for interactive animations
  const grandTourerGroupRef = useRef<THREE.Group | null>(null);
  const podiumRef = useRef<THREE.Mesh | null>(null);
  const wheelsRef = useRef<THREE.Mesh[]>([]);
  const headlightsRef = useRef<THREE.SpotLight[]>([]);
  const dustSheetRef = useRef<THREE.Mesh | null>(null);
  const ringsGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x060608, 0.035);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.2, 7.5);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting Rig
    // Atmospheric ambient
    const ambientLight = new THREE.AmbientLight(0x231d25, 1.2);
    scene.add(ambientLight);

    // Main Skylight beam (from the concrete ceiling skylight in the reference)
    const skylight = new THREE.SpotLight(0xfff8ee, 18, 25, Math.PI / 5, 0.4, 1.2);
    skylight.position.set(0, 9, 0);
    skylight.castShadow = true;
    skylight.shadow.mapSize.width = 1024;
    skylight.shadow.mapSize.height = 1024;
    skylight.shadow.bias = -0.0001;
    scene.add(skylight);

    // Oxblood Ruby Rim Light (sculptural back/side glow)
    const rimLightLeft = new THREE.DirectionalLight(0xbe123c, 4.5);
    rimLightLeft.position.set(-6, 4, -4);
    scene.add(rimLightLeft);

    const rimLightRight = new THREE.DirectionalLight(0xe11d48, 3.5);
    rimLightRight.position.set(6, 3, -3);
    scene.add(rimLightRight);

    // Warm Brass Fill
    const warmFill = new THREE.PointLight(0xd4af37, 2.8, 12);
    warmFill.position.set(2, 1.5, 4);
    scene.add(warmFill);

    // 5. Brutalist Stone & Marble Hall Architecture
    // Floor: Reflective polished dark terrazzo
    const floorGeo = new THREE.PlaneGeometry(35, 35);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0e,
      roughness: 0.18,
      metalness: 0.82,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Back concrete columns & architectural portal
    const pillarGeo = new THREE.BoxGeometry(1.2, 10, 1.2);
    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0x181820,
      roughness: 0.85,
      metalness: 0.15,
    });

    [-6.5, -3.2, 3.2, 6.5].forEach(x => {
      const p = new THREE.Mesh(pillarGeo, pillarMat);
      p.position.set(x, 4.5, -4.5);
      p.receiveShadow = true;
      p.castShadow = true;
      scene.add(p);
    });

    // Concrete ceiling with rectangular opening
    const ceilingGeo = new THREE.BoxGeometry(20, 0.8, 15);
    const ceiling = new THREE.Mesh(ceilingGeo, pillarMat);
    ceiling.position.set(0, 9.4, 0);
    scene.add(ceiling);

    // 6. Sculptural Circular Podium
    const podiumGeo = new THREE.CylinderGeometry(3.6, 3.8, 0.35, 64);
    const podiumMat = new THREE.MeshStandardMaterial({
      color: 0x121218,
      roughness: 0.3,
      metalness: 0.7,
    });
    const podium = new THREE.Mesh(podiumGeo, podiumMat);
    podium.position.set(0, 0.175, 0);
    podium.receiveShadow = true;
    scene.add(podium);
    podiumRef.current = podium;

    // Glowing ruby ring on podium edge
    const ringGeo = new THREE.RingGeometry(3.55, 3.65, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xe11d48,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(0, 0.36, 0);
    scene.add(ring);

    // 7. Valmora Gran Turismo 3D Aerodynamic Vehicle Model
    const carGroup = new THREE.Group();
    carGroup.position.set(0, 0.35, 0);
    scene.add(carGroup);
    grandTourerGroupRef.current = carGroup;

    // Oxblood Metallic Lacquer Paint Material (Matching Valmora Reference)
    const oxbloodPaint = new THREE.MeshPhysicalMaterial({
      color: 0x4a0404, // Deep oxblood red base
      roughness: 0.12,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.98,
      roughness: 0.05,
    });

    const darkGlass = new THREE.MeshPhysicalMaterial({
      color: 0x050508,
      roughness: 0.05,
      transmission: 0.8,
      transparent: true,
      opacity: 0.85,
    });

    // Lower chassis & aerodynamic streamlined body
    const lowerBodyGeo = new THREE.BoxGeometry(2.1, 0.65, 4.6);
    const lowerBody = new THREE.Mesh(lowerBodyGeo, oxbloodPaint);
    lowerBody.position.set(0, 0.48, 0);
    lowerBody.castShadow = true;
    carGroup.add(lowerBody);

    // Swept GT Cabin / Fastback Greenhouse
    const cabinGeo = new THREE.BoxGeometry(1.68, 0.6, 2.3);
    const cabin = new THREE.Mesh(cabinGeo, oxbloodPaint);
    cabin.position.set(0, 0.95, -0.2);
    cabin.castShadow = true;
    carGroup.add(cabin);

    // Windshield & Fastback rear glass
    const windshieldGeo = new THREE.BoxGeometry(1.62, 0.55, 1.9);
    const windshield = new THREE.Mesh(windshieldGeo, darkGlass);
    windshield.position.set(0, 0.98, -0.2);
    carGroup.add(windshield);

    // Classic 1960s Elongated Hood & Front Grille
    const hoodBevelGeo = new THREE.CylinderGeometry(0.85, 1.05, 1.8, 32);
    hoodBevelGeo.rotateX(Math.PI / 2);
    const hoodBevel = new THREE.Mesh(hoodBevelGeo, oxbloodPaint);
    hoodBevel.position.set(0, 0.55, 1.35);
    hoodBevel.scale.set(1.0, 0.55, 1.0);
    hoodBevel.castShadow = true;
    carGroup.add(hoodBevel);

    // Eggcrate Chrome Radiator Grille
    const grilleGeo = new THREE.BoxGeometry(1.2, 0.35, 0.15);
    const grille = new THREE.Mesh(grilleGeo, chromeMat);
    grille.position.set(0, 0.45, 2.32);
    carGroup.add(grille);

    // Dual Round Crystal Projector Headlamps
    const headlampGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.12, 24);
    headlampGeo.rotateX(Math.PI / 2);
    const lampMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffeebb,
      emissiveIntensity: 2.5,
      roughness: 0.1
    });

    const leftLamp = new THREE.Mesh(headlampGeo, lampMat);
    leftLamp.position.set(-0.75, 0.55, 2.3);
    carGroup.add(leftLamp);

    const rightLamp = new THREE.Mesh(headlampGeo, lampMat);
    rightLamp.position.set(0.75, 0.55, 2.3);
    carGroup.add(rightLamp);

    // Realistic Headlight Beams projecting forward
    const leftBeam = new THREE.SpotLight(0xfff3db, 6.0, 14, Math.PI / 8, 0.3);
    leftBeam.position.set(-0.75, 0.55, 2.35);
    leftBeam.target.position.set(-1.2, 0.1, 9);
    scene.add(leftBeam);
    scene.add(leftBeam.target);

    const rightBeam = new THREE.SpotLight(0xfff3db, 6.0, 14, Math.PI / 8, 0.3);
    rightBeam.position.set(0.75, 0.55, 2.35);
    rightBeam.target.position.set(1.2, 0.1, 9);
    scene.add(rightBeam);
    scene.add(rightBeam.target);
    headlightsRef.current = [leftBeam, rightBeam];

    // Wire-Spoke Chrome Wheels & Performance Tyres
    const tyreGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.3, 32);
    tyreGeo.rotateZ(Math.PI / 2);
    const tyreMat = new THREE.MeshStandardMaterial({ color: 0x111115, roughness: 0.85 });
    
    const wheelPositions = [
      { x: -1.02, y: 0.36, z: 1.4 },
      { x: 1.02, y: 0.36, z: 1.4 },
      { x: -1.02, y: 0.36, z: -1.4 },
      { x: 1.02, y: 0.36, z: -1.4 },
    ];

    wheelsRef.current = wheelPositions.map(pos => {
      const wheelMesh = new THREE.Mesh(tyreGeo, tyreMat);
      wheelMesh.position.set(pos.x, pos.y, pos.z);
      wheelMesh.castShadow = true;

      // Chrome Center Rim
      const rimGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.32, 24);
      rimGeo.rotateZ(Math.PI / 2);
      const rimMesh = new THREE.Mesh(rimGeo, chromeMat);
      wheelMesh.add(rimMesh);

      carGroup.add(wheelMesh);
      return wheelMesh;
    });

    // 8. Unveiled Silk Dust Sheet draped off the rear (as depicted in the reference photo)
    const sheetGeo = new THREE.BoxGeometry(2.3, 0.8, 1.8);
    const sheetMat = new THREE.MeshStandardMaterial({
      color: 0xded8ce,
      roughness: 0.7,
      metalness: 0.05
    });
    const dustSheet = new THREE.Mesh(sheetGeo, sheetMat);
    dustSheet.position.set(-1.4, 0.25, -2.2);
    dustSheet.rotation.y = 0.3;
    dustSheet.castShadow = true;
    dustSheet.receiveShadow = true;
    carGroup.add(dustSheet);
    dustSheetRef.current = dustSheet;

    // 9. Floating Holographic Rings / Biomechanical Diagnostics
    const ringsGroup = new THREE.Group();
    scene.add(ringsGroup);
    ringsGroupRef.current = ringsGroup;

    for (let i = 0; i < 3; i++) {
      const g = new THREE.TorusGeometry(3.8 + i * 0.4, 0.015, 16, 100);
      const m = new THREE.MeshBasicMaterial({
        color: i === 1 ? 0xe11d48 : 0x475569,
        transparent: true,
        opacity: 0.35 - i * 0.08
      });
      const torus = new THREE.Mesh(g, m);
      torus.rotation.x = Math.PI / 2;
      torus.position.y = 0.8 + i * 0.4;
      ringsGroup.add(torus);
    }

    // 10. Responsive resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 11. Render Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Slow dynamic spin of rings
      if (ringsGroupRef.current) {
        ringsGroupRef.current.rotation.y = time * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update dynamic camera position, vehicle orbit, and rotation on mouse movement & scroll
  useEffect(() => {
    if (!grandTourerGroupRef.current || !cameraRef.current) return;

    // Scroll drives the cinematic camera orbit around the 1960s GT
    // At scroll = 0: Hero 3/4 front perspective (like reference photo)
    // At scroll increases: Camera sweeps smoothly along the side, wheels spin, perspective shifts
    const targetAngle = 0.55 + scrollProgress * Math.PI * 1.25 + (mouseX * 0.35);
    const radius = 7.2 - scrollProgress * 1.5;
    const height = 2.2 + Math.sin(scrollProgress * Math.PI) * 0.8 - (mouseY * 0.6);

    const camX = Math.sin(targetAngle) * radius;
    const camZ = Math.cos(targetAngle) * radius;

    // Smooth lerp
    cameraRef.current.position.x += (camX - cameraRef.current.position.x) * 0.08;
    cameraRef.current.position.y += (height - cameraRef.current.position.y) * 0.08;
    cameraRef.current.position.z += (camZ - cameraRef.current.position.z) * 0.08;
    cameraRef.current.lookAt(0, 0.8, 0);

    // Slight vehicle tilt and wheel rotation as if cruising smoothly
    if (grandTourerGroupRef.current) {
      grandTourerGroupRef.current.rotation.y = Math.sin(scrollProgress * 0.5) * 0.15;
    }

    wheelsRef.current.forEach(wheel => {
      wheel.rotation.x = scrollProgress * Math.PI * 16;
    });

    // Animate dust sheet pulling further away as user progresses down
    if (dustSheetRef.current) {
      dustSheetRef.current.position.x = -1.4 - scrollProgress * 2.0;
      dustSheetRef.current.position.z = -2.2 - scrollProgress * 3.0;
      dustSheetRef.current.scale.set(1 - scrollProgress * 0.4, 1 - scrollProgress * 0.4, 1);
    }
  }, [scrollProgress, mouseX, mouseY]);

  return (
    <div className="relative w-full h-full pointer-events-none select-none">
      <div ref={mountRef} className="w-full h-full" />
      
      {/* Cinematic Vignette Overlay matching Valmora Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-[#070709]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#070709]/70 via-transparent to-[#070709]/70 pointer-events-none" />
      
      {/* Skylight ray haze overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-72 bg-gradient-to-b from-amber-100/10 via-rose-900/5 to-transparent blur-3xl pointer-events-none" />
    </div>
  );
};

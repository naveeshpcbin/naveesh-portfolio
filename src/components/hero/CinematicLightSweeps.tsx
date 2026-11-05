import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LightRaysProps {
  scrollProgress: number;
}

// 3D Curving Volumetric Light Trails & Particles (zaidsayyed.in aesthetic)
function LightCurvesMesh({ scrollProgress }: LightRaysProps) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  // Generate smooth 3D CatmullRom splines
  const { curve1, curve2, curve3, particles } = useMemo(() => {
    // Curve 1: Electric Cyan sweep curving from upper left behind subject to middle right
    const c1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-4.8, 2.4, -2.0),
      new THREE.Vector3(-2.2, 0.6, -1.0),
      new THREE.Vector3(0.4, -0.1, -0.4),
      new THREE.Vector3(2.8, 0.9, -1.2),
      new THREE.Vector3(5.2, 2.2, -2.4),
    ]);

    // Curve 2: Warm Amber / Gold counter-sweep across lower mid area
    const c2 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-5.2, -1.8, -2.2),
      new THREE.Vector3(-2.4, -0.5, -1.2),
      new THREE.Vector3(0.6, 0.8, -0.6),
      new THREE.Vector3(3.4, 0.1, -1.4),
      new THREE.Vector3(5.4, -1.6, -2.2),
    ]);

    // Curve 3: Higher arc behind head
    const c3 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-4.2, 3.2, -2.8),
      new THREE.Vector3(-1.0, 1.8, -1.6),
      new THREE.Vector3(2.2, 1.4, -2.0),
      new THREE.Vector3(4.5, -0.8, -2.6),
    ]);

    // Floating 3D particles / ambient dust motes
    const count = 160;
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 12;
      coords[i * 3 + 1] = (Math.random() - 0.5) * 8;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1.2;
    }

    return {
      curve1: c1,
      curve2: c2,
      curve3: c3,
      particles: coords,
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth cursor parallax
    targetRotation.current.y = state.pointer.x * 0.25;
    targetRotation.current.x = -state.pointer.y * 0.16;

    // React dynamically to scroll progress and continuous time
    const scrollAngle = scrollProgress * Math.PI * 0.45;

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotation.current.y + Math.sin(state.clock.elapsedTime * 0.28) * 0.08 + scrollAngle * 0.35,
      2.8,
      delta
    );

    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotation.current.x + scrollProgress * 0.18,
      2.8,
      delta
    );

    // Dynamic forward drift
    groupRef.current.position.z = THREE.MathUtils.damp(
      groupRef.current.position.z,
      -scrollProgress * 0.75,
      2.8,
      delta
    );
  });

  return (
    <group ref={groupRef}>
      {/* 1. Electric Cyan Spline: Volumetric Core + Glowing Aura */}
      <mesh>
        <tubeGeometry args={[curve1, 80, 0.035, 10, false]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.8} />
      </mesh>
      <mesh>
        <tubeGeometry args={[curve1, 80, 0.09, 10, false]} />
        <meshBasicMaterial color="#0284C7" transparent opacity={0.25} />
      </mesh>

      {/* 2. Warm Amber Counter-Spline: Core + Glow */}
      <mesh>
        <tubeGeometry args={[curve2, 80, 0.03, 10, false]} />
        <meshBasicMaterial color="#F59E0B" transparent opacity={0.7} />
      </mesh>
      <mesh>
        <tubeGeometry args={[curve2, 80, 0.085, 10, false]} />
        <meshBasicMaterial color="#D97706" transparent opacity={0.2} />
      </mesh>

      {/* 3. Deep Arc behind Head */}
      <mesh>
        <tubeGeometry args={[curve3, 70, 0.025, 8, false]} />
        <meshBasicMaterial color="#E0F2FE" transparent opacity={0.45} />
      </mesh>
      <mesh>
        <tubeGeometry args={[curve3, 70, 0.07, 8, false]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.15} />
      </mesh>

      {/* 4. Ambient 3D Depth Dust Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#BAE6FD"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

export const CinematicLightSweeps: React.FC<LightRaysProps> = ({ scrollProgress }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 46 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.5} />
        <LightCurvesMesh scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};

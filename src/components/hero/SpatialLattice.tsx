import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SpatialLatticeProps {
  scrollProgress: number;
}

// 3D Semiconductor Silicon Crystal Lattice & Digital Twin Matrix
function SemiconductorLattice({ scrollProgress }: { scrollProgress: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const ambientParticlesRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  // Generate technical 3D lattice points and interconnects
  const { pointsPositions, linePositions, particlePositions, colors } = useMemo(() => {
    const pts: number[] = [];
    const colorArr: number[] = [];
    const lines: number[] = [];
    const gridSizeX = 9;
    const gridSizeY = 7;
    const gridSizeZ = 3;
    const spacing = 0.72;
    const offsetX = ((gridSizeX - 1) * spacing) / 2;
    const offsetY = ((gridSizeY - 1) * spacing) / 2;

    const rawPoints: THREE.Vector3[] = [];

    // Color definitions for nodes
    const cyanColor = new THREE.Color('#38BDF8');
    const goldColor = new THREE.Color('#F59E0B');
    const silverColor = new THREE.Color('#E2E8F0');

    for (let x = 0; x < gridSizeX; x++) {
      for (let y = 0; y < gridSizeY; y++) {
        for (let z = 0; z < gridSizeZ; z++) {
          const posX = x * spacing - offsetX + (Math.random() - 0.5) * 0.06;
          const posY = y * spacing - offsetY + (Math.random() - 0.5) * 0.06;
          const posZ = z * spacing - 0.7 + (Math.random() - 0.5) * 0.06;
          pts.push(posX, posY, posZ);
          rawPoints.push(new THREE.Vector3(posX, posY, posZ));

          // Color distribution: cyan core, amber accents, silver nodes
          const rand = Math.random();
          if (rand > 0.8) {
            colorArr.push(goldColor.r, goldColor.g, goldColor.b);
          } else if (rand > 0.4) {
            colorArr.push(cyanColor.r, cyanColor.g, cyanColor.b);
          } else {
            colorArr.push(silverColor.r, silverColor.g, silverColor.b);
          }
        }
      }
    }

    // Connect nearest neighbor lattice nodes with circuit traces
    for (let i = 0; i < rawPoints.length; i++) {
      for (let j = i + 1; j < rawPoints.length; j++) {
        const dist = rawPoints[i].distanceTo(rawPoints[j]);
        if (dist < spacing * 1.25) {
          lines.push(
            rawPoints[i].x, rawPoints[i].y, rawPoints[i].z,
            rawPoints[j].x, rawPoints[j].y, rawPoints[j].z
          );
        }
      }
    }

    // Ambient floating depth particles
    const pCount = 140;
    const pCoords = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pCoords[i * 3] = (Math.random() - 0.5) * 12;
      pCoords[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pCoords[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1.2;
    }

    return {
      pointsPositions: new Float32Array(pts),
      linePositions: new Float32Array(lines),
      particlePositions: pCoords,
      colors: new Float32Array(colorArr),
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Pointer-reactive parallax
    targetRotation.current.y = state.pointer.x * 0.28;
    targetRotation.current.x = -state.pointer.y * 0.18;

    // React continuously to scroll and time
    const scrollAngle = scrollProgress * Math.PI * 0.35;
    const continuousSpin = state.clock.elapsedTime * 0.03;

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotation.current.y + continuousSpin + scrollAngle * 0.4,
      3,
      delta
    );

    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotation.current.x + scrollProgress * 0.15,
      3,
      delta
    );

    // Subtle forward/backward depth shift on scroll
    groupRef.current.position.z = THREE.MathUtils.damp(
      groupRef.current.position.z,
      -0.4 - scrollProgress * 0.6,
      3,
      delta
    );

    // Rotate ambient particles
    if (ambientParticlesRef.current) {
      ambientParticlesRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -0.4]} scale={1.22}>
      {/* 1. Semiconductor Lattice Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={pointsPositions.length / 3}
            array={pointsPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.048}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>

      {/* 2. Circuit Trace Interconnects */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#38BDF8"
          transparent
          opacity={0.22}
          linewidth={1}
        />
      </lineSegments>

      {/* 3. Ambient Floating Micro-Particles */}
      <points ref={ambientParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          color="#94A3B8"
          transparent
          opacity={0.45}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

export const SpatialLattice: React.FC<SpatialLatticeProps> = ({ scrollProgress }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 46 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.5} />
        <SemiconductorLattice scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};
export default SpatialLattice;

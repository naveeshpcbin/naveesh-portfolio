import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';
import { PortraitFallback } from './PortraitFallback';

interface ModelProps {
  modelUrl: string;
}

function ModelMesh({ modelUrl }: ModelProps) {
  const { scene } = useGLTF(modelUrl);
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smoothly track mouse pointer with conservative damping
    targetRotation.current.y = state.pointer.x * 0.22; // subtle horizontal swivel
    targetRotation.current.x = -state.pointer.y * 0.15; // subtle vertical tilt

    // Smooth lerp
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotation.current.y,
      4,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotation.current.x,
      4,
      delta
    );
  });

  return (
    <group ref={groupRef} position={[0, -0.05, 0]} scale={1.42}>
      <primitive object={scene} />
    </group>
  );
}

// Subtle ambient particle cloud
function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 120;
  
  const [positions] = useState(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    return pos;
  });

  useFrame((_state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#EFEEE9"
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
}

// Error Boundary for Three.js Canvas
class SceneErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('3D Canvas encountered an error, falling back to static portrait:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface PortraitSceneProps {
  modelUrl?: string;
  imageUrl?: string;
}

export const PortraitScene: React.FC<PortraitSceneProps> = ({
  modelUrl = '/models/naveesh.glb',
  imageUrl = '/images/naveesh-portrait.jpg',
}) => {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }

    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPrefersReducedMotion(true);
    }
  }, []);

  if (!hasWebGL || prefersReducedMotion) {
    return <PortraitFallback imageUrl={imageUrl} />;
  }

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] md:h-[540px] lg:h-[600px] flex items-center justify-center">
      <SceneErrorBoundary fallback={<PortraitFallback imageUrl={imageUrl} />}>
        <Suspense fallback={<PortraitFallback imageUrl={imageUrl} />}>
          <Canvas
            camera={{ position: [0, 0, 3.8], fov: 44 }}
            dpr={[1, 2]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
            }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            {/* Ambient Base Light */}
            <ambientLight intensity={1.2} />

            {/* Front Key Light */}
            <directionalLight position={[2, 3, 4]} intensity={2.2} color="#FFFFFF" />

            {/* Warm Rim / Fill Light */}
            <directionalLight position={[-3, -1, 2]} intensity={1.0} color="#EFEEE9" />

            {/* Specular Edge Accent */}
            <spotLight
              position={[0, 4, 2]}
              intensity={1.5}
              angle={0.6}
              penumbra={0.8}
              color="#D8D7D2"
            />

            {/* Gentle idle float motion */}
            <Float
              speed={1.6}
              rotationIntensity={0.12}
              floatIntensity={0.2}
              floatingRange={[-0.04, 0.04]}
            >
              <ModelMesh modelUrl={modelUrl} />
            </Float>

            {/* Ambient subtle particle cloud */}
            <Particles />
          </Canvas>
        </Suspense>
      </SceneErrorBoundary>

      {/* Subtle indicator under the model */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none select-none text-[10px] font-mono text-cream-dim/70 bg-[#0B0B0A]/70 px-3 py-1 rounded-full border border-border/60 backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#6EE7B7]" />
        <span>INTERACTIVE 3D PORTRAIT &middot; POINTER REACTIVE</span>
      </div>
    </div>
  );
};
